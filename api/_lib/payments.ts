/* --------------------------------------------------------------------
   Payment plumbing shared by every provider.

   WHY THIS IS AN INTERFACE AND NOT JUST "call Payme"
   --------------------------------------------------
   Noldan sells to students inside Uzbekistan (so'm, Uzcard/Humo, via
   Payme and Click) and intends to sell to the diaspora later (USD, via
   a card processor that will only onboard a foreign entity). Those are
   different rails with different money, and the second one cannot be
   built until that entity exists.

   So orders, entitlements and the grant path are provider-neutral, and
   each provider is a thin adapter that translates its own callbacks
   into `markOrderPaid` / `markOrderCancelled`. Adding the USD rail
   later is a new file, not a rewrite.

   MONEY
   -----
   Everything is an integer in the currency's minor unit: tiyin for UZS
   (1 so'm = 100 tiyin), cents for USD. Payme speaks tiyin natively;
   Click speaks so'm as a decimal, so its adapter converts at the edge
   and nowhere else.
   -------------------------------------------------------------------- */

import { grantEntitlement, revokeEntitlement } from "./access.js";
import { one, q } from "./db.js";

export type Provider = "payme" | "click" | "uzum" | "stripe";

export type Order = {
  id: string;
  user_id: string;
  course_id: string;
  provider: Provider;
  amount: number;
  currency: "UZS" | "USD";
  state: "pending" | "paid" | "cancelled" | "failed";
};

/** Anything a provider sends as an order id is checked against this
 *  before it reaches SQL, so garbage gets "order not found", not a 500. */
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Look an order up by its uuid. Returns null for anything malformed. */
export async function findOrder(orderId: string): Promise<Order | null> {
  if (!UUID.test(orderId)) return null;
  return one<Order>(
    `select id, user_id, course_id, provider, amount, currency, state
       from orders where id = $1`,
    [orderId]
  );
}

/** The money landed. Flip the order and grant the course in one path,
 *  so there is exactly one place where access is created.
 *
 *  Idempotent by construction: providers retry their success callback,
 *  and a repeat must be a no-op rather than a double grant. */
export async function markOrderPaid(order: Order): Promise<void> {
  if (order.state !== "paid") {
    await q("update orders set state = 'paid', paid_at = now() where id = $1", [order.id]);
  }
  await grantEntitlement(order.user_id, order.course_id, "purchase");
}

export async function markOrderCancelled(order: Order): Promise<void> {
  if (order.state === "paid") return; // a refund is not a cancellation
  await q("update orders set state = 'cancelled' where id = $1", [order.id]);
}

/** A reversal AFTER capture: the money went back, so the course does too. */
export async function refundOrder(order: Order): Promise<void> {
  await revokeEntitlement(order.user_id, order.course_id);
  await q("update orders set state = 'cancelled' where id = $1", [order.id]);
}

/* ------------------------------------------------------------ transactions */

export type Txn = {
  id: string;
  order_id: string;
  provider: Provider;
  provider_txn_id: string;
  state: "created" | "performed" | "cancelled";
  amount: number;
  create_time: number | null;
  perform_time: number | null;
  cancel_time: number | null;
  reason: number | null;
};

export async function findTxn(
  provider: Provider,
  providerTxnId: string
): Promise<Txn | null> {
  return one<Txn>(
    "select * from transactions where provider = $1 and provider_txn_id = $2",
    [provider, providerTxnId]
  );
}

/** The newest transaction a provider opened against an order. */
export async function findTxnByOrder(
  provider: Provider,
  orderId: string
): Promise<Txn | null> {
  if (!UUID.test(orderId)) return null;
  return one<Txn>(
    `select * from transactions
      where provider = $1 and order_id = $2
      order by created_at desc
      limit 1`,
    [provider, orderId]
  );
}

export async function createTxn(input: {
  order_id: string;
  provider: Provider;
  provider_txn_id: string;
  amount: number;
  create_time: number;
}): Promise<Txn | null> {
  try {
    return await one<Txn>(
      `insert into transactions (order_id, provider, provider_txn_id, amount, create_time, state)
       values ($1, $2, $3, $4, $5, 'created')
       returning *`,
      [input.order_id, input.provider, input.provider_txn_id, input.amount, input.create_time]
    );
  } catch {
    // A concurrent retry already inserted this provider id (the unique
    // constraint held). The caller reads that row and replays it.
    return null;
  }
}

const TXN_COLUMNS = ["state", "amount", "create_time", "perform_time", "cancel_time", "reason"] as const;
type TxnColumn = (typeof TXN_COLUMNS)[number];

export async function updateTxn(
  id: string,
  patch: Partial<Omit<Txn, "id">>
): Promise<void> {
  const cols = Object.keys(patch).filter((k): k is TxnColumn =>
    (TXN_COLUMNS as readonly string[]).includes(k)
  );
  if (cols.length === 0) return;
  const sets = cols.map((c, i) => `${c} = $${i + 2}`).join(", ");
  await q(`update transactions set ${sets} where id = $1`, [id, ...cols.map((c) => patch[c])]);
}

/** Payme's reconciliation sweep: every transaction created in a window. */
export async function listTxns(provider: Provider, fromMs: number, toMs: number): Promise<Txn[]> {
  return q<Txn>(
    `select * from transactions
      where provider = $1 and create_time between $2 and $3
      order by create_time`,
    [provider, fromMs, toMs]
  );
}

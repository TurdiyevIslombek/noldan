/* --------------------------------------------------------------------
   Payme (Paycom) Merchant API endpoint.

   Payme does not redirect the browser to us with a "success" flag —
   its processing centre calls THIS url, server to server, with a
   JSON-RPC 2.0 body, and drives a transaction through a state machine:

       CheckPerformTransaction   may this order be paid at all?
       CreateTransaction         hold it            state  1
       PerformTransaction        money captured     state  2
       CancelTransaction         reversed           state -1 / -2
       CheckTransaction          what state is it in?
       GetStatement              reconciliation sweep

   Two properties matter more than anything else here:

   IDEMPOTENCY. Payme retries. It will call CreateTransaction twice with
   the same id, or PerformTransaction on an already-performed
   transaction, and it expects the SAME successful answer both times —
   not an error, and certainly not a second grant of the course. So
   every method reads the stored row and replays it rather than
   recomputing.

   EXACT ERROR CODES. Payme's sandbox certifies a merchant by driving
   deliberate failures and checking the code. Returning HTTP 500 where
   -31008 was expected fails certification, so every failure below is a
   JSON-RPC error object with HTTP 200.

   Configure in Vercel:
     PAYME_MERCHANT_ID   from the Payme merchant cabinet
     PAYME_KEY           the merchant key (test key while in sandbox)
   Endpoint to register with Payme:  https://<host>/api/payme
   -------------------------------------------------------------------- */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { timingSafeEqual } from "node:crypto";
import {
  createTxn,
  findOrder,
  findTxn,
  findTxnByOrder,
  listTxns,
  markOrderCancelled,
  markOrderPaid,
  refundOrder,
  updateTxn,
} from "./_lib/payments";
import { dbConfigured } from "./_lib/db";

/** Payme's own numbering — do not renumber to something tidier. */
const enum State {
  Created = 1,
  Performed = 2,
  CancelledBeforePerform = -1,
  CancelledAfterPerform = -2,
}

const Err = {
  Auth: -32504,
  Method: -32601,
  Parse: -32700,
  Request: -32600,
  WrongAmount: -31001,
  TxnNotFound: -31003,
  CannotPerform: -31008,
  CannotCancel: -31007,
  OrderNotFound: -31050,
} as const;

/** Payme requires a message in three languages, and shows it to the payer. */
type Msg = { ru: string; uz: string; en: string };

const MSG = {
  orderNotFound: {
    ru: "Заказ не найден",
    uz: "Buyurtma topilmadi",
    en: "Order not found",
  },
  wrongAmount: {
    ru: "Неверная сумма",
    uz: "Summa notoʻgʻri",
    en: "Incorrect amount",
  },
  txnNotFound: {
    ru: "Транзакция не найдена",
    uz: "Tranzaksiya topilmadi",
    en: "Transaction not found",
  },
  cannotPerform: {
    ru: "Невозможно выполнить операцию",
    uz: "Amalni bajarib boʻlmaydi",
    en: "Unable to perform operation",
  },
  cannotCancel: {
    ru: "Невозможно отменить операцию",
    uz: "Amalni bekor qilib boʻlmaydi",
    en: "Unable to cancel operation",
  },
  alreadyPaid: {
    ru: "Заказ уже оплачен",
    uz: "Buyurtma allaqachon toʻlangan",
    en: "Order already paid",
  },
} satisfies Record<string, Msg>;

/** A transaction Payme created but never performed expires after 12h. */
const TXN_TIMEOUT_MS = 12 * 60 * 60 * 1000;

function rpcError(id: unknown, code: number, message: Msg, data?: string) {
  return { jsonrpc: "2.0", id: id ?? null, error: { code, message, ...(data ? { data } : {}) } };
}

function rpcResult(id: unknown, result: unknown) {
  return { jsonrpc: "2.0", id: id ?? null, result };
}

/** Constant-time compare of the Basic credentials. Payme sends
 *  base64("Paycom:<key>"); a length-leaking `===` is a needless gift. */
function authorised(header: string | undefined): boolean {
  const key = process.env.PAYME_KEY;
  if (!key) return false;
  const got = header?.replace(/^Basic\s+/i, "").trim();
  if (!got) return false;

  const want = Buffer.from(`Paycom:${key}`, "utf8").toString("base64");
  const a = Buffer.from(got, "utf8");
  const b = Buffer.from(want, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Payme's `account` object carries whatever field the merchant declared.
 *  We register `order_id`, holding the uuid of a row in `orders`. */
function accountOrderId(params: Record<string, unknown>): string | null {
  const account = params.account as Record<string, unknown> | undefined;
  const raw = account?.order_id;
  return typeof raw === "string" && raw.length > 0 ? raw : null;
}

function paymeState(t: {
  state: string;
  perform_time: number | null;
  cancel_time: number | null;
}): number {
  if (t.state === "performed") return State.Performed;
  if (t.state === "cancelled") {
    return t.perform_time && t.perform_time > 0
      ? State.CancelledAfterPerform
      : State.CancelledBeforePerform;
  }
  return State.Created;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (!dbConfigured()) {
    res.status(200).json(rpcError(null, Err.CannotPerform, MSG.cannotPerform, "server"));
    return;
  }
  // Authentication BEFORE parsing, so an unauthenticated caller learns
  // nothing about what we accept.
  if (!authorised(req.headers.authorization)) {
    res.status(200).json({
      jsonrpc: "2.0",
      id: null,
      error: {
        code: Err.Auth,
        message: { ru: "Недостаточно привилегий", uz: "Ruxsat yetarli emas", en: "Insufficient privilege" },
      },
    });
    return;
  }

  const body = req.body as { id?: unknown; method?: unknown; params?: unknown } | undefined;
  if (!body || typeof body !== "object") {
    res.status(200).json(rpcError(null, Err.Parse, MSG.cannotPerform));
    return;
  }

  const rpcId = body.id;
  const method = typeof body.method === "string" ? body.method : "";
  const params = (body.params ?? {}) as Record<string, unknown>;

  try {
    res.status(200).json(await dispatch(method, params, rpcId));
  } catch {
    // Never leak an internal error shape to a payment provider.
    res.status(200).json(rpcError(rpcId, Err.CannotPerform, MSG.cannotPerform));
  }
}

async function dispatch(method: string, params: Record<string, unknown>, rpcId: unknown) {
  switch (method) {
    case "CheckPerformTransaction":
      return checkPerform(params, rpcId);
    case "CreateTransaction":
      return create(params, rpcId);
    case "PerformTransaction":
      return perform(params, rpcId);
    case "CancelTransaction":
      return cancel(params, rpcId);
    case "CheckTransaction":
      return check(params, rpcId);
    case "GetStatement":
      return statement(params, rpcId);
    default:
      return rpcError(rpcId, Err.Method, MSG.cannotPerform);
  }
}

/* ------------------------------------------------- CheckPerformTransaction */

async function checkPerform(params: Record<string, unknown>, rpcId: unknown) {
  const orderId = accountOrderId(params);
  if (!orderId) return rpcError(rpcId, Err.OrderNotFound, MSG.orderNotFound, "order_id");

  const order = await findOrder(orderId);
  if (!order || order.provider !== "payme") {
    return rpcError(rpcId, Err.OrderNotFound, MSG.orderNotFound, "order_id");
  }
  if (order.state === "paid") {
    return rpcError(rpcId, Err.OrderNotFound, MSG.alreadyPaid, "order_id");
  }
  if (Number(params.amount) !== order.amount) {
    return rpcError(rpcId, Err.WrongAmount, MSG.wrongAmount, "amount");
  }
  return rpcResult(rpcId, { allow: true });
}

/* ------------------------------------------------------- CreateTransaction */

async function create(params: Record<string, unknown>, rpcId: unknown) {
  const paymeId = String(params.id ?? "");
  if (!paymeId) return rpcError(rpcId, Err.TxnNotFound, MSG.txnNotFound, "id");

  // Replay: Payme re-sends Create for a transaction it already made.
  const existing = await findTxn("payme", paymeId);
  if (existing) {
    if (existing.state !== "created") {
      return rpcError(rpcId, Err.CannotPerform, MSG.cannotPerform);
    }
    if (Date.now() - Number(existing.create_time ?? 0) > TXN_TIMEOUT_MS) {
      await updateTxn(existing.id, {
        state: "cancelled",
        cancel_time: Date.now(),
        reason: 4, // Payme's "timed out"
      });
      return rpcError(rpcId, Err.CannotPerform, MSG.cannotPerform);
    }
    return rpcResult(rpcId, {
      create_time: Number(existing.create_time),
      transaction: existing.id,
      state: State.Created,
    });
  }

  const orderId = accountOrderId(params);
  if (!orderId) return rpcError(rpcId, Err.OrderNotFound, MSG.orderNotFound, "order_id");

  const order = await findOrder(orderId);
  if (!order || order.provider !== "payme") {
    return rpcError(rpcId, Err.OrderNotFound, MSG.orderNotFound, "order_id");
  }
  if (order.state === "paid") {
    return rpcError(rpcId, Err.OrderNotFound, MSG.alreadyPaid, "order_id");
  }
  if (Number(params.amount) !== order.amount) {
    return rpcError(rpcId, Err.WrongAmount, MSG.wrongAmount, "amount");
  }
  // One live transaction per order: a second one would let the same
  // course be charged twice.
  const openForOrder = await findTxnByOrder("payme", order.id);
  if (openForOrder && openForOrder.state === "created") {
    return rpcError(rpcId, Err.CannotPerform, MSG.cannotPerform);
  }

  const createTime = Number(params.time) || Date.now();
  const txn = await createTxn({
    order_id: order.id,
    provider: "payme",
    provider_txn_id: paymeId,
    amount: order.amount,
    create_time: createTime,
  });
  if (!txn) return rpcError(rpcId, Err.CannotPerform, MSG.cannotPerform);

  return rpcResult(rpcId, {
    create_time: createTime,
    transaction: txn.id,
    state: State.Created,
  });
}

/* ------------------------------------------------------ PerformTransaction */

async function perform(params: Record<string, unknown>, rpcId: unknown) {
  const txn = await findTxn("payme", String(params.id ?? ""));
  if (!txn) return rpcError(rpcId, Err.TxnNotFound, MSG.txnNotFound, "id");

  // Already performed: replay the original answer verbatim.
  if (txn.state === "performed") {
    return rpcResult(rpcId, {
      transaction: txn.id,
      perform_time: Number(txn.perform_time),
      state: State.Performed,
    });
  }
  if (txn.state !== "created") {
    return rpcError(rpcId, Err.CannotPerform, MSG.cannotPerform);
  }
  if (Date.now() - Number(txn.create_time ?? 0) > TXN_TIMEOUT_MS) {
    await updateTxn(txn.id, { state: "cancelled", cancel_time: Date.now(), reason: 4 });
    return rpcError(rpcId, Err.CannotPerform, MSG.cannotPerform);
  }

  const order = await findOrder(txn.order_id);
  if (!order) return rpcError(rpcId, Err.OrderNotFound, MSG.orderNotFound);

  const performTime = Date.now();
  await updateTxn(txn.id, { state: "performed", perform_time: performTime });
  // The course is granted here and only here.
  await markOrderPaid(order);

  return rpcResult(rpcId, {
    transaction: txn.id,
    perform_time: performTime,
    state: State.Performed,
  });
}

/* ------------------------------------------------------- CancelTransaction */

async function cancel(params: Record<string, unknown>, rpcId: unknown) {
  const txn = await findTxn("payme", String(params.id ?? ""));
  if (!txn) return rpcError(rpcId, Err.TxnNotFound, MSG.txnNotFound, "id");

  const reason = Number(params.reason) || null;

  if (txn.state === "cancelled") {
    return rpcResult(rpcId, {
      transaction: txn.id,
      cancel_time: Number(txn.cancel_time),
      state: paymeState({ ...txn, state: "cancelled" }),
    });
  }

  const cancelTime = Date.now();
  const wasPerformed = txn.state === "performed";

  await updateTxn(txn.id, { state: "cancelled", cancel_time: cancelTime, reason });

  const order = await findOrder(txn.order_id);
  if (order) {
    if (wasPerformed) {
      // A reversal after capture is a refund: revoke the course again.
      await refundOrder(order);
    } else {
      await markOrderCancelled(order);
    }
  }

  return rpcResult(rpcId, {
    transaction: txn.id,
    cancel_time: cancelTime,
    state: wasPerformed ? State.CancelledAfterPerform : State.CancelledBeforePerform,
  });
}

/* -------------------------------------------------------- CheckTransaction */

async function check(params: Record<string, unknown>, rpcId: unknown) {
  const txn = await findTxn("payme", String(params.id ?? ""));
  if (!txn) return rpcError(rpcId, Err.TxnNotFound, MSG.txnNotFound, "id");

  return rpcResult(rpcId, {
    create_time: Number(txn.create_time ?? 0),
    perform_time: Number(txn.perform_time ?? 0),
    cancel_time: Number(txn.cancel_time ?? 0),
    transaction: txn.id,
    state: paymeState(txn),
    reason: txn.reason ?? null,
  });
}

/* ------------------------------------------------------------ GetStatement */

async function statement(params: Record<string, unknown>, rpcId: unknown) {
  const from = Number(params.from) || 0;
  const to = Number(params.to) || Date.now();

  const rows = await listTxns("payme", from, to);

  return rpcResult(rpcId, {
    transactions: rows.map((t) => ({
      id: t.provider_txn_id,
      time: Number(t.create_time ?? 0),
      amount: t.amount,
      account: { order_id: t.order_id },
      create_time: Number(t.create_time ?? 0),
      perform_time: Number(t.perform_time ?? 0),
      cancel_time: Number(t.cancel_time ?? 0),
      transaction: t.id,
      state: paymeState(t),
      reason: t.reason ?? null,
    })),
  });
}

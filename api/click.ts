/* --------------------------------------------------------------------
   Click Merchant API endpoint (Prepare + Complete).

   Click's protocol is nothing like Payme's. It posts
   application/x-www-form-urlencoded, in two phases distinguished by
   `action`, and authenticates with an MD5 signature rather than a
   header:

     action=0  Prepare   "I am about to take this money, is that ok?"
     action=1  Complete  "I took it."

   Two traps this file exists to avoid:

   AMOUNT UNITS. Click sends `amount` in SO'M as a decimal string
   ("249000.00"). Our orders are stored in tiyin, like Payme's. The
   conversion happens here and nowhere else, and is compared with a
   rounding tolerance rather than string equality — "249000" and
   "249000.00" are the same money.

   SIGNATURE ORDER. The md5 concatenation differs between the two
   phases: Complete includes merchant_prepare_id, Prepare does not.
   Getting the order wrong yields a signature that fails only in
   production, where the secret differs from the sandbox one.

   Configure in Vercel:
     CLICK_SERVICE_ID
     CLICK_SECRET_KEY
   Register with Click:
     Prepare   https://<host>/api/click
     Complete  https://<host>/api/click
   -------------------------------------------------------------------- */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createHash } from "node:crypto";
import {
  createTxn,
  findOrder,
  findTxn,
  markOrderCancelled,
  markOrderPaid,
  updateTxn,
} from "./_lib/payments.js";
import { dbConfigured } from "./_lib/db.js";

/** Click's error vocabulary. `0` is success; everything else is a code
 *  Click displays to the payer, so the notes stay human. */
const E = {
  Ok: 0,
  SignFailed: -1,
  BadAmount: -2,
  ActionNotFound: -3,
  AlreadyPaid: -4,
  UserNotFound: -5,
  TxnNotFound: -6,
  UpdateFailed: -7,
  BadRequest: -8,
  Cancelled: -9,
} as const;

const NOTE: Record<number, string> = {
  [E.Ok]: "Success",
  [E.SignFailed]: "SIGN CHECK FAILED",
  [E.BadAmount]: "Incorrect parameter amount",
  [E.ActionNotFound]: "Action not found",
  [E.AlreadyPaid]: "Already paid",
  [E.UserNotFound]: "User does not exist",
  [E.TxnNotFound]: "Transaction does not exist",
  [E.UpdateFailed]: "Failed to update user",
  [E.BadRequest]: "Error in request from click",
  [E.Cancelled]: "Transaction cancelled",
};

function md5(s: string): string {
  return createHash("md5").update(s, "utf8").digest("hex");
}

function str(v: unknown): string {
  return v === undefined || v === null ? "" : String(v);
}

/** Click sends so'm as a decimal; we hold tiyin. Compare as integer
 *  tiyin with a 1-tiyin tolerance for the float round trip. */
function amountMatches(clickSom: string, orderTiyin: number): boolean {
  const som = Number(clickSom);
  if (!Number.isFinite(som) || som <= 0) return false;
  return Math.abs(Math.round(som * 100) - orderTiyin) <= 1;
}

function signatureValid(b: Record<string, unknown>, action: string): boolean {
  const secret = process.env.CLICK_SECRET_KEY;
  if (!secret) return false;

  // Complete carries merchant_prepare_id in the digest; Prepare does not.
  const middle = action === "1" ? str(b.merchant_prepare_id) : "";
  const expected = md5(
    str(b.click_trans_id) +
      str(b.service_id) +
      secret +
      str(b.merchant_trans_id) +
      middle +
      str(b.amount) +
      str(b.action) +
      str(b.sign_time)
  );
  const got = str(b.sign_string).toLowerCase();
  return got.length === expected.length && got === expected;
}

function reply(
  res: VercelResponse,
  b: Record<string, unknown>,
  error: number,
  extra: Record<string, unknown> = {}
) {
  res.status(200).json({
    click_trans_id: str(b.click_trans_id),
    merchant_trans_id: str(b.merchant_trans_id),
    error,
    error_note: NOTE[error] ?? "Unknown",
    ...extra,
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const b = (req.body ?? {}) as Record<string, unknown>;

  if (!dbConfigured()) {
    reply(res, b, E.UpdateFailed);
    return;
  }

  const action = str(b.action);
  if (action !== "0" && action !== "1") {
    reply(res, b, E.ActionNotFound);
    return;
  }
  // Signature first: nothing else in the body is trustworthy until it
  // has been checked.
  if (!signatureValid(b, action)) {
    reply(res, b, E.SignFailed);
    return;
  }
  if (str(b.service_id) !== str(process.env.CLICK_SERVICE_ID)) {
    reply(res, b, E.BadRequest);
    return;
  }
  // Click reports its own upstream failure by sending a negative `error`.
  if (Number(str(b.error) || 0) < 0) {
    const txn = await findTxn("click", str(b.click_trans_id));
    if (txn && txn.state === "created") {
      await updateTxn(txn.id, { state: "cancelled", cancel_time: Date.now() });
      const order = await findOrder(txn.order_id);
      if (order) await markOrderCancelled(order);
    }
    reply(res, b, E.Cancelled);
    return;
  }

  try {
    if (action === "0") await prepare(res, b);
    else await complete(res, b);
  } catch {
    reply(res, b, E.UpdateFailed);
  }
}

/* ---------------------------------------------------------------- Prepare */

async function prepare(res: VercelResponse, b: Record<string, unknown>) {
  const order = await findOrder(str(b.merchant_trans_id));
  if (!order || order.provider !== "click") {
    reply(res, b, E.UserNotFound);
    return;
  }
  if (order.state === "paid") {
    reply(res, b, E.AlreadyPaid);
    return;
  }
  if (!amountMatches(str(b.amount), order.amount)) {
    reply(res, b, E.BadAmount);
    return;
  }

  const clickTxnId = str(b.click_trans_id);

  // Click retries Prepare; the second call must return the same
  // merchant_prepare_id rather than opening a second transaction.
  const existing = await findTxn("click", clickTxnId);
  if (existing) {
    if (existing.state === "cancelled") {
      reply(res, b, E.Cancelled);
      return;
    }
    reply(res, b, E.Ok, { merchant_prepare_id: existing.id });
    return;
  }

  const txn = await createTxn({
    order_id: order.id,
    provider: "click",
    provider_txn_id: clickTxnId,
    amount: order.amount,
    create_time: Date.now(),
  });
  if (!txn) {
    reply(res, b, E.UpdateFailed);
    return;
  }
  reply(res, b, E.Ok, { merchant_prepare_id: txn.id });
}

/* --------------------------------------------------------------- Complete */

async function complete(res: VercelResponse, b: Record<string, unknown>) {
  const txn = await findTxn("click", str(b.click_trans_id));
  if (!txn) {
    reply(res, b, E.TxnNotFound);
    return;
  }
  // merchant_prepare_id must be the row we handed back at Prepare.
  if (str(b.merchant_prepare_id) !== txn.id) {
    reply(res, b, E.TxnNotFound);
    return;
  }
  if (txn.state === "cancelled") {
    reply(res, b, E.Cancelled);
    return;
  }

  const order = await findOrder(txn.order_id);
  if (!order) {
    reply(res, b, E.UserNotFound);
    return;
  }
  if (!amountMatches(str(b.amount), order.amount)) {
    reply(res, b, E.BadAmount);
    return;
  }

  // Replay of an already-completed payment: answer success with the same
  // confirm id, do not grant twice.
  if (txn.state === "performed") {
    reply(res, b, E.AlreadyPaid, { merchant_confirm_id: txn.id });
    return;
  }

  await updateTxn(txn.id, { state: "performed", perform_time: Date.now() });
  await markOrderPaid(order);

  reply(res, b, E.Ok, { merchant_confirm_id: txn.id });
}

/* --------------------------------------------------------------------
   Drives the Payme and Click endpoints against a real Postgres.

   These two files are the ones that must not be wrong: they decide when
   somebody's money becomes somebody's course access, and both providers
   retry, so "works once" is not the bar. What is checked here is mostly
   the awkward half — replays, wrong amounts, cancels after capture, and
   the exact error codes each provider certifies against.

   The database is PGlite — Postgres compiled to WebAssembly, running in
   this process — loaded with the real db/schema.sql, so the payment SQL
   meets the same tables and constraints as in production.

   Run:  npm run test:payments
   -------------------------------------------------------------------- */

import { build } from "esbuild";
import { mkdirSync } from "node:fs";
import { pathToFileURL } from "node:url";

process.env.PAYME_KEY = "test-payme-key";
process.env.CLICK_SECRET_KEY = "test-click-secret";
process.env.CLICK_SERVICE_ID = "12345";

const entry = `
  export { default as payme } from "../api/payme";
  export { default as click } from "../api/click";
  export { q, reset, rows, TEST_USER } from "./test/pglite-db";
`;

const outdir = "node_modules/.cache/noldan-tests";
mkdirSync(outdir, { recursive: true });
const outfile = `${outdir}/payments.mjs`;

await build({
  stdin: { contents: entry, resolveDir: "scripts", loader: "ts" },
  bundle: true,
  format: "esm",
  platform: "node",
  outfile,
  logLevel: "warning",
  // PGlite loads its WebAssembly from next to its own files, so it is
  // imported from node_modules rather than inlined.
  external: ["node:*", "@electric-sql/pglite"],
  plugins: [
    {
      // Swap the connection and nothing else. payments.ts, access.ts and
      // both endpoints are the real code.
      name: "pglite-db",
      setup(b) {
        // Must catch BOTH spellings: the endpoints import "./_lib/db",
        // while payments.ts and access.ts — already inside _lib — import
        // "./db". Matching only one of them silently leaves half the code
        // looking for a real DATABASE_URL.
        b.onResolve({ filter: /(^|\/)db(\.js)?$/ }, (args) =>
          args.importer.includes("/api/")
            ? { path: new URL("./test/pglite-db.ts", import.meta.url).pathname }
            : undefined
        );
      },
    },
  ],
});

const { payme, click, q, reset, rows, TEST_USER } = await import(pathToFileURL(outfile).href);

/* ------------------------------------------------------------ harness */

let passed = 0;
const failures = [];

function check(name, cond, detail) {
  if (cond) {
    passed += 1;
  } else {
    failures.push(`${name}${detail ? ` — ${detail}` : ""}`);
  }
}

/** Minimal (req, res) pair, since both endpoints are Node handlers. */
function call(handler, { body, headers = {} }) {
  return new Promise((resolve) => {
    const req = { method: "POST", headers, body };
    const res = {
      statusCode: 200,
      _json: null,
      setHeader() {},
      status(c) {
        res.statusCode = c;
        return res;
      },
      json(payload) {
        res._json = payload;
        resolve({ status: res.statusCode, body: payload });
        return res;
      },
      end() {
        resolve({ status: res.statusCode, body: res._json });
        return res;
      },
    };
    Promise.resolve(handler(req, res)).catch((e) =>
      resolve({ status: 500, body: { thrown: String(e) } })
    );
  });
}

const AMOUNT = 24900000; // tiyin — 249 000 so'm

async function seedOrder(provider) {
  const order = {
    id: `00000000-0000-4000-8000-0000000000${provider === "payme" ? "01" : "02"}`,
    user_id: TEST_USER,
    course_id: "transformer",
    provider,
    amount: AMOUNT,
    currency: "UZS",
    state: "pending",
  };
  await q(
    `insert into orders (id, user_id, course_id, provider, amount, currency, state)
     values ($1, $2, $3, $4, $5, $6, $7)`,
    [order.id, order.user_id, order.course_id, order.provider, order.amount, order.currency, order.state]
  );
  return order;
}

const count = async (table) => (await rows(table)).length;
const orderState = async () => (await rows("orders"))[0]?.state;
const ownsCourse = async () =>
  (await rows("entitlements")).some((e) => e.course_id === "transformer" && e.user_id === TEST_USER);

const paymeAuth = {
  authorization:
    "Basic " + Buffer.from(`Paycom:${process.env.PAYME_KEY}`).toString("base64"),
};

const rpc = (method, params, id = 1) => ({
  body: { jsonrpc: "2.0", id, method, params },
  headers: paymeAuth,
});

/* ================================================================ PAYME */

async function testPayme() {
  await reset();
  const order = await seedOrder("payme");

  // --- auth ---------------------------------------------------------
  let r = await call(payme, {
    body: { method: "CheckPerformTransaction", params: {}, id: 1 },
    headers: { authorization: "Basic " + Buffer.from("Paycom:wrong").toString("base64") },
  });
  check("payme: bad key -> -32504", r.body?.error?.code === -32504, JSON.stringify(r.body));

  r = await call(payme, { body: { method: "CheckPerformTransaction", params: {} } });
  check("payme: no auth header -> -32504", r.body?.error?.code === -32504);

  // --- CheckPerformTransaction --------------------------------------
  r = await call(payme, rpc("CheckPerformTransaction", {
    amount: AMOUNT, account: { order_id: order.id },
  }));
  check("payme: check allows valid order", r.body?.result?.allow === true, JSON.stringify(r.body));

  r = await call(payme, rpc("CheckPerformTransaction", {
    amount: 500, account: { order_id: order.id },
  }));
  check("payme: wrong amount -> -31001", r.body?.error?.code === -31001);

  r = await call(payme, rpc("CheckPerformTransaction", {
    amount: AMOUNT, account: { order_id: "00000000-0000-4000-8000-999999999999" },
  }));
  check("payme: unknown order -> -31050", r.body?.error?.code === -31050);

  // --- CreateTransaction --------------------------------------------
  const T = "payme-txn-aaa";
  const now = Date.now();
  r = await call(payme, rpc("CreateTransaction", {
    id: T, time: now, amount: AMOUNT, account: { order_id: order.id },
  }));
  const created = r.body?.result;
  check("payme: create -> state 1", created?.state === 1, JSON.stringify(r.body));
  check("payme: create returns our txn id", typeof created?.transaction === "string");

  // Replay must be identical, not an error and not a second row.
  r = await call(payme, rpc("CreateTransaction", {
    id: T, time: now, amount: AMOUNT, account: { order_id: order.id },
  }));
  check("payme: create replay is idempotent",
    r.body?.result?.transaction === created?.transaction && r.body?.result?.state === 1,
    JSON.stringify(r.body));
  let n = await count("transactions");
  check("payme: create replay made no second row", n === 1, `rows=${n}`);

  // A second, different transaction against the same order must not open.
  r = await call(payme, rpc("CreateTransaction", {
    id: "payme-txn-bbb", time: now, amount: AMOUNT, account: { order_id: order.id },
  }));
  check("payme: second txn on same order -> -31008", r.body?.error?.code === -31008,
    JSON.stringify(r.body));

  // --- PerformTransaction -------------------------------------------
  r = await call(payme, rpc("PerformTransaction", { id: T }));
  check("payme: perform -> state 2", r.body?.result?.state === 2, JSON.stringify(r.body));
  check("payme: perform granted the course", await ownsCourse());
  check("payme: order marked paid", (await orderState()) === "paid");

  const performTime = r.body.result.perform_time;
  r = await call(payme, rpc("PerformTransaction", { id: T }));
  check("payme: perform replay repeats the same answer",
    r.body?.result?.state === 2 && r.body?.result?.perform_time === performTime,
    JSON.stringify(r.body));
  n = await count("entitlements");
  check("payme: perform replay did not double-grant", n === 1, `entitlements=${n}`);

  r = await call(payme, rpc("PerformTransaction", { id: "nope" }));
  check("payme: perform unknown txn -> -31003", r.body?.error?.code === -31003);

  // --- CheckTransaction ---------------------------------------------
  r = await call(payme, rpc("CheckTransaction", { id: T }));
  check("payme: check reports state 2", r.body?.result?.state === 2, JSON.stringify(r.body));

  // --- CancelTransaction after perform = refund ----------------------
  r = await call(payme, rpc("CancelTransaction", { id: T, reason: 5 }));
  check("payme: cancel after perform -> state -2", r.body?.result?.state === -2,
    JSON.stringify(r.body));
  n = await count("entitlements");
  check("payme: refund revoked the course", n === 0, `entitlements=${n}`);

  r = await call(payme, rpc("CancelTransaction", { id: T, reason: 5 }));
  check("payme: cancel replay is idempotent", r.body?.result?.state === -2);

  // --- cancel BEFORE perform ----------------------------------------
  await reset();
  const o2 = await seedOrder("payme");
  await call(payme, rpc("CreateTransaction", {
    id: "payme-txn-ccc", time: Date.now(), amount: AMOUNT, account: { order_id: o2.id },
  }));
  r = await call(payme, rpc("CancelTransaction", { id: "payme-txn-ccc", reason: 3 }));
  check("payme: cancel before perform -> state -1", r.body?.result?.state === -1,
    JSON.stringify(r.body));
  check("payme: cancelled order never granted", (await count("entitlements")) === 0);

  // --- expiry --------------------------------------------------------
  await reset();
  const o3 = await seedOrder("payme");
  const old = Date.now() - 13 * 60 * 60 * 1000; // 13h > 12h limit
  await call(payme, rpc("CreateTransaction", {
    id: "payme-txn-old", time: old, amount: AMOUNT, account: { order_id: o3.id },
  }));
  r = await call(payme, rpc("PerformTransaction", { id: "payme-txn-old" }));
  check("payme: perform after 12h -> -31008", r.body?.error?.code === -31008,
    JSON.stringify(r.body));
  check("payme: expired txn granted nothing", (await count("entitlements")) === 0);

  // --- unknown method -------------------------------------------------
  r = await call(payme, rpc("Nonsense", {}));
  check("payme: unknown method -> -32601", r.body?.error?.code === -32601);
}

/* ================================================================ CLICK */

import { createHash } from "node:crypto";

const md5 = (s) => createHash("md5").update(s, "utf8").digest("hex");

function clickBody({ action, order, amount = "249000.00", prepareId = "", clickTxn = "click-1" }) {
  const signTime = "2026-08-25 12:00:00";
  const middle = action === "1" ? String(prepareId) : "";
  const sign = md5(
    clickTxn + process.env.CLICK_SERVICE_ID + process.env.CLICK_SECRET_KEY +
    order.id + middle + amount + action + signTime
  );
  return {
    body: {
      click_trans_id: clickTxn,
      service_id: process.env.CLICK_SERVICE_ID,
      merchant_trans_id: order.id,
      ...(action === "1" ? { merchant_prepare_id: prepareId } : {}),
      amount,
      action,
      error: "0",
      sign_time: signTime,
      sign_string: sign,
    },
    headers: { "content-type": "application/x-www-form-urlencoded" },
  };
}

async function testClick() {
  await reset();
  const order = await seedOrder("click");

  // --- signature -----------------------------------------------------
  const bad = clickBody({ action: "0", order });
  bad.body.sign_string = "deadbeef".repeat(4);
  let r = await call(click, bad);
  check("click: bad signature -> -1", r.body?.error === -1, JSON.stringify(r.body));

  // --- Prepare -------------------------------------------------------
  r = await call(click, clickBody({ action: "0", order }));
  check("click: prepare -> 0", r.body?.error === 0, JSON.stringify(r.body));
  const prepareId = r.body?.merchant_prepare_id;
  check("click: prepare returns merchant_prepare_id", typeof prepareId === "string");

  r = await call(click, clickBody({ action: "0", order }));
  check("click: prepare replay returns same id",
    r.body?.merchant_prepare_id === prepareId, JSON.stringify(r.body));
  check("click: prepare replay made no second row", (await count("transactions")) === 1);

  // --- amount mismatch ------------------------------------------------
  r = await call(click, clickBody({ action: "0", order, amount: "1000.00", clickTxn: "click-x" }));
  check("click: wrong amount -> -2", r.body?.error === -2, JSON.stringify(r.body));

  // --- Complete -------------------------------------------------------
  r = await call(click, clickBody({ action: "1", order, prepareId }));
  check("click: complete -> 0", r.body?.error === 0, JSON.stringify(r.body));
  check("click: complete granted the course", (await count("entitlements")) === 1);
  check("click: order marked paid", (await orderState()) === "paid");

  r = await call(click, clickBody({ action: "1", order, prepareId }));
  check("click: complete replay -> -4 already paid", r.body?.error === -4, JSON.stringify(r.body));
  check("click: complete replay did not double-grant", (await count("entitlements")) === 1);

  // --- forged prepare id ----------------------------------------------
  await reset();
  const o2 = await seedOrder("click");
  const p = await call(click, clickBody({ action: "0", order: o2, clickTxn: "click-2" }));
  r = await call(click, clickBody({
    action: "1", order: o2, prepareId: "00000000-0000-4000-8000-000000000999", clickTxn: "click-2",
  }));
  check("click: mismatched merchant_prepare_id -> -6", r.body?.error === -6, JSON.stringify(r.body));
  check("click: forged prepare id granted nothing", (await count("entitlements")) === 0);
  void p;

  // --- decimal tolerance ----------------------------------------------
  await reset();
  const o3 = await seedOrder("click");
  r = await call(click, clickBody({ action: "0", order: o3, amount: "249000", clickTxn: "click-3" }));
  check("click: '249000' == '249000.00'", r.body?.error === 0, JSON.stringify(r.body));

  // --- provider-side failure -------------------------------------------
  await reset();
  const o4 = await seedOrder("click");
  const failing = clickBody({ action: "0", order: o4, clickTxn: "click-4" });
  failing.body.error = "-5001";
  r = await call(click, failing);
  check("click: provider error -> -9 cancelled", r.body?.error === -9, JSON.stringify(r.body));

  // --- bad action --------------------------------------------------------
  await reset();
  const o5 = await seedOrder("click");
  const weird = clickBody({ action: "0", order: o5, clickTxn: "click-5" });
  weird.body.action = "7";
  r = await call(click, weird);
  check("click: unknown action -> -3", r.body?.error === -3, JSON.stringify(r.body));
}

/* ================================================================= run */

await testPayme();
await testClick();

console.log(`\n  ${passed} passed, ${failures.length} failed\n`);
if (failures.length) {
  for (const f of failures) console.log(`  FAIL  ${f}`);
  process.exit(1);
}
console.log("  Payme and Click state machines behave.\n");

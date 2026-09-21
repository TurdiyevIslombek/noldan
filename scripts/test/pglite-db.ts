/* --------------------------------------------------------------------
   Stand-in for api/_lib/db.ts, used only by scripts/test-payments.mjs.

   Not a mock: an in-process Postgres (PGlite) loaded with the real
   db/schema.sql. payme.ts, click.ts, payments.ts and access.ts run their
   real SQL against real tables, constraints included — only the
   connection differs from production.
   -------------------------------------------------------------------- */

import { PGlite, types } from "@electric-sql/pglite";
import { readFileSync } from "node:fs";
import { join } from "node:path";

let pg: PGlite | null = null;

async function conn(): Promise<PGlite> {
  if (pg) return pg;
  pg = await PGlite.create({
    // Same as production (api/_lib/db.ts): bigint arrives as a number.
    parsers: { [types.INT8]: (v: string) => Number(v) },
  });
  await pg.exec(readFileSync(join(process.cwd(), "db/schema.sql"), "utf8"));
  return pg;
}

export function dbConfigured(): boolean {
  return true;
}

export async function q<T = Record<string, unknown>>(
  text: string,
  params: readonly unknown[] = []
): Promise<T[]> {
  const res = await (await conn()).query<T>(text, params as unknown[]);
  return res.rows;
}

export async function one<T = Record<string, unknown>>(
  text: string,
  params: readonly unknown[] = []
): Promise<T | null> {
  return (await q<T>(text, params))[0] ?? null;
}

/* ------------------------------------------------------------ test helpers */

export const TEST_USER = "user-1";

/** Empty every table the payment path writes, and recreate the buyer. */
export async function reset(): Promise<void> {
  await (await conn()).exec(`
    truncate transactions, orders, entitlements, progress;
    delete from "user";
    insert into "user" ("id", "name", "email", "emailVerified")
      values ('${TEST_USER}', 'Test', 'test@noldan.uz', true);
  `);
}

export function rows(table: "orders" | "transactions" | "entitlements") {
  return q<Record<string, any>>(`select * from ${table}`);
}

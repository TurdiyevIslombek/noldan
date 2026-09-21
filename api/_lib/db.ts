/* --------------------------------------------------------------------
   The database: one Postgres, reached only from /api.

   Plain `pg` against DATABASE_URL, so any Postgres works — Neon's free
   tier in production (added from Vercel → Storage), a local PGlite
   server in development (`npm run db:dev`), an in-process PGlite in the
   payment tests (scripts/test/pglite-db.ts).

   Every query is bounded. A slow database must not become a page that
   hangs: after 5 seconds the query fails, and every caller reads a
   failure as the SAFE answer — no access, no course, no entitlement.
   -------------------------------------------------------------------- */

import pg from "pg";

// bigint (oid 20) columns — prices in tiyin, provider timestamps in ms —
// arrive as strings by default. Every value stored here fits a JS number
// exactly, and the payment code compares them as numbers.
pg.types.setTypeParser(20, (v: string) => Number(v));

export function dbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

let pool: pg.Pool | null = null;

/** The shared pool. Kept tiny: a serverless instance serves few requests
 *  at once, and Neon's pooled connection string does the real pooling. */
export function db(): pg.Pool {
  if (pool) return pool;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL sozlanmagan.");
  pool = new pg.Pool({
    connectionString,
    max: 3,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 5_000,
    query_timeout: 5_000,
  });
  // A connection the server drops while idle must not crash the function.
  pool.on("error", () => undefined);
  return pool;
}

type Params = readonly unknown[];

export async function q<T = Record<string, unknown>>(
  text: string,
  params: Params = []
): Promise<T[]> {
  const res = await db().query(text, params as unknown[]);
  return res.rows as T[];
}

export async function one<T = Record<string, unknown>>(
  text: string,
  params: Params = []
): Promise<T | null> {
  return (await q<T>(text, params))[0] ?? null;
}

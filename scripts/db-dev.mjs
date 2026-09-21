/* --------------------------------------------------------------------
   A real Postgres for local development, with nothing to install.

     npm run db:dev

   PGlite (Postgres compiled to WebAssembly) behind a local socket, so
   the site talks to it with the same driver and the same SQL as in
   production. The schema is applied on every start (it is re-runnable).
   Data lives in .pglite/ (gitignored) and survives restarts; delete the
   folder to start empty. Leave this running, and in .env.local set:

     DATABASE_URL=postgres://postgres:postgres@127.0.0.1:5433/postgres
   -------------------------------------------------------------------- */

import { PGlite } from "@electric-sql/pglite";
import { PGLiteSocketServer } from "@electric-sql/pglite-socket";
import { readFileSync } from "node:fs";

const port = Number(process.env.PGLITE_PORT ?? 5433);
const dataDir = process.env.PGLITE_DIR ?? ".pglite";

const db = await PGlite.create({ dataDir });
await db.exec(readFileSync("db/schema.sql", "utf8"));

// PGlite is single-connection underneath; the server multiplexes, so the
// site's small pool and Better Auth can share it.
const server = new PGLiteSocketServer({ db, port, host: "127.0.0.1", maxConnections: 10 });
await server.start();

console.log(`\n  Postgres (PGlite) on 127.0.0.1:${port} — data in ${dataDir}/`);
console.log(`  DATABASE_URL=postgres://postgres:postgres@127.0.0.1:${port}/postgres\n`);

const stop = async () => {
  await server.stop();
  await db.close();
  process.exit(0);
};
process.on("SIGINT", stop);
process.on("SIGTERM", stop);

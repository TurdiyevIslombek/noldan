/* --------------------------------------------------------------------
   Creates (or brings up to date) every table the site needs.

     npm run db:migrate

   Reads DATABASE_URL from the environment, or from .env.local / .env.
   Runs db/schema.sql, which is safe to run again: existing tables are
   left alone and the course seed never overwrites a price you changed.
   -------------------------------------------------------------------- */

import { existsSync, readFileSync } from "node:fs";
import pg from "pg";

for (const file of [".env.local", ".env"]) {
  if (existsSync(file)) process.loadEnvFile(file);
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error(
    "\n  DATABASE_URL is not set. Put it in .env.local (see .env.example), or run:\n" +
      "  DATABASE_URL='postgres://…' npm run db:migrate\n"
  );
  process.exit(1);
}

const client = new pg.Client({ connectionString: url });
await client.connect();
try {
  await client.query(readFileSync("db/schema.sql", "utf8"));
  const { rows } = await client.query("select id, access, price_uzs from courses order by id");
  console.log(`\n  Schema applied to ${new URL(url).host}.`);
  for (const r of rows) {
    const price = r.access === "free" ? "bepul" : `${Number(r.price_uzs) / 100} so'm`;
    console.log(`  · ${r.id.padEnd(12)} ${price}`);
  }
  console.log("");
} finally {
  await client.end();
}

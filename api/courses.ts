/* --------------------------------------------------------------------
   Public course list with prices.

   Prices live in the database rather than the bundle so they can change
   without a redeploy — and so the price the client displays and the
   price /api/checkout charges come from the same row. A price baked
   into JavaScript is a price that eventually disagrees with the till.
   -------------------------------------------------------------------- */

import { guard } from "./_lib/http";
import { dbConfigured, q } from "./_lib/db";

export default {
  async fetch(req: Request): Promise<Response> {
    const blocked = guard(req, { method: "GET", limit: 120 });
    if (blocked) return blocked;

    if (!dbConfigured()) {
      return Response.json({ courses: [], configured: false });
    }

    // Bounded (api/_lib/db.ts): a price list that cannot load should
    // render "narx yuklanmoqda", not hold the account page open.
    try {
      const courses = await q(
        `select id, name, access, price_uzs, price_usd
           from courses where is_published order by id`
      );
      return new Response(JSON.stringify({ courses, configured: true }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          // Public and identical for everyone, but prices should not go
          // stale for long after a change.
          "Cache-Control": "public, max-age=60, s-maxage=300",
        },
      });
    } catch {
      // Never let a CDN keep an empty price list.
      return new Response(JSON.stringify({ courses: [], configured: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      });
    }
  },
};

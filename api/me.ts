/* --------------------------------------------------------------------
   Who is signed in, what they own, and which sign-in buttons exist.

   One call so the client can decide, on first paint, whether to draw a
   lesson or a lock — and so the sign-in page knows which providers are
   switched on. The client caches nothing security-relevant from this:
   /api/lesson re-checks entitlement on every fetch, because a response
   the browser can edit is not an authorisation.

   A visitor with no session cookie costs no database query at all, so
   anonymous traffic never wakes the database.
   -------------------------------------------------------------------- */

import { guard } from "./_lib/http.js";
import { authConfigured, providers, sessionUser, type SessionUser } from "./_lib/auth.js";
import { q } from "./_lib/db.js";

type Me = {
  configured: boolean;
  providers: string[];
  user: SessionUser | null;
  entitlements?: string[];
  progress?: { course_id: string; lesson_id: string }[];
};

export default {
  async fetch(req: Request): Promise<Response> {
    const blocked = guard(req, { method: "GET", limit: 120 });
    if (blocked) return blocked;

    if (!authConfigured()) {
      return reply({ configured: false, providers: [], user: null });
    }

    const user = await sessionUser(req.headers);
    if (!user) {
      return reply({ configured: true, providers: providers(), user: null });
    }

    try {
      const [ents, progress] = await Promise.all([
        q<{ course_id: string }>(
          `select course_id from entitlements
            where user_id = $1 and (expires_at is null or expires_at > now())`,
          [user.id]
        ),
        q<{ course_id: string; lesson_id: string }>(
          "select course_id, lesson_id from progress where user_id = $1",
          [user.id]
        ),
      ]);
      return reply({
        configured: true,
        providers: providers(),
        user,
        entitlements: ents.map((e) => e.course_id),
        progress,
      });
    } catch {
      // Signed in, but the database is slow: show the account and own
      // nothing for now. The paywall itself re-checks in /api/lesson.
      return reply({ configured: true, providers: providers(), user });
    }
  },
};

function reply(body: Me): Response {
  return new Response(JSON.stringify({ entitlements: [], progress: [], ...body }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "private, no-store",
    },
  });
}

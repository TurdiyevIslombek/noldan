/* --------------------------------------------------------------------
   Lesson progress, synced to the account.

   Progress used to live in localStorage only, which meant a student who
   opened the course on their phone started from nothing. Signed-in
   progress is written here; signed-out visitors keep the localStorage
   path and lose nothing.

   Writes are always scoped to the user in the caller's own session
   cookie — the body cannot name a user.
   -------------------------------------------------------------------- */

import { guard } from "./_lib/http";
import { authConfigured, sessionUser } from "./_lib/auth";
import { q } from "./_lib/db";

export default {
  async fetch(req: Request): Promise<Response> {
    const blocked = guard(req, { method: "POST", limit: 120 });
    if (blocked) return blocked;

    if (!authConfigured()) {
      return Response.json({ ok: false, configured: false }, { status: 503 });
    }

    const user = await sessionUser(req.headers);
    if (!user) {
      return Response.json({ error: "Avval tizimga kiring." }, { status: 401 });
    }

    let body: { courseId?: unknown; lessonId?: unknown; done?: unknown };
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Notoʻgʻri JSON" }, { status: 400 });
    }

    const courseId = typeof body.courseId === "string" ? body.courseId.slice(0, 64) : "";
    const lessonId = typeof body.lessonId === "string" ? body.lessonId.slice(0, 64) : "";
    if (!courseId || !lessonId) {
      return Response.json({ error: "courseId va lessonId kerak." }, { status: 400 });
    }

    try {
      if (body.done === false) {
        await q(
          "delete from progress where user_id = $1 and course_id = $2 and lesson_id = $3",
          [user.id, courseId, lessonId]
        );
      } else {
        await q(
          `insert into progress (user_id, course_id, lesson_id)
           values ($1, $2, $3)
           on conflict do nothing`,
          [user.id, courseId, lessonId]
        );
      }
    } catch {
      return Response.json({ error: "Saqlab boʻlmadi." }, { status: 503 });
    }

    return Response.json({ ok: true });
  },
};

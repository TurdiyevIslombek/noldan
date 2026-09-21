/* --------------------------------------------------------------------
   Serves one lesson body, after checking the caller may read it.

   This endpoint is the paywall. Not the UI — the UI only draws a lock.
   Paid lesson text exists in api/_content, is never bundled into a
   client chunk, and leaves the server only through here, only for a
   user with a live entitlement.

   Free courses are answered without a session at all: they are free,
   and requiring sign-in to read them would be a worse product for no
   gain.
   -------------------------------------------------------------------- */

import { guard } from "./_lib/http";
import { findLessonBody } from "./_content/index";
import { hasCourseAccess } from "./_lib/access";
import { authConfigured, sessionUser } from "./_lib/auth";

export default {
  async fetch(req: Request): Promise<Response> {
    const blocked = guard(req, { method: "GET", limit: 120 });
    if (blocked) return blocked;

    const url = new URL(req.url);
    const courseId = url.searchParams.get("course") ?? "";
    const lessonId = url.searchParams.get("lesson") ?? "";

    const found = findLessonBody(courseId, lessonId);
    if (!found) {
      return Response.json({ error: "Dars topilmadi." }, { status: 404 });
    }

    const { course, lesson } = found;

    // A free course needs no account and no database round trip.
    if ((course.access ?? "paid") === "free") {
      return json(lesson);
    }

    if (!authConfigured()) {
      return Response.json(
        { error: "Server sozlanmagan.", locked: true },
        { status: 503 }
      );
    }

    const user = await sessionUser(req.headers);
    const allowed = await hasCourseAccess(user?.id ?? null, course.id);

    if (!allowed) {
      // 402 rather than 403: this is not "you may never", it is "not yet".
      return Response.json(
        {
          error: user
            ? "Bu kurs uchun ruxsat yoʻq."
            : "Bu dars pullik. Kirish uchun tizimga kiring.",
          locked: true,
          needsAuth: !user,
          courseId: course.id,
        },
        { status: 402 }
      );
    }

    return json(lesson);
  },
};

function json(lesson: unknown): Response {
  return new Response(JSON.stringify({ lesson }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      // Personalised by entitlement — must never be cached by a CDN or
      // shared proxy, or one student's paid lesson serves another's miss.
      "Cache-Control": "private, no-store",
    },
  });
}

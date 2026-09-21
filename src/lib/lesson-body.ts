/* --------------------------------------------------------------------
   Getting the text of one lesson.

   Free courses are already in this bundle, so they resolve
   synchronously — no spinner for content the visitor has had since
   first paint. Paid courses are fetched from /api/lesson, which is
   where the entitlement is actually enforced.

   The distinction is deliberate and visible: if a lesson body can be
   read from a local import, it was never protected in the first place,
   and pretending otherwise with a UI lock would be theatre.
   -------------------------------------------------------------------- */

import { useEffect, useState } from "react";
import { findLesson } from "./curriculum";
import { courseMeta } from "./catalog.generated";
import type { Lesson } from "./curriculum-types";
import { apiFetch } from "./api";

export type BodyState =
  | { state: "loading" }
  | { state: "ready"; lesson: Lesson }
  | { state: "locked"; needsAuth: boolean }
  | { state: "error"; message: string };

/** `sessionKey` is the signed-in user's id (or null). It is not used
 *  for the request — the session cookie is — but it belongs in the dependency
 *  list: the same URL answers 402 signed out and 200 signed in, so
 *  signing in has to re-ask. */
export function useLessonBody(
  courseId: string,
  lessonId: string,
  sessionKey: string | null
): BodyState {
  const access = courseMeta(courseId)?.access ?? "paid";

  const [body, setBody] = useState<BodyState>(() => {
    if (access === "free") {
      const local = findLesson(courseId, lessonId);
      return local
        ? { state: "ready", lesson: local.lesson }
        : { state: "error", message: "Dars topilmadi." };
    }
    return { state: "loading" };
  });

  useEffect(() => {
    if (access === "free") {
      const local = findLesson(courseId, lessonId);
      setBody(
        local
          ? { state: "ready", lesson: local.lesson }
          : { state: "error", message: "Dars topilmadi." }
      );
      return;
    }

    let alive = true;
    setBody({ state: "loading" });

    apiFetch(
      `/api/lesson?course=${encodeURIComponent(courseId)}&lesson=${encodeURIComponent(lessonId)}`,
      // A lesson that never arrives should say so rather than spin
      // forever behind a skeleton.
      { signal: AbortSignal.timeout(15_000) }
    )
      .then(async (res) => {
        const data = (await res.json().catch(() => ({}))) as {
          lesson?: Lesson;
          needsAuth?: boolean;
          error?: string;
        };
        if (!alive) return;

        if (res.status === 402) {
          setBody({ state: "locked", needsAuth: Boolean(data.needsAuth) });
          return;
        }
        if (!res.ok || !data.lesson) {
          setBody({ state: "error", message: data.error ?? "Darsni yuklab boʻlmadi." });
          return;
        }
        setBody({ state: "ready", lesson: data.lesson });
      })
      .catch(() => {
        if (alive) setBody({ state: "error", message: "Tarmoqda xatolik." });
      });

    return () => {
      alive = false;
    };
  }, [courseId, lessonId, access, sessionKey]);

  return body;
}

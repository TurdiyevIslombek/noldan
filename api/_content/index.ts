/* --------------------------------------------------------------------
   The complete curriculum, server side.

   This module is the ONLY place that holds every lesson body at once.
   It lives under api/_content so that:

     · Vite never sees it, so no paid text can leak into a client chunk;
     · Vercel ignores `_`-prefixed directories as routes, so it is not
       reachable at a URL of its own.

   src/lib/catalog.generated.ts is derived from here at build time, so
   the syllabus the browser draws and the lessons the server serves can
   never drift apart.
   -------------------------------------------------------------------- */

import { TOKENIZER_COURSE } from "../../src/lib/curriculum.js";
import { TRANSFORMER_COURSE } from "./transformer.js";
import type { Course, Lesson } from "../../src/lib/curriculum-types.js";

export const ALL_COURSES: Course[] = [TOKENIZER_COURSE, TRANSFORMER_COURSE];

export function findCourse(courseId: string): Course | null {
  return ALL_COURSES.find((c) => c.id === courseId) ?? null;
}

export function findLessonBody(
  courseId: string,
  lessonId: string
): { course: Course; lesson: Lesson } | null {
  const course = findCourse(courseId);
  if (!course) return null;
  const lesson = course.lessons.find((l) => l.id === lessonId);
  if (!lesson) return null;
  return { course, lesson };
}

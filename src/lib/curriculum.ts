/* --------------------------------------------------------------------
   The free course, as the client sees it.

   Lesson bodies are no longer written here by hand. Each lesson is a
   Markdown file in content/<course>/, converted at build time (and on
   save, in dev) by scripts/lessons-md.mjs into lessons.generated.ts.
   Free courses ship in the bundle; paid ones are generated into
   api/_content instead and never reach a client chunk.

   The previous hand-written lessons are kept in archive/lessons-v1.
   -------------------------------------------------------------------- */

import type { Course } from "./curriculum-types.js";
import { FREE_LESSONS } from "./lessons.generated.js";

export type { Block, Course, Exercise, Lesson, Section } from "./curriculum-types.js";

export const TOKENIZER_COURSE: Course = {
  id: "tokenizator",
  name: "Tokenizator qurish",
  short: "TK",
  tagline: "Hech qachon kod yozmaganlar uchun. Bosqichma-bosqich. Oʻzbek tilida.",
  access: "free",
  lessons: FREE_LESSONS.tokenizator ?? [],
};

export const COURSES: Course[] = [TOKENIZER_COURSE];

export function findLesson(courseId: string, lessonId: string) {
  const course = COURSES.find((c) => c.id === courseId);
  if (!course) return null;
  const index = course.lessons.findIndex((l) => l.id === lessonId);
  if (index < 0) return null;
  return {
    course,
    lesson: course.lessons[index],
    prev: index > 0 ? course.lessons[index - 1] : null,
    next: index < course.lessons.length - 1 ? course.lessons[index + 1] : null,
    index,
  };
}

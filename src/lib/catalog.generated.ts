/* GENERATED FILE — do not edit.
 *
 * Produced by scripts/build-catalog.mjs from api/_content at build time.
 * Metadata only: titles, numbers, durations and status. No lesson text,
 * because this file ships to every visitor whether they paid or not.
 *
 * Regenerate with:  npm run catalog
 */

import type { CourseMeta } from "./curriculum-types.js";

export const CATALOG: CourseMeta[] = [
  {
    "id": "tokenizator",
    "name": "Tokenizator qurish",
    "short": "TK",
    "tagline": "Hech qachon kod yozmaganlar uchun. Bosqichma-bosqich. Oʻzbek tilida.",
    "access": "free",
    "lessons": [
      {
        "id": "dars-01",
        "n": 1,
        "title": "Nega o'zbek tili AI uchun qimmat?",
        "subtitle": "",
        "minutes": 40,
        "status": "ready"
      },
      {
        "id": "dars-02",
        "n": 2,
        "title": "Matn bilan ishlash",
        "subtitle": "",
        "minutes": 45,
        "status": "ready"
      },
      {
        "id": "dars-03",
        "n": 3,
        "title": "Ro'yxat va tsikl",
        "subtitle": "",
        "minutes": 50,
        "status": "ready"
      },
      {
        "id": "dars-04",
        "n": 4,
        "title": "Lug'at, shart va funksiya",
        "subtitle": "",
        "minutes": 55,
        "status": "ready"
      },
      {
        "id": "dars-05",
        "n": 5,
        "title": "Kompyuter harfni qanday saqlaydi",
        "subtitle": "",
        "minutes": 45,
        "status": "ready"
      },
      {
        "id": "dars-06",
        "n": 6,
        "title": "Baytlar",
        "subtitle": "",
        "minutes": 50,
        "status": "ready"
      },
      {
        "id": "dars-07",
        "n": 7,
        "title": "Birinchi tokenizator va uning muammosi",
        "subtitle": "",
        "minutes": 45,
        "status": "ready"
      },
      {
        "id": "dars-08",
        "n": 8,
        "title": "Juftlarni sanash",
        "subtitle": "",
        "minutes": 50,
        "status": "ready"
      },
      {
        "id": "dars-09",
        "n": 9,
        "title": "Birlashtirish (`merge`)",
        "subtitle": "",
        "minutes": 55,
        "status": "ready"
      }
    ]
  },
  {
    "id": "transformer",
    "name": "Transformer (GPT) qurish",
    "short": "TR",
    "tagline": "Tokenizatordan keyingi qadam — oʻz til modelingizni quramiz.",
    "access": "paid",
    "lessons": []
  }
];

export function courseMeta(id: string): CourseMeta | null {
  return CATALOG.find((c) => c.id === id) ?? null;
}

export function lessonMeta(courseId: string, lessonId: string) {
  const course = courseMeta(courseId);
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

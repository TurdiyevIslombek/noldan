/* --------------------------------------------------------------------
   Curriculum shape, shared by the client renderer and the server that
   serves paid lesson bodies.

   This file holds TYPES ONLY and no lesson text, which is the point:
   the browser needs to know what a Lesson looks like in order to render
   one, but it must not receive the lessons it has not paid for. Bodies
   for paid courses live in api/_content and are fetched per lesson.
   -------------------------------------------------------------------- */

export type Block =
  | { kind: "text"; text: string }
  | { kind: "bullets"; items: string[] }
  | { kind: "steps"; items: string[] }
  | { kind: "note"; tone: "tip" | "warn" | "key"; text: string }
  /** `mode`: "type" (default) must be typed out before it can be copied;
   *  "static" is shown read-only (answers); "template" has blanks the
   *  student fills in themselves. */
  | { kind: "code"; code: string; lang?: string; mode?: "type" | "static" | "template" }
  | { kind: "output"; text: string; label?: string; error?: boolean }
  | { kind: "pre"; text: string }
  | { kind: "flow"; text: string }
  | { kind: "viz"; id: string }
  | { kind: "subhead"; text: string }
  | { kind: "h3"; id: string; text: string }
  | { kind: "table"; head: string[]; rows: string[][] }
  | { kind: "goals"; items: string[] }
  | { kind: "reveal"; summary: string; blocks: Block[] }
  | { kind: "exercise"; label: string; blocks: Block[]; answer?: { summary: string; blocks: Block[] } }
  /** A slot for an animation file at public/media/<course>/<lesson>/<id>.mp4 */
  | { kind: "media"; id: string; title: string };

export type Exercise = {
  id: string;
  label: string;
  prompt: string;
  hint?: string;
  answerCode?: string;
  answerOutput?: string;
  answerText?: string;
};

export type Section = {
  id: string;
  title: string;
  blocks: Block[];
};

export type Lesson = {
  id: string;
  /** Display number. `null` for the non-numbered opening guide. */
  n: number | null;
  title: string;
  subtitle: string;
  minutes: number;
  /** Group heading, for courses split into parts. */
  part?: string;
  /** "soon" = listed in the syllabus, content not written yet. */
  status?: "ready" | "soon";
  intro: Block[];
  sections: Section[];
  exercises: Exercise[];
  /** YouTube video id for the lesson's walkthrough, if recorded. */
  video?: string;
  /** "Kerak:" — what the student needs before starting. */
  needs?: string;
};

export type Course = {
  id: string;
  name: string;
  short: string;
  tagline: string;
  /** "free" ships in the client bundle; "paid" is served per lesson from
   *  /api/lesson after an entitlement check. */
  access?: "free" | "paid";
  lessons: Lesson[];
};

/* ---------------------------------------------------------------------
   The metadata half — everything needed to draw a syllabus, a lesson
   list, progress and prev/next links, with none of the teaching text.
   Safe to ship to anyone.
   --------------------------------------------------------------------- */

export type LessonMeta = Pick<
  Lesson,
  "id" | "n" | "title" | "subtitle" | "minutes" | "part" | "status"
>;

export type CourseMeta = {
  id: string;
  name: string;
  short: string;
  tagline: string;
  access: "free" | "paid";
  lessons: LessonMeta[];
};

export function toLessonMeta(l: Lesson): LessonMeta {
  return {
    id: l.id,
    n: l.n,
    title: l.title,
    subtitle: l.subtitle,
    minutes: l.minutes,
    ...(l.part ? { part: l.part } : {}),
    ...(l.status ? { status: l.status } : {}),
  };
}

export function toCourseMeta(c: Course): CourseMeta {
  return {
    id: c.id,
    name: c.name,
    short: c.short,
    tagline: c.tagline,
    access: c.access ?? "paid",
    lessons: c.lessons.map(toLessonMeta),
  };
}

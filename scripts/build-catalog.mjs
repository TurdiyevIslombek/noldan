/* --------------------------------------------------------------------
   Generates src/lib/catalog.generated.ts from api/_content.

   The browser needs a syllabus: lesson numbers, titles, durations,
   which parts exist, what is still "soon". It must NOT get the lesson
   text for a course nobody paid for. Hand-maintaining a second copy of
   the titles would drift the moment a lesson is renamed, so the
   metadata is derived from the real content at build time instead.

   Run by `npm run build` via the prebuild hook. esbuild (already a Vite
   dependency) bundles the TypeScript to memory and we import it as a
   data: URL — no temp files, no extra toolchain.
   -------------------------------------------------------------------- */

import { build } from "esbuild";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parseLesson } from "./lessons-md.mjs";

/* ---- 1. Markdown lessons → generated TypeScript ----------------------
   Free courses are generated into src/ (they ship in the bundle); every
   other course into api/_content/, where only the server can read it. */
const FREE = new Set(["tokenizator"]);
const free = {};
const paid = {};
if (existsSync("content")) {
  for (const dir of readdirSync("content", { withFileTypes: true })) {
    if (!dir.isDirectory()) continue;
    const lessons = readdirSync(join("content", dir.name))
      .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
      .sort()
      .map((f) => parseLesson(readFileSync(join("content", dir.name, f), "utf8"), f.replace(/\.md$/, "")))
      .sort((a, b) => (a.n ?? -1) - (b.n ?? -1));
    (FREE.has(dir.name) ? free : paid)[dir.name] = lessons;
  }
}
const banner = "/* GENERATED from content/*.md by scripts/build-catalog.mjs — do not edit. */\n";
writeFileSync(
  "src/lib/lessons.generated.ts",
  banner +
    'import type { Lesson } from "./curriculum-types";\n\n' +
    `export const FREE_LESSONS: Record<string, Lesson[]> = ${JSON.stringify(free, null, 2)};\n`,
  "utf8"
);
writeFileSync(
  "api/_content/lessons.generated.ts",
  banner +
    'import type { Lesson } from "../../src/lib/curriculum-types";\n\n' +
    `export const PAID_LESSONS: Record<string, Lesson[]> = ${JSON.stringify(paid, null, 2)};\n`,
  "utf8"
);

/* ---- 2. The catalog -------------------------------------------------- */

const result = await build({
  entryPoints: ["api/_content/index.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  write: false,
  logLevel: "warning",
});

const code = result.outputFiles[0].text;
const mod = await import(
  "data:text/javascript;base64," + Buffer.from(code).toString("base64")
);

const meta = mod.ALL_COURSES.map((c) => ({
  id: c.id,
  name: c.name,
  short: c.short,
  tagline: c.tagline,
  access: c.access ?? "paid",
  lessons: c.lessons.map((l) => ({
    id: l.id,
    n: l.n,
    title: l.title,
    subtitle: l.subtitle,
    minutes: l.minutes,
    ...(l.part ? { part: l.part } : {}),
    ...(l.status ? { status: l.status } : {}),
  })),
}));

const out = `/* GENERATED FILE — do not edit.
 *
 * Produced by scripts/build-catalog.mjs from api/_content at build time.
 * Metadata only: titles, numbers, durations and status. No lesson text,
 * because this file ships to every visitor whether they paid or not.
 *
 * Regenerate with:  npm run catalog
 */

import type { CourseMeta } from "./curriculum-types";

export const CATALOG: CourseMeta[] = ${JSON.stringify(meta, null, 2)};

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
`;

writeFileSync("src/lib/catalog.generated.ts", out, "utf8");

const counts = meta
  .map((c) => `${c.id} (${c.access}): ${c.lessons.length}`)
  .join(", ");
console.log(`catalog: ${counts}`);

import type { Block, Lesson } from "./curriculum-types";

/* --------------------------------------------------------------------
   What every public page is called, and how it describes itself.

   Read in two places: by the app, which writes it into the document
   head as the visitor moves between pages, and by scripts/prerender.mjs,
   which bakes it into the static HTML a search engine fetches. One
   table, so the two can never disagree.
   -------------------------------------------------------------------- */

export type PageMeta = { title: string; description: string; noindex?: boolean };

export const SITE_NAME = "Noldan";

export const PAGES: Record<string, PageMeta> = {
  "/": {
    title: "Noldan — Sunʼiy intellektni noldan quring",
    description:
      "Oʻzbek tilida bepul kurs: ChatGPT kabi modellar qanday ishlashini oddiy tilda oʻrganing va oʻzbek tili uchun oʻz tokenizatoringiz va modelingizni noldan quring. Kod bilish shart emas.",
  },
  "/learn": {
    title: "Darslar — Noldan",
    description:
      "Tokenizator qurish (bepul) va Transformer (GPT) qurish kurslari: oʻzbek tilida, bosqichma-bosqich, hech qachon kod yozmaganlar uchun ham.",
  },
  "/playground": {
    title: "Mashq maydoni — Noldan",
    description:
      "Hugging Face’dagi haqiqiy tokenizatorlarni brauzeringizda sinab koʻring: oʻzbekcha matn nechta tokenga boʻlinishini oʻzingiz oʻlchang.",
  },
  "/loyiha": {
    title: "Loyiha — Noldan",
    description:
      "Kurs yakunidagi loyiha: oʻz korpusingizni tanlang, tokenizator va kichik GPT oʻqiting, natijani Hugging Face’da nashr qiling.",
  },
  "/kirish": { title: "Kirish — Noldan", description: "Noldan hisobingizga kiring.", noindex: true },
  "/hisobim": { title: "Hisobim — Noldan", description: "Kurslaringiz va toʻlovlaringiz.", noindex: true },
  "/eski": { title: "Noldan", description: "Eski bosh sahifa.", noindex: true },
};

export const NOT_FOUND: PageMeta = {
  title: "Sahifa topilmadi — Noldan",
  description: "Bu manzilda sahifa yoʻq.",
  noindex: true,
};

export const lessonLabel = (n: number | null) =>
  n === null ? "Kirish" : `Dars ${String(n).padStart(2, "0")}`;

const plain = (s: string) => s.replace(/\*\*|`|\*/g, "").replace(/\s+/g, " ").trim();

/** Cut on a word boundary: search results show about 155 characters. */
function clip(s: string, max = 158) {
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—-]+$/, "") + "…";
}

type LessonLike = Pick<Lesson, "title" | "n"> & Partial<Pick<Lesson, "sections" | "intro">>;

/** A lesson describes itself with its own "Bu darsdan keyin siz…" list,
 *  which is exactly what a searcher wants to know. */
export function describeLesson(lesson: LessonLike): string {
  const all: Block[] = [...(lesson.intro ?? []), ...(lesson.sections ?? []).flatMap((s) => s.blocks)];
  const goals = all.find((b): b is Extract<Block, { kind: "goals" }> => b.kind === "goals");
  if (goals) return clip("Bu darsdan keyin siz " + goals.items.map(plain).join(" "));
  const first = all.find((b): b is Extract<Block, { kind: "text" }> => b.kind === "text");
  return first ? clip(plain(first.text)) : "";
}

export function lessonPageMeta(courseName: string, lesson: LessonLike): PageMeta {
  return {
    title: `${lesson.title} — ${lessonLabel(lesson.n)} · ${SITE_NAME}`,
    description: describeLesson(lesson) || `${courseName} kursi: ${lesson.title}`,
  };
}

import type { Course } from "../../src/lib/curriculum-types";
import { PAID_LESSONS } from "./lessons.generated";

/* The paid course. Its lessons are Markdown in content/transformer/,
   generated server-side only. Empty until the new lessons are added —
   the previous ones are kept in archive/lessons-v1. */
export const TRANSFORMER_COURSE: Course = {
  id: "transformer",
  name: "Transformer (GPT) qurish",
  short: "TR",
  tagline: "Tokenizatordan keyingi qadam — oʻz til modelingizni quramiz.",
  access: "paid",
  lessons: PAID_LESSONS.transformer ?? [],
};

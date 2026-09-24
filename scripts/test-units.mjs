/* --------------------------------------------------------------------
   Unit tests for the parts of the site that do real computation:

     · the byte-level BPE tokenizer that runs in the browser
       (src/lib/hf-tokenizer.ts) — normalizers, merge order, and a byte
       round trip that survives characters split across tokens;
     · the BPE trainer (src/lib/bpe.ts) — the algorithm the course
       teaches, checked against the numbers the lessons print;
     · the lesson parser (scripts/lessons-md.mjs) — including the rule
       that an author's production notes are never published.

   No network: the tokenizers here are built inline, so the tests run the
   same on a laptop, in CI, or offline.

   Run:  npm run test:units
   -------------------------------------------------------------------- */

import { build } from "esbuild";
import { mkdirSync } from "node:fs";
import { pathToFileURL } from "node:url";
import test from "node:test";
import assert from "node:assert/strict";

const entry = `
  export { parseTokenizerJson, encode, decode, preSplit } from "../src/lib/hf-tokenizer";
  export { trainBPE, encode as encodeBpe, DEMO_CORPUS, PROBE } from "../src/lib/bpe";
  export { parseLesson } from "./lessons-md.mjs";
`;
const outdir = "node_modules/.cache/noldan-tests";
mkdirSync(outdir, { recursive: true });
const outfile = `${outdir}/units.mjs`;
await build({
  stdin: { contents: entry, resolveDir: "scripts", loader: "ts" },
  bundle: true,
  format: "esm",
  platform: "node",
  outfile,
  logLevel: "warning",
});
const T = await import(pathToFileURL(outfile).href);

/* ---- helpers ------------------------------------------------------------ */

/** GPT-2's byte → printable-character table, written out independently of
 *  the code under test, so a mistake there cannot hide itself. */
const BYTE_CHAR = (() => {
  const keep = [];
  for (let b = 33; b <= 126; b++) keep.push(b);
  for (let b = 161; b <= 172; b++) keep.push(b);
  for (let b = 174; b <= 255; b++) keep.push(b);
  const map = new Map(keep.map((b) => [b, String.fromCodePoint(b)]));
  let n = 0;
  for (let b = 0; b < 256; b++) if (!map.has(b)) map.set(b, String.fromCodePoint(256 + n++));
  return map;
})();
const byteLevel = (s) => Array.from(new TextEncoder().encode(s), (b) => BYTE_CHAR.get(b)).join("");

/** A tokenizer.json with all 256 byte tokens plus the given merges. */
function tokenizer(merges, extra = {}) {
  const vocab = {};
  for (let b = 0; b < 256; b++) vocab[BYTE_CHAR.get(b)] = b;
  let id = 256;
  for (const m of merges) {
    const [a, b] = Array.isArray(m) ? m : m.split(" ");
    vocab[a + b] = id++;
  }
  return T.parseTokenizerJson(
    { model: { type: "BPE", vocab, merges }, pre_tokenizer: { type: "ByteLevel" }, ...extra },
    "test/tokenizer",
    "test",
    0
  );
}

const pieces = (tokens) => tokens.map((t) => t.text);

/* The normalizer uzbek-bpe-16k actually ships with. */
const UZ_NORMALIZER = {
  type: "Sequence",
  normalizers: [
    { type: "Replace", pattern: { String: "’" }, content: "'" },
    { type: "Replace", pattern: { String: "`" }, content: "'" },
    { type: "Replace", pattern: { String: "o'" }, content: "oʻ" },
    { type: "Replace", pattern: { String: "O'" }, content: "Oʻ" },
    { type: "Replace", pattern: { String: "g'" }, content: "gʻ" },
    { type: "Replace", pattern: { String: "G'" }, content: "Gʻ" },
    { type: "Replace", pattern: { Regex: "(?<=\\p{L})'(?=\\p{L})" }, content: "ʼ" },
  ],
};

/* ---- tokenizer ---------------------------------------------------------- */

test("normalizer turns the apostrophes people type into Uzbek letters", () => {
  const tk = tokenizer([], { normalizer: UZ_NORMALIZER });
  assert.equal(tk.hasNormalizer, true);
  assert.equal(
    tk.normalize("O'zbekiston, g'alaba, ko’raman, ta'lim"),
    "Oʻzbekiston, gʻalaba, koʻraman, taʼlim"
  );
});

test("normalizer replacement text is literal, even with $", () => {
  const tk = tokenizer([], {
    normalizer: { type: "Replace", pattern: { Regex: "a" }, content: "$&!" },
  });
  assert.equal(tk.normalize("xa"), "x$&!");
});

test("a tokenizer without a normalizer leaves text alone", () => {
  const tk = tokenizer([]);
  assert.equal(tk.hasNormalizer, false);
  assert.equal(tk.normalize("o'qish"), "o'qish");
});

test("encode applies the normalizer before splitting", () => {
  // ʻ is two bytes, so a tokenizer learns it in two merges: its bytes
  // together, then o + ʻ. Typed o' must then come out as one oʻ token.
  const [b1, b2] = Array.from(byteLevel("ʻ"));
  const tk = tokenizer([`${b1} ${b2}`, `o ${b1}${b2}`], { normalizer: UZ_NORMALIZER });
  assert.deepEqual(pieces(T.encode("o'", tk)), ["oʻ"]);
  // Without the normalizer the same keystrokes stay two unrelated pieces.
  assert.deepEqual(pieces(T.encode("o'", tokenizer([`${b1} ${b2}`, `o ${b1}${b2}`]))), ["o", "'"]);
});

test("pre-split keeps a leading space on the word and never crosses words", () => {
  assert.deepEqual(T.preSplit("Men oʻqishni yaxshi"), ["Men", " oʻqishni", " yaxshi"]);
});

test("merges apply in the order they were learned", () => {
  const laFirst = tokenizer(["l a", "la r"]);
  const arFirst = tokenizer(["a r", "l ar"]);
  assert.deepEqual(pieces(T.encode("lar", laFirst)), ["lar"]);
  assert.deepEqual(pieces(T.encode("lar", tokenizer(["a r", "l a"]))), ["l", "ar"]);
  assert.deepEqual(pieces(T.encode("lar", arFirst)), ["lar"]);
});

test('merges written as "a b" and as ["a","b"] mean the same thing', () => {
  const asText = tokenizer(["l a", "b o", "bo la"]);
  const asPairs = tokenizer([["l", "a"], ["b", "o"], ["bo", "la"]]);
  for (const s of ["bolalar", "lala", "abc"]) {
    assert.deepEqual(pieces(T.encode(s, asText)), pieces(T.encode(s, asPairs)));
  }
});

test("every token carries its id; a piece missing from the vocabulary is flagged, not dropped", () => {
  const tk = tokenizer(["l a"]);
  tk.vocab.delete("!");
  const out = T.encode("la!", tk);
  assert.deepEqual(out.map((t) => [t.text, t.id]), [["la", 256], ["!", -1]]);
});

test("decode(encode(x)) gives x back, even when a token splits a character", () => {
  // No merges: ʻ, 漢 and 😀 are each cut into single-byte tokens.
  const tk = tokenizer([]);
  for (const s of ["oʻzbek tili", "漢字", "😀 salom", "Kitoblar — 2024-yil!"]) {
    const tokens = T.encode(s, tk);
    assert.equal(T.decode(tokens), s);
    assert.equal(tokens.length, new TextEncoder().encode(s).length);
  }
});

/* ---- the BPE trainer ---------------------------------------------------- */

test("training finds the pair the course finds first: l + a", () => {
  // Dars 04's sentence; the lesson counts ('l','a') 8 times — the top pair.
  const text = "bolalar kitoblarni oʻqishdi. bolalar darslarni yozishdi. bolalar maktabga borishdi.";
  const m = T.trainBPE(text, 257, "bolalar");
  assert.equal(m.mergeCount, 1);
  assert.deepEqual(m.vocab.get(256), [108, 97]); // "la"
});

test("encoding with a trained model loses nothing", () => {
  const m = T.trainBPE(T.DEMO_CORPUS, 700, T.PROBE);
  for (const s of [T.PROBE, "Oʻzbekiston Respublikasi", "yangi soʻz: xyzq 😀"]) {
    const bytes = T.encodeBpe(s, m).flatMap((t) => t.bytes);
    assert.deepEqual(bytes, Array.from(new TextEncoder().encode(s)));
  }
});

test("more merges never make held-out text longer", () => {
  const m = T.trainBPE(T.DEMO_CORPUS, 700, T.PROBE);
  const tokens = m.curve.map((p) => p.tokens);
  assert.equal(tokens[0], new TextEncoder().encode(T.PROBE).length);
  for (let i = 1; i < tokens.length; i++) assert.ok(tokens[i] <= tokens[i - 1]);
  assert.ok(tokens.at(-1) < tokens[0] * 0.6, "the demo tokenizer should compress the probe well");
});

/* ---- the lesson parser -------------------------------------------------- */

const LESSON = [
  "# Dars 09 — Birlashtirish (`merge`)",
  "",
  "> **Vaqt:** ~55 daqiqa",
  "> **Kerak:** Dars 08",
  "",
  "## 1. Bitta savol",
  "",
  "```python",
  "# izoh — bu sarlavha emas",
  'print("salom")',
  "```",
  "",
  "**Natija:**",
  "",
  "```",
  "salom",
  "```",
  "",
  "```python",
  "print(salom)",
  "```",
  "",
  "```",
  "NameError: name 'salom' is not defined",
  "```",
  "",
  "<!-- animatsiya: k1 | for tsikli qulaydi -->",
  "",
  "## 2. Mashqlar",
  "",
  "**Mashq 1.** Nima chiqadi?",
  "",
  "<details>",
  "<summary>Javobni koʻrsatish</summary>",
  "",
  "```python",
  "print(1 + 1)",
  "```",
  "</details>",
  "",
  "```python",
  "x = ___",
  "```",
  "",
  "# 🎬 Ishlab chiqarish materiallari",
  "",
  "SECRET VIDEO SCRIPT — never published",
].join("\n");

test("production notes after the second top-level heading are never published", () => {
  const lesson = T.parseLesson(LESSON, "dars-09");
  assert.ok(!JSON.stringify(lesson).includes("SECRET VIDEO SCRIPT"));
});

test("a Python # comment inside code does not end the lesson", () => {
  const lesson = T.parseLesson(LESSON, "dars-09");
  assert.equal(lesson.sections.length, 2);
});

test("lesson header: number, plain-text title, minutes", () => {
  const lesson = T.parseLesson(LESSON, "dars-09");
  assert.equal(lesson.n, 9);
  assert.equal(lesson.title, "Birlashtirish (merge)");
  assert.equal(lesson.minutes, 55);
  assert.equal(lesson.needs, "Dars 08");
});

test("code, printed output, errors, animations, exercises", () => {
  const [first, second] = T.parseLesson(LESSON, "dars-09").sections;
  const kinds = first.blocks.map((b) => b.kind + (b.mode ? ":" + b.mode : "") + (b.error ? ":error" : ""));
  assert.deepEqual(kinds, ["code:type", "output", "code:type", "output:error", "media"]);
  assert.equal(first.blocks[4].id, "k1");

  const ex = second.blocks.find((b) => b.kind === "exercise");
  assert.equal(ex.label, "Mashq 1");
  assert.equal(ex.answer.blocks[0].mode, "static"); // answers are read-only
  const template = second.blocks.flatMap((b) => (b.kind === "exercise" ? b.blocks : [b])).find((b) => b.mode === "template");
  assert.ok(template, "code with ___ is a fill-in template, not a typing exercise");
});

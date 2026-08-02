# Noldan — one-shot rebuild prompt

Paste everything below the line into a fresh chat, and attach your lesson
markdown files. It rebuilds the whole site.

---

Build **Noldan**, a free open-source platform that teaches people to build AI
from scratch — tokenizer, transformer, training — by writing the code
themselves. Audience: self-taught learners in Uzbekistan and Central Asia with
no access to paid courses. **Every word of the interface is Uzbek (Latin
script), including the homepage.** Tone: technical and confident; assume the
reader is smart and impatient. Never use marketing filler.

I am attaching the course content as markdown. **Transcribe that Uzbek text
verbatim into the data files — never paraphrase it, never translate it, never
invent lessons, statistics, module names or results that are not in my files.**
If a lesson is missing, register it in the syllabus with `status: "soon"` and
say so; do not write filler.

Work autonomously. Do not stop to ask about anything specified below.

---

## 0. Tools and skills — set these up before writing code

**Install and actually use these.** Do not skip them and hand-roll from memory.

| What | How | Use it for |
|---|---|---|
| **impeccable** | `/plugin marketplace add pbakaus/impeccable` | Design direction, then a finish audit before you report done. Run its detector and fix what it flags. |
| **GSAP skills** | Load `gsap-core`, `gsap-scrolltrigger`, `gsap-react`, `gsap-timeline`, `gsap-plugins` | Every animation decision. `useGSAP`, `contextSafe`, cleanup, SplitText. |
| **frontend-design** | Load the skill | Typography and visual direction, so this does not read as a template. |
| **context7 MCP** | `resolve-library-id` → `query-docs` | Current API for Vite 6, Tailwind v4, react-router v7, GSAP 3.13+. Your training data is probably stale on Tailwind v4 and SplitText's licence change. |
| **WebSearch / WebFetch** | built in | Sourcing a real Uzbek corpus (§13) and checking licences. Do not invent training text. |
| **Browser preview tools** | `preview_start` with a `.claude/launch.json` on port 5188 | Verify every route yourself. Never ask me to check something you could check. |
| **librsvg** | `brew install librsvg` | Rendering `public/og.png` from SVG (§12). |

**Evaluated and rejected — do not relitigate:**

- **shadcn/ui** — the design system here is hand-written CSS custom properties.
  shadcn is Tailwind-utility + Radix and would create a second parallel system.
  (Its MCP is fine for *browsing* component ideas; do not install the runtime.)
- **`@canvas-ui/liquid-react`** — does not exist on npm. `@canvas-ui/react` is a
  React reconciler that renders UI *into a `<canvas>`*, which would destroy text
  selection, screen readers and SEO.
- **framer-motion / anime.js / React Bits** — each ships its own
  `requestAnimationFrame` loop competing with the canvas field and Lenis for the
  main thread. GSAP is already here and is enough.
- **`@huggingface/transformers`** — megabytes for one file format, and this site
  argues against black boxes. Implement BPE directly (§7).

---

## 1. Stack — use exactly this

React 19 · TypeScript · Vite 6 · Tailwind v4 via `@tailwindcss/vite` ·
GSAP 3.13+ with ScrollTrigger **and SplitText** (both free since 3.13) ·
`@gsap/react` (`useGSAP`) · Lenis · react-router-dom v7 · lucide-react ·
`@fontsource-variable/manrope` + `@fontsource-variable/jetbrains-mono`.

Everything is hand-written CSS in per-component `.css` files. No CSS-in-JS.

TypeScript project references: `tsconfig.app.json`, `tsconfig.node.json`, and
**`tsconfig.api.json`** — the serverless function must be type-checked too. The
one file that handles an API key is the last file that should be excluded from
the compiler.

---

## 2. Design system — "lab paper"

Light, soft, one accent. Put these on `:root` in `src/index.css`.

```
--paper:#EEF1EE  --paper-2:#E6EAE7  --card:#FFFFFF
--ink:#10201A  --ink-soft:#38473F  --muted:#5D6F68  --dim:#8A978F
--accent:#059669  --accent-strong:#047857  --accent-ink:#036448
--accent-wash:#DAF1E7  --accent-wash-2:#EAF7F1
--line:rgba(16,32,26,.10)  --line-hi:rgba(16,32,26,.17)
--r-xs:7 --r-sm:10 --r-md:14 --r-lg:20 --r-xl:28 --r-pill:999
```

Liquid glass for cards, pills, the nav and the tour: translucent white,
`backdrop-filter: blur(18px) saturate(180%)`, a bright inset top edge, soft
drop shadow.

Motion: `--ease: cubic-bezier(.16,1,.3,1)`. Durations express consequence —
feedback 120ms, state 220ms, layout 380ms, focal 620ms.

Manrope (800 for display, `-0.04em` tracking on big headings) for everything
except machine output; JetBrains Mono strictly for numbers, byte values, token
ids, code, and labels that describe machine state.

Soft edges everywhere. No sharp corners, no gradients, one accent colour only.

---

## 3. Routes

```
/                        home
/learn                   course tree
/learn/:courseId/:lessonId   lesson reader
/playground              tokenizer sandbox
/loyiha                  capstone + leaderboard
*                        redirect to /
```

**Lazy-load every route** with `React.lazy`. The homepage must not download the
curriculum, the visuals, the Playground and the tutor before it paints. Wrap
the whole shell in an **ErrorBoundary** with Uzbek copy — one throw inside a
visualisation must not leave a blank white page.

---

## 4. Global chrome

- **`SmoothScroll`** — Lenis, driven **exclusively by GSAP's ticker**. See §13.
- **`LatticeField`** — one fixed page-wide canvas behind everything: a 3D
  perspective neural net, layers `[5,8,10,8,5,3]`, depth-sorted draw order,
  occasional forward pulses. `aria-hidden`.
- **`SiteNav`** — glass pill nav: Bosh sahifa · Darslar · Mashq maydoni ·
  Loyiha. GitHub icon becomes a real link when `VITE_GITHUB_URL` is set and is
  a `disabled` button otherwise — never a control that silently does nothing.
- **`Intro`** — a focal opening animation that resolves into the live lattice.
  **Homepage entry only** (§13).
- **`AutoTour`** — homepage only; scrubs the page for someone who would rather
  watch than scroll. Uzbek labels.
- Skip link, Uzbek: `Asosiy qismga oʻtish`.

---

## 5. Home (`/`) — entirely in Uzbek

Scroll-driven, five numbered chapters plus hero and finale:

```
00 Baytlar · 01 Tokenlar · 02 Lugʻat · 03 Oʻqitish · 04 Model
```

- **Hero** — `Til modelini noldan quring.` SplitText word reveal.
- **00 Baytlar** — "Model soʻzlarni hech qachon koʻrmaydi." Show the word
  `noldan` as its literal UTF-8 bytes.
- **01 Tokenlar** — a **real** BPE trained in the browser on page load, encoding
  whatever the visitor types. Live stats: kirgan bayt, chiqqan token,
  oʻrganilgan birlashma, lugʻat hajmi. Plus a compression curve.
- **02 Lugʻat** — vocabulary as a budget, and why an inherited tokenizer fits an
  agglutinative language badly.
- **03 Oʻqitish** — the training loop, with counters for the real 103M / $3.60.
- **04 Model** — the two published Hugging Face artifacts.
- **Finale** — "Bu sizga mos, agar" / "Bu sizga mos emas, agar", and a CTA to
  `/learn`.

The finale states the real lesson count. **Count it from the data at build
time or state what you actually wrote — do not round, do not guess.**

---

## 6. Courses (`/learn` and the reader)

`/learn` is an **expanding tree on one page**, not a drill-down:

```
[Tokenizator] ─┬─ [Tokenizator qurish] ─┬─ [Qanday oʻqish kerak]
               │                        ├─ [Dars 0 …]
[Til modeli]   │                        └─ …
[Oʻqitish]
```

Opening a track grows its row and pushes the tracks below it **down**; its
courses appear to the **right**, connected by lines. Opening a course reveals
its lessons to the right of *that*. Connectors are SVG paths measured from real
DOM positions after layout, so they land correctly however the tree reflows.

The reader renders a typed `Block` union — `p`, `h`, `code`, `out`, `note`,
`exercise`, `viz` — with a hand-rolled Python highlighter, copy buttons,
collapsible exercise answers, a table of contents, and prev/next.

---

## 7. Playground (`/playground`)

Three tabs: **Sinov** (load any tokenizer from the Hub and watch it split your
text), **Taqqoslash** (run one text through several at once), **Koʻrgazma**
(the lesson visuals with no reading, for someone who has not started).

### Implementing the tokenizer (no library)

Byte-level BPE that reads a real `tokenizer.json` from Hugging Face:

1. GPT-2 byte↔printable-unicode table so every byte is a printable character.
2. The GPT-2 regex pre-split, so merges never cross a word boundary.
3. Merge by rank, lowest rank first — the detail most hand-rolled versions get
   wrong.
4. Report `chars`, `bytes`, `tokens`, `words`, `perWord`, `unknown`.

Two file-format traps are in §13.

---

## 8. Loyiha (`/loyiha`) — capstone and leaderboard

The courses teach how; the Playground lets you poke at it. This page is where a
student turns that into something of their own.

**Capstone brief** — five steps, ticked off in `localStorage`, no account:
choose your own corpus (not FineWeb-2), train a tokenizer, train a small GPT,
publish both to Hugging Face with a model card, add the tag `noldan`.

**Leaderboard** — and the whole point is that **nothing is self-reported.**
There is no submission form. Each row is a real `tokenizer.json` downloaded
from the Hub and run over a fixed Uzbek text *in the visitor's browser*. A
number here cannot be typed in, only earned.

Rank by **bits per character**, not tokens per word:

```
bit/belgi = tokens × log2(vocabSize) / chars      (lower is better)
```

Fertility alone is trivially gamed — make the vocabulary enormous and it always
falls, which would reward the exact opposite of what chapter 02 teaches. Each
token costs `log2(V)` bits to identify, so this prices the vocabulary budget.
Verify it discriminates before shipping: BLOOM's 250,680-token vocabulary is
15× `uzbek-bpe-16k` and must still score worse on Uzbek.

Discovery uses Hugging Face's own tag search
(`/api/models?filter=noldan`), which is CORS-open — so this needs **no backend,
no database and no moderation queue.** Seed the board with four real published
tokenizers scored through the same code path, so it is meaningful before the
first student arrives, and say plainly when no student has entered yet.

The eval text must be **held out** of the homepage demo corpus, and the page
must admit it is public and therefore not a sealed benchmark.

SentencePiece and WordPiece models (XLM-R, mBERT) genuinely cannot be read by a
byte-level BPE reader. Report them as skipped **with the reason** rather than
dropping them silently.

---

## 9. Interactive visuals

At least eight, each doing real computation, not a canned animation: `bytes`,
`pairs`, `merge`, `tensor`, `embed`, `softmax`, `attention`, `split`. Register
them by id so a lesson block `{ kind: "viz", id: "softmax" }` mounts one inline
exactly where it teaches that point.

---

## 10. AI study assistant

A floating panel on lesson pages that answers in Uzbek, knows which lesson the
student is on, streams replies, renders code blocks, and reads pasted Python
errors. System prompt: Uzbek only, plain language, 1–3 paragraphs, guide before
giving exercise answers, say "I don't know" rather than invent.

**An API key in front-end code is public — anyone can read it in devtools. Do
not hardcode one.** Support three modes, defaulting to **proxy**:

1. **Proxy (the default)** — `api/tutor.ts`, a Vercel Edge function holding the
   key in an env var. The browser never sees it.
2. **Bring-your-own-key** — Groq / OpenRouter / Hugging Face, `localStorage`
   only, with a visible warning.
3. **Ollama** — fully local, no key, offline.

All speak the OpenAI `/chat/completions` shape, so one SSE path covers them.

**The proxy must, non-negotiably:**

- Build the system prompt **server-side** and **discard any `role: "system"`
  message from the client.** Otherwise anyone can rewrite your tutor's
  instructions and bill you for it.
- Validate an origin allowlist and **fail closed** when none is configured.
- Validate every message: role must be user/assistant, content must be a
  string. Cap message count, per-message length and total length.
- Rate-limit per IP (best-effort in-memory is acceptable; say so in the docs).
- Choose the model and cap `max_tokens` server-side. Never trust the client for
  anything that costs money.

Surface real failure reasons (401 → key, 404 → model name, 429 → rate limit)
and never leave an empty assistant bubble behind on error.

---

## 11. Deploy configuration

Host is Vercel — the tutor needs an edge function.

- **`vercel.json`** — SPA rewrite must be `"/((?!api/).*)"`, **not** `"/(.*)"`.
  A catch-all can shadow the edge function. Add `X-Content-Type-Options`,
  `Referrer-Policy`, `X-Frame-Options`.
- **`.gitignore` must cover `.env`, `.env.*` (except `.env.example`), `.vercel`,
  `.vite`, `*.tsbuildinfo`** and any local agent tooling. Verify with
  `git ls-files | grep env` that only the empty template is tracked.
- **Absolute URLs are a build input, not a constant.** `canonical`, `og:url`,
  `og:image`, `robots.txt` and `sitemap.xml` all need a real host, and the first
  deploy lands on `*.vercel.app`, not the custom domain. Read `SITE_URL` from
  the environment in `vite.config.ts`, default it, replace a `%SITE_URL%` token
  in `index.html` via a `transformIndexHtml` hook with `order: "pre"`, and
  **emit `robots.txt` and `sitemap.xml` from the same value** in
  `generateBundle`. Hardcoding the domain means every shared link previews a
  dead host until DNS exists.
- `index.html`: `lang="uz"`, Uzbek title and description, favicon, canonical,
  full OG + Twitter tags including `og:image:alt`.
- Write a `DEPLOY.md` with the env-var table and a `curl` test that sends a
  foreign `Origin` to `/api/tutor` and **must return 403**.

---

## 12. Social card

Generate `public/og.png` at 1200×630 — do not ship meta tags pointing at a file
that does not exist. Write `scripts/make-og.mjs` that emits SVG, and render with
`rsvg-convert -w 1200 -h 630 og.svg -o public/og.png`.

Use the site's own palette, Manrope/JetBrains Mono, and the lattice motif, so a
shared link looks like the page it opens. fontconfig cannot read the `woff2`
files that `@fontsource-variable` ships — fetch the OFL TTFs and point
`FONTCONFIG_FILE` at a conf with a `<dir>` holding them.

When you draw the lattice, give **every layer the same vertical extent**
regardless of unit count. Scaling spread by unit count produces an even diamond
mesh that reads as wallpaper instead of a network.

---

## 13. Traps that cost real time

Read this section before you write the code, not after.

**Never invent a statistic.** Not a student count, not a benchmark, not a
module count. If you catch yourself writing a number you did not measure,
delete it or measure it.

**Measure compression on held-out text.** If you train BPE on a corpus and then
report how well it compresses *that same corpus*, the number is meaningless. It
is very easy to ship "1683× compression" this way. Keep a `PROBE` string out of
the training text and verify the overlap is actually zero.

**Vary the demo corpus.** One block repeated lets BPE merge whole paragraphs
into single tokens — spectacular, meaningless compression.

**Keep `oʻ` and `gʻ` (U+02BB) in Uzbek text.** They are two bytes each in UTF-8
and watching the encoder handle them is half the point of a byte-level demo.
Stripping them to plain `o`/`g` hides the exact thing being taught. Real
corpora often use U+2018 — normalise to U+02BB.

**Source the corpus, don't write it.** Use a real licensed one — the
[Uzbek Corpus Sample](https://github.com/elmurod1202/Uzbek-Corpus-Sample) is
CC BY 4.0 (attribution only, no ShareAlike). Hand-review every sentence you
keep: automated filters let through material about violence, illness and crime
that does not belong on a page schoolchildren may read. Attribute in the file
header.

**Lenis must be driven only by GSAP's ticker.** A second `requestAnimationFrame`
loop fights the first and produces stutter that looks like a performance
problem and is not.

**One reveal timeline per `<section>`, fired at `start: "top 72%"`, `once:
true`.** Per-element triggers make the lower half of a section stay invisible
until you scroll well past it, which reads as broken.

**Counters and charts animate once on entry and hold the true value.** Scrubbing
them to scroll parks a *wrong* number on screen — `$2.17` when the real figure
is `$3.60` — for as long as the reader is sitting there.

**Gate the intro in the signal module, not in the render.** If the intro only
renders on `/`, but the module-level `done` flag still initialises to `false` on
a deep link, nothing ever calls `markIntroDone()` — and a later client-side
navigation to `/` leaves the hero text stuck at opacity 0 forever. Compute it
from the entry URL once, at module load.

**Inline markdown regex must alternate `**` before `*`.** Otherwise bold parses
as two italics and you render raw asterisks.

**GPT-2's `tokenizer.json` has no `model.type`.** Infer BPE from the presence
of `vocab` + `merges` instead of rejecting on a missing field.

**`merges` may be `"a b"` or `["a","b"]`** depending on who exported it. Handle
both.

**`toLocaleString("uz-UZ")` silently falls back to commas** — browsers do not
reliably carry uz-UZ locale data. Uzbek groups thousands with a space. Format
by hand.

**`grep` treats the byte-level tokenizer file as binary** because of the
byte↔unicode table. Use `grep -a`.

**Never animate `width` on a progress bar.** Use `transform: scaleX()`.

**The preview pane may background itself**, throttling
`requestAnimationFrame` to 0 fps and freezing GSAP and Lenis. Screenshots come
back blank or stuck at the first frame. Verify animation *state* by reading
computed styles, and check `document.hidden` before you conclude an animation is
broken.

---

## 14. Quality bar

- No horizontal overflow at any width. Verify at 390px and 1440px.
- Semantic landmarks, a skip link, real `<button>`/`<a>`, visible focus,
  keyboard operable, `aria-*` where it earns its place, decorative canvas
  `aria-hidden`.
- Zero console errors. `npm run build` clean with `noUnusedLocals`.
- Main bundle under ~400 KB thanks to route splitting; curriculum in its own
  chunk.
- Touch targets ≥ ~36px on mobile.
- Remove dead code as you go — no orphaned CSS rules, no `AbortController` that
  is never threaded into the request it claims to cancel.
- **Every string the user can see is Uzbek**, including `aria-label`s, the skip
  link, empty states and error messages. Sweep for stray English before you
  report done. Python keywords and quoted English test samples are fine.

---

## 15. Content I am supplying

I am attaching the lesson markdown. Parse it into typed data files
(`src/lib/curriculum*.ts`). Keep my Uzbek **exactly as written**. Attach the
visuals from §9 to the lessons where they teach that specific point.

Facts you may state, and nothing beyond them:

- I published `IslombekT/uzbek-gpt-103m` — 103M parameters, trained on
  FineWeb-2, Apache-2.0.
- And `IslombekT/uzbek-bpe-16k` — byte-level BPE, Apache-2.0. The model card
  says 16,000; the file itself reports **16,384**. Use whichever you actually
  measured, and do not present one as the other.
- Total training cost about **$3.60**.
- My course text claims **1.85 token/word** versus GPT-4's **2.62**. That is my
  measurement on my text — keep it distinct from anything the leaderboard
  measures on its own eval set.

Do not invent student numbers, benchmark scores, dates or hardware.

---

## 16. Build order

1. Vite + TS + Tailwind v4 scaffold, fonts, `index.css` tokens, tsconfig
   references including `tsconfig.api.json`.
2. `SmoothScroll`, `LatticeField`, `SiteNav`, `Intro`, `ErrorBoundary`.
3. Home with SplitText reveals, rail, counters, Auto Tour — in Uzbek.
4. Block renderer, highlighter, viz registry.
5. Curriculum data from my markdown.
6. `/learn` tree + lesson reader.
7. Playground + tokenizer engine.
8. Loyiha + leaderboard.
9. Tutor + hardened proxy.
10. Deploy config, `og.png`, `DEPLOY.md`.
11. Verify: build, typecheck, console, every route, both viewports, keyboard,
    reduced motion, and a sweep for stray English. Run the impeccable audit.
    Fix everything found, then confirm once.

When you are done, tell me: what you built, **what you could not verify and
why**, every number you put on the site and where it came from, and anything
you had to decide on my behalf.

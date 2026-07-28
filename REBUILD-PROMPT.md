# Noldan — one-shot rebuild prompt

Paste everything below into a fresh chat, and attach your lesson markdown
files. It rebuilds the whole site.

---

Build **Noldan**, a free open-source platform that teaches people to build AI
from scratch — tokenizer, transformer, training — by writing the code
themselves. Audience: self-taught learners in Uzbekistan and Central Asia with
no access to paid courses. Interface language is **Uzbek (Latin)**. Tone:
technical and confident; assume the reader is smart and impatient. Never use
marketing filler.

I am attaching the course content as markdown. **Transcribe that Uzbek text
verbatim into the data files — never paraphrase it, never translate it, never
invent lessons, statistics, module names or results that are not in my files.**
If a lesson is missing, register it in the syllabus with `status: "soon"` and
say so; do not write filler.

Work autonomously. Do not stop to ask about anything specified below.

---

## 1. Stack — use exactly this

React 19 · TypeScript · Vite 6 · Tailwind v4 via `@tailwindcss/vite` ·
GSAP 3.13+ with ScrollTrigger **and SplitText** (both free since 3.13) ·
`@gsap/react` (`useGSAP`) · Lenis · react-router-dom v7 · lucide-react ·
`@fontsource-variable/manrope` + `@fontsource-variable/jetbrains-mono`.

**Do not add:** shadcn/ui, Canvas UI, framer-motion/motion, anime.js, React
Bits, or any tokenizer library. Reasons, so you don't relitigate them:

- The design system here is hand-written CSS custom properties. shadcn is
  Tailwind-utility + Radix and would create a second parallel system.
- `@canvas-ui/liquid-react` does not exist. `@canvas-ui/react` is a React
  reconciler that renders UI *into a `<canvas>`* — it would destroy text
  selection, screen readers and SEO.
- Every extra animation library ships its own `requestAnimationFrame` loop
  that competes with the canvas field and Lenis for the main thread. GSAP is
  already here and is enough.
- `@huggingface/transformers` is megabytes for one file format, and this site
  argues against black boxes. Implement BPE directly (§7).

Everything is hand-written CSS in per-component `.css` files. No CSS-in-JS.

---

## 2. Design system — "lab paper"

Light, soft, one accent. Put these on `:root` in `src/index.css`.

```
--paper:#EEF1EE  --paper-2:#E6EAE7  --card:#FFFFFF
--ink:#10201A    --ink-soft:#38473F --muted:#5D6F68 --dim:#8A978F
--line:rgba(16,32,26,.10)   --line-hi:rgba(16,32,26,.17)
--accent:#059669  --accent-strong:#047857  --accent-ink:#036448
--accent-wash:#DAF1E7  --accent-wash-2:#EAF7F1
```

The ground is a cool off-white with a green-grey bias — chosen, not default
white. Ink is deep spruce, never pure black. **One accent hue only. No
gradients anywhere.** Light theme only (a dark theme is not wanted).

**Shape — nothing has a sharp corner.** Radius scale, each step ~1.4×:
`7 / 10 / 14 / 20 / 28px` plus a `999px` pill. Buttons, chips, badges, pills
and tabs are pills; cards, code blocks and instruments take 28px.

**Liquid glass** for raised surfaces:
```
--glass-bg:rgba(255,255,255,.50)  --glass-bg-strong:rgba(255,255,255,.62)
--glass-border:rgba(255,255,255,.70)
--glass-blur:blur(18px) saturate(180%)
--glass-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 1px 2px rgba(16,32,26,.04), 0 14px 40px -18px rgba(16,32,26,.24)
```
Always pair `backdrop-filter` with `-webkit-backdrop-filter`.

**Type.** Manrope Variable for display + body (soft geometric sans, rounded
terminals — it carries an 80px headline without a monospace's brutalist edge).
JetBrains Mono Variable strictly for machine-ish content: code, token ids, byte
values, counters, labels. Both self-hosted via `@fontsource-variable` (no CDN,
and both ship Cyrillic subsets, which matters for Uzbek). Headlines: weight
800, tracking ≈ `-0.04em`.

**Motion system** (this is deliberate — arrivals decelerate, exits leave
faster than they arrived, durations express distance):
```
--ease: cubic-bezier(0.16, 1, 0.3, 1);
--ease-exit: cubic-bezier(0.4, 0, 1, 1);
--t-feedback:120ms  --t-state:220ms  --t-layout:380ms  --t-focal:620ms
```
Never animate `width`/`height`/`top`/`left`/margins — use `transform`.
Honour `prefers-reduced-motion` everywhere.

---

## 3. Routes

```
/                          home / manifesto
/learn                     course tree
/learn/:courseId/:lessonId lesson reader
/playground                tokenizer playground
*                          redirect to /
```

Ship `vercel.json` rewrites and `public/_redirects` so deep links survive a
hard refresh.

---

## 4. Global chrome

**`LatticeField`** — one fixed, page-wide Canvas 2D behind everything, a
**3D neural network** under real perspective projection:

- Layers `[5,8,10,8,5,3]` positioned along world X; per-layer sinusoidal Z
  offsets so it has genuine volume, not a flat sheet.
- Perspective camera (`CAM_Z≈3.9`, `FOV≈2.35`); rotate on yaw **and** pitch
  with slow ambient sway plus subtle pointer parallax that moves the *camera*.
- **Depth-sort every drawable together** — atmosphere motes, edges, pulses,
  nodes — so they interleave correctly. This is what makes it read as 3D.
- Nodes render as soft halo + core + a specular highlight (the highlight is
  what sells them as spheres).
- Total page-scroll progress drives a smoothed `form` value: scattered cloud
  at the top → resolved layered network at the bottom. Once formed, bright
  pulses travel **forward along edges**, layer to layer — data propagating.
- DPR-aware, pauses on `visibilitychange`, one static frame under reduced
  motion, disposes cleanly under StrictMode.
- Masked so it fades out over the left text column.

**`Intro`** — the focal moment. Thesis: *noise resolves into structure, then
you move into it.* A small 3D feed-forward net assembles (nodes fly in from
depth, edges draw, pulses run), wordmark and tagline rise. On exit **do not
cross-fade**: the paper cover dissolves early while the net **scales ~2.9× and
drifts toward where the live field sits**, so the two read as one object and
one continuous camera move. Fire the hero's text reveal as the cover starts
lifting (a one-way `markIntroDone()` signal — never a guessed delay). Skippable
by wheel/touch/key/click plus a quiet visible skip button. Skipped entirely
under reduced motion.

**`SmoothScroll`** — Lenis driven **exclusively by GSAP's ticker**. Never a
second rAF loop; that is what makes the canvas and the interface drift a frame
apart. Forward Lenis scroll events to `ScrollTrigger.update()`. Leave keyboard
scrolling to the browser so focus tracking survives. Reset to top on route
change. Disable smoothing entirely under reduced motion. Export a tiny
imperative API (`scrollToProgress`, `stopSmooth`, `startSmooth`).

**`SiteNav`** — glass pill nav: Home · Darslar · Playground · Loyiha.

---

## 5. Home (`/`)

Seven full-height sections (~730vh) on the paper ground with the field behind:
hero, then 00 Bytes · 01 Tokens · 02 Vocabulary · 03 Training · 04 Model, then
a finale with CTA + "read this / skip this" columns + footer. A right-hand
chapter rail styled as a token index (tabular numerals, a measure tick that
fills when a chapter owns the screen). Hero CTA is **"Start learning" → /learn**.

**Scroll text reveals — get this exactly right, it is the most-broken part:**

- Split with GSAP **SplitText**. Headings → `type:"words"`, rise with a soft
  blur+fade stagger. Ledes → `type:"lines", mask:"lines"`, rise from behind an
  overflow mask, and **`split.revert()` on complete** so the paragraph returns
  to normal selectable reflow-safe text.
- **Split only after `document.fonts.ready`**, or line breaks are wrong.
- Hide reveal targets synchronously on mount so there is no flash.
- **Build ONE timeline per `<section>` and fire it when the SECTION enters
  (`start:"top 72%"`, `once:true`)** — not one trigger per element with a late
  start. Otherwise lower text in a section stays invisible until the reader
  scrolls past it, which is the single worst bug in this build.
- Use `useGSAP` with `scope`, and `contextSafe` for anything created after the
  hook runs (the fonts-ready callback).

**Counters and charts must animate ONCE on entry and hold the true value.**
Do **not** scrub them to scroll position. A scrubbed counter shows a partial
number mid-section (e.g. "62M", "$2.17") that a reader takes as fact. Count up
on enter, settle on the real figure, stay there.

Include a **live byte-level BPE demo** in the Tokens chapter: it trains on a
varied sample corpus at page load and encodes whatever the reader types, with
real token ids. Plus an SVG **compression curve** — and measure it on a
**held-out sentence that is NOT in the training corpus**. Measuring compression
on your own training data, or on a corpus that is one block repeated, produces
absurd ratios like "1683×" that mean nothing.

An **Auto Tour** control on `/` only: Start/Pause/Resume/Replay, live %,
Restart past 2%, and a 1×/2× toggle where 1× traverses the whole document in
**exactly 20s** and 2× in 10s, normalized against document height. Linear GSAP
tween into the Lenis API. Any manual input (wheel, touch, pointer drag outside
the control, PageUp/PageDown/Home/End/Space/arrows) pauses it; Escape stops it
**without resetting scroll position**. Write progress to refs and CSS custom
properties — never re-render React per frame.

---

## 6. Courses (`/learn` and the reader)

**`/learn` is an expanding tree, all on one page — not a page-replacing
drill-down and not a fixed graph.**

```
[Tokenizator] ─┬─ [Tokenizator qurish] ─┬─ [Dars 0 …]
               │                        └─ …
[Til modeli]   (expands the same way)
[Oʻqitish]     (dashed "Tez orada")
```

Tracks stack vertically, nothing selected initially. Pressing a track pushes
the tracks below it **down** and reveals its courses **to the right, joined by
curved connector lines**. Pressing a course reveals its lessons to the right of
*that*. Pressing an open box collapses it.

**Draw connectors by measuring real DOM positions** (`useLayoutEffect` +
`ResizeObserver` + a post-animation re-measure), then emit cubic paths into an
absolutely-positioned SVG overlay. Hard-coded geometry breaks the moment
anything reflows. On narrow screens stack vertically with an indent rail and
hide the wires.

**Lesson reader** — sticky sidebar with the course contents, part headings for
multi-part courses, checkmarks on completed lessons, current highlighted, and
`n / total` progress. Body renders a typed block model:

```ts
type Block =
  | { kind:"text"; text:string }
  | { kind:"bullets"|"steps"; items:string[] }
  | { kind:"note"; tone:"tip"|"warn"|"key"; text:string }
  | { kind:"code"; code:string }
  | { kind:"output"; text:string }
  | { kind:"flow"; text:string }
  | { kind:"viz"; id:string }
  | { kind:"subhead"; text:string }
```

Exercises render with the **answer hidden** behind "Javobni koʻrish".

Write a tiny inline renderer for `**bold**`, `*italic*` and `` `code` ``
returning React nodes (never `dangerouslySetInnerHTML`). **Match `**` before
`*` in the regex alternation** or bold markers get eaten and raw asterisks show
on screen.

Write a **hand-rolled Python syntax highlighter** (single-pass scanner:
comments, strings with `b`/`f`/`r` prefixes, numbers, keywords, builtins,
`def` names). It is a few dozen lines, needs no dependency, and is a nice joke
in a course about tokenizers. Code blocks get line numbers and a copy button.

---

## 7. Playground (`/playground`)

Three tabs.

**Sinov** — load a real tokenizer from Hugging Face and tokenize the visitor's
own text, showing coloured token chips with ids and live stats (belgi, bayt,
soʻz, token, token/soʻz).

**Taqqoslash** — run one text through several tokenizers at once, with
efficiency bars, an "eng tejamkor" badge on the winner, an "N× koʻproq" figure
on the others, and a field to add any `user/repo`.

**Koʻrgazma** — every interactive visual with no reading required, for someone
who has not started the course, ending in a "Darslarni boshlash" CTA.

Plus a **publish guide**: save `tokenizer.json` → `HfApi.upload_file` → paste
the repo name here. This closes the loop: train in the course, publish to the
Hub, watch your own work run.

### Implementing the tokenizer (no library)

`huggingface.co` **does** send permissive CORS on
`https://huggingface.co/{repo}/resolve/main/tokenizer.json`, so the browser can
fetch it directly. Then:

1. Build the standard **GPT-2 byte↔printable-unicode table** (`33–126`,
   `161–172`, `174–255`, then the remaining bytes mapped to `256+n`).
2. Pre-split with the GPT-2 regex
   `/'s|'t|'re|'ve|'m|'ll|'d| ?\p{L}+| ?\p{N}+| ?[^\s\p{L}\p{N}]+|\s+(?!\S)|\s+/gu`.
   `\p{L}` is essential — it matches Uzbek `oʻ`/`gʻ` and Cyrillic, which
   `[a-z]` would throw into the punctuation bucket.
3. Encode each piece to UTF-8 bytes → map each byte to its byte-char.
4. Apply merges repeatedly, always taking the **lowest rank** (earliest
   learned) applicable pair.
5. Look the result up in `vocab`; map byte-chars back through the inverse table
   for display.

**Two file-format traps:**

- `merges` may be **either** `"a b"` strings **or** `["a","b"]` arrays,
  depending on the `tokenizers` version that wrote the file. Handle both.
- `model.type` is **absent** in older files (GPT-2's among them). Infer BPE
  from the presence of `vocab` + `merges`; only reject a type you positively
  cannot run. Requiring `type === "BPE"` silently rejects valid tokenizers.

Cache loaded tokenizers in a `Map`. Show real loading and error states with
useful Uzbek messages (404 → "repo ochiq (public) ekanini tekshiring").

---

## 8. Interactive visuals

A `VIZ` registry keyed by id, referenced from lessons via
`{ kind:"viz", id:"..." }`. **Every one runs the real computation — nothing
pre-baked or faked.** Build at least:

| id | what it does |
|---|---|
| `bytes` | type Uzbek, see each char's bytes; multi-byte chars highlight (shows `oʻ` = 2 bytes) |
| `split` | live regex pre-split, pieces colour-coded harf / raqam / punktuatsiya |
| `pairs` | step a sliding window over bytes, tallies build, winner highlights |
| `merge` | press to run one real BPE merge; sequence shrinks, learned rules list |
| `tensor` | `(B,T)` grid with sliders |
| `embed` | click a token id, its embedding row lights up |
| `softmax` | drag logits, bars update, sum stays exactly 1.0000 |
| `attention` | causal attention heatmap; row *q* must show exactly *q+1* unmasked cells |

Give them one shared frame (title bar, optional controls, body, hint caption)
so they read as one family.

---

## 9. AI study assistant

A floating panel on lesson pages that answers in Uzbek, knows which lesson the
student is on, streams replies, renders code blocks, and reads pasted Python
errors. System prompt: Uzbek only, plain language, 1–3 paragraphs, guide before
giving exercise answers, say "I don't know" rather than invent.

**An API key in front-end code is public — anyone can read it in devtools. Do
not hardcode one.** Support three modes:

1. **Proxy (ship this)** — a serverless function (`api/tutor.ts`, Vercel Edge)
   holds the key in an env var; the browser never sees it. Cap `max_tokens` and
   choose the model server-side; never trust the client for anything that costs
   money.
2. **Bring-your-own-key** — Groq / OpenRouter / Hugging Face, stored in
   `localStorage` only, with a visible warning.
3. **Ollama** — fully local, no key, works offline.

All four speak the OpenAI `/chat/completions` shape, so one SSE request path
covers them. Surface real failure reasons (401 → key wrong, 404 → model name,
429 → rate limit) and never leave an empty assistant bubble behind on error.

---

## 10. Quality bar

- No horizontal overflow at any width. Verify at 390px and 1440px.
- Semantic landmarks, a skip link, real `<button>`/`<a>`, visible focus,
  keyboard operable, `aria-*` where it earns its place, decorative canvas
  `aria-hidden`.
- Zero console errors. `npm run build` clean with `noUnusedLocals`.
- Touch targets ≥ ~36px on mobile.
- Never animate layout properties (use `scaleX`, not `width`, for bars).
- Remove dead code as you go — no `display:none` decorations, no
  `AbortController` that is never threaded into the request it claims to
  cancel.

---

## 11. Content I am supplying

I am attaching the lesson markdown. Parse it into typed data files
(`src/lib/curriculum*.ts`). Keep my Uzbek **exactly as written**. Attach the
visuals from §8 to the lessons where they teach that specific point.

Facts you may state, and nothing beyond them: I published
`IslombekT/uzbek-gpt-103m` (103M parameters, trained on FineWeb-2, Apache-2.0)
and `IslombekT/uzbek-bpe-16k` (16,000 vocabulary, byte-level BPE, Apache-2.0)
on Hugging Face; total training cost about **$3.60**; the tokenizer reaches
**1.85 token/word** on Uzbek versus GPT-4's **2.62**. Do not invent student
numbers, benchmark scores, dates or hardware.

---

## 12. Build order

1. Vite + TS + Tailwind v4 scaffold, fonts, `index.css` tokens.
2. `SmoothScroll`, `LatticeField`, `SiteNav`, `Intro`.
3. Home with SplitText reveals, rail, counters, Auto Tour.
4. Block renderer, highlighter, viz registry.
5. Curriculum data from my markdown.
6. `/learn` tree + lesson reader.
7. Playground + tokenizer engine.
8. Tutor + proxy.
9. Verify: build, console, both viewports, keyboard, reduced motion. Fix
   everything found, then confirm once.

Then tell me what you built, what you could not verify, and anything you had to
decide on my behalf.

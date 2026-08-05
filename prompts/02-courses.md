# Prompt 2 — Courses: the tree, the lesson reader, the AI tutor

Paste everything below the line into a fresh chat **and attach your lesson
markdown files.**

---

Build the **course section** of **Noldan** (noldan.uz) — a free, open platform
teaching people in Uzbekistan and Central Asia to build AI from scratch by
writing the code themselves. Two routes: `/learn` (the syllabus tree) and
`/learn/:courseId/:lessonId` (the reader). Plus an AI study assistant that lives
on lesson pages.

**Every visible string is Uzbek (Latin script)** — including `aria-label`s,
empty states and error messages.

I am attaching my course content as markdown. **Transcribe that Uzbek text
verbatim into typed data files — never paraphrase it, never translate it, never
"improve" it, never invent lessons, exercises or results that are not in my
files.** If a lesson is referenced but not written, register it in the syllabus
with `status: "soon"` and say so. Do not write filler to fill a gap.

Work autonomously. Do not stop to ask about anything specified below.

## Tools — set these up first

- **impeccable** — `/plugin marketplace add pbakaus/impeccable`. Direction
  first, audit before you report done.
- **GSAP skills** — load `gsap-core`, `gsap-react`. The tree animates its
  expansion; the reader does not need scroll animation.
- **context7 MCP** — for react-router v7, Vite 6 and Tailwind v4 specifics.
- **Browser preview tools** — dev server on port 5188 via `.claude/launch.json`.
  Open a real lesson and read it yourself before claiming it works.

## Stack and design system

React 19 · TypeScript · Vite 6 · Tailwind v4 via `@tailwindcss/vite` · GSAP
3.13+ · `@gsap/react` · react-router-dom v7 · lucide-react ·
`@fontsource-variable/manrope` + `@fontsource-variable/jetbrains-mono`.
Hand-written CSS per component. No CSS-in-JS, no shadcn, no component library.

```
--paper:#EEF1EE  --paper-2:#E6EAE7  --card:#FFFFFF
--ink:#10201A  --ink-soft:#38473F  --muted:#5D6F68  --dim:#8A978F
--accent:#059669  --accent-strong:#047857  --accent-ink:#036448
--accent-wash:#DAF1E7  --accent-wash-2:#EAF7F1
--line:rgba(16,32,26,.10)  --line-hi:rgba(16,32,26,.17)
--r-xs:7 --r-sm:10 --r-md:14 --r-lg:20 --r-xl:28 --r-pill:999
--ease:cubic-bezier(.16,1,.3,1)
```

Liquid glass panels, soft radii, one accent, no gradients. Manrope for prose,
JetBrains Mono for code and machine output. If a shared `SiteNav` /
`LatticeField` / `SmoothScroll` does not exist yet, build a minimal version:
glass pill nav (Bosh sahifa · Darslar · Mashq maydoni · Loyiha), a fixed
`aria-hidden` canvas neural-net field, and Lenis driven **only** by GSAP's
ticker.

## `/learn` — an expanding tree, on one page

This is the part that is easy to get wrong. It is **not** a drill-down that
replaces the page, and **not** a row of cards.

```
[Tokenizator] ─┬─ [Tokenizator qurish] ─┬─ [Qanday oʻqish kerak]
               │                        ├─ [Dars 0 …]
[Til modeli]   │                        └─ …
[Oʻqitish]
```

- Pressing a **track** expands it **in place**. Its row grows, so the tracks
  below it are pushed **down** — they do not disappear.
- Its courses appear to the **right** of it, connected by lines.
- Pressing a **course** reveals that course's lessons to the right of **that
  course**, connected the same way.
- Connectors are SVG paths **measured from real DOM positions after layout**
  (`useLayoutEffect` + `getBoundingClientRect`), so lines land on the boxes
  however the tree reflows. Do not hardcode coordinates.
- Re-measure on resize and on every expand/collapse.

Tracks: **Tokenizator** and **Til modeli** carry real content; **Oʻqitish** is a
placeholder with `status: "soon"` — show it as visibly unavailable rather than
letting someone click into an empty page.

## The lesson reader

Parse my markdown into a typed `Block` union and render it:

| kind | renders as |
|---|---|
| `p` | prose, with inline `**bold**`, `*italic*`, `` `code` `` |
| `h` | section heading |
| `code` | Python with a hand-rolled highlighter and a copy button |
| `out` | expected output, visually distinct from input |
| `note` | an aside |
| `exercise` | task with a collapsible `Javobni koʻrish` answer |
| `viz` | mounts an interactive visual by id, inline |

Also: a sticky table of contents, prev/next navigation, a lesson-complete
marker, and `part` grouping so an 18-lesson course reads as parts rather than a
flat list.

**The highlighter is hand-written** — a small Python tokenizer producing spans
for keywords, strings, numbers, comments, builtins. Do not pull in a
highlighting library for one language.

## Interactive visuals

Build at least eight, each doing **real computation**, not a canned animation:

`bytes` · `pairs` · `merge` · `tensor` · `embed` · `softmax` · `attention` ·
`split`

Register them by id so a lesson block `{ kind: "viz", id: "softmax" }` mounts
one exactly where the text teaches that point. A student should be able to
change an input and watch the numbers move. Students learn by seeing, not only
by reading — a wall of text is the failure mode this section exists to avoid.

## The AI study assistant

A floating panel on lesson pages. Answers in Uzbek, knows which lesson the
student is on, streams replies, renders code blocks, and reads pasted Python
errors. System prompt: Uzbek only, plain language, 1–3 paragraphs, guide before
handing over exercise answers, and say "I don't know" rather than invent.

**An API key in front-end code is public — anyone can read it in devtools. Do
not hardcode one.** Three modes, defaulting to **proxy**:

1. **Proxy (default)** — `api/tutor.ts`, a Vercel Edge function holding the key
   in an env var. The browser never sees it.
2. **Bring-your-own-key** — Groq / OpenRouter / Hugging Face, `localStorage`
   only, with a visible warning.
3. **Ollama** — fully local, no key, offline.

All speak the OpenAI `/chat/completions` shape, so one SSE path covers them.

**The proxy must, non-negotiably:**

- Build the system prompt **server-side** and **discard any `role: "system"`
  message from the client.** Otherwise anyone can rewrite your tutor's
  instructions and bill you for it.
- Check an origin allowlist and **fail closed** when none is configured.
- Validate every message — role must be `user` or `assistant`, content must be a
  string — and cap message count, per-message length and total length.
- Rate-limit per IP. In-memory is acceptable at this scale; document that it is
  best-effort because edge instances are ephemeral.
- Choose the model and cap `max_tokens` server-side. Never trust the client for
  anything that costs money.

Add a `tsconfig.api.json` so the function is type-checked. The one file handling
an API key is the last file that should be excluded from the compiler.

Surface real failure reasons (401 → key, 404 → model name, 429 → rate limit) and
never leave an empty assistant bubble behind on error.

## Traps — read before writing code

**My Uzbek is the source of truth.** Transcribe it exactly. If you find a typo,
leave it and tell me afterwards — do not silently edit my words.

**Inline markdown regex must alternate `**` before `*`.** Put the two-asterisk
alternative first, or bold parses as two italics and you render raw asterisks on
the page.

**Unwritten lessons need `status: "soon"` and a real empty state.** A linkable
lesson that lands on a near-blank page is worse than one that is visibly not
ready yet.

**Lazy-load the curriculum.** It is the largest data in the app. `React.lazy`
the routes so the homepage does not download every lesson before it paints, and
keep the curriculum in its own chunk.

**Wrap the app in an ErrorBoundary** with Uzbek copy. One throw inside a
visualisation must not leave a student staring at a blank white page.

**Do not animate `width`** on progress indicators — use `transform: scaleX()`.

**The preview pane may background itself**, throttling `requestAnimationFrame`
to 0 fps. Check `document.hidden` before concluding an animation is broken.

## Done means

`npm run build` clean with `noUnusedLocals`, zero console errors, no horizontal
overflow at 390px or 1440px, keyboard operable with visible focus, code blocks
scroll inside their own container rather than pushing the page sideways, and
**no stray English where a user can see it** (Python keywords in code samples
are fine). Run the impeccable audit and fix what it flags.

Then tell me what you built, which lessons you marked `soon` and why, anything
in my markdown you could not parse, and anything you decided on my behalf.

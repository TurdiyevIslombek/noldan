# Noldan

![Noldan — build AI from scratch, in Uzbek](public/og.png)

**Live: [noldan.fun](https://noldan.fun)** ·
[![CI](https://github.com/TurdiyevIslombek/noldan/actions/workflows/ci.yml/badge.svg)](https://github.com/TurdiyevIslombek/noldan/actions/workflows/ci.yml)

**Noldan** ("from zero") is a free course, in Uzbek, that teaches people with no
programming background to build a language model from scratch — starting with
the part every AI system has and almost nobody explains: the tokenizer.

Tokenizers trained mostly on English cut Uzbek text into far more pieces than
English. The same sentence costs more, runs slower and fits less into a
model's memory. The course measures that gap, explains where it comes from
(Unicode, UTF-8, how byte-pair encoding learns), and has the student build a
tokenizer for Uzbek themselves, line by line.

## What is in it

- **Kurs 1 — Tokenizator qurish** (free): lessons 01–09 so far, from a first
  `print` to a working byte-level BPE `merge`. Every lesson is real Python that
  the student types and runs.
- **Kurs 2 — Transformer (GPT) qurish** (paid, in preparation).

## How the site works

- **Lessons are Markdown.** The author writes a lesson as a `.md` file; the
  build turns it into a page — code blocks, printed output, diagrams,
  answers that open on request, exercises. See [`content/README.md`](content/README.md).
- **Code is typed, not copied.** Each code block is a typing exercise: grey
  placeholder text that turns into highlighted code as the student types it,
  red on a mistake. "Copy" unlocks only when the block is typed correctly.
- **Every example is checked.** `npm run check:lessons` runs all the course's
  code in order, as a student would, and compares it with the output printed
  in the lessons.
- **A real tokenizer in the browser.** The landing page and the playground
  run actual byte-level BPE tokenizers downloaded from Hugging Face — the
  one the course builds (`uzbek-bpe-16k`) and GPT-2's — in a Web Worker, so
  loading them never stalls the page. The tokenizer applies the file's own
  normalizer, so `o'` typed on an ordinary keyboard becomes `oʻ`, exactly as
  the Python `tokenizers` library does.
- **Readable by search engines.** Every page is pre-rendered to static HTML
  at build time, with its own title, description, structured data and the
  full lesson text; the sitemap updates itself.
- **Accounts without passwords.** Sign in with Telegram or Google
  ([Better Auth](https://better-auth.com) running in the site's own API, data in
  Postgres). No emails, no password resets.
- **Payments** through Payme and Click, the card rails used in Uzbekistan.
  The paid lesson text is served only by the API, after an entitlement check.

## Stack

React 19 · TypeScript · Vite · Canvas 2D (the star field) · Vercel Functions ·
Better Auth · PostgreSQL (Neon) · Payme / Click · PGlite (tests)

```
content/        lessons, one Markdown file each
src/stars/      the landing page and its particle engine
src/experience/ lesson pages, playground, project page
src/components/ typing trainer, lesson blocks, media slots
api/            serverless functions: sign-in, lessons, payments, tutor
db/schema.sql   the whole database
scripts/        lesson pipeline, pre-rendering, checks, deploy helpers
```

## Running it

```bash
npm install
npm run dev          # prints the local address, usually http://localhost:5173
```

Node 22 or newer. The lesson check also needs Python 3.13.

The free course, the playground and the landing page work with nothing else
set up. For accounts locally, `npm run db:dev` starts a throwaway Postgres;
see [`.env.example`](.env.example).

## Adding lessons and videos

```bash
npm run add:lesson -- ~/Downloads/noldan-1-dars-10.md
npm run add:video  -- ~/Downloads/c1.mp4 dars-01
npm run check:lessons
```

Push to `main` and the site redeploys itself.

## Tests

```bash
npm test                # everything below except the build
npm run test:units      # tokenizer, BPE trainer, lesson parser
npm run test:payments   # 41 assertions on the Payme and Click state machines
npm run check:lessons   # every lesson's code against its printed output
npm run build           # type-check, build, pre-render every page
```

- **Tokenizer** ([`scripts/test-units.mjs`](scripts/test-units.mjs)) — merges
  apply in the order they were learned; both merge formats in
  `tokenizer.json` agree; the file's normalizer runs first; decoding
  restores text exactly, even when a token splits a multi-byte character.
- **BPE trainer** — finds the same first merge the lessons compute by hand
  (`l` + `a`), never loses a byte, and never makes held-out text longer.
- **Lesson parser** — the author's production notes (animation prompts,
  video scripts) are never published; code, output, errors and exercises
  are recognised.
- **Payments** ([`scripts/test-payments.mjs`](scripts/test-payments.mjs)) —
  replayed callbacks, wrong amounts, forged signatures, refunds and
  timeouts, against an in-process Postgres (PGlite) loaded with the real
  schema.
- **Lessons** ([`scripts/check-lessons.py`](scripts/check-lessons.py)) —
  155 code blocks across nine lessons, run in order in one Python session.

GitHub Actions runs all of it, plus the production build, on every push.

## Deploying

[`DEPLOY.md`](DEPLOY.md) — GitHub, Vercel, the domain, sign-in, payments, and
Google Search Console, in order.

---

Built by **Islombek Turdiyev**.

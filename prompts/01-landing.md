# Prompt 1 — Landing page

Paste everything below the line into a fresh chat.

---

Build the **homepage** of **Noldan** (noldan.uz) — a free, open platform that
teaches people in Uzbekistan and Central Asia to build AI from scratch:
tokenizer, transformer, training loop, written by the learner themselves. Not
prompt engineering. Not somebody else's API.

**Every visible string is Uzbek (Latin script)** — headings, labels,
`aria-label`s, empty states, error messages. Tone: technical and confident.
Assume the reader is smart and impatient. No marketing filler.

Work autonomously. Do not stop to ask about anything specified below.

## Tools — set these up first, do not hand-roll from memory

- **impeccable** — `/plugin marketplace add pbakaus/impeccable`. Use it for
  direction before you build, and run its audit before you report done.
- **GSAP skills** — load `gsap-core`, `gsap-scrolltrigger`, `gsap-timeline`,
  `gsap-react`, `gsap-plugins`. This page is almost entirely scroll animation.
- **frontend-design skill** — so this does not read as a template.
- **context7 MCP** — `resolve-library-id` → `query-docs` for Vite 6, Tailwind
  v4, GSAP 3.13+. Your training data is probably stale on Tailwind v4 and on
  SplitText becoming free in GSAP 3.13.
- **WebSearch / WebFetch** — for sourcing the Uzbek corpus below. Do not invent
  training text.
- **Browser preview tools** — run a dev server on port 5188 via
  `.claude/launch.json` and verify the page yourself. Never ask me to check
  something you could check.

## Stack

React 19 · TypeScript · Vite 6 · Tailwind v4 via `@tailwindcss/vite` · GSAP
3.13+ with ScrollTrigger **and SplitText** · `@gsap/react` (`useGSAP`) · Lenis ·
react-router-dom v7 · lucide-react · `@fontsource-variable/manrope` +
`@fontsource-variable/jetbrains-mono`.

Hand-written CSS in per-component `.css` files. No CSS-in-JS. **Do not add**
framer-motion, anime.js, shadcn/ui or any tokenizer library — each extra
animation library ships its own `requestAnimationFrame` loop that fights Lenis
and the canvas for the main thread, and a tokenizer library is megabytes for
something this site argues you should write yourself.

## Design system — "lab paper"

Light, soft, exactly one accent. On `:root` in `src/index.css`:

```
--paper:#EEF1EE  --paper-2:#E6EAE7  --card:#FFFFFF
--ink:#10201A  --ink-soft:#38473F  --muted:#5D6F68  --dim:#8A978F
--accent:#059669  --accent-strong:#047857  --accent-ink:#036448
--accent-wash:#DAF1E7  --accent-wash-2:#EAF7F1
--line:rgba(16,32,26,.10)  --line-hi:rgba(16,32,26,.17)
--r-xs:7 --r-sm:10 --r-md:14 --r-lg:20 --r-xl:28 --r-pill:999
--ease:cubic-bezier(.16,1,.3,1)
```

Liquid glass for cards and pills: translucent white,
`backdrop-filter: blur(18px) saturate(180%)`, bright inset top edge, soft drop.
Durations express consequence — feedback 120ms, state 220ms, layout 380ms,
focal 620ms. Manrope 800 with `-0.04em` tracking for display; JetBrains Mono
**strictly** for machine output: numbers, byte values, token ids, labels
describing machine state. Soft radii everywhere, no gradients, no sharp corners.

## Global pieces this page needs

- **`SmoothScroll`** — Lenis, driven **exclusively by GSAP's ticker**. Never a
  second `requestAnimationFrame` loop.
- **`LatticeField`** — one fixed page-wide canvas behind everything: a 3D
  perspective neural net, layers `[5,8,10,8,5,3]`, depth-sorted draw order,
  occasional forward pulses along edges. `aria-hidden`.
- **`SiteNav`** — glass pill nav: Bosh sahifa · Darslar · Mashq maydoni ·
  Loyiha.
- **`Intro`** — a short focal opening animation that resolves into the live
  lattice, with an Uzbek skip button. **Homepage entry only** (see traps).
- **`AutoTour`** — scrubs the page for someone who would rather watch than
  scroll. Play/pause, 1×/2×, progress readout, all labelled in Uzbek.
- Skip link: `Asosiy qismga oʻtish`.

## The page

Scroll-driven, with a fixed chapter rail:

```
00 Baytlar · 01 Tokenlar · 02 Lugʻat · 03 Oʻqitish · 04 Model
```

**Hero** — eyebrow `Bepul · Ochiq kodli · Noldan`, headline
`Til modelini noldan quring.`, and a sub explaining that the tokenizer, the
attention and the training loop are all written by the reader. CTA
`Oʻrganishni boshlash` → `/learn`. SplitText word reveal on the headline, line
reveal on the sub.

**00 Baytlar** — "Model soʻzlarni hech qachon koʻrmaydi." It sees bytes. Render
the word `noldan` as its literal UTF-8 byte values in mono cells. The point:
nothing is ever out-of-vocabulary because there is no vocabulary yet.

**01 Tokenlar** — "Takrorlanadigan juftlikni toping. Birlashtiring. Yana
takrorlang." Then a **real** byte-pair encoder that trains in the browser on
page load and encodes whatever the visitor types, live. Show token chips with
ids, and four stats: `Kirgan bayt`, `Chiqqan token`, `Oʻrganilgan birlashma`,
`Lugʻat hajmi`. Below it, an SVG compression curve that draws once on entry.

**02 Lugʻat** — "Lugʻat hajmi — sozlama emas, byudjet." Every merge buys shorter
sequences and costs embedding parameters. Explain why this trade-off is sharper
for an agglutinative language where one stem carries a stack of suffixes, and
therefore why an inherited tokenizer fits Uzbek badly.

**03 Oʻqitish** — "Sikl siz oʻylagandan kichik." Forward pass, loss, backward
pass, step; everything else is logistics. Two counters: `103M` parameters and
`$3.60` total training cost.

**04 Model** — "Yakunda nashr qilsa boʻladigan vaznlar qoladi." Two cards
linking to the real Hugging Face artifacts.

**Finale** — CTA, plus two honest lists: `Bu sizga mos, agar` /
`Bu sizga mos emas, agar`. The courses start from zero, so do **not** write
"you can already write Python" — that contradicts the material.

## The BPE demo — build it, don't fake it

A real byte-level byte-pair encoder in `src/lib/bpe.ts`, no dependency:

1. Base vocabulary is the 256 byte values. Nothing is ever OOV.
2. Count adjacent pairs, merge the most frequent into a new id, repeat until the
   vocabulary ceiling. Stop early when nothing repeats twice.
3. Encoding applies merges **lowest id first**, reproducing learn order — the
   detail most hand-rolled implementations get wrong.
4. Sample a compression curve during training against a held-out probe.

Target ~700 vocabulary so it trains in well under 100ms on a cold load.

## The corpus — source it, do not write it

Use real, licensed, human-written Uzbek. The
[Uzbek Corpus Sample](https://github.com/elmurod1202/Uzbek-Corpus-Sample) is
CC BY 4.0 — attribution only, no ShareAlike. Take ~100 sentences.

- **Hand-review every sentence you keep.** Automated filters let through
  material about violence, illness, crime and worse. This is a page
  schoolchildren may read.
- **Normalise to `ʻ` (U+02BB).** Real corpora often use U+2018.
- Attribute the source in the file header and keep it there.

## Traps — read before writing code

**Never invent a statistic.** Not a lesson count, not a student number, not a
benchmark. If you write a number you did not measure, delete it or measure it.
If you state a lesson count, count it from the data.

**Measure compression on held-out text.** Training BPE on a corpus and then
reporting how well it compresses *that same corpus* produces a meaningless
number — it is very easy to ship "1683× compression" this way. Keep a `PROBE`
sentence out of the corpus and assert the overlap is actually zero.

**Vary the corpus.** One block repeated lets BPE merge whole paragraphs into
single tokens: spectacular, meaningless compression.

**Keep `oʻ` and `gʻ`.** They are two bytes each in UTF-8, and watching the
encoder handle them is half the point of a byte-level demo. Stripping them to
plain `o`/`g` hides the exact thing this page teaches.

**Lenis must be driven only by GSAP's ticker.** A second rAF loop fights the
first and produces stutter that looks like a performance problem and is not.

**One reveal timeline per `<section>`**, fired at `start: "top 72%"`,
`once: true`. Per-element triggers leave the lower half of a section invisible
until the reader scrolls well past it, which reads as broken.

**Counters and the chart animate once on entry and hold the true value.**
Scrubbing them to scroll parks a *wrong* number on screen — `$2.17` when the
real figure is `$3.60` — for as long as the reader sits there.

**Gate the intro in the signal module, not in the render.** The hero reveal
waits on an "intro finished" signal. If the intro only *renders* on `/` but the
module-level `done` flag still starts `false` on a deep link to `/learn`,
nothing ever fires it — and a later client-side navigation to `/` leaves the
hero text stuck at opacity 0 forever. Compute it from the entry URL once, at
module load.

**Never animate `width`.** Use `transform: scaleX()`.

**The preview pane may background itself**, throttling `requestAnimationFrame`
to 0 fps and freezing GSAP and Lenis — screenshots come back blank or stuck on
frame one. Check `document.hidden` before concluding an animation is broken, and
verify animation *state* by reading computed styles instead.

## Facts you may state, and nothing beyond them

- `IslombekT/uzbek-gpt-103m` — 103M parameters, trained on FineWeb-2,
  Apache-2.0.
- `IslombekT/uzbek-bpe-16k` — byte-level BPE, Apache-2.0, 16,000 vocabulary.
- Total training cost about **$3.60**.

Do not invent student numbers, dates, hardware or benchmark scores.

## Done means

`npm run build` clean with `noUnusedLocals`, zero console errors, no horizontal
overflow at 390px or 1440px, keyboard operable with visible focus, sensible
under `prefers-reduced-motion`, and **no stray English anywhere a user can see
it**. Run the impeccable audit and fix what it flags.

Then tell me what you built, what you could not verify and why, and every number
you put on the page with where it came from.

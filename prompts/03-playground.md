# Prompt 3 — Playground

Paste everything below the line into a fresh chat.

---

Build the **Playground** (`/playground`) for **Noldan** (noldan.uz) — a free,
open platform teaching people in Uzbekistan and Central Asia to build AI from
scratch by writing the code themselves.

The Playground is where a student **tests what they built**, and where someone
who has not started yet can **see what they would be learning** without reading
a single lesson.

**Every visible string is Uzbek (Latin script)** — including `aria-label`s,
empty states and error messages.

Work autonomously. Do not stop to ask about anything specified below.

## Tools — set these up first

- **impeccable** — `/plugin marketplace add pbakaus/impeccable`. Direction
  first, audit before you report done.
- **context7 MCP** — Vite 6, Tailwind v4, react-router v7 specifics.
- **Browser preview tools** — dev server on port 5188 via `.claude/launch.json`.
  This page makes live network calls to Hugging Face; load a real tokenizer
  yourself and confirm the numbers before claiming it works.
- **GSAP skills** — `gsap-core` only. This page is a tool, not a scroll story;
  keep motion to state transitions.

## Stack and design system

React 19 · TypeScript · Vite 6 · Tailwind v4 via `@tailwindcss/vite` ·
react-router-dom v7 · lucide-react · `@fontsource-variable/manrope` +
`@fontsource-variable/jetbrains-mono`. Hand-written CSS per component.

**Do not install a tokenizer library.** `@huggingface/transformers` is megabytes
for one file format, and this site argues against reading someone else's black
box. You are implementing the same algorithm the course teaches.

```
--paper:#EEF1EE  --paper-2:#E6EAE7  --card:#FFFFFF
--ink:#10201A  --ink-soft:#38473F  --muted:#5D6F68  --dim:#8A978F
--accent:#059669  --accent-strong:#047857  --accent-ink:#036448
--accent-wash:#DAF1E7  --accent-wash-2:#EAF7F1
--line:rgba(16,32,26,.10)  --line-hi:rgba(16,32,26,.17)
--r-xs:7 --r-sm:10 --r-md:14 --r-lg:20 --r-xl:28 --r-pill:999
--ease:cubic-bezier(.16,1,.3,1)
```

Liquid glass panels, soft radii, one accent, no gradients. JetBrains Mono
**strictly** for machine output: token ids, byte values, counts, repo names.

If a shared `SiteNav` / `LatticeField` does not exist yet, build minimal
versions: glass pill nav (Bosh sahifa · Darslar · Mashq maydoni · Loyiha) and a
fixed `aria-hidden` canvas neural-net field.

## Three tabs

**1. `Sinov`** — paste any Hugging Face repo id, load its real
`tokenizer.json`, and watch it split your text. Token chips with ids, hover to
see the byte span. Stats: `belgilar`, `baytlar`, `tokenlar`, `soʻzlar`,
`token/soʻz`, and any `nomaʼlum` (unrepresentable) characters.

This is the tab that closes the loop: a student trains a tokenizer in the
course, publishes it to the Hub, pastes their repo name here, and watches their
own work run. Make that path obvious — include a short guide on publishing to
Hugging Face and what to paste.

**2. `Taqqoslash`** — run one text through several tokenizers side by side.
Preload `IslombekT/uzbek-bpe-16k`, `openai-community/gpt2` and
`FacebookAI/roberta-base` as presets, and let any repo id be added. The lesson
this teaches: an Uzbek-trained 16k tokenizer beats a 50k English one on Uzbek,
and vocabulary size is not the same thing as quality.

**3. `Koʻrgazma`** — for someone who has not started the course. The same
interactive visuals the lessons use, with **no reading**: bytes, pair counting,
a merge step, tensor shape, embeddings, softmax, attention, regex splitting.
Every one does real computation on input the visitor can change. Someone should
be able to land here cold and understand what they would be learning.

## The tokenizer engine — write it, do not import it

`src/lib/hf-tokenizer.ts`, a byte-level BPE that reads a real `tokenizer.json`:

1. **GPT-2 byte↔printable-unicode table** so every byte is a printable
   character and merges can be written as text. Build it the standard way:
   `33..126`, `161..172`, `174..255` map to themselves, everything else maps to
   `256 + n`.
2. **The GPT-2 regex pre-split**, so merges never cross a word boundary:
   `/'s|'t|'re|'ve|'m|'ll|'d| ?\p{L}+| ?\p{N}+| ?[^\s\p{L}\p{N}]+|\s+(?!\S)|\s+/gu`
3. **Merge by rank, lowest rank first** — reproducing the order merges were
   learned. This is the detail most hand-rolled implementations get wrong; if
   you merge greedily by position instead, output looks plausible and is wrong.
4. Expose `preSplit`, `parseTokenizerJson`, `encode`, `decode`, `loadFromHub`,
   `measure`, and a `PRESETS` list. Cache loaded tokenizers by repo id.

Fetch from `https://huggingface.co/{repo}/resolve/main/tokenizer.json` — the Hub
is CORS-open, so this needs no backend and no proxy.

## Traps — read before writing code

**GPT-2's `tokenizer.json` has no `model.type` field.** If you reject files
whose `model.type !== "BPE"`, the single most famous tokenizer in the world
fails to load. Infer BPE from the presence of `model.vocab` + `model.merges`
instead, and only reject when `type` is present *and* is something else.

**`merges` may be `"a b"` or `["a","b"]`** depending on which version of
`tokenizers` exported the file. Handle both, and split the string form on the
**first** space only.

**SentencePiece and WordPiece models cannot be read by this engine.** XLM-R and
mBERT are not byte-level BPE. Fail with a clear Uzbek message saying what
happened, not a stack trace and not silence.

**Not every repo has a `tokenizer.json`.** Distinguish 404 (wrong name, private
repo, or no such file) from a network failure, and say which in Uzbek.

**Some tokenizers cannot represent some characters.** Count and surface those —
"878 nomaʼlum belgi" is a real quality signal a student should see, not
something to hide.

**Empty state must not display zeroed stats.** A grid of `0`s reads as a broken
tokenizer. Show a prompt to type something instead.

**Never animate `width`** on the comparison bars — use `transform: scaleX()`,
or you get layout thrash on every keystroke.

**Debounce or throttle encoding on input.** Re-encoding a long text on every
keystroke across several tokenizers will drop frames.

**`grep` treats this file as binary** because of the byte↔unicode table, so it
returns nothing and looks like the code is missing. Use `grep -a`.

**Thread `AbortController` into the actual request.** A controller that is
created and never passed to `fetch` is dead code pretending to be cancellation —
switching tabs mid-load must really cancel.

**The preview pane may background itself**, throttling `requestAnimationFrame`
to 0 fps. Check `document.hidden` before concluding an animation is broken.

## Verify with real data before you report done

Load `IslombekT/uzbek-bpe-16k` and check that Uzbek splits on real morpheme
boundaries — `oʻrgan|ish`, `til|lar|ni`, `moq|da|miz` — with zero unknowns. Then
load `openai-community/gpt2` and confirm it needs roughly twice as many tokens
for the same Uzbek sentence. If those two things are not true, your merge order
is wrong.

## Done means

`npm run build` clean with `noUnusedLocals`, zero console errors, no horizontal
overflow at 390px or 1440px, keyboard operable with visible focus, every network
failure producing a readable Uzbek message, and **no stray English where a user
can see it** (a deliberate English test sample for comparing tokenization is
fine and actually useful). Run the impeccable audit and fix what it flags.

Then tell me what you built, which repos you tested against with the numbers you
measured, and anything you decided on my behalf.

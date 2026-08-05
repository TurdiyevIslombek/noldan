# Prompt 4 — Loyiha: capstone and leaderboard

Paste everything below the line into a fresh chat.

---

Build the **Loyiha** page (`/loyiha`) for **Noldan** (noldan.uz) — a free, open
platform teaching people in Uzbekistan and Central Asia to build AI from scratch
by writing the code themselves.

The courses teach *how*. The Playground lets you poke at it. **Loyiha is where a
student turns that into something of their own and puts it next to everyone
else's.**

**Every visible string is Uzbek (Latin script)** — including `aria-label`s,
empty states and error messages.

Work autonomously. Do not stop to ask about anything specified below.

## Tools — set these up first

- **impeccable** — `/plugin marketplace add pbakaus/impeccable`. Direction
  first, audit before you report done.
- **context7 MCP** — Vite 6, Tailwind v4, react-router v7 specifics.
- **Browser preview tools** — dev server on port 5188 via `.claude/launch.json`.
  This page makes live calls to Hugging Face. **Load the real board and read the
  actual numbers before claiming it works.**
- **WebSearch / WebFetch** — for sourcing the evaluation text below. Do not
  invent Uzbek sentences.

## Stack and design system

React 19 · TypeScript · Vite 6 · Tailwind v4 via `@tailwindcss/vite` ·
react-router-dom v7 · lucide-react · `@fontsource-variable/manrope` +
`@fontsource-variable/jetbrains-mono`. Hand-written CSS per component. No
component library.

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
**strictly** for numbers, scores, vocabulary sizes and repo names.

**Dependency:** this page needs a byte-level BPE reader that can load a real
`tokenizer.json` from Hugging Face (`loadFromHub`, `encode`, `measure`). If one
does not exist in `src/lib/`, build it — GPT-2 byte↔unicode table, GPT-2 regex
pre-split, merge by rank lowest-first — and see the format traps below.

## Part 1 — the capstone brief

Five steps, each with a tick that persists in `localStorage`. No account, no
backend, no sign-in. Show a `n / 5` counter.

1. **Oʻz korpusingizni tanlang** — not FineWeb-2. Their own writing, a book, a
   slice of Wikipedia. Write down where it came from.
2. **Tokenizator oʻqiting** — with the course's own code. Choose a vocabulary
   size and be able to justify the number.
3. **Kichik GPT oʻqiting** — it does not have to be big. A falling loss curve
   and text that generates is enough.
4. **Hugging Face ga nashr qiling** — both artifacts, with a model card stating
   the corpus, the vocabulary size and their measured numbers.
5. **Model kartasiga `noldan` tegini qoʻshing** — after which they appear on the
   leaderboard automatically.

Say plainly that ticks are stored in this browser only.

## Part 2 — the leaderboard

**The entire point is that nothing is self-reported.** There is no submission
form and no field anyone can type a number into. Every row is a real
`tokenizer.json` downloaded from the Hub and run over a fixed Uzbek text **in
the visitor's own browser**. A score here cannot be claimed, only earned. Say
this on the page.

### The metric — this decision matters

Rank by **bits per character**, not tokens per word:

```
bit/belgi = tokens × log2(vocabSize) / chars        (lower is better)
```

**Do not rank by tokens-per-word.** Fertility alone is trivially gamed: make the
vocabulary enormous and it always falls. A leaderboard that rewards that
contradicts what the site teaches about vocabulary being a budget. Each token
costs `log2(V)` bits to identify, so bits-per-character prices the vocabulary
instead of ignoring it.

**Acceptance test before you ship:** BLOOM (`bigscience/bloom-560m`) carries a
250,680-token vocabulary — roughly 15× `IslombekT/uzbek-bpe-16k` — and must
still score **worse** on Uzbek. If a bigger vocabulary automatically wins, your
metric is wrong.

Display alongside the score: `token/soʻz` (the intuitive one) and `lugʻat`
(vocabulary size), so a reader can see the trade-off the ranking is pricing.
Explain the formula on the page, in Uzbek.

### The evaluation text

~150 sentences of real, licensed, human-written Uzbek. The
[Uzbek Corpus Sample](https://github.com/elmurod1202/Uzbek-Corpus-Sample) is
CC BY 4.0 — attribution only, no ShareAlike.

- **It must be held out** of any corpus used elsewhere on the site. Assert zero
  overlap programmatically; do not assume it.
- **Hand-review every sentence.** Automated filters let through material about
  violence, illness and crime that does not belong here.
- **Normalise to `ʻ` (U+02BB)** — real corpora often use U+2018.
- **Say on the page that the eval text is public** and therefore not a sealed
  benchmark. Someone could train on it. For a tokenizer that is a weaker attack
  than it sounds — compressing Uzbek well *is* the goal — and bits-per-char caps
  what memorising it buys. Do not pose as a rigorous benchmark.
- Attribute the source in the file header and keep it there.

### Discovery — no backend

Hugging Face's model search is CORS-open:
`https://huggingface.co/api/models?filter=noldan&limit=100`

A student tags their model `noldan` and appears on the next page load. **No
database, no submission queue, no moderation, no auth, nothing to host.**

Seed the board with four real published tokenizers — `IslombekT/uzbek-bpe-16k`,
`openai-community/gpt2`, `bigscience/bloom-560m`, `FacebookAI/roberta-base` —
scored through **the same code path** as every other row. No hardcoded numbers.
This makes the board meaningful before the first student arrives.

Mark seeded rows as reference entries, and when no student has joined yet, say
so plainly. Do not dress the comparison models up as participants.

### Presentation

Medals for the top three, the first row highlighted, each repo linking to its
Hub page. A refresh button. A progress readout while loading. A "how to join"
section showing the exact YAML to paste into a model card.

## Traps — read before writing code

**Guard `log2(vocabSize)` when vocab ≤ 1.** A malformed file would otherwise
score a perfect `0` and take first place.

**Deduplicate.** A student who tags a repo that is already seeded must not
appear twice.

**SentencePiece and WordPiece cannot be read** by a byte-level BPE engine —
XLM-R and mBERT will fail. Report them as **skipped, with the reason**, in a
collapsed section. Silently dropping them looks like a bug; showing a stack
trace looks unfinished.

**GPT-2's `tokenizer.json` has no `model.type`.** Infer BPE from the presence of
`vocab` + `merges` rather than rejecting on a missing field, or the most famous
tokenizer in the world fails to load.

**`merges` may be `"a b"` or `["a","b"]`.** Handle both; split the string form on
the first space only.

**`toLocaleString("uz-UZ")` silently falls back to commas** — browsers do not
reliably carry uz-UZ locale data. Uzbek groups thousands with a **space**
(`16 384`). Format by hand.

**The tag is public and unmoderated.** Anyone can apply it. That is acceptable
*because the score cannot be faked* — it is recomputed from their real file
every load. Say this on the page rather than pretending the list is curated.

**Handle the offline case.** If the Hub is unreachable or rate-limited, the
seeded rows should still render and the page should say what happened in Uzbek.

**Thread `AbortController` into the fetches** so leaving the page really cancels
them, and do not `setState` after abort.

**Never invent a number.** Every figure on this page must come from a
measurement the code just performed.

**The preview pane may background itself**, throttling `requestAnimationFrame`
to 0 fps. Check `document.hidden` before concluding an animation is broken.

## Verify with real data before you report done

Load the board and read the actual values. You should see roughly:

| # | tokenizer | bit/belgi | token/soʻz | lugʻat |
|---|---|---|---|---|
| 1 | uzbek-bpe-16k | ~3.24 | ~1.73 | 16 384 |
| 2 | bloom-560m | ~7.51 | ~3.13 | 250 680 |
| 3 | gpt2 | ~7.65 | ~3.67 | 50 257 |
| 4 | roberta-base | ~7.65 | ~3.67 | 50 265 |

Exact numbers depend on your eval text, but **the ordering and the shape must
hold**: the Uzbek 16k tokenizer wins clearly, and BLOOM's 250k vocabulary does
not buy it first place. If BLOOM wins, you ranked by fertility.

## Done means

`npm run build` clean with `noUnusedLocals`, zero console errors, the table
scrolling inside its own `overflow-x` container rather than pushing the page
sideways, keyboard operable with visible focus, and **no stray English where a
user can see it**. Run the impeccable audit and fix what it flags.

Then tell me what you built, the real numbers you measured, and anything you
decided on my behalf.

# Noldan — per-page build prompts

Four self-contained prompts. Each one works in a fresh chat with no memory
of the others, so they repeat a short shared foundation on purpose.

| File | Builds | Depends on |
|---|---|---|
| [`01-landing.md`](01-landing.md) | `/` — the scrollytelling homepage | nothing |
| [`02-courses.md`](02-courses.md) | `/learn` + the lesson reader + AI tutor | your lesson markdown |
| [`03-playground.md`](03-playground.md) | `/playground` — tokenizer sandbox | nothing |
| [`04-loyiha.md`](04-loyiha.md) | `/loyiha` — capstone + leaderboard | `03` (reuses the tokenizer engine) |

**Order.** `01` first — it establishes the design tokens, `SmoothScroll`,
`LatticeField` and `SiteNav` that the rest assume. Then `02` and `03` in
either order. `04` last, because its leaderboard imports the Hugging Face
tokenizer loader that `03` builds.

Running only one? Each prompt says which shared pieces it needs and tells the
agent to build them if absent, so a single file still produces something that
runs.

For the whole site in one shot instead, use [`../REBUILD-PROMPT.md`](../REBUILD-PROMPT.md).

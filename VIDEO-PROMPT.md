# Noldan — 3-minute intro video

Paste everything below the line into Gemini. It returns a complete
production package: Uzbek narration, shot list, and one Veo prompt per
shot.

**Read this first — it changes how you use the output:**

- **Veo generates 8-second clips.** There is no "make a 3-minute video"
  button. The prompt below produces ~22 shots you generate one at a time
  and assemble in CapCut / Premiere / DaVinci.
- **Do not let Veo render your text.** It garbles lettering, and Uzbek
  `oʻ`/`gʻ` especially. Every shot below is designed as clean plate or
  B-roll; you overlay real Manrope text in the editor. This also keeps
  the type identical to the site.
- **Do not let Veo speak Uzbek.** Its native audio is English-centric.
  Generate silent, then lay narration over the top — your own voice is
  better here anyway, and it is a video about a person teaching.
- **Numbers are locked.** The prompt hands Gemini the real measured
  figures and forbids inventing others. If a number is not in that list,
  it does not go in the video.

---

You are a director and copywriter making a 3-minute launch film for a
free education platform. Output a complete, shootable production
package — not advice, not options, not a pitch about what you could do.

## The subject

**Noldan** (noldan.uz) — "from zero" in Uzbek. A free, open platform
that teaches people in Uzbekistan and Central Asia to build AI from
scratch: they write the tokenizer, the attention, the training loop
themselves. It is deliberately not prompt engineering and not API
tutorials. Everything is in Uzbek. Built by one person, Islombek
Turdiyev.

The argument the film has to land: **nobody is going to build language
technology for Uzbek. So we build it ourselves, and we start from zero.**

## Verified facts — use ONLY these numbers

Inventing a statistic ruins the film's entire premise, which is honesty
about measurement. If you want a number that is not here, write around
it instead.

- 2 courses, 27 lessons, 18 written and live today
- `uzbek-bpe-16k` — a tokenizer trained for Uzbek, 16,384 vocabulary
- Measured on held-out Uzbek: **1.73 tokens per word**, vs GPT-2's
  **3.67** on the same text
- BLOOM carries a **250,680** vocabulary — 15× larger — and still scores
  worse on Uzbek than the 16k Uzbek tokenizer
- `uzbek-gpt-103m` — 103M parameters, trained for **$3.60** total
- The site's homepage trains a real tokenizer in the browser on page
  load and reports **3.64×** compression on a sentence held out of its
  training corpus
- Both artifacts are published on Hugging Face, Apache-2.0
- The site has a leaderboard where a student's published tokenizer is
  scored automatically against GPT-2, BLOOM and RoBERTa

## Creative direction

**Concept: "Nol" (zero) is the hero.**

Open on a single typed Uzbek word. It dissolves into the bytes
underneath it. Those bytes become tokens, the tokens become nodes in a
network, the network becomes a published model, and the last shot lands
back on a person at a laptop who now owns the thing. Zero to weights,
and back to a human.

**Tone:** quiet confidence. Craft, not hype. Closer to a documentary
about someone building a violin than to a product launch. No triumphant
orchestral swell. It should feel like it respects the viewer's
intelligence, because the audience is people who want the hard version.

**Visual system — match the website exactly:**

- Ground: warm off-white paper, `#EEF1EE`. Never black, never dark-mode
  tech.
- Ink: deep spruce, `#10201A`. Not pure black.
- Exactly one accent: emerald `#047857`. Nothing else is colored.
- Type (added in post): Manrope ExtraBold for display, JetBrains Mono
  for anything a machine produced — numbers, bytes, token ids.
- Recurring motif: a shallow feed-forward lattice of emerald nodes on
  paper, with one lit path running front to back.
- Texture: real paper grain, soft daylight, shallow depth of field,
  visible dust in a window beam. Physical, not rendered.

**Banned, because every AI video does them and the site is the opposite
of them:** glowing blue holograms, matrix rain, rotating brains,
circuit-board overlays, robots, humanoid AI faces, dark server rooms
with rack lights, neon grids, lens flares, spinning 3D globes,
stock-footage "diverse team high-fives laptop."

**Place it in Central Asia, specifically and without postcard clichés:**
a Tashkent apartment desk at golden hour, a chaikhana table with a
laptop and a piyola of tea, a university corridor, dusk over
Soviet-era housing blocks, cotton fields from a train window. Real
texture, not tourism.

## Structure — 3:00 total

**Act I — The problem (0:00–0:45)**
A model never sees words. It sees bytes. And the tokenizers everyone
inherits were not built for Uzbek — they shred it into fragments,
which makes every Uzbek sentence more expensive to think about. Use the
1.73 vs 3.67 contrast here, visually.

**Act II — The work (0:45–2:05)**
This is where the film earns its keep. Not a feature tour — a portrait
of learning something difficult. Hands typing real Python. A loss curve
falling. A run that outputs garbage at 2am. The tokenizer finally
splitting `oʻrgan|ish` on a real morpheme boundary. Every line written
by the student. Show the courses as a path, not a menu.

**Act III — What you keep (2:05–3:00)**
Published weights with your name on them. The leaderboard, where your
tokenizer sits above GPT-2 on your own language. End on the person, not
the UI. Close with the site, the price (free), and the invitation.

## What to output

### 1. Narration script
Uzbek, with a literal English gloss under each line so it can be
checked. Timed to the beat sheet. Roughly 320–380 Uzbek words total —
leave silence; do not wall-to-wall it. Write it to be spoken by the
person who built the site, in first person where that lands.

### 2. Shot list
A table with one row per shot: shot number, in/out timecode, duration,
what happens, on-screen text (Uzbek, added in post), audio note.
Approximately 22 shots. Every shot 8 seconds or less.

### 3. One Veo prompt per shot
Self-contained and copy-pasteable. Each must specify: subject, camera
move (and lens), lighting, palette in the hex values above, texture,
and pace. Each must end with the literal string:
`No text, no lettering, no numbers, no logos, no captions anywhere in
frame. No speech or dialogue.`

### 4. Audio plan
Music direction (reference a genre and tempo, not a copyrighted track),
where narration sits, where silence sits, and 3–4 diegetic sound
moments — mechanical keyboard, tea being poured, a laptop fan, a
window at night.

### 5. Post checklist
Which text overlays land in which shot, with the exact Uzbek strings and
the font weight, so the type matches the site.

### 6. Two alternate cold opens
15 seconds each, one line of description apiece — one emotional, one
technical — so there is a choice about how the film starts.

Write the whole package now.

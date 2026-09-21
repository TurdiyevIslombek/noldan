# Lessons — how to add them

Every lesson is one Markdown file. The site builds itself from these.

```
content/
  tokenizator/          ← Kurs 1 (free — ships to every visitor)
    dars-01.md
    dars-02.md          ← add the next lesson here
  transformer/          ← Kurs 2 (paid — served only after purchase)
```

## Adding a lesson

1. Save the lesson as `content/tokenizator/dars-02.md` (file name = the URL:
   `/learn/tokenizator/dars-02`).
2. Keep the format you already use: `# Dars 02 — Title`, the `> **Vaqt:**` /
   `> **Kerak:**` header, `##` sections, `###` subsections, ```` ```python ````
   code, `**Natija:**` before an output block, `<details>` answers,
   `**Mashq N.**` exercises.
3. With `npm run dev` running the page updates as soon as you save. For a
   deploy, `npm run build` does it automatically.

Everything from the second top-level heading onward (`# 🎬 Ishlab chiqarish
materiallari` — animation prompts, the YouTube script) is ignored and never
published. It is still safest to keep that part out of this folder.

## Python code = typing exercise

Every ```` ```python ```` block outside an answer becomes a typing exercise:
students type it to unlock "Nusxa olish". Blocks inside `<details>` answers are
shown read-only. A block containing `___` is treated as a fill-in template.

## Animations

Mark the spot in the lesson with a comment on its own line:

```
<!-- animatsiya: c1 | Bir xil jumla, ikki narx -->
```

Then drop the rendered video at:

```
public/media/tokenizator/dars-01/c1.mp4
```

The id in the marker is the file name, and it is the name the production
notes give each animation. The letter advances with each lesson: Dars 01
`c1`–`c3`, Dars 02 `d1`–`d3`, Dars 03 `e1`–`e3` … Dars 09 `k1`–`k3`
(`public/media/tokenizator/dars-09/k2.mp4` …).

It appears in place, muted and looping while on screen. Export as **MP4
(H.264)**, 1280×720 or 1920×1080, ideally under 8 MB. Until the file exists,
students see nothing there; you see a dashed placeholder with the exact path.

## YouTube video

Add one line to the lesson's header:

```
> **Video:** https://youtu.be/VIDEO_ID
```

## Seeing the placeholders on the live site

They show automatically on `localhost`. On the deployed site, add `?muallif`
to the URL — e.g. `/learn/tokenizator/dars-01?muallif`.

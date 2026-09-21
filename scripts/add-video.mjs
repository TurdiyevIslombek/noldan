/* --------------------------------------------------------------------
   Puts an animation into its lesson.

     npm run add:video -- ~/Downloads/c1.mp4 dars-01

   The file name is the animation's id — c1, d2, h3 … — the same id as
   the <!-- animatsiya: c1 | … --> marker in the lesson. The video is
   re-encoded for the web (at most 1080p, H.264, starts playing before
   it has fully downloaded, usually a tenth of the size) and saved to
   public/media/<course>/<lesson>/<id>.mp4. Without ffmpeg installed it
   is copied as it is.
   -------------------------------------------------------------------- */

import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync } from "node:fs";
import { basename, extname, join } from "node:path";

const fail = (msg) => {
  console.error(`\n  ${msg}\n`);
  process.exit(1);
};
const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

const [src, lessonArg] = process.argv.slice(2);
if (!src || !lessonArg) fail("Usage: npm run add:video -- <path/to/c1.mp4> <dars-01>");
if (!existsSync(src)) fail(`No such file: ${src}`);

const id = basename(src, extname(src)).toLowerCase();
if (!/^[a-z]\d+$/.test(id)) {
  fail(`Name the file after its animation id, e.g. c1.mp4 — got "${basename(src)}".`);
}

const num = /(\d+)/.exec(lessonArg)?.[1];
if (!num) fail(`Which lesson? Expected something like dars-01, got "${lessonArg}".`);
const lesson = `dars-${num.padStart(2, "0")}`;

const course = readdirSync("content").find((c) => existsSync(join("content", c, `${lesson}.md`)));
if (!course) fail(`No lesson content/*/${lesson}.md`);

const md = readFileSync(join("content", course, `${lesson}.md`), "utf8");
const markers = [...md.matchAll(/<!--\s*animatsiya:\s*([\w-]+)\s*\|\s*(.*?)\s*-->/gi)];
const marker = markers.find((m) => m[1].toLowerCase() === id);

const dir = join("public", "media", course, lesson);
const out = join(dir, `${id}.mp4`);
mkdirSync(dir, { recursive: true });

const hasFfmpeg = spawnSync("ffmpeg", ["-version"]).status === 0;
if (hasFfmpeg) {
  const audio = spawnSync(
    "ffprobe",
    ["-v", "error", "-select_streams", "a", "-show_entries", "stream=codec_name", "-of", "csv=p=0", src],
    { encoding: "utf8" }
  ).stdout.trim();
  const run = spawnSync(
    "ffmpeg",
    [
      "-v", "error", "-y", "-i", src,
      "-vf", "scale='min(1920,iw)':-2",
      "-c:v", "libx264", "-preset", "slow", "-crf", "26", "-pix_fmt", "yuv420p",
      "-movflags", "+faststart",
      ...(audio ? ["-c:a", "aac", "-b:a", "96k"] : ["-an"]),
      out,
    ],
    { stdio: "inherit" }
  );
  if (run.status !== 0) fail("ffmpeg could not convert the video.");
} else {
  copyFileSync(src, out);
  console.log("\n  ffmpeg is not installed, so the video was copied without shrinking it.");
}

console.log(`\n  ${basename(src)} → ${out}`);
console.log(`  ${mb(statSync(src).size)} → ${mb(statSync(out).size)}`);
if (!hasFfmpeg && statSync(out).size > 8 * 1024 * 1024) {
  console.log("  Over 8 MB — slow on mobile data. Installing ffmpeg (brew install ffmpeg) and re-running shrinks it.");
}
if (marker) {
  console.log(`  Shows in ${lesson} at "${marker[2]}".`);
} else {
  console.log(`\n  ⚠ ${lesson} has no <!-- animatsiya: ${id} | … --> marker, so the video will not show yet.`);
  console.log(`    Markers in this lesson: ${markers.map((m) => m[1]).join(", ") || "none"}.`);
}
console.log("\n  Commit and push; it is live about a minute later.\n");

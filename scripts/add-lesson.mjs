/* --------------------------------------------------------------------
   Adds a lesson from the author's Markdown file.

     npm run add:lesson -- ~/Downloads/noldan-1-dars-10.md

   · reads "# Dars 10 — …" for the lesson number and "Kurs 1" for the
     course,
   · drops the production material — everything from the second
     top-level heading: animation prompts, the video script. It is never
     published, not on the site and not in the repo,
   · saves content/<course>/dars-10.md,
   · lists the animations the production notes name, and whether the
     lesson marks where each one goes,
   · runs every lesson's code (npm run check:lessons).

   Where an animation goes is a teaching decision, so markers are placed
   by hand: <!-- animatsiya: l1 | Title --> on its own line.

   An existing lesson is never overwritten without --force: it may carry
   markers and fixes the new file does not have.
   -------------------------------------------------------------------- */

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const COURSES = { 1: "tokenizator", 2: "transformer" };

const fail = (msg) => {
  console.error(`\n  ${msg}\n`);
  process.exit(1);
};

const args = process.argv.slice(2);
const force = args.includes("--force");
const src = args.find((a) => !a.startsWith("--"));
if (!src) fail("Usage: npm run add:lesson -- <path/to/noldan-1-dars-10.md> [--force]");
if (!existsSync(src)) fail(`No such file: ${src}`);

const lines = readFileSync(src, "utf8").replace(/\r\n?/g, "\n").split("\n");

// The second top-level heading starts the production notes. Lines inside
// a code fence are code: a Python "# comment" is not a heading.
let cut = lines.length;
let headings = 0;
let fenced = false;
for (let i = 0; i < lines.length; i++) {
  if (/^\s*```/.test(lines[i])) fenced = !fenced;
  else if (!fenced && /^#\s/.test(lines[i]) && ++headings === 2) {
    cut = i;
    break;
  }
}
const body = lines.slice(0, cut);
while (body.length && /^\s*(---)?\s*$/.test(body[body.length - 1])) body.pop();
const production = lines.slice(cut).join("\n");

const title = body.find((l) => /^#\s/.test(l)) ?? "";
const n = /^#\s+Dars\s+(\d+)/.exec(title)?.[1];
if (!n) fail(`The first line should read "# Dars NN — Title"; found "${title}".`);
const lesson = `dars-${n.padStart(2, "0")}`;

const kurs = /\*\*Kurs:\*\*.*?Kurs\s+(\d+)/.exec(body.join("\n"))?.[1] ?? "1";
const course = COURSES[kurs];
if (!course) fail(`Unknown course "Kurs ${kurs}".`);

const dest = join("content", course, `${lesson}.md`);
if (existsSync(dest) && !force) {
  const kept = [...readFileSync(dest, "utf8").matchAll(/<!--\s*animatsiya:\s*([\w-]+)/g)].map((m) => m[1]);
  fail(
    `${dest} already exists${kept.length ? ` (with animation markers ${kept.join(", ")})` : ""}.\n` +
      "  Re-run with --force to replace it — markers and fixes in the old file are lost."
  );
}

mkdirSync(join("content", course), { recursive: true });
const text = body.join("\n") + "\n";
writeFileSync(dest, text);
console.log(`\n  Saved ${dest} — ${body.length} lines; ${lines.length - cut} lines of production notes left out.`);

// Animations the production notes name: "### H1 — "255 CHEGARASI" (14 sek)".
const named = [...production.matchAll(/^###\s+([A-Z]\d+)\s+[—–-]\s+"?([^"(\n]+?)"?\s*(?:\(|$)/gm)];
if (named.length) {
  console.log("\n  Animations in the production notes:");
  for (const [, id, name] of named) {
    const has = new RegExp(`<!--\\s*animatsiya:\\s*${id}\\s*\\|`, "i").test(text);
    console.log(`    ${id.toLowerCase().padEnd(4)} ${name.trim().padEnd(34)} ${has ? "marked" : "needs a marker"}`);
  }
  console.log(`\n  Marker, on its own line where the animation belongs:`);
  console.log(`    <!-- animatsiya: ${named[0][1].toLowerCase()} | Title -->`);
}

console.log("\n  Checking every lesson's code…");
const check = spawnSync("python3", ["scripts/check-lessons.py"], { stdio: "inherit" });
if (check.error) console.log("  (python3 not found — skipped the code check)");
process.exit(check.status ?? 0);

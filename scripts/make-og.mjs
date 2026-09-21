import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

/* --------------------------------------------------------------------
   public/og.png — the 1200×630 card shown when a link is shared
   (Telegram, X, Facebook, search results that use it).

   Drawn in the landing page's look: night sky, the same three star
   colours, a spiral of stars, the headline in Geist. Rendered by the
   Chrome already on this machine in headless mode, loading Geist
   straight from node_modules — no font installation, no extra tools.

     npm run og           # SITE_URL=https://yourdomain npm run og
   -------------------------------------------------------------------- */

const W = 1200;
const H = 630;
const host = (process.env.SITE_URL || "https://noldan.uz").replace(/^https?:\/\//, "").replace(/\/+$/, "");
const font = (dir, file) => pathToFileURL(resolve("node_modules/@fontsource-variable", dir, "files", file)).href;

let seed = 11;
const r = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const COLOURS = ["236,244,255", "148,204,255", "255,172,122"];
const colour = () => COLOURS[r() < 0.62 ? 0 : r() < 0.62 ? 1 : 2];
const dot = (x, y, s, c, a) =>
  `<i style="left:${(x - s / 2).toFixed(1)}px;top:${(y - s / 2).toFixed(1)}px;width:${s.toFixed(1)}px;height:${s.toFixed(1)}px;` +
  `background:radial-gradient(circle,rgba(255,255,255,${a}) 0,rgba(${c},${(a * 0.8).toFixed(2)}) 20%,rgba(${c},0) 70%)"></i>`;

let stars = "";
for (let i = 0; i < 240; i++) stars += dot(r() * W, r() * H, 2 + r() * 5, colour(), 0.2 + r() * 0.5);

// The training spiral from the landing page: two arms and a bright core.
const cx = 935;
const cy = 318;
for (let i = 0; i < 700; i++) {
  const arm = r() < 0.5 ? 0 : Math.PI;
  const s = Math.pow(r(), 0.8);
  const a = s * 3.2 * Math.PI + arm;
  const rad = 16 + s * 235;
  const off = (2 + 14 * s) * (r() - 0.5) * 2;
  const x = cx + Math.cos(a) * rad + Math.cos(a + Math.PI / 2) * off;
  const y = cy + (Math.sin(a) * rad + Math.sin(a + Math.PI / 2) * off) * 0.62;
  const big = r() < 0.1;
  stars += dot(x, y, big ? 16 + r() * 6 : 4 + r() * 3, colour(), big ? 0.95 : 0.7);
}

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:G;src:url("${font("geist", "geist-latin-wght-normal.woff2")}") format("woff2");font-weight:100 900}
@font-face{font-family:GM;src:url("${font("geist-mono", "geist-mono-latin-wght-normal.woff2")}") format("woff2");font-weight:100 900}
html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden}
body{position:relative;font-family:G,sans-serif;color:#eef2f8;
 background:radial-gradient(55% 70% at 78% 50%,rgba(26,40,70,.6),transparent 70%),
 radial-gradient(120% 100% at 50% 40%,#0a101c 0%,#060912 55%,#04060b 100%)}
i{position:absolute;display:block;border-radius:50%}
.core{position:absolute;left:${cx - 130}px;top:${cy - 80}px;width:260px;height:160px;border-radius:50%;
 background:radial-gradient(closest-side,rgba(255,240,228,.55),rgba(255,210,180,.16) 45%,transparent)}
.shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(4,6,11,.88) 0,rgba(4,6,11,.55) 44%,transparent 64%)}
.copy{position:absolute;left:72px;top:0;bottom:0;width:640px;display:flex;flex-direction:column;justify-content:center}
.mark{font-weight:600;font-size:30px;letter-spacing:-.03em;margin-bottom:54px}
.meta{font-family:GM,monospace;font-size:20px;color:#ffb487;margin-bottom:22px}
h1{margin:0;font-weight:560;font-size:78px;line-height:.98;letter-spacing:-.045em}
.sub{margin-top:26px;font-size:25px;line-height:1.45;color:#b7c0cf;max-width:560px}
.host{position:absolute;left:72px;bottom:44px;font-family:GM,monospace;font-size:18px;color:#7f8a9d}
</style></head><body>${stars}<div class="core"></div><div class="shade"></div>
<div class="copy"><div class="mark">Noldan</div>
<div class="meta">Oʻzbek tilida · bepul · kod bilish shart emas</div>
<h1>Sunʼiy intellektni<br>noldan quring.</h1>
<div class="sub">Tokenizatordan oʻz modelingizgacha — har bir satrni oʻzingiz yozasiz.</div></div>
<div class="host">${host}</div></body></html>`;

const dir = mkdtempSync(join(tmpdir(), "noldan-og-"));
const file = join(dir, "og.html");
writeFileSync(file, html);
const chrome = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
execFileSync(
  chrome,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--allow-file-access-from-files",
    "--force-device-scale-factor=1",
    `--window-size=${W},${H}`,
    "--virtual-time-budget=4000",
    `--screenshot=${resolve("public/og.png")}`,
    pathToFileURL(file).href,
  ],
  { stdio: "ignore" }
);
console.log("public/og.png written for", host);

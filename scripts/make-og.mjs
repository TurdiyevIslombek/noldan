import { writeFileSync } from "node:fs";

/* --------------------------------------------------------------------
   Generates public/og.png — the 1200x630 card social platforms show
   when someone shares a link. Same palette, type and lattice motif as
   the site, so the preview looks like the page it opens.

   Regenerate after changing the headline. Needs `rsvg-convert`
   (brew install librsvg) and Manrope + JetBrains Mono reachable by
   fontconfig — both are OFL and already vendored as woff2 under
   node_modules/@fontsource-variable, but fontconfig needs TTF:

     node scripts/make-og.mjs                       # writes og.svg
     rsvg-convert -w 1200 -h 630 og.svg -o public/og.png

   If the type comes out as a fallback sans, fontconfig did not find
   Manrope — point FONTCONFIG_FILE at a conf with a <dir> holding the
   TTFs from github.com/google/fonts.
   -------------------------------------------------------------------- */

const W = 1200, H = 630;
const PAPER = "#eef1ee";
const INK = "#10201a";
const MUTED = "#5d6f68";
const ACCENT = "#047857";
const LINE = "rgba(16,32,26,0.10)";

// ---- lattice ------------------------------------------------------
// A shallow feed-forward net, echoing LatticeField on the live page.
// Every layer spans the SAME vertical extent regardless of how many
// units it holds — that is what makes fan-in and fan-out legible.
// Scaling the spread by unit count instead produces an even diamond
// mesh that reads as wallpaper.
const LAYERS = [4, 7, 7, 4];
const X0 = 812, DX = 116, CY = 300, SPAN = 300;

const nodes = LAYERS.map((count, li) =>
  Array.from({ length: count }, (_, ni) => {
    const t = count === 1 ? 0.5 : ni / (count - 1);
    // Perspective: middle layers sit nearer the viewer.
    const depth = 1 - Math.abs(li - (LAYERS.length - 1) / 2) / LAYERS.length;
    return {
      x: X0 + li * DX,
      y: CY + (t - 0.5) * SPAN,
      r: 3.6 + depth * 2.4,
      o: 0.36 + depth * 0.46,
    };
  })
);

// Weight each edge by how far it travels vertically, so the net has the
// dense-core / sparse-fringe look of a real weight matrix.
let edges = "";
for (let li = 0; li < nodes.length - 1; li++)
  for (const a of nodes[li])
    for (const b of nodes[li + 1]) {
      const near = 1 - Math.min(1, Math.abs(a.y - b.y) / 260);
      edges += `<path d="M${a.x} ${a.y.toFixed(1)}L${b.x} ${b.y.toFixed(1)}" stroke="${ACCENT}" stroke-width="${(0.45 + near * 0.55).toFixed(2)}" opacity="${(0.05 + near * 0.2).toFixed(3)}"/>`;
    }

// One lit path front to back — the forward pulse, frozen.
const PULSE = [1, 2, 4, 2];
let pulse = "";
for (let li = 0; li < nodes.length - 1; li++) {
  const a = nodes[li][PULSE[li]], b = nodes[li + 1][PULSE[li + 1]];
  pulse += `<path d="M${a.x} ${a.y.toFixed(1)}L${b.x} ${b.y.toFixed(1)}" stroke="${ACCENT}" stroke-width="1.9" opacity=".62"/>`;
}
pulse += PULSE.map((ni, li) => {
  const n = nodes[li][ni];
  return `<circle cx="${n.x}" cy="${n.y.toFixed(1)}" r="${(n.r + 2.4).toFixed(1)}" fill="${ACCENT}"/>`;
}).join("");

const dots = nodes
  .flat()
  .map((n) => `<circle cx="${n.x}" cy="${n.y.toFixed(1)}" r="${n.r.toFixed(1)}" fill="${ACCENT}" opacity="${n.o.toFixed(2)}"/>`)
  .join("");

// ---- byte strip ---------------------------------------------------
// "noldan" as UTF-8, the same figure chapter 00 opens with.
const BYTES = [...new TextEncoder().encode("noldan")];
const cellW = 52, cellH = 40, stripX = 74, stripY = 478;
const strip = BYTES.map((b, i) => {
  const x = stripX + i * (cellW + 8);
  return `<rect x="${x}" y="${stripY}" width="${cellW}" height="${cellH}" rx="10" fill="#ffffff" stroke="${LINE}"/>` +
    `<text x="${x + cellW / 2}" y="${stripY + 26}" font-family="JetBrains Mono" font-size="15" font-weight="500" fill="${MUTED}" text-anchor="middle">${b}</text>`;
}).join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="72%" cy="48%" r="52%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity=".85"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <g>${edges}${dots}${pulse}</g>

  <!-- brand pill -->
  <rect x="74" y="66" width="150" height="46" rx="23" fill="#ffffff" stroke="rgba(255,255,255,.7)"/>
  <text x="99" y="96" font-family="Manrope" font-size="21" font-weight="800" letter-spacing="-0.2" fill="${INK}">Nol<tspan fill="${ACCENT}">dan</tspan></text>

  <!-- headline -->
  <text font-family="Manrope" font-size="74" font-weight="800" letter-spacing="-3" fill="${INK}">
    <tspan x="74" y="228">Til modelini</tspan>
    <tspan x="74" y="306">noldan quring.</tspan>
  </text>

  <!-- sub -->
  <text font-family="Manrope" font-size="25" font-weight="500" fill="${MUTED}">
    <tspan x="76" y="366">Tokenizator, diqqat mexanizmi, oʻqitish sikli —</tspan>
    <tspan x="76" y="400">har bir satrni oʻzingiz yozasiz.</tspan>
  </text>

  <!-- the figure chapter 00 opens with, captioned so it is not just digits -->
  <text x="76" y="456" font-family="JetBrains Mono" font-size="15" font-weight="500" fill="${MUTED}">noldan <tspan fill="${ACCENT}">&#8594;</tspan> UTF-8</text>
  ${strip}

  <!-- footer chips -->
  <text x="76" y="566" font-family="JetBrains Mono" font-size="17" font-weight="500" fill="${ACCENT}">Bepul</text>
  <circle cx="152" cy="561" r="2.4" fill="${MUTED}" opacity=".5"/>
  <text x="166" y="566" font-family="JetBrains Mono" font-size="17" font-weight="500" fill="${ACCENT}">Ochiq kodli</text>
  <circle cx="290" cy="561" r="2.4" fill="${MUTED}" opacity=".5"/>
  <text x="304" y="566" font-family="JetBrains Mono" font-size="17" font-weight="500" fill="${ACCENT}">Oʻzbek tilida</text>

  <text x="${W - 74}" y="566" font-family="JetBrains Mono" font-size="17" font-weight="500" fill="${MUTED}" text-anchor="end">noldan.uz</text>
</svg>`;

writeFileSync("og.svg", svg);
console.log("og.svg written,", svg.length, "bytes");

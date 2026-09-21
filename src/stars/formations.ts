import { NO_COLOR, rng, type Net } from "./field";

/* ====================================================================
   The pictures, as lists of destinations.

   Each builder returns exactly `count` points in layout units, centred
   on the origin, roughly within a radius of 1.3. The field decides where
   on screen that origin sits and how it turns; these only decide shape.

   The look the page is after is strands, not blobs — beads of light
   strung along a curve with dust between them. So every builder puts
   most of its points on lines: the outline of a letter, the arm of a
   spiral, a fold of the cortex. Filled shapes of stars read as fog.
   ==================================================================== */

export type Built = { pts: Float32Array; colors?: Uint8Array; net?: Net };

const TAU = Math.PI * 2;

function gauss(r: () => number) {
  let u = 0;
  let v = 0;
  while (u === 0) u = r();
  while (v === 0) v = r();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v);
}

const fract = (v: number) => v - Math.floor(v);

/* ---- set type --------------------------------------------------------- */

export type Part = { text: string; group: number };
export type Line = { parts: Part[]; px: number; gap: number };

const FONT = (px: number) =>
  `600 ${px}px "Geist Variable", system-ui, -apple-system, "Segoe UI", sans-serif`;

/**
 * Lines of text, rendered once and sampled mostly along their edges so
 * the letters are drawn in strands of light rather than filled in.
 *
 * Parts on a line are kept apart by `gap` (in ems) and each carries a
 * group number, which rides through the raster in the red channel so a
 * sampled point knows which token it belongs to.
 */
export function lines(
  count: number,
  ls: Line[],
  o: { maxW: number; maxH: number; color: (group: number) => number }
): Built {
  const cv = document.createElement("canvas");
  const g = cv.getContext("2d", { willReadFrequently: true })!;

  const widths = ls.map((l) => {
    g.font = FONT(l.px);
    return l.parts.reduce(
      (w, p, i) => w + g.measureText(p.text).width + (i ? l.gap * l.px : 0),
      0
    );
  });
  const lineH = ls.map((l) => l.px * 1.2);
  const pad = 24;
  const cw = Math.ceil(Math.max(10, ...widths) + pad * 2);
  const ch = Math.ceil(lineH.reduce((a, b) => a + b, 0) + pad * 2);
  cv.width = cw;
  cv.height = ch;

  g.textBaseline = "middle";
  g.textAlign = "left";
  let y = pad;
  ls.forEach((l, li) => {
    g.font = FONT(l.px);
    let x = (cw - widths[li]) / 2;
    const cy = y + lineH[li] / 2;
    l.parts.forEach((p, i) => {
      if (i) x += l.gap * l.px;
      // Twenty levels apart, so antialiasing at the edge of a glyph
      // cannot blur one group into the next.
      g.fillStyle = `rgb(${10 + Math.min(11, p.group) * 20}, 255, 255)`;
      g.fillText(p.text, x, cy);
      x += g.measureText(p.text).width;
    });
    y += lineH[li];
  });

  const data = g.getImageData(0, 0, cw, ch).data;
  const S = 2;
  const on = (x: number, yy: number) =>
    x >= 0 && yy >= 0 && x < cw && yy < ch && data[(yy * cw + x) * 4 + 3] >= 128;
  const edge: number[] = [];
  const fill: number[] = [];
  for (let yy = 0; yy < ch; yy += S) {
    for (let x = 0; x < cw; x += S) {
      if (!on(x, yy)) continue;
      const idx = yy * cw + x;
      if (!on(x + S, yy) || !on(x - S, yy) || !on(x, yy + S) || !on(x, yy - S)) {
        edge.push(idx);
      } else {
        fill.push(idx);
      }
    }
  }

  const r = rng(5 + count);
  const scale = Math.min(o.maxW / cw, o.maxH / ch);
  const pts = new Float32Array(count * 3);
  const colors = new Uint8Array(count);

  for (let k = 0; k < count; k++) {
    const src = edge.length && (r() < 0.8 || !fill.length) ? edge : fill;
    if (!src.length) {
      pts[k * 3] = (r() - 0.5) * o.maxW;
      pts[k * 3 + 1] = (r() - 0.5) * o.maxH;
      colors[k] = NO_COLOR;
      continue;
    }
    const idx = src[(r() * src.length) | 0];
    const sx = (idx % cw) + (r() - 0.5) * S;
    const sy = Math.floor(idx / cw) + (r() - 0.5) * S;
    pts[k * 3] = (sx - cw / 2) * scale;
    pts[k * 3 + 1] = -(sy - ch / 2) * scale;
    pts[k * 3 + 2] = (r() - 0.5) * 0.06;
    const group = Math.max(0, Math.round((data[idx * 4] - 10) / 20));
    colors[k] = o.color(group);
  }
  return { pts, colors };
}

/* ---- two rows of beads: the same sentence, two tokenizers ------------ */

/**
 * One bead per token. Both rows share a spacing and a left edge, so the
 * difference in length between them is the difference in token count —
 * the picture cannot exaggerate what the measurement says.
 */
export function compare(count: number, top: number, bottom: number): Built {
  const r = rng(29);
  const pts = new Float32Array(count * 3);
  const colors = new Uint8Array(count);
  const t = Math.max(1, top);
  const b = Math.max(1, bottom);
  const most = Math.max(t, b);
  const spacing = Math.min(0.22, 2.3 / most);
  const x0 = -((most - 1) * spacing) / 2;
  const rows = [
    { n: t, y: 0.36, c: 2 },
    { n: b, y: -0.36, c: 1 },
  ];

  let k = 0;
  rows.forEach((row, ri) => {
    const share = ri === 0 ? Math.round((count * t) / (t + b)) : count - k;
    for (let s = 0; s < share && k < count; s++, k++) {
      let x: number;
      let y: number;
      const u = r();
      if (u < 0.2) {
        // The thread the beads hang on.
        x = x0 + r() * (row.n - 1) * spacing;
        y = row.y + gauss(r) * 0.006;
      } else {
        const bead = (r() * row.n) | 0;
        const cx = x0 + bead * spacing;
        const a = r() * TAU;
        // Mostly a ring, some fill: a token reads as a bubble.
        const rad = spacing * 0.3 * (u < 0.72 ? 0.85 + r() * 0.15 : Math.sqrt(r()));
        x = cx + Math.cos(a) * rad;
        y = row.y + Math.sin(a) * rad;
      }
      pts[k * 3] = x;
      pts[k * 3 + 1] = y;
      pts[k * 3 + 2] = gauss(r) * 0.03;
      colors[k] = r() < 0.8 ? row.c : 0;
    }
  });
  return { pts, colors };
}

/* ---- a spiral ---------------------------------------------------------- */

/** Two arms and a bright bulge. Laid in the x–z plane; the field tilts
 *  and turns it. */
export function galaxy(count: number): Built {
  const r = rng(17);
  const pts = new Float32Array(count * 3);
  const colors = new Uint8Array(count);
  for (let k = 0; k < count; k++) {
    let x: number;
    let y: number;
    let z: number;
    if (r() < 0.14) {
      const rad = Math.abs(gauss(r)) * 0.15;
      const a = r() * TAU;
      x = Math.cos(a) * rad;
      z = Math.sin(a) * rad;
      y = gauss(r) * 0.05;
      colors[k] = r() < 0.55 ? 0 : 2;
    } else {
      const arm = r() < 0.5 ? 0 : Math.PI;
      const s = Math.pow(r(), 0.8);
      const a = s * 3.2 * Math.PI + arm;
      const rad = 0.14 + s * 1.05;
      // Tight to the arm's spine, looser toward the rim.
      const off = (0.015 + 0.06 * s) * gauss(r);
      x = Math.cos(a) * rad + Math.cos(a + Math.PI / 2) * off;
      z = Math.sin(a) * rad + Math.sin(a + Math.PI / 2) * off;
      y = gauss(r) * 0.022;
      colors[k] = NO_COLOR;
    }
    pts[k * 3] = x;
    pts[k * 3 + 1] = y;
    pts[k * 3 + 2] = z;
  }
  return { pts, colors };
}

/* ---- a brain ----------------------------------------------------------- */

function h3(x: number, y: number, z: number) {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(z, 1440662683);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}

function vnoise3(x: number, y: number, z: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const zi = Math.floor(z);
  let fx = x - xi;
  let fy = y - yi;
  let fz = z - zi;
  fx = fx * fx * (3 - 2 * fx);
  fy = fy * fy * (3 - 2 * fy);
  fz = fz * fz * (3 - 2 * fz);
  const l = (a: number, b: number, t: number) => a + (b - a) * t;
  return l(
    l(
      l(h3(xi, yi, zi), h3(xi + 1, yi, zi), fx),
      l(h3(xi, yi + 1, zi), h3(xi + 1, yi + 1, zi), fx),
      fy
    ),
    l(
      l(h3(xi, yi, zi + 1), h3(xi + 1, yi, zi + 1), fx),
      l(h3(xi, yi + 1, zi + 1), h3(xi + 1, yi + 1, zi + 1), fx),
      fy
    ),
    fz
  );
}

function fbm3(x: number, y: number, z: number) {
  return (
    (vnoise3(x, y, z) * 0.5 +
      vnoise3(x * 2.03, y * 2.03, z * 2.03) * 0.25 +
      vnoise3(x * 4.1, y * 4.1, z * 4.1) * 0.125) /
    0.875
  );
}

/**
 * Two hemispheres, a cerebellum, and a stem — drawn in folds.
 *
 * The folds are the trick. The contour lines of a smooth 3D noise field,
 * taken on the surface of each hemisphere, wander and close on
 * themselves exactly the way gyri do, so points are kept only where
 * they sit near a contour. The gap between the hemispheres is simply
 * left empty, which is what makes the shape read as a brain from any
 * angle rather than as a lumpy egg.
 *
 * Axes: x is left–right, y is up, z is front (+) to back (−).
 */
export function brain(count: number): Built {
  const r = rng(41);
  const pts = new Float32Array(count * 3);
  let n = 0;
  const push = (x: number, y: number, z: number) => {
    pts[n * 3] = x;
    pts[n * 3 + 1] = y;
    pts[n * 3 + 2] = z;
    n++;
  };
  const dir = () => {
    const u = r() * 2 - 1;
    const a = r() * TAU;
    const s = Math.sqrt(1 - u * u);
    return [s * Math.cos(a), u, s * Math.sin(a)];
  };

  const nHemi = Math.floor(count * 0.82);
  const nCb = Math.floor(count * 0.12);
  let guard = 0;

  while (n < nHemi && guard++ < 2_000_000) {
    const [dx, dy, dz] = dir();
    const h = r() < 0.5 ? -1 : 1;
    let x = h * 0.46 + dx * 0.5;
    let y = 0.1 + dy * 0.68;
    const z = dz * 1.0;
    // The longitudinal fissure.
    if (h * x < 0.07) continue;
    // A brain is flatter underneath than on top.
    if (y < -0.32) y = -0.32 + (y + 0.32) * 0.3;
    // Temporal lobes bulge low and forward.
    if (y < 0 && z > -0.25) x += h * 0.07 * -y;
    const g = fbm3((x + 5) * 3.9, (y + 5) * 3.9, (z + 5) * 3.9);
    const band = Math.abs(fract(g * 6) - 0.5);
    // Only a thin band either side of each contour survives. Widen it
    // and the shell fills in evenly, and an evenly dusted shell reads as
    // an egg, not a cortex.
    if (band < 0.43 && r() > 0.03) continue;
    push(x, y, z);
  }

  while (n < nHemi + nCb && guard++ < 4_000_000) {
    const [dx, dy, dz] = dir();
    const x = dx * 0.52;
    const y = -0.44 + dy * 0.22;
    const z = -0.6 + dz * 0.3;
    // Tucked under the back of the hemispheres, so only its lower curve
    // shows — with the fine, parallel folds the cerebellum is known for.
    if (y > -0.3 && z > -0.5) continue;
    if (Math.abs(fract((y + 2) * 16) - 0.5) < 0.3 && r() > 0.1) continue;
    push(x, y, z);
  }

  while (n < count) {
    const a = r() * TAU;
    const yy = -0.5 - r() * 0.55;
    push(Math.cos(a) * 0.1, yy, -0.34 + Math.sin(a) * 0.1 - (yy + 0.5) * 0.18);
  }

  // ---- the wiring ------------------------------------------------------
  // Neurons are drawn from the first stretch of hemisphere points so they
  // are never among the stars a slow machine stops drawing.
  const pool = Math.min(nHemi, Math.floor(count * 0.3));
  const NODES = Math.min(96, pool);
  const picked = new Set<number>();
  while (picked.size < NODES) picked.add((r() * pool) | 0);
  const nodes = Uint32Array.from(picked);
  const P = (i: number) => [pts[nodes[i] * 3], pts[nodes[i] * 3 + 1], pts[nodes[i] * 3 + 2]];

  const seen = new Set<string>();
  const edges: number[] = [];
  const link = (a: number, b: number) => {
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (a === b || seen.has(key)) return;
    seen.add(key);
    edges.push(a, b);
  };
  for (let i = 0; i < NODES; i++) {
    const [x, y, z] = P(i);
    const near = [...Array(NODES).keys()]
      .filter((j) => j !== i)
      .map((j) => {
        const [a, b, c] = P(j);
        return { j, d: (a - x) ** 2 + (b - y) ** 2 + (c - z) ** 2 };
      })
      .sort((p, q) => p.d - q.d);
    link(i, near[0].j);
    link(i, near[1].j);
    if (r() < 0.35) link(i, near[2].j);
  }
  // A few long connections, across and between the hemispheres. Only a
  // few: past half a dozen they stop reading as wiring and become a
  // scribble over the shape.
  for (let s = 0; s < 6; s++) link((r() * NODES) | 0, (r() * NODES) | 0);

  const adj: number[][] = Array.from({ length: NODES }, () => []);
  for (let e = 0; e < edges.length / 2; e++) {
    adj[edges[e * 2]].push(e);
    adj[edges[e * 2 + 1]].push(e);
  }

  return { pts, net: { nodes, edges: Uint32Array.from(edges), adj } };
}

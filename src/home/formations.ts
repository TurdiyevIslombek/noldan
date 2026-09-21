/* ====================================================================
   The five formations the point cloud morphs between.

   Each returns a Float32Array of length N*3. They are not abstract
   shapes: they are the five states the course actually moves through,
   in order — noise, the 256 byte values, learned tokens, the causal
   attention mask, and the name of the thing you end up with.
   ==================================================================== */

const rand = (a: number, b: number) => a + Math.random() * (b - a);

/** Box–Muller, so clusters look like samples rather than blobs. */
function gauss() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/** 0 — undifferentiated noise. Text before anything has been decided. */
export function chaos(n: number) {
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const r = 13 + Math.pow(Math.random(), 0.34) * 15;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    a[i * 3] = r * Math.sin(ph) * Math.cos(th);
    a[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.72;
    a[i * 3 + 2] = r * Math.cos(ph) * 0.72;
  }
  return a;
}

/** 1 — the base vocabulary: 256 byte values on a 16×16 lattice. */
export function bytes(n: number) {
  const a = new Float32Array(n * 3);
  const cols = 16;
  const step = 1.85;
  const off = ((cols - 1) * step) / 2;
  for (let i = 0; i < n; i++) {
    const cell = i % 256;
    const cx = (cell % cols) * step - off;
    const cy = off - Math.floor(cell / cols) * step;
    a[i * 3] = cx + gauss() * 0.3;
    a[i * 3 + 1] = cy + gauss() * 0.3;
    a[i * 3 + 2] = gauss() * 0.42;
  }
  return a;
}

/** 2 — merges pull bytes into a smaller number of denser tokens. */
export function tokens(n: number, k = 68) {
  const a = new Float32Array(n * 3);
  const centres: number[][] = [];
  for (let c = 0; c < k; c++) {
    const r = Math.sqrt(Math.random()) * 17;
    const th = Math.random() * Math.PI * 2;
    centres.push([r * Math.cos(th), r * Math.sin(th) * 0.78, rand(-5, 5)]);
  }
  for (let i = 0; i < n; i++) {
    const c = centres[i % k];
    const s = 0.5 + Math.random() * 1.15;
    a[i * 3] = c[0] + gauss() * s;
    a[i * 3 + 1] = c[1] + gauss() * s;
    a[i * 3 + 2] = c[2] + gauss() * s * 0.8;
  }
  return a;
}

/** 3 — the causal mask. A position may only attend to what came
 *  before it, so the matrix is exactly a lower triangle. */
export function attention(n: number, size = 40) {
  const cells: number[][] = [];
  const step = 0.86;
  const off = ((size - 1) * step) / 2;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c <= r; c++) {
      cells.push([c * step - off, off - r * step, 1 / (1 + (r - c) * 0.5)]);
    }
  }
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const cell = cells[i % cells.length];
    a[i * 3] = cell[0] + gauss() * 0.17;
    a[i * 3 + 1] = cell[1] + gauss() * 0.17;
    // Weight lifts the near diagonal off the plane, so the decay is
    // visible as relief rather than only as brightness.
    a[i * 3 + 2] = cell[2] * 3.4 + gauss() * 0.2;
  }
  return a;
}

/** 4 — what you are left with, sampled from the wordmark itself. */
export function wordmark(n: number, text = "NOLDAN", font = "sans-serif") {
  const W = 1024;
  const H = 288;
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = H;
  const ctx = cv.getContext("2d", { willReadFrequently: true });
  const a = new Float32Array(n * 3);
  if (!ctx) return a;

  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  let size = 210;
  ctx.font = `700 ${size}px ${font}`;
  // Fit the word to the canvas so a substituted face cannot clip it.
  const measured = ctx.measureText(text).width;
  if (measured > W * 0.92) {
    size = Math.floor((size * W * 0.92) / measured);
    ctx.font = `700 ${size}px ${font}`;
  }
  ctx.fillText(text, W / 2, H / 2);

  const data = ctx.getImageData(0, 0, W, H).data;
  const hits: number[] = [];
  for (let y = 0; y < H; y += 1) {
    for (let x = 0; x < W; x += 1) {
      if (data[(y * W + x) * 4 + 3] > 128) hits.push(x, y);
    }
  }
  if (hits.length === 0) return chaos(n);

  const count = hits.length / 2;
  const scale = 37 / W;
  for (let i = 0; i < n; i++) {
    // Stride across the whole hit list. Indexing with i % count would
    // pack every particle into the first rows whenever the glyph has
    // more filled pixels than there are particles.
    const j = Math.floor((i * count) / n) * 2;
    a[i * 3] = (hits[j] - W / 2) * scale + gauss() * 0.055;
    a[i * 3 + 1] = (H / 2 - hits[j + 1]) * scale + gauss() * 0.055;
    a[i * 3 + 2] = gauss() * 0.14;
  }
  return a;
}

/* Cool and unresolved at the start, warming as structure appears, and
   near-white by the time it spells the name. Values run past 1 on
   purpose: the bloom pass reads the overshoot as glow. */
export const STAGE_COLOR = [
  [0.5, 0.58, 0.78],
  [0.52, 0.66, 1.35],
  [0.34, 1.12, 1.0],
  [1.4, 0.86, 0.32],
  [1.12, 1.16, 1.34],
] as const;

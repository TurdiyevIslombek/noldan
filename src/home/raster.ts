/* ====================================================================
   The vision half of the field.

   Bytes are the substrate both halves share, so after the byte lattice
   the sequence forks: language goes to tokens and attention, vision
   goes to a pixel raster and then to what a 3x3 edge kernel leaves of
   it. Both are drawn as characters picked from a density ramp, which
   is the oldest way of showing that an image is a grid of numbers and
   still the clearest.
   ==================================================================== */

/** Grid of the raster formations. Roughly one glyph per cell at the
 *  particle count the field runs. */
export const COLS = 88;
export const ROWS = 52;

/** The same synthetic scene the convolution lab uses, so the field and
 *  the instrument are demonstrably looking at one picture. Drawn rather
 *  than photographed: it needs hard edges, soft gradients and fine
 *  texture for every kernel to have something to do. */
export function drawScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const sky = ctx.createLinearGradient(0, 0, 0, h * 0.68);
  sky.addColorStop(0, "#a8c6de");
  sky.addColorStop(1, "#f6efe2");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = "#e8a324";
  ctx.beginPath();
  ctx.arc(w * 0.74, h * 0.24, Math.min(w, h) * 0.11, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#7b6f96";
  ctx.beginPath();
  ctx.moveTo(-w * 0.05, h * 0.68);
  ctx.lineTo(w * 0.3, h * 0.26);
  ctx.lineTo(w * 0.62, h * 0.68);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#274a4e";
  ctx.beginPath();
  ctx.moveTo(w * 0.44, h * 0.68);
  ctx.lineTo(w * 0.75, h * 0.34);
  ctx.lineTo(w * 1.05, h * 0.68);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#d9c9a4";
  ctx.fillRect(0, h * 0.68, w, h * 0.32);

  ctx.strokeStyle = "rgba(60,42,24,0.55)";
  ctx.lineWidth = Math.max(1, w / 260);
  for (let i = 1; i < 7; i++) {
    const y = h * 0.68 + (i / 7) * h * 0.32;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  for (let i = 0; i < 9; i++) {
    const x = (i / 8) * w;
    ctx.beginPath();
    ctx.moveTo(x, h * 0.68);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
}

/** Luminance and colour per cell, sampled once at grid resolution. */
function sample(): { lum: Float32Array; rgb: Float32Array } {
  const cv = document.createElement("canvas");
  cv.width = COLS;
  cv.height = ROWS;
  const ctx = cv.getContext("2d", { willReadFrequently: true });
  const lum = new Float32Array(COLS * ROWS);
  const rgb = new Float32Array(COLS * ROWS * 3);
  if (!ctx) return { lum, rgb };
  drawScene(ctx, COLS, ROWS);
  const d = ctx.getImageData(0, 0, COLS, ROWS).data;
  for (let i = 0; i < COLS * ROWS; i++) {
    const o = i * 4;
    lum[i] = (0.299 * d[o] + 0.587 * d[o + 1] + 0.114 * d[o + 2]) / 255;
    // Pulled toward the page and desaturated: the raster should read as
    // a colour photograph printed on this paper, not as a screen.
    for (let c = 0; c < 3; c++) {
      const v = d[o + c] / 255;
      const grey = lum[i];
      const hue = grey + (v - grey) * 1.15;
      rgb[i * 3 + c] = 0.2 + hue * 0.5;
    }
  }
  return { lum, rgb };
}

/** Sobel over the luminance grid: magnitude normalised to 0..1, plus
 *  the gradient's direction, which is what the colour will encode. */
function sobel(lum: Float32Array) {
  const out = new Float32Array(COLS * ROWS);
  const ang = new Float32Array(COLS * ROWS);
  const at = (x: number, y: number) =>
    lum[Math.min(ROWS - 1, Math.max(0, y)) * COLS + Math.min(COLS - 1, Math.max(0, x))];
  let peak = 0;
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const gx =
        at(x - 1, y - 1) + 2 * at(x - 1, y) + at(x - 1, y + 1) -
        (at(x + 1, y - 1) + 2 * at(x + 1, y) + at(x + 1, y + 1));
      const gy =
        at(x - 1, y - 1) + 2 * at(x, y - 1) + at(x + 1, y - 1) -
        (at(x - 1, y + 1) + 2 * at(x, y + 1) + at(x + 1, y + 1));
      const m = Math.hypot(gx, gy);
      out[y * COLS + x] = m;
      ang[y * COLS + x] = Math.atan2(gy, gx);
      if (m > peak) peak = m;
    }
  }
  if (peak > 0) for (let i = 0; i < out.length; i++) out[i] /= peak;
  return { mag: out, ang };
}

/** Hue to rgb, for the gradient-orientation map. */
function hsl(h: number, s: number, l: number): [number, number, number] {
  const f = (n: number) => {
    const k = (n + h * 12) % 12;
    return l - s * Math.min(l, 1 - l) * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return [f(0), f(8), f(4)];
}

export type Raster = {
  pos: Float32Array;
  ramp: Float32Array;
  uv: Float32Array;
  rgb: Float32Array;
};

/**
 * Lay the particles out on the grid. `ramp` is 0..15, an index into the
 * density half of the glyph atlas, so a darker cell gets a heavier
 * character exactly the way ASCII art has always worked.
 */
function build(
  n: number,
  value: Float32Array,
  relief: number,
  colour: (cell: number) => [number, number, number]
): Raster {
  const pos = new Float32Array(n * 3);
  const ramp = new Float32Array(n);
  // Grid coordinate per particle, so the shader can sweep a scan line
  // across the raster and fill it row by row.
  const uv = new Float32Array(n * 2);
  const rgb = new Float32Array(n * 3);
  // Wide enough that one cell is a bit larger than one glyph. Pack the
  // grid tighter than that and the characters overlap into grey mush,
  // which is exactly what ASCII tone is not.
  const cell = 72 / COLS;
  const ox = ((COLS - 1) * cell) / 2;
  const oy = ((ROWS - 1) * cell) / 2;
  const cells = COLS * ROWS;

  for (let i = 0; i < n; i++) {
    const c = i % cells;
    const x = c % COLS;
    const y = Math.floor(c / COLS);
    const v = value[c];
    pos[i * 3] = x * cell - ox;
    pos[i * 3 + 1] = oy - y * cell;
    pos[i * 3 + 2] = v * relief;
    ramp[i] = Math.min(15, Math.max(0, Math.round(v * 15)));
    uv[i * 2] = x / (COLS - 1);
    uv[i * 2 + 1] = y / (ROWS - 1);
    const col = colour(c);
    rgb[i * 3] = col[0];
    rgb[i * 3 + 1] = col[1];
    rgb[i * 3 + 2] = col[2];
  }
  return { pos, ramp, uv, rgb };
}

/** The picture as the model receives it: one number per cell. */
export function pixelRaster(n: number): Raster {
  const { lum, rgb } = sample();
  // Invert, then lift the mid-tones. Straight luminance puts almost the
  // whole scene in the lightest two characters and the picture vanishes;
  // the gamma is doing the same job an exposure curve does in print.
  const dark = new Float32Array(lum.length);
  for (let i = 0; i < lum.length; i++) {
    dark[i] = Math.pow(Math.max(0, 1 - lum[i]), 0.8);
  }
  // The vision branch is the only place the page carries real colour,
  // and it carries the picture's own.
  return build(n, dark, 0.6, (c) => [rgb[c * 3], rgb[c * 3 + 1], rgb[c * 3 + 2]]);
}

/** What one 3x3 edge kernel leaves of it. */
export function edgeRaster(n: number): Raster {
  const { mag, ang } = sobel(sample().lum);
  // Edge maps are sparse by nature, so weak edges need lifting too or
  // only the two mountain ridges survive.
  for (let i = 0; i < mag.length; i++) mag[i] = Math.pow(mag[i], 0.72);
  // Hue carries the gradient's direction, which is the standard way to
  // read an orientation map: a horizontal edge and a vertical one are
  // different colours because they are different measurements. Weak
  // edges stay pale so the strong structure is what you see.
  return build(n, mag, 5.5, (c) => {
    const h = (ang[c] / (Math.PI * 2) + 1) % 1;
    // Lightness has to reach the paper at zero magnitude, or a flat sky
    // comes out as a field of colour and the whole claim of the stage,
    // that only edges survive, stops being visible.
    return hsl(h, 0.54, 0.91 - Math.min(0.54, mag[c] * 0.54));
  });
}

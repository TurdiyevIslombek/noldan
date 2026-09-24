/* ====================================================================
   The sky.

   Every star on the page is one particle, and the same few thousand
   particles are reused for every picture: scattered at the top, then
   pulled into a word, into numbers, into tokens, a spiral, a brain. A
   picture is only a list of destinations. The look lives in how they
   are drawn:

     · three sprite shapes rendered once — dust, a glowing bead, and a
       bright star with diffraction spikes — in three colours. A frame
       is a few thousand drawImage calls of those, additively blended,
       so where strands cross they bloom the way light does.

     · real depth. Destinations are 3D, rotated and projected with
       perspective every frame, so near stars are larger and brighter
       than far ones and the spiral and the brain genuinely turn.

     · a flight between pictures, not a cross-fade. Each particle
       leaves on its own delay and arcs out sideways before it lands,
       so a change of picture reads as a swarm re-forming.

   Canvas 2D rather than WebGL, deliberately: it draws on every machine
   a student is likely to own, it cannot lose its context, and a few
   thousand sprites is well inside what it manages at frame rate. If a
   machine cannot keep up, the particle budget shrinks until it can.
   ==================================================================== */

export type Layout = { cx: number; cy: number; unit: number };

export type Net = {
  /** Formation point indices that act as neurons. */
  nodes: Uint32Array;
  /** Pairs of positions in `nodes`. */
  edges: Uint32Array;
  /** For each node position, the edge indices that touch it. */
  adj: number[][];
};

export type Def = {
  /** "screen" scatters across the whole viewport; "space" is a 3D
   *  picture placed at the layout anchor. */
  kind: "screen" | "space";
  pts?: Float32Array;
  /** Palette index per point, or NO_COLOR to keep the star's own. */
  colors?: Uint8Array | null;
  rot?: (t: number) => [number, number, number];
  /** Radius, in layout units, of a soft glow at the picture's centre. */
  core?: number;
  net?: Net | null;
  /** Size of the picture's stars relative to their own (1). Type needs
   *  fine grain to stay legible; a galaxy wants the full sparkle. */
  grain?: number;
  /** No diffraction spikes and a gentler twinkle — for pictures that
   *  have to be read, like words and numbers. */
  calm?: boolean;
};

export type Field = {
  setDef: (i: number, def: Def) => void;
  setMorph: (m: number) => void;
  setLayout: (l: Layout) => void;
  pointer: (x: number, y: number) => void;
  frame: (t: number, dt: number) => void;
  resize: () => void;
};

export const NO_COLOR = 255;

const TAU = Math.PI * 2;
/** Camera distance, in layout units. Short enough for real perspective,
 *  long enough that a turning picture does not warp. */
const D = 3.4;

/** Starlight, blue, and ember — the three temperatures in the sky the
 *  page is modelled on. */
const PALETTE = [
  [236, 244, 255],
  [148, 204, 255],
  [255, 172, 122],
] as const;

/** Small, fast, seedable. Pictures are built from it so the same page
 *  draws the same sky on every load. */
export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function sprite(kind: number, rgb: readonly number[]) {
  const S = kind === 2 ? 128 : 64;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const g = c.getContext("2d")!;
  const [r, gg, b] = rgb;
  const mid = S / 2;
  const grad = g.createRadialGradient(mid, mid, 0, mid, mid, mid);
  if (kind === 0) {
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.2, `rgba(${r},${gg},${b},0.9)`);
    grad.addColorStop(0.5, `rgba(${r},${gg},${b},0.18)`);
    grad.addColorStop(1, `rgba(${r},${gg},${b},0)`);
  } else {
    // A hot white core inside a tinted halo: the colour is in the glow,
    // never in the centre, which is how a real point of light photographs.
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.08, "rgba(255,255,255,0.96)");
    grad.addColorStop(0.16, `rgba(${r},${gg},${b},0.72)`);
    grad.addColorStop(0.36, `rgba(${r},${gg},${b},0.16)`);
    grad.addColorStop(1, `rgba(${r},${gg},${b},0)`);
  }
  g.fillStyle = grad;
  g.fillRect(0, 0, S, S);

  if (kind === 2) {
    // Diffraction spikes, the four-pointed cross a lens puts on anything
    // bright enough. Only the few brightest stars carry them.
    const spike = (horizontal: boolean) => {
      const lg = horizontal
        ? g.createLinearGradient(0, mid, S, mid)
        : g.createLinearGradient(mid, 0, mid, S);
      lg.addColorStop(0, `rgba(${r},${gg},${b},0)`);
      lg.addColorStop(0.5, "rgba(255,255,255,0.8)");
      lg.addColorStop(1, `rgba(${r},${gg},${b},0)`);
      g.fillStyle = lg;
      if (horizontal) g.fillRect(0, mid - 1, S, 2);
      else g.fillRect(mid - 1, 0, 2, S);
    };
    spike(true);
    spike(false);
  }
  return c;
}

export function createField(
  canvas: HTMLCanvasElement,
  opts: { count: number; ambient: number; formations: number; reduced: boolean }
): Field {
  const ctx = canvas.getContext("2d")!;
  const { count: N, ambient: A, formations: F, reduced } = opts;
  const K = N - A;
  const r = rng(11);

  // ---- the stars themselves --------------------------------------------
  const cls = new Uint8Array(N);
  const col = new Uint8Array(N);
  const size = new Float32Array(N);
  const alpha = new Float32Array(N);
  const phase = new Float32Array(N);
  const twinkle = new Float32Array(N);
  const delay = new Float32Array(N);
  const arcA = new Float32Array(N);
  const arcR = new Float32Array(N);
  const hx = new Float32Array(N);
  const hy = new Float32Array(N);
  const hz = new Float32Array(N);

  for (let j = 0; j < N; j++) {
    const u = r();
    // Mostly dust, a quarter glowing beads, a few true stars. The
    // ambient field at the back is held to dust and beads: spikes on
    // background stars pull the eye away from the picture.
    cls[j] = u < (j < A ? 0.012 : 0.03) ? 2 : u < 0.27 ? 1 : 0;
    const v = r();
    col[j] = v < 0.62 ? 0 : v < 0.86 ? 1 : 2;
    size[j] =
      cls[j] === 0 ? 2.6 + r() * 2 : cls[j] === 1 ? 9 + r() * 8 : 30 + r() * 18;
    alpha[j] = cls[j] === 0 ? 0.45 + r() * 0.5 : cls[j] === 1 ? 0.7 + r() * 0.3 : 1;
    phase[j] = r() * TAU;
    twinkle[j] = 0.5 + r() * 2.4;
    delay[j] = r() * 0.34;
    arcA[j] = r() * TAU;
    arcR[j] = 28 + r() * 150;
    hx[j] = r() * 2 - 1;
    hy[j] = r() * 2 - 1;
    hz[j] = 0.35 + Math.pow(r(), 1.7) * 1.25;
  }

  const sprites = [0, 1, 2].map((k) => PALETTE.map((c) => sprite(k, c)));

  // ---- per-frame working buffers ---------------------------------------
  const ax = new Float32Array(N);
  const ay = new Float32Array(N);
  const as = new Float32Array(N);
  const bx = new Float32Array(N);
  const by = new Float32Array(N);
  const bs = new Float32Array(N);
  const px = new Float32Array(N);
  const py = new Float32Array(N);
  const ps = new Float32Array(N);

  const defs: (Def | null)[] = new Array(F).fill(null);
  let morph = 0;
  let layout: Layout = { cx: innerWidth / 2, cy: innerHeight / 2, unit: 220 };
  let mx = 0;
  let my = 0;
  let tmx = 0;
  let tmy = 0;
  let W = 1;
  let H = 1;
  let dpr = 1;
  /** Highest canvas resolution allowed. Soft light does not need the
   *  screen's full density, and every pixel is paid for each frame. */
  let dprCap = innerWidth < 700 ? 1.25 : 1.5;
  let drawN = N;
  let ema = 16;
  let slow = 0;
  let inited = false;

  const pulses = Array.from({ length: 46 }, () => ({
    e: -1,
    t: Math.random(),
    sp: 0.35 + Math.random() * 0.55,
    fwd: true,
  }));

  const size_ = () => {
    dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    W = Math.max(1, Math.round(canvas.clientWidth * dpr));
    H = Math.max(1, Math.round(canvas.clientHeight * dpr));
    canvas.width = W;
    canvas.height = H;
  };
  const resize = () => {
    size_();
    inited = false;
  };
  resize();

  /** Drop to a coarser canvas without the stars jumping: their positions
   *  are in canvas pixels, so they are rescaled rather than re-snapped. */
  const lowerResolution = () => {
    const prev = dpr;
    dprCap = Math.max(1, dprCap - 0.25);
    size_();
    const k = dpr / prev;
    for (let j = 0; j < N; j++) {
      px[j] *= k;
      py[j] *= k;
    }
  };

  // ---- projection ------------------------------------------------------
  const project = (
    def: Def | null,
    t: number,
    ox: Float32Array,
    oy: Float32Array,
    os: Float32Array
  ) => {
    const pmx = mx * 16 * dpr;
    const pmy = my * 11 * dpr;

    // The scattered field. Ambient stars live here in every picture;
    // the rest live here only while the picture is the scatter.
    const all = !def || def.kind === "screen" || !def.pts;
    const upto = all ? N : A;
    for (let j = 0; j < upto; j++) {
      const drift = reduced ? 0 : Math.sin(t * 0.045 * hz[j] + phase[j]) * 0.014;
      ox[j] = W * 0.5 + (hx[j] + drift) * W * 0.54 + pmx * hz[j];
      oy[j] = H * 0.5 + (hy[j] + drift * 0.6) * H * 0.54 + pmy * hz[j];
      os[j] = hz[j] * 0.78;
    }
    if (all) return;

    const [yaw, pitch, roll] = def.rot ? def.rot(reduced ? 0 : t) : [0, 0, 0];
    const cyw = Math.cos(yaw);
    const syw = Math.sin(yaw);
    const cp = Math.cos(pitch);
    const sp = Math.sin(pitch);
    const cr = Math.cos(roll);
    const sr = Math.sin(roll);
    const U = layout.unit * dpr;
    const CX = layout.cx * dpr + pmx * 0.35;
    const CY = layout.cy * dpr + pmy * 0.35;
    const pts = def.pts!;

    for (let k = 0; k < K; k++) {
      const x = pts[k * 3];
      const y = pts[k * 3 + 1];
      const z = pts[k * 3 + 2];
      const x1 = x * cyw + z * syw;
      const z1 = -x * syw + z * cyw;
      const y1 = y * cp - z1 * sp;
      const z2 = y * sp + z1 * cp;
      const x2 = x1 * cr - y1 * sr;
      const y2 = x1 * sr + y1 * cr;
      const pr = D / (D - z2);
      const j = A + k;
      ox[j] = CX + x2 * U * pr;
      oy[j] = CY - y2 * U * pr;
      os[j] = pr;
    }
  };

  // ---- overlays: the glow at a spiral's heart, and the brain's wiring ---
  const overlays = (dt: number, m: number) => {
    const U = layout.unit * dpr;
    for (let i = 0; i < F; i++) {
      const def = defs[i];
      if (!def) continue;
      const w = 1 - Math.abs(m - i) * 1.8;
      if (w <= 0) continue;

      if (def.core) {
        const R = def.core * U;
        const g = ctx.createRadialGradient(
          layout.cx * dpr,
          layout.cy * dpr,
          0,
          layout.cx * dpr,
          layout.cy * dpr,
          R
        );
        g.addColorStop(0, `rgba(255, 244, 232, ${0.42 * w})`);
        g.addColorStop(0.3, `rgba(255, 214, 186, ${0.16 * w})`);
        g.addColorStop(1, "rgba(255, 200, 170, 0)");
        ctx.globalAlpha = 1;
        ctx.fillStyle = g;
        ctx.fillRect(layout.cx * dpr - R, layout.cy * dpr - R, R * 2, R * 2);
      }

      const net = def.net;
      if (net && inited) {
        // Connections: one path, one stroke — a few hundred segments cost
        // the same as one this way.
        ctx.globalAlpha = 1;
        ctx.strokeStyle = `rgba(150, 204, 255, ${0.12 * w})`;
        ctx.lineWidth = Math.max(1, 0.8 * dpr);
        ctx.beginPath();
        for (let e = 0; e < net.edges.length; e += 2) {
          const a = A + net.nodes[net.edges[e]];
          const b = A + net.nodes[net.edges[e + 1]];
          ctx.moveTo(px[a], py[a]);
          ctx.lineTo(px[b], py[b]);
        }
        ctx.stroke();

        // Neurons, lit.
        const ns = 12 * dpr;
        ctx.globalAlpha = 0.55 * w;
        for (let n = 0; n < net.nodes.length; n++) {
          const j = A + net.nodes[n];
          ctx.drawImage(sprites[1][1], px[j] - ns / 2, py[j] - ns / 2, ns, ns);
        }

        // Signals. Each one runs along an edge and, on arrival, picks an
        // edge leaving the node it reached — so data keeps travelling
        // through the network rather than blinking on and off.
        const edgeCount = net.edges.length / 2;
        for (const p of pulses) {
          if (p.e < 0 || p.e >= edgeCount) {
            p.e = (Math.random() * edgeCount) | 0;
            p.t = Math.random();
          }
          if (!reduced) p.t += (dt / 1000) * p.sp;
          if (p.t >= 1) {
            const end = p.fwd ? net.edges[p.e * 2 + 1] : net.edges[p.e * 2];
            const out = net.adj[end];
            const next = out[(Math.random() * out.length) | 0];
            p.fwd = net.edges[next * 2] === end;
            p.e = next;
            p.t = 0;
          }
          const s0 = net.edges[p.e * 2];
          const s1 = net.edges[p.e * 2 + 1];
          const from = A + net.nodes[p.fwd ? s0 : s1];
          const to = A + net.nodes[p.fwd ? s1 : s0];
          for (let k = 0; k < 3; k++) {
            const tt = p.t - k * 0.07;
            if (tt < 0) break;
            const x = px[from] + (px[to] - px[from]) * tt;
            const y = py[from] + (py[to] - py[from]) * tt;
            const s = (16 - k * 4) * dpr;
            ctx.globalAlpha = w * (1 - k * 0.34);
            ctx.drawImage(sprites[1][2], x - s / 2, y - s / 2, s, s);
          }
        }
      }
    }
  };

  // ---- the frame ------------------------------------------------------
  const frame = (t: number, dt: number) => {
    mx += (tmx - mx) * 0.05;
    my += (tmy - my) * 0.05;

    const m = Math.max(0, Math.min(F - 1, morph));
    const i0 = Math.floor(m);
    const i1 = Math.min(F - 1, i0 + 1);
    const f = m - i0;
    const pair = f > 0.0005 && i1 !== i0;

    project(defs[i0], t, ax, ay, as);
    if (pair) project(defs[i1], t, bx, by, bs);

    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";

    overlays(dt, m);

    const follow = inited ? 1 - Math.pow(0.88, dt / 16.67) : 1;
    const intro = reduced ? 1 : Math.min(1, t / 1.8);
    const d0 = defs[i0];
    const d1 = defs[i1];
    // How the two pictures want their stars drawn. A star in flight
    // between them blends from one to the other as it travels.
    const g0 = d0?.grain ?? 1;
    const g1 = pair ? (d1?.grain ?? 1) : g0;
    const c0 = d0?.calm ? 1 : 0;
    const c1 = pair ? (d1?.calm ? 1 : 0) : c0;

    for (let j = 0; j < drawN; j++) {
      let x = ax[j];
      let y = ay[j];
      let s = as[j];
      let e = 0;

      if (pair) {
        e = f;
        if (!reduced) {
          e = (f - delay[j]) / 0.66;
          e = e < 0 ? 0 : e > 1 ? 1 : e;
          e = e * e * (3 - 2 * e);
        }
        x += (bx[j] - x) * e;
        y += (by[j] - y) * e;
        s += (bs[j] - s) * e;
        if (!reduced && j >= A && e > 0 && e < 1) {
          const lift = Math.sin(Math.PI * e) * arcR[j] * dpr;
          x += Math.cos(arcA[j]) * lift;
          y += Math.sin(arcA[j]) * lift;
        }
      }

      px[j] += (x - px[j]) * follow;
      py[j] += (y - py[j]) * follow;
      ps[j] += (s - ps[j]) * follow;

      let base = size[j];
      let kind = cls[j];
      let calm = 0;
      if (j >= A) {
        // In a calm picture a spiked star is drawn as a plain bead, and
        // every star at the picture's grain.
        const b0 = c0 && kind === 2 ? 14 : base;
        const b1 = c1 && kind === 2 ? 14 : base;
        base = (b0 + (b1 - b0) * e) * (g0 + (g1 - g0) * e);
        calm = c0 + (c1 - c0) * e;
        if (kind === 2 && calm > 0.5) kind = 1;
      }

      const sz = base * ps[j] * dpr;
      const X = px[j];
      const Y = py[j];
      if (X < -sz || Y < -sz || X > W + sz || Y > H + sz) continue;

      const dd = e > 0.5 ? d1 : d0;
      let c = col[j];
      if (j >= A && dd && dd.colors) {
        const o = dd.colors[j - A];
        if (o !== NO_COLOR) c = o;
      }

      // Twinkle is life in open sky and noise inside a letter.
      const amp = 0.32 * (1 - 0.62 * calm);
      const tw = reduced ? 1 : 1 - amp + amp * Math.sin(t * twinkle[j] + phase[j]);
      const depth = Math.min(1, 0.4 + 0.6 * ps[j]);
      // Finer stars in a calm picture burn a little brighter, so a letter
      // stays as luminous as the sky around it.
      let a = alpha[j] * tw * depth * intro * (1 + 0.4 * calm);
      // Background stars step back once there is a picture to look at.
      if (j < A && m > 0.4) a *= 0.55;
      if (a < 0.015) continue;
      ctx.globalAlpha = a > 1 ? 1 : a;
      ctx.drawImage(sprites[kind][c], X - sz / 2, Y - sz / 2, sz, sz);
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    inited = true;

    // A machine that cannot hold frame rate first gets a coarser canvas —
    // soft light hides it — and only then fewer stars. The tail of the
    // list is formation stars in random order, so thinning it thins every
    // picture evenly instead of deleting part of one.
    ema = ema * 0.95 + dt * 0.05;
    if (ema > 24 && ++slow > 90) {
      if (dpr > 1) lowerResolution();
      else if (drawN > 700) drawN = Math.max(700, Math.floor(drawN * 0.85));
      slow = 0;
      ema = 16;
    }
  };

  return {
    setDef(i, def) {
      defs[i] = def;
    },
    setMorph(v) {
      morph = v;
    },
    setLayout(l) {
      layout = l;
    },
    pointer(x, y) {
      tmx = x;
      tmy = y;
    },
    frame,
    resize,
  };
}

import { useEffect, useRef } from "react";

/* ====================================================================
   IntroNet — the loading animation's neural network.

   A small 3D feed-forward net assembles itself: nodes fly in from depth
   and settle into layers, edges draw between them, then signal pulses
   run forward through the network. Rendered with a perspective
   projection so it reads as a volume, not a flat diagram.

   `progress` (0..1) is driven by the intro timeline so the assembly
   stays in sync with the wordmark and the cover lift.
   ==================================================================== */

const LAYERS = [3, 5, 5, 3];
const LAYER_Z = [-0.9, -0.3, 0.3, 0.9]; // depth per layer, in world units
const FOV = 2.6;
const CAM_Z = 3.4;
const ACCENT = "5, 150, 105";
const ACCENT_HI = "16, 185, 129";

type N = {
  layer: number;
  // target position in world space
  tx: number;
  ty: number;
  tz: number;
  // start position (scattered in depth)
  ox: number;
  oy: number;
  oz: number;
  seed: number;
};

type E = { a: number; b: number; seed: number };

const smooth = (a: number, b: number, t: number) => {
  const x = Math.min(Math.max((t - a) / (b - a), 0), 1);
  return x * x * (3 - 2 * x);
};

export default function IntroNet({
  progressRef,
}: {
  progressRef: { current: number };
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let disposed = false;
    let raf = 0;
    let W = 0;
    let H = 0;

    const nodes: N[] = [];
    const byLayer: number[][] = [];
    LAYERS.forEach((count, l) => {
      byLayer[l] = [];
      for (let i = 0; i < count; i++) {
        const spread = 1.05;
        const ty = ((i + 0.5) / count - 0.5) * 2 * spread;
        const a = Math.random() * Math.PI * 2;
        const r = 2.2 + Math.random() * 1.6;
        byLayer[l].push(nodes.length);
        nodes.push({
          layer: l,
          tx: (LAYER_Z[l] * 1.15),
          ty,
          tz: LAYER_Z[l] * 0.35,
          ox: Math.cos(a) * r,
          oy: Math.sin(a) * r,
          oz: -2.5 - Math.random() * 2,
          seed: Math.random() * Math.PI * 2,
        });
      }
    });

    const edges: E[] = [];
    for (let l = 0; l < LAYERS.length - 1; l++) {
      for (const a of byLayer[l]) {
        for (const b of byLayer[l + 1]) {
          edges.push({ a, b, seed: Math.random() });
        }
      }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    type P = { x: number; y: number; s: number };
    const project = (x: number, y: number, z: number): P => {
      const d = CAM_Z - z;
      const s = FOV / Math.max(d, 0.35);
      const unit = Math.min(W, H) * 0.34;
      return { x: W / 2 + x * s * unit, y: H / 2 + y * s * unit, s };
    };

    const draw = (t: number) => {
      if (disposed) return;
      const time = t / 1000;
      const p = reduced ? 1 : Math.min(Math.max(progressRef.current, 0), 1);

      ctx.clearRect(0, 0, W, H);

      // gentle rotation so the volume reads as 3D
      const yaw = reduced ? 0.25 : 0.25 + Math.sin(time * 0.35) * 0.22;
      const cos = Math.cos(yaw);
      const sin = Math.sin(yaw);

      const pos: Array<P & { z: number; on: number }> = nodes.map((n, i) => {
        // per-node arrival, staggered by layer then index
        const order = (n.layer * 0.22 + (i % 5) * 0.03) / 1.3;
        const on = smooth(order, order + 0.42, p);
        const wob = reduced ? 0 : Math.sin(time * 0.9 + n.seed) * 0.02;
        const x = n.ox + (n.tx - n.ox) * on;
        const y = n.oy + (n.ty + wob - n.oy) * on;
        const z = n.oz + (n.tz - n.oz) * on;
        // rotate around Y
        const rx = x * cos - z * sin;
        const rz = x * sin + z * cos;
        const pr = project(rx, y, rz);
        return { ...pr, z: rz, on };
      });

      // edges
      const eAlpha = smooth(0.32, 0.72, p);
      if (eAlpha > 0.01) {
        for (const e of edges) {
          const a = pos[e.a];
          const b = pos[e.b];
          const grow = smooth(0.32 + e.seed * 0.25, 0.8 + e.seed * 0.18, p);
          if (grow < 0.02) continue;
          const ex = a.x + (b.x - a.x) * grow;
          const ey = a.y + (b.y - a.y) * grow;
          const depth = (a.s + b.s) / 2;
          ctx.strokeStyle = `rgba(${ACCENT}, ${(eAlpha * 0.3 * depth).toFixed(3)})`;
          ctx.lineWidth = 0.9 * depth;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(ex, ey);
          ctx.stroke();
        }
      }

      // forward pulses once the net is wired
      const pAlpha = smooth(0.62, 0.9, p);
      if (pAlpha > 0.01 && !reduced) {
        for (const e of edges) {
          const a = pos[e.a];
          const b = pos[e.b];
          const tt = (time * 0.7 + e.seed) % 1;
          const fade = Math.sin(Math.PI * tt);
          if (fade < 0.08) continue;
          const x = a.x + (b.x - a.x) * tt;
          const y = a.y + (b.y - a.y) * tt;
          const depth = (a.s + b.s) / 2;
          const al = pAlpha * fade * depth;
          ctx.fillStyle = `rgba(${ACCENT_HI}, ${(al * 0.4).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, 3.4 * depth, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(${ACCENT_HI}, ${Math.min(al, 0.95).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.3 * depth, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // nodes, painted far-to-near so nearer ones overlap correctly
      const order = pos.map((_, i) => i).sort((i, j) => pos[i].z - pos[j].z);
      for (const i of order) {
        const q = pos[i];
        if (q.on < 0.02) continue;
        const r = 3.4 * q.s;
        const bright = 0.45 + 0.5 * q.s;
        ctx.fillStyle = `rgba(${ACCENT}, ${(bright * 0.2 * q.on).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(q.x, q.y, r * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${ACCENT}, ${Math.min(bright, 0.95).toFixed(3) })`;
        ctx.globalAlpha = q.on;
        ctx.beginPath();
        ctx.arc(q.x, q.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    raf = requestAnimationFrame(draw);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [progressRef]);

  return <canvas ref={canvasRef} className="intro__net" aria-hidden="true" />;
}

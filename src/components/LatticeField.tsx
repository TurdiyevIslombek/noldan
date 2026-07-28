import { useEffect, useRef } from "react";
import "./LatticeField.css";

/* ====================================================================
   LatticeField — a 3D neural network.

   Nodes live in real 3D space and are projected through a perspective
   camera, so the network reads as a volume you are looking into rather
   than a flat diagram. The whole structure rotates slowly; near nodes
   are larger, brighter and crisper, far ones shrink and haze out.

   Three layers of content, all depth-sorted together so they interleave
   correctly:
     · motes   — free-floating atmosphere particles
     · edges   — synapses between adjacent layers
     · nodes   — the neurons themselves, with halo + core + specular

   Page scroll drives `form`: at the top the neurons are scattered
   through the volume, by the bottom they have settled into clean layers
   and signal pulses run forward through the net.

   Canvas 2D (no WebGL dependency), DPR-aware, pauses when the tab is
   hidden, honours reduced motion, and disposes cleanly under StrictMode.
   ==================================================================== */

const LAYERS = [5, 8, 10, 8, 5, 3];
const LAYER_X = [-1.55, -0.93, -0.31, 0.31, 0.93, 1.55]; // world X per layer
const LINKS_PER_NODE = 3;
const MOTES = 90;

const CAM_Z = 3.9; // camera distance from origin
const FOV = 2.35;
const EASE = 0.045; // node approach to target
const FORM_EASE = 0.055; // smoothing of scroll-derived formation
const YAW_SPEED = 0.055; // radians/sec of ambient rotation
const YAW_AMPL = 0.34;
const PITCH_AMPL = 0.1;
const PARALLAX = 0.16; // pointer influence on camera angle, radians

const ACCENT = "5, 150, 105";
const ACCENT_HI = "16, 185, 129";

type Node = {
  layer: number;
  // settled target
  tx: number;
  ty: number;
  tz: number;
  // scattered origin
  ox: number;
  oy: number;
  oz: number;
  // current
  x: number;
  y: number;
  z: number;
  r: number;
  seed: number;
  hub: boolean;
};

type Edge = { a: number; b: number; seed: number; speed: number };
type Mote = { x: number; y: number; z: number; r: number; seed: number; speed: number };

type Drawable = {
  depth: number; // camera-space z, for sorting (larger = nearer)
  paint: () => void;
};

const smooth = (a: number, b: number, t: number) => {
  const x = Math.min(Math.max((t - a) / (b - a), 0), 1);
  return x * x * (3 - 2 * x);
};

export default function LatticeField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    let disposed = false;
    let raf = 0;
    let running = false;
    let W = 0;
    let H = 0;
    let form = reduced ? 1 : 0;
    let last = 0;

    /* ---- build the network ---------------------------------------- */
    const nodes: Node[] = [];
    const byLayer: number[][] = [];
    LAYERS.forEach((count, l) => {
      byLayer[l] = [];
      for (let i = 0; i < count; i++) {
        // Arrange each layer as a ring-ish slab in Y/Z so the net has
        // genuine volume instead of being a flat sheet of dots.
        const t = (i + 0.5) / count;
        const ty = (t - 0.5) * 2 * 1.15;
        const tz = Math.sin(t * Math.PI * 2 + l * 0.7) * 0.42;
        const a = Math.random() * Math.PI * 2;
        const rad = 1.6 + Math.random() * 1.5;
        byLayer[l].push(nodes.length);
        nodes.push({
          layer: l,
          tx: LAYER_X[l],
          ty,
          tz,
          ox: Math.cos(a) * rad,
          oy: (Math.random() - 0.5) * 3,
          oz: Math.sin(a) * rad,
          x: Math.cos(a) * rad,
          y: (Math.random() - 0.5) * 3,
          z: Math.sin(a) * rad,
          r: 3.2 + Math.random() * 2.4,
          seed: Math.random() * Math.PI * 2,
          hub: false,
        });
      }
    });

    const edges: Edge[] = [];
    for (let l = 0; l < LAYERS.length - 1; l++) {
      for (const ai of byLayer[l]) {
        const next = [...byLayer[l + 1]].sort(
          (p, q) => Math.abs(nodes[p].ty - nodes[ai].ty) - Math.abs(nodes[q].ty - nodes[ai].ty)
        );
        for (let n = 0; n < Math.min(LINKS_PER_NODE, next.length); n++) {
          nodes[next[n]].hub = true;
          edges.push({
            a: ai,
            b: next[n],
            seed: Math.random(),
            speed: 0.22 + Math.random() * 0.3,
          });
        }
      }
    }

    const motes: Mote[] = Array.from({ length: MOTES }, () => ({
      x: (Math.random() - 0.5) * 6,
      y: (Math.random() - 0.5) * 4,
      z: (Math.random() - 0.5) * 4.5,
      r: 0.7 + Math.random() * 1.5,
      seed: Math.random() * Math.PI * 2,
      speed: 0.08 + Math.random() * 0.18,
    }));

    const pointer = { x: 0, y: 0, cx: 0, cy: 0 };

    const resize = () => {
      W = Math.max(1, window.innerWidth);
      H = Math.max(1, window.innerHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const pageProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max <= 0 ? 0 : Math.min(Math.max(window.scrollY / max, 0), 1);
    };

    /* ---- render ---------------------------------------------------- */
    const draw = (t: number) => {
      if (disposed) return;
      const time = t / 1000;
      const dt = last ? Math.min((t - last) / 1000, 1 / 20) : 1 / 60;
      last = t;

      const target = reduced ? 1 : smooth(0.02, 0.9, pageProgress());
      form += (target - form) * (reduced ? 1 : FORM_EASE);
      const f = form;

      pointer.cx += (pointer.x - pointer.cx) * 0.05;
      pointer.cy += (pointer.y - pointer.cy) * 0.05;

      ctx.clearRect(0, 0, W, H);

      // camera orientation: ambient sway + a little pointer parallax
      const yaw = (reduced ? 0.3 : 0.3 + Math.sin(time * YAW_SPEED) * YAW_AMPL) +
        pointer.cx * PARALLAX;
      const pitch = (reduced ? 0 : Math.sin(time * YAW_SPEED * 0.8) * PITCH_AMPL) +
        pointer.cy * PARALLAX * 0.6;
      const cy = Math.cos(yaw);
      const sy = Math.sin(yaw);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);

      const unit = Math.min(W, H) * 0.42;
      // The text column occupies the left, so bias the volume right.
      const originX = W * 0.62;
      const originY = H * 0.5;

      type P = { x: number; y: number; s: number; d: number };
      const project = (x: number, y: number, z: number): P => {
        // rotate Y then X
        const rx = x * cy - z * sy;
        let rz = x * sy + z * cy;
        const ry = y * cp - rz * sp;
        rz = y * sp + rz * cp;
        const d = CAM_Z - rz;
        const s = FOV / Math.max(d, 0.4);
        return { x: originX + rx * s * unit, y: originY + ry * s * unit, s, d: rz };
      };

      // advance node positions toward their settled targets
      const wob = reduced ? 0 : (1 - f) * 0.22 + 0.03;
      for (const n of nodes) {
        const dx = Math.cos(time * 0.5 + n.seed) * wob * 0.35;
        const dy = Math.sin(time * 0.45 + n.seed * 1.3) * wob * 0.35;
        const dz = Math.cos(time * 0.4 + n.seed * 0.7) * wob * 0.35;
        const gx = n.ox + (n.tx - n.ox) * f + dx;
        const gy = n.oy + (n.ty - n.oy) * f + dy;
        const gz = n.oz + (n.tz - n.oz) * f + dz;
        const k = reduced ? 1 : 1 - Math.exp(-EASE * 60 * dt);
        n.x += (gx - n.x) * k;
        n.y += (gy - n.y) * k;
        n.z += (gz - n.z) * k;
      }

      const proj = nodes.map((n) => project(n.x, n.y, n.z));
      const queue: Drawable[] = [];

      /* motes — atmosphere */
      for (const m of motes) {
        const my = m.y + (reduced ? 0 : Math.sin(time * m.speed + m.seed) * 0.3);
        const mx = m.x + (reduced ? 0 : Math.cos(time * m.speed * 0.8 + m.seed) * 0.3);
        const q = project(mx, my, m.z);
        if (q.s <= 0) continue;
        const alpha = Math.min(0.42, 0.1 + q.s * 0.16);
        queue.push({
          depth: q.d,
          paint: () => {
            ctx.fillStyle = `rgba(${ACCENT}, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(q.x, q.y, m.r * q.s, 0, Math.PI * 2);
            ctx.fill();
          },
        });
      }

      /* edges */
      const eAlpha = smooth(0.2, 0.75, f);
      if (eAlpha > 0.01) {
        for (const e of edges) {
          const a = proj[e.a];
          const b = proj[e.b];
          const depth = (a.d + b.d) / 2;
          const s = (a.s + b.s) / 2;
          queue.push({
            depth: depth - 0.001, // just behind the nodes at the same depth
            paint: () => {
              ctx.strokeStyle = `rgba(${ACCENT}, ${(eAlpha * 0.24 * s).toFixed(3)})`;
              ctx.lineWidth = Math.max(0.5, 0.85 * s);
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            },
          });
        }
      }

      /* pulses — data moving forward through the net */
      const pAlpha = smooth(0.42, 0.82, f);
      if (pAlpha > 0.01 && !reduced) {
        for (const e of edges) {
          const tt = (time * e.speed + e.seed) % 1;
          const fade = Math.sin(Math.PI * tt);
          if (fade < 0.06) continue;
          const na = nodes[e.a];
          const nb = nodes[e.b];
          const q = project(
            na.x + (nb.x - na.x) * tt,
            na.y + (nb.y - na.y) * tt,
            na.z + (nb.z - na.z) * tt
          );
          const al = pAlpha * fade;
          queue.push({
            depth: q.d,
            paint: () => {
              const g = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, 7 * q.s);
              g.addColorStop(0, `rgba(${ACCENT_HI}, ${(al * 0.55).toFixed(3)})`);
              g.addColorStop(1, `rgba(${ACCENT_HI}, 0)`);
              ctx.fillStyle = g;
              ctx.beginPath();
              ctx.arc(q.x, q.y, 7 * q.s, 0, Math.PI * 2);
              ctx.fill();
              ctx.fillStyle = `rgba(${ACCENT_HI}, ${Math.min(al * 0.95, 0.95).toFixed(3)})`;
              ctx.beginPath();
              ctx.arc(q.x, q.y, 1.5 * q.s, 0, Math.PI * 2);
              ctx.fill();
            },
          });
        }
      }

      /* nodes */
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const q = proj[i];
        if (q.s <= 0) continue;
        const r = n.r * q.s * (n.hub ? 1.15 : 0.92) * (0.78 + 0.3 * f);
        const bright = Math.min(0.9, (0.24 + 0.4 * f) * (0.55 + 0.75 * q.s));
        queue.push({
          depth: q.d,
          paint: () => {
            // soft halo
            const g = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, r * 3.4);
            g.addColorStop(0, `rgba(${ACCENT}, ${(bright * 0.3).toFixed(3)})`);
            g.addColorStop(1, `rgba(${ACCENT}, 0)`);
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(q.x, q.y, r * 3.4, 0, Math.PI * 2);
            ctx.fill();
            // core
            ctx.fillStyle = `rgba(${ACCENT}, ${bright.toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(q.x, q.y, r, 0, Math.PI * 2);
            ctx.fill();
            // specular highlight sells the sphere
            if (q.s > 0.62) {
              ctx.fillStyle = `rgba(255, 255, 255, ${(0.4 * (q.s - 0.5)).toFixed(3)})`;
              ctx.beginPath();
              ctx.arc(q.x - r * 0.3, q.y - r * 0.32, r * 0.34, 0, Math.PI * 2);
              ctx.fill();
            }
          },
        });
      }

      // far to near
      queue.sort((a, b) => a.depth - b.depth);
      for (const d of queue) d.paint();

      if (reduced) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running || disposed) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    if (fine && !reduced) {
      window.addEventListener("pointermove", onPointer, { passive: true });
    }
    resize();

    if (reduced) {
      for (const n of nodes) {
        n.x = n.tx;
        n.y = n.ty;
        n.z = n.tz;
      }
      draw(0);
    } else {
      start();
    }

    return () => {
      disposed = true;
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (fine && !reduced) window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="lattice" aria-hidden="true" />;
}

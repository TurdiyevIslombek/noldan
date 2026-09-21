import { useEffect, useMemo, useRef, useState } from "react";
import { drawScene } from "./raster";

/* ====================================================================
   A working 3x3 convolution.

   The tokenizer proves the language claim: a model never sees words,
   it sees numbers. This proves the same claim for vision, and it does
   it the only honest way, by actually running the kernel over actual
   pixels in the visitor's browser. Hovering the source reads out the
   real value under the cursor, so the grid-of-numbers is not a
   metaphor anyone has to take on faith.
   ==================================================================== */

const SIZE = 176;

type Kernel = {
  id: string;
  name: string;
  k: number[];
  /** Edge kernels sum to zero, so they are shown as magnitude on paper
   *  rather than as mid grey. */
  edge?: boolean;
  note: string;
};

const KERNELS: Kernel[] = [
  {
    id: "identity",
    name: "Aynan",
    k: [0, 0, 0, 0, 1, 0, 0, 0, 0],
    note: "Markazdagi bitta 1. Rasm oʻzgarmaydi, chunki har bir piksel oʻzicha qoladi.",
  },
  {
    id: "blur",
    name: "Xiralashtirish",
    k: [1, 1, 1, 1, 1, 1, 1, 1, 1],
    note: "Toʻqqizta qoʻshni pikselning oʻrtachasi. Mayda detal yoʻqoladi, shovqin ham.",
  },
  {
    id: "sharpen",
    name: "Oʻtkirlashtirish",
    k: [0, -1, 0, -1, 5, -1, 0, -1, 0],
    note: "Markazni kuchaytirib, qoʻshnilarni ayiradi. Chegaralar aniqroq koʻrinadi.",
  },
  {
    id: "sobelx",
    name: "Sobel X",
    k: [1, 0, -1, 2, 0, -2, 1, 0, -1],
    edge: true,
    note: "Chapdagi va oʻngdagi farq. Faqat vertikal chegaralar qoladi.",
  },
  {
    id: "sobely",
    name: "Sobel Y",
    k: [1, 2, 1, 0, 0, 0, -1, -2, -1],
    edge: true,
    note: "Yuqori va quyi farq. Faqat gorizontal chegaralar qoladi.",
  },
  {
    id: "laplace",
    name: "Laplas",
    k: [-1, -1, -1, -1, 8, -1, -1, -1, -1],
    edge: true,
    note: "Har tomonga farq. Konvolyutsion tarmoqning birinchi qatlami shunga oʻxshash filtrlarni oʻzi topadi.",
  },
];

function convolve(src: ImageData, k: number[], edge: boolean): ImageData {
  const { width: w, height: h, data } = src;
  const out = new ImageData(w, h);
  let div = k.reduce((a, b) => a + b, 0);
  if (div === 0) div = 1;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let r = 0;
      let g = 0;
      let b = 0;
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          // Clamp at the border rather than wrapping, so the frame does
          // not invent an edge that is not in the picture.
          const sx = Math.min(w - 1, Math.max(0, x + kx));
          const sy = Math.min(h - 1, Math.max(0, y + ky));
          const i = (sy * w + sx) * 4;
          const wgt = k[(ky + 1) * 3 + (kx + 1)];
          r += data[i] * wgt;
          g += data[i + 1] * wgt;
          b += data[i + 2] * wgt;
        }
      }
      const o = (y * w + x) * 4;
      if (edge) {
        // Magnitude, drawn as ink on paper so it sits in the palette.
        const m = Math.min(255, Math.abs(r + g + b) / 3);
        out.data[o] = out.data[o + 1] = out.data[o + 2] = 255 - m;
      } else {
        out.data[o] = Math.min(255, Math.max(0, r / div));
        out.data[o + 1] = Math.min(255, Math.max(0, g / div));
        out.data[o + 2] = Math.min(255, Math.max(0, b / div));
      }
      out.data[o + 3] = 255;
    }
  }
  return out;
}

export default function ConvLab() {
  const srcRef = useRef<HTMLCanvasElement | null>(null);
  const outRef = useRef<HTMLCanvasElement | null>(null);
  const [kid, setKid] = useState(KERNELS[3].id);
  const [probe, setProbe] = useState<{ x: number; y: number; v: number } | null>(
    null
  );
  const kernel = useMemo(() => KERNELS.find((k) => k.id === kid)!, [kid]);

  useEffect(() => {
    const src = srcRef.current;
    const out = outRef.current;
    if (!src || !out) return;
    const sctx = src.getContext("2d", { willReadFrequently: true });
    const octx = out.getContext("2d");
    if (!sctx || !octx) return;

    drawScene(sctx, SIZE, SIZE);
    const data = sctx.getImageData(0, 0, SIZE, SIZE);
    octx.putImageData(convolve(data, kernel.k, !!kernel.edge), 0, 0);
  }, [kernel]);

  const onProbe = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = srcRef.current;
    const ctx = c?.getContext("2d", { willReadFrequently: true });
    if (!c || !ctx) return;
    const r = c.getBoundingClientRect();
    const x = Math.floor(((e.clientX - r.left) / r.width) * SIZE);
    const y = Math.floor(((e.clientY - r.top) / r.height) * SIZE);
    if (x < 0 || y < 0 || x >= SIZE || y >= SIZE) return;
    const p = ctx.getImageData(x, y, 1, 1).data;
    setProbe({ x, y, v: Math.round((p[0] + p[1] + p[2]) / 3) });
  };

  return (
    <div className="cv-lab">
      <div className="cv-lab__bar">
        <span>Konvolyutsiya</span>
        <span>3 × 3 yadro</span>
      </div>

      <div className="cv-lab__pair">
        <figure>
          <canvas
            ref={srcRef}
            width={SIZE}
            height={SIZE}
            onPointerMove={onProbe}
            onPointerLeave={() => setProbe(null)}
            aria-label="Kirish tasviri"
          />
          <figcaption>
            Kirish
            <b>
              {probe
                ? `x ${probe.x} · y ${probe.y} · ${probe.v}`
                : `${SIZE} × ${SIZE} piksel`}
            </b>
          </figcaption>
        </figure>

        <div className="cv-lab__k" aria-hidden="true">
          {kernel.k.map((v, i) => (
            <span key={i} data-zero={v === 0 || undefined} data-neg={v < 0 || undefined}>
              {v}
            </span>
          ))}
        </div>

        <figure>
          <canvas ref={outRef} width={SIZE} height={SIZE} aria-label="Chiqish tasviri" />
          <figcaption>
            Chiqish
            <b>{kernel.name}</b>
          </figcaption>
        </figure>
      </div>

      <div className="cv-lab__pick" role="group" aria-label="Yadro tanlang">
        {KERNELS.map((k) => (
          <button
            key={k.id}
            type="button"
            onClick={() => setKid(k.id)}
            aria-pressed={k.id === kid}
          >
            {k.name}
          </button>
        ))}
      </div>

      <p className="cv-lab__note">{kernel.note}</p>
    </div>
  );
}

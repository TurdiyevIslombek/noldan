import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "@fontsource-variable/geist";
import "@fontsource-variable/martian-mono";
import { DEMO_CORPUS, PROBE, encode, trainBPE, type BpeModel } from "../lib/bpe";
import { ARTIFACTS, DEMO_VOCAB, FACTS, FIT, HF_USER } from "./content";
import { scrollToY } from "../components/SmoothScroll";
import ConvLab from "./ConvLab";
import { createDaylight, type DaylightScene } from "./scene";
import "./home.css";

/* ====================================================================
   V8 — «Kunduz». Daylight.

   V6's five-destination point cloud rebuilt as ink on paper, wearing
   V4's instrument palette and V4's density, with V7's drag. Light is
   the deliberate choice: a teaching page should read like a lab bench
   in daylight, and every other AI project in the room will be dark.
   ==================================================================== */

const STAGES = [
  {
    n: "00",
    tag: "Shovqin",
    h: "Hammasi tuzilishsiz oqimdan boshlanadi",
    p: "Matn, model uchun, hali hech narsani anglatmaydigan sonlar ketma-ketligi. Kurs shu nuqtadan boshlanadi: hech narsa tayyor olinmaydi.",
  },
  {
    n: "01",
    tag: "Baytlar",
    h: "256 ta qiymat, butun bazaviy lugʻat",
    p: "Bayt darajasidagi BPE da lugʻatdan tashqarida qolgan belgi tushunchasi yoʻq. Oʻzbekcha, inglizcha va emoji bir xil yoʻldan keladi. «oʻ» bitta harf, ikkita bayt.",
  },
  {
    n: "02",
    tag: "Tokenlar",
    h: "Takrorlanadigan juftlik birlashadi",
    p: "Har bir yonma-yon juftlikni sanang, eng koʻp uchraganini yangi belgiga birlashtiring, bir necha ming marta takrorlang. Baytlar tortilib tokenlarga aylanadi.",
  },
  {
    n: "03",
    tag: "Diqqat",
    h: "Har bir pozitsiya faqat orqaga qaraydi",
    p: "Kauzal maska quyi uchburchak shaklida. Diagonalga yaqin ogʻirliklar baland, uzoqlashgani sari pasayadi. Kontekst uzunligi shuning uchun qimmatga tushadi.",
  },
  {
    n: "04",
    tag: "Piksellar",
    h: "Rasm ham xuddi shunday toʻr",
    p: "Koʻrish modeli surat koʻrmaydi. U har bir katakda bitta son koʻradi. Bu yerdagi har bir belgi shu sonning ogʻirligi: qoramtir joyda zichroq, yorugʻ joyda deyarli boʻsh.",
  },
  {
    n: "05",
    tag: "Chekkalar",
    h: "Bitta 3 × 3 yadro nimani qoldiradi",
    p: "Sobel filtri toʻr boʻylab suriladi va faqat qoʻshnilari bilan keskin farq qiladigan kataklar qoladi. Konvolyutsion tarmoqning birinchi qatlami shuni oʻzi topadi.",
  },
  {
    n: "06",
    tag: "Model",
    h: "Yakunda sizniki boʻlgan vaznlar qoladi",
    p: "API chaqiruvlariga toʻla daftar emas. Oʻzingizga tegishli tokenizator va oʻqitilgan parametrlar internetsiz ishlaydi, istagan odam yuklab oladi.",
  },
];

function smoothstep(a: number, b: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/** The tokenizer is the product, so it is shown working rather than
 *  described. Every number here is measured in the visitor's browser. */
function Bench({
  model,
  onType,
}: {
  model: BpeModel;
  onType?: (text: string) => void;
}) {
  const [value, setValue] = useState("oʻzbek tilida noldan boshlaymiz");
  const tokens = useMemo(() => encode(value, model), [value, model]);
  const bytes = useMemo(() => new TextEncoder().encode(value).length, [value]);
  const ratio = tokens.length ? bytes / tokens.length : 0;

  return (
    <div className="d8-bench">
      <div className="d8-bench__bar">
        <span>Tokenizator</span>
        <span>{model.mergeCount} birlashma oʻrganilgan</span>
      </div>
      <label className="d8-bench__slot" htmlFor="d8-in">
        <span>Kirish</span>
        <input
          id="d8-in"
          value={value}
          spellCheck={false}
          autoComplete="off"
          onChange={(e) => {
            setValue(e.target.value);
            onType?.(e.target.value);
          }}
        />
      </label>
      <div className="d8-bench__out" aria-live="polite">
        {tokens.length === 0 ? (
          <span className="d8-bench__idle">Matn kutilmoqda</span>
        ) : (
          tokens.slice(0, 15).map((t, i) => (
            <span className="d8-chip" key={i}>
              <b>{t.text.replace(/ /g, "␣")}</b>
              <i>{t.id}</i>
            </span>
          ))
        )}
      </div>
      <p className="d8-bench__hint">
        Yozganingiz oxirgi bosqichda maydonning oʻzida terilib chiqadi.
      </p>
      <dl className="d8-bench__read">
        <div>
          <dt>Kirgan</dt>
          <dd>
            {bytes}
            <i>bayt</i>
          </dd>
        </div>
        <div>
          <dt>Chiqqan</dt>
          <dd>
            {tokens.length}
            <i>token</i>
          </dd>
        </div>
        <div data-hot>
          <dt>Nisbat</dt>
          <dd>
            {ratio.toFixed(2)}
            <i>bayt/token</i>
          </dd>
        </div>
      </dl>
    </div>
  );
}

/* The arrival. Shown on every load: a page that opens with its own name
   is a stronger first frame, and it is short and skippable enough that
   holding it back for returning visitors costs more than it saves. */
function Cover({ onDone }: { onDone: () => void }) {
  const [out, setOut] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let gone = false;
    const leave = () => {
      if (gone) return;
      gone = true;
      setOut(true);
      window.setTimeout(onDone, reduced ? 0 : 620);
    };
    const t = window.setTimeout(leave, reduced ? 200 : 1900);
    window.addEventListener("pointerdown", leave, { once: true });
    window.addEventListener("keydown", leave, { once: true });
    window.addEventListener("wheel", leave, { once: true, passive: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("pointerdown", leave);
      window.removeEventListener("keydown", leave);
      window.removeEventListener("wheel", leave);
    };
  }, [onDone]);

  return (
    <div className="d8-cover" data-out={out || undefined} role="status">
      <span className="d8-cover__mark">Noldan</span>
      <span className="d8-cover__tag">Sunʼiy intellektni noldan quramiz</span>
      <span className="d8-cover__bar" aria-hidden="true">
        <i />
      </span>
    </div>
  );
}

/** The kernel the field is sweeping during the vision stages. It holds
 *  the slot the tokenizer holds on the language stages, so the corner
 *  always carries the instrument that belongs to what you are reading. */
function KernelCard() {
  const K = [1, 0, -1, 2, 0, -2, 1, 0, -1];
  return (
    <div className="d8-kernel">
      <div className="d8-kernel__bar">
        <span>Yadro</span>
        <span>Sobel X · 3 × 3</span>
      </div>
      <div className="d8-kernel__body">
        <div className="d8-kernel__grid" aria-hidden="true">
          {K.map((v, i) => (
            <span key={i} data-zero={v === 0 || undefined} data-neg={v < 0 || undefined}>
              {v}
            </span>
          ))}
        </div>
        <p>
          Maydon boʻylab suriladigan oyna shu toʻqqiz sonni har bir katakka
          qoʻllaydi. Chapdagi va oʻngdagi farq qolganini oʻchiradi.
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLElement | null>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const railBtnRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<DaylightScene | null>(null);
  const textTimer = useRef<number | undefined>(undefined);
  const benchRef = useRef<HTMLDivElement | null>(null);
  const kernelRef = useRef<HTMLDivElement | null>(null);

  const [cover, setCover] = useState(true);
  // The instrument stays folded away until it is asked for, so it never
  // covers the field; the tab that opens it is always visible.
  const [openTool, setOpenTool] = useState(false);
  const [vision, setVision] = useState(false);

  const store = useRef<BpeModel | null>(null);
  if (!store.current) store.current = trainBPE(DEMO_CORPUS, DEMO_VOCAB, PROBE);
  const model = store.current;

  useEffect(() => {
    document.documentElement.classList.add("v8-root");
    return () => document.documentElement.classList.remove("v8-root");
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const track = trackRef.current;
    if (!canvas || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let scene: DaylightScene | null = null;
    let cancelled = false;
    let raf = 0;

    // The last formation is sampled from rendered type, so it has to
    // wait for the face or it samples a fallback outline.
    document.fonts.ready.then(() => {
      if (cancelled) return;
      try {
        scene = createDaylight(canvas, {
          reduced,
          font: '"Geist Variable", sans-serif',
        });
      } catch {
        document.documentElement.classList.add("v8-nogl");
        return;
      }
      sceneRef.current = scene;

      const tick = () => {
        raf = requestAnimationFrame(tick);
        const max = track.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;

        // Dwell on each formation, then travel. Without the hold, the
        // shapes never resolve while they are being read.
        const t = p * (STAGES.length - 1);
        const i = Math.min(STAGES.length - 2, Math.floor(t));
        const morph = i + smoothstep(0.2, 0.82, t - i);
        scene!.setMorph(morph);

        // The hero owns the left column at rest and hands it to the
        // rail as the first formation resolves.
        const out = smoothstep(0.08, 0.5, morph);
        if (heroRef.current) {
          heroRef.current.style.opacity = String(1 - out);
          heroRef.current.style.transform = `translateY(${out * -26}px)`;
          heroRef.current.style.pointerEvents = out > 0.5 ? "none" : "auto";
        }
        if (railRef.current) {
          railRef.current.style.opacity = String(out);
          railRef.current.style.pointerEvents = out > 0.5 ? "auto" : "none";
        }
        panelRefs.current.forEach((el, k) => {
          if (!el) return;
          const o = Math.max(0, 1 - Math.abs(morph - k) / 0.62);
          el.style.opacity = String(o * o);
          el.style.transform = `translateY(${(morph - k) * 22}px)`;
        });
        railBtnRefs.current.forEach((el, k) => {
          el?.setAttribute("aria-current", Math.round(morph) === k ? "true" : "false");
        });

        // The vision stages have no use for a tokenizer, and on a wide
        // raster the panel column is exactly what crops the picture. So
        // the corner swaps instruments and the field slides clear of it.
        const visionW = Math.min(
          1,
          Math.max(0, 1 - Math.abs(morph - 4)) + Math.max(0, 1 - Math.abs(morph - 5))
        );
        if (benchRef.current) {
          benchRef.current.style.opacity = String(1 - visionW);
          benchRef.current.style.pointerEvents = visionW > 0.5 ? "none" : "auto";
        }
        if (kernelRef.current) {
          kernelRef.current.style.opacity = String(visionW);
          kernelRef.current.style.pointerEvents = visionW > 0.5 ? "auto" : "none";
        }
        setVision(visionW > 0.5);
        scene!.setBias(visionW);

        // Past the end of the track the page lands on the ground, so
        // the whole field retires instead of floating over the copy.
        const past = Math.min(
          1,
          Math.max(0, (window.scrollY - max) / (window.innerHeight * 0.5))
        );
        if (fieldRef.current) {
          fieldRef.current.style.opacity = String(1 - past);
          fieldRef.current.style.visibility = past >= 1 ? "hidden" : "visible";
        }
      };
      tick();
    });

    const onPointer = (e: PointerEvent) =>
      sceneRef.current?.setPointer(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
    const onResize = () => sceneRef.current?.resize();
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      scene?.dispose();
      sceneRef.current = null;
    };
  }, []);

  /* Drag the field to turn it. */
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    let down = false;
    let lastX = 0;
    const start = (e: PointerEvent) => {
      down = true;
      lastX = e.clientX;
      el.setPointerCapture(e.pointerId);
      el.classList.add("is-dragging");
    };
    const move = (e: PointerEvent) => {
      if (!down) return;
      sceneRef.current?.nudge(e.clientX - lastX);
      lastX = e.clientX;
    };
    const end = (e: PointerEvent) => {
      down = false;
      el.releasePointerCapture?.(e.pointerId);
      el.classList.remove("is-dragging");
    };
    el.addEventListener("pointerdown", start);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);
    return () => {
      el.removeEventListener("pointerdown", start);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", end);
      el.removeEventListener("pointercancel", end);
    };
  }, []);

  /* Ground sections arrive on scroll instead of being there already.
     IntersectionObserver rather than a scroll listener, and transform
     plus opacity only, so it never costs layout. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document
        .querySelectorAll("[data-reveal]")
        .forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* The published figures count up once, on arrival. They settle on the
     true value; a partial number left on screen would be a wrong one. */
  useEffect(() => {
    const host = document.querySelector(".d8-figures");
    if (!host) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cells = Array.from(host.querySelectorAll<HTMLElement>("[data-count]"));
    if (reduced) {
      cells.forEach((el) => (el.textContent = el.dataset.count ?? ""));
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (t: number) => {
          const k = Math.min(1, (t - t0) / 1100);
          const e = 1 - Math.pow(1 - k, 3);
          cells.forEach((el) => {
            const target = Number(el.dataset.value ?? 0);
            const dp = Number(el.dataset.dp ?? 0);
            const now = target * e;
            el.textContent =
              (el.dataset.prefix ?? "") +
              (dp
                ? now.toFixed(dp)
                : Math.round(now).toLocaleString("ru-RU")) +
              (el.dataset.suffix ?? "");
          });
          if (k < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    io.observe(host);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Primary actions lean toward the cursor. Written straight to style so
     it never re-renders React, and it releases on leave. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const btns = Array.from(document.querySelectorAll<HTMLElement>(".d8-btn"));
    const onMove = (e: PointerEvent) => {
      btns.forEach((b) => {
        const r = b.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy);
        const reach = r.width * 0.9;
        if (d < reach) {
          const k = (1 - d / reach) * 0.24;
          b.style.transform = `translate(${dx * k}px, ${dy * k}px)`;
        } else if (b.style.transform) {
          b.style.transform = "";
        }
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      btns.forEach((b) => (b.style.transform = ""));
    };
  }, []);

  const jump = (k: number) => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollHeight - window.innerHeight;
    scrollToY(
      (k / (STAGES.length - 1)) * max,
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  };

  return (
    <div className="v8">

      {/* Every fixed element lives in one layer so it can be retired
          as a single object when the page lands on the ground. */}
      <div className="d8-field" ref={fieldRef}>
      <canvas className="d8-canvas" ref={canvasRef} aria-hidden="true" />

      <header className="d8-nav">
        <span className="d8-nav__mark">Noldan</span>
        <a href={HF_USER} target="_blank" rel="noopener noreferrer">
          Hugging Face
        </a>
      </header>

      <div className="d8-hero" ref={heroRef}>
        <p className="d8-eyebrow">Bepul, ochiq kodli kurs</p>
        <h1>Sunʼiy intellektni noldan quring.</h1>
        <p className="d8-hero__sub">
          Til modeli ham, koʻrish modeli ham. Tokenizatordan
          konvolyutsiyagacha, har bir satrni oʻzingiz yozasiz.
        </p>
        <Link className="d8-btn" to="/learn">
          Oʻrganishni boshlash
        </Link>
      </div>

      <nav className="d8-rail" aria-label="Bosqichlar" ref={railRef}>
        {STAGES.map((s, i) => (
          <button
            key={s.n}
            type="button"
            onClick={() => jump(i)}
            ref={(el) => {
              railBtnRefs.current[i] = el;
            }}
          >
            <span className="d8-rail__n">{s.n}</span>
            <span className="d8-rail__t">{s.tag}</span>
            <span className="d8-rail__b" aria-hidden="true" />
          </button>
        ))}
      </nav>

      <div className="d8-stage" aria-hidden="true">
        {STAGES.map((s, i) => (
          <div
            className="d8-panel"
            key={s.n}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
          >
            <h2>{s.h}</h2>
            <p>{s.p}</p>
          </div>
        ))}
      </div>

      <div className="d8-slot" data-open={openTool || undefined}>
        <button
          type="button"
          className="d8-slot__tab"
          onClick={() => setOpenTool((v) => !v)}
          aria-expanded={openTool}
        >
          <span className="d8-slot__dot" aria-hidden="true" />
          {vision ? "Sobel yadrosi" : "Jonli tokenizator"}
          <b aria-hidden="true">{openTool ? "×" : "+"}</b>
        </button>
        <div className="d8-slot__item" ref={benchRef}>
          <Bench
            model={model}
            onType={(text) => {
              sceneRef.current?.ripple();
              window.clearTimeout(textTimer.current);
              textTimer.current = window.setTimeout(
                () => sceneRef.current?.setText(text),
                260
              );
            }}
          />
        </div>
        <div className="d8-slot__item" ref={kernelRef} style={{ opacity: 0 }}>
          <KernelCard />
        </div>
      </div>
      </div>

      {cover && (
        <Cover onDone={() => setCover(false)} />
      )}

      <div className="d8-sr">
        <h1>Sunʼiy intellektni noldan quring</h1>
        {STAGES.map((s) => (
          <section key={s.n}>
            <h2>
              {s.tag}. {s.h}
            </h2>
            <p>{s.p}</p>
          </section>
        ))}
      </div>

      <div className="d8-track" ref={trackRef} aria-hidden="true" />

      <main id="main" className="d8-ground">
        <section className="d8-figures" aria-label="Oʻlchangan koʻrsatkichlar" data-reveal>
          {[
            { value: FACTS.params, suffix: "M", l: "oʻqitilgan parametr" },
            {
              value: FACTS.cost,
              prefix: "$",
              dp: 2,
              l: "umumiy oʻqitish narxi",
              hot: true,
            },
            { value: FACTS.vocab, l: "tokenizator lugʻati" },
            {
              value: FACTS.lessonsReady,
              suffix: `/${FACTS.lessons}`,
              l: "dars tayyor",
            },
          ].map((f) => (
            <div key={f.l} data-hot={f.hot || undefined}>
              <span
                data-count=""
                data-value={f.value}
                data-dp={f.dp ?? 0}
                data-prefix={f.prefix ?? ""}
                data-suffix={f.suffix ?? ""}
              >
                {(f.prefix ?? "") +
                  (f.dp
                    ? f.value.toFixed(f.dp)
                    : f.value.toLocaleString("ru-RU")) +
                  (f.suffix ?? "")}
              </span>
              <i>{f.l}</i>
            </div>
          ))}
        </section>

        <section className="d8-statement" data-reveal>
          <div>
            <h2>Bu koʻrgazma emas.</h2>
            <p>
              Yuqoridagi maydondagi tokenlar shu sahifa ochilganda haqiqiy
              oʻzbekcha matnda oʻrganilgan. Quyidagi tokenizator ham jonli: siz
              yozgan har qanday matnni hozir kodlaydi.
            </p>
            <p className="d8-split__note">
              Sahifadagi barcha oʻlchovlar brauzeringizda hisoblanadi.{" "}
              {FACTS.params}M va ${FACTS.cost.toFixed(2)} esa uzbek-gpt-103m ning
              haqiqiy oʻqitilishidan olingan.
            </p>
          </div>
        </section>

        <section className="d8-vision" data-reveal>
          <div className="d8-vision__text">
            <h2>Koʻrish modeli ham raqamlarni koʻradi.</h2>
            <p>
              Rasm, model uchun, piksel qiymatlaridan iborat toʻr. Kirish
              tasviri ustida sichqonchani yuriting: har bir nuqtaning haqiqiy
              qiymati chiqadi.
            </p>
            <p>
              Konvolyutsiya shu toʻr boʻylab 3 × 3 yadroni suradi va har bir
              joyda toʻqqizta sonni koʻpaytirib qoʻshadi. Chegara topish,
              xiralashtirish, oʻtkirlashtirish, hammasi shu bitta amaldan
              chiqadi. Konvolyutsion tarmoq bu yadrolarni oʻzi oʻrganadi.
            </p>
            <p className="d8-vision__note">
              Quyidagi filtr brauzeringizda, har bir piksel uchun hisoblanadi.
              Tayyor kutubxona ishlatilmagan.
            </p>
          </div>
          <ConvLab />
        </section>

        <section className="d8-arts" data-reveal>
          <h2>Yakunda qoladigan narsa</h2>
          <div>
            {ARTIFACTS.map((a) => (
              <a key={a.name} href={a.href} target="_blank" rel="noopener noreferrer">
                <span className="d8-art__n">{a.name}</span>
                {a.specs.map(([k, v]) => (
                  <span className="d8-art__r" key={k}>
                    <i>{k}</i>
                    <b>{v}</b>
                  </span>
                ))}
                <span className="d8-art__go">Yuklab olish</span>
              </a>
            ))}
          </div>
        </section>

        <section className="d8-fit" data-reveal>
          {[FIT.yes, FIT.no].map((f, i) => (
            <div key={f.head} data-neg={i === 1 || undefined}>
              <h3>{f.head}</h3>
              <ul>
                {f.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="d8-end" data-reveal>
          <h2>Tokenizatordan boshlang.</h2>
          <p>
            Ikki kurs, {FACTS.lessons} dars, {FACTS.lessonsReady} tasi hozir
            tayyor. Hammasi bepul, ochiq va ishlaydigan kod bilan.
          </p>
          <Link className="d8-btn d8-btn--lg" to="/learn">
            Oʻrganishni boshlash
          </Link>
        </section>

        <footer className="d8-foot">
          <span>Noldan. Oʻzbekiston va Markaziy Osiyo uchun.</span>
          <a href={HF_USER} target="_blank" rel="noopener noreferrer">
            huggingface.co/IslombekT
          </a>
        </footer>
      </main>
    </div>
  );
}

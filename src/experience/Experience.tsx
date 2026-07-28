import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ArrowUpRight, CornerLeftUp } from "lucide-react";
import { DEMO_CORPUS, encode, trainBPE, type Token } from "../lib/bpe";
import { scrollToProgress } from "../components/SmoothScroll";
import { onIntroDone } from "../lib/intro";
import "./Experience.css";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/** Vocabulary ceiling for the in-page demo model. Small so training runs
 *  in a few hundred ms on a cold load. The published tokenizer uses 16,000. */
const DEMO_VOCAB = 700;

const CHAPTERS = [
  { id: "bytes", num: "00", name: "Baytlar" },
  { id: "tokens", num: "01", name: "Tokenlar" },
  { id: "vocabulary", num: "02", name: "Lugʻat" },
  { id: "training", num: "03", name: "Oʻqitish" },
  { id: "model", num: "04", name: "Model" },
] as const;

function ByteStrip({ text }: { text: string }) {
  const bytes = useMemo(
    () => Array.from(new TextEncoder().encode(text)),
    [text]
  );
  return (
    <div className="strip" aria-label={`${text} — ${bytes.length} bayt`}>
      {bytes.map((b, i) => (
        <span className="strip__cell" key={i}>
          {b}
        </span>
      ))}
    </div>
  );
}

function CompressionCurve({
  curve,
  base,
  probe,
}: {
  curve: Array<{ merges: number; tokens: number }>;
  base: number;
  probe: string;
}) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const areaRef = useRef<SVGPathElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const W = 560;
  const H = 240;
  const PADL = 46;
  const PADB = 34;
  const PADT = 16;
  const PADR = 12;

  const maxMerges = curve[curve.length - 1]?.merges || 1;
  const minTokens = curve[curve.length - 1]?.tokens || 1;

  const x = (m: number) => PADL + (m / maxMerges) * (W - PADL - PADR);
  const y = (t: number) =>
    PADT + (1 - (t - minTokens) / (base - minTokens || 1)) * (H - PADT - PADB);

  const line = curve
    .map((pt, i) => `${i === 0 ? "M" : "L"}${x(pt.merges).toFixed(1)},${y(pt.tokens).toFixed(1)}`)
    .join(" ");
  const area = `${line} L${x(maxMerges).toFixed(1)},${(H - PADB).toFixed(1)} L${PADL},${(H - PADB).toFixed(1)} Z`;

  useGSAP(
    () => {
      const path = pathRef.current;
      const areaEl = areaRef.current;
      const wrap = wrapRef.current;
      if (!path || !wrap || !areaEl) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const len = path.getTotalLength();
      // Draw once when the chart comes into view and hold the finished
      // state — not scrubbed, so it is never stuck half-drawn while read.
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.set(areaEl, { opacity: 0 });
      ScrollTrigger.create({
        trigger: wrap,
        start: "top 78%",
        once: true,
        onEnter: () => {
          gsap.to(path, { strokeDashoffset: 0, duration: 1.25, ease: "power2.out" });
          gsap.to(areaEl, { opacity: 1, duration: 1, ease: "power1.out", delay: 0.25 });
        },
      });
    },
    { scope: wrapRef, dependencies: [line] }
  );

  const ratio = (base / minTokens).toFixed(2);

  return (
    <div className="curve" ref={wrapRef}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="curve-title">
        <title id="curve-title">
          Korpusdan tashqaridagi jumla uchun kerak boʻlgan tokenlar soni —
          birlashmalar oʻrganilgani sari kamayadi
        </title>
        <line className="curve__axis" x1={PADL} y1={PADT} x2={PADL} y2={H - PADB} />
        <line className="curve__axis" x1={PADL} y1={H - PADB} x2={W - PADR} y2={H - PADB} />
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            className="curve__grid"
            x1={PADL}
            y1={PADT + f * (H - PADT - PADB)}
            x2={W - PADR}
            y2={PADT + f * (H - PADT - PADB)}
          />
        ))}
        <path ref={areaRef} className="curve__area" d={area} />
        <path ref={pathRef} className="curve__line" d={line} />
        <circle className="curve__end" cx={x(maxMerges)} cy={y(minTokens)} r="3.5" />
        <text className="curve__lab" x={PADL} y={H - 10}>
          0 birlashma
        </text>
        <text className="curve__lab curve__lab--end" x={W - PADR} y={H - 10}>
          {maxMerges} birlashma
        </text>
        <text className="curve__lab" x={4} y={PADT + 8}>
          {base}
        </text>
        <text className="curve__lab" x={4} y={H - PADB}>
          {minTokens}
        </text>
      </svg>
      <p className="curve__caption">
        &laquo;{probe}&raquo; &mdash; oʻqitish korpusiga kirmagan jumla. Hozir
        sizning brauzeringizda oʻlchandi: {base} bayt {maxMerges} ta
        birlashmadan keyin {minTokens} tokenga aylandi, ya&rsquo;ni model diqqat
        qaratadigan pozitsiyalar {ratio}&times; kam.
      </p>
    </div>
  );
}

function Tokenizer() {
  const [value, setValue] = useState("noldan boshlaymiz");
  const model = useMemo(() => trainBPE(DEMO_CORPUS, DEMO_VOCAB), []);
  const tokens: Token[] = useMemo(() => encode(value, model), [value, model]);
  const byteLength = useMemo(
    () => new TextEncoder().encode(value).length,
    [value]
  );

  return (
    <div className="tok">
      <label className="tok__label" htmlFor="tok-input">
        Istalgan matnni yozing
      </label>
      <input
        id="tok-input"
        className="tok__input"
        value={value}
        spellCheck={false}
        autoComplete="off"
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="tok__out" aria-live="polite">
        {tokens.length === 0 ? (
          <span className="tok__empty">Matn kutilmoqda</span>
        ) : (
          tokens.map((t, i) => (
            <span className="tok__chip" key={i} title={`token id ${t.id}`}>
              <span className="tok__chip-text">{t.text === " " ? "·" : t.text}</span>
              <span className="tok__chip-id">{t.id}</span>
            </span>
          ))
        )}
      </div>
      <dl className="tok__stats">
        <div>
          <dt>Kirgan bayt</dt>
          <dd>{byteLength}</dd>
        </div>
        <div>
          <dt>Chiqqan token</dt>
          <dd>{tokens.length}</dd>
        </div>
        <div>
          <dt>Oʻrganilgan birlashma</dt>
          <dd>{model.mergeCount}</dd>
        </div>
        <div>
          <dt>Lugʻat hajmi</dt>
          <dd>{model.vocabSize}</dd>
        </div>
      </dl>
      <CompressionCurve curve={model.curve} base={model.probeBytes} probe={model.probeText} />
    </div>
  );
}

export default function Experience() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const railRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const paramRef = useRef<HTMLSpanElement | null>(null);
  const costRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    (_context, contextSafe) => {
      const root = rootRef.current;
      if (!root) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Rail active state.
      CHAPTERS.forEach((chapter, i) => {
        ScrollTrigger.create({
          trigger: `#${chapter.id}`,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => railRefs.current[i]?.classList.toggle("is-active", self.isActive),
        });
      });

      // Real figures: 103M parameters, $3.60 to train. Count up ONCE when
      // the section enters and settle on the true value — never a partial,
      // scroll-dependent number that reads as a different (wrong) figure.
      const setCounters = (v: number) => {
        if (paramRef.current) paramRef.current.textContent = Math.round(v * 103).toString();
        if (costRef.current) costRef.current.textContent = (v * 3.6).toFixed(2);
      };
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) {
        setCounters(1);
      } else {
        const counter = { v: 0 };
        ScrollTrigger.create({
          trigger: "#training",
          start: "top 70%",
          once: true,
          onEnter: () =>
            gsap.to(counter, {
              v: 1,
              duration: 1.4,
              ease: "power2.out",
              onUpdate: () => setCounters(counter.v),
            }),
        });
      }

      if (reduced) {
        gsap.set("[data-reveal]", { opacity: 1 });
        return;
      }

      // Hide reveal targets synchronously so there is no flash of full text
      // before the split animation snaps them to their start.
      gsap.set("[data-reveal]", { opacity: 0 });

      const splits: SplitText[] = [];
      let cancelled = false;
      const safe = contextSafe ?? (<T,>(fn: T) => fn);

      const build = safe(() => {
        // One reveal timeline per section, fired when the SECTION enters —
        // so a section's whole block (heading, body, cards) animates in
        // together. No more scrolling past to trigger the lower text.
        gsap.utils.toArray<HTMLElement>("main > section").forEach((section) => {
          const isHero = section.id === "top";
          const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
          let at = 0;

          section.querySelectorAll<HTMLElement>('[data-reveal="words"]').forEach((el) => {
            const s = new SplitText(el, { type: "words", wordsClass: "rv-word", aria: "auto" });
            splits.push(s);
            gsap.set(el, { opacity: 1 });
            tl.from(
              s.words,
              { yPercent: 60, opacity: 0, filter: "blur(8px)", duration: 0.9, stagger: 0.04 },
              at
            );
            at += 0.1;
          });

          section.querySelectorAll<HTMLElement>('[data-reveal="lines"]').forEach((el) => {
            const s = new SplitText(el, { type: "lines", mask: "lines", linesClass: "rv-line", aria: "auto" });
            splits.push(s);
            gsap.set(el, { opacity: 1 });
            tl.from(
              s.lines,
              { yPercent: 105, duration: 0.8, stagger: 0.07, ease: "power4.out" },
              at
            );
            at += 0.06;
          });

          const rises = section.querySelectorAll<HTMLElement>("[data-rise]");
          if (rises.length) {
            tl.from(rises, { y: 26, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power2.out" }, at);
          }

          if (isHero) {
            // Play as the intro cover lifts (immediately if there is no intro).
            onIntroDone(() => tl.play());
          } else {
            // Fire early, as the section comes into view.
            ScrollTrigger.create({
              trigger: section,
              start: "top 72%",
              once: true,
              onEnter: () => tl.play(),
            });
          }
        });

        ScrollTrigger.refresh();
      });

      document.fonts.ready.then(() => {
        if (!cancelled) build();
      });

      return () => {
        cancelled = true;
        splits.forEach((s) => s.revert());
      };
    },
    { scope: rootRef }
  );

  return (
    <div className="exp" ref={rootRef}>
      <header className="exp__chrome">
        <a className="exp__brand" href="#top">
          Nol<span>dan</span>
        </a>
        <nav className="exp__rail" aria-label="Boʻlimlar">
          {CHAPTERS.map((c, i) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="rail__item"
              ref={(el) => {
                railRefs.current[i] = el;
              }}
            >
              <span className="rail__num">{c.num}</span>
              <span className="rail__name">{c.name}</span>
              <span className="rail__tick" aria-hidden="true" />
            </a>
          ))}
        </nav>
        <a
          className="exp__hf"
          href="https://huggingface.co/IslombekT"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hugging Face <ArrowUpRight size={12} strokeWidth={2.2} aria-hidden="true" />
        </a>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-h">
          <div className="hero__inner">
            <p className="hero__eyebrow" data-reveal="words">
              Bepul &middot; Ochiq kodli &middot; Noldan
            </p>
            <h1 className="hero__title" data-reveal="words" id="hero-h">
              Til modelini noldan quring.
            </h1>
            <p className="hero__sub" data-reveal="lines">
              Tokenizator, diqqat mexanizmi, oʻqitish sikli &mdash; har bir
              satrni oʻzingiz yozasiz. Prompt muhandisligi emas. Birovning API
              si ham emas.
            </p>
            <div className="hero__actions" data-rise>
              <Link className="btn" to="/learn">
                Oʻrganishni boshlash
              </Link>
              <span className="hero__hint">Pastga suring &mdash; bosqichlar ishga tushadi</span>
            </div>
          </div>
        </section>

        <section className="chapter" id="bytes" aria-labelledby="bytes-h">
          <div className="chapter__panel">
            <p className="chapter__meta" data-rise>
              <span className="chapter__num">00</span> Baytlar
            </p>
            <h2 className="chapter__title" data-reveal="words" id="bytes-h">
              Model soʻzlarni hech qachon koʻrmaydi.
            </h2>
            <p className="chapter__body" data-reveal="lines">
              U baytlarni koʻradi. Hamma narsadan oldin &mdash; diqqat
              mexanizmidan ham, vaznlardan ham oldin &mdash; matn 0 dan 255 gacha
              boʻlgan butun sonlar ketma-ketligi. Oʻzbekcha, inglizcha, tinish
              belgilari va emoji bir xil yoʻl bilan keladi. Hech narsa lugʻatdan
              tashqarida qolmaydi, chunki hali lugʻatning oʻzi yoʻq.
            </p>
            <div data-rise>
              <ByteStrip text="noldan" />
            </div>
            <p className="chapter__note" data-rise>
              Yuqoridagi soʻz &mdash; UTF&#8209;8 da. Kirish formati shundan
              iborat.
            </p>
          </div>
        </section>

        <section className="chapter" id="tokens" aria-labelledby="tokens-h">
          <div className="chapter__panel chapter__panel--wide">
            <p className="chapter__meta" data-rise>
              <span className="chapter__num">01</span> Tokenlar
            </p>
            <h2 className="chapter__title" data-reveal="words" id="tokens-h">
              Takrorlanadigan juftlikni toping. Birlashtiring. Yana takrorlang.
            </h2>
            <p className="chapter__body" data-reveal="lines">
              Shu bitta qoida &mdash; byte&#8209;pair encoding. Har bir yonma-yon
              juftlikni sanang, eng koʻp uchraganini yangi belgiga birlashtiring
              va buni bir necha ming marta takrorlang. Quyidagi tokenizator
              haqiqiy: bu sahifa ochilganda haqiqiy oʻzbekcha matnda oʻqidi va
              hozir siz yozgan har qanday matnni kodlaydi.
            </p>
            <div data-rise>
              <Tokenizer />
            </div>
          </div>
        </section>

        <section className="chapter" id="vocabulary" aria-labelledby="vocab-h">
          <div className="chapter__panel">
            <p className="chapter__meta" data-rise>
              <span className="chapter__num">02</span> Lugʻat
            </p>
            <h2 className="chapter__title" data-reveal="words" id="vocab-h">
              Lugʻat hajmi &mdash; sozlama emas, byudjet.
            </h2>
            <p className="chapter__body" data-reveal="lines">
              Har bir birlashma ketma-ketlikni qisqartiradi, lekin embedding
              parametrlarini talab qiladi. Kam boʻlsa, model kontekstini
              boʻlaklarga sarflaydi; koʻp boʻlsa, jadvalning katta qismi gradient
              hech qachon tegmaydigan oʻlik yukka aylanadi. Bitta oʻzakka
              qoʻshimchalar ketma-ket ulanadigan agglutinativ tillarda bu tanlov
              ingliz tilidagidan keskinroq &mdash; shuning uchun tayyor olingan
              tokenizator odatda yaxshi moslashmaydi.
            </p>
            <p className="chapter__note" data-rise>
              Nashr qilingan tokenizator 16 000 da toʻxtadi. Bu raqamni birovdan
              nusxa koʻchirmasdan, oʻz korpusingiz uchun qanday tanlashni
              &laquo;Tokenizator qurish&raquo; kursi koʻrsatadi.
            </p>
          </div>
        </section>

        <section className="chapter" id="training" aria-labelledby="training-h">
          <div className="chapter__panel">
            <p className="chapter__meta" data-rise>
              <span className="chapter__num">03</span> Oʻqitish
            </p>
            <h2 className="chapter__title" data-reveal="words" id="training-h">
              Sikl siz oʻylagandan kichik.
            </h2>
            <p className="chapter__body" data-reveal="lines">
              Oldinga yurish, yoʻqotish, orqaga yurish, qadam. Qolgani &mdash;
              logistika: partiyalash, nazorat nuqtalari, oʻqish tezligi jadvali
              va yoʻqotish egri chizigʻini umid bilan emas, halol oʻqish
              intizomi. Sizga klaster kerak emas. Sizga siklning toʻgʻri
              boʻlishi kerak.
            </p>
            <div className="gauges" data-rise>
              <div className="gauge">
                <span className="gauge__value">
                  <span ref={paramRef}>0</span>M
                </span>
                <span className="gauge__label">Oʻqitilgan parametr</span>
              </div>
              <div className="gauge">
                <span className="gauge__value">
                  $<span ref={costRef}>0.00</span>
                </span>
                <span className="gauge__label">Umumiy oʻqitish narxi</span>
              </div>
            </div>
          </div>
        </section>

        <section className="chapter" id="model" aria-labelledby="model-h">
          <div className="chapter__panel">
            <p className="chapter__meta" data-rise>
              <span className="chapter__num">04</span> Model
            </p>
            <h2 className="chapter__title" data-reveal="words" id="model-h">
              Yakunda nashr qilsa boʻladigan vaznlar qoladi.
            </h2>
            <p className="chapter__body" data-reveal="lines">
              API chaqiruvlariga toʻla daftar emas. Oʻzingizga tegishli
              tokenizator va oʻqitilgan parametrlar &mdash; internetsiz ishlaydi,
              istagan odam yuklab oladi. Quyidagi ikkala artefakt ham xuddi shu
              yoʻldan chiqqan.
            </p>
            <div className="artifacts" data-rise>
              <a
                className="artifact"
                href="https://huggingface.co/IslombekT/uzbek-gpt-103m"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="artifact__name">uzbek-gpt-103m</span>
                <span className="artifact__spec">103M parametr</span>
                <span className="artifact__spec">FineWeb-2 da oʻqitilgan</span>
                <span className="artifact__spec">Apache-2.0</span>
                <span className="artifact__go">
                  Hugging Face
                  <ArrowUpRight size={12} strokeWidth={2.2} aria-hidden="true" />
                </span>
              </a>
              <a
                className="artifact"
                href="https://huggingface.co/IslombekT/uzbek-bpe-16k"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="artifact__name">uzbek-bpe-16k</span>
                <span className="artifact__spec">16 000 lugʻat</span>
                <span className="artifact__spec">Bayt darajasidagi BPE</span>
                <span className="artifact__spec">Apache-2.0</span>
                <span className="artifact__go">
                  Hugging Face
                  <ArrowUpRight size={12} strokeWidth={2.2} aria-hidden="true" />
                </span>
              </a>
            </div>
          </div>
        </section>

        <section className="finale" aria-labelledby="finale-h">
          <div className="finale__inner">
            <h2 className="finale__title" data-reveal="words" id="finale-h">
              Tokenizatordan boshlang.
            </h2>
            <p className="finale__sub" data-reveal="lines">
              Ikki kurs, 27 dars &mdash; 18 tasi hozir tayyor, qolgani
              yozilmoqda. Hammasi bepul, ochiq va ishlaydigan kod bilan.
            </p>
            <div data-rise>
              <Link className="btn btn--lg" to="/learn">
                Oʻrganishni boshlash
              </Link>
            </div>
            <div className="finale__fit" data-rise>
              <div>
                <h3>Bu sizga mos, agar</h3>
                <ul>
                  <li>Kod yozishni noldan oʻrganmoqchi boʻlsangiz.</li>
                  <li>Modelning ichida nima boʻlayotganini bilmoqchi boʻlsangiz.</li>
                  <li>Natija chiqmaganda xatoni ikki kun qidirishga tayyor boʻlsangiz.</li>
                </ul>
              </div>
              <div>
                <h3>Bu sizga mos emas, agar</h3>
                <ul>
                  <li>Shu hafta chatbot chiqarmoqchi boʻlsangiz.</li>
                  <li>Prompt muhandisligi darslarini izlayotgan boʻlsangiz.</li>
                  <li>Matematikani chetlab oʻtmoqchi boʻlsangiz.</li>
                </ul>
              </div>
            </div>
            <footer className="finale__foot">
              <span>Noldan &mdash; Oʻzbekiston va Markaziy Osiyo uchun.</span>
              <span className="finale__foot-links">
                <a href="https://huggingface.co/IslombekT" target="_blank" rel="noopener noreferrer">
                  Hugging Face
                </a>
                <button type="button" className="finale__top" onClick={() => scrollToProgress(0)}>
                  <CornerLeftUp size={12} strokeWidth={2.2} aria-hidden="true" />
                  Boshiga qaytish
                </button>
              </span>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}

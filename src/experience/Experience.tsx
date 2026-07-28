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
  { id: "bytes", num: "00", name: "Bytes" },
  { id: "tokens", num: "01", name: "Tokens" },
  { id: "vocabulary", num: "02", name: "Vocabulary" },
  { id: "training", num: "03", name: "Training" },
  { id: "model", num: "04", name: "Model" },
] as const;

function ByteStrip({ text }: { text: string }) {
  const bytes = useMemo(
    () => Array.from(new TextEncoder().encode(text)),
    [text]
  );
  return (
    <div className="strip" aria-label={`${text} encoded as ${bytes.length} bytes`}>
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
          Tokens needed for a held-out sentence, falling as merges are learned
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
          0 merges
        </text>
        <text className="curve__lab curve__lab--end" x={W - PADR} y={H - 10}>
          {maxMerges} merges
        </text>
        <text className="curve__lab" x={4} y={PADT + 8}>
          {base}
        </text>
        <text className="curve__lab" x={4} y={H - PADB}>
          {minTokens}
        </text>
      </svg>
      <p className="curve__caption">
        Measured in your browser just now, on a sentence held out of the training
        corpus: &ldquo;{probe}&rdquo;. {base} bytes become {minTokens} tokens after{" "}
        {maxMerges} merges &mdash; {ratio}&times; fewer positions for the model to
        attend over.
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
        Type anything
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
          <span className="tok__empty">Waiting for input</span>
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
          <dt>Bytes in</dt>
          <dd>{byteLength}</dd>
        </div>
        <div>
          <dt>Tokens out</dt>
          <dd>{tokens.length}</dd>
        </div>
        <div>
          <dt>Merges learned</dt>
          <dd>{model.mergeCount}</dd>
        </div>
        <div>
          <dt>Vocabulary</dt>
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
        <nav className="exp__rail" aria-label="Chapters">
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
              Free &middot; Open source &middot; From zero
            </p>
            <h1 className="hero__title" data-reveal="words" id="hero-h">
              Build a language model from scratch.
            </h1>
            <p className="hero__sub" data-reveal="lines">
              The tokenizer, the attention, the training loop &mdash; every line
              written by you. Not prompt engineering. Not somebody else&rsquo;s API.
            </p>
            <div className="hero__actions" data-rise>
              <Link className="btn" to="/learn">
                Start learning
              </Link>
              <span className="hero__hint">Scroll to run the pipeline</span>
            </div>
          </div>
        </section>

        <section className="chapter" id="bytes" aria-labelledby="bytes-h">
          <div className="chapter__panel">
            <p className="chapter__meta" data-rise>
              <span className="chapter__num">00</span> Bytes
            </p>
            <h2 className="chapter__title" data-reveal="words" id="bytes-h">
              A model never sees words.
            </h2>
            <p className="chapter__body" data-reveal="lines">
              It sees bytes. Before anything else exists &mdash; before attention,
              before weights &mdash; text is a flat sequence of integers between 0
              and 255. Uzbek, English, punctuation and emoji all arrive the same
              way. Nothing is ever out&#8209;of&#8209;vocabulary because there is no
              vocabulary yet.
            </p>
            <div data-rise>
              <ByteStrip text="noldan" />
            </div>
            <p className="chapter__note" data-rise>
              The word above, as UTF&#8209;8. That is the entire input format.
            </p>
          </div>
        </section>

        <section className="chapter" id="tokens" aria-labelledby="tokens-h">
          <div className="chapter__panel chapter__panel--wide">
            <p className="chapter__meta" data-rise>
              <span className="chapter__num">01</span> Tokens
            </p>
            <h2 className="chapter__title" data-reveal="words" id="tokens-h">
              Find the pair that repeats. Merge it. Repeat.
            </h2>
            <p className="chapter__body" data-reveal="lines">
              That single rule is byte&#8209;pair encoding. Count every adjacent
              pair, merge the most frequent one into a new symbol, and do it again a
              few thousand times. The tokenizer below is real: it trained on a
              sample corpus when this page loaded, and it is encoding whatever you
              type.
            </p>
            <div data-rise>
              <Tokenizer />
            </div>
          </div>
        </section>

        <section className="chapter" id="vocabulary" aria-labelledby="vocab-h">
          <div className="chapter__panel">
            <p className="chapter__meta" data-rise>
              <span className="chapter__num">02</span> Vocabulary
            </p>
            <h2 className="chapter__title" data-reveal="words" id="vocab-h">
              Vocabulary size is a budget, not a setting.
            </h2>
            <p className="chapter__body" data-reveal="lines">
              Every merge buys shorter sequences and costs embedding parameters. Too
              few and the model wastes its context on fragments; too many and most
              of the table is dead weight the gradient never touches. For a language
              with productive agglutinative morphology, where a single stem carries
              a stack of suffixes, this trade&#8209;off is sharper than it is for
              English &mdash; which is why an inherited tokenizer usually fits badly.
            </p>
            <p className="chapter__note" data-rise>
              The published tokenizer settled at 16,000. Module 02 covers how to
              choose that number for your own corpus rather than copying
              someone else&rsquo;s.
            </p>
          </div>
        </section>

        <section className="chapter" id="training" aria-labelledby="training-h">
          <div className="chapter__panel">
            <p className="chapter__meta" data-rise>
              <span className="chapter__num">03</span> Training
            </p>
            <h2 className="chapter__title" data-reveal="words" id="training-h">
              The loop is smaller than you think.
            </h2>
            <p className="chapter__body" data-reveal="lines">
              Forward pass, loss, backward pass, step. Everything else is logistics:
              batching, checkpointing, learning&#8209;rate schedules and the
              discipline to read a loss curve honestly instead of hoping. You do not
              need a cluster. You need the loop to be correct.
            </p>
            <div className="gauges" data-rise>
              <div className="gauge">
                <span className="gauge__value">
                  <span ref={paramRef}>0</span>M
                </span>
                <span className="gauge__label">Parameters trained</span>
              </div>
              <div className="gauge">
                <span className="gauge__value">
                  $<span ref={costRef}>0.00</span>
                </span>
                <span className="gauge__label">Total training cost</span>
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
              You finish with weights you can publish.
            </h2>
            <p className="chapter__body" data-reveal="lines">
              Not a notebook full of API calls. A tokenizer and a set of trained
              parameters that belong to you, that run without a network connection,
              and that anyone can download. Both artifacts below came out of this
              exact pipeline.
            </p>
            <div className="artifacts" data-rise>
              <a
                className="artifact"
                href="https://huggingface.co/IslombekT/uzbek-gpt-103m"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="artifact__name">uzbek-gpt-103m</span>
                <span className="artifact__spec">103M parameters</span>
                <span className="artifact__spec">Trained on FineWeb-2</span>
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
                <span className="artifact__spec">16,000 vocabulary</span>
                <span className="artifact__spec">Byte-level BPE</span>
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
              Start with the tokenizer.
            </h2>
            <p className="finale__sub" data-reveal="lines">
              Eight modules. Every one free, in the open, with code that runs.
            </p>
            <div data-rise>
              <Link className="btn btn--lg" to="/learn">
                Start learning
              </Link>
            </div>
            <div className="finale__fit" data-rise>
              <div>
                <h3>Read this if</h3>
                <ul>
                  <li>You can write Python and read a stack trace.</li>
                  <li>You want what happens inside the model, not around it.</li>
                  <li>You will debug a run that outputs garbage for two days.</li>
                </ul>
              </div>
              <div>
                <h3>Skip this if</h3>
                <ul>
                  <li>You want to ship a chatbot this weekend.</li>
                  <li>You are looking for prompt engineering tutorials.</li>
                  <li>You expect to skip the math.</li>
                </ul>
              </div>
            </div>
            <footer className="finale__foot">
              <span>Noldan &mdash; written for Uzbekistan and Central Asia.</span>
              <span className="finale__foot-links">
                <a href="https://huggingface.co/IslombekT" target="_blank" rel="noopener noreferrer">
                  Hugging Face
                </a>
                <button type="button" className="finale__top" onClick={() => scrollToProgress(0)}>
                  <CornerLeftUp size={12} strokeWidth={2.2} aria-hidden="true" />
                  Back to the start
                </button>
              </span>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "@fontsource-variable/geist-mono";
import { PROBE } from "../lib/bpe";
import { PRESETS } from "../lib/hf-tokenizer";
import { DEMO, loadTokenizer, tokenize } from "../lib/tokenizers";
import { ARTIFACTS, FACTS, HF_USER } from "../home/content";
import { CATALOG } from "../lib/catalog.generated";
import { useAuth } from "../auth/AuthProvider";
import { scrollToY } from "../components/SmoothScroll";
import { createField, NO_COLOR, type Def, type Field, type Layout } from "./field";
import { brain, compare, galaxy, lines } from "./formations";
import "./landing.css";

/* ====================================================================
   The landing page: one sky, six pictures.

   The page answers two questions for someone who has never written a
   line of code — what is this, and why does it matter — and it answers
   them with the same few thousand stars, which rearrange as the reader
   scrolls:

     0  scattered            — the arrival
     1  a word, and its bytes — a computer only sees numbers
     2  that word, in tokens  — a model reads in pieces
     3  two rows of beads     — an English tokenizer vs an Uzbek one
     4  a turning spiral      — training: guess, measure, correct, repeat
     5  a brain, wired        — what you end up with: your own model

   Nothing drawn as a measurement is invented. The words are whatever the
   reader types. The tokens come from uzbek-bpe-16k — the tokenizer the
   course ends with — downloaded from Hugging Face and run in this
   browser; offline, a small one trained right here stands in. The
   comparison runs GPT-2's tokenizer and the course's side by side and
   counts, live. All tokenizer work happens in a Web Worker, so none of
   it can stall the sky.
   ==================================================================== */

const TOKEN_WORD = "oʻrganamiz";
const UZ = PRESETS.find((p) => p.id === "uzbek")!;
const GPT2 = PRESETS.find((p) => p.id === "gpt2")!;
const enc = new TextEncoder();

type Tokens = {
  word: string;
  list: Array<{ text: string; id: number }>;
  /** "hub": the real uzbek-bpe-16k · "local": the in-browser stand-in */
  source: "hub" | "local";
};

/** A word on its own is tokenized as it would sit inside a sentence —
 *  after a space — because that is how the tokenizer met it in training.
 *  The space is then taken off the first piece for display. */
async function tokensFor(word: string): Promise<Tokens> {
  const shown = (list: Array<{ text: string; id: number }>) =>
    list
      .map((t, i) => (i === 0 ? { ...t, text: t.text.replace(/^ /, "") } : t))
      .filter((t) => t.text !== "");
  try {
    const r = await tokenize(UZ.repo, " " + word);
    return { word, list: shown(r.tokens), source: "hub" };
  } catch {
    const r = await tokenize(DEMO, word);
    return { word, list: shown(r.tokens), source: "local" };
  }
}

const tokCourse = CATALOG.find((c) => c.id === "tokenizator");
const gptCourse = CATALOG.find((c) => c.id === "transformer");
const firstLesson = tokCourse?.lessons[0];
const readyCount = (c?: (typeof CATALOG)[number]) =>
  c ? c.lessons.filter((l) => l.status !== "soon").length : 0;

function prefersReduced() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Where the pictures sit. Beside the copy on a wide screen; above it on
 *  a phone, where the copy takes the lower half. */
function layoutFor(w: number, h: number): Layout {
  if (w >= 900) return { cx: w * 0.685, cy: h * 0.5, unit: Math.min(w * 0.18, h * 0.32) };
  return { cx: w * 0.5, cy: h * 0.3, unit: Math.min(w * 0.36, h * 0.19) };
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/* ---- pictures that depend on content ------------------------------------ */

/* Type drawn in stars reads only if the stars are fine: the big glowing
   beads and spiked stars that make the galaxy sparkle smear a letter's
   stroke. So text pictures ask the field for fine grain and no spikes. */
const TEXT_GRAIN = 0.78;

const TRY_WORDS = ["kitoblarimizdan", "oʻqituvchilarimiz", "yozganlaringiz"];

function wordDef(w: string, K: number): Def {
  const bytes = Array.from(enc.encode(w));
  const shown = bytes.slice(0, 5).join(" ") + (bytes.length > 5 ? " …" : "");
  const built = lines(
    K,
    [
      { parts: [{ text: w, group: 0 }], px: 200, gap: 0 },
      { parts: [{ text: shown, group: 1 }], px: 88, gap: 0 },
    ],
    { maxW: 2.35, maxH: 1.6, color: (g) => (g === 1 ? 2 : NO_COLOR) }
  );
  return {
    kind: "space",
    pts: built.pts,
    colors: built.colors,
    grain: TEXT_GRAIN,
    calm: true,
    rot: (t) => [Math.sin(t * 0.35) * 0.1, Math.sin(t * 0.27) * 0.06, 0],
  };
}

function tokenDef(tokens: string[], K: number): Def {
  const built = lines(
    K,
    [{ parts: tokens.slice(0, 8).map((text, group) => ({ text, group })), px: 190, gap: 0.5 }],
    { maxW: 2.35, maxH: 1.0, color: (g) => [2, 1, 0][g % 3] }
  );
  return {
    kind: "space",
    pts: built.pts,
    colors: built.colors,
    grain: TEXT_GRAIN,
    calm: true,
    rot: (t) => [Math.sin(t * 0.3) * 0.12, 0.05, 0],
  };
}

function compareDef(K: number, top: number, bottom: number, neutral = false): Def {
  const built = compare(K, top, bottom);
  if (neutral) built.colors?.fill(0);
  return {
    kind: "space",
    pts: built.pts,
    colors: built.colors,
    rot: (t) => [Math.sin(t * 0.25) * 0.14, 0.08, 0],
  };
}

type Measure =
  | { status: "idle" | "loading" }
  | { status: "ok"; top: number; bottom: number }
  | { status: "local"; top: number; bottom: number };

/* ---- page ------------------------------------------------------------------ */

export default function Landing() {
  const { session } = useAuth();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fieldRef = useRef<Field | null>(null);
  const secRefs = useRef<Array<HTMLElement | null>>([]);
  const copyRefs = useRef<Array<HTMLDivElement | null>>([]);

  const reduced = useMemo(prefersReduced, []);
  const small = typeof window !== "undefined" && window.innerWidth < 700;
  const N = small ? 1500 : 2600;
  const A = small ? 240 : 380;
  const K = N - A;

  const [word, setWord] = useState("salom");
  const [tokWord, setTokWord] = useState(TOKEN_WORD);
  const [tokens, setTokens] = useState<Tokens | null>(null);
  const [fonts, setFonts] = useState(false);
  const [measure, setMeasure] = useState<Measure>({ status: "idle" });

  /* The page paints its own night; the rest of the site is daylight. */
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-page", "stars");
    const meta = document.querySelector('meta[name="theme-color"]');
    const prev = meta?.getAttribute("content");
    meta?.setAttribute("content", "#04060b");
    return () => {
      root.removeAttribute("data-page");
      if (meta && prev) meta.setAttribute("content", prev);
    };
  }, []);

  /* Fetch the course's tokenizer as soon as the page is idle — in the
     worker, so the download and parsing cost the sky nothing — and the
     reader's first word is split without a wait. */
  useEffect(() => {
    const start = () => void loadTokenizer(UZ.repo, UZ.label).catch(() => undefined);
    // Safari has no requestIdleCallback.
    const idle: Partial<Pick<Window, "requestIdleCallback" | "cancelIdleCallback">> = window;
    if (idle.requestIdleCallback && idle.cancelIdleCallback) {
      const cancel = idle.cancelIdleCallback.bind(window);
      const id = idle.requestIdleCallback.call(window, start, { timeout: 2500 });
      return () => cancel(id);
    }
    const id = window.setTimeout(start, 900);
    return () => window.clearTimeout(id);
  }, []);

  /* Type is sampled into stars, so it has to wait for the real face. */
  useEffect(() => {
    let live = true;
    document.fonts.ready.then(() => live && setFonts(true));
    return () => {
      live = false;
    };
  }, []);

  /* ---- the sky --------------------------------------------------------- */
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const field = createField(cv, { count: N, ambient: A, formations: 6, reduced });
    fieldRef.current = field;
    field.setLayout(layoutFor(innerWidth, innerHeight));

    field.setDef(0, { kind: "screen" });
    const g = galaxy(K);
    field.setDef(4, {
      kind: "space",
      pts: g.pts,
      colors: g.colors,
      rot: (t) => [t * 0.07, -1.05, 0.4],
      core: 0.36,
    });
    const b = brain(K);
    field.setDef(5, {
      kind: "space",
      pts: b.pts,
      net: b.net,
      // In profile — frontal lobe, cerebellum, stem — is the one view that
      // reads as a brain at a glance. It sways around that view rather
      // than turning to face the reader, where it would read as two lumps.
      rot: (t) => [1.5 + Math.sin(t * 0.11) * 0.45, 0.14, 0],
    });
    // Until something has been measured, the rows are the sentence's
    // words, uncoloured. They make no claim.
    const words = PROBE.split(/\s+/).length;
    field.setDef(3, compareDef(K, words, words, true));

    // Where the middle of each section sits on the page. Measured on load
    // and whenever a section changes size — never inside the frame, where
    // reading layout makes the browser recompute it sixty times a second.
    let mids: number[] = [];
    const centers: number[] = [];
    const measureSections = () => {
      const sy = window.scrollY;
      mids = secRefs.current.map((s) => {
        if (!s) return 0;
        const r = s.getBoundingClientRect();
        return r.top + sy + r.height * 0.5;
      });
      centers.length = mids.length;
    };
    measureSections();
    const ro = new ResizeObserver(measureSections);
    secRefs.current.forEach((s) => s && ro.observe(s));

    // The copy's fade and drift are written only when they change.
    const lastO: string[] = [];
    const lastT: string[] = [];

    let raf = 0;
    const t0 = performance.now();
    let last = t0;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(64, now - last);
      last = now;

      // Which picture: the two sections either side of the middle of the
      // screen, and how far between them. Each picture holds while its
      // section is being read, and travels only in the gap between.
      const vh = innerHeight;
      const vc = vh * 0.5;
      const sy = window.scrollY;
      for (let i = 0; i < mids.length; i++) centers[i] = mids[i] - sy;
      const lastI = centers.length - 1;
      let m = 0;
      if (vc >= centers[lastI]) m = lastI;
      else if (vc > centers[0]) {
        let k = 0;
        while (k < lastI - 1 && centers[k + 1] <= vc) k++;
        const t = (vc - centers[k]) / (centers[k + 1] - centers[k]);
        m = k + smooth(0.28, 0.74, t);
      }
      field.setMorph(m);

      // Copy for a picture is lit while that picture is, and steps back
      // when it goes. The last block stays once reached: it holds the
      // call to action.
      copyRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = (centers[i] - vc) / vh;
        let o = 1 - Math.max(0, Math.abs(d) - 0.14) / 0.3;
        if (i === lastI && d < 0) o = 1;
        o = Math.max(0, Math.min(1, o));
        const os = o.toFixed(3);
        if (lastO[i] !== os) {
          lastO[i] = os;
          el.style.opacity = os;
          el.style.pointerEvents = o < 0.2 ? "none" : "";
        }
        if (!reduced) {
          const ts = `translate3d(0, ${(d * -36).toFixed(1)}px, 0)`;
          if (lastT[i] !== ts) {
            lastT[i] = ts;
            el.style.transform = ts;
          }
        }
      });

      field.frame((now - t0) / 1000, dt);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) =>
      field.pointer((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1);
    let rt = 0;
    const onResize = () => {
      window.clearTimeout(rt);
      rt = window.setTimeout(() => {
        field.resize();
        field.setLayout(layoutFor(innerWidth, innerHeight));
      }, 120);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.clearTimeout(rt);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      fieldRef.current = null;
    };
    // The sky is built once; content-driven pictures are pushed in below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- 1: the reader's word --------------------------------------------- */
  const chars = useMemo(
    () => Array.from(word).map((ch) => ({ ch, bytes: Array.from(enc.encode(ch)) })),
    [word]
  );
  useEffect(() => {
    if (!fonts) return;
    const id = window.setTimeout(() => {
      fieldRef.current?.setDef(1, wordDef(word.trim() || "·", K));
    }, 160);
    return () => window.clearTimeout(id);
  }, [fonts, word, K]);

  /* ---- 2: the reader's word, in tokens ---------------------------------- */
  useEffect(() => {
    const w = tokWord.trim();
    let live = true;
    if (!w) {
      setTokens({ word: "", list: [], source: "hub" });
      return;
    }
    const id = window.setTimeout(() => {
      tokensFor(w)
        .then((t) => live && setTokens(t))
        .catch(() => undefined);
    }, 90);
    return () => {
      live = false;
      window.clearTimeout(id);
    };
  }, [tokWord]);
  useEffect(() => {
    if (!fonts) return;
    const pieces = !tokens ? [TOKEN_WORD] : tokens.list.length ? tokens.list.map((t) => t.text) : ["·"];
    const id = window.setTimeout(() => fieldRef.current?.setDef(2, tokenDef(pieces, K)), 60);
    return () => window.clearTimeout(id);
  }, [fonts, tokens, K]);

  /* ---- 3: measured, not asserted ---------------------------------------- */
  const compareRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = compareRef.current;
    if (!el) return;
    let started = false;
    let live = true;
    const io = new IntersectionObserver(
      async (entries) => {
        if (started || !entries.some((e) => e.isIntersecting)) return;
        started = true;
        io.disconnect();
        setMeasure({ status: "loading" });
        try {
          const [a, b] = await Promise.all([tokenize(GPT2.repo, PROBE), tokenize(UZ.repo, PROBE)]);
          if (live) setMeasure({ status: "ok", top: a.tokens.length, bottom: b.tokens.length });
        } catch {
          // Offline, the comparison falls back to something this browser
          // can still measure honestly: raw bytes against the tokenizer it
          // trains itself.
          const local = await tokenize(DEMO, PROBE).catch(() => null);
          if (live) {
            setMeasure({
              status: "local",
              top: enc.encode(PROBE).length,
              bottom: local ? local.tokens.length : 0,
            });
          }
        }
      },
      // Start downloading well before the section arrives, so the numbers
      // are usually there by the time anyone reads them.
      { rootMargin: "120% 0px 120% 0px" }
    );
    io.observe(el);
    return () => {
      live = false;
      io.disconnect();
    };
  }, []);

  const shown = measure;

  useEffect(() => {
    if ((shown.status === "ok" || shown.status === "local") && shown.bottom > 0) {
      fieldRef.current?.setDef(3, compareDef(K, shown.top, shown.bottom));
    }
  }, [shown, K]);

  const goHow = () => {
    const el = secRefs.current[1];
    if (el) scrollToY(el.offsetTop + el.offsetHeight / 2 - innerHeight / 2, reduced);
  };

  const setSec = (i: number) => (el: HTMLElement | null) => {
    secRefs.current[i] = el;
  };
  const setCopy = (i: number) => (el: HTMLDivElement | null) => {
    copyRefs.current[i] = el;
  };

  const maxRow = shown.status === "ok" || shown.status === "local"
    ? Math.max(shown.top, shown.bottom, 1)
    : 1;

  return (
    <div className="st">
      <canvas className="st__sky" ref={canvasRef} aria-hidden="true" />
      <div className="st__shade" aria-hidden="true" />

      <header className="st-nav">
        <Link to="/" className="st-nav__mark">
          Noldan
        </Link>
        <nav aria-label="Asosiy menyu">
          <Link to="/learn">Darslar</Link>
          <Link to="/playground">Mashq maydoni</Link>
          {session ? (
            <Link to="/hisobim" className="st-nav__in">
              Hisobim
            </Link>
          ) : (
            <Link to="/kirish" className="st-nav__in">
              Kirish
            </Link>
          )}
        </nav>
      </header>

      <main id="main">
        {/* ---- 0 · arrival ------------------------------------------- */}
        <section className="st-hero" ref={setSec(0)} aria-labelledby="st-h0">
          <div className="st-copy" ref={setCopy(0)}>
            <p className="st-meta">Oʻzbek tilida · bepul · kod bilish shart emas</p>
            <h1 id="st-h0">
              Sunʼiy intellektni
              <br />
              noldan quring.
            </h1>
            <p className="st-lede">
              ChatGPT kabi modellar ichida aslida nima boʻladi? Bu kursda buni
              oddiy tilda, birinchi qadamdan oʻrganasiz — va oʻzbek tili uchun
              oʻz modelingizni qurasiz.
            </p>
            <div className="st-actions">
              <Link className="st-btn" to="/learn">
                Birinchi darsni boshlash
                <span aria-hidden="true">→</span>
              </Link>
              <button type="button" className="st-btn st-btn--ghost" onClick={goHow}>
                Qanday ishlashini koʻrish
              </button>
            </div>
          </div>
          <span className="st-cue" aria-hidden="true">
            pastga
          </span>
        </section>

        {/* ---- 1 · a computer sees numbers ---------------------------- */}
        <section className="st-sec" ref={setSec(1)} aria-labelledby="st-h1">
          <div className="st-copy" ref={setCopy(1)}>
            <p className="st-kicker">01 · Kompyuter nimani koʻradi</p>
            <h2 id="st-h1">Kompyuter harflarni koʻrmaydi.</h2>
            <p>
              U faqat sonlarni koʻradi. Siz yozgan har bir harf kompyuter uchun
              bitta son. ChatGPT ham gapingizni aynan shu sonlardan oʻqishni
              boshlaydi.
            </p>

            <label className="st-try" htmlFor="st-word">
              <span>Biror soʻz yozing — yulduzlar uni yozadi</span>
              <input
                id="st-word"
                value={word}
                maxLength={12}
                spellCheck={false}
                autoComplete="off"
                onChange={(e) => setWord(e.target.value)}
              />
            </label>

            <ul className="st-bytes" aria-label="Harflar va ularning sonlari">
              {chars.map((c, i) => (
                <li key={i} data-wide={c.bytes.length > 1 || undefined}>
                  <b>{c.ch === " " ? "␣" : c.ch}</b>
                  <i>{c.bytes.join(" ")}</i>
                </li>
              ))}
            </ul>

            <p className="st-note">
              «ʻ» belgisi (oʻ va gʻ dagi) bitta emas, ikkita son oladi.
              Oʻzbekcha matn kompyuter uchun shu sababli ham «uzunroq».
            </p>
          </div>
        </section>

        {/* ---- 2 · tokens --------------------------------------------- */}
        <section className="st-sec" ref={setSec(2)} aria-labelledby="st-h2">
          <div className="st-copy" ref={setCopy(2)}>
            <p className="st-kicker">02 · Tokenlar</p>
            <h2 id="st-h2">Model soʻzni boʻlaklarga boʻladi.</h2>
            <p>
              Sonlarni bittalab oʻqish juda sekin. Shuning uchun model tez-tez
              birga keladigan harflarni bitta boʻlakka birlashtiradi. Bu
              boʻlaklar <em>token</em> deyiladi. Qaysi harflar birlashishini
              tokenizator hal qiladi.
            </p>

            <label className="st-try" htmlFor="st-tok">
              <span>Soʻz yozing — tokenizator uni boʻlaklarga boʻladi</span>
              <input
                id="st-tok"
                value={tokWord}
                maxLength={28}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                onChange={(e) => setTokWord(e.target.value)}
              />
            </label>

            <div className="st-tokens" aria-live="polite">
              {tokens ? (
                tokens.list.map((t, i) => (
                  <span key={`${tokens.word}-${i}`} data-c={i % 3}>
                    <b>{t.text.replace(/ /g, "␣")}</b>
                    <i>{t.id}</i>
                  </span>
                ))
              ) : (
                <span className="st-wait">tokenizator yuklanmoqda…</span>
              )}
            </div>
            {tokens && tokens.word && (
              <p className="st-note">
                «{tokens.word}» — {tokens.list.length}{" "}
                {tokens.list.length === 1 ? "boʻlak: butun soʻz lugʻatda bor" : "boʻlak"}.{" "}
                {tokens.source === "hub"
                  ? "Buni kurs oxirida oʻzingiz quradigan tokenizator — Hugging Face'dagi uzbek-bpe-16k — hozir brauzeringizda boʻldi."
                  : "Hugging Face'ga ulanib boʻlmadi, shuning uchun shu sahifada oʻqitilgan kichik tokenizator boʻldi."}{" "}
                Yana sinang:{" "}
                {TRY_WORDS.filter((w) => w !== tokens.word)
                  .slice(0, 2)
                  .map((w, i) => (
                    <span key={w}>
                      {i > 0 && ", "}
                      <button type="button" className="st-link" onClick={() => setTokWord(w)}>
                        {w}
                      </button>
                    </span>
                  ))}
                .
              </p>
            )}
            <p>
              Kursning birinchi qismi aynan shu: tokenizatorni noldan, oʻz
              qoʻlingiz bilan yozasiz.
            </p>
          </div>
        </section>

        {/* ---- 3 · why a tokenizer of our own ------------------------ */}
        <section
          className="st-sec"
          ref={(el) => {
            secRefs.current[3] = el;
            compareRef.current = el;
          }}
          aria-labelledby="st-h3"
        >
          <div className="st-copy" ref={setCopy(3)}>
            <p className="st-kicker">03 · Nega oʻzbek tili</p>
            <h2 id="st-h3">Mashhur modellar oʻzbekchani qimmatga oʻqiydi.</h2>
            <p>
              Katta modellar asosan ingliz tilidagi matnlarda oʻrgatilgan.
              Ularning tokenizatori oʻzbekcha gapni juda mayda boʻlaklarga
              boʻlib yuboradi. Koʻproq token degani — har bir soʻrov qimmatroq,
              javob sekinroq va model bir vaqtning oʻzida kamroq matnni sigʻdira
              oladi.
            </p>

            <figure className="st-measure">
              <figcaption>
                Bir xil gap: <q>{PROBE}</q>
              </figcaption>
              {shown.status === "ok" || shown.status === "local" ? (
                <>
                  {[
                    {
                      label:
                        shown.status === "ok"
                          ? "GPT-2 · ingliz tili uchun oʻqitilgan"
                          : "Baytlar · tokenizatorsiz",
                      n: shown.top,
                      c: "ember",
                    },
                    {
                      label:
                        shown.status === "ok"
                          ? "uzbek-bpe-16k · oʻzbek tili uchun"
                          : "Brauzerda oʻqitilgan tokenizator",
                      n: shown.bottom,
                      c: "ice",
                    },
                  ].map((row) => (
                    <div className="st-measure__row" data-c={row.c} key={row.label}>
                      <span>{row.label}</span>
                      <b>
                        {row.n} <i>token</i>
                      </b>
                      <em aria-hidden="true">
                        <s style={{ transform: `scaleX(${row.n / maxRow})` }} />
                      </em>
                    </div>
                  ))}
                  <p className="st-measure__src">
                    {shown.status === "ok"
                      ? "Hozir oʻlchandi: ikkala tokenizator Hugging Face'dan yuklab olinib, brauzeringizda ishga tushirildi."
                      : "Hugging Face'ga ulanib boʻlmadi, shuning uchun shu brauzerdagi tokenizator bilan oʻlchandi."}
                  </p>
                </>
              ) : (
                <p className="st-wait">
                  {measure.status === "loading" ? "oʻlchanmoqda…" : "pastga suring — oʻlchaymiz"}
                </p>
              )}
            </figure>

            <p>
              Buni hech kim biz uchun tuzatib bermaydi. Tilni biladigan va
              modelni ichidan tushunadigan muhandislar tuzatadi. Noldan —
              shunday muhandislar uchun.
            </p>
          </div>
        </section>

        {/* ---- 4 · training ------------------------------------------ */}
        <section className="st-sec" ref={setSec(4)} aria-labelledby="st-h4">
          <div className="st-copy" ref={setCopy(4)}>
            <p className="st-kicker">04 · Oʻqitish</p>
            <h2 id="st-h4">Taxmin qil. Xatoni oʻlcha. Tuzat. Yana.</h2>
            <p>
              Til modeli bitta oddiy oʻyinni milliardlab marta oʻynaydi: gapning
              keyingi boʻlagini taxmin qiladi, qanchalik adashganini oʻlchaydi
              va ichidagi sonlarni biroz toʻgʻrilaydi. Uning butun «bilimi» —
              shu takrorlanishdan.
            </p>
            <ol className="st-loop" aria-label="Oʻqitish sikli">
              <li>taxmin</li>
              <li>xato</li>
              <li>tuzatish</li>
              <li>takror</li>
            </ol>
            <p className="st-note">
              Shu yoʻl bilan oʻqitilgan model — <b>uzbek-gpt-103m</b>:{" "}
              {FACTS.params} million son (parametr), oʻqitish narxi jami $
              {FACTS.cost.toFixed(2)}.
            </p>
          </div>
        </section>

        {/* ---- 5 · your own model ------------------------------------ */}
        <section className="st-sec st-final" ref={setSec(5)} aria-labelledby="st-h5">
          <div className="st-copy" ref={setCopy(5)}>
            <p className="st-kicker">05 · Natija</p>
            <h2 id="st-h5">
              Oʻz modelingiz.
              <br />
              Oʻz tilingizda.
            </h2>
            <p>
              Kurs oxirida sizda birovning API kaliti emas — oʻzingiz yozgan va
              oʻqitgan model boʻladi. Uni Hugging Face'da nashr qilasiz va
              dunyodagi istalgan odam yuklab olishi mumkin.
            </p>

            <ol className="st-path">
              {tokCourse && (
                <li>
                  <b>{tokCourse.name}</b>
                  <span>
                    {tokCourse.lessons.length} dars tayyor ·{" "}
                    {tokCourse.access === "free" ? "bepul" : "pullik"}
                  </span>
                </li>
              )}
              {gptCourse && (
                <li>
                  <b>{gptCourse.name}</b>
                  <span>
                    {gptCourse.lessons.length > 0
                      ? `${gptCourse.lessons.length} dars · ${readyCount(gptCourse)} tasi tayyor`
                      : "tez orada"}
                  </span>
                </li>
              )}
              <li>
                <b>Oʻz modelingiz</b>
                <span>Hugging Face'da nashr</span>
              </li>
            </ol>

            {firstLesson && (
              <p className="st-first">
                <b>Hech qachon kod yozmaganmisiz?</b> Birinchi dars —
                «{firstLesson.title}» — aynan siz uchun: birinchi dasturingizni
                yozasiz va birinchi xatoyingizni oʻqishni oʻrganasiz.
              </p>
            )}

            <div className="st-actions">
              <Link className="st-btn st-btn--lg" to="/learn">
                Birinchi darsni boshlash
                <span aria-hidden="true">→</span>
              </Link>
              <Link className="st-btn st-btn--ghost" to="/playground">
                Mashq maydonida sinab koʻrish
              </Link>
            </div>

            <p className="st-arts">
              Nashr qilingan:{" "}
              {ARTIFACTS.map((a, i) => (
                <span key={a.name}>
                  {i > 0 && " · "}
                  <a href={a.href} target="_blank" rel="noopener noreferrer">
                    {a.name} ↗
                  </a>
                </span>
              ))}
            </p>
          </div>
        </section>
      </main>

      <footer className="st-foot">
        <span>Noldan · Oʻzbekiston va Markaziy Osiyo uchun</span>
        <a href={HF_USER} target="_blank" rel="noopener noreferrer">
          huggingface.co/IslombekT
        </a>
      </footer>
    </div>
  );
}

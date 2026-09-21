import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "@fontsource-variable/geist-mono";
import {
  DEMO_CORPUS,
  PROBE,
  encode as encodeBpe,
  trainBPE,
  type BpeModel,
} from "../lib/bpe";
import { PRESETS, encode as encodeHub, loadFromHub } from "../lib/hf-tokenizer";
import { ARTIFACTS, DEMO_VOCAB, FACTS, HF_USER } from "../home/content";
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

   Nothing drawn as a measurement is invented. The word is whatever the
   reader types. The tokens come from a tokenizer that trains in this
   browser when the page opens. The comparison downloads GPT-2's and the
   course's own tokenizer from Hugging Face and counts, live.
   ==================================================================== */

const TOKEN_WORD = "oʻrganamiz";
const enc = new TextEncoder();

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

function wordDef(w: string, K: number): Def {
  const bytes = Array.from(enc.encode(w));
  const shown = bytes.slice(0, 6).join(" ") + (bytes.length > 6 ? " …" : "");
  const built = lines(
    K,
    [
      { parts: [{ text: w, group: 0 }], px: 200, gap: 0 },
      { parts: [{ text: shown, group: 1 }], px: 74, gap: 0 },
    ],
    { maxW: 2.35, maxH: 1.6, color: (g) => (g === 1 ? 2 : NO_COLOR) }
  );
  return {
    kind: "space",
    pts: built.pts,
    colors: built.colors,
    rot: (t) => [Math.sin(t * 0.35) * 0.1, Math.sin(t * 0.27) * 0.06, 0],
  };
}

function tokenDef(tokens: string[], K: number): Def {
  const built = lines(
    K,
    [{ parts: tokens.slice(0, 10).map((text, group) => ({ text, group })), px: 190, gap: 0.5 }],
    { maxW: 2.35, maxH: 1.0, color: (g) => [2, 1, 0][g % 3] }
  );
  return {
    kind: "space",
    pts: built.pts,
    colors: built.colors,
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
  const [model, setModel] = useState<BpeModel | null>(null);
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

  /* Training blocks the main thread for a few hundred milliseconds, so
     it waits until the first frame is on screen. */
  useEffect(() => {
    const id = window.setTimeout(
      () => setModel(trainBPE(DEMO_CORPUS, DEMO_VOCAB, PROBE)),
      140
    );
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
      const secs = secRefs.current;
      const vh = innerHeight;
      const vc = vh * 0.5;
      const centers = secs.map((s) => {
        if (!s) return 0;
        const r = s.getBoundingClientRect();
        return r.top + r.height * 0.5;
      });
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
        el.style.opacity = o.toFixed(3);
        el.style.pointerEvents = o < 0.2 ? "none" : "";
        if (!reduced) el.style.transform = `translate3d(0, ${(d * -36).toFixed(1)}px, 0)`;
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

  /* ---- 2: tokens --------------------------------------------------------- */
  const tokens = useMemo(
    () => (model ? encodeBpe(TOKEN_WORD, model) : null),
    [model]
  );
  useEffect(() => {
    if (!fonts) return;
    const pieces = tokens ? tokens.map((t) => t.text) : [TOKEN_WORD];
    fieldRef.current?.setDef(2, tokenDef(pieces, K));
  }, [fonts, tokens, K]);

  /* ---- 3: measured, not asserted ---------------------------------------- */
  const compareRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = compareRef.current;
    if (!el) return;
    let started = false;
    const ctrl = new AbortController();
    const io = new IntersectionObserver(
      async (entries) => {
        if (started || !entries.some((e) => e.isIntersecting)) return;
        started = true;
        io.disconnect();
        setMeasure({ status: "loading" });
        const gpt = PRESETS.find((p) => p.id === "gpt2")!;
        const uz = PRESETS.find((p) => p.id === "uzbek")!;
        try {
          const [a, b] = await Promise.all([
            loadFromHub(gpt.repo, gpt.label, ctrl.signal),
            loadFromHub(uz.repo, uz.label, ctrl.signal),
          ]);
          setMeasure({
            status: "ok",
            top: encodeHub(PROBE, a).length,
            bottom: encodeHub(PROBE, b).length,
          });
        } catch {
          if (!ctrl.signal.aborted) setMeasure({ status: "local", top: 0, bottom: 0 });
        }
      },
      // Start downloading well before the section arrives, so the numbers
      // are usually there by the time anyone reads them.
      { rootMargin: "120% 0px 120% 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      ctrl.abort();
    };
  }, []);

  /* Offline, the comparison falls back to something this browser can
     still measure honestly: raw bytes against the tokenizer it trained. */
  const shown = useMemo(() => {
    if (measure.status === "ok") return measure;
    if (measure.status === "local") {
      return {
        status: "local" as const,
        top: enc.encode(PROBE).length,
        bottom: model ? encodeBpe(PROBE, model).length : 0,
      };
    }
    return measure;
  }, [measure, model]);

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

            <div className="st-tokens" aria-live="polite">
              {tokens ? (
                tokens.map((t, i) => (
                  <span key={i} data-c={i % 3}>
                    <b>{t.text}</b>
                    <i>{t.id}</i>
                  </span>
                ))
              ) : (
                <span className="st-wait">tokenizator oʻqitilmoqda…</span>
              )}
            </div>
            <p className="st-note">
              «{TOKEN_WORD}» shunday boʻlindi — buni hozirgina, shu sahifada,
              brauzeringizda oʻqitilgan tokenizator qildi.
              {tokens?.[0]?.text === "oʻrgan" &&
                " Eʼtibor bering: soʻz oʻzagi «oʻrgan» alohida chiqdi."}
            </p>
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

import { useMemo, useState } from "react";
import { Play, RotateCcw, SkipForward } from "lucide-react";
import "./Viz.css";

/* ====================================================================
   Interactive lesson visuals.

   Every one of these runs the REAL computation the lesson describes —
   nothing is faked or pre-baked. A student can type Uzbek text and watch
   the actual bytes, step the actual BPE merges, drag actual logits
   through softmax. Seeing it move is the point.

   Registered by id at the bottom; lessons reference them with
   `{ kind: "viz", id: "..." }`.
   ==================================================================== */

const enc = new TextEncoder();

function Frame({
  title,
  hint,
  children,
  controls,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
  controls?: React.ReactNode;
}) {
  return (
    <figure className="vz">
      <div className="vz__bar">
        <span className="vz__title">{title}</span>
        {controls}
      </div>
      <div className="vz__body">{children}</div>
      {hint && <figcaption className="vz__hint">{hint}</figcaption>}
    </figure>
  );
}

/* ---------- 1. bytes: chars vs bytes, Uzbek okina is 2 bytes -------- */
export function ByteViz() {
  const [text, setText] = useState("oʻzbek tili");
  const chars = useMemo(() => Array.from(text), [text]);
  const bytes = useMemo(() => Array.from(enc.encode(text)), [text]);

  return (
    <Frame
      title="Belgi va bayt"
      hint="Har bir belgi ostida uning baytlari. Yashil ramka — bitta belgi bir necha bayt egallagan."
    >
      <input
        className="vz__input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        aria-label="Matn kiriting"
      />

      <div className="bv__row">
        {chars.map((ch, i) => {
          const b = Array.from(enc.encode(ch));
          const multi = b.length > 1;
          return (
            <div className={`bv__cell${multi ? " is-multi" : ""}`} key={i}>
              <span className="bv__char">{ch === " " ? "␣" : ch}</span>
              <span className="bv__bytes">
                {b.map((n, j) => (
                  <span className="bv__byte" key={j}>
                    {n}
                  </span>
                ))}
              </span>
            </div>
          );
        })}
      </div>

      <div className="vz__stats">
        <span>
          <b>{chars.length}</b> belgi
        </span>
        <span>
          <b>{bytes.length}</b> bayt
        </span>
        <span className={bytes.length > chars.length ? "is-warn" : ""}>
          farq: <b>+{bytes.length - chars.length}</b>
        </span>
      </div>
    </Frame>
  );
}

/* ---------- 2. pair counting (get_stats) ---------------------------- */
export function PairViz() {
  const [text] = useState("salomsalom");
  const ids = useMemo(() => Array.from(enc.encode(text)), [text]);
  const [at, setAt] = useState(0); // sliding window position

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (let i = 0; i < Math.min(at, ids.length - 1); i++) {
      const k = `${ids[i]},${ids[i + 1]}`;
      m.set(k, (m.get(k) ?? 0) + 1);
    }
    return m;
  }, [ids, at]);

  const done = at >= ids.length - 1;
  const top = useMemo(() => {
    let best: string | null = null;
    let n = 0;
    counts.forEach((v, k) => {
      if (v > n) {
        n = v;
        best = k;
      }
    });
    return best ? { pair: best, n } : null;
  }, [counts]);

  return (
    <Frame
      title="get_stats — juftliklarni sanash"
      hint={`"${text}" baytlari ustida oyna yuradi va har bir qoʻshni juftlikni sanaydi.`}
      controls={
        <span className="vz__ctrls">
          <button
            type="button"
            className="vz__btn"
            onClick={() => setAt((a) => Math.min(a + 1, ids.length - 1))}
            disabled={done}
          >
            <SkipForward size={13} strokeWidth={2.2} aria-hidden="true" />
            Qadam
          </button>
          <button type="button" className="vz__btn" onClick={() => setAt(0)}>
            <RotateCcw size={13} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </span>
      }
    >
      <div className="pv__ids">
        {ids.map((n, i) => {
          const inWindow = i === at || i === at + 1;
          return (
            <span className={`pv__id${inWindow && !done ? " is-on" : ""}`} key={i}>
              {n}
            </span>
          );
        })}
      </div>

      <div className="pv__counts">
        {counts.size === 0 && <span className="vz__empty">Qadam bosing…</span>}
        {[...counts.entries()].map(([k, v]) => (
          <span className={`pv__tally${top?.pair === k ? " is-top" : ""}`} key={k}>
            <span className="pv__pair">({k})</span>
            <span className="pv__n">{v}</span>
          </span>
        ))}
      </div>

      {done && top && (
        <p className="vz__result">
          Eng koʻp uchragan juftlik: <b>({top.pair})</b> — {top.n} marta. Keyingi
          darsda aynan shuni birlashtiramiz.
        </p>
      )}
    </Frame>
  );
}

/* ---------- 3. the merge loop (train) ------------------------------- */
type Step = { ids: number[]; pair: [number, number]; idx: number; label: string };

export function MergeViz() {
  const source = "salom dunyo salom dunyo";
  const base = useMemo(() => Array.from(enc.encode(source)), []);

  // Run the real BPE training once and record every step.
  const steps = useMemo(() => {
    const out: Step[] = [];
    let ids = base.slice();
    const vocab = new Map<number, string>();
    for (let i = 0; i < 256; i++) vocab.set(i, String.fromCharCode(i));

    for (let s = 0; s < 8; s++) {
      const counts = new Map<string, number>();
      for (let i = 0; i < ids.length - 1; i++) {
        const k = `${ids[i]},${ids[i + 1]}`;
        counts.set(k, (counts.get(k) ?? 0) + 1);
      }
      let bestK: string | null = null;
      let bestN = 1;
      counts.forEach((v, k) => {
        if (v > bestN) {
          bestN = v;
          bestK = k;
        }
      });
      if (!bestK) break;
      const [a, b] = (bestK as string).split(",").map(Number);
      const idx = 256 + s;
      vocab.set(idx, (vocab.get(a) ?? "") + (vocab.get(b) ?? ""));
      const next: number[] = [];
      let i = 0;
      while (i < ids.length) {
        if (i < ids.length - 1 && ids[i] === a && ids[i + 1] === b) {
          next.push(idx);
          i += 2;
        } else {
          next.push(ids[i]);
          i += 1;
        }
      }
      ids = next;
      out.push({ ids: ids.slice(), pair: [a, b], idx, label: vocab.get(idx) ?? "" });
    }
    return out;
  }, [base]);

  const [n, setN] = useState(0);
  const ids = n === 0 ? base : steps[n - 1].ids;

  return (
    <Frame
      title="Oʻqitish tsikli — har qadamda bitta birlashma"
      hint={`"${source}" — har qadamda eng koʻp uchragan juftlik bitta yangi tokenga aylanadi.`}
      controls={
        <span className="vz__ctrls">
          <button
            type="button"
            className="vz__btn"
            onClick={() => setN((v) => Math.min(v + 1, steps.length))}
            disabled={n >= steps.length}
          >
            <Play size={12} strokeWidth={2.4} aria-hidden="true" />
            Birlashtir
          </button>
          <button type="button" className="vz__btn" onClick={() => setN(0)}>
            <RotateCcw size={13} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </span>
      }
    >
      <div className="mv__ids">
        {ids.map((v, i) => (
          <span className={`mv__tok${v > 255 ? " is-new" : ""}`} key={`${i}-${v}`}>
            {v}
          </span>
        ))}
      </div>

      <div className="vz__stats">
        <span>
          uzunlik: <b>{ids.length}</b>
        </span>
        <span>
          birlashma: <b>{n}</b>
        </span>
        <span className={ids.length < base.length ? "is-good" : ""}>
          boshlangʻich <b>{base.length}</b> →{" "}
          <b>{(base.length / ids.length).toFixed(2)}×</b> qisqardi
        </span>
      </div>

      {n > 0 && (
        <ol className="mv__rules">
          {steps.slice(0, n).map((s, i) => (
            <li key={i}>
              <span className="mv__rule-n">{i + 1}</span>
              <code>
                ({s.pair[0]}, {s.pair[1]}) → {s.idx}
              </code>
              <span className="mv__rule-txt">“{s.label}”</span>
            </li>
          ))}
        </ol>
      )}
    </Frame>
  );
}

/* ---------- 4. tensor shape (B, T) ---------------------------------- */
export function TensorViz() {
  const [B, setB] = useState(2);
  const [T, setT] = useState(4);

  return (
    <Frame
      title="Tensor shakli — (B, T)"
      hint="B = nechta ketma-ketlik (qator), T = har birida nechta token (ustun). GPT ga aynan shu shakl kiradi."
    >
      <div className="vz__sliders">
        <label>
          B = <b>{B}</b>
          <input
            type="range"
            min={1}
            max={5}
            value={B}
            onChange={(e) => setB(+e.target.value)}
          />
        </label>
        <label>
          T = <b>{T}</b>
          <input
            type="range"
            min={1}
            max={8}
            value={T}
            onChange={(e) => setT(+e.target.value)}
          />
        </label>
      </div>

      <div className="tv__grid" style={{ gridTemplateColumns: `repeat(${T}, 1fr)` }}>
        {Array.from({ length: B * T }).map((_, i) => (
          <span className="tv__cell" key={i}>
            {((i * 7 + 3) % 51).toString()}
          </span>
        ))}
      </div>

      <p className="vz__result">
        <code>torch.Size([{B}, {T}])</code> — {B} qator, {T} ustun, jami{" "}
        <b>{B * T}</b> token ID.
      </p>
    </Frame>
  );
}

/* ---------- 5. embedding lookup ------------------------------------- */
export function EmbedViz() {
  const DIM = 6;
  const VOCAB = 12;
  const [picked, setPicked] = useState(4);

  // Deterministic pseudo-random table so the lesson looks the same each visit.
  const table = useMemo(() => {
    const rows: number[][] = [];
    for (let r = 0; r < VOCAB; r++) {
      const row: number[] = [];
      for (let c = 0; c < DIM; c++) {
        const s = Math.sin((r + 1) * 12.9898 + (c + 1) * 78.233) * 43758.5453;
        row.push(+((s - Math.floor(s)) * 2 - 1).toFixed(2));
      }
      rows.push(row);
    }
    return rows;
  }, []);

  return (
    <Frame
      title="Embedding — ID dan vektorga"
      hint="Token ID bu jadvalning qator raqami. Model ID ni emas, shu qatordagi sonlarni oʻqiydi."
    >
      <div className="ev__wrap">
        <div className="ev__table">
          {table.map((row, r) => (
            <button
              type="button"
              className={`ev__row${r === picked ? " is-on" : ""}`}
              key={r}
              onClick={() => setPicked(r)}
            >
              <span className="ev__id">{r}</span>
              <span className="ev__vec">
                {row.map((v, c) => (
                  <span
                    className="ev__bar"
                    key={c}
                    style={{
                      // negative grows left, positive right, from the centre
                      background: v >= 0 ? "var(--accent)" : "var(--dim)",
                      height: `${Math.abs(v) * 100}%`,
                      opacity: r === picked ? 1 : 0.32,
                    }}
                    title={String(v)}
                  />
                ))}
              </span>
            </button>
          ))}
        </div>
      </div>

      <p className="vz__result">
        ID <b>{picked}</b> →{" "}
        <code>[{table[picked].map((v) => v.toFixed(2)).join(", ")}]</code> — {DIM} oʻlchovli
        vektor.
      </p>
    </Frame>
  );
}

/* ---------- 6. softmax --------------------------------------------- */
export function SoftmaxViz() {
  const [logits, setLogits] = useState([2.0, 1.0, 0.1, -0.5]);
  const names = ["non", "suv", "kitob", "olma"];

  const probs = useMemo(() => {
    const m = Math.max(...logits);
    const ex = logits.map((l) => Math.exp(l - m));
    const s = ex.reduce((a, b) => a + b, 0);
    return ex.map((e) => e / s);
  }, [logits]);

  const sum = probs.reduce((a, b) => a + b, 0);

  return (
    <Frame
      title="Softmax — logitdan ehtimolga"
      hint="Slayderni suring. Softmax har qanday sonlarni musbat qiladi va yigʻindisini aniq 1 ga keltiradi."
    >
      <div className="sv__rows">
        {logits.map((l, i) => (
          <div className="sv__row" key={i}>
            <span className="sv__name">{names[i]}</span>
            <input
              type="range"
              min={-3}
              max={4}
              step={0.1}
              value={l}
              onChange={(e) => {
                const next = logits.slice();
                next[i] = +e.target.value;
                setLogits(next);
              }}
              aria-label={`${names[i]} logit`}
            />
            <span className="sv__logit">{l.toFixed(1)}</span>
            <span className="sv__track">
              <span className="sv__fill" style={{ width: `${probs[i] * 100}%` }} />
            </span>
            <span className="sv__pct">{(probs[i] * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
      <p className="vz__result">
        Yigʻindi: <b>{sum.toFixed(4)}</b> — har doim 1. Eng katta logit eng katta
        ehtimolni oladi, lekin qolganlari ham nolga teng emas.
      </p>
    </Frame>
  );
}

/* ---------- 7. causal attention ------------------------------------ */
export function AttentionViz() {
  const tokens = ["men", "non", "sotib", "oldim", "va", "yedim"];
  const T = tokens.length;
  const [row, setRow] = useState(T - 1);

  // Deterministic "scores", then a real causal softmax per row.
  const weights = useMemo(() => {
    const out: number[][] = [];
    for (let q = 0; q < T; q++) {
      const raw: number[] = [];
      for (let k = 0; k < T; k++) {
        if (k > q) {
          raw.push(-Infinity); // causal mask: cannot see the future
        } else {
          const s = Math.sin((q + 2) * 3.1 + (k + 1) * 1.7) * 1.6 + (k === q ? 1.1 : 0);
          raw.push(s);
        }
      }
      const m = Math.max(...raw.filter((v) => Number.isFinite(v)));
      const ex = raw.map((v) => (Number.isFinite(v) ? Math.exp(v - m) : 0));
      const sum = ex.reduce((a, b) => a + b, 0);
      out.push(ex.map((e) => e / sum));
    }
    return out;
  }, [T]);

  return (
    <Frame
      title="Kauzal attention — kim kimga qaraydi"
      hint="Qatorni tanlang. Har bir token faqat oʻzidan oldingilarga qaray oladi — kelajak berkitilgan."
    >
      <div className="av__grid" style={{ gridTemplateColumns: `92px repeat(${T}, 1fr)` }}>
        <span />
        {tokens.map((t, i) => (
          <span className="av__col" key={i}>
            {t}
          </span>
        ))}

        {weights.map((wr, q) => (
          <div className="av__line" key={q} style={{ display: "contents" }}>
            <button
              type="button"
              className={`av__rowlab${q === row ? " is-on" : ""}`}
              onClick={() => setRow(q)}
            >
              {tokens[q]}
            </button>
            {wr.map((w, k) => (
              <span
                className={`av__cell${k > q ? " is-masked" : ""}${q === row ? " is-active" : ""}`}
                key={k}
                style={
                  k > q
                    ? undefined
                    : { background: `rgba(5, 150, 105, ${(0.08 + w * 0.9).toFixed(3)})` }
                }
                title={k > q ? "berkitilgan" : w.toFixed(3)}
              >
                {k > q ? "" : w >= 0.1 ? w.toFixed(2) : ""}
              </span>
            ))}
          </div>
        ))}
      </div>

      <p className="vz__result">
        <b>“{tokens[row]}”</b> tokeni{" "}
        {weights[row]
          .map((w, k) => ({ w, k }))
          .filter((x) => x.w > 0.12)
          .sort((a, b) => b.w - a.w)
          .map((x) => `“${tokens[x.k]}” (${(x.w * 100).toFixed(0)}%)`)
          .join(", ")}{" "}
        ga eng koʻp eʼtibor beradi. Yigʻindi har qatorda 1.
      </p>
    </Frame>
  );
}


/* ---------- 8. regex pre-split ------------------------------------- */
export function SplitViz() {
  const [text, setText] = useState("Oʻzbekiston 2024-yilda 5 ta shahar qurdi!");

  // The same GPT-2 style split as the lesson, expressed with JS Unicode
  // property escapes so it runs live in the browser.
  const pieces = useMemo(() => {
    const re = /\p{L}+|\p{N}+|[^\s\p{L}\p{N}]+|\s+/gu;
    const out: Array<{ s: string; kind: string }> = [];
    for (const m of text.matchAll(re)) {
      const s = m[0];
      const kind = /^\s+$/.test(s)
        ? "space"
        : /^\p{L}/u.test(s)
          ? "letter"
          : /^\p{N}/u.test(s)
            ? "digit"
            : "punct";
      out.push({ s, kind });
    }
    // Attach a leading space to the following piece, GPT-2 style.
    const merged: Array<{ s: string; kind: string }> = [];
    for (let i = 0; i < out.length; i++) {
      const cur = out[i];
      if (cur.kind === "space" && out[i + 1] && cur.s === " ") {
        merged.push({ s: " " + out[i + 1].s, kind: out[i + 1].kind });
        i++;
      } else {
        merged.push(cur);
      }
    }
    return merged;
  }, [text]);

  const labels: Record<string, string> = {
    letter: "harf",
    digit: "raqam",
    punct: "punktuatsiya",
    space: "boʻsh joy",
  };

  return (
    <Frame
      title="Regex bilan boʻlish"
      hint="BPE har bir boʻlak ICHIDA ishlaydi. Shuning uchun merge hech qachon soʻz chegarasini kesib oʻtmaydi."
    >
      <input
        className="vz__input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        aria-label="Matn kiriting"
      />
      <div className="sp__row">
        {pieces.map((p, i) => (
          <span className={`sp__piece sp__piece--${p.kind}`} key={i}>
            <span className="sp__txt">{p.s.replace(/ /g, "␣")}</span>
            <span className="sp__kind">{labels[p.kind]}</span>
          </span>
        ))}
      </div>
      <div className="vz__stats">
        <span>
          <b>{pieces.length}</b> boʻlak
        </span>
        <span>
          harf: <b>{pieces.filter((p) => p.kind === "letter").length}</b>
        </span>
        <span>
          raqam: <b>{pieces.filter((p) => p.kind === "digit").length}</b>
        </span>
        <span>
          punktuatsiya: <b>{pieces.filter((p) => p.kind === "punct").length}</b>
        </span>
      </div>
    </Frame>
  );
}

/* ---------- registry ------------------------------------------------ */
export const VIZ: Record<string, () => React.ReactElement> = {
  bytes: ByteViz,
  pairs: PairViz,
  merge: MergeViz,
  tensor: TensorViz,
  embed: EmbedViz,
  softmax: SoftmaxViz,
  attention: AttentionViz,
  split: SplitViz,
};

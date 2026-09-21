import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Check, Copy, Keyboard, Lock, RotateCcw } from "lucide-react";
import { Python, pythonTokens } from "../lib/highlight";
import "./TypeCode.css";

/* ====================================================================
   Code you have to type to copy.

   The code is shown as a pale placeholder. The student types over it,
   character by character, the way typing trainers work: a correct
   character takes its real syntax colour, a wrong one turns red and
   stays red until they backspace and fix it. Only once the whole block
   is typed correctly does "Nusxa olish" unlock.

   Two things make this fair on a real keyboard:

     · characters that no standard keyboard has are accepted from the
       keys students actually press — `ʻ` from ', ‘ or `, an em dash
       from -, curly quotes from straight ones (phones insert those) —
       and ones with no key at all (漢, 😀, an arrow in a comment) from
       any key;

     · indentation after a line break is filled in automatically, as
       an editor would, so the exercise is about the code, not about
       counting spaces.

   Pasting is refused — that is the point. A finished block is
   remembered in this browser, so coming back to a lesson does not mean
   typing it all again.
   ==================================================================== */

const EQUIV: Record<string, string> = {
  "ʻ": "'`‘’ʼ´",
  "ʼ": "'`‘’ʻ´",
  "‘": "'`’ʻʼ",
  "’": "'`‘ʻʼ",
  "'": "‘’ʻʼ`",
  '"': "“”„«»",
  "“": '"”„',
  "”": '"“„',
  "—": "-–",
  "–": "-—",
};

/* Past Latin, anything without a stand-in above — a Chinese character,
   an emoji, an arrow, Cyrillic on a Latin layout — has no key to press,
   so any key types it. Otherwise a lesson about Unicode could never be
   finished. */
const typeable = (ch: string) => (ch.codePointAt(0) ?? 0) <= 0x024f || ch in EQUIV;

const accepts = (want: string, got: string) =>
  want === got || (EQUIV[want]?.includes(got) ?? false) || !typeable(want);

/** 0 untyped · 1 correct · 2 wrong · 3 filled in automatically */
type Mark = 0 | 1 | 2 | 3;

type State = { marks: Mark[]; pos: number; keys: number; wrong: number; start: number; end: number };

type Action =
  | { type: "char"; ch: string }
  | { type: "tab" }
  | { type: "back" }
  | { type: "backWord" }
  | { type: "reset" };

function hash(s: string) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}

const KIND_CLASS: Record<string, string> = {
  kw: "py-kw",
  str: "py-str",
  num: "py-num",
  com: "py-com",
  fn: "py-fn",
  builtin: "py-builtin",
  op: "py-op",
  plain: "",
};

export default function TypeCode({ code, lang = "python" }: { code: string; lang?: string }) {
  const chars = useMemo(() => Array.from(code), [code]);
  const kinds = useMemo(() => {
    const out: string[] = [];
    for (const t of pythonTokens(code)) for (const _ of Array.from(t.t)) out.push(t.k);
    return out;
  }, [code]);
  const storeKey = `noldan.typed.${hash(code)}`;

  const fresh = useCallback(
    (): State => ({ marks: new Array(chars.length).fill(0), pos: 0, keys: 0, wrong: 0, start: 0, end: 0 }),
    [chars.length]
  );

  const reducer = (s: State, a: Action): State => {
    const n = chars.length;
    if (a.type === "reset") return fresh();

    if (a.type === "back" || a.type === "backWord") {
      if (s.pos === 0) return s;
      const marks = s.marks.slice();
      let pos = s.pos;
      const stepBack = () => {
        while (pos > 0 && marks[pos - 1] === 3) marks[--pos] = 0;
        if (pos > 0) marks[--pos] = 0;
      };
      stepBack();
      if (a.type === "backWord") while (pos > 0 && !/\s/.test(chars[pos - 1])) stepBack();
      return { ...s, marks, pos, end: 0 };
    }

    if (s.pos >= n) return s;
    const marks = s.marks.slice();
    let pos = s.pos;
    let ok = true;

    if (a.type === "tab") {
      if (chars[pos] === " ") while (pos < n && chars[pos] === " ") marks[pos++] = 1;
      else {
        ok = false;
        marks[pos++] = 2;
      }
    } else {
      ok = accepts(chars[pos], a.ch);
      marks[pos++] = ok ? 1 : 2;
      // After a line break, the editor would indent for you.
      if (chars[pos - 1] === "\n") while (pos < n && chars[pos] === " ") marks[pos++] = 3;
    }

    const now = performance.now();
    const finished = pos >= n && !marks.includes(2);
    return {
      marks,
      pos,
      keys: s.keys + 1,
      wrong: s.wrong + (ok ? 0 : 1),
      start: s.start || now,
      end: finished ? now : 0,
    };
  };

  const [s, dispatch] = useReducer(reducer, undefined, () => {
    try {
      if (localStorage.getItem(storeKey) === "1") {
        return { marks: new Array(chars.length).fill(1), pos: chars.length, keys: 0, wrong: 0, start: 0, end: 1 };
      }
    } catch {
      /* storage blocked: start fresh */
    }
    return fresh();
  });

  const [focused, setFocused] = useState(false);
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [, tick] = useState(0);
  const ta = useRef<HTMLTextAreaElement | null>(null);

  const errors = s.marks.reduce((n, m) => n + (m === 2 ? 1 : 0), 0);
  const complete = s.pos >= chars.length && errors === 0;

  useEffect(() => {
    if (!complete) return;
    try {
      localStorage.setItem(storeKey, "1");
    } catch {
      /* nothing to do */
    }
  }, [complete, storeKey]);

  // Keeps the speed readout moving while the student types.
  useEffect(() => {
    if (!focused || complete || !s.start) return;
    const id = window.setInterval(() => tick((x) => x + 1), 1000);
    return () => window.clearInterval(id);
  }, [focused, complete, s.start]);

  useEffect(() => {
    const el = ta.current;
    if (!el) return;

    // The field is never truly empty: a browser reports no deletion from
    // an empty field, so Backspace would silently do nothing on phones.
    // One zero-width character gives every keyboard something to delete.
    const SENTINEL = "\u200b";
    const park = () => {
      el.value = SENTINEL;
      el.setSelectionRange(1, 1);
    };
    const feed = (text: string) => {
      for (const ch of Array.from(text)) dispatch({ type: "char", ch: ch === "\r" ? "\n" : ch });
    };
    const onBefore = (e: InputEvent) => {
      const t = e.inputType;
      if (t === "insertCompositionText") return;
      e.preventDefault();
      if (t === "insertText" && e.data) feed(e.data);
      else if (t === "insertLineBreak" || t === "insertParagraph") feed("\n");
      else if (t === "deleteContentBackward") dispatch({ type: "back" });
      else if (t.startsWith("delete") && t.includes("Backward")) dispatch({ type: "backWord" });
      else if (t === "insertFromPaste" || t === "insertFromDrop") {
        setNotice("Nusxa qoʻyish oʻchirilgan — kodni oʻzingiz yozing.");
        window.setTimeout(() => setNotice(null), 2600);
      }
    };
    // Phones that compose words (Android keyboards) land here instead.
    const onInput = (e: Event) => {
      if ((e as InputEvent).isComposing) return;
      const typed = el.value.replace(/\u200b/g, "");
      if (typed) feed(typed);
      else if (el.value === "") dispatch({ type: "back" });
      park();
    };
    const onCompEnd = () => {
      const typed = el.value.replace(/\u200b/g, "");
      if (typed) feed(typed);
      park();
    };
    const onKey = (e: KeyboardEvent) => {
      // Handled here rather than in beforeinput: desktop browsers do not
      // report a deletion at all when nothing is selected to delete.
      if (e.key === "Backspace") {
        e.preventDefault();
        dispatch({ type: e.altKey || e.ctrlKey || e.metaKey ? "backWord" : "back" });
      } else if (e.key === "Tab") {
        e.preventDefault();
        dispatch({ type: "tab" });
      } else if (e.key === "Escape") {
        el.blur();
      }
    };

    park();
    el.addEventListener("focus", park);
    el.addEventListener("beforeinput", onBefore as EventListener);
    el.addEventListener("input", onInput);
    el.addEventListener("compositionend", onCompEnd);
    el.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("focus", park);
      el.removeEventListener("beforeinput", onBefore as EventListener);
      el.removeEventListener("input", onInput);
      el.removeEventListener("compositionend", onCompEnd);
      el.removeEventListener("keydown", onKey);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  };

  const restart = () => {
    try {
      localStorage.removeItem(storeKey);
    } catch {
      /* ignore */
    }
    dispatch({ type: "reset" });
    ta.current?.focus();
  };

  // ---- readouts ------------------------------------------------------
  const typedReal = s.marks.filter((m) => m === 1 || m === 2).length;
  const progress = chars.length ? s.pos / chars.length : 0;
  const accuracy = s.keys ? Math.max(0, Math.round(((s.keys - s.wrong) / s.keys) * 100)) : 100;
  const minutes = s.start ? ((s.end || performance.now()) - s.start) / 60000 : 0;
  const cpm = minutes > 0.05 ? Math.round(typedReal / minutes) : 0;

  let status: string;
  if (complete) {
    status = s.keys
      ? `Barakalla! Aniqlik ${accuracy}%${cpm ? ` · ${cpm} belgi/daq` : ""}`
      : "Siz buni yozib boʻlgansiz";
  }
  else if (s.pos >= chars.length) status = `${errors} ta xato — Backspace bilan qaytib tuzating`;
  else if (s.pos === 0) status = "Kodni oʻzingiz yozing — nusxa olish shundan keyin ochiladi";
  else status = `${Math.round(progress * 100)}% · aniqlik ${accuracy}%${cpm ? ` · ${cpm} belgi/daq` : ""}`;

  // ---- the code, character by character -------------------------------
  const lines: React.ReactNode[][] = [[]];
  chars.forEach((ch, k) => {
    const m = s.marks[k];
    const caret = focused && k === s.pos ? " is-caret" : "";
    const cls = m === 0 ? "c-todo" : m === 2 ? "c-bad" : `c-ok ${KIND_CLASS[kinds[k]] ?? ""}`;
    if (ch === "\n") {
      lines[lines.length - 1].push(
        <span key={k} className={`c-nl ${cls}${caret}`} aria-hidden="true">
          ↵
        </span>
      );
      lines.push([]);
    } else {
      lines[lines.length - 1].push(
        <span key={k} className={`${cls}${caret}${ch === " " ? " c-sp" : ""}`}>
          {ch}
        </span>
      );
    }
  });
  if (focused && s.pos >= chars.length && !complete) {
    lines[lines.length - 1].push(<span key="end" className="c-end is-caret" />);
  }

  const hasUz = chars.includes("ʻ");
  const keyless = [...new Set(chars.filter((c) => !typeable(c)))];
  const hint = keyless.length
    ? `Maslahat: klaviaturada yoʻq belgilar (${keyless.slice(0, 4).join(" ")}) oʻrniga istalgan tugmani bosing${
        hasUz ? "; ʻ ni ' bilan yozsangiz ham boʻladi" : ""
      }.`
    : "Maslahat: ʻ belgisini ' (apostrof) bilan yozsangiz ham boʻladi.";

  return (
    <figure className={`tc${focused ? " is-focus" : ""}${complete ? " is-done" : ""}${errors ? " has-errors" : ""}`}>
      <div className="tc__bar">
        <span className="tc__lang">
          <Keyboard size={13} strokeWidth={2.2} aria-hidden="true" />
          {lang}
        </span>
        <span className="tc__status" aria-live="polite">
          {status}
        </span>
        <span className="tc__actions">
          {(s.pos > 0 || complete) && (
            <button type="button" className="tc__btn" onClick={restart} title="Qaytadan yozish">
              <RotateCcw size={13} strokeWidth={2.2} aria-hidden="true" />
              <span className="tc__btn-t">Qaytadan</span>
            </button>
          )}
          <button
            type="button"
            className={`tc__btn tc__copy${complete ? " is-open" : ""}`}
            onClick={copy}
            disabled={!complete}
          >
            {complete ? (
              copied ? (
                <Check size={13} strokeWidth={2.4} aria-hidden="true" />
              ) : (
                <Copy size={13} strokeWidth={2.2} aria-hidden="true" />
              )
            ) : (
              <Lock size={12} strokeWidth={2.4} aria-hidden="true" />
            )}
            {complete ? (copied ? "Nusxa olindi" : "Nusxa olish") : "Nusxa olish"}
          </button>
        </span>
      </div>

      <div className="tc__body">
        <pre className="tc__pre" aria-hidden="true">
          <code>
            {lines.map((l, i) => (
              <span className="tc__line" key={i}>
                <span className="tc__ln">{i + 1}</span>
                <span className="tc__code">{l}</span>
              </span>
            ))}
          </code>
        </pre>
        <textarea
          ref={ta}
          className="tc__input"
          aria-label="Kodni shu yerga yozing"
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {!focused && !complete && (
          <span className="tc__cta" aria-hidden="true">
            {s.pos === 0 ? "Bosing va yozishni boshlang" : "Davom etish uchun bosing"}
          </span>
        )}
      </div>

      <div className="tc__meter" aria-hidden="true">
        <i style={{ transform: `scaleX(${progress})` }} />
      </div>

      {(notice || ((hasUz || keyless.length > 0) && !complete)) && (
        <p className="tc__hint">{notice ?? hint}</p>
      )}
      <span className="sr-only">{code}</span>
    </figure>
  );
}

/** Read-only code: answers and fill-in templates. Deliberately without a
 *  copy button — the student writes these in Colab themselves. */
export function StaticCode({ code, label }: { code: string; label?: string }) {
  return (
    <figure className="tc tc--static">
      {label && (
        <div className="tc__bar">
          <span className="tc__lang">{label}</span>
        </div>
      )}
      <pre className="tc__pre">
        <code>
          {code.split("\n").map((line, i) => (
            <span className="tc__line" key={i}>
              <span className="tc__ln" aria-hidden="true">
                {i + 1}
              </span>
              <span className="tc__code">
                <Python code={line} />
              </span>
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}

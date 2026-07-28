import { useCallback, useState } from "react";
import { Check, ChevronDown, Copy, Lightbulb, Key, TriangleAlert } from "lucide-react";
import type { Block, Exercise } from "../lib/curriculum";
import { Python, inline } from "../lib/highlight";
import { VIZ } from "./viz/Viz";
import "./Blocks.css";

/* ---------- code, with copy ---------- */
export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard can be blocked; the code is selectable either way */
    }
  }, [code]);

  const lines = code.split("\n");

  return (
    <figure className="cb">
      <div className="cb__bar">
        <span className="cb__lang">python</span>
        <button
          type="button"
          className={`cb__copy${copied ? " is-done" : ""}`}
          onClick={copy}
          aria-label="Kodni nusxa olish"
        >
          {copied ? (
            <Check size={13} strokeWidth={2.2} aria-hidden="true" />
          ) : (
            <Copy size={13} strokeWidth={2.2} aria-hidden="true" />
          )}
          {copied ? "Nusxa olindi" : "Nusxa olish"}
        </button>
      </div>
      <pre className="cb__pre">
        <code>
          {lines.map((line, i) => (
            <span className="cb__line" key={i}>
              <span className="cb__ln" aria-hidden="true">
                {i + 1}
              </span>
              <span className="cb__code">
                <Python code={line} />
              </span>
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}

/* ---------- one content block ---------- */
function One({ b }: { b: Block }) {
  switch (b.kind) {
    case "text":
      return <p className="bk__p">{inline(b.text)}</p>;

    case "subhead":
      return <p className="bk__sub">{inline(b.text)}</p>;

    case "bullets":
      return (
        <ul className="bk__ul">
          {b.items.map((it, i) => (
            <li key={i}>{inline(it)}</li>
          ))}
        </ul>
      );

    case "steps":
      return (
        <ol className="bk__ol">
          {b.items.map((it, i) => (
            <li key={i}>
              <span className="bk__step">{i + 1}</span>
              <span>{inline(it)}</span>
            </li>
          ))}
        </ol>
      );

    case "note": {
      const Icon = b.tone === "warn" ? TriangleAlert : b.tone === "key" ? Key : Lightbulb;
      const label = b.tone === "warn" ? "Diqqat" : b.tone === "key" ? "Muhim" : "Maslahat";
      return (
        <aside className={`bk__note bk__note--${b.tone}`}>
          <span className="bk__note-ico" aria-hidden="true">
            <Icon size={15} strokeWidth={2.2} />
          </span>
          <span className="bk__note-body">
            <span className="bk__note-label">{label}</span>
            <span>{inline(b.text)}</span>
          </span>
        </aside>
      );
    }

    case "code":
      return <CodeBlock code={b.code} />;

    case "viz": {
      const Component = VIZ[b.id];
      // An unknown id must not crash a lesson — skip it silently.
      return Component ? <Component /> : null;
    }

    case "output":
      return (
        <div className="bk__out">
          <span className="bk__out-label">Natija</span>
          <pre>{b.text}</pre>
        </div>
      );

    case "flow":
      return (
        <div className="bk__flow">
          {b.text.split("→").map((part, i, arr) => (
            <span key={i} className="bk__flow-part">
              {part.trim()}
              {i < arr.length - 1 && (
                <span className="bk__flow-arrow" aria-hidden="true">
                  →
                </span>
              )}
            </span>
          ))}
        </div>
      );

    default:
      return null;
  }
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => (
        <One key={i} b={b} />
      ))}
    </>
  );
}

/* ---------- exercise, answer hidden until asked ---------- */
export function ExerciseCard({ ex }: { ex: Exercise }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`ex${open ? " is-open" : ""}`}>
      <p className="ex__label">{ex.label}</p>
      <p className="ex__prompt">{inline(ex.prompt)}</p>
      {ex.hint && <p className="ex__hint">{inline(ex.hint)}</p>}

      <button
        type="button"
        className="ex__toggle"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <ChevronDown size={15} strokeWidth={2.2} aria-hidden="true" />
        {open ? "Javobni yashirish" : "Javobni koʻrish"}
      </button>

      {open && (
        <div className="ex__answer">
          {ex.answerCode && <CodeBlock code={ex.answerCode} />}
          {ex.answerOutput && (
            <div className="bk__out">
              <span className="bk__out-label">Natija</span>
              <pre>{ex.answerOutput}</pre>
            </div>
          )}
          {ex.answerText && <p className="bk__p">{inline(ex.answerText)}</p>}
        </div>
      )}
    </div>
  );
}

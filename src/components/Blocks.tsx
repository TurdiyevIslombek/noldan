import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import {
  Check,
  ChevronDown,
  CircleCheck,
  Copy,
  Dumbbell,
  Key,
  Lightbulb,
  TriangleAlert,
} from "lucide-react";
import type { Block, Exercise } from "../lib/curriculum-types";
import { Python, inline } from "../lib/highlight";
import { VIZ } from "./viz/Viz";
import TypeCode, { StaticCode } from "./TypeCode";
import { MediaSlot } from "./Media";
import "./Blocks.css";

/* Which lesson these blocks belong to — media slots need it to find
   their files. */
const LessonCtx = createContext({ course: "", lesson: "" });
export function LessonProvider({
  course,
  lesson,
  children,
}: {
  course: string;
  lesson: string;
  children: ReactNode;
}) {
  return <LessonCtx.Provider value={{ course, lesson }}>{children}</LessonCtx.Provider>;
}

/** Inline formatting, with the author's deliberate line breaks kept. */
function rich(text: string): ReactNode {
  const parts = text.split("\n");
  return parts.map((p, i) => (
    <span key={i}>
      {inline(p)}
      {i < parts.length - 1 && <br />}
    </span>
  ));
}

/* ---------- code, with copy (paid course, legacy format) ---------- */
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
          {code.split("\n").map((line, i) => (
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

/* ---------- collapsible answer ---------- */
function Reveal({ summary, blocks }: { summary: string; blocks: Block[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`bk__reveal${open ? " is-open" : ""}`}>
      <button
        type="button"
        className="bk__reveal-btn"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <ChevronDown size={15} strokeWidth={2.2} aria-hidden="true" />
        {open ? summary.replace(/koʻrsatish|ko'rsatish/i, "yashirish") : summary}
      </button>
      {open && (
        <div className="bk__reveal-body">
          <Blocks blocks={blocks} />
        </div>
      )}
    </div>
  );
}

/* ---------- one content block ---------- */
function One({ b }: { b: Block }) {
  const ctx = useContext(LessonCtx);

  switch (b.kind) {
    case "text":
      return <p className="bk__p">{rich(b.text)}</p>;

    case "subhead":
      return <p className="bk__sub">{inline(b.text)}</p>;

    case "h3":
      return (
        <h3 className="bk__h3" id={b.id}>
          {inline(b.text)}
        </h3>
      );

    case "bullets":
      return (
        <ul className="bk__ul">
          {b.items.map((it, i) => (
            <li key={i}>{inline(it)}</li>
          ))}
        </ul>
      );

    case "goals":
      return (
        <ul className="bk__goals">
          {b.items.map((it, i) => (
            <li key={i}>
              <CircleCheck size={17} strokeWidth={2} aria-hidden="true" />
              <span>{inline(it)}</span>
            </li>
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
            <span>{rich(b.text)}</span>
          </span>
        </aside>
      );
    }

    case "table":
      return (
        <div className="bk__table">
          <table>
            <thead>
              <tr>
                {b.head.map((h, i) => (
                  <th key={i}>{inline(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j}>{inline(c)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "code":
      if (b.mode === "static") return <StaticCode code={b.code} />;
      if (b.mode === "template") return <StaticCode code={b.code} label="Colab'da oʻzingiz toʻldiring" />;
      return <TypeCode code={b.code} lang={b.lang ?? "python"} />;

    case "output":
      return (
        <div className={`bk__out${b.error ? " bk__out--err" : ""}`}>
          <span className="bk__out-label">{b.label ?? (b.error ? "Xato" : "Natija")}</span>
          <pre>{b.text}</pre>
        </div>
      );

    case "pre":
      return <pre className="bk__pre">{b.text}</pre>;

    case "reveal":
      return <Reveal summary={b.summary} blocks={b.blocks} />;

    case "exercise":
      return (
        <div className="bk__ex">
          <p className="bk__ex-label">
            <Dumbbell size={14} strokeWidth={2.2} aria-hidden="true" />
            {b.label}
          </p>
          <Blocks blocks={b.blocks} />
          {b.answer && <Reveal summary={b.answer.summary} blocks={b.answer.blocks} />}
        </div>
      );

    case "media":
      return <MediaSlot course={ctx.course} lesson={ctx.lesson} id={b.id} title={b.title} />;

    case "viz": {
      const Component = VIZ[b.id];
      return Component ? <Component /> : null;
    }

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

/* ---------- exercise, legacy format ---------- */
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
          {ex.answerCode && <StaticCode code={ex.answerCode} />}
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

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Bot,
  ExternalLink,
  Settings2,
  Sparkles,
  Square,
  Trash2,
  X,
} from "lucide-react";
import {
  PROVIDERS,
  askTutor,
  loadConfig,
  saveConfig,
  type Msg,
  type TutorConfig,
} from "../lib/tutor";
import { CodeBlock } from "./Blocks";
import { inline } from "../lib/highlight";
import "./Tutor.css";

/* --------------------------------------------------------------------
   The study assistant.

   A floating panel that answers questions in Uzbek about the lesson the
   student is on, and reads Python errors they paste. Streams the reply.
   The model connection is configured in src/lib/tutor.ts — see the
   security note there about API keys.
   -------------------------------------------------------------------- */

const STARTERS = [
  "Bu darsni sodda tilda tushuntir",
  "Kodim ishlamadi, xatoni tekshir",
  "Nega bunday qilamiz?",
];

/** Splits a reply into prose and ```code``` blocks so code renders properly. */
function renderReply(text: string) {
  const parts = text.split(/```(?:python|py)?\n?/);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return <CodeBlock key={i} code={part.replace(/\n$/, "")} />;
    }
    return part
      .split(/\n{2,}/)
      .filter((p) => p.trim())
      .map((p, j) => (
        <p className="tt__p" key={`${i}-${j}`}>
          {inline(p.trim())}
        </p>
      ));
  });
}

export default function Tutor({
  lesson,
  course,
}: {
  lesson?: string;
  course?: string;
}) {
  const [open, setOpen] = useState(false);
  const [showCfg, setShowCfg] = useState(false);
  const [cfg, setCfg] = useState<TutorConfig>(() => loadConfig());
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<(() => void) | null>(null);
  const feedRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const provider = PROVIDERS.find((p) => p.id === cfg.provider) ?? PROVIDERS[0];

  useEffect(() => saveConfig(cfg), [cfg]);

  // Keep the newest reply in view while it streams.
  useEffect(() => {
    const el = feedRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, streaming]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Escape closes; Ctrl/Cmd+K opens.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => abortRef.current?.(), []);

  const send = useCallback(
    (text: string) => {
      const question = text.trim();
      if (!question || streaming) return;

      setError(null);
      setDraft("");
      const next: Msg[] = [...msgs, { role: "user", content: question }];
      setMsgs([...next, { role: "assistant", content: "" }]);
      setStreaming(true);

      abortRef.current = askTutor(cfg, next, { lesson, course }, {
        onDelta: (d) =>
          setMsgs((cur) => {
            const copy = cur.slice();
            const last = copy[copy.length - 1];
            if (last?.role === "assistant") {
              copy[copy.length - 1] = { ...last, content: last.content + d };
            }
            return copy;
          }),
        onDone: () => {
          setStreaming(false);
          abortRef.current = null;
        },
        onError: (m) => {
          setStreaming(false);
          abortRef.current = null;
          setError(m);
          // Drop the empty assistant bubble so the panel is not left blank.
          setMsgs((cur) => {
            const last = cur[cur.length - 1];
            return last?.role === "assistant" && !last.content ? cur.slice(0, -1) : cur;
          });
        },
      });
    },
    [cfg, course, lesson, msgs, streaming]
  );

  const stop = () => {
    abortRef.current?.();
    abortRef.current = null;
    setStreaming(false);
  };

  return (
    <>
      <button
        type="button"
        className={`tt__fab${open ? " is-open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Yordamchini yopish" : "Yordamchidan soʻrash"}
      >
        {open ? (
          <X size={18} strokeWidth={2.2} aria-hidden="true" />
        ) : (
          <>
            <Sparkles size={16} strokeWidth={2.2} aria-hidden="true" />
            <span>Yordam</span>
          </>
        )}
      </button>

      {open && (
        <aside className="tt" role="dialog" aria-label="Oʻquv yordamchisi">
          <header className="tt__head">
            <span className="tt__ico" aria-hidden="true">
              <Bot size={16} strokeWidth={2.2} />
            </span>
            <span className="tt__titles">
              <span className="tt__title">Yordamchi</span>
              <span className="tt__sub">
                {lesson ? lesson : "Savolingizni yozing"}
              </span>
            </span>
            <button
              type="button"
              className="tt__ghost"
              onClick={() => setShowCfg((s) => !s)}
              aria-label="Sozlamalar"
              aria-expanded={showCfg}
            >
              <Settings2 size={15} strokeWidth={2.2} aria-hidden="true" />
            </button>
            {msgs.length > 0 && (
              <button
                type="button"
                className="tt__ghost"
                onClick={() => {
                  stop();
                  setMsgs([]);
                  setError(null);
                }}
                aria-label="Suhbatni tozalash"
              >
                <Trash2 size={15} strokeWidth={2.2} aria-hidden="true" />
              </button>
            )}
          </header>

          {showCfg && (
            <div className="tt__cfg">
              <label className="tt__field">
                <span>Model manbasi</span>
                <select
                  value={cfg.provider}
                  onChange={(e) => {
                    const id = e.target.value as TutorConfig["provider"];
                    const p = PROVIDERS.find((x) => x.id === id)!;
                    setCfg({ provider: id, model: p.defaultModel, key: cfg.key });
                  }}
                >
                  {PROVIDERS.map((p) => (
                    <option value={p.id} key={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </label>

              <p className="tt__note">{provider.note}</p>

              <label className="tt__field">
                <span>Model nomi</span>
                <input
                  value={cfg.model}
                  onChange={(e) => setCfg({ ...cfg, model: e.target.value })}
                  spellCheck={false}
                />
              </label>

              {provider.needsKey && (
                <>
                  <label className="tt__field">
                    <span>API kalit</span>
                    <input
                      type="password"
                      value={cfg.key}
                      placeholder="Kalitni qoʻying"
                      onChange={(e) => setCfg({ ...cfg, key: e.target.value })}
                      spellCheck={false}
                      autoComplete="off"
                    />
                  </label>
                  {provider.keysUrl && (
                    <a
                      className="tt__link"
                      href={provider.keysUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Bepul kalit olish
                      <ExternalLink size={11} strokeWidth={2.4} aria-hidden="true" />
                    </a>
                  )}
                  <p className="tt__warn">
                    Kalit faqat shu brauzerda saqlanadi va toʻgʻridan-toʻgʻri
                    provayderga yuboriladi. Kalitingizni birovga bermang.
                  </p>
                </>
              )}
            </div>
          )}

          <div className="tt__feed" ref={feedRef}>
            {msgs.length === 0 && !error && (
              <div className="tt__welcome">
                <p>
                  Dars boʻyicha savol bering yoki kodingizdagi xatoni tashlang —
                  oʻzbek tilida tushuntirib beraman.
                </p>
                <div className="tt__starters">
                  {STARTERS.map((s) => (
                    <button
                      type="button"
                      key={s}
                      className="tt__starter"
                      onClick={() => send(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {msgs.map((m, i) => (
              <div className={`tt__msg tt__msg--${m.role}`} key={i}>
                {m.role === "assistant" && !m.content && streaming ? (
                  <span className="tt__typing" aria-label="yozilmoqda">
                    <i />
                    <i />
                    <i />
                  </span>
                ) : m.role === "user" ? (
                  <p className="tt__p">{m.content}</p>
                ) : (
                  renderReply(m.content)
                )}
              </div>
            ))}

            {error && (
              <div className="tt__error">
                <p>{error}</p>
                <button type="button" onClick={() => setShowCfg(true)}>
                  Sozlamalarni ochish
                </button>
              </div>
            )}
          </div>

          <form
            className="tt__form"
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
          >
            <textarea
              ref={inputRef}
              className="tt__input"
              value={draft}
              rows={1}
              placeholder="Savol yoki xato matnini yozing…"
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(draft);
                }
              }}
            />
            {streaming ? (
              <button
                type="button"
                className="tt__send is-stop"
                onClick={stop}
                aria-label="Toʻxtatish"
              >
                <Square size={13} strokeWidth={2.6} aria-hidden="true" />
              </button>
            ) : (
              <button
                type="submit"
                className="tt__send"
                disabled={!draft.trim()}
                aria-label="Yuborish"
              >
                <ArrowUp size={16} strokeWidth={2.4} aria-hidden="true" />
              </button>
            )}
          </form>
        </aside>
      )}
    </>
  );
}

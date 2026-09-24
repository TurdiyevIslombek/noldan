import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Download,
  FlaskConical,
  Info,
  Layers,
  Loader2,
  Plus,
  Scale,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import SiteNav from "../components/SiteNav";
import { CodeBlock } from "../components/Blocks";
import { VIZ } from "../components/viz/Viz";
import { PRESETS, measure, type Token } from "../lib/hf-tokenizer";
import { loadTokenizer, tokenize, type TokenizerInfo } from "../lib/tokenizers";
import "./Playground.css";

/* --------------------------------------------------------------------
   The Playground.

   Three jobs, in the order a visitor meets them:

     1. Sinov     — load a real tokenizer from Hugging Face and watch it
                    split your own Uzbek text, token by token.
     2. Taqqoslash— run one text through several tokenizers at once and
                    see, in numbers, why a language-specific one wins.
     3. Koʻrgazma — for someone who has not started the course: the same
                    interactive pieces the lessons use, with no reading.

   The point of (1) is that it closes the loop: a student trains a
   tokenizer in the course, publishes it to the Hub, pastes the repo name
   here, and sees their own work running.
   -------------------------------------------------------------------- */

const SAMPLE =
  "Oʻzbekiston Markaziy Osiyoda joylashgan davlat. Yoshlar yangi texnologiyalarni oʻrganmoqda.";

type Slot = {
  key: string;
  repo: string;
  tk: TokenizerInfo | null;
  loading: boolean;
  error: string | null;
};

/** What one tokenizer made of one version of the text. */
type Enc = { text: string; tokens: Token[]; normalized: string };

const newSlot = (repo: string): Slot => ({
  key: `${repo}-${Math.random().toString(36).slice(2, 7)}`,
  repo,
  tk: null,
  loading: false,
  error: null,
});

/* Stable colour per token position so boundaries are readable. */
const SHADES = 6;

function TokenStrip({ tokens }: { tokens: Token[] }) {
  if (!tokens.length) {
    return <p className="pg__empty">Matn kiriting…</p>;
  }
  return (
    <div className="strip2">
      {tokens.map((t, i) => (
        <span
          className={`tok2 tok2--${i % SHADES}${t.id < 0 ? " is-unk" : ""}`}
          key={i}
          title={`id ${t.id} · ${JSON.stringify(t.text)}`}
        >
          <span className="tok2__t">
            {t.text === "" ? "∅" : t.text.replace(/ /g, "␣").replace(/\n/g, "⏎")}
          </span>
          <span className="tok2__id">{t.id < 0 ? "?" : t.id}</span>
        </span>
      ))}
    </div>
  );
}

export default function Playground() {
  const [tab, setTab] = useState<"lab" | "compare" | "gallery">("lab");
  const [text, setText] = useState(SAMPLE);
  const [slots, setSlots] = useState<Slot[]>([
    newSlot(PRESETS[0].repo),
    newSlot(PRESETS[1].repo),
  ]);
  const [custom, setCustom] = useState("");

  const load = useCallback(async (key: string, repo: string) => {
    setSlots((s) =>
      s.map((x) => (x.key === key ? { ...x, loading: true, error: null } : x))
    );
    try {
      const tk = await loadTokenizer(repo, PRESETS.find((p) => p.repo === repo)?.label);
      setSlots((s) => s.map((x) => (x.key === key ? { ...x, tk, loading: false } : x)));
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setSlots((s) =>
        s.map((x) => (x.key === key ? { ...x, loading: false, error: msg } : x))
      );
    }
  }, []);

  // Load the two default tokenizers once, on arrival.
  useEffect(() => {
    slots.forEach((s) => {
      if (!s.tk && !s.loading && !s.error) load(s.key, s.repo);
    });
    // Runs once: later slots load on the action that creates them.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Tokenizing happens in a worker (lib/tokenizers.ts), so typing never
  // waits on it. Replies for text that has since changed are dropped;
  // the previous tokens stay on screen until the new ones arrive.
  const [enc, setEnc] = useState<Record<string, Enc>>({});
  useEffect(() => {
    let live = true;
    for (const s of slots) {
      if (!s.tk) continue;
      tokenize(s.repo, text)
        .then((r) => {
          if (live) {
            setEnc((prev) => ({
              ...prev,
              [s.key]: { text, tokens: r.tokens, normalized: r.normalized },
            }));
          }
        })
        .catch(() => undefined);
    }
    return () => {
      live = false;
    };
  }, [slots, text]);

  const results = useMemo(
    () =>
      slots.map((s) => {
        const e = s.tk ? enc[s.key] : undefined;
        if (!e) return { slot: s, tokens: [] as Token[], stats: null, normalized: null };
        return {
          slot: s,
          tokens: e.tokens,
          stats: measure(e.text, e.tokens),
          normalized: e.normalized !== e.text ? e.normalized : null,
        };
      }),
    [slots, enc]
  );

  const best = useMemo(() => {
    const withStats = results.filter((r) => r.stats && r.stats.tokens > 0);
    if (!withStats.length) return null;
    return withStats.reduce((a, b) =>
      (a.stats?.perWord ?? 99) <= (b.stats?.perWord ?? 99) ? a : b
    );
  }, [results]);

  const primary = results[0];

  const addCustom = () => {
    const repo = custom.trim().replace(/^https?:\/\/huggingface\.co\//, "").replace(/\/+$/, "");
    if (!repo.includes("/")) return;
    const slot = newSlot(repo);
    setSlots((s) => [...s, slot]);
    setCustom("");
    load(slot.key, repo);
    setTab("compare");
  };

  return (
    <div className="pg">
      <div className="pg__veil" aria-hidden="true" />
      <SiteNav />

      <main id="main" className="pg__wrap">
        <header className="pg__head">
          <span className="pg__eyebrow">
            <FlaskConical size={12} strokeWidth={2.2} aria-hidden="true" />
            Playground
          </span>
          <h1 className="pg__title">Oʻrganganingizni sinab koʻring</h1>
          <p className="pg__lede">
            Haqiqiy tokenizatorni Hugging Face dan yuklang, oʻz matningizni bering
            va u qanday boʻlishini <b>oʻz koʻzingiz bilan</b> koʻring. Kursni
            boshlamagan boʻlsangiz ham — pastdagi koʻrgazma nimalarni
            oʻrganishingizni koʻrsatadi.
          </p>

          <div className="pg__tabs" role="tablist" aria-label="Playground boʻlimlari">
            {(
              [
                { id: "lab", label: "Sinov", icon: FlaskConical },
                { id: "compare", label: "Taqqoslash", icon: Scale },
                { id: "gallery", label: "Koʻrgazma", icon: Layers },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                className={`pg__tab${tab === t.id ? " is-on" : ""}`}
                onClick={() => setTab(t.id)}
              >
                <t.icon size={14} strokeWidth={2.2} aria-hidden="true" />
                {t.label}
              </button>
            ))}
          </div>
        </header>

        {/* ---------------- input, shared by lab + compare ------------- */}
        {tab !== "gallery" && (
          <section className="pg__panel">
            <label className="pg__label" htmlFor="pg-text">
              Sinov matni
            </label>
            <textarea
              id="pg-text"
              className="pg__text"
              value={text}
              rows={3}
              spellCheck={false}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="pg__chips">
              {[
                SAMPLE,
                "gʻisht oʻyin oʻzbek tili",
                "Bugun 15-may, soat 9! Ertaga 2024-yil.",
                "The quick brown fox jumps over the lazy dog.",
              ].map((s, i) => (
                <button
                  key={i}
                  type="button"
                  className="pg__chip"
                  onClick={() => setText(s)}
                >
                  {s.length > 34 ? s.slice(0, 34) + "…" : s}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ---------------- lab ---------------------------------------- */}
        {tab === "lab" && (
          <section className="pg__panel">
            <div className="pg__panelhead">
              <h2 className="pg__h2">{primary?.slot.tk?.label ?? "Tokenizator"}</h2>
              {primary?.slot.tk && (
                <span className="pg__meta">
                  {primary.slot.tk.vocabSize.toLocaleString()} lugʻat ·{" "}
                  {primary.slot.tk.mergeCount.toLocaleString()} birlashma ·{" "}
                  {primary.slot.tk.bytesMB.toFixed(1)} MB
                </span>
              )}
            </div>

            {primary?.slot.loading && (
              <p className="pg__loading">
                <Loader2 size={15} className="pg__spin" aria-hidden="true" />
                Hugging Face dan yuklanmoqda…
              </p>
            )}
            {primary?.slot.error && (
              <p className="pg__error">
                <TriangleAlert size={15} strokeWidth={2.2} aria-hidden="true" />
                {primary.slot.error}
              </p>
            )}

            {primary?.stats && !text.trim() && (
              <p className="pg__empty">
                Yuqoriga matn yozing — tokenlar shu yerda paydo boʻladi.
              </p>
            )}

            {primary?.stats && text.trim() && (
              <>
                <TokenStrip tokens={primary.tokens} />
                <div className="pg__stats">
                  <Stat n={primary.stats.chars} k="belgi" />
                  <Stat n={primary.stats.bytes} k="bayt" />
                  <Stat n={primary.stats.words} k="soʻz" />
                  <Stat n={primary.stats.tokens} k="token" strong />
                  <Stat
                    n={primary.stats.perWord.toFixed(2)}
                    k="token / soʻz"
                    strong
                  />
                </div>
                {primary.normalized && (
                  <p className="pg__hint pg__hint--norm">
                    Bu tokenizator matnni avval oʻz qoidasi bilan tozalaydi —
                    masalan <code>o'</code> → <code>oʻ</code>, <code>g'</code> →{" "}
                    <code>gʻ</code>. Tokenlar tozalangan matndan olindi.
                  </p>
                )}
                <p className="pg__hint">
                  Har bir rangli boʻlak — bitta token. Ostidagi son — uning
                  lugʻatdagi ID si. <code>␣</code> boʻsh joyni bildiradi.
                </p>
              </>
            )}
          </section>
        )}

        {/* ---------------- compare ------------------------------------ */}
        {tab === "compare" && (
          <section className="pg__panel">
            <div className="pg__panelhead">
              <h2 className="pg__h2">Yonma-yon taqqoslash</h2>
              <span className="pg__meta">Kam token = tejamkorroq</span>
            </div>

            <div className="cmp">
              {results.map(({ slot, tokens, stats }) => {
                const isBest = best?.slot.key === slot.key;
                const ratio = stats && best?.stats
                  ? stats.perWord / (best.stats.perWord || 1)
                  : 1;
                return (
                  <article className={`cmp__row${isBest ? " is-best" : ""}`} key={slot.key}>
                    <header className="cmp__head">
                      <span className="cmp__name">
                        {slot.tk?.label ?? slot.repo}
                        {isBest && (
                          <span className="cmp__badge">
                            <Check size={10} strokeWidth={3} aria-hidden="true" />
                            eng tejamkor
                          </span>
                        )}
                      </span>
                      <span className="cmp__repo">{slot.repo}</span>
                      {slots.length > 1 && (
                        <button
                          type="button"
                          className="cmp__x"
                          aria-label={`${slot.repo} ni olib tashlash`}
                          onClick={() =>
                            setSlots((s) => s.filter((x) => x.key !== slot.key))
                          }
                        >
                          <Trash2 size={13} strokeWidth={2.2} aria-hidden="true" />
                        </button>
                      )}
                    </header>

                    {slot.loading && (
                      <p className="pg__loading">
                        <Loader2 size={14} className="pg__spin" aria-hidden="true" />
                        yuklanmoqda…
                      </p>
                    )}
                    {slot.error && (
                      <p className="pg__error">
                        <TriangleAlert size={14} strokeWidth={2.2} aria-hidden="true" />
                        {slot.error}
                      </p>
                    )}

                    {stats && (
                      <>
                        <div className="cmp__bar">
                          <span
                            className="cmp__fill"
                            style={{ transform: `scaleX(${Math.min(1, 1 / ratio)})` }}
                          />
                          <span className="cmp__num">
                            {stats.perWord.toFixed(2)} token/soʻz
                          </span>
                        </div>
                        <div className="cmp__mini">
                          <span>{stats.tokens} token</span>
                          <span>{slot.tk?.vocabSize.toLocaleString()} lugʻat</span>
                          {!isBest && best?.stats && (
                            <span className="cmp__worse">
                              {(stats.perWord / (best.stats.perWord || 1)).toFixed(2)}×
                              koʻproq
                            </span>
                          )}
                        </div>
                        <TokenStrip tokens={tokens.slice(0, 60)} />
                      </>
                    )}
                  </article>
                );
              })}
            </div>

            <div className="pg__add">
              <label className="pg__label" htmlFor="pg-repo">
                Oʻz tokenizatoringizni qoʻshing
              </label>
              <div className="pg__addrow">
                <input
                  id="pg-repo"
                  className="pg__input"
                  placeholder="foydalanuvchi/repo-nomi"
                  value={custom}
                  spellCheck={false}
                  onChange={(e) => setCustom(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addCustom()}
                />
                <button type="button" className="pg__btn" onClick={addCustom}>
                  <Plus size={15} strokeWidth={2.4} aria-hidden="true" />
                  Qoʻshish
                </button>
              </div>
              <div className="pg__presets">
                {PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className="pg__preset"
                    disabled={slots.some((s) => s.repo === p.repo)}
                    onClick={() => {
                      const slot = newSlot(p.repo);
                      setSlots((s) => [...s, slot]);
                      load(slot.key, p.repo);
                    }}
                  >
                    <span className="pg__preset-name">{p.label}</span>
                    <span className="pg__preset-note">{p.note}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ---------------- gallery ------------------------------------ */}
        {tab === "gallery" && (
          <section className="pg__panel pg__panel--plain">
            <div className="pg__panelhead">
              <h2 className="pg__h2">Nimalarni oʻrganasiz?</h2>
              <span className="pg__meta">Hech narsa oʻqimasdan — shunchaki oʻynang</span>
            </div>
            <p className="pg__gallerylede">
              Quyidagilar — kursdagi haqiqiy interaktiv qismlar. Har biri
              chinakam hisob-kitob qiladi. Tugmalarni bosing, slayderlarni
              suring, matn yozing.
            </p>

            <div className="gal">
              {(
                [
                  { id: "bytes", t: "Belgi va bayt", d: "Nega oʻzbekcha ʻ ikki bayt?" },
                  { id: "split", t: "Regex bilan boʻlish", d: "Soʻz chegarasi qanday saqlanadi" },
                  { id: "pairs", t: "Juftliklarni sanash", d: "BPE ning birinchi qadami" },
                  { id: "merge", t: "Oʻqitish tsikli", d: "Ketma-ketlik qanday qisqaradi" },
                  { id: "softmax", t: "Softmax", d: "Logitdan ehtimolga" },
                  { id: "attention", t: "Kauzal attention", d: "Kim kimga qaraydi" },
                ] as const
              ).map((g) => {
                const C = VIZ[g.id];
                return (
                  <div className="gal__item" key={g.id}>
                    <div className="gal__cap">
                      <span className="gal__t">{g.t}</span>
                      <span className="gal__d">{g.d}</span>
                    </div>
                    {C && <C />}
                  </div>
                );
              })}
            </div>

            <div className="pg__cta">
              <p>Bu qismlar qanday ishlashini toʻliq tushunmoqchimisiz?</p>
              <Link className="pg__ctabtn" to="/learn">
                Darslarni boshlash
                <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
              </Link>
            </div>
          </section>
        )}

        {/* ---------------- publish guide ------------------------------ */}
        {tab !== "gallery" && (
          <section className="pg__panel pg__guide">
            <div className="pg__panelhead">
              <h2 className="pg__h2">
                <Download size={17} strokeWidth={2.2} aria-hidden="true" />
                Oʻz tokenizatoringizni bu yerga olib keling
              </h2>
            </div>
            <p className="pg__p">
              Kursda tokenizator qurganingizdan keyin uni Hugging Face ga
              joylang — keyin repo nomini yuqoriga yozsangiz, u shu yerda
              ishlaydi.
            </p>
            <ol className="pg__steps">
              <li>
                <span className="pg__stepn">1</span>
                <div>
                  <b>Saqlang.</b> Tokenizatoringizni <code>tokenizer.json</code>{" "}
                  formatida yozing.
                  <CodeBlock code={'from tokenizers import Tokenizer\n\n# sizning oʻqitilgan tokenizatoringiz\ntok.save("tokenizer.json")'} />
                </div>
              </li>
              <li>
                <span className="pg__stepn">2</span>
                <div>
                  <b>Hugging Face ga yuklang.</b> Avval{" "}
                  <a href="https://huggingface.co/new" target="_blank" rel="noopener noreferrer">
                    yangi repo
                  </a>{" "}
                  oching (<b>Public</b> boʻlsin), keyin:
                  <CodeBlock code={'from huggingface_hub import HfApi\n\napi = HfApi(token="hf_...")   # Settings -> Access Tokens\napi.upload_file(\n    path_or_fileobj="tokenizer.json",\n    path_in_repo="tokenizer.json",\n    repo_id="sizning-ismingiz/mening-tokenizatorim",\n)'} />
                </div>
              </li>
              <li>
                <span className="pg__stepn">3</span>
                <div>
                  <b>Bu yerga yozing.</b> “Taqqoslash” boʻlimida repo nomini
                  kiriting — masalan{" "}
                  <code>sizning-ismingiz/mening-tokenizatorim</code> — va{" "}
                  <b>Qoʻshish</b> bosing. Tokenizatoringiz brauzerda ishlaydi va
                  boshqalar bilan taqqoslanadi.
                </div>
              </li>
            </ol>
            <p className="pg__note">
              <Info size={14} strokeWidth={2.2} aria-hidden="true" />
              Repo <b>ochiq (public)</b> boʻlishi kerak va ichida{" "}
              <code>tokenizer.json</code> boʻlishi shart. Hozircha byte-level BPE
              qoʻllab-quvvatlanadi — kursda quradiganingiz aynan shunday.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}

function Stat({
  n,
  k,
  strong,
}: {
  n: number | string;
  k: string;
  strong?: boolean;
}) {
  return (
    <span className={`pg__stat${strong ? " is-strong" : ""}`}>
      <b>{typeof n === "number" ? n.toLocaleString() : n}</b>
      <span>{k}</span>
    </span>
  );
}

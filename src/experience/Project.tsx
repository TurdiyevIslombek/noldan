import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Check,
  Loader2,
  Medal,
  RefreshCw,
  Trophy,
  TriangleAlert,
} from "lucide-react";
import SiteNav from "../components/SiteNav";
import {
  HUB_TAG,
  SEED,
  buildBoard,
  discoverTagged,
  type Entry,
  type Failed,
} from "../lib/leaderboard";
import "./Project.css";

/* --------------------------------------------------------------------
   Loyiha — the capstone.

   The two courses teach how; the Playground lets you poke at it. This
   page is where a student turns that into a thing of their own and puts
   it next to everyone else's.

   The leaderboard scores nothing it was told. Every row is a real
   tokenizer.json downloaded from the Hub and run over the same fixed
   Uzbek text in the visitor's browser, so a number here cannot be
   claimed — only earned. Ranking is bits-per-character, which prices
   the vocabulary budget; see the reasoning in lib/leaderboard.ts.

   No backend: progress is localStorage, entries come from the Hub's own
   tag search. Nothing to host, nothing to moderate, nothing to break.
   -------------------------------------------------------------------- */

const STEPS = [
  {
    id: "korpus",
    title: "Oʻz korpusingizni tanlang",
    body: "FineWeb-2 emas — oʻzingiz tanlagan matn: yozganlaringiz, bir kitob, Vikipediyaning bir boʻlimi. Kamida bir necha megabayt boʻlsin va uni qayerdan olganingizni yozib qoʻying.",
  },
  {
    id: "tokenizator",
    title: "Tokenizator oʻqiting",
    body: "Birinchi kursdagi kod bilan. Lugʻat hajmini oʻzingiz tanlang va nega shu raqamni tanlaganingizni izohlay oling.",
  },
  {
    id: "model",
    title: "Kichik GPT oʻqiting",
    body: "Ikkinchi kurs. Katta boʻlishi shart emas — yoʻqotish egri chizigʻi pasaysa va matn generatsiya qilsa, yetarli.",
  },
  {
    id: "nashr",
    title: "Hugging Face ga nashr qiling",
    body: "Tokenizator va model — ikkalasi ham. Model kartasida korpus, lugʻat hajmi va oʻlchagan raqamlaringiz boʻlsin.",
  },
  {
    id: "teg",
    title: `Model kartasiga "${HUB_TAG}" tegini qoʻshing`,
    body: "Shundan keyin quyidagi reytingda oʻzingizdan-oʻzingiz paydo boʻlasiz. Hech qanday soʻrov yuborish shart emas.",
  },
] as const;

const STORE = "noldan:loyiha";

/** Uzbek groups thousands with a space, and browsers do not reliably
 *  carry uz-UZ locale data — toLocaleString("uz-UZ") silently falls back
 *  to commas. Done by hand so it matches "16 000" on the homepage. */
function groupThousands(n: number): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function useChecklist() {
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE);
      if (raw) setDone(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      // A corrupt or blocked store just means an empty checklist.
    }
  }, []);

  const toggle = useCallback((id: string) => {
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(STORE, JSON.stringify(next));
      } catch {
        // Private mode: the tick still works for this session.
      }
      return next;
    });
  }, []);

  return { done, toggle };
}

function Rank({ i }: { i: number }) {
  if (i > 2) return <span className="lb__rank">{i + 1}</span>;
  const cls = ["is-gold", "is-silver", "is-bronze"][i];
  return (
    <span className={`lb__rank lb__rank--medal ${cls}`}>
      <Medal size={15} strokeWidth={2.2} aria-hidden="true" />
      <span className="sr-only">{i + 1}-oʻrin</span>
    </span>
  );
}

export default function Project() {
  const { done, toggle } = useChecklist();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [failed, setFailed] = useState<Failed[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [studentCount, setStudentCount] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  const run = useCallback(async () => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setState("loading");
    setProgress({ done: 0, total: 0 });

    try {
      const tagged = await discoverTagged(ac.signal);
      const seedRepos = new Set(SEED.map((s) => s.repo));
      // A student who tags a repo that is already seeded should not
      // appear twice.
      const students = tagged.filter((r) => !seedRepos.has(r)).map((repo) => ({ repo }));
      setStudentCount(students.length);

      const all = [...SEED, ...students];
      setProgress({ done: 0, total: all.length });

      const res = await buildBoard(all, ac.signal, (d, t) => setProgress({ done: d, total: t }));
      if (ac.signal.aborted) return;
      setEntries(res.entries);
      setFailed(res.failed);
      setState("ready");
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      setState("error");
    }
  }, []);

  useEffect(() => {
    run();
    return () => abortRef.current?.abort();
  }, [run]);

  const completed = STEPS.filter((s) => done[s.id]).length;

  return (
    <div className="pj">
      <SiteNav />

      <main id="main" className="pj__main">
        <header className="pj__head">
          <p className="pj__eyebrow">Loyiha</p>
          <h1 className="pj__title">Endi oʻzingiznikini quring</h1>
          <p className="pj__lede">
            Darslar qanday qilishni koʻrsatadi. Bu sahifa — oʻsha bilim bilan
            oʻzingiz tanlagan matnda, oʻzingizning modelingizni qurish va uni
            hammaning yonida koʻrsatish uchun.
          </p>
        </header>

        {/* ---- capstone brief ---- */}
        <section className="pj__sec" aria-labelledby="brief-h">
          <div className="pj__sechead">
            <h2 className="pj__h2" id="brief-h">
              Vazifa
            </h2>
            <span className="pj__count">
              {completed} / {STEPS.length}
            </span>
          </div>

          <ol className="steps">
            {STEPS.map((s, i) => {
              const on = !!done[s.id];
              return (
                <li key={s.id} className={`step${on ? " is-done" : ""}`}>
                  <button
                    type="button"
                    className="step__tick"
                    aria-pressed={on}
                    onClick={() => toggle(s.id)}
                  >
                    {on ? (
                      <Check size={14} strokeWidth={3} aria-hidden="true" />
                    ) : (
                      <span className="step__num">{i + 1}</span>
                    )}
                    <span className="sr-only">{s.title} — bajarildi deb belgilash</span>
                  </button>
                  <div className="step__body">
                    <h3 className="step__title">{s.title}</h3>
                    <p className="step__text">{s.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          <p className="pj__note">
            Belgilar faqat shu brauzerda saqlanadi — hisob ochish shart emas.
          </p>
        </section>

        {/* ---- leaderboard ---- */}
        <section className="pj__sec" aria-labelledby="lb-h">
          <div className="pj__sechead">
            <h2 className="pj__h2" id="lb-h">
              <Trophy size={19} strokeWidth={2.1} aria-hidden="true" />
              Reyting
            </h2>
            <button
              type="button"
              className="pj__refresh"
              onClick={run}
              disabled={state === "loading"}
            >
              <RefreshCw size={13} strokeWidth={2.2} aria-hidden="true" />
              Yangilash
            </button>
          </div>

          <p className="pj__lede pj__lede--sm">
            Har bir qator — Hugging Face dan hozir yuklab olingan haqiqiy{" "}
            <code>tokenizer.json</code>. Bir xil oʻzbekcha matn sizning
            brauzeringizda ishlatiladi va natija shu yerda hisoblanadi. Hech kim
            hech qanday raqam yubormaydi — yozib boʻlmaydi, faqat qoʻlga
            kiritiladi.
          </p>

          {state === "loading" && (
            <p className="lb__wait" aria-live="polite">
              <Loader2 size={15} className="spin" aria-hidden="true" />
              Tokenizatorlar yuklanmoqda… {progress.done}/{progress.total}
            </p>
          )}

          {state === "error" && (
            <p className="lb__wait lb__wait--err">
              <TriangleAlert size={15} aria-hidden="true" />
              Reytingni yuklab boʻlmadi. Internetni tekshirib, «Yangilash»ni
              bosing.
            </p>
          )}

          {entries.length > 0 && (
            <div className="lb__scroll">
              <table className="lb">
                <caption className="sr-only">
                  Tokenizatorlar reytingi, bit/belgi boʻyicha saralangan
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className="lb__c-rank">
                      #
                    </th>
                    <th scope="col">Tokenizator</th>
                    <th scope="col" className="lb__num">
                      bit/belgi
                    </th>
                    <th scope="col" className="lb__num">
                      token/soʻz
                    </th>
                    <th scope="col" className="lb__num">
                      lugʻat
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((e, i) => (
                    <tr key={e.repo} className={i === 0 ? "is-first" : undefined}>
                      <td className="lb__c-rank">
                        <Rank i={i} />
                      </td>
                      <td>
                        <a
                          className="lb__repo"
                          href={`https://huggingface.co/${e.repo}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {e.label}
                          <ArrowUpRight size={11} strokeWidth={2.4} aria-hidden="true" />
                        </a>
                        <span className="lb__meta">
                          {e.reference ?? e.repo}
                          {e.unknown > 0 && (
                            <span className="lb__warn" title="Bu belgilarni ifodalay olmadi">
                              {" "}
                              · {e.unknown} nomaʼlum belgi
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="lb__num lb__num--key">{e.bitsPerChar.toFixed(3)}</td>
                      <td className="lb__num">{e.perWord.toFixed(2)}</td>
                      <td className="lb__num">{groupThousands(e.vocabSize)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {state === "ready" && studentCount === 0 && (
            <div className="lb__empty">
              <p>
                <b>Hali birorta talaba qoʻshilmagan.</b> Yuqoridagilar — nashr
                qilingan mashhur tokenizatorlar, ular bilan solishtirish uchun.
                Birinchi boʻlish uchun modelingizni nashr qilib, unga{" "}
                <code>{HUB_TAG}</code> tegini qoʻying.
              </p>
            </div>
          )}

          {failed.length > 0 && (
            <details className="lb__failed">
              <summary>
                {failed.length} ta repo oʻqilmadi — nega?
              </summary>
              <p className="lb__failed-why">
                Bu sahifa faqat <b>bayt darajasidagi BPE</b> tokenizatorlarni
                oʻqiy oladi — kursda yozadiganimizni. SentencePiece va WordPiece
                (XLM-R, mBERT kabi) boshqacha tuzilgan, shuning uchun ularni
                halol solishtirib boʻlmaydi.
              </p>
              <ul>
                {failed.map((f) => (
                  <li key={f.repo}>
                    <code>{f.repo}</code> — {f.reason}
                  </li>
                ))}
              </ul>
            </details>
          )}

          <div className="pj__method">
            <h3>Ball qanday hisoblanadi</h3>
            <p>
              <b>bit/belgi</b> = token soni × log₂(lugʻat hajmi) ÷ belgi soni.
              Kichigi yaxshiroq.
            </p>
            <p>
              Nega faqat <i>token/soʻz</i> emas? Chunki uni aldash oson: lugʻatni
              nihoyatda katta qilsangiz, u har doim pasayadi. Har bir tokenni
              koʻrsatish uchun log₂(lugʻat) bit kerak, shuning uchun bu formula
              lugʻat narxini ham hisobga oladi. Oʻlchadik: BLOOM ning lugʻati
              250 680 ta — uzbek-bpe-16k dan 15 baravar katta — lekin bali
              yomonroq. Katta jadval faqat haqiqatan foyda bersagina yutadi.
            </p>
            <p className="pj__caveat">
              Sinov matni ochiq — u shu sahifa kodida turadi. Uni oʻqitishga
              qoʻshsangiz ball biroz yaxshilanadi. Bu yopiq benchmark emas va
              shunday deb koʻrsatilmayapti ham.
            </p>
          </div>
        </section>

        <section className="pj__sec pj__cta" aria-labelledby="join-h">
          <h2 className="pj__h2" id="join-h">
            Qanday qoʻshilaman
          </h2>
          <p>
            Model kartangizning yuqorisidagi YAML boʻlimiga bitta qator
            qoʻshasiz:
          </p>
          <pre className="pj__code">
            <code>{`---\ntags:\n  - ${HUB_TAG}\n---`}</code>
          </pre>
          <p>
            Tamom. Keyingi safar bu sahifa ochilganda siz reytingda boʻlasiz.
            Hali boshlamagan boʻlsangiz —{" "}
            <Link className="pj__link" to="/learn">
              darslardan boshlang
            </Link>
            .
          </p>
          <p className="pj__caveat">
            Teg ochiq: uni istagan odam qoʻyishi mumkin va bu sahifada
            moderatsiya yoʻq. Ball esa aldanmaydi — u har safar qaytadan
            oʻlchanadi.
          </p>
        </section>
      </main>
    </div>
  );
}

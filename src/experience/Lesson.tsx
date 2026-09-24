import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Backpack, Check, Clock, Lock } from "lucide-react";
import "@fontsource-variable/jetbrains-mono";
import SiteNav from "../components/SiteNav";
import { Blocks, ExerciseCard, LessonProvider } from "../components/Blocks";
import { VideoSlot } from "../components/Media";
import Tutor from "../components/Tutor";
import { lessonMeta } from "../lib/catalog.generated";
import { inline } from "../lib/highlight";
import { useLessonBody } from "../lib/lesson-body";
import { useAuth } from "../auth/AuthProvider";
import { useSeo } from "../lib/seo";
import { lessonPageMeta } from "../lib/seo-routes";
import "./Lesson.css";

/* --------------------------------------------------------------------
   One lesson — a bright, quiet page to learn to code on.

   Three columns on a wide screen: the course on the left, the lesson
   in the middle at a comfortable reading width, and "Bu darsda" on the
   right, following the reader down the page. Everything that is not
   the lesson is held in soft greys so the code and the prose carry the
   colour.

   The shell (title, contents, prev/next) comes from the catalog and
   always renders; the body comes from useLessonBody, which reads free
   courses from the bundle and fetches paid ones from /api/lesson.
   -------------------------------------------------------------------- */

const pad = (n: number | null) => (n === null ? "Kirish" : `Dars ${String(n).padStart(2, "0")}`);

/** "1. Bitta savol" → a numbered heading. */
function splitTitle(t: string): [string | null, string] {
  const m = /^(\d+)\.\s+(.+)$/.exec(t);
  return m ? [m[1], m[2]] : [null, t];
}

export default function Lesson() {
  const { courseId = "", lessonId = "" } = useParams();
  const found = lessonMeta(courseId, lessonId);
  const { session } = useAuth();
  const body = useLessonBody(courseId, lessonId, session?.user?.id ?? null);
  const barRef = useRef<HTMLElement | null>(null);
  const [here, setHere] = useState<string>("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [courseId, lessonId]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-page", "lesson");
    return () => root.removeAttribute("data-page");
  }, []);

  // Reading progress, written straight to the bar.
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Which section is being read, for the outline on the right.
  const ready = body.state === "ready" ? body.lesson : null;
  useEffect(() => {
    if (!ready) return;
    const els = ready.sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top) setHere(top.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ready]);

  useSeo(
    found ? lessonPageMeta(found.course.name, ready ?? found.lesson) : null,
    `/learn/${courseId}/${lessonId}`
  );

  if (!found) return <Navigate to="/learn" replace />;
  const { course, lesson, prev, next, index } = found;

  return (
    <div className="lx">
      <SiteNav />
      <div className="lx__progress" aria-hidden="true">
        <i ref={barRef as never} />
      </div>

      <div className="lx__stage">
        {/* ---- the course ---------------------------------------- */}
        <aside className="lx__side" aria-label="Kurs mundarijasi">
          <Link className="lx__back" to="/learn">
            <ArrowLeft size={14} strokeWidth={2.2} aria-hidden="true" />
            Barcha darslar
          </Link>
          <p className="lx__course">{course.name}</p>
          <p className="lx__count">
            {index + 1} / {course.lessons.length} dars
          </p>
          <ol className="lx__lessons">
            {course.lessons.map((l, i) => {
              const cur = l.id === lesson.id;
              return (
                <li key={l.id}>
                  <Link
                    to={`/learn/${course.id}/${l.id}`}
                    className={`lx__lesson${cur ? " is-here" : ""}${i < index ? " is-done" : ""}`}
                    aria-current={cur ? "page" : undefined}
                  >
                    <span className="lx__lesson-n">
                      {i < index ? <Check size={12} strokeWidth={3} aria-hidden="true" /> : l.n ?? "·"}
                    </span>
                    <span>{l.title}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </aside>

        {/* ---- the lesson ---------------------------------------- */}
        <main id="main" className="lx__main">
          <header className="lx__head">
            <p className="lx__eyebrow">
              {course.name} · {pad(lesson.n)}
            </p>
            <h1>{lesson.title}</h1>
            <div className="lx__meta">
              <span>
                <Clock size={14} strokeWidth={2.2} aria-hidden="true" />~{lesson.minutes} daqiqa
              </span>
              {ready?.needs && (
                <span>
                  <Backpack size={14} strokeWidth={2.2} aria-hidden="true" />
                  <span>Kerak: {inline(ready.needs)}</span>
                </span>
              )}
            </div>
          </header>

          {body.state === "loading" && <Skeleton />}
          {body.state === "error" && (
            <p className="lx__error" role="alert">
              {body.message}
            </p>
          )}
          {body.state === "locked" && <Paywall courseName={course.name} needsAuth={body.needsAuth} />}

          {ready && (
            <LessonProvider course={course.id} lesson={lesson.id}>
              <VideoSlot video={ready.video} title={`${pad(lesson.n)} — ${lesson.title}`} />

              {ready.intro.length > 0 && (
                <div className="lx__intro">
                  <Blocks blocks={ready.intro} />
                </div>
              )}

              {ready.sections.map((s) => {
                const [num, title] = splitTitle(s.title);
                return (
                  <section className="lx__section" key={s.id} id={s.id}>
                    <h2 className="lx__h2">
                      {num && <span className="lx__h2-n">{num}</span>}
                      <span>{inline(title)}</span>
                    </h2>
                    <Blocks blocks={s.blocks} />
                  </section>
                );
              })}

              {ready.exercises.length > 0 && (
                <section className="lx__section" id="mashqlar">
                  <h2 className="lx__h2">Mashqlar</h2>
                  {ready.exercises.map((ex) => (
                    <ExerciseCard key={ex.id} ex={ex} />
                  ))}
                </section>
              )}
            </LessonProvider>
          )}

          <nav className="lx__pager" aria-label="Darslar orasida yurish">
            {prev ? (
              <Link className="lx__page" to={`/learn/${course.id}/${prev.id}`}>
                <ArrowLeft size={16} strokeWidth={2.2} aria-hidden="true" />
                <span>
                  <small>Oldingi</small>
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link className="lx__page lx__page--next" to={`/learn/${course.id}/${next.id}`}>
                <span>
                  <small>Keyingi dars</small>
                  {next.title}
                </span>
                <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </Link>
            ) : (
              <span className="lx__page lx__page--next lx__page--soon">
                <span>
                  <small>Keyingi dars</small>
                  Tez orada qoʻshiladi
                </span>
              </span>
            )}
          </nav>
        </main>

        {/* ---- this lesson -------------------------------------- */}
        {ready && ready.sections.length > 2 && (
          <nav className="lx__outline" aria-label="Bu darsda">
            <p>Bu darsda</p>
            <ol>
              {ready.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className={here === s.id ? "is-here" : undefined}>
                    {splitTitle(s.title)[1].replace(/[`*]/g, "")}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>

      {ready && <Tutor lesson={`${pad(lesson.n)} — ${lesson.title}`} course={course.name} />}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="lx__skel" aria-hidden="true">
      {[92, 84, 61, 0, 88, 72].map((w, i) =>
        w ? <span key={i} style={{ width: `${w}%` }} /> : <span key={i} className="is-block" />
      )}
    </div>
  );
}

function Paywall({ courseName, needsAuth }: { courseName: string; needsAuth: boolean }) {
  const { pathname } = useLocation();
  return (
    <div className="lx__paywall">
      <Lock size={18} strokeWidth={2.2} aria-hidden="true" />
      <h2>Bu dars pullik kursda</h2>
      <p>
        <strong>{courseName}</strong> kursini bir marta sotib olsangiz, barcha darslari umrbod
        ochiq boʻladi — kelajakda qoʻshiladiganlari ham.
      </p>
      {needsAuth ? (
        <Link className="lx__cta" to="/kirish" state={{ from: pathname }}>
          Kirish yoki roʻyxatdan oʻtish
        </Link>
      ) : (
        <Link className="lx__cta" to="/hisobim">
          Kursni sotib olish
        </Link>
      )}
    </div>
  );
}

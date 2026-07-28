import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Clock, ListTree } from "lucide-react";
import SiteNav from "../components/SiteNav";
import { Blocks, ExerciseCard } from "../components/Blocks";
import Tutor from "../components/Tutor";
import { findLesson } from "../lib/curriculum";
import "./Lesson.css";

export default function Lesson() {
  const { courseId = "", lessonId = "" } = useParams();
  const found = findLesson(courseId, lessonId);

  // A new lesson starts at the top, not wherever the last one was left.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [courseId, lessonId]);

  if (!found) return <Navigate to="/learn" replace />;
  const { course, lesson, prev, next, index } = found;

  const label = (n: number | null) => (n === null ? "Start" : `Dars ${n}`);

  return (
    <div className="lsn">
      <div className="lsn__veil" aria-hidden="true" />
      <SiteNav />

      <div className="lsn__stage">
        {/* course contents */}
        <aside className="lsn__side" aria-label="Kurs mundarijasi">
          <Link className="lsn__back" to="/learn">
            <ArrowLeft size={13} strokeWidth={2.2} aria-hidden="true" />
            Barcha darslar
          </Link>

          <p className="lsn__course">{course.name}</p>
          <p className="lsn__progress">
            {index + 1} / {course.lessons.length}
          </p>

          <ol className="toc">
            {course.lessons.map((l, i) => {
              const here = l.id === lesson.id;
              const done = i < index;
              const newPart = l.part && l.part !== course.lessons[i - 1]?.part;
              return (
                <li key={l.id}>
                  {newPart && <span className="toc__part">{l.part}</span>}
                  <Link
                    className={`toc__item${here ? " is-here" : ""}${done ? " is-done" : ""}${l.status === "soon" ? " is-soon" : ""}`}
                    to={`/learn/${course.id}/${l.id}`}
                    aria-current={here ? "page" : undefined}
                  >
                    <span className="toc__n">
                      {done ? (
                        <Check size={11} strokeWidth={3} aria-hidden="true" />
                      ) : l.n === null ? (
                        "·"
                      ) : (
                        l.n
                      )}
                    </span>
                    <span className="toc__t">{l.title}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </aside>

        {/* lesson body */}
        <main id="main" className="lsn__main">
          <header className="lsn__head">
            <span className="lsn__eyebrow">
              <ListTree size={12} strokeWidth={2.2} aria-hidden="true" />
              {label(lesson.n)}
              <span className="lsn__dot" aria-hidden="true" />
              <Clock size={12} strokeWidth={2.2} aria-hidden="true" />
              {lesson.minutes} daqiqa
            </span>
            <h1 className="lsn__title">{lesson.title}</h1>
            <p className="lsn__sub">{lesson.subtitle}</p>
          </header>

          <div className="lsn__intro">
            <Blocks blocks={lesson.intro} />
          </div>

          {lesson.sections.map((s) => (
            <section className="lsn__section" key={s.id} id={s.id}>
              <h2 className="lsn__h2">{s.title}</h2>
              <Blocks blocks={s.blocks} />
            </section>
          ))}

          {lesson.exercises.length > 0 && (
            <section className="lsn__section" id="mashqlar">
              <h2 className="lsn__h2">Mashqlar</h2>
              <p className="lsn__exlead">
                Avval oʻzingiz yechib koʻring — keyingina javobni oching.
              </p>
              <div className="lsn__exlist">
                {lesson.exercises.map((ex) => (
                  <ExerciseCard key={ex.id} ex={ex} />
                ))}
              </div>
            </section>
          )}

          <nav className="lsn__foot" aria-label="Darslar orasida yurish">
            {prev ? (
              <Link className="pager pager--prev" to={`/learn/${course.id}/${prev.id}`}>
                <ArrowLeft size={15} strokeWidth={2.2} aria-hidden="true" />
                <span>
                  <span className="pager__k">Oldingi</span>
                  <span className="pager__t">{prev.title}</span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link className="pager pager--next" to={`/learn/${course.id}/${next.id}`}>
                <span>
                  <span className="pager__k">Keyingi</span>
                  <span className="pager__t">{next.title}</span>
                </span>
                <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
              </Link>
            ) : (
              <Link className="pager pager--next" to="/learn">
                <span>
                  <span className="pager__k">Kurs tugadi</span>
                  <span className="pager__t">Barcha darslar</span>
                </span>
                <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
              </Link>
            )}
          </nav>
        </main>
      </div>

      {/* Answers questions about THIS lesson, in Uzbek. */}
      <Tutor lesson={`${label(lesson.n)} — ${lesson.title}`} course={course.name} />
    </div>
  );
}

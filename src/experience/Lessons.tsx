import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Braces, Brain, ChevronRight, Dumbbell, Lock } from "lucide-react";
import SiteNav from "../components/SiteNav";
import { TOKENIZER_COURSE, type Course } from "../lib/curriculum";
import { TRANSFORMER_COURSE } from "../lib/curriculum-transformer";
import "./Lessons.css";

/* --------------------------------------------------------------------
   The Darslar tree.

   Everything lives on one page and expands in place:

     [Tokenizator] ─┬─ [Tokenizator qurish] ─┬─ [Qanday oʻqish kerak]
                    │                        ├─ [Dars 0 …]
                    │                        └─ …
     [Til modeli]
     [Oʻqitish]

   Opening a track grows its row, so the tracks beneath it move down.
   Connectors are measured from real DOM positions after layout, so the
   lines always land on the boxes however the tree reflows.

   AUTHOR: Tokenizator (9 lessons) and Til modeli (transformer, 9 of 18
   written) carry real content. Oʻqitish is a placeholder named after
   Noldan's own stated scope — rename or replace it freely.
   -------------------------------------------------------------------- */

type Track = {
  id: string;
  name: string;
  glyph: ReactNode;
  status: "available" | "soon";
  courses: Course[];
};

const TRACKS: Track[] = [
  {
    id: "tokenizator",
    name: "Tokenizator",
    glyph: <Braces size={22} strokeWidth={2} aria-hidden="true" />,
    status: "available",
    courses: [TOKENIZER_COURSE],
  },
  {
    id: "til-modeli",
    name: "Til modeli",
    glyph: <Brain size={22} strokeWidth={2} aria-hidden="true" />,
    status: "available",
    courses: [TRANSFORMER_COURSE],
  },
  {
    id: "oqitish",
    name: "Oʻqitish",
    glyph: <Dumbbell size={22} strokeWidth={2} aria-hidden="true" />,
    status: "soon",
    courses: [],
  },
];

export default function Lessons() {
  const [openTrack, setOpenTrack] = useState<string | null>(null);
  const [openCourse, setOpenCourse] = useState<string | null>(null);
  const [wires, setWires] = useState<string[]>([]);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const nodes = useRef<Record<string, HTMLElement | null>>({});

  const track = TRACKS.find((t) => t.id === openTrack) ?? null;
  const course = track?.courses.find((c) => c.id === openCourse) ?? null;

  const toggleTrack = (id: string) => {
    setOpenCourse(null);
    setOpenTrack((cur) => (cur === id ? null : id));
  };
  const toggleCourse = (id: string) =>
    setOpenCourse((cur) => (cur === id ? null : id));

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const measure = () => {
      const wb = wrap.getBoundingClientRect();
      const box = (id: string) => {
        const el = nodes.current[id];
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { l: r.left - wb.left, t: r.top - wb.top, w: r.width, h: r.height };
      };
      const out: string[] = [];
      const link = (fromId: string, toId: string) => {
        const a = box(fromId);
        const b = box(toId);
        if (!a || !b) return;
        const x1 = a.l + a.w;
        const y1 = a.t + a.h / 2;
        const x2 = b.l;
        const y2 = b.t + b.h / 2;
        const bend = Math.max(20, (x2 - x1) * 0.55);
        out.push(`M${x1},${y1} C${x1 + bend},${y1} ${x2 - bend},${y2} ${x2},${y2}`);
      };

      if (track) {
        track.courses.forEach((c) => link(`track-${track.id}`, `course-${c.id}`));
        if (course) {
          course.lessons.forEach((l) => link(`course-${course.id}`, `lesson-${l.id}`));
        }
      }
      setWires(out);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    const id = window.setTimeout(measure, 400);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.clearTimeout(id);
      window.removeEventListener("resize", measure);
    };
  }, [track, course]);

  return (
    <div className="lessons">
      <div className="lessons__veil" aria-hidden="true" />
      <SiteNav />

      <main id="main" className="lwrap">
        <header className="lhead">
          <span className="lhead__eyebrow">Kurslar</span>
          <h1 className="lhead__title">Darslar</h1>
          <p className="lhead__hint">
            Yoʻnalishni ochib kursni koʻring, kursni ochib darslarni boshlang.
          </p>
        </header>

        <div className="tree" ref={wrapRef}>
          <svg className="tree__wires" aria-hidden="true">
            {wires.map((d, i) => (
              <path key={i} className="twire" d={d} />
            ))}
          </svg>

          {TRACKS.map((t) => {
            const open = openTrack === t.id;
            const lessonCount = t.courses.reduce((n, c) => n + c.lessons.length, 0);
            return (
              <div className="trow" key={t.id}>
                {t.status === "available" ? (
                  <button
                    type="button"
                    className={`tbox${open ? " is-open" : ""}`}
                    aria-expanded={open}
                    onClick={() => toggleTrack(t.id)}
                    ref={(el) => {
                      nodes.current[`track-${t.id}`] = el;
                    }}
                  >
                    <span className="tbox__glyph">{t.glyph}</span>
                    <span className="tbox__body">
                      <span className="tbox__name">{t.name}</span>
                      <span className="tbox__meta">
                        {t.courses.length} kurs &middot; {lessonCount} dars
                      </span>
                    </span>
                    <ChevronRight
                      size={18}
                      strokeWidth={2}
                      className="tbox__chev"
                      aria-hidden="true"
                    />
                  </button>
                ) : (
                  <div className="tbox tbox--soon">
                    <span className="tbox__glyph tbox__glyph--ghost">{t.glyph}</span>
                    <span className="tbox__body">
                      <span className="tbox__name">{t.name}</span>
                      <span className="tbox__meta">
                        <Lock size={11} strokeWidth={2.2} aria-hidden="true" /> Tez orada
                      </span>
                    </span>
                  </div>
                )}

                {open && (
                  <div className="branch">
                    {t.courses.map((c, ci) => {
                      const cOpen = openCourse === c.id;
                      return (
                        <div className="crow" key={c.id}>
                          <button
                            type="button"
                            className={`cbox${cOpen ? " is-open" : ""}`}
                            aria-expanded={cOpen}
                            style={{ ["--i" as string]: ci }}
                            onClick={() => toggleCourse(c.id)}
                            ref={(el) => {
                              nodes.current[`course-${c.id}`] = el;
                            }}
                          >
                            <span className="cbox__badge">{c.short}</span>
                            <span className="cbox__body">
                              <span className="cbox__name">{c.name}</span>
                              <span className="cbox__meta">{c.lessons.length} dars</span>
                            </span>
                            <ChevronRight
                              size={16}
                              strokeWidth={2}
                              className="cbox__chev"
                              aria-hidden="true"
                            />
                          </button>

                          {cOpen && (
                            <div className="branch branch--lessons">
                              {c.lessons.map((l, li) => (
                                <Link
                                  className={`lbox${l.status === "soon" ? " is-soon" : ""}`}
                                  key={l.id}
                                  to={`/learn/${c.id}/${l.id}`}
                                  style={{ ["--i" as string]: li }}
                                  ref={(el) => {
                                    nodes.current[`lesson-${l.id}`] = el;
                                  }}
                                >
                                  <span className="lbox__n">
                                    {l.n === null ? "·" : String(l.n).padStart(2, "0")}
                                  </span>
                                  <span className="lbox__title">{l.title}</span>
                                  <span className="lbox__go">
                                    <ChevronRight
                                      size={14}
                                      strokeWidth={2.4}
                                      aria-hidden="true"
                                    />
                                  </span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

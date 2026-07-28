import { Suspense, lazy, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import SmoothScroll from "./components/SmoothScroll";
import LatticeField from "./components/LatticeField";
import AutoTour from "./components/AutoTour";
import Intro from "./components/Intro";
import ErrorBoundary from "./components/ErrorBoundary";

/* Route-split: the homepage should not download the whole curriculum,
   every visualisation, the Playground and the tutor before it paints. */
const Experience = lazy(() => import("./experience/Experience"));
const Lessons = lazy(() => import("./experience/Lessons"));
const Lesson = lazy(() => import("./experience/Lesson"));
const Playground = lazy(() => import("./experience/Playground"));
import { SHOW_INTRO } from "./lib/intro";

function Shell() {
  const { pathname } = useLocation();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* One page-wide neural-net field behind everything. */}
      <LatticeField />

      <Suspense fallback={<div className="route-wait" aria-live="polite" />}>
      <Routes>
        <Route path="/" element={<Experience />} />
        <Route path="/learn" element={<Lessons />} />
        <Route path="/learn/:courseId/:lessonId" element={<Lesson />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </Suspense>

      {/* The guided tour paces the home experience only. */}
      {pathname === "/" && <AutoTour />}
    </>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(SHOW_INTRO);

  return (
    <SmoothScroll>
      <ErrorBoundary>
        <Shell />
      </ErrorBoundary>
      {showIntro && <Intro onDone={() => setShowIntro(false)} />}
    </SmoothScroll>
  );
}

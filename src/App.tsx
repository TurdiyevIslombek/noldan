import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import SmoothScroll from "./components/SmoothScroll";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./auth/AuthProvider";
import { RouteSeo } from "./lib/seo";

/* Route-split: the homepage should not download the whole curriculum,
   every visualisation, the Playground and the tutor before it paints. */
const Landing = lazy(() => import("./stars/Landing"));
/* The previous homepage, kept reachable rather than deleted. */
const Home = lazy(() => import("./home/Home"));
const Lessons = lazy(() => import("./experience/Lessons"));
const Lesson = lazy(() => import("./experience/Lesson"));
const Playground = lazy(() => import("./experience/Playground"));
const Project = lazy(() => import("./experience/Project"));
const AuthPage = lazy(() => import("./auth/AuthPage"));
const Account = lazy(() => import("./auth/Account"));
const NotFound = lazy(() => import("./experience/NotFound"));

export default function App() {
  return (
    <AuthProvider>
      <SmoothScroll>
        <ErrorBoundary>
          <RouteSeo />
          <a className="skip-link" href="#main">
            Asosiy qismga oʻtish
          </a>

          <Suspense fallback={<div className="route-wait" aria-live="polite" />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/eski" element={<Home />} />
              <Route path="/learn" element={<Lessons />} />
              <Route path="/learn/:courseId/:lessonId" element={<Lesson />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/loyiha" element={<Project />} />
              <Route path="/kirish" element={<AuthPage />} />
              <Route path="/hisobim" element={<Account />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </SmoothScroll>
    </AuthProvider>
  );
}

import { Link, useLocation } from "react-router-dom";
import { Github, MessagesSquare } from "lucide-react";
import "./SiteNav.css";

/* Set VITE_GITHUB_URL once the repo is public and the icon becomes a
   real link; leave it unset and it stays visibly inert. */
const GITHUB_URL = import.meta.env.VITE_GITHUB_URL as string | undefined;

export default function SiteNav() {
  const { pathname } = useLocation();
  const onLessons = pathname.startsWith("/learn");

  return (
    <nav className="snav" aria-label="Asosiy menyu">
      <Link className="snav__brand" to="/">
        Nol<span>dan</span>
      </Link>

      <div className="snav__center">
        <Link className={`snav__item${pathname === "/" ? " is-active" : ""}`} to="/">
          {pathname === "/" && <span className="snav__dot" aria-hidden="true" />}
          Bosh sahifa
        </Link>
        <Link className={`snav__item${onLessons ? " is-active" : ""}`} to="/learn">
          {onLessons && <span className="snav__dot" aria-hidden="true" />}
          Darslar
        </Link>
        <Link
          className={`snav__item${pathname === "/playground" ? " is-active" : ""}`}
          to="/playground"
        >
          {pathname === "/playground" && <span className="snav__dot" aria-hidden="true" />}
          Mashq maydoni
        </Link>
        <Link
          className={`snav__item${pathname === "/loyiha" ? " is-active" : ""}`}
          to="/loyiha"
        >
          {pathname === "/loyiha" && <span className="snav__dot" aria-hidden="true" />}
          Loyiha
        </Link>
      </div>

      <div className="snav__right">
        <a
          className="snav__icon"
          href="https://huggingface.co/IslombekT"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Hugging Face"
        >
          <MessagesSquare size={16} strokeWidth={2} aria-hidden="true" />
        </a>
        {GITHUB_URL ? (
          <a
            className="snav__icon"
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github size={16} strokeWidth={2} aria-hidden="true" />
          </a>
        ) : (
          /* Genuinely inert until the repo exists — `disabled` so it does
             not invite a click that does nothing. */
          <button
            type="button"
            className="snav__icon is-inert"
            disabled
            aria-label="GitHub — tez orada"
          >
            <Github size={16} strokeWidth={2} aria-hidden="true" />
          </button>
        )}
        <span className="snav__avatar" aria-hidden="true">
          IS
        </span>
      </div>
    </nav>
  );
}

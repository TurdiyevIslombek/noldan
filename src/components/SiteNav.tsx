import { Link, useLocation } from "react-router-dom";
import { Github, MessagesSquare } from "lucide-react";
import "./SiteNav.css";

export default function SiteNav() {
  const { pathname } = useLocation();
  const onLessons = pathname.startsWith("/learn");

  return (
    <nav className="snav" aria-label="Primary">
      <Link className="snav__brand" to="/">
        Nol<span>dan</span>
      </Link>

      <div className="snav__center">
        <Link className={`snav__item${pathname === "/" ? " is-active" : ""}`} to="/">
          {pathname === "/" && <span className="snav__dot" aria-hidden="true" />}
          Home
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
          Playground
        </Link>
        <span className="snav__item is-soon" title="Tez orada">
          Loyiha
        </span>
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
        <button type="button" className="snav__icon" aria-label="GitHub (tez orada)">
          <Github size={16} strokeWidth={2} aria-hidden="true" />
        </button>
        <span className="snav__avatar" aria-hidden="true">
          IS
        </span>
      </div>
    </nav>
  );
}

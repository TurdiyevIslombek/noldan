import { Component, type ErrorInfo, type ReactNode } from "react";
import "./ErrorBoundary.css";

/* --------------------------------------------------------------------
   Without this, a single throw anywhere in a lesson or visualisation
   unmounts the whole tree and leaves a blank white page. A student
   would just see nothing and assume the site is broken.
   -------------------------------------------------------------------- */

type Props = { children: ReactNode };
type State = { error: Error | null };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Keep it in the console for whoever is debugging; no telemetry here.
    console.error("Noldan: render xatosi", error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="eb">
        <div className="eb__card">
          <p className="eb__eyebrow">Kutilmagan xato</p>
          <h1 className="eb__title">Bu sahifa yuklanmadi</h1>
          <p className="eb__body">
            Xatolik bizning tomonda. Sahifani yangilab koʻring — muammo
            takrorlansa, boshqa boʻlimga oʻtib turing.
          </p>
          <div className="eb__row">
            <button
              type="button"
              className="eb__btn"
              onClick={() => window.location.reload()}
            >
              Sahifani yangilash
            </button>
            <a className="eb__link" href="/">
              Bosh sahifa
            </a>
          </div>
          <pre className="eb__detail">{error.message}</pre>
        </div>
      </div>
    );
  }
}

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Play, Pause, RotateCcw, Square } from "lucide-react";
import {
  getScrollProgress,
  scrollToProgress,
} from "./SmoothScroll";
import "./AutoTour.css";

/** Seconds to traverse the entire document at 1x. 2x halves it. */
const TOUR_DURATION_1X = 20;

/** Restart only becomes meaningful once the reader has actually moved. */
const RESTART_THRESHOLD = 0.02;

type Phase = "idle" | "running" | "paused" | "done";

const SCROLL_KEYS = new Set([
  "PageUp",
  "PageDown",
  "Home",
  "End",
  " ",
  "Spacebar",
  "ArrowUp",
  "ArrowDown",
]);

export default function AutoTour() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [speed, setSpeed] = useState<1 | 2>(1);
  const [canRestart, setCanRestart] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const readoutRef = useRef<HTMLSpanElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const carrierRef = useRef({ p: 0 });
  const speedRef = useRef<1 | 2>(1);
  speedRef.current = speed;

  /* Progress is written straight to the DOM. Re-rendering React 60 times
     a second to move a number would be the most expensive thing on the
     page, and it would fight the scroll loop for main-thread time. */
  const paint = useCallback((p: number) => {
    const clamped = Math.min(Math.max(p, 0), 1);
    rootRef.current?.style.setProperty("--tour-progress", String(clamped));
    if (readoutRef.current) {
      readoutRef.current.textContent = `${Math.round(clamped * 100)}%`;
    }
    const next = clamped > RESTART_THRESHOLD;
    setCanRestart((prev) => (prev === next ? prev : next));
  }, []);

  const killTween = useCallback(() => {
    tweenRef.current?.kill();
    tweenRef.current = null;
  }, []);

  const run = useCallback(
    (from: number) => {
      killTween();
      const start = Math.min(Math.max(from, 0), 1);
      if (start >= 0.999) {
        setPhase("done");
        return;
      }
      carrierRef.current.p = start;

      // Duration is scaled by the remaining distance so resuming from
      // halfway takes half the time — the stated 20s always describes a
      // full traversal, whatever the document height happens to be.
      const remaining = 1 - start;
      const duration = (TOUR_DURATION_1X * remaining) / speedRef.current;

      tweenRef.current = gsap.to(carrierRef.current, {
        p: 1,
        duration,
        ease: "none",
        onUpdate: () => {
          const p = carrierRef.current.p;
          scrollToProgress(p, true);
          paint(p);
        },
        onComplete: () => {
          tweenRef.current = null;
          paint(1);
          setPhase("done");
        },
      });
      setPhase("running");
    },
    [killTween, paint]
  );

  const pause = useCallback(() => {
    if (!tweenRef.current) return;
    killTween();
    setPhase("paused");
  }, [killTween]);

  const stop = useCallback(() => {
    // Escape: abandon the tour, leave the reader exactly where they are.
    killTween();
    setPhase((prev) => (prev === "running" || prev === "paused" ? "idle" : prev));
  }, [killTween]);

  const restart = useCallback(() => {
    killTween();
    scrollToProgress(0, true);
    paint(0);
    run(0);
  }, [killTween, paint, run]);

  const onPrimary = useCallback(() => {
    if (phase === "running") {
      pause();
    } else if (phase === "done") {
      restart();
    } else {
      run(getScrollProgress());
    }
  }, [phase, pause, restart, run]);

  /* ---- manual input always wins over the tour --------------------- */
  useEffect(() => {
    const root = rootRef.current;

    const bail = () => {
      if (tweenRef.current) pause();
    };

    const onWheel = () => bail();
    const onTouch = () => bail();
    const onPointerDown = (e: PointerEvent) => {
      // Clicking the control itself must not pause it.
      if (root && e.target instanceof Node && root.contains(e.target)) return;
      bail();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        stop();
        return;
      }
      if (SCROLL_KEYS.has(e.key)) bail();
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [pause, stop]);

  /* ---- keep the readout truthful when the reader scrolls manually -- */
  useEffect(() => {
    let raf = 0;
    let last = -1;
    const sample = () => {
      if (!tweenRef.current) {
        const p = getScrollProgress();
        if (Math.abs(p - last) > 0.002) {
          last = p;
          paint(p);
        }
      }
      raf = requestAnimationFrame(sample);
    };
    raf = requestAnimationFrame(sample);
    return () => cancelAnimationFrame(raf);
  }, [paint]);

  // Unmounting (including a route change) must not leave a tween driving
  // the scroll position of a page that no longer exists.
  useEffect(() => killTween, [killTween]);

  const label =
    phase === "running"
      ? "Toʻxtatib turish"
      : phase === "paused"
        ? "Davom ettirish"
        : phase === "done"
          ? "Qaytadan"
          : "Avtomatik koʻrish";

  const Icon =
    phase === "running" ? Pause : phase === "done" ? RotateCcw : Play;

  return (
    <div className="tour" ref={rootRef}>
      <div className="tour__track" aria-hidden="true">
        <span className="tour__fill" />
      </div>

      <div className="tour__row">
        <button
          type="button"
          className="tour__primary"
          onClick={onPrimary}
          aria-label={label}
        >
          <Icon size={13} strokeWidth={2.2} aria-hidden="true" />
          <span>{label}</span>
        </button>

        <span className="tour__readout" ref={readoutRef}>
          0%
        </span>

        <div className="tour__speeds" role="group" aria-label="Koʻrish tezligi">
          {([1, 2] as const).map((s) => (
            <button
              key={s}
              type="button"
              className={`tour__speed${speed === s ? " is-active" : ""}`}
              aria-pressed={speed === s}
              onClick={() => {
                setSpeed(s);
                speedRef.current = s;
                // Re-time an in-flight tour immediately.
                if (tweenRef.current) run(carrierRef.current.p);
              }}
            >
              {s}&times;
            </button>
          ))}
        </div>

        {canRestart && (
          <button
            type="button"
            className="tour__ghost"
            onClick={restart}
            aria-label="Boshidan qayta koʻrish"
          >
            <RotateCcw size={12} strokeWidth={2.2} aria-hidden="true" />
          </button>
        )}

        {(phase === "running" || phase === "paused") && (
          <button
            type="button"
            className="tour__ghost"
            onClick={stop}
            aria-label="Toʻxtatish va shu yerda qolish"
          >
            <Square size={11} strokeWidth={2.4} aria-hidden="true" />
          </button>
        )}
      </div>

      <p className="sr-only" aria-live="polite">
        Avtomatik koʻrish:{" "}
        {phase === "running"
          ? "davom etmoqda"
          : phase === "paused"
            ? "toʻxtatildi"
            : phase === "done"
              ? "tugadi"
              : "boshlanmagan"}
      </p>
    </div>
  );
}

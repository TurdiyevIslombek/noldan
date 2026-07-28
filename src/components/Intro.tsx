import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { markIntroDone } from "../lib/intro";
import { stopSmooth, startSmooth } from "./SmoothScroll";
import IntroNet from "./IntroNet";
import "./Intro.css";

gsap.registerPlugin(useGSAP);

/* --------------------------------------------------------------------
   The arrival.

   Focal thesis: noise resolves into structure, and then you move INTO
   that structure. So this is not a loader that fades — the network the
   visitor watches assemble is the same network the page runs on. On
   exit the cover dissolves while the net scales and drifts toward where
   the live field actually sits, so the two read as one object and one
   continuous move.

   Everything is skippable, and reduced motion skips it entirely.
   -------------------------------------------------------------------- */

export default function Intro({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const netProgress = useRef(0);

  useGSAP(
    (_context, contextSafe) => {
      const root = rootRef.current;
      if (!root) return;

      stopSmooth();

      let exited = false;
      const safe = contextSafe ?? (<T,>(fn: T) => fn);

      const exit = safe(() => {
        if (exited) return;
        exited = true;

        // The hero reveal starts as the cover begins to lift, so the two
        // motions overlap instead of queueing.
        markIntroDone();
        startSmooth();

        const out = gsap.timeline({ onComplete: onDone });

        // Wordmark and tagline leave first, and faster than they arrived.
        out.to(
          [".intro__word", ".intro__tag"],
          { y: -14, opacity: 0, duration: 0.22, ease: "power2.in", stagger: 0.04 },
          0
        );

        // The net keeps growing toward the live field's position on the
        // right, so it reads as the camera moving in rather than a fade.
        out.to(
          ".intro__netwrap",
          { scale: 2.9, xPercent: 14, opacity: 0, duration: 0.9, ease: "power2.inOut" },
          0.05
        );

        // The paper cover dissolves early, revealing the real field behind
        // while the intro net is still on screen and overlapping it.
        out.to(".intro__bg", { opacity: 0, duration: 0.6, ease: "none" }, 0.12);

        out.to(root, { autoAlpha: 0, duration: 0.2 }, 0.72);
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.set(root, { autoAlpha: 1 })
        .to(netProgress, { current: 1, duration: 1.9, ease: "power2.inOut" }, 0)
        .from(".intro__word", { yPercent: 40, opacity: 0, duration: 0.7 }, 0.85)
        .from(".intro__tag", { opacity: 0, duration: 0.55 }, 1.15)
        .to({}, { duration: 0.45 })
        .add(exit);

      const onSkip = safe(() => exit());
      window.addEventListener("wheel", onSkip, { passive: true, once: true });
      window.addEventListener("touchstart", onSkip, { passive: true, once: true });
      window.addEventListener("keydown", onSkip, { once: true });
      root.addEventListener("pointerdown", onSkip, { once: true });

      return () => {
        window.removeEventListener("wheel", onSkip);
        window.removeEventListener("touchstart", onSkip);
        window.removeEventListener("keydown", onSkip);
        root.removeEventListener("pointerdown", onSkip);
        startSmooth();
      };
    },
    { scope: rootRef }
  );

  return (
    <div className="intro" ref={rootRef} role="status" aria-label="Noldan yuklanmoqda">
      <div className="intro__bg" aria-hidden="true" />
      <div className="intro__stage">
        <div className="intro__netwrap">
          <IntroNet progressRef={netProgress} />
        </div>
        <div className="intro__word">
          Nol<span>dan</span>
        </div>
        <div className="intro__tag">Til modelini noldan quramiz</div>
        <button
          type="button"
          className="intro__skip"
          onClick={() => rootRef.current?.dispatchEvent(new PointerEvent("pointerdown"))}
        >
          Oʻtkazib yuborish
        </button>
      </div>
    </div>
  );
}

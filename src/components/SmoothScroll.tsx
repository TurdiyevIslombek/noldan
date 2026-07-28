import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* --------------------------------------------------------------------
   Module-level handle to the single Lenis instance.

   Auto Tour needs to drive scrolling imperatively. Rather than thread a
   context through the tree for one object, expose a tiny imperative API.
   Every function degrades to native scrolling when Lenis is absent
   (reduced motion, or before mount).
   -------------------------------------------------------------------- */
let lenis: Lenis | null = null;

export function getMaxScroll(): number {
  return Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  );
}

export function getScrollY(): number {
  return window.scrollY || document.documentElement.scrollTop || 0;
}

/** Current document progress, 0..1, independent of document height. */
export function getScrollProgress(): number {
  const max = getMaxScroll();
  return max <= 0 ? 0 : Math.min(Math.max(getScrollY() / max, 0), 1);
}

export function scrollToY(y: number, immediate = false): void {
  if (lenis) {
    lenis.scrollTo(y, { immediate, force: true });
    return;
  }
  window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" });
}

/** Jump to a normalized document position, 0..1. */
export function scrollToProgress(p: number, immediate = false): void {
  scrollToY(Math.min(Math.max(p, 0), 1) * getMaxScroll(), immediate);
}

export function stopSmooth(): void {
  lenis?.stop();
}

export function startSmooth(): void {
  lenis?.start();
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Under reduced motion we do not smooth at all. Native scrolling is
    // the accessible default; ScrollTrigger listens to it directly.
    if (reduced) return;

    const instance = new Lenis({
      duration: 1.05,
      // Wheel and touch only. Keyboard (Space, PageUp/Down, Home/End,
      // arrows) is left to the browser so focus tracking and a11y
      // behaviour stay intact.
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.4,
      wheelMultiplier: 1,
    });
    lenis = instance;

    // Anchor links must still work with smoothing active.
    const onAnchorClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!el) return;
      const id = el.getAttribute("href");
      if (!id || id === "#") return;
      const dest = document.querySelector(id);
      if (!dest) return;
      e.preventDefault();
      instance.scrollTo(dest as HTMLElement, { offset: 0 });
    };
    document.addEventListener("click", onAnchorClick);

    const onLenisScroll = () => ScrollTrigger.update();
    instance.on("scroll", onLenisScroll);

    /* Lenis is driven by GSAP's ticker and nothing else. A second RAF
       loop is the classic cause of the film and the interface drifting
       apart by a frame under load. */
    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      instance.off("scroll", onLenisScroll);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      instance.destroy();
      if (lenis === instance) lenis = null;
    };
  }, []);

  // Route changes start at the top, with ScrollTrigger re-measured for
  // the new document height.
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 60);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return <>{children}</>;
}

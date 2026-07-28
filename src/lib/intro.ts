/* --------------------------------------------------------------------
   Intro coordination.

   The opening animation covers the screen, then lifts to reveal the page.
   The hero text reveal should fire exactly as it lifts, so rather than
   guess a delay we expose a tiny one-way signal: the Intro calls
   markIntroDone() when it begins its exit, and the hero reveal registers
   with onIntroDone(). If there is no intro (reduced motion), the signal is
   already "done", so the hero reveal plays immediately.
   -------------------------------------------------------------------- */

const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Show the intro on every fresh load — it is short and skippable — unless
 *  the visitor prefers reduced motion. */
export const SHOW_INTRO = typeof window !== "undefined" && !REDUCED;

let done = !SHOW_INTRO;
const waiting: Array<() => void> = [];

export function onIntroDone(cb: () => void): void {
  if (done) cb();
  else waiting.push(cb);
}

export function markIntroDone(): void {
  if (done) return;
  done = true;
  while (waiting.length) waiting.shift()!();
}

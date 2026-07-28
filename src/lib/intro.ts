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

/** Show the intro on a fresh load of the HOMEPAGE only.
 *
 *  It is a brand moment, and a brand moment in front of a lesson someone
 *  was linked to is just a delay before the thing they asked for.
 *
 *  Read from the entry URL once, at module load, rather than from the
 *  live route: `done` has to settle now. If it stayed false on a deep
 *  link, nothing would ever call markIntroDone(), and a later
 *  client-side navigation to "/" would leave the hero text waiting on an
 *  intro that is never going to render. */
export const SHOW_INTRO =
  typeof window !== "undefined" && !REDUCED && window.location.pathname === "/";

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

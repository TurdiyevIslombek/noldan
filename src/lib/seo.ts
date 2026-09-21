import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PAGES, type PageMeta } from "./seo-routes";

/* --------------------------------------------------------------------
   Keeps the document head true to the page on screen.

   The static HTML for each route already carries the right title,
   description and canonical (scripts/prerender.mjs). Once the app is
   running it navigates without reloading, so the head has to follow it
   here — otherwise a shared link or a second visit reports whichever
   page was loaded first.
   -------------------------------------------------------------------- */

export const SITE_URL = (typeof __SITE_URL__ !== "undefined" ? __SITE_URL__ : window.location.origin).replace(
  /\/+$/,
  ""
);

function upsert(selector: string, make: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector(selector) as HTMLElement | null;
  if (!el) {
    el = make();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

const meta = (key: "name" | "property", k: string) => () => {
  const m = document.createElement("meta");
  m.setAttribute(key, k);
  return m;
};

export function applySeo(m: PageMeta, path: string) {
  const url = SITE_URL + (path === "/" ? "/" : path);
  document.title = m.title;
  upsert('meta[name="description"]', meta("name", "description"), "content", m.description);
  upsert('meta[name="robots"]', meta("name", "robots"), "content", m.noindex ? "noindex, follow" : "index, follow");
  upsert(
    'link[rel="canonical"]',
    () => {
      const l = document.createElement("link");
      l.rel = "canonical";
      return l;
    },
    "href",
    url
  );
  upsert('meta[property="og:title"]', meta("property", "og:title"), "content", m.title);
  upsert('meta[property="og:description"]', meta("property", "og:description"), "content", m.description);
  upsert('meta[property="og:url"]', meta("property", "og:url"), "content", url);
  upsert('meta[name="twitter:title"]', meta("name", "twitter:title"), "content", m.title);
  upsert('meta[name="twitter:description"]', meta("name", "twitter:description"), "content", m.description);
}

export function useSeo(m: PageMeta | null, path: string) {
  const title = m?.title;
  const description = m?.description;
  const noindex = m?.noindex;
  useEffect(() => {
    if (title !== undefined && description !== undefined) applySeo({ title, description, noindex }, path);
  }, [title, description, noindex, path]);
}

/** Pages with a fixed entry in PAGES. Lessons and the 404 set their own. */
export function RouteSeo() {
  const { pathname } = useLocation();
  useSeo(PAGES[pathname] ?? null, pathname);
  return null;
}

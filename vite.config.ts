import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/* --------------------------------------------------------------------
   Absolute URLs (canonical, og:image, sitemap) have to name a real
   host, and the host is not known until the site is deployed: the first
   Vercel deploy lands on *.vercel.app, a custom domain comes later.
   Hardcoding one means every shared link points somewhere dead until
   the domain is attached.

   So the host is a build input. Set SITE_URL in the Vercel project (or
   leave it and get the default below), and index.html, robots.txt and
   sitemap.xml all agree.
   -------------------------------------------------------------------- */

const SITE_URL = (process.env.SITE_URL || "https://noldan.uz").replace(/\/+$/, "");

const ROUTES = [
  { path: "/", priority: "1.0" },
  { path: "/learn", priority: "0.9" },
  { path: "/playground", priority: "0.8" },
];

function siteUrl(): Plugin {
  return {
    name: "noldan-site-url",
    transformIndexHtml: {
      // Ahead of Vite's own %VAR% handling, which only knows VITE_* keys.
      order: "pre",
      handler: (html) => html.replaceAll("%SITE_URL%", SITE_URL),
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      });
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source:
          `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          ROUTES.map(
            (r) =>
              `  <url><loc>${SITE_URL}${r.path}</loc><priority>${r.priority}</priority></url>`
          ).join("\n") +
          `\n</urlset>\n`,
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteUrl()],
  build: {
    // Routes are code-split, so a chunk approaching this size means
    // something leaked into the shared bundle.
    chunkSizeWarningLimit: 500,
  },
});

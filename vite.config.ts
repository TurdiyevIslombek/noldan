import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { devApi } from "./vite-dev-api";
import { execFileSync } from "node:child_process";
import path from "node:path";

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


function siteUrl(): Plugin {
  return {
    name: "noldan-site-url",
    transformIndexHtml: {
      // Ahead of Vite's own %VAR% handling, which only knows VITE_* keys.
      order: "pre",
      handler: (html) => html.replaceAll("%SITE_URL%", SITE_URL),
    },

  };
}

/* Saving a lesson's Markdown in content/ rebuilds the generated lesson
   files, which Vite then hot-reloads — no restart to see an edit. */
function lessonContent(): Plugin {
  return {
    name: "noldan-lessons",
    apply: "serve",
    configureServer(server) {
      const dir = path.resolve("content");
      server.watcher.add(dir);
      let t: ReturnType<typeof setTimeout> | undefined;
      const run = (file: string) => {
        if (!file.startsWith(dir) || !file.endsWith(".md")) return;
        clearTimeout(t);
        t = setTimeout(() => {
          try {
            execFileSync(process.execPath, ["scripts/build-catalog.mjs"], { stdio: "inherit" });
          } catch {
            server.config.logger.error("[noldan] lesson build failed — see above");
          }
        }, 150);
      };
      server.watcher.on("add", run);
      server.watcher.on("change", run);
      server.watcher.on("unlink", run);
    },
  };
}

export default defineConfig({
  // The public origin, for canonical URLs the app writes as it navigates.
  define: { __SITE_URL__: JSON.stringify(SITE_URL) },
  // devApi() is serve-only: it mounts the /api functions in `vite dev`
  // so the backend can be exercised without deploying.
  plugins: [react(), tailwindcss(), siteUrl(), devApi(), lessonContent()],
  build: {
    // Routes are code-split, so a chunk approaching this size means
    // something leaked into the shared bundle.
    chunkSizeWarningLimit: 500,
  },
});

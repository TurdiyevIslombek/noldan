/* --------------------------------------------------------------------
   Static HTML for every public page, plus sitemap.xml and robots.txt.

   Runs after `vite build` (npm's postbuild hook). The site is a React
   app, so without this every URL would serve the same empty shell with
   the homepage's title — and a crawler that does not run JavaScript, or
   runs it late, would see nothing of the lessons at all.

   For each route this writes dist/<route>/index.html: the built shell
   with that page's own title, description, canonical and structured
   data, and the page's content as plain HTML inside #root. The app
   replaces that content the moment it starts, so visitors see the real
   page; crawlers get the words.

   Free lessons are written out in full. Paid lessons get their title
   and description only — their text never leaves the server.

   New lesson? Nothing to do here: every lesson in content/ becomes a
   page and a sitemap entry on the next build.
   -------------------------------------------------------------------- */

import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const SITE = (process.env.SITE_URL || "https://noldan.fun").replace(/\/+$/, "");
const HF = "https://huggingface.co/IslombekT";

const bundled = await build({
  stdin: {
    contents:
      'export { ALL_COURSES } from "./api/_content/index.ts";\n' +
      'export * from "./src/lib/seo-routes.ts";',
    resolveDir: process.cwd(),
    loader: "ts",
    sourcefile: "prerender-entry.ts",
  },
  bundle: true,
  format: "esm",
  platform: "node",
  write: false,
  logLevel: "warning",
});
const { ALL_COURSES, PAGES, NOT_FOUND, lessonPageMeta, lessonLabel } = await import(
  "data:text/javascript;base64," + Buffer.from(bundled.outputFiles[0].text).toString("base64")
);

const template = readFileSync("dist/index.html", "utf8");

/* ---- html helpers ------------------------------------------------------ */
const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const md = (s) =>
  esc(s)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*([^*\n]+)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br>");

const blocks = (list) => list.map(block).join("\n");
function block(b) {
  switch (b.kind) {
    case "text":
    case "flow":
      return `<p>${md(b.text)}</p>`;
    case "subhead":
      return `<p><strong>${md(b.text)}</strong></p>`;
    case "h3":
      return `<h3 id="${esc(b.id)}">${md(b.text)}</h3>`;
    case "bullets":
    case "goals":
      return `<ul>${b.items.map((i) => `<li>${md(i)}</li>`).join("")}</ul>`;
    case "steps":
      return `<ol>${b.items.map((i) => `<li>${md(i)}</li>`).join("")}</ol>`;
    case "note":
      return `<blockquote>${md(b.text)}</blockquote>`;
    case "table":
      return `<table><thead><tr>${b.head.map((h) => `<th>${md(h)}</th>`).join("")}</tr></thead><tbody>${b.rows
        .map((r) => `<tr>${r.map((c) => `<td>${md(c)}</td>`).join("")}</tr>`)
        .join("")}</tbody></table>`;
    case "code":
      return `<pre><code class="language-${esc(b.lang ?? "python")}">${esc(b.code)}</code></pre>`;
    case "output":
    case "pre":
      return `<pre>${esc(b.text)}</pre>`;
    case "reveal":
      return `<details><summary>${md(b.summary)}</summary>${blocks(b.blocks)}</details>`;
    case "exercise":
      return `<section><h3>${md(b.label)}</h3>${blocks(b.blocks)}${
        b.answer ? `<details><summary>${md(b.answer.summary)}</summary>${blocks(b.answer.blocks)}</details>` : ""
      }</section>`;
    default:
      return ""; // animation slots and widgets: nothing a crawler can read
  }
}

const NAV =
  '<nav><a href="/">Noldan</a> · <a href="/learn">Darslar</a> · ' +
  '<a href="/playground">Mashq maydoni</a> · <a href="/loyiha">Loyiha</a></nav>';

/* ---- one page ------------------------------------------------------------ */
const written = [];
function page({ path, meta, body = "", jsonld = [], night = false, file }) {
  const url = SITE + (path === "/" ? "/" : path);
  const put = (re, tag) => (html) => html.replace(re, () => tag);
  let html = [
    put(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`),
    put(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(meta.description)}" />`),
    put(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, meta.noindex ? "" : `<link rel="canonical" href="${url}" />`),
    put(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`),
    put(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${esc(meta.title)}" />`),
    put(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${esc(meta.description)}" />`),
    put(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${esc(meta.title)}" />`),
    put(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${esc(meta.description)}" />`),
  ].reduce((h, f) => f(h), template);

  const head = [
    `<meta name="robots" content="${meta.noindex ? "noindex, follow" : "index, follow"}" />`,
    ...jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, "\\u003c")}</script>`),
  ].join("\n    ");
  html = html.replace("</head>", () => `    ${head}\n  </head>`);
  if (body) {
    const cls = `seo-snap${night ? " seo-snap--night" : ""}`;
    html = html.replace('<div id="root"></div>', () => `<div id="root"><div class="${cls}">${body}</div></div>`);
  }

  const out = file ?? (path === "/" ? "dist/index.html" : join("dist", path, "index.html"));
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  written.push(out);
  return url;
}

function gitDate(file) {
  try {
    return execFileSync("git", ["log", "-1", "--format=%cI", "--", file], { encoding: "utf8" }).trim() || null;
  } catch {
    return null;
  }
}

const ORG = { "@type": "Organization", "@id": `${SITE}/#org`, name: "Noldan", url: `${SITE}/`, sameAs: [HF] };
const PROVIDER = { "@type": "Organization", name: "Noldan", sameAs: `${SITE}/` };
const urls = [];

/* ---- home ---------------------------------------------------------------- */
const firstFree = ALL_COURSES.find((c) => c.access === "free" && c.lessons.length);
urls.push({
  loc: page({
    path: "/",
    meta: PAGES["/"],
    night: true,
    body:
      NAV +
      `<main><h1>Sunʼiy intellektni noldan quring.</h1><p>${esc(PAGES["/"].description)}</p><ul>` +
      ALL_COURSES.map((c) => `<li><a href="/learn">${esc(c.name)}</a> — ${esc(c.tagline)}</li>`).join("") +
      "</ul>" +
      (firstFree
        ? `<p><a href="/learn/${firstFree.id}/${firstFree.lessons[0].id}">Birinchi dars: ${esc(firstFree.lessons[0].title)}</a></p>`
        : "") +
      "</main>",
    jsonld: [
      {
        "@context": "https://schema.org",
        "@graph": [
          ORG,
          { "@type": "WebSite", "@id": `${SITE}/#site`, name: "Noldan", url: `${SITE}/`, inLanguage: "uz", publisher: { "@id": `${SITE}/#org` } },
        ],
      },
    ],
  }),
});

/* ---- the syllabus -------------------------------------------------------- */
urls.push({
  loc: page({
    path: "/learn",
    meta: PAGES["/learn"],
    body:
      NAV +
      `<main><h1>Darslar</h1><p>${esc(PAGES["/learn"].description)}</p>` +
      ALL_COURSES.map(
        (c) =>
          `<section><h2>${esc(c.name)}</h2><p>${esc(c.tagline)}</p>` +
          (c.lessons.length
            ? `<ol>${c.lessons
                .map((l) => `<li><a href="/learn/${c.id}/${l.id}">${esc(lessonLabel(l.n))} — ${esc(l.title)}</a></li>`)
                .join("")}</ol>`
            : "<p>Tez orada.</p>") +
          "</section>"
      ).join("") +
      "</main>",
    jsonld: [
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: ALL_COURSES.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Course",
            name: c.name,
            description: c.tagline,
            url: c.lessons.length ? `${SITE}/learn/${c.id}/${c.lessons[0].id}` : `${SITE}/learn`,
            inLanguage: "uz",
            isAccessibleForFree: c.access === "free",
            provider: PROVIDER,
          },
        })),
      },
    ],
  }),
});

/* ---- every lesson -------------------------------------------------------- */
for (const c of ALL_COURSES) {
  const free = c.access === "free";
  c.lessons.forEach((l, i) => {
    const path = `/learn/${c.id}/${l.id}`;
    const meta = lessonPageMeta(c.name, l);
    const prev = c.lessons[i - 1];
    const next = c.lessons[i + 1];
    const text = free
      ? blocks(l.intro) +
        l.sections.map((s) => `<section><h2 id="${esc(s.id)}">${md(s.title)}</h2>${blocks(s.blocks)}</section>`).join("")
      : `<p>${esc(meta.description)}</p><p>Bu dars pullik kursda.</p>`;
    const url = page({
      path,
      meta,
      body:
        NAV +
        `<main><article><p>${esc(c.name)} · ${esc(lessonLabel(l.n))} · ~${l.minutes} daqiqa</p><h1>${esc(l.title)}</h1>${text}</article>` +
        `<nav>${prev ? `<a href="/learn/${c.id}/${prev.id}">← ${esc(prev.title)}</a>` : ""} ${
          next ? `<a href="/learn/${c.id}/${next.id}">${esc(next.title)} →</a>` : ""
        }</nav></main>`,
      jsonld: [
        {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "LearningResource",
              name: l.title,
              description: meta.description,
              url: `${SITE}${path}`,
              inLanguage: "uz",
              learningResourceType: "Lesson",
              educationalLevel: "Beginner",
              timeRequired: `PT${l.minutes}M`,
              isAccessibleForFree: free,
              isPartOf: { "@type": "Course", name: c.name, description: c.tagline, provider: PROVIDER },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Darslar", item: `${SITE}/learn` },
                { "@type": "ListItem", position: 2, name: l.title, item: `${SITE}${path}` },
              ],
            },
          ],
        },
      ],
    });
    urls.push({ loc: url, lastmod: gitDate(`content/${c.id}/${l.id}.md`) });
  });
}

/* ---- the rest ------------------------------------------------------------ */
for (const path of ["/playground", "/loyiha"]) {
  urls.push({
    loc: page({
      path,
      meta: PAGES[path],
      body: NAV + `<main><h1>${esc(PAGES[path].title.split(" — ")[0])}</h1><p>${esc(PAGES[path].description)}</p><p><a href="/learn">Darslar</a></p></main>`,
    }),
  });
}
// Kept out of search, but served as real files so the noindex is in the
// HTML itself — a noindex added later by JavaScript is not reliable.
for (const path of ["/kirish", "/hisobim", "/eski"]) page({ path, meta: PAGES[path] });
// Any other address: a real 404 status, with the app loaded to say so.
page({ path: "/404", meta: NOT_FOUND, file: "dist/404.html" });

/* ---- sitemap + robots ---------------------------------------------------- */
writeFileSync(
  "dist/sitemap.xml",
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`).join("\n") +
    "\n</urlset>\n"
);
writeFileSync("dist/robots.txt", `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`prerender: ${written.length} pages, ${urls.length} in sitemap, for ${SITE}`);

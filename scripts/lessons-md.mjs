/* --------------------------------------------------------------------
   Markdown lesson → Lesson object.

   Lessons are authored as plain Markdown (content/<course>/<id>.md) in
   the shape the author already writes them:

     # Dars 01 — Title
     > **Vaqt:** ~40 daqiqa
     > **Kerak:** …
     > **Video:** https://youtu.be/…            (optional)
     ## Sections, ### subsections, lists, tables, > notes,
     ```python fences, <details> answers, **Mashq N.** exercises

   Two conventions are the site's own:

     <!-- animatsiya: c1 | Title -->   a slot for public/media/…/c1.mp4
     everything from the second "# " heading on is production material
     (animation prompts, video script) and is dropped, never published.
   -------------------------------------------------------------------- */

let used = new Set();

function slug(s) {
  const base =
    s
      .toLowerCase()
      .replace(/[ʻʼ'‘’`]/g, "")
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "bolim";
  let id = base;
  for (let k = 2; used.has(id); k++) id = `${base}-${k}`;
  used.add(id);
  return id;
}

/* Hard-wrapped lines are one paragraph — except a line that opens with a
   short "Label: …", which the author means as its own line. */
function joinPara(ls) {
  return ls
    .map((l) => l.trim())
    .reduce((s, x, k) => (k === 0 ? x : s + (/^[^\s:.!?]{1,24}:\s/.test(x) ? "\n" : " ") + x), "");
}

function youtubeId(v) {
  if (!v) return null;
  const m = /(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/.exec(v) || /^([\w-]{11})$/.exec(v.trim());
  return m ? m[1] : null;
}

function listItems(lines, i, marker) {
  const items = [];
  while (i < lines.length) {
    const l = lines[i];
    if (marker.test(l.trim()) && !/^\s{4,}/.test(l)) items.push(l.trim().replace(marker, ""));
    else if (/^\s{2,}\S/.test(l) && items.length) items[items.length - 1] += " " + l.trim();
    else break;
    i++;
  }
  return { items, i };
}

function parseBlocks(lines, inReveal) {
  const out = [];
  const para = [];
  let pendingOut = null;
  let i = 0;

  const flushPara = () => {
    if (!para.length) return;
    const text = joinPara(para);
    para.length = 0;
    const nat = /^\*\*(Natija|Kutilgan natija):\*\*$/.exec(text);
    if (nat) pendingOut = nat[1];
    else out.push({ kind: "text", text });
  };

  while (i < lines.length) {
    const t = lines[i].trim();

    if (t === "" || /^-{3,}$/.test(t)) {
      flushPara();
      i++;
      continue;
    }

    const media = /^<!--\s*animatsiya:\s*([\w-]+)\s*\|\s*(.*?)\s*-->$/i.exec(t);
    if (media) {
      flushPara();
      out.push({ kind: "media", id: media[1].toLowerCase(), title: media[2] });
      i++;
      continue;
    }
    if (/^<!--.*-->$/.test(t)) {
      i++;
      continue;
    }

    const h3 = /^###\s+(.+)$/.exec(t);
    if (h3) {
      flushPara();
      out.push({ kind: "h3", id: slug(h3[1]), text: h3[1].trim() });
      i++;
      continue;
    }

    const fence = /^```(\w*)\s*$/.exec(t);
    if (fence) {
      flushPara();
      const lang = fence[1].toLowerCase();
      const body = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i].trim())) body.push(lines[i++]);
      i++;
      const code = body.join("\n").replace(/\s+$/, "");
      const prev = out[out.length - 1];
      // An index ruler (" s   a   l\n 0   1   2") or a cut diagram
      // ("|  k  |  o  |") is a picture of the text, not something printed.
      const diagram = /^\s*-?\d+(?:\s{2,}-?\d+){2,}\s*(?:←.*)?$|^\s*\|.*\|\s*$/m.test(code);
      if (lang) {
        const mode = inReveal ? "static" : code.includes("___") ? "template" : "type";
        out.push({ kind: "code", code, lang, mode });
      } else if (
        pendingOut ||
        (!diagram && prev && prev.kind === "code") ||
        // An answer that opens with a bare block is showing what the
        // prompt's code prints; an error message is output wherever it is.
        (!diagram && inReveal && out.length === 0) ||
        /Traceback|^\w*(Error|Exception):/m.test(code)
      ) {
        const block = { kind: "output", text: code };
        if (pendingOut && pendingOut !== "Natija") block.label = pendingOut;
        if (/Traceback|(^|\n)\w*(Error|Exception)\b/.test(code)) block.error = true;
        out.push(block);
      } else {
        out.push({ kind: "pre", text: code });
      }
      pendingOut = null;
      continue;
    }

    if (t.startsWith("<details")) {
      flushPara();
      const inner = [];
      let summary = "Javobni koʻrsatish";
      let depth = 0;
      i++;
      while (i < lines.length) {
        const l = lines[i].trim();
        if (l.startsWith("<details")) depth++;
        if (l.startsWith("</details>")) {
          if (depth === 0) {
            i++;
            break;
          }
          depth--;
        }
        const s = /^<summary>(.*?)<\/summary>$/.exec(l);
        if (s && depth === 0) summary = s[1].trim();
        else inner.push(lines[i]);
        i++;
      }
      out.push({ kind: "reveal", summary, blocks: parseBlocks(inner, true) });
      continue;
    }

    if (t.startsWith("|")) {
      flushPara();
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) rows.push(lines[i++].trim());
      const cells = (r) => r.replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
      out.push({
        kind: "table",
        head: cells(rows[0]),
        rows: rows.slice(1).filter((r) => !/^\|?\s*:?-{2,}/.test(r)).map(cells),
      });
      continue;
    }

    if (t.startsWith(">")) {
      flushPara();
      const q = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        q.push(lines[i++].trim().replace(/^>\s?/, ""));
      }
      let text = joinPara(q.filter((x) => x.trim() !== ""));
      let tone = "tip";
      if (text.startsWith("⚠")) {
        tone = "warn";
        text = text.replace(/^⚠️?\s*/, "");
      } else if (text.startsWith("**")) {
        tone = "key";
      }
      out.push({ kind: "note", tone, text });
      continue;
    }

    if (/^[-*]\s+/.test(t)) {
      flushPara();
      const r = listItems(lines, i, /^[-*]\s+/);
      out.push({ kind: "bullets", items: r.items });
      i = r.i;
      continue;
    }

    if (/^\d+\.\s+/.test(t)) {
      flushPara();
      const r = listItems(lines, i, /^\d+\.\s+/);
      out.push({ kind: "steps", items: r.items });
      i = r.i;
      continue;
    }

    para.push(lines[i++]);
  }
  flushPara();
  return out;
}

/* Section-level shapes: the opening goals list, and exercises — a
   "**Mashq N.**" paragraph owns the blocks after it, and its <details>
   becomes the answer. */
function finishSection(title, blocks) {
  if (/^bu darsdan keyin/i.test(title) && blocks.length === 1 && blocks[0].kind === "bullets") {
    return [{ kind: "goals", items: blocks[0].items }];
  }
  const out = [];
  let ex = null;
  for (const b of blocks) {
    const m = b.kind === "text" ? /^\*\*(Mashq[^*]*?)\.?\*\*\s*([\s\S]*)$/.exec(b.text) : null;
    if (m) {
      ex = {
        kind: "exercise",
        label: m[1].trim().replace(/\.$/, ""),
        blocks: m[2].trim() ? [{ kind: "text", text: m[2].trim() }] : [],
      };
      out.push(ex);
    } else if (ex) {
      if (b.kind === "reveal" && !ex.answer) ex.answer = { summary: b.summary, blocks: b.blocks };
      else ex.blocks.push(b);
    } else {
      out.push(b);
    }
  }
  return out;
}

export function parseLesson(source, id) {
  used = new Set();
  const all = source.replace(/\r\n?/g, "\n").split("\n");

  // Stop at the second top-level heading: production material lives there.
  // Lines inside a code fence are code — a Python "# comment" is not a
  // heading, and treating it as one silently drops half a lesson.
  let end = all.length;
  let h1 = 0;
  let fenced = false;
  for (let k = 0; k < all.length; k++) {
    if (/^\s*```/.test(all[k])) fenced = !fenced;
    else if (!fenced && /^#\s/.test(all[k]) && ++h1 === 2) {
      end = k;
      break;
    }
  }
  const src = all.slice(0, end);

  const at = src.findIndex((l) => /^#\s/.test(l));
  const titleLine = at >= 0 ? src[at] : `# ${id}`;
  const tm = /^#\s+Dars\s+(\d+)\s*[—–-]\s*(.+)$/.exec(titleLine);

  const meta = {};
  let i = at + 1;
  while (i < src.length && src[i].trim() === "") i++;
  while (i < src.length && src[i].trim().startsWith(">")) {
    const f = /^>\s*\*\*([^*]+?):\*\*\s*(.*)$/.exec(src[i].trim());
    if (f) meta[f[1].trim().toLowerCase()] = f[2].trim();
    i++;
  }

  const intro = [];
  const sections = [];
  let cur = null;
  let buf = [];
  const flush = () => {
    const blocks = parseBlocks(buf, false);
    if (cur) sections.push({ ...cur, blocks: finishSection(cur.title, blocks) });
    else intro.push(...blocks);
    buf = [];
  };
  let inCode = false;
  for (const line of src.slice(i)) {
    if (/^\s*```/.test(line)) inCode = !inCode;
    const h = inCode ? null : /^##\s+(.+)$/.exec(line);
    if (h) {
      flush();
      cur = { id: slug(h[1]), title: h[1].trim() };
    } else {
      buf.push(line);
    }
  }
  flush();

  const lesson = {
    id,
    n: tm ? Number(tm[1]) : null,
    // The title is used as plain text everywhere — the browser tab, search
    // results, the course list — so Markdown marks like `merge` are dropped.
    title: (tm ? tm[2] : titleLine.replace(/^#\s+/, "")).replace(/[`*]/g, "").trim(),
    subtitle: "",
    minutes: Number(/\d+/.exec(meta["vaqt"] ?? "")?.[0] ?? 20),
    status: "ready",
    intro,
    sections,
    exercises: [],
  };
  if (meta["kerak"]) lesson.needs = meta["kerak"];
  const video = youtubeId(meta["video"]);
  if (video) lesson.video = video;
  return lesson;
}

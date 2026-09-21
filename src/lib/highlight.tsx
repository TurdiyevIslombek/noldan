import type { ReactNode } from "react";

/* --------------------------------------------------------------------
   Two tiny renderers, no dependencies.

   1. `pythonTokens` — a single-pass Python scanner for syntax colouring.
      Fitting for a course about tokenizers: the code samples are
      highlighted by a hand-written tokenizer.

   2. `inline` — renders the **bold** and `code` markers used in the
      curriculum copy. Returns React nodes, so nothing is ever injected
      as raw HTML.
   -------------------------------------------------------------------- */

type Kind = "plain" | "kw" | "str" | "num" | "com" | "fn" | "builtin" | "op";

const KEYWORDS = new Set([
  "def", "return", "for", "in", "while", "if", "elif", "else", "break",
  "continue", "and", "or", "not", "lambda", "import", "from", "as", "with",
  "class", "pass", "None", "True", "False", "is", "try", "except", "finally",
  "raise", "yield", "global", "assert", "del",
]);

const BUILTINS = new Set([
  "print", "len", "list", "bytes", "range", "max", "min", "zip", "ord", "chr",
  "float", "int", "str", "dict", "set", "tuple", "enumerate", "sorted", "sum",
  "abs", "round", "type", "isinstance", "open", "map", "filter",
]);

export function pythonTokens(code: string): Array<{ t: string; k: Kind }> {
  const out: Array<{ t: string; k: Kind }> = [];
  let i = 0;
  const push = (t: string, k: Kind) => {
    if (!t) return;
    const last = out[out.length - 1];
    if (last && last.k === k) last.t += t;
    else out.push({ t, k });
  };

  while (i < code.length) {
    const ch = code[i];

    // comment
    if (ch === "#") {
      let j = i;
      while (j < code.length && code[j] !== "\n") j++;
      push(code.slice(i, j), "com");
      i = j;
      continue;
    }

    // string, with optional b / f / r prefix
    const prefixMatch = /^([bfru]{0,2})("""|'''|"|')/i.exec(code.slice(i));
    if (prefixMatch) {
      const prefix = prefixMatch[1];
      const quote = prefixMatch[2];
      let j = i + prefix.length + quote.length;
      while (j < code.length) {
        if (code[j] === "\\") {
          j += 2;
          continue;
        }
        if (code.startsWith(quote, j)) {
          j += quote.length;
          break;
        }
        j++;
      }
      push(code.slice(i, j), "str");
      i = j;
      continue;
    }

    // number
    if (/[0-9]/.test(ch)) {
      let j = i;
      while (j < code.length && /[0-9._]/.test(code[j])) j++;
      push(code.slice(i, j), "num");
      i = j;
      continue;
    }

    // identifier / keyword / builtin / function name
    if (/[A-Za-z_]/.test(ch)) {
      let j = i;
      while (j < code.length && /[A-Za-z0-9_]/.test(code[j])) j++;
      const word = code.slice(i, j);
      const prevWord = out
        .slice()
        .reverse()
        .find((s) => s.k !== "plain" || s.t.trim() !== "");
      if (KEYWORDS.has(word)) push(word, "kw");
      else if (prevWord && prevWord.k === "kw" && prevWord.t.trim() === "def")
        push(word, "fn");
      else if (BUILTINS.has(word)) push(word, "builtin");
      else push(word, "plain");
      i = j;
      continue;
    }

    // operators and punctuation
    if (/[+\-*/%=<>!&|^~,:;.()[\]{}]/.test(ch)) {
      push(ch, "op");
      i++;
      continue;
    }

    push(ch, "plain");
    i++;
  }
  return out;
}

export function Python({ code }: { code: string }) {
  const tokens = pythonTokens(code);
  return (
    <>
      {tokens.map((t, i) =>
        t.k === "plain" ? (
          <span key={i}>{t.t}</span>
        ) : (
          <span key={i} className={`py-${t.k}`}>
            {t.t}
          </span>
        )
      )}
    </>
  );
}

/** Renders **bold**, *italic* and `code` spans from the curriculum copy. */
export function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("**")) {
      const inner = tok.slice(2, -2);
      // "**colab.research.google.com**" — the author names a site; make
      // it one click away rather than something to retype.
      if (/^(?=[^.]*[a-z])[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}(\/\S*)?$/i.test(inner)) {
        out.push(
          <a key={key++} href={`https://${inner}`} target="_blank" rel="noopener noreferrer">
            <strong>{inner}</strong>
          </a>
        );
      } else {
        out.push(<strong key={key++}>{inner}</strong>);
      }
    } else if (tok.startsWith("*")) {
      out.push(<em key={key++}>{tok.slice(1, -1)}</em>);
    } else {
      out.push(
        <code key={key++} className="ic">
          {tok.slice(1, -1)}
        </code>
      );
    }
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

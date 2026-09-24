/* --------------------------------------------------------------------
   The work behind every "type here and watch it tokenize" on the site.

   Loading a tokenizer means downloading a tokenizer.json of 1–2 MB and
   turning tens of thousands of merges into lookup tables. On a student's
   laptop that is a few hundred milliseconds of solid work — long enough
   to freeze scrolling and typing if it runs on the page. So it runs in a
   Web Worker (tokenizer.worker.ts), and the page only ever sends text
   and gets tokens back (tokenizers.ts). This module is what the worker
   runs; the page falls back to running it itself only where a worker
   cannot start.
   -------------------------------------------------------------------- */

import { encode, loadFromHub, type LoadedTokenizer, type Token } from "./hf-tokenizer";
import { DEMO_CORPUS, PROBE, encode as encodeBpe, trainBPE, type BpeModel } from "./bpe";
import { DEMO_VOCAB } from "../home/content";

export type TokenizerInfo = {
  repo: string;
  label: string;
  vocabSize: number;
  mergeCount: number;
  bytesMB: number;
  /** The file rewrites text before splitting it (o' → oʻ, …). */
  hasNormalizer: boolean;
};

export type Encoded = {
  tokens: Token[];
  /** The text after the tokenizer's own normalizer — what it really saw. */
  normalized: string;
};

export type Request =
  | { type: "load"; repo: string; label?: string }
  | { type: "encode"; repo: string; text: string };

/* "local:…" is a tokenizer trained right here, on the demo corpus — the
   fallback when Hugging Face cannot be reached. */
const isLocal = (repo: string) => repo.startsWith("local:");

const cache = new Map<string, Promise<LoadedTokenizer | BpeModel>>();

function get(repo: string, label?: string): Promise<LoadedTokenizer | BpeModel> {
  let p = cache.get(repo);
  if (!p) {
    p = isLocal(repo)
      ? Promise.resolve().then(() => trainBPE(DEMO_CORPUS, DEMO_VOCAB, PROBE))
      : loadFromHub(repo, label);
    // A failed download must not stick: the next request tries again.
    p.catch(() => cache.delete(repo));
    cache.set(repo, p);
  }
  return p;
}

const isHub = (tk: LoadedTokenizer | BpeModel): tk is LoadedTokenizer => "inv" in tk;

export async function handle(req: Request): Promise<TokenizerInfo | Encoded> {
  const tk = await get(req.repo, req.type === "load" ? req.label : undefined);

  if (req.type === "load") {
    return isHub(tk)
      ? {
          repo: req.repo,
          // The caller's name for it wins: the same file may have been
          // loaded earlier, unnamed, by another part of the site.
          label: req.label ?? tk.label,
          vocabSize: tk.vocabSize,
          mergeCount: tk.mergeCount,
          bytesMB: tk.bytesMB,
          hasNormalizer: tk.hasNormalizer,
        }
      : {
          repo: req.repo,
          label: "brauzerda oʻqitilgan",
          vocabSize: tk.vocabSize,
          mergeCount: tk.mergeCount,
          bytesMB: 0,
          hasNormalizer: false,
        };
  }

  if (isHub(tk)) {
    return { tokens: encode(req.text, tk), normalized: tk.normalize(req.text) };
  }
  return {
    tokens: encodeBpe(req.text, tk).map((t) => ({ id: t.id, text: t.text, piece: t.text })),
    normalized: req.text,
  };
}

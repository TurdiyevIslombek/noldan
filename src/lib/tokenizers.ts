/* --------------------------------------------------------------------
   Tokenizers, from the page's side.

   Every call goes to one shared Web Worker, so downloading and parsing a
   tokenizer.json — the part that used to stall scrolling for a tenth of
   a second or more on an ordinary laptop — never touches the thread that
   draws the page. Where a worker cannot start (very old browsers, locked
   down environments), the same code runs here instead, loaded on demand.
   -------------------------------------------------------------------- */

import type { Encoded, Request, TokenizerInfo } from "./tokenizer-core";

export type { Encoded, TokenizerInfo };

/** The tokenizer trained in the browser on the demo corpus — used only
 *  when Hugging Face cannot be reached. */
export const DEMO = "local:demo";

type Reply = { id: number; ok: boolean; value?: unknown; error?: string };
type Waiter = { resolve: (v: unknown) => void; reject: (e: Error) => void; req: Request };

/** undefined: not started yet · null: unavailable, run on the page */
let worker: Worker | null | undefined;
let seq = 0;
const waiting = new Map<number, Waiter>();

async function runHere(req: Request): Promise<unknown> {
  const { handle } = await import("./tokenizer-core");
  return handle(req);
}

function spawn(): Worker | null {
  if (worker !== undefined) return worker;
  try {
    const w = new Worker(new URL("./tokenizer.worker.ts", import.meta.url), { type: "module" });
    w.onmessage = (e: MessageEvent<Reply>) => {
      const { id, ok, value, error } = e.data;
      const p = waiting.get(id);
      if (!p) return;
      waiting.delete(id);
      if (ok) p.resolve(value);
      else p.reject(new Error(error ?? "Tokenizator xatosi"));
    };
    // Fires when the worker could not start at all. Everything already
    // queued is finished on the page, and so is everything after.
    w.onerror = (ev) => {
      ev.preventDefault();
      w.terminate();
      worker = null;
      for (const [id, p] of waiting) {
        waiting.delete(id);
        runHere(p.req).then(p.resolve, p.reject);
      }
    };
    worker = w;
  } catch {
    worker = null;
  }
  return worker;
}

function call<T>(req: Request): Promise<T> {
  const w = spawn();
  if (!w) return runHere(req) as Promise<T>;
  return new Promise<T>((resolve, reject) => {
    const id = ++seq;
    waiting.set(id, { resolve: resolve as (v: unknown) => void, reject, req });
    w.postMessage({ id, req });
  });
}

/** Download (once) and prepare a tokenizer. Resolves with what it is. */
export function loadTokenizer(repo: string, label?: string): Promise<TokenizerInfo> {
  return call<TokenizerInfo>({ type: "load", repo, label });
}

/** Tokens for `text`, loading the tokenizer first if it is not ready. */
export function tokenize(repo: string, text: string): Promise<Encoded> {
  return call<Encoded>({ type: "encode", repo, text });
}

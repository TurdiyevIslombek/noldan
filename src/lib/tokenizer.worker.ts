/* Runs tokenizer-core off the page's main thread. See tokenizers.ts. */

import { handle, type Request } from "./tokenizer-core";

type Incoming = { id: number; req: Request };

const scope = self as unknown as {
  onmessage: ((e: MessageEvent<Incoming>) => void) | null;
  postMessage: (msg: unknown) => void;
};

scope.onmessage = async (e) => {
  const { id, req } = e.data;
  try {
    scope.postMessage({ id, ok: true, value: await handle(req) });
  } catch (err) {
    scope.postMessage({ id, ok: false, error: err instanceof Error ? err.message : String(err) });
  }
};

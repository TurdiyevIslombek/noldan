/* --------------------------------------------------------------------
   Runs the /api functions inside `vite dev`.

   Vite serves static assets and knows nothing about the functions, so
   without this every /api call 404s locally and the only way to
   exercise the backend is to deploy. That is a miserable loop for
   payment code, where the whole point is to drive a state machine
   through its failure branches before real money is involved.

   The plugin mirrors how Vercel dispatches the three shapes this
   project uses:

     · `export default { fetch }`                   ->  Web handler on
       the Node runtime (the database endpoints and /api/auth).
     · `export const config = { runtime: "edge" }`  ->  Web handler
       (the tutor).
     · a default function, no config                ->  Node handler,
       called with (req, res) and Vercel's parsed `req.body` (Payme,
       Click).

   It also mirrors vercel.json's one rewrite: everything under
   /api/auth/ is served by api/auth.ts.

   Dev only (`apply: "serve"`). Production is Vercel's own runtime; this
   file is never part of a build.
   -------------------------------------------------------------------- */

import { loadEnv, type Plugin, type ViteDevServer } from "vite";
import type { IncomingMessage, ServerResponse } from "node:http";
import { existsSync } from "node:fs";

function readBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c: Buffer) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

/** Vercel hands Node handlers an already-parsed body. Click posts
 *  form-encoded, Payme posts JSON, so both are parsed here. */
function parseBody(raw: Buffer, contentType: string): unknown {
  const text = raw.toString("utf8");
  if (!text) return {};
  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(text);
    } catch {
      return {};
    }
  }
  if (contentType.includes("application/x-www-form-urlencoded")) {
    return Object.fromEntries(new URLSearchParams(text));
  }
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export function devApi(): Plugin {
  return {
    name: "noldan-dev-api",
    apply: "serve",

    /* Vite loads .env into import.meta.env for CLIENT code only. The
       functions read process.env — SUPABASE_SERVICE_ROLE_KEY, PAYME_KEY
       and the rest — so without this they see nothing locally and every
       endpoint reports itself unconfigured. Server secrets are copied
       across here; VITE_ keys are left to Vite's own handling. */
    config(_config, { mode }) {
      const env = loadEnv(mode, process.cwd(), "");
      for (const [key, value] of Object.entries(env)) {
        if (!key.startsWith("VITE_") && process.env[key] === undefined) {
          process.env[key] = value;
        }
      }
    },

    configureServer(server: ViteDevServer) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ?? "";
        if (!url.startsWith("/api/")) return next();

        const path = url.split("?")[0].replace(/^\/api\//, "").replace(/\/+$/, "");
        // `_lib` and `_content` are support code, not endpoints — same
        // rule Vercel applies.
        if (!path || path.startsWith("_") || path.includes("..")) return next();

        // vercel.json: /api/auth/:path* -> /api/auth
        const route = path.startsWith("auth/") ? "auth" : path;
        const file = `./api/${route}.ts`;
        if (!existsSync(file.replace("./", ""))) return next();

        try {
          const mod = (await server.ssrLoadModule(file)) as {
            default?: unknown;
            config?: { runtime?: string };
          };
          const handler = mod.default;
          const web = (handler as { fetch?: unknown } | undefined)?.fetch;

          if (typeof web === "function") {
            await runWebHandler((r) => (web as WebHandler).call(handler, r), req, res);
          } else if (typeof handler !== "function") {
            return next();
          } else if (mod.config?.runtime === "edge") {
            await runWebHandler(handler as WebHandler, req, res);
          } else {
            await runNodeHandler(handler as NodeHandler, req, res);
          }
        } catch (err) {
          server.ssrFixStacktrace(err as Error);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              error: "dev api error",
              detail: (err as Error).message,
            })
          );
        }
      });
    },
  };
}

type WebHandler = (request: Request) => Promise<Response> | Response;
type NodeHandler = (req: unknown, res: unknown) => Promise<unknown> | unknown;

async function runWebHandler(
  handler: WebHandler,
  req: IncomingMessage,
  res: ServerResponse
) {
  const method = req.method ?? "GET";
  const host = req.headers.host ?? "localhost";
  // Node lowercases header names and may hand back arrays; Headers
  // wants flat strings.
  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (typeof v === "string") headers.set(k, v);
    else if (Array.isArray(v)) headers.set(k, v.join(", "));
  }

  const request = new Request(`http://${host}${req.url}`, {
    method,
    headers,
    body: method === "GET" || method === "HEAD" ? undefined : await readBody(req),
  });

  const response = await handler(request);

  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    if (key !== "set-cookie") res.setHeader(key, value);
  });
  // Signing in sets several cookies at once. Set one by one they would
  // overwrite each other and the browser would keep only the last.
  const cookies = response.headers.getSetCookie();
  if (cookies.length) res.setHeader("set-cookie", cookies);

  if (!response.body) {
    res.end();
    return;
  }
  // Streamed, so the tutor's token-by-token response behaves locally the
  // way it does in production.
  const reader = response.body.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    res.write(Buffer.from(value));
  }
  res.end();
}

async function runNodeHandler(
  handler: NodeHandler,
  req: IncomingMessage,
  res: ServerResponse
) {
  const raw = await readBody(req);
  const shimReq = Object.assign(req, {
    body: parseBody(raw, String(req.headers["content-type"] ?? "")),
    query: Object.fromEntries(
      new URL(req.url ?? "/", "http://localhost").searchParams
    ),
  });

  const shimRes = Object.assign(res, {
    status(code: number) {
      res.statusCode = code;
      return shimRes;
    },
    json(payload: unknown) {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(payload));
      return shimRes;
    },
    send(payload: unknown) {
      res.end(typeof payload === "string" ? payload : JSON.stringify(payload));
      return shimRes;
    },
  });

  await handler(shimReq, shimRes);
}

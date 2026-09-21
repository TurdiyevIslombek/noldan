/* --------------------------------------------------------------------
   Shared request hygiene for every endpoint under /api.

   Extracted from api/tutor.ts so the payment and content endpoints get
   exactly the same origin and rate-limit treatment rather than each
   growing its own slightly-different copy.

   Deliberately value-based (`origin`, `ip`) instead of Request-based:
   the payment webhooks are Node (req, res) handlers, the JSON endpoints
   are Web (Request → Response) handlers, and both need this.
   -------------------------------------------------------------------- */

/** Origins we serve the browser API to. Note this is a defence against
 *  other *sites*, not against curl — it is one layer, and every endpoint
 *  that matters also checks the session cookie or a provider signature. */
export function originAllowed(origin: string | null | undefined): boolean {
  if (!origin) return true; // same-origin and server-to-server calls

  const configured = (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const allowed = new Set(configured);
  if (process.env.VERCEL_URL) allowed.add(`https://${process.env.VERCEL_URL}`);
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    allowed.add(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }
  if (process.env.NODE_ENV !== "production") {
    allowed.add("http://localhost:5188");
    allowed.add("http://localhost:5173");
  }
  if (allowed.size === 0) return false; // fail closed, never open
  return allowed.has(origin);
}

/* Best-effort per-IP limiting. Serverless instances are ephemeral and
   not shared, so this thins abuse rather than eliminating it. The
   payment webhooks are deliberately NOT rate limited here: throttling
   Payme's own retries would strand transactions mid-state-machine. */
const hits = new Map<string, number[]>();

export function rateLimited(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // crude memory bound
  return recent.length > limit;
}

export function clientIp(headers: Headers): string {
  return headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
}

/** Guard shared by the edge JSON endpoints. Returns a Response to send
 *  back, or null when the request may proceed. */
export function guard(
  req: Request,
  opts: { method?: string; limit?: number; windowMs?: number } = {}
): Response | null {
  const { method = "POST", limit = 60, windowMs = 60_000 } = opts;

  if (req.method !== method) {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }
  if (!originAllowed(req.headers.get("origin"))) {
    return Response.json({ error: "Ruxsat berilmagan manba." }, { status: 403 });
  }
  if (rateLimited(clientIp(req.headers), limit, windowMs)) {
    return Response.json(
      { error: "Juda koʻp soʻrov. Bir daqiqadan keyin qayta urinib koʻring." },
      { status: 429 }
    );
  }
  return null;
}

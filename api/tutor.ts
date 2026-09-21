/* --------------------------------------------------------------------
   Serverless proxy for the study assistant (Vercel Edge).

   The key lives in a server env var and never reaches the browser. That
   only helps if the endpoint itself is not an open door, so everything
   the client sends is treated as hostile:

     · requests must come from an allowed origin;
     · the system prompt is built HERE and any client-supplied system
       message is discarded;
     · roles, types and lengths are validated before anything is
       forwarded;
     · a best-effort per-IP rate limit caps abuse.

   Set ONE of these in Vercel -> Settings -> Environment Variables:
     GROQ_API_KEY          (free tier, open-weight Llama)
     OPENROUTER_API_KEY
     HF_TOKEN

   Optional:
     TUTOR_MODEL           override the model id
     ALLOWED_ORIGINS       comma-separated; defaults to the Vercel URL
   -------------------------------------------------------------------- */

export const config = { runtime: "edge" };

import { clientIp, originAllowed, rateLimited } from "./_lib/http.js";

const MAX_MESSAGES = 12;
const MAX_CHARS_PER_MESSAGE = 4000;
const MAX_TOTAL_CHARS = 12000;
const RATE_LIMIT = 20; // requests
const RATE_WINDOW_MS = 60_000; // per minute, per IP

/* The tutor's brief. Deliberately duplicated from src/lib/tutor.ts: the
   client copy serves bring-your-own-key and Ollama modes, but the server
   must never accept the client's version of its own instructions. */
function systemPrompt(lesson?: string, course?: string): string {
  return [
    "Sen Noldan platformasining oʻqituvchi yordamchisisan.",
    "Talabalar oʻzbek tilida sunʼiy intellektni noldan qurishni oʻrganadi:",
    "tokenizator, transformer, oʻqitish. Koʻpchiligi hayotida birinchi marta kod yozadi.",
    "",
    "Qoidalar:",
    "1. FAQAT oʻzbek tilida javob ber (lotin alifbosida).",
    "2. Sodda tilda tushuntir. Jargon ishlatsang, darhol izohla.",
    "3. Qisqa javob ber — 1-3 xatboshi. Kerak boʻlsa qisqa kod namunasi qoʻsh.",
    "4. Kod Python da boʻlsin va darsdagi uslubga mos kelsin.",
    "5. Talaba xato haqida yozsa: avval xatoning sababini bir gapda ayt, keyin tuzatishni koʻrsat.",
    "6. Bilmasang yoki ishonchsiz boʻlsang — shunday deb ayt, oʻylab topma.",
    "7. Mashq javobini toʻgʻridan-toʻgʻri bermay, avval yoʻl koʻrsat. Talaba qayta soʻrasa, keyin ber.",
    "8. Faqat shu kurs mavzusida javob ber. Boshqa mavzuga oʻtishni soʻrasa, muloyim rad et.",
    course ? `\nHozirgi kurs: ${course}` : "",
    lesson ? `Hozirgi dars: ${lesson}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

type Upstream = { url: string; key: string; model: string };

function pickUpstream(): Upstream | null {
  const model = process.env.TUTOR_MODEL;
  if (process.env.GROQ_API_KEY) {
    return {
      url: "https://api.groq.com/openai/v1/chat/completions",
      key: process.env.GROQ_API_KEY,
      model: model || "llama-3.3-70b-versatile",
    };
  }
  if (process.env.OPENROUTER_API_KEY) {
    return {
      url: "https://openrouter.ai/api/v1/chat/completions",
      key: process.env.OPENROUTER_API_KEY,
      model: model || "meta-llama/llama-3.3-70b-instruct",
    };
  }
  if (process.env.HF_TOKEN) {
    return {
      url: "https://router.huggingface.co/v1/chat/completions",
      key: process.env.HF_TOKEN,
      model: model || "meta-llama/Llama-3.3-70B-Instruct",
    };
  }
  return null;
}

type ClientMsg = { role: string; content: unknown };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }
  if (!originAllowed(req.headers.get("origin"))) {
    return Response.json({ error: "Ruxsat berilmagan manba." }, { status: 403 });
  }

  if (rateLimited(clientIp(req.headers), RATE_LIMIT, RATE_WINDOW_MS)) {
    return Response.json(
      { error: "Juda koʻp soʻrov. Bir daqiqadan keyin qayta urinib koʻring." },
      { status: 429 }
    );
  }

  const upstream = pickUpstream();
  if (!upstream) {
    return Response.json(
      {
        error:
          "Server kaliti sozlanmagan. GROQ_API_KEY (yoki OPENROUTER_API_KEY / HF_TOKEN) ni environment variable sifatida qoʻshing.",
      },
      { status: 500 }
    );
  }

  let body: { messages?: unknown; lesson?: unknown; course?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Notoʻgʻri JSON" }, { status: 400 });
  }

  // Only user/assistant turns survive. A client-supplied `system` message
  // is dropped, not trusted — otherwise anyone could rewrite the tutor.
  const raw = Array.isArray(body.messages) ? (body.messages as ClientMsg[]) : [];
  let total = 0;
  const messages = raw
    .filter(
      (m): m is { role: "user" | "assistant"; content: string } =>
        !!m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string"
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS_PER_MESSAGE) }))
    .filter((m) => {
      total += m.content.length;
      return total <= MAX_TOTAL_CHARS;
    });

  if (messages.length === 0) {
    return Response.json({ error: "Xabar boʻsh." }, { status: 400 });
  }

  const lesson = typeof body.lesson === "string" ? body.lesson.slice(0, 120) : undefined;
  const course = typeof body.course === "string" ? body.course.slice(0, 120) : undefined;

  const res = await fetch(upstream.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${upstream.key}`,
    },
    body: JSON.stringify({
      model: upstream.model,
      messages: [
        { role: "system", content: systemPrompt(lesson, course) },
        ...messages,
      ],
      stream: true,
      temperature: 0.3,
      max_tokens: 700,
    }),
  });

  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => "");
    return Response.json(
      { error: `Model xatosi (${res.status}): ${detail.slice(0, 200)}` },
      { status: 502 }
    );
  }

  return new Response(res.body, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

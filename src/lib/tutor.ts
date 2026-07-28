/* --------------------------------------------------------------------
   The tutor's model connection.

   SECURITY, first and plainly: an API key shipped in front-end code is
   public. Anyone can open devtools and take it. So this file never holds
   a key of its own — it supports three honest modes instead:

     proxy   — calls /api/tutor on your own host. The key lives in a
               server env var and never reaches the browser. This is the
               mode to ship publicly. See api/tutor.ts.
     byok    — the student pastes their own free key. It is kept in
               localStorage on their machine only and sent straight to
               the provider. Fine for you and early testers; do not ask
               strangers to paste keys.
     ollama  — a fully local, fully open-source model. No key, no
               network, no cost. Best for offline study.

   Every provider below speaks the OpenAI /chat/completions shape, so
   there is a single request path for all of them.
   -------------------------------------------------------------------- */

export type ProviderId = "proxy" | "openrouter" | "groq" | "huggingface" | "ollama";

export type Provider = {
  id: ProviderId;
  label: string;
  url: string;
  /** Model ids move around; these are defaults the student can change. */
  defaultModel: string;
  needsKey: boolean;
  note: string;
  keysUrl?: string;
};

export const PROVIDERS: Provider[] = [
  {
    id: "proxy",
    label: "Noldan server",
    url: "/api/tutor",
    defaultModel: "server",
    needsKey: false,
    note: "Kalit serverda saqlanadi. Hech narsa sozlash kerak emas.",
  },
  {
    id: "groq",
    label: "Groq (bepul limit)",
    url: "https://api.groq.com/openai/v1/chat/completions",
    defaultModel: "llama-3.3-70b-versatile",
    needsKey: true,
    note: "Ochiq vaznli Llama modeli, bepul limit bilan.",
    keysUrl: "https://console.groq.com/keys",
  },
  {
    id: "openrouter",
    label: "OpenRouter",
    url: "https://openrouter.ai/api/v1/chat/completions",
    defaultModel: "meta-llama/llama-3.3-70b-instruct",
    needsKey: true,
    note: "Koʻp model bir joyda; baʼzilari bepul (nomi oxirida :free).",
    keysUrl: "https://openrouter.ai/keys",
  },
  {
    id: "huggingface",
    label: "Hugging Face",
    url: "https://router.huggingface.co/v1/chat/completions",
    defaultModel: "meta-llama/Llama-3.3-70B-Instruct",
    needsKey: true,
    note: "Ochiq modellar; HF hisobingiz bilan bepul limit.",
    keysUrl: "https://huggingface.co/settings/tokens",
  },
  {
    id: "ollama",
    label: "Ollama (kompyuterda)",
    url: "http://localhost:11434/v1/chat/completions",
    defaultModel: "llama3.2",
    needsKey: false,
    note: "Toʻliq ochiq va bepul, internetsiz ishlaydi. Avval ollama.com dan oʻrnating.",
  },
];

export type TutorConfig = {
  provider: ProviderId;
  model: string;
  key: string;
};

const STORE = "noldan.tutor.v1";

export function loadConfig(): TutorConfig {
  try {
    const raw = localStorage.getItem(STORE);
    if (raw) return JSON.parse(raw) as TutorConfig;
  } catch {
    /* private mode / disabled storage — fall through to defaults */
  }
  return { provider: "proxy", model: "server", key: "" };
}

export function saveConfig(c: TutorConfig) {
  try {
    localStorage.setItem(STORE, JSON.stringify(c));
  } catch {
    /* nothing we can do; the session still works in memory */
  }
}

export type Msg = { role: "user" | "assistant"; content: string };

/** The tutor's brief. Uzbek, beginner-facing, grounded in the lesson. */
export function systemPrompt(ctx: { lesson?: string; course?: string }) {
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
    ctx.course ? `\nHozirgi kurs: ${ctx.course}` : "",
    ctx.lesson ? `Hozirgi dars: ${ctx.lesson}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export type StreamHandlers = {
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (message: string) => void;
};

/**
 * Send the conversation and stream the reply back token by token.
 * Returns an abort function so the panel can cancel in flight.
 */
export function askTutor(
  cfg: TutorConfig,
  messages: Msg[],
  ctx: { lesson?: string; course?: string },
  h: StreamHandlers
): () => void {
  const provider = PROVIDERS.find((p) => p.id === cfg.provider) ?? PROVIDERS[0];
  const controller = new AbortController();

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (provider.needsKey) {
    if (!cfg.key) {
      h.onError("Kalit kiritilmagan. Sozlamalarni ochib kalitni qoʻshing.");
      return () => {};
    }
    headers.Authorization = `Bearer ${cfg.key}`;
  }

  fetch(provider.url, {
    method: "POST",
    headers,
    signal: controller.signal,
    body: JSON.stringify(
      provider.id === "proxy"
        ? // The server injects the system prompt and ignores any we send.
          { messages, lesson: ctx.lesson, course: ctx.course }
        : {
            model: cfg.model || provider.defaultModel,
            stream: true,
            temperature: 0.3,
            max_tokens: 700,
            messages: [
              { role: "system", content: systemPrompt(ctx) },
              ...messages,
            ],
          }
    ),
  })
    .then(async (res) => {
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        // Surface the real reason — a silent failure teaches nobody.
        const hint =
          res.status === 401 || res.status === 403
            ? "Kalit notoʻgʻri yoki muddati tugagan."
            : res.status === 404
              ? "Model nomi topilmadi. Sozlamalarda model nomini tekshiring."
              : res.status === 429
                ? "Juda koʻp soʻrov. Bir daqiqadan keyin qayta urinib koʻring."
                : res.status === 500 && cfg.provider === "proxy"
                  ? "Serverda kalit sozlanmagan."
                  : "";
        h.onError(`${res.status} — ${hint || body.slice(0, 160) || "soʻrov bajarilmadi"}`);
        return;
      }
      if (!res.body) {
        h.onError("Javob boʻsh keldi.");
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // SSE frames are separated by a blank line.
        const parts = buffer.split("\n");
        buffer = parts.pop() ?? "";
        for (const line of parts) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const payload = trimmed.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;
          try {
            const json = JSON.parse(payload);
            const delta: string | undefined = json?.choices?.[0]?.delta?.content;
            if (delta) h.onDelta(delta);
          } catch {
            /* partial frame — the next chunk completes it */
          }
        }
      }
      h.onDone();
    })
    .catch((err: unknown) => {
      if (err instanceof DOMException && err.name === "AbortError") return;
      const msg = err instanceof Error ? err.message : String(err);
      h.onError(
        /Failed to fetch|NetworkError|load failed/i.test(msg)
          ? cfg.provider === "ollama"
            ? "Ollama topilmadi. `ollama serve` ishlab turganini tekshiring."
            : "Ulanib boʻlmadi — internet yoki CORS muammosi boʻlishi mumkin."
          : msg
      );
    });

  return () => controller.abort();
}

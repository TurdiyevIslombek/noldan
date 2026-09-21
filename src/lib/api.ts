/* --------------------------------------------------------------------
   Talking to our own /api.

   Being signed in is an httpOnly cookie on this site's own domain, set
   by /api/auth. There is no token to carry around: same-origin requests
   send the cookie by themselves, and the browser never talks to the
   database or to Google/Telegram's APIs directly.
   -------------------------------------------------------------------- */

export type Provider = "google" | "telegram";

export function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return fetch(path, { credentials: "same-origin", ...init, headers });
}

/** Start signing in. The server answers with Telegram's or Google's URL;
 *  the student is sent there and comes back to `returnTo`. Resolves to
 *  an error code only if it could not start. */
export async function signInWith(provider: Provider, returnTo: string): Promise<string | null> {
  try {
    const res = await apiFetch("/api/auth/sign-in/social", {
      method: "POST",
      body: JSON.stringify({ provider, callbackURL: returnTo, errorCallbackURL: "/kirish" }),
    });
    const data = (await res.json().catch(() => ({}))) as { url?: string; code?: string };
    if (!res.ok || !data.url) return data.code ?? `http_${res.status}`;
    window.location.href = data.url;
    return null;
  } catch {
    return "network";
  }
}

export async function signOut(): Promise<void> {
  await apiFetch("/api/auth/sign-out", { method: "POST", body: "{}" }).catch(() => undefined);
}

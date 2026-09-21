/* --------------------------------------------------------------------
   Kirish — one page, one tap.

   Telegram or Google, no password, no form. There is no separate
   "sign up": the first sign-in creates the account, and most people
   arrive not knowing which of the two they need anyway.

   The account is only needed for the paid course and for keeping
   progress across devices. The free course never asks for one, and this
   page says so.
   -------------------------------------------------------------------- */

import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { signInWith, type Provider } from "../lib/api";
import { useAuth } from "./AuthProvider";
import "./auth.css";

/* A refused or abandoned sign-in comes back as /kirish?error=<code>, in
   English; students here read Uzbek. */
function uzbekError(code: string): string {
  const c = code.toLowerCase();
  if (c.includes("access_denied") || c.includes("cancel")) return "Kirish bekor qilindi.";
  if (c.includes("state") || c.includes("expired"))
    return "Havolaning muddati tugadi. Qayta urinib koʻring.";
  if (c.includes("network"))
    return "Tarmoqda xatolik. Internetni tekshirib, qayta urinib koʻring.";
  if (c.includes("429") || c.includes("too_many"))
    return "Juda koʻp urinish. Bir daqiqadan keyin qayta urinib koʻring.";
  return "Kirib boʻlmadi. Qayta urinib koʻring.";
}

const LABEL: Record<Provider, string> = {
  telegram: "Telegram orqali kirish",
  google: "Google orqali kirish",
};

export default function AuthPage() {
  const { session, configured, providers } = useAuth();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/learn";

  const [busy, setBusy] = useState<Provider | null>(null);
  const [error, setError] = useState<string | null>(() => {
    const code = new URLSearchParams(location.search).get("error");
    return code ? uzbekError(code) : null;
  });

  if (session) return <Navigate to={from} replace />;

  const start = async (p: Provider) => {
    setBusy(p);
    setError(null);
    const failed = await signInWith(p, from);
    // On success the browser is already on its way to Telegram or Google.
    if (failed) {
      setError(uzbekError(failed));
      setBusy(null);
    }
  };

  return (
    <main className="auth" id="main">
      <div className="auth__card">
        <Link className="auth__brand" to="/">
          Nol<span>dan</span>
        </Link>

        {session === undefined ? (
          <p className="auth__lead auth__wait">
            <Loader2 size={14} className="auth__spin" aria-hidden="true" />
            Yuklanmoqda…
          </p>
        ) : !configured || providers.length === 0 ? (
          <>
            <h1 className="auth__title">Hisoblar tez orada</h1>
            <p className="auth__lead">
              Tez orada bu yerda Telegram yoki Google orqali kirish mumkin
              boʻladi. Bepul Tokenizator kursi hozir ham toʻliq ochiq — uning
              uchun hisob kerak emas.
            </p>
            <Link className="auth__ghost" to="/learn">
              Darslarga oʻtish
            </Link>
          </>
        ) : (
          <>
            <h1 className="auth__title">Kirish</h1>
            <p className="auth__lead">
              Bir bosishda, parolsiz. Birinchi kirishda hisobingiz oʻzi
              yaratiladi.
            </p>

            <div className="auth__providers">
              {providers.map((p) => (
                <button
                  key={p}
                  type="button"
                  className="auth__oauth"
                  disabled={busy !== null}
                  onClick={() => void start(p)}
                >
                  {busy === p ? (
                    <Loader2 size={16} className="auth__spin" aria-hidden="true" />
                  ) : p === "telegram" ? (
                    <TelegramMark />
                  ) : (
                    <GoogleMark />
                  )}
                  {LABEL[p]}
                </button>
              ))}
            </div>

            {error && (
              <p className="auth__error" role="alert">
                {error}
              </p>
            )}

            <p className="auth__fine">
              Hisob pullik kurs va progressingizni saqlash uchun kerak. Bepul
              Tokenizator kursi hisobsiz ham ochiq.
            </p>
          </>
        )}
      </div>

      <Link className="auth__back" to="/">
        <ArrowLeft size={14} strokeWidth={2.2} aria-hidden="true" />
        Bosh sahifa
      </Link>
    </main>
  );
}

function TelegramMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#2AABEE" />
      <path
        fill="#fff"
        d="M5.4 11.8l11.6-4.5c.54-.2 1 .13.83.94l-2 9.3c-.14.66-.54.82-1.1.51l-3-2.2-1.45 1.4c-.16.16-.3.3-.6.3l.21-3.05 5.56-5.02c.24-.21-.05-.33-.37-.12l-6.87 4.33-2.96-.93c-.64-.2-.66-.64.14-.96z"
      />
    </svg>
  );
}

function GoogleMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2 0 24 0 14.6 0 6.4 5.4 2.5 13.2l7.8 6.1C12.2 13.3 17.6 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9.1h12.4c-.5 2.9-2.1 5.3-4.6 6.9l7.1 5.5c4.2-3.9 6.6-9.6 6.6-16.4z" />
      <path fill="#FBBC05" d="M10.3 28.7a14.5 14.5 0 0 1 0-9.4l-7.8-6.1a24 24 0 0 0 0 21.6l7.8-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.1-5.5c-2 1.3-4.6 2.1-8.8 2.1-6.4 0-11.8-3.8-13.7-9.1l-7.8 6.1C6.4 42.6 14.6 48 24 48z" />
    </svg>
  );
}

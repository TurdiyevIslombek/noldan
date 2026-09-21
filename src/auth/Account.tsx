/* --------------------------------------------------------------------
   Hisobim — the account page, and where a payment returns to.

   Payme and Click both send the payer back here after the card step,
   but the money is confirmed out-of-band: their servers call
   /api/payme or /api/click, and THAT is what grants the course. So the
   return landing cannot trust its own querystring — it re-asks
   /api/me, and briefly polls, because the callback and the redirect
   race and the callback usually wins by under a second.
   -------------------------------------------------------------------- */

import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Check, Loader2, LogOut } from "lucide-react";
import SiteNav from "../components/SiteNav";
import { CATALOG } from "../lib/catalog.generated";
import { apiFetch } from "../lib/api";
import { useAuth } from "./AuthProvider";
import "./auth.css";
import "./account.css";

type CoursePrice = {
  id: string;
  name: string;
  access: "free" | "paid";
  price_uzs: number;
  price_usd: number;
};

const som = (tiyin: number) =>
  new Intl.NumberFormat("uz-UZ").format(Math.round(tiyin / 100));

export default function Account() {
  const { session, name, email, entitlements, owns, refresh, signOut, configured } = useAuth();
  const [prices, setPrices] = useState<CoursePrice[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [settling, setSettling] = useState(false);

  useEffect(() => {
    apiFetch("/api/courses")
      .then((r) => (r.ok ? r.json() : { courses: [] }))
      .then((d: { courses?: CoursePrice[] }) => setPrices(d.courses ?? []))
      .catch(() => undefined);
  }, []);

  // Landing back from a provider: poll briefly for the callback to land.
  useEffect(() => {
    if (!session) return;
    const returned = new URLSearchParams(window.location.search).has("from");
    if (!returned) return;

    setSettling(true);
    let n = 0;
    const id = window.setInterval(async () => {
      n += 1;
      await refresh();
      if (n >= 6) {
        window.clearInterval(id);
        setSettling(false);
      }
    }, 1500);
    return () => window.clearInterval(id);
  }, [session, refresh]);

  if (session === undefined) {
    return (
      <div className="acct">
        <SiteNav />
        <main className="acct__wrap" id="main">
          <p className="acct__loading">
            <Loader2 size={15} className="auth__spin" aria-hidden="true" /> Yuklanmoqda…
          </p>
        </main>
      </div>
    );
  }
  if (!session) return <Navigate to="/kirish" replace state={{ from: "/hisobim" }} />;

  const buy = async (courseId: string, provider: "payme" | "click") => {
    setBusy(`${courseId}:${provider}`);
    setError(null);
    try {
      const res = await apiFetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({ courseId, provider }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Toʻlovni boshlab boʻlmadi.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Tarmoqda xatolik. Qayta urinib koʻring.");
    } finally {
      setBusy(null);
    }
  };

  const priceOf = (id: string) => prices.find((p) => p.id === id);

  return (
    <div className="acct">
      <SiteNav />

      <main className="acct__wrap" id="main">
        <header className="acct__head">
          <span className="acct__eyebrow">Hisob</span>
          <h1 className="acct__title">Hisobim</h1>
          <p className="acct__email">{[name, email].filter(Boolean).join(" · ")}</p>
          <button type="button" className="acct__signout" onClick={() => void signOut()}>
            <LogOut size={13} strokeWidth={2.2} aria-hidden="true" />
            Chiqish
          </button>
        </header>

        {settling && (
          <p className="acct__settling">
            <Loader2 size={14} className="auth__spin" aria-hidden="true" />
            Toʻlov tasdiqlanmoqda… bu bir necha soniya olishi mumkin.
          </p>
        )}

        {error && (
          <p className="auth__error" role="alert">
            {error}
          </p>
        )}

        <section className="acct__section">
          <h2 className="acct__h2">Kurslar</h2>

          <ul className="acct__courses">
            {CATALOG.map((c) => {
              const free = c.access === "free";
              const owned = free || owns(c.id);
              const price = priceOf(c.id);
              return (
                <li className={`ccard${owned ? " is-owned" : ""}`} key={c.id}>
                  <div className="ccard__top">
                    <span className="ccard__badge">{c.short}</span>
                    <div className="ccard__id">
                      <p className="ccard__name">{c.name}</p>
                      <p className="ccard__meta">
                        {c.lessons.length} dars
                        {free && <> &middot; Bepul</>}
                      </p>
                    </div>
                    {owned && (
                      <span className="ccard__owned">
                        <Check size={12} strokeWidth={3} aria-hidden="true" />
                        {free ? "Ochiq" : "Sizda bor"}
                      </span>
                    )}
                  </div>

                  {c.lessons.length === 0 ? (
                    /* Never sell or open a course with nothing in it yet. */
                    <p className="ccard__price">Tez orada</p>
                  ) : owned ? (
                    <Link className="ccard__go" to={`/learn/${c.id}/${c.lessons[0]?.id ?? ""}`}>
                      Kursni ochish
                    </Link>
                  ) : (
                    <div className="ccard__buy">
                      <p className="ccard__price">
                        {price ? (
                          <>
                            <strong>{som(price.price_uzs)}</strong> soʻm
                            <span className="ccard__once"> · bir marta, umrbod</span>
                          </>
                        ) : configured ? (
                          "Narx yuklanmoqda…"
                        ) : (
                          "Toʻlov hali sozlanmagan"
                        )}
                      </p>
                      <div className="ccard__pays">
                        <button
                          type="button"
                          className="paybtn paybtn--payme"
                          disabled={!price || busy !== null}
                          onClick={() => void buy(c.id, "payme")}
                        >
                          {busy === `${c.id}:payme` && (
                            <Loader2 size={13} className="auth__spin" aria-hidden="true" />
                          )}
                          Payme
                        </button>
                        <button
                          type="button"
                          className="paybtn paybtn--click"
                          disabled={!price || busy !== null}
                          onClick={() => void buy(c.id, "click")}
                        >
                          {busy === `${c.id}:click` && (
                            <Loader2 size={13} className="auth__spin" aria-hidden="true" />
                          )}
                          Click
                        </button>
                      </div>
                      <p className="ccard__cards">Uzcard · Humo · Visa · Mastercard</p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        {entitlements.length === 0 && (
          <p className="acct__note">
            Bepul Tokenizator kursi hisobsiz ham ochiq. Pullik kursni sotib
            olsangiz, u shu yerda paydo boʻladi.
          </p>
        )}
      </main>
    </div>
  );
}

/* --------------------------------------------------------------------
   Sign-in: Better Auth, running inside our own /api, with its tables in
   our own Postgres. No auth vendor, no per-user pricing.

   Two ways in, both one tap, neither with a password:

     · Telegram — the app nearly every student in Uzbekistan already
       has open. Standard OpenID Connect (oauth.telegram.org).
     · Google   — every Android phone already has an account.

   No passwords means no password resets and no confirmation emails —
   so there is no email service to set up, pay for, or be rate-limited
   by.

   The session is an httpOnly cookie on this site's own domain. The
   browser only ever talks to this site; Telegram, Google and the
   database are reached from the server. A block on some third-party API
   domain cannot lock students out of their accounts.
   -------------------------------------------------------------------- */

import { betterAuth, type BetterAuthOptions } from "better-auth";
import { genericOAuth } from "better-auth/plugins";
import { decodeJwt } from "jose";
import { db, dbConfigured } from "./db.js";

export type Provider = "google" | "telegram";

/** Telegram accounts have no email, and Better Auth needs one on every
 *  user. `.invalid` is reserved (RFC 2606): no inbox can ever exist
 *  there, so the placeholder can never collide with, or be linked to,
 *  a real address. */
const NO_EMAIL = "@noldan.invalid";

/* Overridable only so the sign-in flow can be exercised end to end
   against a local stand-in; production never sets it. */
const TELEGRAM_DISCOVERY =
  process.env.TELEGRAM_DISCOVERY_URL ||
  "https://oauth.telegram.org/.well-known/openid-configuration";

export function providers(): Provider[] {
  const list: Provider[] = [];
  if (process.env.TELEGRAM_CLIENT_ID && process.env.TELEGRAM_CLIENT_SECRET) list.push("telegram");
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) list.push("google");
  return list;
}

export function authConfigured(): boolean {
  return dbConfigured() && Boolean(process.env.BETTER_AUTH_SECRET);
}

/** Origins allowed to start a sign-in — the same set /api serves. */
function trustedOrigins(): string[] {
  const set = new Set<string>();
  for (const o of (process.env.ALLOWED_ORIGINS ?? "").split(",")) {
    if (o.trim()) set.add(o.trim());
  }
  if (process.env.SITE_URL) set.add(process.env.SITE_URL.replace(/\/+$/, ""));
  if (process.env.VERCEL_URL) set.add(`https://${process.env.VERCEL_URL}`);
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    set.add(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }
  if (process.env.NODE_ENV !== "production") {
    set.add("http://localhost:5188");
    set.add("http://localhost:5173");
  }
  return [...set];
}

const text = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);

function create() {
  const on = providers();

  const options = {
    appName: "Noldan",
    // Where Google and Telegram send the student back to. Must match the
    // redirect URLs registered with them (DEPLOY.md, section 4).
    baseURL: process.env.BETTER_AUTH_URL || process.env.SITE_URL || undefined,
    basePath: "/api/auth",
    secret: process.env.BETTER_AUTH_SECRET,
    database: db(),
    trustedOrigins: trustedOrigins(),

    socialProviders: on.includes("google")
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            prompt: "select_account",
          },
        }
      : {},

    plugins: [
      genericOAuth({
        config: on.includes("telegram")
          ? [
              {
                providerId: "telegram",
                name: "Telegram",
                clientId: process.env.TELEGRAM_CLIENT_ID!,
                clientSecret: process.env.TELEGRAM_CLIENT_SECRET!,
                discoveryUrl: TELEGRAM_DISCOVERY,
                // Refuse to run at all rather than accept unverified tokens
                // if discovery ever comes back without Telegram's keys.
                requireIdTokenVerification: true,
                scopes: ["openid", "profile"],
                authentication: "basic",
                // Telegram publishes no userinfo endpoint and no email: the
                // profile IS the id_token. Better Auth has already checked
                // it against Telegram's published keys and our nonce before
                // this runs, so decoding is all that is left.
                getUserInfo: async (tokens) => {
                  if (!tokens.idToken) return null;
                  const c = decodeJwt(tokens.idToken);
                  if (!c.sub) return null;
                  const username = text(c.preferred_username);
                  return {
                    sub: c.sub,
                    name: text(c.name) ?? (username ? `@${username}` : "Telegram foydalanuvchisi"),
                    email: `telegram-${c.sub}${NO_EMAIL}`,
                    emailVerified: false,
                    image: text(c.picture),
                  };
                },
              },
            ]
          : [],
      }),
    ],

    session: {
      expiresIn: 60 * 60 * 24 * 60, // two months — students come back weekly, not daily
      updateAge: 60 * 60 * 24,
    },
    advanced: { cookiePrefix: "noldan" },
  } satisfies BetterAuthOptions;

  return betterAuth(options);
}

let instance: ReturnType<typeof create> | null = null;

export function getAuth() {
  return (instance ??= create());
}

export type SessionUser = {
  id: string;
  name: string;
  email: string | null;
  image: string | null;
};

/** The signed-in student, from the session cookie on this request.
 *  Null for no cookie, an expired or forged one, or an unconfigured
 *  server — never an exception. */
export async function sessionUser(headers: Headers): Promise<SessionUser | null> {
  if (!authConfigured()) return null;
  try {
    const found = await getAuth().api.getSession({ headers });
    if (!found) return null;
    const { user } = found;
    return {
      id: user.id,
      name: user.name,
      email: user.email.endsWith(NO_EMAIL) ? null : user.email,
      image: user.image ?? null,
    };
  } catch {
    return null;
  }
}

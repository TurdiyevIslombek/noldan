/* --------------------------------------------------------------------
   Who is signed in, and what they have access to — once, for the app.

   One request to /api/me answers all of it: the student (from the
   session cookie), their courses, their progress, and which sign-in
   buttons the server has switched on.

   `entitlements` here is a CONVENIENCE, not a security boundary. It
   decides whether the UI draws a lesson or a lock, and a determined
   visitor can obviously flip it in devtools — at which point they get
   an empty lesson shell, because the text itself only ever arrives from
   /api/lesson, which re-checks on the server. The lock is honest UI;
   the paywall is the endpoint.
   -------------------------------------------------------------------- */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { apiFetch, signOut as endSession, type Provider } from "../lib/api";

type Progress = { course_id: string; lesson_id: string };

export type User = {
  id: string;
  name: string;
  /** null for Telegram accounts, which have no email */
  email: string | null;
  image: string | null;
};

type Me = {
  configured?: boolean;
  providers?: Provider[];
  user?: User | null;
  entitlements?: string[];
  progress?: Progress[];
};

type AuthValue = {
  /** null = signed out, undefined = still asking the server */
  session: { user: User } | null | undefined;
  name: string | null;
  email: string | null;
  /** The server has a database and a secret, so accounts can exist. */
  configured: boolean;
  /** Sign-in buttons the server has credentials for. */
  providers: Provider[];
  entitlements: string[];
  progress: Progress[];
  owns: (courseId: string) => boolean;
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
};

const Ctx = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [configured, setConfigured] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [entitlements, setEntitlements] = useState<string[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);

  // Also re-run on the return from a payment provider, which lands as a
  // fresh page load, and by the account page while a payment settles.
  const refresh = useCallback(async () => {
    try {
      const res = await apiFetch("/api/me");
      // No /api at all (a static preview) reads as "no accounts here".
      const data: Me = res.ok ? await res.json() : {};
      setConfigured(Boolean(data.configured));
      setProviders(data.providers ?? []);
      setUser(data.user ?? null);
      setEntitlements(data.entitlements ?? []);
      setProgress(data.progress ?? []);
    } catch {
      // Offline, or not JSON. A known student stays signed in — a flaky
      // network is not a sign-out — and an unknown one is signed out.
      setUser((u) => u ?? null);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo<AuthValue>(
    () => ({
      session: user === undefined ? undefined : user ? { user } : null,
      name: user?.name ?? null,
      email: user?.email ?? null,
      configured,
      providers,
      entitlements,
      progress,
      owns: (courseId: string) => entitlements.includes(courseId),
      refresh,
      signOut: async () => {
        await endSession();
        setUser(null);
        setEntitlements([]);
        setProgress([]);
      },
    }),
    [user, configured, providers, entitlements, progress, refresh]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth(): AuthValue {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used inside <AuthProvider>");
  return v;
}

/* --------------------------------------------------------------------
   /api/auth/* — sign in, sign out, and the OAuth callbacks.

   vercel.json rewrites every path under /api/auth to this one function,
   and Better Auth routes on the original URL:

     POST /api/auth/sign-in/social      { provider, callbackURL }
     GET  /api/auth/callback/telegram   Telegram sends the student back here
     GET  /api/auth/callback/google     …and Google here
     GET  /api/auth/get-session
     POST /api/auth/sign-out

   Better Auth checks the request origin against trustedOrigins and
   rate-limits these routes itself.
   -------------------------------------------------------------------- */

import { authConfigured, getAuth } from "./_lib/auth";

export default {
  async fetch(req: Request): Promise<Response> {
    if (!authConfigured()) {
      return Response.json({ error: "Hisob tizimi hali sozlanmagan." }, { status: 503 });
    }
    return getAuth().handler(req);
  },
};

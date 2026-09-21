/* --------------------------------------------------------------------
   Starts a purchase.

   The browser asks for a course; this creates the order row and returns
   the provider URL to send the student to. The client never chooses the
   price — it is read from the `courses` table here, server side.
   Otherwise a student could post `amount: 1` and buy the course for a
   tiyin, which is the single most common way a checkout gets robbed.

   Configure in Vercel:
     PAYME_MERCHANT_ID, PAYME_CHECKOUT_URL (test.paycom.uz while in sandbox)
     CLICK_SERVICE_ID, CLICK_MERCHANT_ID
     SITE_URL — where the payer comes back to
   -------------------------------------------------------------------- */

import { guard } from "./_lib/http";
import { authConfigured, sessionUser } from "./_lib/auth";
import { one } from "./_lib/db";

type Provider = "payme" | "click";

export default {
  async fetch(req: Request): Promise<Response> {
    const blocked = guard(req, { method: "POST", limit: 20 });
    if (blocked) return blocked;

    if (!authConfigured()) {
      return Response.json(
        { error: "Toʻlov tizimi hali sozlanmagan." },
        { status: 503 }
      );
    }

    const user = await sessionUser(req.headers);
    if (!user) {
      return Response.json({ error: "Avval tizimga kiring." }, { status: 401 });
    }

    let body: { courseId?: unknown; provider?: unknown };
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Notoʻgʻri JSON" }, { status: 400 });
    }

    const courseId = typeof body.courseId === "string" ? body.courseId : "";
    const provider: Provider = body.provider === "click" ? "click" : "payme";

    // Checked before an order exists, so an unconfigured provider does not
    // leave a trail of orders nobody can pay.
    if (!providerReady(provider)) {
      return Response.json(
        { error: "Toʻlov provayderi sozlanmagan." },
        { status: 503 }
      );
    }

    try {
      const course = await one<{
        id: string;
        access: string;
        price_uzs: number;
        is_published: boolean;
      }>("select id, access, price_uzs, is_published from courses where id = $1", [courseId]);

      if (!course || !course.is_published) {
        return Response.json({ error: "Kurs topilmadi." }, { status: 404 });
      }
      if (course.access === "free") {
        return Response.json({ error: "Bu kurs bepul." }, { status: 400 });
      }

      // Already owns it — do not take money twice.
      const owned = await one(
        "select 1 from entitlements where user_id = $1 and course_id = $2",
        [user.id, course.id]
      );
      if (owned) {
        return Response.json(
          { error: "Bu kurs sizda allaqachon bor.", owned: true },
          { status: 409 }
        );
      }

      const amount = Number(course.price_uzs); // tiyin
      if (!Number.isInteger(amount) || amount <= 0) {
        return Response.json({ error: "Kurs narxi sozlanmagan." }, { status: 503 });
      }

      const order = await one<{ id: string }>(
        `insert into orders (user_id, course_id, provider, amount, currency, state)
         values ($1, $2, $3, $4, 'UZS', 'pending')
         returning id`,
        [user.id, course.id, provider, amount]
      );
      if (!order) {
        return Response.json({ error: "Buyurtma yaratilmadi." }, { status: 500 });
      }

      const url =
        provider === "payme" ? paymeUrl(order.id, amount) : clickUrl(order.id, amount);

      return Response.json({ orderId: order.id, provider, url });
    } catch {
      return Response.json(
        { error: "Buyurtma yaratilmadi. Qayta urinib koʻring." },
        { status: 503 }
      );
    }
  },
};

function providerReady(provider: Provider): boolean {
  return provider === "payme"
    ? Boolean(process.env.PAYME_MERCHANT_ID)
    : Boolean(process.env.CLICK_SERVICE_ID && process.env.CLICK_MERCHANT_ID);
}

function returnUrl(): string {
  const site = (process.env.SITE_URL ?? "").replace(/\/+$/, "");
  return `${site}/hisobim`;
}

/** Payme takes its whole request as one base64 blob in the path.
 *  `ac.order_id` must match the account field registered in the cabinet. */
function paymeUrl(orderId: string, amountTiyin: number): string {
  const base = (process.env.PAYME_CHECKOUT_URL ?? "https://checkout.paycom.uz").replace(
    /\/+$/,
    ""
  );
  const params = [
    `m=${process.env.PAYME_MERCHANT_ID}`,
    `ac.order_id=${orderId}`,
    `a=${amountTiyin}`,
    `c=${returnUrl()}`,
    "l=uz",
  ].join(";");

  return `${base}/${btoa(params)}`;
}

/** Click wants so'm, not tiyin, on the querystring. */
function clickUrl(orderId: string, amountTiyin: number): string {
  const q = new URLSearchParams({
    service_id: process.env.CLICK_SERVICE_ID ?? "",
    merchant_id: process.env.CLICK_MERCHANT_ID ?? "",
    amount: (amountTiyin / 100).toFixed(2),
    transaction_param: orderId,
    return_url: returnUrl(),
  });
  return `https://my.click.uz/services/pay?${q}`;
}

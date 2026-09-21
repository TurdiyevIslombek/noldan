/* --------------------------------------------------------------------
   Who may read what.

   hasCourseAccess is the single source of truth for "may this user read
   this course?". Free courses are open to everyone, signed in or not;
   a paid course needs a live entitlement, and entitlements are written
   in exactly one place — the payment path (payments.ts).
   -------------------------------------------------------------------- */

import { one, q } from "./db.js";

export async function hasCourseAccess(
  userId: string | null,
  courseId: string
): Promise<boolean> {
  try {
    const course = await one<{ access: string }>(
      "select access from courses where id = $1",
      [courseId]
    );
    if (!course) return false;
    if (course.access === "free") return true;
    if (!userId) return false;

    const ent = await one<{ live: boolean }>(
      `select (expires_at is null or expires_at > now()) as live
         from entitlements
        where user_id = $1 and course_id = $2`,
      [userId, courseId]
    );
    return ent?.live === true;
  } catch {
    // Fail CLOSED. A database we cannot reach is not permission to read
    // a paid course.
    return false;
  }
}

/** Grant access after a confirmed payment. Idempotent: providers re-send
 *  their "performed" callback, and a second grant must not be an error. */
export async function grantEntitlement(
  userId: string,
  courseId: string,
  source: "purchase" | "grant" | "trial" = "purchase"
): Promise<void> {
  await q(
    `insert into entitlements (user_id, course_id, source)
     values ($1, $2, $3)
     on conflict (user_id, course_id) do nothing`,
    [userId, courseId, source]
  );
}

export async function revokeEntitlement(userId: string, courseId: string): Promise<void> {
  await q("delete from entitlements where user_id = $1 and course_id = $2", [
    userId,
    courseId,
  ]);
}

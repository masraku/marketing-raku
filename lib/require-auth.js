import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

/**
 * Checks if the current request has a valid admin session.
 * Returns the session if authenticated, or a 401 response if not.
 *
 * Usage in API route:
 *   const authResult = await requireApiAuth();
 *   if (authResult instanceof NextResponse) return authResult;
 *   // authResult is the valid session
 */
export async function requireApiAuth() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized — silakan login terlebih dahulu" },
      { status: 401 }
    );
  }

  return session;
}

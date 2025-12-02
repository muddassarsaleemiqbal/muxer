import type { Route } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/actions/auth";

/**
 * Ensures the user is authenticated. Redirects to sign-in if not.
 * Returns the session for use in the page component.
 *
 * @example
 * ```tsx
 * export default async function ProtectedPage() {
 *   const session = await requireAuth();
 *   return <div>Welcome, {session.user.name}</div>;
 * }
 * ```
 */
export async function requireAuth(redirectTo: Route = "/auth/sign-in") {
  const session = await getSession();

  if (!session) {
    redirect(redirectTo);
  }

  return session;
}

/**
 * Ensures the user is NOT authenticated (guest only).
 * Redirects authenticated users to the specified page (default: dashboard).
 *
 * @example
 * ```tsx
 * export default async function SignInPage() {
 *   await requireGuest();
 *   return <SignInForm />;
 * }
 * ```
 */
export async function requireGuest(redirectTo: Route = "/dashboard") {
  const session = await getSession();

  if (session) {
    redirect(redirectTo);
  }
}

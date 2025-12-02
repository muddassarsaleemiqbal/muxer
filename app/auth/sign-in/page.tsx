import SignInForm from "@/components/forms/auth/sign-in-form";
import { requireGuest } from "@/lib/auth-guards";

export default async function SignIn() {
  await requireGuest();

  return <SignInForm />;
}

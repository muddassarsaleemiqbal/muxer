import SignUpForm from "@/components/forms/auth/sign-up-form";
import { requireGuest } from "@/lib/auth-guards";

export default async function SignUp() {
  await requireGuest();

  return <SignUpForm />;
}

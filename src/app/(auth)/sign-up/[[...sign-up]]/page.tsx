import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 py-12">
      <SignUp afterSignUpUrl="/dashboard" />
    </div>
  );
}

import { SignUp } from "@clerk/nextjs";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect_url?: string }>;
}) {
  const params = await searchParams;
  const redirectUrl = params.redirect_url ?? "/dashboard";
  const allowed = redirectUrl.startsWith("/") && !redirectUrl.startsWith("//");
  const afterSignUpUrl = allowed ? redirectUrl : "/dashboard";
  const signInUrl = allowed ? `/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}` : "/sign-in";

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 py-12">
      <SignUp afterSignUpUrl={afterSignUpUrl} signInUrl={signInUrl} />
    </div>
  );
}

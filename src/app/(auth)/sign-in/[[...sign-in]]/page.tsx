import { SignIn } from "@clerk/nextjs";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect_url?: string }>;
}) {
  const params = await searchParams;
  const redirectUrl = params.redirect_url ?? "/dashboard";
  const allowed = redirectUrl.startsWith("/") && !redirectUrl.startsWith("//");
  const afterSignInUrl = allowed ? redirectUrl : "/dashboard";
  const signUpUrl = allowed ? `/sign-up?redirect_url=${encodeURIComponent(redirectUrl)}` : "/sign-up";

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 py-12">
      <SignIn afterSignInUrl={afterSignInUrl} signUpUrl={signUpUrl} />
    </div>
  );
}

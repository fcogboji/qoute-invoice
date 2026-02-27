import Link from "next/link";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-stone-900">TradesQuote</span>
            <span className="rounded bg-stone-200 px-2 py-0.5 text-xs font-medium text-stone-600">
              UK
            </span>
          </Link>
          <nav className="flex items-center gap-8">
            <Link
              href="/#features"
              className="text-stone-600 hover:text-stone-900 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-stone-600 hover:text-stone-900 transition-colors"
            >
              Pricing
            </Link>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-stone-600 hover:text-stone-900 transition-colors font-medium">
                  Sign In
                </button>
              </SignInButton>
              <Link
                href="/sign-up"
                className="rounded-lg bg-amber-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-amber-700"
              >
                Get Started
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard"
                className="text-stone-600 hover:text-stone-900 transition-colors font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard"
                className="rounded-lg bg-amber-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-amber-700"
              >
                Go to App
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}

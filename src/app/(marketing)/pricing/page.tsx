import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function PricingPage() {
  return (
    <div className="text-stone-900">
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <p className="text-center text-sm font-semibold text-amber-600">
          For UK tradespeople
        </p>
        <h1 className="mt-2 text-center text-3xl font-bold md:text-4xl">
          Simple UK pricing
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-center text-stone-600">
          Start free. No card. Upgrade when you need more.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-8">
          {/* Free */}
          <div className="rounded-2xl border-2 border-stone-200 bg-white p-8">
            <h2 className="text-xl font-semibold">Free</h2>
            <p className="mt-2 text-stone-600">
              For getting started. Sole traders and small jobs.
            </p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold">£0</span>
              <span className="text-stone-500">/month</span>
            </div>
            <ul className="mt-6 space-y-3 text-stone-600">
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                10 quotes + 10 invoices/month
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                UK VAT (20%) auto-calculated
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                PDF export
              </li>
            </ul>
            <SignedOut>
              <Link
                href="/sign-up"
                className="mt-8 block w-full rounded-xl border-2 border-stone-300 py-3 text-center font-semibold text-stone-900 transition-colors hover:border-amber-500 hover:bg-amber-50"
              >
                Get started
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard"
                className="mt-8 block w-full rounded-xl border-2 border-stone-300 py-3 text-center font-semibold text-stone-900 transition-colors hover:border-amber-500 hover:bg-amber-50"
              >
                Go to Dashboard
              </Link>
            </SignedIn>
          </div>

          {/* Pro */}
          <div className="rounded-2xl border-2 border-amber-500 bg-amber-50/30 p-8 shadow-lg">
            <span className="rounded-full bg-amber-200 px-3 py-1 text-xs font-semibold text-amber-900">
              Most popular
            </span>
            <h2 className="mt-4 text-xl font-semibold">Pro</h2>
            <p className="mt-2 text-stone-600">
              For busy tradespeople. Unlimited quotes & invoices.
            </p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold">£15</span>
              <span className="text-stone-500">/month</span>
            </div>
            <ul className="mt-6 space-y-3 text-stone-600">
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                Unlimited quotes & invoices
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                Your logo on documents
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                Everything in Free
              </li>
            </ul>
            <SignedOut>
              <Link
                href="/sign-up"
                className="mt-8 block w-full rounded-xl bg-amber-600 py-3 text-center font-semibold text-white transition-colors hover:bg-amber-700"
              >
                Start Pro
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard"
                className="mt-8 block w-full rounded-xl bg-amber-600 py-3 text-center font-semibold text-white transition-colors hover:bg-amber-700"
              >
                Go to Dashboard
              </Link>
            </SignedIn>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-stone-500">
          Cancel anytime. UK-based support.
        </p>
      </section>
    </div>
  );
}

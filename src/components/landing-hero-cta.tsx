"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export function LandingHeroCta() {
  return (
    <>
      <SignedOut>
        <Link
          href="/sign-up?redirect_url=%2Fpricing"
          className="mt-10 inline-flex h-14 items-center rounded-xl bg-[#0F2544] px-10 text-lg font-semibold text-white shadow-lg shadow-[#0F2544]/25 transition-all hover:bg-[#1A3A6E] hover:shadow-xl"
        >
          Start 7-day free trial
        </Link>
        <p className="mt-4 text-sm text-[#0F2544]/60">Try free for 7 days. Cancel anytime.</p>
      </SignedOut>
      <SignedIn>
        <Link
          href="/dashboard"
          className="mt-10 inline-flex h-14 items-center rounded-xl bg-[#0F2544] px-10 text-lg font-semibold text-white transition-colors hover:bg-[#1A3A6E]"
        >
          Go to Dashboard
        </Link>
      </SignedIn>
    </>
  );
}

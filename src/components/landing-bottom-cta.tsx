"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export function LandingBottomCta() {
  return (
    <>
      <SignedOut>
        <Link
          href="/sign-up?redirect_url=%2Fpricing"
          className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#0F2544] px-10 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#1A3A6E]"
        >
          Start 7-day free trial
        </Link>
      </SignedOut>
      <SignedIn>
        <Link
          href="/dashboard"
          className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#0F2544] px-10 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#1A3A6E]"
        >
          Go to Dashboard
        </Link>
      </SignedIn>
    </>
  );
}

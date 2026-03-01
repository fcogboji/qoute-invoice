"use client";

import Link from "next/link";
import { useState } from "react";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

export default function MarketingHeader() {
  const [open, setOpen] = useState(false);

  const navLinks = (
    <>
      <Link
        href="/#features"
        className="block min-h-[44px] py-3 text-stone-600 hover:text-stone-900 transition-colors md:py-2"
        onClick={() => setOpen(false)}
      >
        Features
      </Link>
      <Link
        href="/pricing"
        className="block min-h-[44px] py-3 text-stone-600 hover:text-stone-900 transition-colors md:py-2"
        onClick={() => setOpen(false)}
      >
        Pricing
      </Link>
    </>
  );

  return (
    <header className="border-b border-stone-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-stone-900">tradeinvoice</span>
          <span className="rounded bg-stone-200 px-2 py-0.5 text-xs font-medium text-stone-600">
            UK
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="min-h-[44px] px-4 text-stone-600 hover:text-stone-900 transition-colors font-medium">
                Sign In
              </button>
            </SignInButton>
            <Link
              href="/pricing"
              className="flex min-h-[44px] items-center rounded-lg bg-amber-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-amber-700"
            >
              Get Started
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              className="min-h-[44px] py-2 text-stone-600 hover:text-stone-900 transition-colors font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard"
              className="flex min-h-[44px] items-center rounded-lg bg-amber-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-amber-700"
            >
              Go to App
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-stone-600 hover:bg-stone-100 md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-stone-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks}
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  className="min-h-[44px] py-3 text-left text-stone-600 hover:text-stone-900 transition-colors font-medium"
                  onClick={() => setOpen(false)}
                >
                  Sign In
                </button>
              </SignInButton>
              <Link
                href="/pricing"
                className="flex min-h-[44px] items-center rounded-lg bg-amber-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-amber-700"
                onClick={() => setOpen(false)}
              >
                Get Started
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard"
                className="min-h-[44px] py-3 text-stone-600 hover:text-stone-900 transition-colors font-medium"
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard"
                className="flex min-h-[44px] items-center rounded-lg bg-amber-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-amber-700"
                onClick={() => setOpen(false)}
              >
                Go to App
              </Link>
              <div className="flex min-h-[44px] items-center">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </nav>
        </div>
      )}
    </header>
  );
}

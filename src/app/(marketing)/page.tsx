"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function LandingPage() {
  return (
    <div className="text-stone-900">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-32">
        <div className="text-center">
          <span className="inline-block rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-800">
            For UK tradespeople
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Quote on site.
            <br />
            <span className="text-amber-600">Invoice in seconds.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-stone-600 md:text-xl">
            Built for electricians, plumbers, builders and fitters. No paperwork.
            UK VAT sorted. Works on your phone.
          </p>

          <SignedOut>
            <Link
              href="/sign-up"
              className="mt-10 inline-flex h-14 items-center rounded-xl bg-amber-600 px-10 text-lg font-semibold text-white shadow-lg shadow-amber-600/25 transition-all hover:bg-amber-700 hover:shadow-xl"
            >
              Start free — no card needed
            </Link>
            <p className="mt-4 text-sm text-stone-500">
              Join UK tradespeople who save hours every week
            </p>
          </SignedOut>

          <SignedIn>
            <Link
              href="/dashboard"
              className="mt-10 inline-flex h-14 items-center rounded-xl bg-amber-600 px-10 text-lg font-semibold text-white transition-colors hover:bg-amber-700"
            >
              Go to Dashboard
            </Link>
          </SignedIn>
        </div>

        {/* Trust row */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm text-stone-500 sm:mt-16 sm:gap-8">
          <span className="flex items-center gap-2">
            <span className="font-semibold text-stone-700">£</span> UK pricing
          </span>
          <span className="flex items-center gap-2">
            <span className="font-semibold text-stone-700">20%</span> VAT auto
          </span>
          <span>Works on phone & laptop</span>
          <span>No spreadsheets</span>
        </div>

        {/* Mock document */}
        <div className="mx-auto mt-12 max-w-md rounded-2xl border border-stone-200 bg-white p-4 shadow-xl sm:mt-20 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            What you get
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-stone-600">Labour</span>
              <span className="font-medium">£450.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-600">Materials</span>
              <span className="font-medium">£180.00</span>
            </div>
            <div className="flex justify-between border-t border-stone-200 pt-2 text-sm text-stone-500">
              <span>VAT (20%)</span>
              <span>£126.00</span>
            </div>
            <div className="flex justify-between border-t border-stone-200 pt-2 font-bold">
              <span>Total</span>
              <span className="text-amber-600">£756.00</span>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <span className="flex min-h-[44px] flex-1 items-center justify-center rounded-lg bg-amber-600 py-2.5 text-center text-sm font-medium text-white">
              Export PDF
            </span>
            <span className="flex min-h-[44px] flex-1 items-center justify-center rounded-lg bg-stone-100 py-2.5 text-center text-sm font-medium text-stone-700">
              → Invoice
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-stone-200 bg-white px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold md:text-3xl">
            Made for how trades actually work
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-stone-600">
            On site. On your phone. No fuss.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Quote in minutes",
                text: "Labour, materials, parts — add line items and get a total. VAT calculated for you.",
              },
              {
                title: "UK-ready",
                text: "20% VAT, £ pricing, UK date format. No setup. Just works.",
              },
              {
                title: "One tap to invoice",
                text: "Quote approved? Convert to invoice and export PDF. Get paid.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-stone-200 bg-stone-50/50 p-6"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-stone-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-stone-200 bg-amber-50/50 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold md:text-3xl">
            Built for UK trades. That&apos;s it.
          </h2>
          <p className="mt-4 text-stone-600">
            No bloat. No learning curve. Just quotes and invoices that work.
          </p>
          <SignedOut>
            <Link
              href="/sign-up"
              className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-amber-600 px-10 py-4 text-lg font-semibold text-white transition-colors hover:bg-amber-700"
            >
              Get started free
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-amber-600 px-10 py-4 text-lg font-semibold text-white transition-colors hover:bg-amber-700"
            >
              Go to Dashboard
            </Link>
          </SignedIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="text-sm text-stone-500">
            © {new Date().getFullYear()} TradesQuote — for UK tradespeople
          </span>
          <nav className="flex gap-6 text-sm">
            <Link href="/#features" className="min-h-[44px] py-2 text-stone-600 hover:text-stone-900 sm:min-h-0 sm:py-0">
              Features
            </Link>
            <Link href="/pricing" className="min-h-[44px] py-2 text-stone-600 hover:text-stone-900 sm:min-h-0 sm:py-0">
              Pricing
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

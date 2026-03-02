"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Logo } from "@/components/logo";

export default function LandingPage() {
  return (
    <div className="text-[#0F2544]">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-32">
        <div className="text-center">
          <Logo variant="full" href="/" showLink={true} className="mx-auto mb-6" />
          <span className="inline-block rounded-full bg-[#00C6A2]/15 px-4 py-1.5 text-sm font-semibold text-[#0F2544]">
            For UK tradespeople
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-[#0F2544] md:text-5xl lg:text-6xl">
            Quote on site.
            <br />
            <span
              className="bg-gradient-to-r from-[#00C6A2] to-[#00A3FF] bg-clip-text text-transparent"
            >
              Invoice in seconds.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#0F2544]/70 md:text-xl">
            Built for electricians, plumbers, builders and fitters. No paperwork.
            UK VAT sorted. Works on your phone.
          </p>

          <SignedOut>
            <Link
              href="/pricing"
              className="mt-10 inline-flex h-14 items-center rounded-xl bg-[#0F2544] px-10 text-lg font-semibold text-white shadow-lg shadow-[#0F2544]/25 transition-all hover:bg-[#1A3A6E] hover:shadow-xl"
            >
              Start 7-day free trial
            </Link>
            <p className="mt-4 text-sm text-[#0F2544]/60">
              Try free for 7 days. Cancel anytime.
            </p>
          </SignedOut>

          <SignedIn>
            <Link
              href="/dashboard"
              className="mt-10 inline-flex h-14 items-center rounded-xl bg-[#0F2544] px-10 text-lg font-semibold text-white transition-colors hover:bg-[#1A3A6E]"
            >
              Go to Dashboard
            </Link>
          </SignedIn>
        </div>

        {/* Trust row */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm text-[#0F2544]/60 sm:mt-16 sm:gap-8">
          <span className="flex items-center gap-2">
            <span className="font-semibold text-[#0F2544]">£</span> UK pricing
          </span>
          <span className="flex items-center gap-2">
            <span className="font-semibold text-[#0F2544]">20%</span> VAT auto
          </span>
          <span>Works on phone & laptop</span>
          <span>No spreadsheets</span>
        </div>

        {/* Mock document */}
        <div className="mx-auto mt-12 max-w-md rounded-2xl border border-[#0F2544]/10 bg-white p-4 shadow-xl sm:mt-20 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0F2544]/50">
            What you get
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#0F2544]/70">Labour</span>
              <span className="font-medium">£450.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#0F2544]/70">Materials</span>
              <span className="font-medium">£180.00</span>
            </div>
            <div className="flex justify-between border-t border-[#0F2544]/10 pt-2 text-sm text-[#0F2544]/60">
              <span>VAT (20%)</span>
              <span>£126.00</span>
            </div>
            <div className="flex justify-between border-t border-[#0F2544]/10 pt-2 font-bold">
              <span>Total</span>
              <span className="bg-gradient-to-r from-[#00C6A2] to-[#00A3FF] bg-clip-text text-transparent">£756.00</span>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <span className="flex min-h-[44px] flex-1 items-center justify-center rounded-lg bg-[#0F2544] py-2.5 text-center text-sm font-medium text-white">
              Export PDF
            </span>
            <span className="flex min-h-[44px] flex-1 items-center justify-center rounded-lg bg-[#0F2544]/5 py-2.5 text-center text-sm font-medium text-[#0F2544]">
              → Invoice
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-[#0F2544]/10 bg-white px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-[#0F2544] md:text-3xl">
            Made for how trades actually work
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[#0F2544]/70">
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
                className="rounded-2xl border border-[#0F2544]/10 bg-[#0F2544]/[0.02] p-6"
              >
                <h3 className="text-lg font-semibold text-[#0F2544]">{item.title}</h3>
                <p className="mt-2 text-[#0F2544]/70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#0F2544]/10 bg-[#0F2544]/[0.03] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-[#0F2544] md:text-3xl">
            Built for UK trades. That&apos;s it.
          </h2>
          <p className="mt-4 text-[#0F2544]/70">
            No bloat. No learning curve. Just quotes and invoices that work.
          </p>
          <SignedOut>
            <Link
              href="/pricing"
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
        </div>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { SubscribeButton } from "@/components/subscribe-button";

const PRICES = {
  starter: { monthly: 9, yearly: 86.4 },
  pro: { monthly: 15, yearly: 144 },
} as const;

export default function PricingPage() {
  const [interval, setInterval] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="text-stone-900">
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 md:py-24">
        <p className="text-center text-sm font-semibold text-amber-600">
          For UK tradespeople
        </p>
        <h1 className="mt-2 text-center text-3xl font-bold md:text-4xl">
          Simple UK pricing
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-center text-stone-600">
          7-day free trial. No charge until the trial ends. Cancel anytime.
        </p>

        {/* Billing toggle */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <span
            className={`text-sm font-medium transition-colors ${interval === "monthly" ? "text-stone-900" : "text-stone-500"}`}
          >
            Monthly
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={interval === "yearly"}
            onClick={() => setInterval((i) => (i === "monthly" ? "yearly" : "monthly"))}
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${interval === "yearly" ? "bg-amber-600" : "bg-stone-200"}`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition-transform ${interval === "yearly" ? "translate-x-6" : "translate-x-0.5"}`}
            />
          </button>
          <span
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${interval === "yearly" ? "text-stone-900" : "text-stone-500"}`}
          >
            Yearly
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
              Save 20%
            </span>
          </span>
        </div>

        <div className="mt-12 grid gap-6 sm:mt-16 sm:gap-8 md:grid-cols-2 md:gap-8">
          {/* Starter */}
          <div className="rounded-2xl border-2 border-stone-200 bg-white p-5 sm:p-8">
            <h2 className="text-xl font-semibold">Starter</h2>
            <p className="mt-2 text-stone-600">
              For sole traders and small jobs. Everything you need to get going.
            </p>
            <div className="mt-6 flex flex-col gap-1">
              {interval === "monthly" ? (
                <>
                  <span className="text-4xl font-bold">£{PRICES.starter.monthly}</span>
                  <span className="text-stone-500">/month</span>
                </>
              ) : (
                <>
                  <span className="text-4xl font-bold">£{PRICES.starter.yearly}</span>
                  <span className="text-stone-500">/year</span>
                  <span className="text-sm text-stone-500">
                    £{(PRICES.starter.yearly / 12).toFixed(2)}/month billed yearly
                  </span>
                </>
              )}
              <span className="text-sm font-medium text-emerald-600">7-day free trial</span>
            </div>
            <ul className="mt-6 space-y-3 text-stone-600">
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                50 quotes + 50 invoices/month
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
            <SubscribeButton
              plan="starter"
              interval={interval}
              className="mt-8 flex min-h-[48px] w-full items-center justify-center rounded-xl border-2 border-stone-300 py-3 text-center font-semibold text-stone-900 transition-colors hover:border-amber-500 hover:bg-amber-50 disabled:opacity-60"
            >
              Start 7-day free trial
            </SubscribeButton>
          </div>

          {/* Pro */}
          <div className="rounded-2xl border-2 border-amber-500 bg-amber-50/30 p-5 shadow-lg sm:p-8">
            <span className="rounded-full bg-amber-200 px-3 py-1 text-xs font-semibold text-amber-900">
              Most popular
            </span>
            <h2 className="mt-4 text-xl font-semibold">Pro</h2>
            <p className="mt-2 text-stone-600">
              For busy tradespeople. Unlimited quotes & invoices.
            </p>
            <div className="mt-6 flex flex-col gap-1">
              {interval === "monthly" ? (
                <>
                  <span className="text-4xl font-bold">£{PRICES.pro.monthly}</span>
                  <span className="text-stone-500">/month</span>
                </>
              ) : (
                <>
                  <span className="text-4xl font-bold">£{PRICES.pro.yearly}</span>
                  <span className="text-stone-500">/year</span>
                  <span className="text-sm text-stone-500">
                    £{(PRICES.pro.yearly / 12).toFixed(2)}/month billed yearly
                  </span>
                </>
              )}
              <span className="text-sm font-medium text-emerald-600">7-day free trial</span>
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
                Everything in Starter
              </li>
            </ul>
            <SubscribeButton
              plan="pro"
              interval={interval}
              className="mt-8 flex min-h-[48px] w-full items-center justify-center rounded-xl bg-amber-600 py-3 text-center font-semibold text-white transition-colors hover:bg-amber-700 disabled:opacity-60"
            >
              Start 7-day free trial
            </SubscribeButton>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-stone-500">
          Your card is authorised at sign-up. You won&apos;t be charged until after your 7-day trial.
          <br />
          Cancel anytime. UK-based support. See our{" "}
          <Link href="/terms" className="font-medium text-amber-600 hover:underline">
            Terms &amp; Conditions
          </Link>
          .
        </p>
      </section>
    </div>
  );
}

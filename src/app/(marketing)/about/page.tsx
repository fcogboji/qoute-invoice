import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About TradeInvoice",
  description:
    "Learn more about TradeInvoice and how we help UK tradespeople manage quotes and invoices easily.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-bold text-[#0F2544] md:text-4xl">
        About TradeInvoice
      </h1>
      <p className="mt-6 text-lg text-[#0F2544]/70">
        TradeInvoice is an online invoicing platform that helps UK tradespeople
        create professional quotes and invoices, manage clients and track
        payments. Built for electricians, plumbers, builders and contractors.
      </p>
      <p className="mt-4 text-[#0F2544]/70">
        We focus on simplicity: quote on site, convert to invoice in one tap,
        export PDF and get paid. UK VAT (20%) handled automatically. No
        spreadsheets. Works on your phone.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/pricing"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#0F2544] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1A3A6E]"
        >
          See pricing
        </Link>
        <Link
          href="/contact"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[#0F2544]/20 px-6 py-3 font-medium text-[#0F2544] transition-colors hover:bg-[#0F2544]/5"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}

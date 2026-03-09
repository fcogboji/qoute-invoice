import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Invoice Software for Plumbers",
  description:
    "TradeInvoice helps plumbers create invoices and track payments easily. UK tradespeople.",
};

export default function PlumbersPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-bold text-[#0F2544] md:text-4xl">
        Invoice Software for Plumbers
      </h1>

      <p className="mt-6 text-lg text-[#0F2544]/70">
        Plumbers use TradeInvoice to send professional invoices, manage
        clients and track payments in one place.
      </p>

      <p className="mt-4 text-[#0F2544]/70">
        Create quotes on site, convert to invoices when approved, export PDFs.
        UK VAT (20%) optional. Works on your phone.
      </p>

      <div className="mt-10">
        <Link
          href="/pricing"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#0F2544] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1A3A6E]"
        >
          Start free trial
        </Link>
      </div>
    </div>
  );
}

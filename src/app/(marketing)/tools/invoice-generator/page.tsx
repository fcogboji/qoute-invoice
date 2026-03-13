import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Invoice Generator",
  description:
    "Create professional invoices online with the free TradeInvoice invoice generator. UK tradespeople.",
};

export default function InvoiceGeneratorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-bold text-[#0F2544] md:text-4xl">
        Free Invoice Generator
      </h1>

      <p className="mt-4 text-lg text-[#0F2544]/70">
        Create professional invoices online using TradeInvoice. No sign-up
        required for this demo — start your free trial to create, save and
        track invoices.
      </p>

      <div className="mt-12 rounded-xl border border-[#0F2544]/10 bg-white p-6">
        <p className="text-sm text-[#0F2544]/70">
          To create full quotes and invoices with customer management, PDF
          export and payment tracking, start your free trial:
        </p>
        <Link
          href="/sign-up?redirect_url=%2Fpricing"
          className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#0F2544] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1A3A6E]"
        >
          Start 7-day free trial
        </Link>
      </div>

      <p className="mt-12 text-sm text-[#0F2544]/60">
        <Link href="/tools" className="hover:text-[#0F2544]">
          ← All tools
        </Link>
      </p>
    </div>
  );
}

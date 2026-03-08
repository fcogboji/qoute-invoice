import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recurring Invoices",
  description:
    "Set up recurring invoices for maintenance contracts with TradeInvoice. UK tradespeople.",
};

export default function RecurringInvoicesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-bold text-[#0F2544] md:text-4xl">
        Recurring Invoices
      </h1>

      <p className="mt-6 text-lg text-[#0F2544]/70">
        For maintenance contracts and repeat work, create invoices once and
        send them on schedule. TradeInvoice supports recurring invoicing for
        UK tradespeople.
      </p>

      <p className="mt-4 text-[#0F2544]/70">
        Manage your clients and their contracts in one place. Export PDFs,
        track payments, and get paid faster.
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

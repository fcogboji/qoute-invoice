import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Invoice Software for Small Business",
  description:
    "TradeInvoice helps small businesses create invoices and track payments. UK tradespeople.",
};

export default function SmallBusinessPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-bold text-[#0F2544] md:text-4xl">
        Invoice Software for Small Business
      </h1>

      <p className="mt-6 text-lg text-[#0F2544]/70">
        Small trade businesses — electricians, plumbers, builders —
        use TradeInvoice to create professional quotes and invoices,
        manage customers and get paid.
      </p>

      <p className="mt-4 text-[#0F2544]/70">
        No spreadsheets. UK VAT handled automatically. Export branded PDFs.
        Works on your phone and laptop.
      </p>

      <div className="mt-10">
        <Link
          href="/sign-up?redirect_url=%2Fpricing"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#0F2544] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1A3A6E]"
        >
          Start free trial
        </Link>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Invoice Generator",
  description:
    "Create professional invoices online with the TradeInvoice invoice generator. Built for UK tradespeople.",
};

export default function InvoiceGeneratorFeaturePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-bold text-[#0F2544] md:text-4xl">
        Invoice Generator
      </h1>

      <p className="mt-6 text-lg text-[#0F2544]/70">
        TradeInvoice allows UK tradespeople to create professional quotes
        and convert them to invoices quickly. Add line items for labour,
        materials and parts — get a total with optional 20% UK VAT.
      </p>

      <p className="mt-4 text-[#0F2544]/70">
        Export PDF invoices branded with your logo and colours. Send them
        directly to clients. No spreadsheets. Works on your phone.
      </p>

      <div className="mt-10 flex gap-4">
        <Link
          href="/tools/invoice-generator"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#0F2544] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1A3A6E]"
        >
          Try invoice generator
        </Link>
        <Link
          href="/features"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[#0F2544]/20 px-6 py-3 font-medium text-[#0F2544] transition-colors hover:bg-[#0F2544]/5"
        >
          All features
        </Link>
      </div>
    </div>
  );
}

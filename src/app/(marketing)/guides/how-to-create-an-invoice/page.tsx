import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Create an Invoice",
  description:
    "Step-by-step guide to creating professional invoices for your business. TradeInvoice UK.",
};

export default function HowToCreateInvoicePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-bold text-[#0F2544] md:text-4xl">
        How to Create an Invoice
      </h1>

      <p className="mt-6 text-lg text-[#0F2544]/70">
        Creating an invoice is simple with TradeInvoice. Follow these steps
        to send professional invoices to your clients.
      </p>

      <ol className="mt-8 space-y-4 text-[#0F2544]/80">
        <li className="flex gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0F2544]/10 text-sm font-bold text-[#0F2544]">
            1
          </span>
          <span>Create a quote with line items (labour, materials, parts).</span>
        </li>
        <li className="flex gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0F2544]/10 text-sm font-bold text-[#0F2544]">
            2
          </span>
          <span>Add optional UK VAT (20%) and any discount.</span>
        </li>
        <li className="flex gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0F2544]/10 text-sm font-bold text-[#0F2544]">
            3
          </span>
          <span>When the quote is approved, convert it to an invoice in one tap.</span>
        </li>
        <li className="flex gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0F2544]/10 text-sm font-bold text-[#0F2544]">
            4
          </span>
          <span>Export PDF and send to your client.</span>
        </li>
      </ol>

      <div className="mt-10">
        <Link
          href="/pricing"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#0F2544] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1A3A6E]"
        >
          Try TradeInvoice free
        </Link>
      </div>
    </div>
  );
}

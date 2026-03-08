import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Features",
  description:
    "TradeInvoice features: quote creation, invoice conversion, PDF export, UK VAT handling. Built for tradespeople.",
};

const features = [
  {
    title: "Quote Generator",
    href: "/features/invoice-generator",
    text: "Create professional quotes with line items. Labour, materials, parts — add and total in seconds.",
  },
  {
    title: "Recurring Invoices",
    href: "/features/recurring-invoices",
    text: "Set up regular invoices for maintenance contracts and repeat work.",
  },
  {
    title: "UK VAT",
    text: "20% VAT added automatically. Toggle on or off per quote or invoice.",
  },
  {
    title: "PDF Export",
    text: "Export quotes and invoices as PDF. Branded with your logo and colours.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-bold text-[#0F2544] md:text-4xl">
        Features
      </h1>
      <p className="mt-4 text-lg text-[#0F2544]/70">
        Everything you need to quote, invoice and get paid. Built for UK
        tradespeople.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-[#0F2544]/10 bg-white p-6"
          >
            <h2 className="text-lg font-semibold text-[#0F2544]">
              {f.href ? (
                <Link href={f.href} className="hover:text-[#00C6A2]">
                  {f.title}
                </Link>
              ) : (
                f.title
              )}
            </h2>
            <p className="mt-2 text-[#0F2544]/70">{f.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-12">
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

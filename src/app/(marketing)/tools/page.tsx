import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Business Tools",
  description:
    "Free invoice generator, VAT calculator and more. TradeInvoice tools for UK tradespeople.",
};

const tools = [
  {
    title: "Free Invoice Generator",
    href: "/tools/invoice-generator",
    text: "Create professional invoices online. No sign-up required.",
  },
  {
    title: "VAT Calculator",
    href: "/tools/vat-calculator",
    text: "Calculate UK VAT (20%) quickly. Add or extract VAT.",
  },
];

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-bold text-[#0F2544] md:text-4xl">
        Free Business Tools
      </h1>
      <p className="mt-4 text-lg text-[#0F2544]/70">
        Free tools for UK tradespeople. Create invoices, calculate VAT and more.
      </p>
      <ul className="mt-12 space-y-6">
        {tools.map((t) => (
          <li key={t.href}>
            <Link
              href={t.href}
              className="block rounded-xl border border-[#0F2544]/10 bg-white p-6 transition-colors hover:border-[#0F2544]/20 hover:bg-[#0F2544]/[0.02]"
            >
              <h2 className="text-lg font-semibold text-[#0F2544]">{t.title}</h2>
              <p className="mt-2 text-sm text-[#0F2544]/70">{t.text}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-12">
        <Link
          href="/sign-up?redirect_url=%2Fpricing"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#0F2544] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1A3A6E]"
        >
          Create full quotes and invoices
        </Link>
      </div>
    </div>
  );
}

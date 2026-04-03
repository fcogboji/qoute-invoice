import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About TradeInvoice",
  description:
    "TradeInvoice helps UK tradespeople create quotes and invoices online. Learn our mission, who we serve, and how we keep pricing simple.",
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
      <h2 className="mt-10 text-xl font-semibold text-[#0F2544]">Our mission</h2>
      <p className="mt-3 text-[#0F2544]/70">
        Small trade businesses lose time to paperwork and chasing payments. TradeInvoice exists to give you a single place for customers, quotes and invoices so you spend less time on admin and more time on paid work. We prioritise clear screens, fast loading on mobile networks, and documents that look professional when you send them to homeowners or commercial clients.
      </p>
      <h2 className="mt-8 text-xl font-semibold text-[#0F2544]">Built for the UK</h2>
      <p className="mt-3 text-[#0F2544]/70">
        Pricing, VAT defaults and language are aimed at UK sole traders and limited companies working in pounds. Subscription billing is handled securely; you choose a plan after your trial from our pricing page. We do not replace your accountant for tax or statutory accounts, but we help you issue consistent, legible invoices and quotes that support your cash flow.
      </p>
      <h2 className="mt-8 text-xl font-semibold text-[#0F2544]">What you can do</h2>
      <p className="mt-3 text-[#0F2544]/70">
        Store customer details, create quotes with multiple line items, mark quotes as accepted, convert them to invoices, mark invoices as paid, and export PDFs. You can brand documents with your logo and colour where your plan allows. Reports help you see revenue at a glance from the dashboard.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/sign-up?redirect_url=%2Fpricing"
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

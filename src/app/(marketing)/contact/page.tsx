import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact TradeInvoice",
  description:
    "Get in touch with TradeInvoice. We&apos;re here to help with your invoicing needs.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-bold text-[#0F2544] md:text-4xl">
        Contact TradeInvoice
      </h1>
      <p className="mt-6 text-lg text-[#0F2544]/70">
        Have a question about TradeInvoice? We&apos;re here to help.
      </p>
      <div className="mt-10 space-y-6">
        <div className="rounded-xl border border-[#0F2544]/10 bg-white p-6">
          <h2 className="font-semibold text-[#0F2544]">Support</h2>
          <p className="mt-2 text-sm text-[#0F2544]/70">
            For technical support or billing questions, email us at{" "}
            <a
              href="mailto:support@tradeinvoice.co.uk"
              className="text-[#00C6A2] underline hover:text-[#00A3FF]"
            >
              support@tradeinvoice.co.uk
            </a>
          </p>
        </div>
        <div className="rounded-xl border border-[#0F2544]/10 bg-white p-6">
          <h2 className="font-semibold text-[#0F2544]">Sales</h2>
          <p className="mt-2 text-sm text-[#0F2544]/70">
            For business inquiries, email us at{" "}
            <a
              href="mailto:hello@tradeinvoice.co.uk"
              className="text-[#00C6A2] underline hover:text-[#00A3FF]"
            >
              hello@tradeinvoice.co.uk
            </a>
          </p>
        </div>
      </div>
      <div className="mt-10">
        <Link
          href="/"
          className="text-sm font-medium text-[#0F2544]/70 hover:text-[#0F2544]"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { seoKeywords } from "@/lib/seoKeywords";

type Props = { params: Promise<{ slug: string }> };

function formatTitle(slug: string) {
  return slug.replace(/-/g, " ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = formatTitle(slug);

  return {
    title: `${title} | TradeInvoice`,
    description: `Learn about ${title} and create professional invoices using TradeInvoice. Built for UK tradespeople.`,
  };
}

export async function generateStaticParams() {
  return seoKeywords.map((keyword) => ({
    slug: keyword.replace(/\s+/g, "-").toLowerCase(),
  }));
}

export default async function SEOPage({ params }: Props) {
  const { slug } = await params;
  const title = formatTitle(slug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-bold capitalize text-[#0F2544] md:text-4xl">
        {title}
      </h1>

      <p className="mt-6 text-lg text-[#0F2544]/70">
        TradeInvoice helps UK tradespeople create professional quotes and
        invoices quickly and track payments online.
      </p>

      <p className="mt-4 text-[#0F2544]/70">
        If you are looking for {title}, TradeInvoice provides a simple and
        powerful solution. Built for electricians, plumbers, builders and
        contractors. UK VAT sorted. Works on your phone.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/pricing"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#0F2544] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1A3A6E]"
        >
          Start free trial
        </Link>
        <Link
          href="/tools/invoice-generator"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[#0F2544]/20 px-6 py-3 font-medium text-[#0F2544] transition-colors hover:bg-[#0F2544]/5"
        >
          Free invoice generator
        </Link>
      </div>

      <p className="mt-12 text-sm text-[#0F2544]/60">
        <Link href="/" className="hover:text-[#0F2544]">
          ← Back to TradeInvoice
        </Link>
      </p>
    </div>
  );
}

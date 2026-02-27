import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/auth";
import ConvertToInvoiceButton from "./convert-button";
import QuoteExportButtons from "./export-buttons";

type Item = { description: string; quantity: number; rate: number };

export default async function QuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getOrCreateUser();
  if (!user) return null;

  const quote = await prisma.quote.findFirst({
    where: { id, userId: user.id },
    include: { customer: true, invoices: { select: { id: true, number: true, createdAt: true } } },
  });

  if (!quote) notFound();

  const items = (quote.items as Item[]) || [];
  const latestInvoice =
    quote.invoices.length > 0
      ? [...quote.invoices].sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        )[0]
      : null;

  return (
    <div className="max-w-4xl">
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm">
        <Link href="/dashboard" className="text-stone-500 hover:text-stone-900">
          Dashboard
        </Link>
        <span className="text-stone-300">/</span>
        <Link href="/dashboard/quotes" className="text-stone-500 hover:text-stone-900">
          Quotes
        </Link>
        <span className="text-stone-300">/</span>
        <span className="font-medium text-stone-900">
          {quote.number ?? "Quote"}
        </span>
      </nav>

      {/* Document card */}
      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-lg">
        {/* Header */}
        <div className="border-b border-stone-200 bg-gradient-to-br from-amber-50 to-white px-4 py-4 sm:px-8 sm:py-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              {user.logoUrl && (
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user.logoUrl}
                    alt="Logo"
                    className="h-full w-full object-contain"
                  />
                </div>
              )}
              <div>
                {user.companyName && (
                  <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
                    {user.companyName}
                  </p>
                )}
                <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900">
                  Quote {quote.number && `#${quote.number}`}
                </h1>
                <p className="mt-1 text-sm text-stone-600">
                  {new Date(quote.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                {latestInvoice && (
                  <Link
                    href={`/dashboard/invoices/${latestInvoice.id}`}
                    className="mt-2 inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-700"
                  >
                    View invoice {latestInvoice.number && `#${latestInvoice.number}`} →
                  </Link>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:shrink-0">
              <QuoteExportButtons quoteId={quote.id} />
              {quote.invoices.length === 0 && (
                <ConvertToInvoiceButton quoteId={quote.id} />
              )}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-8">
          {/* Bill To */}
          <div className="mb-8 rounded-xl bg-stone-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Bill To
            </p>
            <p className="mt-1 text-lg font-semibold text-stone-900">
              {quote.customer.name}
            </p>
            {(quote.customer.email || quote.customer.phone) && (
              <div className="mt-2 space-y-0.5 text-sm text-stone-600">
                {quote.customer.email && <p>{quote.customer.email}</p>}
                {quote.customer.phone && <p>{quote.customer.phone}</p>}
                {quote.customer.address && (
                  <p className="text-stone-500">{quote.customer.address}</p>
                )}
              </div>
            )}
          </div>

          {/* Items table */}
          <div className="overflow-x-auto rounded-xl border border-stone-200 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-stone-300">
            <table className="w-full min-w-[360px]">
              <thead>
                <tr className="bg-green-700 text-left text-sm font-semibold text-white">
                  <th className="px-3 py-3 sm:px-5 sm:py-4">Description</th>
                  <th className="px-3 py-3 text-right sm:px-5 sm:py-4">Qty</th>
                  <th className="px-3 py-3 text-right sm:px-5 sm:py-4">Unit Price</th>
                  <th className="px-3 py-3 text-right sm:px-5 sm:py-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr
                    key={i}
                    className={`border-t border-stone-100 ${
                      i % 2 === 1 ? "bg-stone-50/50" : ""
                    }`}
                  >
                    <td className="px-3 py-3 font-medium text-stone-900 sm:px-5 sm:py-4">
                      {item.description || "—"}
                    </td>
                    <td className="px-3 py-3 text-right text-stone-600 sm:px-5 sm:py-4">
                      {item.quantity}
                    </td>
                    <td className="px-3 py-3 text-right text-stone-600 sm:px-5 sm:py-4">
                      £{Number(item.rate).toFixed(2)}
                    </td>
                    <td className="px-3 py-3 text-right font-medium text-stone-900 sm:px-5 sm:py-4">
                      £{((item.quantity || 0) * (item.rate || 0)).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="mt-6 flex justify-end">
            <div className="w-full max-w-xs space-y-2 rounded-xl border border-stone-200 bg-stone-50/50 p-5">
              <div className="flex justify-between text-sm text-stone-600">
                <span>Subtotal</span>
                <span>£{quote.amount.toFixed(2)}</span>
              </div>
              {(quote.discount ?? 0) > 0 && (
                <div className="flex justify-between text-sm text-stone-600">
                  <span>Discount</span>
                  <span>-£{(quote.discount ?? 0).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-stone-600">
                <span>VAT (20%)</span>
                <span>£{quote.vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-3 text-lg font-bold text-stone-900">
                <span>Total</span>
                <span className="bg-green-700 text-white p-2 rounded-sm">£{quote.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

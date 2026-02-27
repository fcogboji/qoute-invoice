import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/auth";
import MarkPaidButton from "./mark-paid-button";
import InvoiceExportButtons from "./export-buttons";

type Item = { description: string; quantity: number; rate: number };

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getOrCreateUser();
  if (!user) return null;

  const invoice = await prisma.invoice.findFirst({
    where: { id, userId: user.id },
    include: { customer: true, quote: true },
  });

  if (!invoice) notFound();

  const items = (invoice.items as Item[]) || [];

  return (
    <div className="max-w-4xl">
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm">
        <Link href="/dashboard" className="text-stone-500 hover:text-stone-900">
          Dashboard
        </Link>
        <span className="text-stone-300">/</span>
        <Link href="/dashboard/invoices" className="text-stone-500 hover:text-stone-900">
          Invoices
        </Link>
        <span className="text-stone-300">/</span>
        <span className="font-medium text-stone-900">
          {invoice.number ?? "Invoice"}
        </span>
      </nav>

      {/* Document card */}
      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-lg">
        {/* Header */}
        <div className="border-b border-stone-200 bg-gradient-to-br from-emerald-50 to-white px-4 py-4 sm:px-8 sm:py-6">
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
                  Invoice {invoice.number && `#${invoice.number}`}
                </h1>
                <p className="mt-1 text-sm text-stone-600">
                  {new Date(invoice.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <span
                  className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    invoice.paid
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {invoice.paid ? "Paid" : "Unpaid"}
                </span>
                {invoice.quoteId && (
                  <Link
                    href={`/dashboard/quotes/${invoice.quoteId}`}
                    className="mt-2 block text-sm font-medium text-amber-600 hover:text-amber-700"
                  >
                    View quote {invoice.quote?.number && `#${invoice.quote.number}`} →
                  </Link>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:shrink-0">
              <InvoiceExportButtons invoiceId={invoice.id} />
              {!invoice.paid && <MarkPaidButton invoiceId={invoice.id} />}
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
              {invoice.customer.name}
            </p>
            {(invoice.customer.email || invoice.customer.phone) && (
              <div className="mt-2 space-y-0.5 text-sm text-stone-600">
                {invoice.customer.email && <p>{invoice.customer.email}</p>}
                {invoice.customer.phone && <p>{invoice.customer.phone}</p>}
                {invoice.customer.address && (
                  <p className="text-stone-500">{invoice.customer.address}</p>
                )}
              </div>
            )}
          </div>

          {/* Items table */}
          <div className="overflow-x-auto rounded-xl border border-stone-200 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-stone-300">
            <table className="w-full min-w-[360px]">
              <thead>
                <tr className="bg-blue-700 text-left text-sm font-semibold text-white">
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
                <span>£{invoice.amount.toFixed(2)}</span>
              </div>
              {(invoice.discount ?? 0) > 0 && (
                <div className="flex justify-between text-sm text-stone-600">
                  <span>Discount</span>
                  <span>-£{(invoice.discount ?? 0).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-stone-600">
                <span>VAT (20%)</span>
                <span>£{invoice.vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-3 text-lg font-bold text-stone-900">
                <span>Total</span>
                <span
                  className={
                    invoice.paid ? "bg-blue-700 text-white p-2 rounded-sm" : "text-amber-700"
                  }
                >
                  £{invoice.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

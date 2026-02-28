import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/auth";
import BusinessCard from "./business-card";

export default async function DashboardPage() {
  const user = await getOrCreateUser();
  if (!user) return null;

  const [quotesCount, invoicesCount, paidRevenue, totalRevenue, recentQuotes, recentInvoices] =
    await Promise.all([
      prisma.quote.count({ where: { userId: user.id } }),
      prisma.invoice.count({ where: { userId: user.id } }),
      prisma.invoice.aggregate({
        where: { userId: user.id, paid: true },
        _sum: { total: true },
      }),
      prisma.invoice.aggregate({
        where: { userId: user.id },
        _sum: { total: true },
      }),
      prisma.quote.findMany({
        where: { userId: user.id },
        include: { customer: true },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.invoice.findMany({
        where: { userId: user.id },
        include: { customer: true },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  const paid = paidRevenue._sum.total ?? 0;
  const total = totalRevenue._sum.total ?? 0;
  const unpaid = total - paid;

  return (
    <div>
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">Dashboard</h1>
        <span className="rounded bg-stone-200 px-2 py-0.5 text-xs font-medium text-stone-600">
          UK
        </span>
      </div>
      <p className="mt-2 text-stone-600">
        Overview of your quotes and invoices.
      </p>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Total Quotes</p>
          <p className="mt-1 text-2xl font-bold text-stone-900">{quotesCount}</p>
          <Link href="/dashboard/quotes" className="mt-2 text-sm font-medium text-amber-600 hover:underline">
            View all →
          </Link>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Total Invoices</p>
          <p className="mt-1 text-2xl font-bold text-stone-900">{invoicesCount}</p>
          <Link href="/dashboard/invoices" className="mt-2 text-sm font-medium text-amber-600 hover:underline">
            View all →
          </Link>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Paid Revenue</p>
          <p className="mt-1 text-2xl font-bold text-emerald-700">£{paid.toFixed(2)}</p>
          <Link href="/dashboard/reports" className="mt-2 text-sm font-medium text-amber-600 hover:underline">
            Reports →
          </Link>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Outstanding</p>
          <p className="mt-1 text-2xl font-bold text-amber-700">£{unpaid.toFixed(2)}</p>
        </div>
      </div>

      {/* Business info */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-stone-900">Your business</h2>
        <p className="mt-1 text-sm text-stone-500">
          Company name, address and logo on quotes & invoices.
        </p>
        <div className="mt-4">
          <BusinessCard
            companyName={user.companyName}
            companyAddress={user.companyAddress}
            logoUrl={user.logoUrl}
          />
        </div>
      </div>

      {/* Primary actions */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link
          href="/dashboard/quotes/new"
          className="group flex min-h-[120px] flex-col rounded-2xl border-2 border-stone-200 bg-white p-5 shadow-sm transition-all hover:border-amber-300 hover:shadow-lg sm:p-8"
        >
          <span className="text-4xl font-bold text-amber-600">New Quote</span>
          <p className="mt-2 text-stone-600">
            Customer name + line items. Done.
          </p>
          <span className="mt-4 font-medium text-amber-600 group-hover:underline">
            Create quote →
          </span>
        </Link>

        <Link
          href="/dashboard/invoices/new"
          className="group flex min-h-[120px] flex-col rounded-2xl border-2 border-stone-200 bg-white p-5 shadow-sm transition-all hover:border-amber-300 hover:shadow-lg sm:p-8"
        >
          <span className="text-4xl font-bold text-amber-600">New Invoice</span>
          <p className="mt-2 text-stone-600">
            Or convert a quote to invoice.
          </p>
          <span className="mt-4 font-medium text-amber-600 group-hover:underline">
            Create invoice →
          </span>
        </Link>
      </div>

      {/* Recent activity */}
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-stone-900">Recent Quotes</h2>
            <Link href="/dashboard/quotes" className="text-sm font-medium text-amber-600 hover:underline">
              View all
            </Link>
          </div>
          {recentQuotes.length === 0 ? (
            <p className="mt-4 text-sm text-stone-500">No quotes yet</p>
          ) : (
            <ul className="mt-4 divide-y divide-stone-100">
              {recentQuotes.map((q) => (
                <li key={q.id} className="flex items-center justify-between py-3">
                  <Link
                    href={`/dashboard/quotes/${q.id}`}
                    className="font-medium text-stone-900 hover:text-amber-600"
                  >
                    {q.number ?? "Quote"} — {q.customer.name}
                  </Link>
                  <span className="text-sm font-medium text-stone-600">£{q.total.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-stone-900">Recent Invoices</h2>
            <Link href="/dashboard/invoices" className="text-sm font-medium text-amber-600 hover:underline">
              View all
            </Link>
          </div>
          {recentInvoices.length === 0 ? (
            <p className="mt-4 text-sm text-stone-500">No invoices yet</p>
          ) : (
            <ul className="mt-4 divide-y divide-stone-100">
              {recentInvoices.map((inv) => (
                <li key={inv.id} className="flex items-center justify-between py-3">
                  <Link
                    href={`/dashboard/invoices/${inv.id}`}
                    className="font-medium text-stone-900 hover:text-amber-600"
                  >
                    {inv.number ?? "Invoice"} — {inv.customer.name}
                  </Link>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-stone-600">£{inv.total.toFixed(2)}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        inv.paid ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {inv.paid ? "Paid" : "Unpaid"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
        <Link
          href="/dashboard/customers"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50 sm:py-2"
        >
          Customers
        </Link>
        <Link
          href="/dashboard/quotes"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50 sm:py-2"
        >
          Quotes
        </Link>
        <Link
          href="/dashboard/invoices"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50 sm:py-2"
        >
          Invoices
        </Link>
        <Link
          href="/dashboard/reports"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50 sm:py-2"
        >
          Reports
        </Link>
      </div>
    </div>
  );
}

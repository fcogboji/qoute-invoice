import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/auth";
import Link from "next/link";

export default async function ReportsPage() {
  const user = await getOrCreateUser();
  if (!user) return null;

  const [
    quotesCount,
    invoicesCount,
    paidInvoices,
    totalInvoices,
    invoicesByMonth,
    topCustomers,
  ] = await Promise.all([
    prisma.quote.count({ where: { userId: user.id } }),
    prisma.invoice.count({ where: { userId: user.id } }),
    prisma.invoice.aggregate({
      where: { userId: user.id, paid: true },
      _sum: { total: true },
      _count: true,
    }),
    prisma.invoice.aggregate({
      where: { userId: user.id },
      _sum: { total: true },
      _count: true,
    }),
    prisma.invoice.groupBy({
      by: ["createdAt"],
      where: {
        userId: user.id,
        createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth() - 5) },
      },
      _sum: { total: true },
    }),
    prisma.invoice.groupBy({
      by: ["customerId"],
      where: { userId: user.id },
      _sum: { total: true },
      orderBy: { _sum: { total: "desc" } },
    }),
  ]);

  const paidRevenue = paidInvoices._sum.total ?? 0;
  const totalRevenue = totalInvoices._sum.total ?? 0;
  const unpaidRevenue = totalRevenue - paidRevenue;
  const paidCount = paidInvoices._count;
  const unpaidCount = totalInvoices._count - paidCount;

  const customerIds = topCustomers.map((c) => c.customerId);
  const customers = await prisma.customer.findMany({
    where: { id: { in: customerIds } },
  });
  const customerMap = Object.fromEntries(customers.map((c) => [c.id, c.name]));
  const topCustomersWithNames = topCustomers
    .slice(0, 10)
    .map((c) => ({ name: customerMap[c.customerId] ?? "Unknown", total: c._sum.total ?? 0 }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">Reports</h1>
      <p className="mt-2 text-stone-600">
        Overview of your revenue and performance.
      </p>

      {/* Summary cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Total Revenue</p>
          <p className="mt-1 text-2xl font-bold text-stone-900">£{totalRevenue.toFixed(2)}</p>
          <p className="mt-1 text-sm text-stone-500">{invoicesCount} invoices</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Paid</p>
          <p className="mt-1 text-2xl font-bold text-emerald-700">£{paidRevenue.toFixed(2)}</p>
          <p className="mt-1 text-sm text-stone-500">{paidCount} paid invoices</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Outstanding</p>
          <p className="mt-1 text-2xl font-bold text-amber-700">£{unpaidRevenue.toFixed(2)}</p>
          <p className="mt-1 text-sm text-stone-500">{unpaidCount} unpaid invoices</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Quotes</p>
          <p className="mt-1 text-2xl font-bold text-stone-900">{quotesCount}</p>
          <Link href="/dashboard/quotes" className="mt-2 text-sm font-medium text-amber-600 hover:underline">
            View quotes
          </Link>
        </div>
      </div>

      {/* Top customers */}
      <div className="mt-10 rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold text-stone-900">Top customers by revenue</h2>
        {topCustomersWithNames.length === 0 ? (
          <p className="mt-4 text-sm text-stone-500">No invoice data yet</p>
        ) : (
          <ul className="mt-4 divide-y divide-stone-100">
            {topCustomersWithNames.map((c, i) => (
              <li key={i} className="flex items-center justify-between py-3">
                <span className="font-medium text-stone-900">{c.name}</span>
                <span className="text-sm font-medium text-stone-600">£{c.total.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quick links */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/dashboard/invoices"
          className="flex min-h-[44px] items-center justify-center rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
        >
          View invoices
        </Link>
        <Link
          href="/dashboard/quotes"
          className="flex min-h-[44px] items-center justify-center rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
        >
          View quotes
        </Link>
      </div>
    </div>
  );
}

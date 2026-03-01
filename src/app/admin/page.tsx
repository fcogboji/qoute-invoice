import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const usersCount = await prisma.user.count();
  const quotesCount = await prisma.quote.count();
  const invoicesCount = await prisma.invoice.count();
  const totalRevenue = await prisma.invoice.aggregate({ _sum: { total: true } });
  const paidRevenue = await prisma.invoice.aggregate({
    where: { paid: true },
    _sum: { total: true },
  });
  const recentUsers = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    include: { _count: { select: { quotes: true, invoices: true } } },
  });

  const total = totalRevenue._sum.total ?? 0;
  const paid = paidRevenue._sum.total ?? 0;

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">Platform Overview</h1>
      <p className="mt-2 text-stone-600">Monitor users and activity across tradeinvoice.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Users</p>
          <p className="mt-1 text-2xl font-bold text-stone-900">{usersCount}</p>
          <Link href="/admin/users" className="mt-2 text-sm font-medium text-amber-600 hover:underline">View all</Link>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Quotes</p>
          <p className="mt-1 text-2xl font-bold text-stone-900">{quotesCount}</p>
          <Link href="/admin/quotes" className="mt-2 text-sm font-medium text-amber-600 hover:underline">View all</Link>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Invoices</p>
          <p className="mt-1 text-2xl font-bold text-stone-900">{invoicesCount}</p>
          <Link href="/admin/invoices" className="mt-2 text-sm font-medium text-amber-600 hover:underline">View all</Link>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Total Revenue</p>
          <p className="mt-1 text-2xl font-bold text-emerald-700">£{total.toFixed(2)}</p>
          <p className="mt-1 text-xs text-stone-500">£{paid.toFixed(2)} paid</p>
        </div>
      </div>
      <Link
        href="/admin/analytics"
        className="mt-8 inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm transition-colors hover:bg-stone-50"
      >
        View Analytics →
      </Link>
      <div className="mt-10 rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold text-stone-900">Recent Users</h2>
        <Link href="/admin/users" className="mt-2 block text-sm font-medium text-amber-600 hover:underline">View all</Link>
        {recentUsers.length === 0 ? (
          <p className="mt-4 text-sm text-stone-500">No users yet</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[400px]">
              <thead>
                <tr className="border-b border-stone-200 text-left text-sm font-semibold text-stone-700">
                  <th className="pb-3 pr-4">Email</th>
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 pr-4">Quotes</th>
                  <th className="pb-3">Invoices</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((u) => (
                  <tr key={u.id} className="border-b border-stone-100 hover:bg-stone-50">
                    <td className="py-3 pr-4">
                      <Link href={"/admin/users/" + u.id} className="font-medium text-stone-900 hover:text-amber-600">{u.email}</Link>
                    </td>
                    <td className="py-3 pr-4 text-stone-600">{u.name ?? "-"}</td>
                    <td className="py-3 pr-4 text-stone-600">{u._count.quotes}</td>
                    <td className="py-3 text-stone-600">{u._count.invoices}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

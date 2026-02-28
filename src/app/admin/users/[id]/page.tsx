import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      _count: { select: { quotes: true, invoices: true, customers: true } },
    },
  });

  if (!user) notFound();

  const [recentQuotes, recentInvoices, revenue] = await Promise.all([
    prisma.quote.findMany({
      where: { userId: id },
      include: { customer: true },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    prisma.invoice.findMany({
      where: { userId: id },
      include: { customer: true },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    prisma.invoice.aggregate({
      where: { userId: id },
      _sum: { total: true },
    }),
  ]);

  const totalRevenue = revenue._sum.total ?? 0;

  return (
    <div>
      <Link href="/admin/users" className="text-sm font-medium text-stone-500 hover:text-stone-900">
        ← Back to users
      </Link>

      <div className="mt-6 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-stone-900">{user.email}</h1>
        <p className="mt-1 text-stone-600">{user.name ?? "—"}</p>
        {user.companyName && (
          <p className="mt-1 text-sm font-medium text-stone-700">{user.companyName}</p>
        )}
        {user.companyAddress && (
          <p className="mt-1 text-sm text-stone-600 whitespace-pre-line">{user.companyAddress}</p>
        )}
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-stone-500">
          <span>Joined {new Date(user.createdAt).toLocaleDateString("en-GB")}</span>
          <span>{user._count.customers} customers</span>
          <span>{user._count.quotes} quotes</span>
          <span>{user._count.invoices} invoices</span>
          <span className="font-medium text-emerald-700">£{totalRevenue.toFixed(2)} total revenue</span>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-stone-900">Recent Quotes</h2>
          {recentQuotes.length === 0 ? (
            <p className="mt-4 text-sm text-stone-500">No quotes</p>
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
                  <span className="text-sm text-stone-600">£{q.total.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-stone-900">Recent Invoices</h2>
          {recentInvoices.length === 0 ? (
            <p className="mt-4 text-sm text-stone-500">No invoices</p>
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
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-stone-600">£{inv.total.toFixed(2)}</span>
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
    </div>
  );
}

import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminQuotesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string }>;
}) {
  const { search, status } = await searchParams;
  const searchTerm = search?.trim() ?? "";
  const statusFilter = status ?? "";

  const where: Record<string, unknown> = {};
  if (statusFilter) where.status = statusFilter;
  if (searchTerm) {
    where.OR = [
      { number: { contains: searchTerm, mode: "insensitive" } },
      { customer: { name: { contains: searchTerm, mode: "insensitive" } } },
      { user: { email: { contains: searchTerm, mode: "insensitive" } } },
    ];
  }

  const quotes = await prisma.quote.findMany({
    where,
    include: { customer: true, user: { select: { email: true } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">All Quotes</h1>
      <p className="mt-2 text-stone-600">Quotes across the platform.</p>
      <form action="/admin/quotes" method="get" className="mt-6 mb-6 flex flex-wrap gap-2">
        <input
          type="search"
          name="search"
          placeholder="Search..."
          defaultValue={searchTerm}
          className="min-h-[44px] flex-1 min-w-[200px] rounded-lg border border-stone-300 px-4 py-2 text-stone-900"
        />
        <select name="status" defaultValue={statusFilter} className="min-h-[44px] rounded-lg border border-stone-300 px-4 py-2">
          <option value="">All statuses</option>
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
        </select>
        <button type="submit" className="min-h-[44px] rounded-lg bg-stone-800 px-4 py-2 font-medium text-white">
          Filter
        </button>
      </form>
      <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900">Number</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900">Customer</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900">User</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900">Total</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900">Status</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-stone-900">Date</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((q) => (
              <tr key={q.id} className="border-b border-stone-100 hover:bg-stone-50">
                <td className="px-4 py-3">
                  <Link href={"/dashboard/quotes/" + q.id} className="font-medium text-stone-900 hover:text-amber-600">{q.number ?? "-"}</Link>
                </td>
                <td className="px-4 py-3 text-stone-600">{q.customer.name}</td>
                <td className="px-4 py-3 text-stone-600">
                  <Link href={"/admin/users/" + q.userId} className="text-amber-600 hover:underline">{q.user.email}</Link>
                </td>
                <td className="px-4 py-3 font-medium">£{q.total.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${q.status === "sent" ? "bg-amber-100 text-amber-800" : "bg-stone-100 text-stone-700"}`}>{q.status}</span>
                </td>
                <td className="px-4 py-3 text-right text-sm text-stone-500">{new Date(q.createdAt).toLocaleDateString("en-GB")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {quotes.length === 0 && <div className="mt-8 rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 p-12 text-center"><p className="text-stone-600">No quotes yet.</p></div>}
    </div>
  );
}

import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminInvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; paid?: string }>;
}) {
  const { search, paid } = await searchParams;
  const searchTerm = search?.trim() ?? "";
  const paidFilter = paid ?? "";

  const where = {
    ...(paidFilter === "yes" ? { paid: true } : paidFilter === "no" ? { paid: false } : {}),
    ...(searchTerm
      ? {
          OR: [
            { number: { contains: searchTerm, mode: "insensitive" as const } },
            { customer: { name: { contains: searchTerm, mode: "insensitive" as const } } },
            { user: { email: { contains: searchTerm, mode: "insensitive" as const } } },
          ],
        }
      : {}),
  };

  const invoices = await prisma.invoice.findMany({
    where,
    include: { customer: true, user: { select: { email: true, name: true } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">All Invoices</h1>
      <p className="mt-2 text-stone-600">Invoices across the platform.</p>

      <form action="/admin/invoices" method="get" className="mt-6 mb-6 flex flex-wrap gap-2">
        <input
          type="search"
          name="search"
          placeholder="Search by number, customer or user..."
          defaultValue={searchTerm}
          className="min-h-[44px] flex-1 min-w-[200px] rounded-lg border border-stone-300 px-4 py-2 text-stone-900 placeholder:text-stone-500"
        />
        <select name="paid" defaultValue={paidFilter} className="min-h-[44px] rounded-lg border border-stone-300 px-4 py-2 text-stone-900">
          <option value="">All</option>
          <option value="yes">Paid</option>
          <option value="no">Unpaid</option>
        </select>
        <button type="submit" className="min-h-[44px] rounded-lg bg-stone-800 px-4 py-2 font-medium text-white hover:bg-stone-900">
          Filter
        </button>
      </form>

      <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">Number</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">Customer</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">User</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">Total</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">Status</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b border-stone-100 hover:bg-stone-50">
                <td className="px-4 py-3 sm:px-6 sm:py-4">
                  <Link href={"/dashboard/invoices/" + inv.id} className="font-medium text-stone-900 hover:text-amber-600">{inv.number ?? "—"}</Link>
                </td>
                <td className="px-4 py-3 text-stone-600 sm:px-6 sm:py-4">{inv.customer.name}</td>
                <td className="px-4 py-3 text-stone-600 sm:px-6 sm:py-4">
                  <Link href={"/admin/users/" + inv.userId} className="text-amber-600 hover:underline">{inv.user.email}</Link>
                </td>
                <td className="px-4 py-3 font-medium sm:px-6 sm:py-4">£{inv.total.toFixed(2)}</td>
                <td className="px-4 py-3 sm:px-6 sm:py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${inv.paid ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                    {inv.paid ? "Paid" : "Unpaid"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-sm text-stone-500 sm:px-6 sm:py-4">{new Date(inv.createdAt).toLocaleDateString("en-GB")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {invoices.length === 0 && (
        <div className="mt-8 rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 p-12 text-center">
          <p className="text-stone-600">No invoices yet.</p>
        </div>
      )}
    </div>
  );
}

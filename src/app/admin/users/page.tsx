import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;
  const searchTerm = search?.trim() ?? "";

  const where = searchTerm
    ? {
        OR: [
          { email: { contains: searchTerm, mode: "insensitive" as const } },
          { name: { contains: searchTerm, mode: "insensitive" as const } },
          { companyName: { contains: searchTerm, mode: "insensitive" as const } },
        ],
      }
    : {};

  const users = await prisma.user.findMany({
    where,
    include: { _count: { select: { quotes: true, invoices: true, customers: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">Users</h1>
      <p className="mt-2 text-stone-600">All signed-up tradespeople on the platform.</p>

      <form action="/admin/users" method="get" className="mt-6 mb-6 flex gap-2">
        <input
          type="search"
          name="search"
          placeholder="Search by email, name or company..."
          defaultValue={searchTerm}
          className="min-h-[44px] flex-1 min-w-[200px] rounded-lg border border-stone-300 px-4 py-2 text-stone-900 placeholder:text-stone-500"
        />
        <button type="submit" className="min-h-[44px] rounded-lg bg-stone-800 px-4 py-2 font-medium text-white hover:bg-stone-900">
          Search
        </button>
      </form>

      <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">Company</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">Customers</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">Quotes</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">Invoices</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-stone-100 hover:bg-stone-50">
                <td className="px-4 py-3 sm:px-6 sm:py-4">
                  <Link href={"/admin/users/" + u.id} className="font-medium text-stone-900 hover:text-amber-600">{u.email}</Link>
                </td>
                <td className="px-4 py-3 text-stone-600 sm:px-6 sm:py-4">{u.name ?? "—"}</td>
                <td className="px-4 py-3 text-stone-600 sm:px-6 sm:py-4">{u.companyName ?? "—"}</td>
                <td className="px-4 py-3 text-stone-600 sm:px-6 sm:py-4">{u._count.customers}</td>
                <td className="px-4 py-3 text-stone-600 sm:px-6 sm:py-4">{u._count.quotes}</td>
                <td className="px-4 py-3 text-stone-600 sm:px-6 sm:py-4">{u._count.invoices}</td>
                <td className="px-4 py-3 text-right text-sm text-stone-500 sm:px-6 sm:py-4">{new Date(u.createdAt).toLocaleDateString("en-GB")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="mt-8 rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 p-12 text-center">
          <p className="text-stone-600">{searchTerm ? "No users match your search." : "No users yet."}</p>
        </div>
      )}
    </div>
  );
}

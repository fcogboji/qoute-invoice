import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/auth";
import CustomersTable from "./customers-table";

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const user = await getOrCreateUser();
  if (!user) return null;

  const { search } = await searchParams;
  const searchTerm = search?.trim() || "";

  const where = {
    userId: user.id,
    ...(searchTerm
      ? {
          OR: [
            { name: { contains: searchTerm, mode: "insensitive" as const } },
            { email: { contains: searchTerm, mode: "insensitive" as const } },
            { phone: { contains: searchTerm, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const customers = await prisma.customer.findMany({
    where,
    include: {
      _count: { select: { quotes: true, invoices: true } },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">Customers</h1>
        <Link
          href="/dashboard/customers/new"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg bg-amber-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-amber-700"
        >
          Add Customer
        </Link>
      </div>
      <p className="mt-2 text-stone-600">
        Manage your customers. Add name, email, phone and address.
      </p>

      <CustomersTable customers={customers} searchTerm={searchTerm} />
    </div>
  );
}

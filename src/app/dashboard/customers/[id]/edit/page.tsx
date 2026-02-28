import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/auth";
import CustomerEditForm from "./customer-edit-form";

export default async function EditCustomerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getOrCreateUser();
  if (!user) return null;

  const { id } = await params;

  const customer = await prisma.customer.findFirst({
    where: { id, userId: user.id },
    include: { _count: { select: { quotes: true, invoices: true } } },
  });

  if (!customer) notFound();

  return (
    <div className="max-w-2xl">
      <Link
        href="/dashboard/customers"
        className="text-sm font-medium text-stone-500 hover:text-stone-900"
      >
        ← Back to customers
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-stone-900">Edit Customer</h1>
      <p className="mt-1 text-sm text-stone-600">
        {customer.name} — {customer._count.quotes} quotes, {customer._count.invoices} invoices
      </p>

      <CustomerEditForm
        id={customer.id}
        name={customer.name}
        email={customer.email ?? ""}
        phone={customer.phone ?? ""}
        address={customer.address ?? ""}
      />
    </div>
  );
}

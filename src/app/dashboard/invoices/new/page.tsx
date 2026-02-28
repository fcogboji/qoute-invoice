import Link from "next/link";
import NewInvoiceForm from "./new-invoice-form";

export default async function NewInvoicePage({
  searchParams,
}: {
  searchParams: Promise<{ customer?: string }>;
}) {
  const { customer } = await searchParams;

  return (
    <div className="max-w-2xl">
      <Link
        href="/dashboard/invoices"
        className="text-sm font-medium text-stone-500 hover:text-stone-900"
      >
        ← Back to invoices
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-stone-900">New Invoice</h1>
      <p className="mt-1 text-sm text-stone-600">
        Customer + items. UK VAT added automatically.
      </p>

      <NewInvoiceForm initialCustomer={customer ?? undefined} />
    </div>
  );
}

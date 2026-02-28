import Link from "next/link";
import NewQuoteForm from "./new-quote-form";

export default async function NewQuotePage({
  searchParams,
}: {
  searchParams: Promise<{ customer?: string }>;
}) {
  const { customer } = await searchParams;

  return (
    <div className="max-w-2xl">
      <Link
        href="/dashboard/quotes"
        className="text-sm font-medium text-stone-500 hover:text-stone-900"
      >
        ← Back to quotes
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-stone-900">New Quote</h1>
      <p className="mt-1 text-sm text-stone-600">
        Customer + items. UK VAT added automatically.
      </p>

      <NewQuoteForm initialCustomer={customer ?? undefined} />
    </div>
  );
}

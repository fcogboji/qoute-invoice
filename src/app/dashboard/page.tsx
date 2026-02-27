import Link from "next/link";
import { getOrCreateUser } from "@/lib/auth";
import BusinessCard from "./business-card";

export default async function DashboardPage() {
  const user = await getOrCreateUser();
  if (!user) return null;

  return (
    <div>
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold text-stone-900">Dashboard</h1>
        <span className="rounded bg-stone-200 px-2 py-0.5 text-xs font-medium text-stone-600">
          UK
        </span>
      </div>
      <p className="mt-2 text-stone-600">
        Create quotes and invoices. Quick and simple.
      </p>

      <div className="mt-6">
        <BusinessCard
            companyName={user.companyName}
          companyAddress={user.companyAddress}
          logoUrl={user.logoUrl}
        />
      </div>

      {/* Primary actions */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <Link
          href="/dashboard/quotes/new"
          className="group flex flex-col rounded-2xl border-2 border-stone-200 bg-white p-8 shadow-sm transition-all hover:border-amber-300 hover:shadow-lg"
        >
          <span className="text-4xl font-bold text-amber-600">New Quote</span>
          <p className="mt-2 text-stone-600">
            Customer name + line items. Done.
          </p>
          <span className="mt-4 font-medium text-amber-600 group-hover:underline">
            Create quote →
          </span>
        </Link>

        <Link
          href="/dashboard/invoices/new"
          className="group flex flex-col rounded-2xl border-2 border-stone-200 bg-white p-8 shadow-sm transition-all hover:border-amber-300 hover:shadow-lg"
        >
          <span className="text-4xl font-bold text-amber-600">New Invoice</span>
          <p className="mt-2 text-stone-600">
            Or convert a quote to invoice.
          </p>
          <span className="mt-4 font-medium text-amber-600 group-hover:underline">
            Create invoice →
          </span>
        </Link>
      </div>

      {/* Quick links */}
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/dashboard/quotes"
          className="rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
        >
          View quotes
        </Link>
        <Link
          href="/dashboard/invoices"
          className="rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
        >
          View invoices
        </Link>
      </div>
    </div>
  );
}

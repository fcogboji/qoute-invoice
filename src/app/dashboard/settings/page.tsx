import Link from "next/link";
import { getOrCreateUser } from "@/lib/auth";
import BusinessCard from "../business-card";

export default async function SettingsPage() {
  const user = await getOrCreateUser();
  if (!user) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">Settings</h1>
      <p className="mt-2 text-stone-600">
        Manage your account and business details.
      </p>

      {/* Profile */}
      <div className="mt-10 rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold text-stone-900">Profile</h2>
        <p className="mt-1 text-sm text-stone-500">
          Manage your name and email via the account button in the header.
        </p>
        <p className="mt-4 text-sm font-medium text-stone-700">{user.name ?? "—"}</p>
        <p className="text-sm text-stone-600">{user.email}</p>
      </div>

      {/* Business details */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-stone-900">Your business</h2>
        <p className="mt-1 text-sm text-stone-500">
          Company name, address and logo appear on all quotes and invoices.
        </p>
        <div className="mt-4">
          <BusinessCard
            companyName={user.companyName}
            companyAddress={user.companyAddress}
            logoUrl={user.logoUrl}
            brandColor={user.brandColor}
          />
        </div>
      </div>

      {/* Preferences (placeholder) */}
      <div className="mt-10 rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold text-stone-900">Preferences</h2>
        <p className="mt-1 text-sm text-stone-500">
          UK VAT (20%), £ currency and UK date format are set by default for tradespeople.
        </p>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/dashboard"
          className="flex min-h-[44px] items-center justify-center rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

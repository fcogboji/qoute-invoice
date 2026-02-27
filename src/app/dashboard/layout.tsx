import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-bold text-stone-900">TradesQuote</span>
            <span className="rounded bg-stone-200 px-2 py-0.5 text-xs font-medium text-stone-600">
              UK
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-stone-600 hover:text-stone-900"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/quotes"
              className="text-stone-600 hover:text-stone-900"
            >
              Quotes
            </Link>
            <Link
              href="/dashboard/invoices"
              className="text-stone-600 hover:text-stone-900"
            >
              Invoices
            </Link>
            <Link
              href="/dashboard/settings"
              className="text-stone-600 hover:text-stone-900"
            >
              Settings
            </Link>
            <UserButton afterSignOutUrl="/" />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}

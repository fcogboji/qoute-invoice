import Link from "next/link";
import { redirect } from "next/navigation";
import { getOrCreateUser } from "@/lib/auth";
import { isPlatformAdmin } from "@/lib/admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getOrCreateUser();
  if (!user) redirect("/sign-in");

  if (!(await isPlatformAdmin())) {
    redirect("/dashboard");
  }

  const navLinks = [
    { href: "/admin", label: "Overview" },
    { href: "/admin/analytics", label: "Analytics" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/quotes", label: "Quotes" },
    { href: "/admin/invoices", label: "Invoices" },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-stone-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-lg font-bold text-white">Admin</span>
            <span className="rounded bg-amber-600 px-2 py-0.5 text-xs font-medium text-white">
              tradeinvoice
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-stone-300 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className="rounded-lg border border-stone-500 px-3 py-1.5 text-sm font-medium text-stone-300 hover:bg-stone-800 hover:text-white transition-colors"
            >
              Back to App
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
    </div>
  );
}

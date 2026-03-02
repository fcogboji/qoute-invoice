"use client";

import Link from "next/link";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Logo } from "./logo";

const links: { href: string; label: string }[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/customers", label: "Customers" },
  { href: "/dashboard/quotes", label: "Quotes" },
  { href: "/dashboard/invoices", label: "Invoices" },
  { href: "/dashboard/reports", label: "Reports" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function DashboardHeader({ showAdmin = false }: { showAdmin?: boolean }) {
  const navLinks = showAdmin ? [...links, { href: "/admin", label: "Admin" }] : links;
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-[#0F2544]/10 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Logo variant="compact" href="/" />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="min-h-[44px] py-2 text-[#0F2544]/70 hover:text-[#0F2544] transition-colors"
            >
              {label}
            </Link>
          ))}
          <UserButton afterSignOutUrl="/" />
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-[#0F2544]/70 hover:bg-[#0F2544]/5 md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-[#0F2544]/10 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="min-h-[44px] py-3 text-[#0F2544]/70 hover:text-[#0F2544] transition-colors"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="flex min-h-[44px] items-center border-t border-[#0F2544]/10 pt-3">
              <UserButton afterSignOutUrl="/" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

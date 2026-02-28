"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Customer = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  _count: { quotes: number; invoices: number };
};

export default function CustomersTable({
  customers,
  searchTerm = "",
}: {
  customers: Customer[];
  searchTerm?: string;
}) {
  const router = useRouter();
  const [search, setSearch] = useState(searchTerm);
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    router.push("/dashboard/customers" + (params.toString() ? "?" + params : ""));
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm('Delete customer "' + name + '"? This cannot be undone.')) return;
    setDeleting(id);
    try {
      const res = await fetch("/api/customers/" + id, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to delete");
        return;
      }
      router.refresh();
    } finally {
      setDeleting(null);
    }
  };

  if (customers.length === 0) {
    return (
      <div className="mt-8">
        <form onSubmit={handleSearch} className="mb-6 flex gap-2">
          <input
            type="search"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-h-[44px] flex-1 rounded-lg border border-stone-300 px-4 py-2 text-stone-900 placeholder:text-stone-500"
          />
          <button
            type="submit"
            className="min-h-[44px] rounded-lg bg-stone-800 px-4 py-2 font-medium text-white hover:bg-stone-900"
          >
            Search
          </button>
        </form>
        <div className="rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 p-12 text-center">
          <p className="text-stone-600">
            {searchTerm ? "No customers match your search." : "No customers yet."}
          </p>
          <Link
            href="/dashboard/customers/new"
            className="mt-4 inline-block font-medium text-amber-600 hover:underline"
          >
            Add your first customer
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="search"
          placeholder="Search by name, email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="min-h-[44px] flex-1 rounded-lg border border-stone-300 px-4 py-2 text-stone-900 placeholder:text-stone-500"
        />
        <button
          type="submit"
          className="min-h-[44px] rounded-lg bg-stone-800 px-4 py-2 font-medium text-white hover:bg-stone-900"
        >
          Search
        </button>
      </form>

      <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">Phone</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">Quotes / Invoices</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b border-stone-100 hover:bg-stone-50">
                <td className="px-4 py-3 sm:px-6 sm:py-4">
                  <Link
                    href={"/dashboard/customers/" + c.id + "/edit"}
                    className="font-medium text-stone-900 hover:text-amber-600"
                  >
                    {c.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm text-stone-600 sm:px-6 sm:py-4">{c.email ?? "—"}</td>
                <td className="px-4 py-3 text-sm text-stone-600 sm:px-6 sm:py-4">{c.phone ?? "—"}</td>
                <td className="px-4 py-3 text-sm text-stone-600 sm:px-6 sm:py-4">
                  {c._count.quotes} / {c._count.invoices}
                </td>
                <td className="px-4 py-3 text-right sm:px-6 sm:py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={"/dashboard/quotes/new?customer=" + encodeURIComponent(c.name)}
                      className="text-sm font-medium text-amber-600 hover:underline"
                    >
                      Quote
                    </Link>
                    <span className="text-stone-300">|</span>
                    <Link
                      href={"/dashboard/invoices/new?customer=" + encodeURIComponent(c.name)}
                      className="text-sm font-medium text-amber-600 hover:underline"
                    >
                      Invoice
                    </Link>
                    {c._count.quotes === 0 && c._count.invoices === 0 && (
                      <>
                        <span className="text-stone-300">|</span>
                        <button
                          type="button"
                          onClick={() => handleDelete(c.id, c.name)}
                          disabled={deleting === c.id}
                          className="text-sm font-medium text-red-600 hover:underline disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

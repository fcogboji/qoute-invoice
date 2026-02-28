"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function InvoicesSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [paid, setPaid] = useState(searchParams.get("paid") ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (paid === "yes") params.set("paid", "yes");
    if (paid === "no") params.set("paid", "no");
    router.push("/dashboard/invoices" + (params.toString() ? "?" + params : ""));
  };

  const handleClear = () => {
    setSearch("");
    setPaid("");
    router.push("/dashboard/invoices");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-2">
      <input
        type="search"
        placeholder="Search by number or customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="min-h-[44px] flex-1 min-w-[200px] rounded-lg border border-stone-300 px-4 py-2 text-stone-900 placeholder:text-stone-500"
      />
      <select
        value={paid}
        onChange={(e) => setPaid(e.target.value)}
        className="min-h-[44px] rounded-lg border border-stone-300 px-4 py-2 text-stone-900"
      >
        <option value="">All</option>
        <option value="yes">Paid</option>
        <option value="no">Unpaid</option>
      </select>
      <button type="submit" className="min-h-[44px] rounded-lg bg-stone-800 px-4 py-2 font-medium text-white hover:bg-stone-900">
        Filter
      </button>
      {(search || paid) && (
        <button type="button" onClick={handleClear} className="min-h-[44px] rounded-lg border border-stone-300 px-4 py-2 font-medium text-stone-700 hover:bg-stone-50">
          Clear
        </button>
      )}
    </form>
  );
}

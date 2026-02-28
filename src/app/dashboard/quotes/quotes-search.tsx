"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function QuotesSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [status, setStatus] = useState(searchParams.get("status") ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (status) params.set("status", status);
    router.push("/dashboard/quotes" + (params.toString() ? "?" + params : ""));
  };

  const handleClear = () => {
    setSearch("");
    setStatus("");
    router.push("/dashboard/quotes");
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
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="min-h-[44px] rounded-lg border border-stone-300 px-4 py-2 text-stone-900"
      >
        <option value="">All statuses</option>
        <option value="draft">Draft</option>
        <option value="sent">Sent</option>
      </select>
      <button type="submit" className="min-h-[44px] rounded-lg bg-stone-800 px-4 py-2 font-medium text-white hover:bg-stone-900">
        Filter
      </button>
      {(search || status) && (
        <button type="button" onClick={handleClear} className="min-h-[44px] rounded-lg border border-stone-300 px-4 py-2 font-medium text-stone-700 hover:bg-stone-50">
          Clear
        </button>
      )}
    </form>
  );
}

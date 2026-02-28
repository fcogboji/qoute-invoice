"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewCustomerPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim() || undefined,
          phone: phone.trim() || undefined,
          address: address.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (data.id) router.push("/dashboard/customers");
      else throw new Error(data.error || "Failed");
    } catch {
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <Link
        href="/dashboard/customers"
        className="text-sm font-medium text-stone-500 hover:text-stone-900"
      >
        ← Back to customers
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-stone-900">Add Customer</h1>
      <p className="mt-1 text-sm text-stone-600">
        Add a new customer to your list.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="rounded-xl border border-stone-200 bg-white p-5">
          <input
            required
            placeholder="Customer name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-lg text-stone-900 placeholder:text-stone-600 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
          <input
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-3 w-full rounded-lg border border-stone-300 px-4 py-2 text-stone-900 placeholder:text-stone-600 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
          <input
            placeholder="Phone (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-3 w-full rounded-lg border border-stone-300 px-4 py-2 text-stone-900 placeholder:text-stone-600 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
          <textarea
            placeholder="Address (optional)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            className="mt-3 w-full rounded-lg border border-stone-300 px-4 py-2 text-stone-900 placeholder:text-stone-600 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={loading}
            className="min-h-[44px] flex-1 rounded-xl bg-amber-600 px-8 py-3 font-semibold text-white hover:bg-amber-700 disabled:opacity-60 sm:flex-none"
          >
            {loading ? "Saving…" : "Save Customer"}
          </button>
          <Link
            href="/dashboard/customers"
            className="flex min-h-[44px] flex-1 items-center justify-center rounded-xl border border-stone-300 px-6 py-3 font-medium text-stone-700 hover:bg-stone-50 sm:flex-none"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

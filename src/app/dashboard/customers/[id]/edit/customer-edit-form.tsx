"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CustomerEditForm({
  id,
  name: initialName,
  email: initialEmail,
  phone: initialPhone,
  address: initialAddress,
}: {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);
  const [address, setAddress] = useState(initialAddress);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/customers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim() || undefined,
          phone: phone.trim() || undefined,
          address: address.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed");
      }
      router.push("/dashboard/customers");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
          {loading ? "Saving…" : "Save Changes"}
        </button>
        <Link
          href="/dashboard/customers"
          className="flex min-h-[44px] flex-1 items-center justify-center rounded-xl border border-stone-300 px-6 py-3 font-medium text-stone-700 hover:bg-stone-50 sm:flex-none"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

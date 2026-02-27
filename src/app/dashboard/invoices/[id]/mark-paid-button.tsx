"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MarkPaidButton({ invoiceId }: { invoiceId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleMarkPaid = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/invoices/${invoiceId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paid: true }),
      });
      if (res.ok) router.refresh();
      else throw new Error("Failed");
    } catch {
      alert("Failed to mark as paid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleMarkPaid}
      disabled={loading}
      className="rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-60"
    >
      {loading ? "Updating…" : "Mark as Paid"}
    </button>
  );
}

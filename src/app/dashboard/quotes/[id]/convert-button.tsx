"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ConvertToInvoiceButton({ quoteId }: { quoteId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/invoices/from-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quoteId }),
      });
      const data = await res.json();
      if (data.id) router.push(`/dashboard/invoices/${data.id}`);
      else throw new Error(data.error || "Failed");
    } catch {
      alert("Failed to convert to invoice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleConvert}
      disabled={loading}
      className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg bg-amber-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-amber-700 disabled:opacity-60"
    >
      {loading ? "Converting…" : "Convert to Invoice"}
    </button>
  );
}

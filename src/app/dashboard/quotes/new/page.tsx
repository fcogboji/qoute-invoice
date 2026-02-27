"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type LineItem = { description: string; quantity: number; rate: number };

const TRADE_QUICK_ADD: LineItem[] = [
  { description: "Labour", quantity: 1, rate: 0 },
  { description: "Materials", quantity: 1, rate: 0 },
  { description: "Parts", quantity: 1, rate: 0 },
  { description: "Call-out", quantity: 1, rate: 0 },
];

export default function NewQuotePage() {
  const router = useRouter();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [items, setItems] = useState<LineItem[]>([
    { description: "Labour", quantity: 1, rate: 0 },
    { description: "Materials", quantity: 1, rate: 0 },
  ]);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  const addLine = () => {
    setItems((p) => [...p, { description: "", quantity: 1, rate: 0 }]);
  };

  const addQuickItem = (template: LineItem) => {
    setItems((p) => [...p, { ...template }]);
  };

  const updateLine = (i: number, field: keyof LineItem, value: string | number) => {
    setItems((p) => {
      const next = [...p];
      next[i] = { ...next[i], [field]: value };
      return next;
    });
  };

  const removeLine = (i: number) => {
    if (items.length > 1) setItems((p) => p.filter((_, idx) => idx !== i));
  };

  const subtotal = items.reduce((s, i) => s + i.quantity * i.rate, 0);
  const afterDiscount = Math.max(0, subtotal - discount);
  const vat = afterDiscount * 0.2;
  const total = afterDiscount + vat;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { name: customerName.trim(), phone: customerPhone || undefined },
          items,
          amount: subtotal,
          discount,
          vat,
          total,
        }),
      });
      const data = await res.json();
      if (data.id) router.push(`/dashboard/quotes/${data.id}`);
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
        href="/dashboard/quotes"
        className="text-sm font-medium text-stone-500 hover:text-stone-900"
      >
        ← Back to quotes
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-stone-900">New Quote</h1>
      <p className="mt-1 text-sm text-stone-600">
        Customer + items. UK VAT added automatically.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Customer — minimal */}
        <div className="rounded-xl border border-stone-200 bg-white p-5">
          <p className="text-sm font-semibold text-stone-700">Customer</p>
          <input
            required
            placeholder="Customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="mt-3 w-full rounded-lg border border-stone-300 px-4 py-2.5 text-lg focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
          <input
            placeholder="Phone (optional)"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className="mt-2 w-full rounded-lg border border-stone-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
        </div>

        {/* Items with quick-add */}
        <div className="rounded-xl border border-stone-200 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-stone-700">Items</p>
            <div className="flex flex-wrap gap-2">
              {TRADE_QUICK_ADD.map((t) => (
                <button
                  key={t.description}
                  type="button"
                  onClick={() => addQuickItem(t)}
                  className="min-h-[44px] min-w-[44px] rounded-lg bg-stone-100 px-3 py-2 text-sm font-medium text-stone-700 hover:bg-amber-100 hover:text-amber-800"
                >
                  + {t.description}
                </button>
              ))}
              <button
                type="button"
                onClick={addLine}
                className="min-h-[44px] min-w-[44px] rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-white hover:bg-amber-700"
              >
                + Custom
              </button>
            </div>
          </div>
          <div className="mt-4 space-y-2 overflow-x-auto -mx-1 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-stone-300">
            {items.map((item, i) => (
              <div key={i} className="grid min-w-[480px] grid-cols-12 items-center gap-2">
                <input
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => updateLine(i, "description", e.target.value)}
                  className="col-span-5 min-h-[44px] rounded-lg border border-stone-300 px-3 py-2.5 text-base sm:py-2 sm:text-sm"
                />
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={item.quantity || ""}
                  onChange={(e) => updateLine(i, "quantity", Number(e.target.value) || 0)}
                  className="col-span-2 min-h-[44px] rounded-lg border border-stone-300 px-3 py-2.5 text-right text-base sm:py-2 sm:text-sm"
                />
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  placeholder="£"
                  value={item.rate || ""}
                  onChange={(e) => updateLine(i, "rate", Number(e.target.value) || 0)}
                  className="col-span-2 min-h-[44px] rounded-lg border border-stone-300 px-3 py-2.5 text-right text-base sm:py-2 sm:text-sm"
                />
                <span className="col-span-2 flex min-h-[44px] items-center justify-end text-right text-sm font-medium">
                  £{((item.quantity || 0) * (item.rate || 0)).toFixed(2)}
                </span>
                <button
                  type="button"
                  onClick={() => removeLine(i)}
                  className="col-span-1 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-stone-400 hover:bg-stone-100 hover:text-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-1 border-t border-stone-200 pt-4">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Discount (£)</span>
              <input
                type="number"
                min={0}
                step={0.01}
                value={discount || ""}
                onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                className="min-h-[44px] w-24 rounded-lg border border-stone-300 px-3 py-2 text-right text-sm"
              />
            </div>
            <div className="flex justify-between text-sm">
              <span>VAT (20%)</span>
              <span>£{vat.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-stone-900">
              <span>Total</span>
              <span className="text-amber-600">£{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={loading}
            className="min-h-[44px] flex-1 rounded-xl bg-amber-600 px-8 py-3 font-semibold text-white hover:bg-amber-700 disabled:opacity-60 sm:flex-none"
          >
            {loading ? "Creating…" : "Create quote"}
          </button>
          <Link
            href="/dashboard/quotes"
            className="flex min-h-[44px] flex-1 items-center justify-center rounded-xl border border-stone-300 px-6 py-3 font-medium text-stone-700 hover:bg-stone-50 sm:flex-none"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

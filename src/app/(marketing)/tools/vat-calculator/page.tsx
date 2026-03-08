"use client";

import { useState } from "react";
import Link from "next/link";

export default function VATCalculatorPage() {
  const [price, setPrice] = useState<number>(100);
  const [mode, setMode] = useState<"add" | "extract">("add");

  const vatAmount =
    mode === "add" ? price * 0.2 : price - price / 1.2;
  const total = mode === "add" ? price + vatAmount : price;

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-bold text-[#0F2544] md:text-4xl">
        VAT Calculator
      </h1>

      <p className="mt-4 text-[#0F2544]/70">
        Calculate UK VAT (20%) quickly. Add VAT to a net amount or extract VAT
        from a gross amount.
      </p>

      <div className="mt-8 space-y-6 rounded-xl border border-[#0F2544]/10 bg-white p-6">
        <div>
          <label className="block text-sm font-medium text-[#0F2544]">
            Mode
          </label>
          <div className="mt-2 flex gap-4">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="mode"
                checked={mode === "add"}
                onChange={() => setMode("add")}
                className="h-4 w-4 text-[#0F2544]"
              />
              Add VAT (net → gross)
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="mode"
                checked={mode === "extract"}
                onChange={() => setMode("extract")}
                className="h-4 w-4 text-[#0F2544]"
              />
              Extract VAT (gross → net)
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0F2544]">
            {mode === "add" ? "Net amount (£)" : "Gross amount (£)"}
          </label>
          <input
            type="number"
            min={0}
            step={0.01}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-[#0F2544]/20 px-4 py-3 text-lg text-[#0F2544] focus:border-[#0F2544] focus:outline-none focus:ring-2 focus:ring-[#0F2544]/20"
          />
        </div>

        <div className="space-y-2 border-t border-[#0F2544]/10 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-[#0F2544]/70">VAT (20%)</span>
            <span className="font-semibold">£{vatAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#0F2544]/70">
              {mode === "add" ? "Gross total" : "Net amount"}
            </span>
            <span className="font-semibold">£{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Link
          href="/pricing"
          className="text-sm font-medium text-[#0F2544]/70 hover:text-[#0F2544]"
        >
          Create quotes and invoices with VAT →
        </Link>
      </div>

      <p className="mt-12 text-sm text-[#0F2544]/60">
        <Link href="/tools" className="hover:text-[#0F2544]">
          ← All tools
        </Link>
      </p>
    </div>
  );
}

"use client";

import { useState } from "react";

export default function BusinessCard({
  companyName: initialCompanyName,
  companyAddress: initialCompanyAddress,
  logoUrl: initialLogoUrl,
}: {
  companyName: string | null;
  companyAddress: string | null;
  logoUrl: string | null;
}) {
  const [companyName, setCompanyName] = useState(initialCompanyName ?? "");
  const [companyAddress, setCompanyAddress] = useState(initialCompanyAddress ?? "");
  const [logoUrl, setLogoUrl] = useState(initialLogoUrl ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: companyName.trim() || null,
          companyAddress: companyAddress.trim() || null,
          logoUrl: logoUrl.trim() || null,
        }),
      });
      if (res.ok) setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-stone-900">
        Your business
      </h2>
      <p className="mt-1 text-sm text-stone-500">
        Company name, address and logo on your quotes & invoices. Optional —
        add when ready.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label
            htmlFor="companyName"
            className="block text-sm font-medium text-stone-700"
          >
            Company name
          </label>
          <input
            id="companyName"
            type="text"
            placeholder="e.g. Smith Plumbing"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mt-1 min-h-[44px] w-full rounded-lg border border-stone-300 px-3 py-2.5 text-base text-stone-900 placeholder:text-stone-600 sm:py-2 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="companyAddress"
            className="block text-sm font-medium text-stone-700"
          >
            Company address
          </label>
          <textarea
            id="companyAddress"
            rows={2}
            placeholder="123 High Street, London, SW1A 1AA"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
            className="mt-1 min-h-[80px] w-full rounded-lg border border-stone-300 px-3 py-2.5 text-base text-stone-900 placeholder:text-stone-600 sm:min-h-[60px] sm:py-2 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="logoUrl"
            className="block text-sm font-medium text-stone-700"
          >
            Logo image URL
          </label>
          <input
            id="logoUrl"
            type="url"
            placeholder="https://yoursite.com/logo.png"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            className="mt-1 min-h-[44px] w-full rounded-lg border border-stone-300 px-3 py-2.5 text-base text-stone-900 placeholder:text-stone-600 sm:py-2 sm:text-sm"
          />
          <p className="mt-1 text-xs text-stone-500">
            Paste a direct link to your logo (PNG or JPG). Host it on your
            website or use a free host like Imgur.
          </p>
        </div>
        {logoUrl && (
          <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
            <p className="mb-2 text-xs text-stone-500">Preview</p>
            <img
              src={logoUrl}
              alt="Logo preview"
              className="h-12 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}
        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={saving}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-700 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          {saved && (
            <span className="text-sm text-emerald-600">Saved.</span>
          )}
        </div>
      </form>
    </div>
  );
}

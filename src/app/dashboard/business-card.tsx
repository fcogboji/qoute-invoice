"use client";

import { useRef, useState } from "react";

const ACCEPTED_IMAGE_TYPES = "image/png,image/jpeg,image/jpg,image/webp";
const MAX_LOGO_SIZE_BYTES = 500 * 1024; // 500KB

export default function BusinessCard({
  companyName: initialCompanyName,
  companyAddress: initialCompanyAddress,
  logoUrl: initialLogoUrl,
  brandColor: initialBrandColor,
}: {
  companyName: string | null;
  companyAddress: string | null;
  logoUrl: string | null;
  brandColor?: string | null;
}) {
  const [companyName, setCompanyName] = useState(initialCompanyName ?? "");
  const [companyAddress, setCompanyAddress] = useState(initialCompanyAddress ?? "");
  const [logoUrl, setLogoUrl] = useState(initialLogoUrl ?? "");
  const [brandColor, setBrandColor] = useState(initialBrandColor ?? "#0F2544");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [logoError, setLogoError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setLogoError(null);
    if (!file) return;
    if (!file.type.match(/^image\/(png|jpeg|jpg|webp)$/)) {
      setLogoError("Please use PNG, JPG or WebP images only.");
      return;
    }
    if (file.size > MAX_LOGO_SIZE_BYTES) {
      setLogoError("Logo must be under 500KB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (result.startsWith("data:image/")) setLogoUrl(result);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const removeLogo = () => {
    setLogoUrl("");
  };

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
          brandColor: brandColor || null,
        }),
      });
      if (res.ok) setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-stone-900">Your business</h2>
      <p className="mt-1 text-sm text-stone-500">
        Company name, address, logo and brand colour appear on your quotes and invoices.
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
          <label className="block text-sm font-medium text-stone-700">
            Logo
          </label>
          <p className="mt-0.5 text-xs text-stone-500 mb-2">
            PNG, JPG or WebP. Max 500KB.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_IMAGE_TYPES}
            onChange={handleLogoChange}
            className="sr-only"
          />
          {!logoUrl ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex min-h-[80px] w-full items-center justify-center rounded-lg border-2 border-dashed border-stone-300 bg-stone-50/50 text-sm font-medium text-stone-600 hover:border-[#0F2544]/40 hover:bg-stone-50 hover:text-[#0F2544] transition-colors"
            >
              Choose logo image
            </button>
          ) : null}
          {logoError && (
            <p className="mt-1 text-sm text-red-600">{logoError}</p>
          )}
        </div>
        {logoUrl && (
          <div className="flex items-center gap-3 rounded-lg border border-stone-200 bg-stone-50 p-3">
            <img
              src={logoUrl}
              alt="Logo preview"
              className="h-12 w-auto max-w-[120px] object-contain"
              onError={() => setLogoUrl("")}
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-sm font-medium text-[#0F2544] hover:text-[#1A3A6E]"
              >
                Change
              </button>
              <span className="text-stone-300">|</span>
              <button
                type="button"
                onClick={removeLogo}
                className="text-sm font-medium text-stone-600 hover:text-stone-900"
              >
                Remove
              </button>
            </div>
          </div>
        )}
        <div>
          <h3 className="text-base font-semibold text-stone-900">
            Choose your colour
          </h3>
          <p className="mt-1 text-sm text-stone-500 mb-4">
            Personalise your invoices and quotes with a splash of colour
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-4 gap-3 mb-3">
            {[
              "#0F2544",
              "#0d9488",
              "#a855f7",
              "#06b6d4",
              "#22c55e",
              "#fb7185",
              "#eab308",
              "#ef4444",
            ].map((hex) => (
              <button
                key={hex}
                type="button"
                onClick={() => setBrandColor(hex)}
                className={`h-12 w-12 rounded-xl transition-all shadow-sm hover:scale-105 ${
                  brandColor === hex
                    ? "ring-2 ring-offset-2 ring-[#0F2544]"
                    : "hover:ring-2 hover:ring-stone-300"
                }`}
                style={{ backgroundColor: hex }}
                aria-label={`Choose ${hex}`}
                title={hex}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={brandColor}
              onChange={(e) => setBrandColor(e.target.value)}
              className="h-9 w-11 cursor-pointer rounded-lg border border-stone-300 bg-transparent p-1"
            />
            <input
              type="text"
              value={brandColor}
              onChange={(e) => {
                const v = e.target.value;
                if (v === "" || /^#[0-9A-Fa-f]{0,6}$/.test(v) || /^[0-9A-Fa-f]{0,6}$/.test(v)) {
                  setBrandColor(v.startsWith("#") ? v : v ? `#${v}` : "#0F2544");
                }
              }}
              placeholder="#2563EB"
              className="min-h-[36px] w-24 rounded-lg border border-stone-300 px-2 py-1.5 text-sm font-mono text-stone-900"
            />
            <span className="text-xs text-stone-500">or enter hex</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={saving}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg bg-[#0F2544] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1A3A6E] disabled:opacity-50"
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

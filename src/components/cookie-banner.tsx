"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "tradeinvoice_cookie_banner_last_shown_at";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setVisible(true);
        return;
      }
      const last = new Date(raw).getTime();
      const now = Date.now();
      if (Number.isNaN(last) || now - last > ONE_DAY_MS) {
        setVisible(true);
      }
    } catch {
      // If localStorage is not available, just show the banner
      setVisible(true);
    }
  }, []);

  const acknowledge = () => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(STORAGE_KEY, new Date().toISOString());
      } catch {
        // ignore write errors
      }
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 sm:px-6 sm:pb-6 pointer-events-none">
      <div className="pointer-events-auto max-w-3xl rounded-2xl border border-[#0F2544]/10 bg-white/95 px-4 py-3 shadow-lg backdrop-blur sm:px-6 sm:py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#0F2544]/80">
            We use essential cookies to keep tradeinvoice secure and to understand how the app is used.{" "}
            <Link href="/cookies" className="font-medium text-[#0F2544] underline-offset-2 hover:underline">
              Read our cookie policy
            </Link>
            .
          </p>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={acknowledge}
              className="inline-flex items-center justify-center rounded-full bg-[#0F2544] px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#1A3A6E] transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


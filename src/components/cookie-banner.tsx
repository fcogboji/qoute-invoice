"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const STORAGE_KEY = "tradeinvoice_cookie_banner_last_shown_at";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

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
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(STORAGE_KEY, new Date().toISOString());
      } catch {
        // ignore
      }
    }
    setVisible(false);
  };

  const manageCookies = () => {
    dismiss();
    router.push("/cookies");
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 sm:px-6 sm:pb-6 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-3xl rounded-t-2xl border border-b-0 border-[#0F2544]/10 bg-white shadow-[0_-4px_20px_rgba(15,37,68,0.08)]">
        <div className="px-5 py-5 sm:px-6 sm:py-5">
          <h3 className="text-base font-semibold text-[#0F2544] mb-1.5">
            We value your privacy
          </h3>
          <p className="text-sm text-[#0F2544]/80 leading-relaxed mb-4">
            We use cookies to improve your experience on our website, to keep you signed in, and to analyse our web traffic.{" "}
            <Link href="/cookies" className="font-medium text-[#00A3FF] hover:text-[#00C6A2] transition-colors underline underline-offset-2">
              Read our Cookie Policy to learn more
            </Link>
            .
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={manageCookies}
              className="inline-flex items-center justify-center rounded-full border-2 border-[#0F2544]/30 bg-white px-5 py-2 text-sm font-semibold text-[#0F2544] hover:border-[#0F2544]/50 hover:bg-[#0F2544]/5 transition-colors"
            >
              Manage cookies
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex items-center justify-center rounded-full bg-[#0F2544] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1A3A6E] transition-colors"
            >
              Reject all cookies
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex items-center justify-center rounded-full bg-[#0F2544] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1A3A6E] transition-colors"
            >
              Accept all cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


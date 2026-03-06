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
    <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-0 sm:px-6 sm:pb-6 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-3xl rounded-t-2xl border border-b-0 border-[#0F2544]/10 bg-white shadow-[0_-4px_20px_rgba(15,37,68,0.08)] sm:mx-4 sm:rounded-2xl sm:border sm:border-[#0F2544]/10">
        <div className="px-4 py-4 sm:px-6 sm:py-5 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <h3 className="text-base sm:text-lg font-semibold text-[#0F2544] mb-1.5">
            We value your privacy
          </h3>
          <p className="text-sm text-[#0F2544]/80 leading-relaxed mb-4 min-w-0">
            We use cookies to improve your experience on our website, to keep you signed in, and to analyse our web traffic.{" "}
            <Link href="/cookies" className="font-medium text-[#00A3FF] hover:text-[#00C6A2] transition-colors underline underline-offset-2 break-words">
              Read our Cookie Policy to learn more
            </Link>
            .
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
            <button
              type="button"
              onClick={manageCookies}
              className="min-h-[44px] w-full sm:w-auto inline-flex items-center justify-center rounded-full border-2 border-[#0F2544]/30 bg-white px-5 py-2.5 text-sm font-semibold text-[#0F2544] hover:border-[#0F2544]/50 hover:bg-[#0F2544]/5 active:bg-[#0F2544]/10 transition-colors touch-manipulation"
            >
              Manage cookies
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="min-h-[44px] w-full sm:w-auto sm:flex-1 sm:min-w-0 inline-flex items-center justify-center rounded-full bg-[#0F2544] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1A3A6E] active:bg-[#1A3A6E]/90 transition-colors touch-manipulation"
            >
              Reject all cookies
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="min-h-[44px] w-full sm:w-auto sm:flex-1 sm:min-w-0 inline-flex items-center justify-center rounded-full bg-[#0F2544] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1A3A6E] active:bg-[#1A3A6E]/90 transition-colors touch-manipulation"
            >
              Accept all cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


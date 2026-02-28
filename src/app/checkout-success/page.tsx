"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"checking" | "success" | "timeout">("checking");

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 30;
    const intervalMs = 2000;

    const check = async () => {
      try {
        if (sessionId && attempts === 0) {
          const verifyRes = await fetch("/api/checkout/verify-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session_id: sessionId }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.hasSubscription) {
            setStatus("success");
            return;
          }
        }

        const res = await fetch("/api/subscription-status");
        const data = await res.json();
        if (data.hasSubscription) {
          setStatus("success");
          return;
        }
      } catch {
        // continue polling
      }
      attempts++;
      if (attempts >= maxAttempts) {
        setStatus("timeout");
        return;
      }
      setTimeout(check, intervalMs);
    };

    check();
  }, [sessionId]);

  useEffect(() => {
    if (status !== "success") return;
    const t = setTimeout(() => {
      window.location.href = "/dashboard?success=1";
    }, 2500);
    return () => clearTimeout(t);
  }, [status]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-4">
      <div className="max-w-md text-center">
        {status === "checking" && (
          <div className="transition-opacity duration-300">
            <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-stone-200 border-t-amber-600" />
            <h1 className="text-xl font-bold text-stone-900">Activating your subscription</h1>
            <p className="mt-3 text-stone-600">
              Please wait a moment while we set up your account. You&apos;ll be redirected to your
              dashboard shortly.
            </p>
          </div>
        )}
        {status === "success" && (
          <div className="animate-fade-in">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <svg
                className="h-8 w-8 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-stone-900">You&apos;re all set!</h1>
            <p className="mt-3 text-stone-600">
              Your subscription is now active. Taking you to your dashboard…
            </p>
            <div className="mt-6 flex justify-center gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-amber-500 [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-amber-500 [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-amber-500 [animation-delay:300ms]" />
            </div>
          </div>
        )}
        {status === "timeout" && (
          <div className="transition-opacity duration-300">
            <h1 className="text-xl font-bold text-stone-900">Taking longer than usual</h1>
            <p className="mt-3 text-stone-600">
              Your subscription may still be activating.{" "}
              <Link href="/dashboard" className="font-medium text-amber-600 hover:underline">
                Try opening your dashboard
              </Link>
              . If you still see the pricing page, please wait a minute and try again or contact
              support.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function CheckoutSuccessFallback() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-4">
      <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-stone-200 border-t-amber-600" />
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<CheckoutSuccessFallback />}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}

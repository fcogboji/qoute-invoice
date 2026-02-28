"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

type Props = {
  plan: "starter" | "pro";
  interval: "monthly" | "yearly";
  children: React.ReactNode;
  className?: string;
};

export function SubscribeButton({ plan, interval, children, className }: Props) {
  const { isSignedIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!isSignedIn) {
      window.location.href = "/sign-up?redirect_url=" + encodeURIComponent("/pricing");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, interval }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={className}
    >
      {loading ? "Loading…" : children}
    </button>
  );
}

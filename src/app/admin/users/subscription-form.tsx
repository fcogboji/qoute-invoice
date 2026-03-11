"use client";

import { useState } from "react";

type Props = {
  userId: string;
  hasSubscription: boolean;
  onGrant: (userId: string, plan: "starter" | "pro", durationMonths: number) => Promise<void>;
  onRemove: (userId: string) => Promise<void>;
};

export function SubscriptionForm({ userId, hasSubscription, onGrant, onRemove }: Props) {
  const [plan, setPlan] = useState<"starter" | "pro">("pro");
  const [duration, setDuration] = useState(12);
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-3">
      {hasSubscription && (
        <button
          type="button"
          onClick={async () => {
            if (!confirm("Remove subscription? User will lose access to dashboard.")) return;
            setLoading(true);
            await onRemove(userId);
            setLoading(false);
          }}
          disabled={loading}
          className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
        >
          Remove subscription
        </button>
      )}
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-stone-500">Plan</span>
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value as "starter" | "pro")}
            className="rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900"
          >
            <option value="starter">Starter</option>
            <option value="pro">Pro</option>
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-stone-500">Duration</span>
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900"
          >
            <option value={1}>1 month</option>
            <option value={3}>3 months</option>
            <option value={12}>1 year</option>
          </select>
        </label>
        <button
          type="button"
          onClick={async () => {
            if (!confirm(`Grant ${plan} for ${duration === 12 ? "1 year" : `${duration} months`}?`)) return;
            setLoading(true);
            await onGrant(userId, plan, duration);
            setLoading(false);
          }}
          disabled={loading}
          className="rounded-lg bg-stone-800 px-4 py-2 text-sm font-medium text-white hover:bg-stone-900 disabled:opacity-50"
        >
          Grant subscription
        </button>
      </div>
    </div>
  );
}

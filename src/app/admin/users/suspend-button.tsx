"use client";

type Props = {
  userId: string;
  suspended: boolean;
  onSuspend: (userId: string) => Promise<void>;
  onUnsuspend: (userId: string) => Promise<void>;
};

export function SuspendButton({ userId, suspended, onSuspend, onUnsuspend }: Props) {
  return (
    <button
      type="button"
      onClick={async () => {
        if (!confirm(suspended ? "Unsuspend this user?" : "Suspend this user? They will lose dashboard access."))
          return;
        if (suspended) await onUnsuspend(userId);
        else await onSuspend(userId);
      }}
      className={`rounded-lg border px-3 py-1.5 text-sm font-medium ${
        suspended
          ? "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          : "border-amber-200 text-amber-700 hover:bg-amber-50"
      }`}
    >
      {suspended ? "Unsuspend" : "Suspend"}
    </button>
  );
}

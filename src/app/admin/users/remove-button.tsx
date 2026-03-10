"use client";

type Props = {
  userId: string;
  onRemove: (userId: string) => Promise<void>;
};

export function RemoveButton({ userId, onRemove }: Props) {
  return (
    <button
      type="button"
      onClick={async () => {
        if (
          !confirm(
            "Remove this user? They will be banned from signing in and all their data will be deleted. This cannot be undone."
          )
        )
          return;
        await onRemove(userId);
      }}
      className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50"
    >
      Remove
    </button>
  );
}

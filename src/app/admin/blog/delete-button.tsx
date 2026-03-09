"use client";

export function DeleteButton() {
  return (
    <button
      type="submit"
      className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50"
      onClick={(e) => {
        if (!confirm("Delete this post?")) e.preventDefault();
      }}
    >
      Delete
    </button>
  );
}

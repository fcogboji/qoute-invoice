"use client";

export default function QuoteExportButtons({ quoteId }: { quoteId: string }) {
  const handleExport = async () => {
    const res = await fetch(`/api/quotes/${quoteId}/export`);
    if (!res.ok) return;
    const blob = await res.blob();
    const disposition = res.headers.get("Content-Disposition");
    const match = disposition?.match(/filename="(.+)"/);
    const filename = match?.[1] ?? `quote-${quoteId}.pdf`;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
    >
      Export PDF
    </button>
  );
}

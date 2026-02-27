"use client";

export default function ExportPdfButton({ invoiceId }: { invoiceId: string }) {
  const handleExport = async () => {
    const res = await fetch(`/api/invoices/${invoiceId}/export`);
    if (!res.ok) return;
    const blob = await res.blob();
    const disposition = res.headers.get("Content-Disposition");
    const match = disposition?.match(/filename="(.+)"/);
    const filename = match?.[1] ?? `invoice-${invoiceId}.pdf`;
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
      className="text-sm font-medium text-amber-600 hover:text-amber-700 hover:underline"
    >
      Export PDF
    </button>
  );
}

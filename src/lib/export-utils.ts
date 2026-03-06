import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

type LineItem = { description: string; quantity: number; rate: number };

type ExportDoc = {
  type: "quote" | "invoice";
  companyName?: string | null;
  companyAddress?: string | null;
  number?: string | null;
  customer: { name: string; email?: string | null; phone?: string | null; address?: string | null };
  items: LineItem[];
  amount: number;
  discount?: number;
  vat: number;
  total: number;
  createdAt: Date;
  reference?: string | null;
  status?: string;
  paid?: boolean;
  logoBase64?: string | null;
  logoFormat?: "PNG" | "JPEG";
  brandColor?: string | null; // hex e.g. #2563EB
};

function hexToRgb(hex: string): [number, number, number] {
  const m = hex.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return [15, 37, 68]; // default navy
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

export function generatePDF(doc: ExportDoc): Buffer {
  const pdf = new jsPDF();
  const typeLabel = doc.type === "quote" ? "QUOTE" : "INVOICE";
  const defaultColor = doc.type === "invoice" ? [16, 185, 129] : [217, 119, 6];
  const accentColor = (doc.brandColor && /^#[0-9A-Fa-f]{6}$/.test(doc.brandColor))
    ? hexToRgb(doc.brandColor)
    : defaultColor;

  let contentStartY = 28;

  // Logo
  if (doc.logoBase64) {
    const format = doc.logoFormat ?? "PNG";
    const logoW = 36;
    const logoH = 18;
    try {
      pdf.addImage(doc.logoBase64, format, 20, 18, logoW, logoH);
      contentStartY = 48;
    } catch {
      contentStartY = 28;
    }
  }

  // Header accent line
  pdf.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
  pdf.setLineWidth(0.5);
  pdf.line(20, 15, 190, 15);

  // Company block
  pdf.setFontSize(10);
  let y = contentStartY;
  if (doc.companyName) {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    pdf.text(doc.companyName.toUpperCase(), 20, y);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(100, 116, 139);
    y += 6;
  }
  if (doc.companyAddress) {
    const lines = doc.companyAddress.split("\n").filter(Boolean);
    lines.forEach((line) => {
      pdf.text(line, 20, y);
      y += 5;
    });
    y += 4;
  }
  const docInfoY = y;

  // Document type – prominent
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  pdf.text(typeLabel, 20, docInfoY + 10);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(100, 116, 139);
  if (doc.number) {
    pdf.text(`${doc.type === "quote" ? "Quote" : "Invoice"} #${doc.number}`, 20, docInfoY + 17);
  }
  pdf.text(`Date: ${new Date(doc.createdAt).toLocaleDateString("en-GB")}`, 20, docInfoY + 23);
  if (doc.reference) pdf.text(`Ref: ${doc.reference}`, 20, docInfoY + 29);

  const billToY = docInfoY + 38;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.setTextColor(100, 116, 139);
  pdf.text("BILL TO", 20, billToY);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.setTextColor(41, 37, 36);
  pdf.text(doc.customer.name, 20, billToY + 7);
  pdf.setFontSize(9);
  pdf.setTextColor(100, 116, 139);
  let billToOffset = billToY + 7;
  if (doc.customer.email) {
    pdf.text(doc.customer.email, 20, billToOffset);
    billToOffset += 6;
  }
  if (doc.customer.phone) {
    pdf.text(doc.customer.phone, 20, billToOffset);
    billToOffset += 6;
  }
  if (doc.customer.address) {
    const addrLines = doc.customer.address.split("\n").filter(Boolean);
    addrLines.forEach((line) => {
      pdf.text(line, 20, billToOffset);
      billToOffset += 5;
    });
  }

  const tableStartY = billToOffset + 12;
  const tableData = doc.items.map((item) => [
    item.description || "—",
    String(item.quantity),
    `£${Number(item.rate).toFixed(2)}`,
    `£${((item.quantity || 0) * (item.rate || 0)).toFixed(2)}`,
  ]);

  autoTable(pdf, {
    startY: tableStartY,
    head: [["Description", "Quantity", "Unit Price", "Amount"]],
    body: tableData,
    theme: "plain",
    headStyles: {
      fillColor: [accentColor[0], accentColor[1], accentColor[2]],
      textColor: 255,
      fontStyle: "bold",
      fontSize: 10,
      cellPadding: { top: 6, right: 5, bottom: 6, left: 5 },
    },
    columnStyles: {
      0: { cellWidth: "auto" },
      1: { halign: "right", cellWidth: 25 },
      2: { halign: "right", cellWidth: 30 },
      3: { halign: "right", cellWidth: 35, fontStyle: "bold" },
    },
    alternateRowStyles: { fillColor: [250, 250, 249] },
  });

  const finalY = (pdf as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? tableStartY;

  // Summary
  pdf.setFontSize(10);
  pdf.setTextColor(100, 116, 139);
  let summaryY = finalY + 12;
  pdf.text("Subtotal", 130, summaryY);
  pdf.text(`£${doc.amount.toFixed(2)}`, 195, summaryY, { align: "right" });
  summaryY += 7;
  if (doc.discount && doc.discount > 0) {
    pdf.text("Discount", 130, summaryY);
    pdf.text(`-£${doc.discount.toFixed(2)}`, 195, summaryY, { align: "right" });
    summaryY += 7;
  }
  pdf.text("VAT (20%)", 130, summaryY);
  pdf.text(`£${doc.vat.toFixed(2)}`, 195, summaryY, { align: "right" });
  summaryY += 12;

  // Total – highlighted
  pdf.setFillColor(250, 250, 249);
  pdf.rect(120, summaryY - 6, 80, 14, "F");
  pdf.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
  pdf.rect(120, summaryY - 6, 80, 14, "S");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  pdf.text("Total", 125, summaryY + 2);
  pdf.text(`£${doc.total.toFixed(2)}`, 195, summaryY + 2, { align: "right" });
  pdf.setTextColor(41, 37, 36);
  pdf.setFont("helvetica", "normal");

  if (doc.type === "invoice" && doc.paid) {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(16, 185, 129);
    pdf.text("PAID", 20, summaryY + 20);
  }

  return Buffer.from(pdf.output("arraybuffer"));
}

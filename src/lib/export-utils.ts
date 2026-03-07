import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";
import bwipjs from "bwip-js/node";

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
  brandColor?: string | null;
  paymentUrl?: string | null;
};

function hexToRgb(hex: string): [number, number, number] {
  const m = hex.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return [15, 37, 68];
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

const ROW_ALT = [250, 250, 249] as const;
const TEXT_DARK = [51, 51, 51] as const;
const TEXT_MUTED = [100, 116, 139] as const;

export async function generatePDF(doc: ExportDoc): Promise<Buffer> {
  const pdf = new jsPDF();
  const typeLabel = doc.type === "quote" ? "QUOTE" : "INVOICE";
  const defaultColor: [number, number, number] = doc.type === "invoice" ? [14, 165, 233] : [42, 114, 184];
  const accent = (doc.brandColor && /^#[0-9A-Fa-f]{6}$/.test(doc.brandColor))
    ? hexToRgb(doc.brandColor)
    : defaultColor;

  const marginX = 20;
  const pageW = 210;
  const contentW = pageW - 2 * marginX;

  // Header band – accent band across top
  const headerH = 22;
  pdf.setFillColor(accent[0], accent[1], accent[2]);
  pdf.rect(0, 0, pageW, headerH, "F");

  let y = headerH + 14;

  // Left: Logo + Company
  let leftY = y;
  if (doc.logoBase64) {
    try {
      const fmt = doc.logoFormat ?? "PNG";
      pdf.addImage(doc.logoBase64, fmt, marginX, leftY, 36, 20);
      leftY += 24;
    } catch {
      leftY += 2;
    }
  }
  if (doc.companyName) {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(accent[0], accent[1], accent[2]);
    pdf.text(doc.companyName.toUpperCase(), marginX, leftY);
    leftY += 6;
    // Accent line under company name + droplet (small circle)
    pdf.setDrawColor(accent[0], accent[1], accent[2]);
    pdf.setLineWidth(0.6);
    pdf.line(marginX, leftY, marginX + 55, leftY);
    pdf.setFillColor(accent[0], accent[1], accent[2]);
    pdf.circle(marginX + 58, leftY - 0.5, 2, "F");
    leftY += 10;
  }

  // Right: INVOICE / QUOTE + details
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.setTextColor(accent[0], accent[1], accent[2]);
  pdf.text(typeLabel, pageW - marginX, y, { align: "right" });
  y += 10;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(TEXT_MUTED[0], TEXT_MUTED[1], TEXT_MUTED[2]);
  if (doc.number) {
    pdf.text(`${doc.type === "quote" ? "Quote" : "Invoice"} #${doc.number}`, pageW - marginX, y, { align: "right" });
    y += 6;
  }
  pdf.text(`Issued ${new Date(doc.createdAt).toLocaleDateString("en-GB")}`, pageW - marginX, y, { align: "right" });
  y += 6;
  if (doc.type === "invoice") {
    pdf.text("Due upon receipt", pageW - marginX, y, { align: "right" });
    y += 6;
  }
  if (doc.reference) {
    pdf.text(`Ref: ${doc.reference}`, pageW - marginX, y, { align: "right" });
    y += 6;
  }

  y = Math.max(leftY, y) + 14;

  // Bill from / Bill to
  const colW = contentW / 2;
  const billFromX = marginX;
  const billToX = marginX + colW + 10;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.setTextColor(accent[0], accent[1], accent[2]);
  pdf.text("BILL FROM", billFromX, y);
  pdf.text("BILL TO", billToX, y);
  y += 7;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.setTextColor(TEXT_DARK[0], TEXT_DARK[1], TEXT_DARK[2]);
  if (doc.companyName) pdf.text(doc.companyName, billFromX, y);
  pdf.text(doc.customer.name, billToX, y);
  y += 6;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(TEXT_MUTED[0], TEXT_MUTED[1], TEXT_MUTED[2]);
  if (doc.companyAddress) {
    const lines = doc.companyAddress.split("\n").filter(Boolean);
    lines.forEach((line) => {
      pdf.text(line, billFromX, y);
      y += 5;
    });
    y += 2;
  }
  const billToStartY = y;
  if (doc.customer.email) {
    pdf.text(doc.customer.email, billToX, billToStartY);
  }
  if (doc.customer.phone) {
    pdf.text(doc.customer.phone, billToX, billToStartY + 5);
  }
  if (doc.customer.address) {
    const lines = doc.customer.address.split("\n").filter(Boolean);
    let ay = billToStartY + (doc.customer.email || doc.customer.phone ? 10 : 0);
    lines.forEach((line) => {
      pdf.text(line, billToX, ay);
      ay += 5;
    });
  }
  y = Math.max(y, billToStartY + 25) + 12;

  const taxLabel = doc.vat > 0 ? "20%" : "0%";
  const tableData = doc.items.map((item) => [
    item.description || "—",
    String(item.quantity),
    `£${Number(item.rate).toFixed(2)}`,
    taxLabel,
    `£${((item.quantity || 0) * (item.rate || 0)).toFixed(2)}`,
  ]);

  const headerRadius = 2;

  autoTable(pdf, {
    startY: y,
    head: [["Description", "QTY", "Price", "Tax", "Amount"]],
    body: tableData,
    theme: "plain",
    headStyles: {
      fillColor: false,
      textColor: 255,
      fontStyle: "bold",
      fontSize: 10,
      cellPadding: { top: 4, right: 8, bottom: 4, left: 8 },
      minCellHeight: 8,
    },
    columnStyles: {
      0: { cellWidth: "auto" },
      1: { halign: "center", cellWidth: 22 },
      2: { halign: "right", cellWidth: 28 },
      3: { halign: "center", cellWidth: 24 },
      4: { halign: "right", cellWidth: 32, fontStyle: "bold" },
    },
    alternateRowStyles: { fillColor: [ROW_ALT[0], ROW_ALT[1], ROW_ALT[2]] },
    margin: { left: marginX, right: marginX },
    willDrawCell: (data) => {
      if (data.section === "head" && data.column.index === 0) {
        const cell = data.cell as { x: number; y: number; width: number; height: number };
        const x = cell.x;
        const y = cell.y;
        const w = contentW;
        const h = cell.height;
        const r = headerRadius;
        const k = 0.5522847498; // bezier approx for quarter circle
        pdf.setFillColor(accent[0], accent[1], accent[2]);
        pdf.moveTo(x + r, y);
        pdf.lineTo(x + w - r, y);
        pdf.curveTo(x + w - r * (1 - k), y, x + w, y + r * k, x + w, y + r);
        pdf.lineTo(x + w, y + h);
        pdf.lineTo(x, y + h);
        pdf.lineTo(x, y + r);
        pdf.curveTo(x + r * k, y + r, x + r, y + r * k, x + r, y);
        pdf.fill();
      }
    },
  });

  const finalY = (pdf as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? y;

  // Summary
  const summaryX = 125;
  let sumY = finalY + 14;
  pdf.setFontSize(10);
  pdf.setTextColor(TEXT_MUTED[0], TEXT_MUTED[1], TEXT_MUTED[2]);
  pdf.text("Subtotal", summaryX, sumY);
  pdf.text(`£${doc.amount.toFixed(2)}`, pageW - marginX, sumY, { align: "right" });
  sumY += 8;
  if (doc.discount && doc.discount > 0) {
    pdf.text("Discount", summaryX, sumY);
    pdf.text(`-£${doc.discount.toFixed(2)}`, pageW - marginX, sumY, { align: "right" });
    sumY += 8;
  }
  if (doc.vat > 0) {
    pdf.text("VAT (20%)", summaryX, sumY);
    pdf.text(`£${doc.vat.toFixed(2)}`, pageW - marginX, sumY, { align: "right" });
    sumY += 8;
  }
  sumY += 4;

  // Total – highlighted row
  pdf.setFillColor(235, 235, 235);
  pdf.rect(summaryX - 5, sumY - 8, contentW - (summaryX - marginX - 5), 14, "F");
  pdf.setDrawColor(accent[0], accent[1], accent[2]);
  pdf.rect(summaryX - 5, sumY - 8, contentW - (summaryX - marginX - 5), 14, "S");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.setTextColor(accent[0], accent[1], accent[2]);
  pdf.text("Total", summaryX, sumY);
  pdf.text(`£${doc.total.toFixed(2)}`, pageW - marginX, sumY, { align: "right" });

  if (doc.type === "invoice" && doc.paid) {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(34, 197, 94);
    pdf.text("PAID", marginX, sumY + 18);
  }

  // Footer – barcode + URL on left bottom (for invoices)
  const paymentUrl =
    doc.paymentUrl ||
    (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_APP_URL) ||
    "https://tradeinvoice.co.uk";
  const effectiveUrl = (typeof paymentUrl === "string" && paymentUrl.trim())
    ? paymentUrl.trim()
    : "https://tradeinvoice.co.uk";
  if (doc.type === "invoice") {
    const footY = 275;
    try {
      const barcodeBuffer = await bwipjs.toBuffer({
        bcid: "code128",
        text: effectiveUrl,
        scale: 2,
        height: 8,
        includetext: false,
      });
      const barcodeDataUrl = "data:image/png;base64," + barcodeBuffer.toString("base64");
      const barcodeW = 60;
      const barcodeH = 16;
      pdf.addImage(barcodeDataUrl, "PNG", marginX, footY - barcodeH, barcodeW, barcodeH);
    } catch {
      // skip barcode if generation fails
    }
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(accent[0], accent[1], accent[2]);
    pdf.text(effectiveUrl, marginX, footY + 4);
  }

  return Buffer.from(pdf.output("arraybuffer"));
}

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/auth";
import { generatePDF } from "@/lib/export-utils";
import { fetchLogoAsBase64 } from "@/lib/logo";

type Item = { description: string; quantity: number; rate: number };

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getOrCreateUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { id } = await params;

  const invoice = await prisma.invoice.findFirst({
    where: { id, userId: user.id },
    include: { customer: true },
  });

  if (!invoice) return new Response("Not found", { status: 404 });

  const logoData = user.logoUrl
    ? await fetchLogoAsBase64(user.logoUrl)
    : null;

  const doc = {
    type: "invoice" as const,
    companyName: user.companyName,
    companyAddress: user.companyAddress,
    number: invoice.number,
    customer: invoice.customer,
    items: (invoice.items as Item[]) || [],
    amount: invoice.amount,
    discount: invoice.discount ?? 0,
    vat: invoice.vat,
    total: invoice.total,
    createdAt: invoice.createdAt,
    reference: invoice.reference,
    paid: invoice.paid,
    logoBase64: logoData?.base64 ?? null,
    logoFormat: logoData?.format,
  };

  const safeName = invoice.customer.name.replace(/[^a-zA-Z0-9]/g, "_");
  const dateStr = new Date().toISOString().slice(0, 10);

  const pdfBuffer = generatePDF(doc);
  return new Response(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="invoice-${safeName}-${dateStr}.pdf"`,
    },
  });
}

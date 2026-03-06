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

  const quote = await prisma.quote.findFirst({
    where: { id, userId: user.id },
    include: { customer: true },
  });

  if (!quote) return new Response("Not found", { status: 404 });

  const logoData = user.logoUrl
    ? await fetchLogoAsBase64(user.logoUrl)
    : null;

  const doc = {
    type: "quote" as const,
    companyName: user.companyName,
    companyAddress: user.companyAddress,
    number: quote.number,
    customer: quote.customer,
    items: (quote.items as Item[]) || [],
    amount: quote.amount,
    discount: quote.discount ?? 0,
    vat: quote.vat,
    total: quote.total,
    createdAt: quote.createdAt,
    reference: quote.reference,
    logoBase64: logoData?.base64 ?? null,
    logoFormat: logoData?.format,
    brandColor: user.brandColor,
  };

  const safeName = quote.customer.name.replace(/[^a-zA-Z0-9]/g, "_");
  const dateStr = new Date().toISOString().slice(0, 10);

  const pdfBuffer = generatePDF(doc);
  return new Response(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="quote-${safeName}-${dateStr}.pdf"`,
    },
  });
}

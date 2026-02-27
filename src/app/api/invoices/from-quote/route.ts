import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/auth";
import { generateInvoiceNumber } from "@/lib/numbers";

export async function POST(req: Request) {
  const user = await getOrCreateUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { quoteId } = await req.json();
  if (!quoteId) {
    return NextResponse.json({ error: "quoteId required" }, { status: 400 });
  }

  const quote = await prisma.quote.findFirst({
    where: { id: quoteId, userId: user.id },
    include: { customer: true },
  });

  if (!quote) {
    return NextResponse.json({ error: "Quote not found" }, { status: 404 });
  }

  const number = await generateInvoiceNumber(user.id);
  const invoice = await prisma.invoice.create({
    data: {
      userId: user.id,
      quoteId: quote.id,
      customerId: quote.customerId,
      number,
      items: quote.items as object,
      amount: quote.amount,
      discount: quote.discount ?? 0,
      vat: quote.vat,
      total: quote.total,
    },
  });

  return NextResponse.json(invoice);
}

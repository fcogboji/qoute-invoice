import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/auth";
import { generateInvoiceNumber } from "@/lib/numbers";

export async function GET() {
  const user = await getOrCreateUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const invoices = await prisma.invoice.findMany({
    where: { userId: user.id },
    include: { customer: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(invoices);
}

export async function POST(req: Request) {
  const user = await getOrCreateUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { customer: c, items, amount, vat, total, quoteId, discount } = body;
  const discountVal = Number(discount) || 0;

  if (!c?.name) {
    return NextResponse.json({ error: "Customer name required" }, { status: 400 });
  }

  const customer = await prisma.customer.upsert({
    where: {
      userId_name: { userId: user.id, name: c.name.trim() },
    },
    create: {
      userId: user.id,
      name: c.name.trim(),
      email: c.email || null,
      phone: c.phone || null,
    },
    update: {
      email: c.email || undefined,
      phone: c.phone || undefined,
    },
  });

  const number = await generateInvoiceNumber(user.id);
  const invoice = await prisma.invoice.create({
    data: {
      userId: user.id,
      customerId: customer.id,
      quoteId: quoteId || null,
      number,
      items: items ?? [],
      amount: Number(amount) ?? 0,
      discount: discountVal,
      vat: Number(vat) ?? 0,
      total: Number(total) ?? 0,
    },
  });

  return NextResponse.json(invoice);
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getOrCreateUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { name, email, phone, address } = body;

  const existing = await prisma.customer.findFirst({
    where: { id, userId: user.id },
  });

  if (!existing) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  const data: { name?: string; email?: string | null; phone?: string | null; address?: string | null } = {};
  if (name !== undefined) data.name = name.trim();
  if (email !== undefined) data.email = email?.trim() || null;
  if (phone !== undefined) data.phone = phone?.trim() || null;
  if (address !== undefined) data.address = address?.trim() || null;

  const customer = await prisma.customer.update({
    where: { id },
    data,
  });

  return NextResponse.json(customer);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getOrCreateUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const existing = await prisma.customer.findFirst({
    where: { id, userId: user.id },
    include: { _count: { select: { quotes: true, invoices: true } } },
  });

  if (!existing) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  if (existing._count.quotes > 0 || existing._count.invoices > 0) {
    return NextResponse.json(
      { error: "Cannot delete customer with existing quotes or invoices" },
      { status: 400 }
    );
  }

  await prisma.customer.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

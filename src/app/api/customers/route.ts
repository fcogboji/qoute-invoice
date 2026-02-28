import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = await getOrCreateUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.trim() || "";

  const where = {
    userId: user.id,
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
            { phone: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const customers = await prisma.customer.findMany({
    where,
    include: {
      _count: { select: { quotes: true, invoices: true } },
    },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(customers);
}

export async function POST(req: Request) {
  const user = await getOrCreateUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, email, phone, address } = body;

  if (!name?.trim()) {
    return NextResponse.json({ error: "Customer name required" }, { status: 400 });
  }

  const customer = await prisma.customer.upsert({
    where: {
      userId_name: { userId: user.id, name: name.trim() },
    },
    create: {
      userId: user.id,
      name: name.trim(),
      email: email?.trim() || null,
      phone: phone?.trim() || null,
      address: address?.trim() || null,
    },
    update: {
      email: email?.trim() || null,
      phone: phone?.trim() || null,
      address: address?.trim() || null,
    },
  });

  return NextResponse.json(customer);
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/auth";

export async function GET() {
  const user = await getOrCreateUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [quotesCount, invoicesCount, paidInvoices, totalRevenue, recentQuotes, recentInvoices] =
    await Promise.all([
      prisma.quote.count({ where: { userId: user.id } }),
      prisma.invoice.count({ where: { userId: user.id } }),
      prisma.invoice.aggregate({
        where: { userId: user.id, paid: true },
        _sum: { total: true },
      }),
      prisma.invoice.aggregate({
        where: { userId: user.id },
        _sum: { total: true },
      }),
      prisma.quote.findMany({
        where: { userId: user.id },
        include: { customer: true },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.invoice.findMany({
        where: { userId: user.id },
        include: { customer: true },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  const paidRevenue = paidInvoices._sum.total ?? 0;
  const unpaidRevenue = (totalRevenue._sum.total ?? 0) - paidRevenue;

  return NextResponse.json({
    quotesCount,
    invoicesCount,
    paidRevenue,
    unpaidRevenue,
    totalRevenue: totalRevenue._sum.total ?? 0,
    recentQuotes,
    recentInvoices,
  });
}

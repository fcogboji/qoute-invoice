import { prisma } from "./prisma";

type DatePoint = { date: string; count: number; cumulative: number };
type RevenuePoint = { date: string; paid: number; invoiced: number };

function toDateString(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function fillDateRange(
  from: Date,
  to: Date,
  fill: (d: string) => DatePoint | RevenuePoint,
): (DatePoint | RevenuePoint)[] {
  const out: (DatePoint | RevenuePoint)[] = [];
  const cur = new Date(from);
  while (cur <= to) {
    out.push(fill(toDateString(cur)));
    cur.setDate(cur.getDate() + 1);
  }
  return out;
}

export async function getAdminUserGrowth(days = 30): Promise<DatePoint[]> {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - days);
  from.setHours(0, 0, 0, 0);
  to.setHours(23, 59, 59, 999);

  const users = await prisma.user.findMany({
    where: { createdAt: { gte: from, lte: to } },
    select: { createdAt: true },
  });

  const byDate = new Map<string, number>();
  for (const u of users) {
    const d = toDateString(u.createdAt);
    byDate.set(d, (byDate.get(d) ?? 0) + 1);
  }

  const totalBefore = await prisma.user.count({
    where: { createdAt: { lt: from } },
  });

  let cumulative = totalBefore;
  return fillDateRange(from, to, (d) => {
    const count = byDate.get(d) ?? 0;
    cumulative += count;
    return { date: d, count, cumulative };
  }) as DatePoint[];
}

export async function getAdminRevenue(days = 30): Promise<RevenuePoint[]> {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - days);
  from.setHours(0, 0, 0, 0);
  to.setHours(23, 59, 59, 999);

  const invoices = await prisma.invoice.findMany({
    where: {
      OR: [
        { createdAt: { gte: from, lte: to } },
        { paidAt: { not: null, gte: from, lte: to } },
      ],
    },
    select: { total: true, paid: true, createdAt: true, paidAt: true },
  });

  const invoicedByDate = new Map<string, number>();
  const paidByDate = new Map<string, number>();

  for (const inv of invoices) {
    const d = toDateString(inv.createdAt);
    invoicedByDate.set(d, (invoicedByDate.get(d) ?? 0) + inv.total);
    if (inv.paid && inv.paidAt) {
      const pd = toDateString(inv.paidAt);
      paidByDate.set(pd, (paidByDate.get(pd) ?? 0) + inv.total);
    }
  }

  return fillDateRange(from, to, (d) => ({
    date: d,
    paid: paidByDate.get(d) ?? 0,
    invoiced: invoicedByDate.get(d) ?? 0,
  })) as RevenuePoint[];
}

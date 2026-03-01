import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendTrialEndingSoon } from "@/lib/email";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  const isProd = process.env.NODE_ENV === "production";

  // In production, CRON_SECRET must be set; otherwise endpoint is disabled
  if (isProd && !cronSecret) {
    return NextResponse.json({ error: "Cron not configured" }, { status: 503 });
  }
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const inTwoDays = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);

  const users = await prisma.user.findMany({
    where: {
      subscriptionStatus: "trialing",
      subscriptionCurrentPeriodEnd: {
        gte: now,
        lte: inTwoDays,
      },
    },
    select: { id: true, email: true, name: true, subscriptionCurrentPeriodEnd: true },
  });

  let sent = 0;
  for (const user of users) {
    if (!user.email) continue;
    const end = user.subscriptionCurrentPeriodEnd;
    if (!end) continue;
    const daysLeft = Math.ceil((end.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
    if (daysLeft >= 1 && daysLeft <= 2) {
      const result = await sendTrialEndingSoon(user.email, user.name, daysLeft);
      if (result.success) sent++;
    }
  }

  return NextResponse.json({ sent, total: users.length });
}

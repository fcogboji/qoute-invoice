import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendSetupReminder } from "@/lib/email";

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
  const oneDayMs = 24 * 60 * 60 * 1000;
  const twentyFourHoursAgo = new Date(now.getTime() - oneDayMs);
  const fortyEightHoursAgo = new Date(now.getTime() - 2 * oneDayMs);

  // Users who created an account 24–48h ago and have not started a subscription yet
  const users = await prisma.user.findMany({
    where: {
      createdAt: {
        gte: fortyEightHoursAgo,
        lte: twentyFourHoursAgo,
      },
      stripeSubscriptionId: null,
      subscriptionStatus: null,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  let sent = 0;
  for (const user of users) {
    if (!user.email) continue;
    const result = await sendSetupReminder(user.email, user.name);
    if (result.success) sent++;
  }

  return NextResponse.json({ sent, total: users.length });
}


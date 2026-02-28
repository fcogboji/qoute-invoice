import { prisma } from "./prisma";

const ACTIVE_STATUSES = ["trialing", "active"] as const;

export function hasActiveSubscription(status: string | null | undefined): boolean {
  if (!status) return false;
  return ACTIVE_STATUSES.includes(status as (typeof ACTIVE_STATUSES)[number]);
}

export async function getUserSubscription(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      subscriptionStatus: true,
      subscriptionCurrentPeriodEnd: true,
    },
  });
  return user ? hasActiveSubscription(user.subscriptionStatus) : false;
}

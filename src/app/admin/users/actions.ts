"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { isPlatformAdmin } from "@/lib/admin";
import { sendAdminSubscriptionGranted, sendAdminSubscriptionRemoved } from "@/lib/email";

async function guard() {
  if (!(await isPlatformAdmin())) {
    throw new Error("Unauthorized");
  }
}

export async function suspendUser(userId: string) {
  await guard();
  const { userId: adminId } = await auth();
  const adminUser = await prisma.user.findFirst({ where: { clerkId: adminId! } });
  if (adminUser?.id === userId) {
    throw new Error("You cannot suspend yourself");
  }
  await prisma.user.update({
    where: { id: userId },
    data: { suspended: true },
  });
  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${userId}`);
}

export async function unsuspendUser(userId: string) {
  await guard();
  await prisma.user.update({
    where: { id: userId },
    data: { suspended: false },
  });
  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${userId}`);
}

export async function grantSubscription(
  userId: string,
  plan: "starter" | "pro",
  durationMonths: number
) {
  await guard();
  const { userId: adminId } = await auth();
  const adminUser = await prisma.user.findFirst({ where: { clerkId: adminId! } });
  const targetUser = await prisma.user.findUnique({ where: { id: userId } });
  if (!adminUser || !targetUser) throw new Error("User not found");

  const periodEnd = new Date();
  periodEnd.setMonth(periodEnd.getMonth() + durationMonths);

  await prisma.user.update({
    where: { id: userId },
    data: {
      subscriptionStatus: "active",
      subscriptionCurrentPeriodEnd: periodEnd,
      subscriptionAdminGranted: true,
    },
  });

  await prisma.subscriptionAuditLog.create({
    data: {
      adminUserId: adminUser.id,
      adminEmail: adminUser.email,
      targetUserId: targetUser.id,
      action: "granted",
      plan,
      durationMonths,
    },
  });

  sendAdminSubscriptionGranted(targetUser.email, targetUser.name, periodEnd).catch(() => {});

  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${userId}`);
}

export async function removeSubscription(userId: string) {
  await guard();
  const { userId: adminId } = await auth();
  const adminUser = await prisma.user.findFirst({ where: { clerkId: adminId! } });
  const targetUser = await prisma.user.findUnique({ where: { id: userId } });
  if (!adminUser || !targetUser) throw new Error("User not found");

  await prisma.user.update({
    where: { id: userId },
    data: {
      stripeSubscriptionId: null,
      subscriptionStatus: null,
      subscriptionCurrentPeriodEnd: null,
      subscriptionAdminGranted: null,
    },
  });

  await prisma.subscriptionAuditLog.create({
    data: {
      adminUserId: adminUser.id,
      adminEmail: adminUser.email,
      targetUserId: targetUser.id,
      action: "removed",
    },
  });

  sendAdminSubscriptionRemoved(targetUser.email, targetUser.name).catch(() => {});

  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${userId}`);
}

export async function removeUser(userId: string) {
  await guard();
  const { userId: adminId } = await auth();
  const adminUser = await prisma.user.findFirst({ where: { clerkId: adminId! } });
  if (adminUser?.id === userId) {
    throw new Error("You cannot remove yourself");
  }
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");
  const clerkId = user.clerkId;
  try {
    const client = await clerkClient();
    await client.users.banUser(clerkId);
  } catch {
    // If Clerk ban fails (e.g. user already banned), continue with DB delete
  }
  await prisma.user.delete({ where: { id: userId } });
  revalidatePath("/admin/users");
  redirect("/admin/users");
}

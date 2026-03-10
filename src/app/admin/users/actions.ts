"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { isPlatformAdmin } from "@/lib/admin";

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

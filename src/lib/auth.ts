import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";
import { sendWelcomeEmail } from "./email";

export async function getOrCreateUser() {
  const { userId } = await auth();
  if (!userId) return null;

  let user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    const clerkUser = await currentUser();
    const email =
      clerkUser?.emailAddresses?.[0]?.emailAddress || `user-${userId}@tradeinvoice.co.uk`;
    const name =
      clerkUser?.firstName && clerkUser?.lastName
        ? `${clerkUser.firstName} ${clerkUser.lastName}`
        : clerkUser?.firstName || null;

    user = await prisma.user.create({
      data: {
        clerkId: userId,
        email,
        name,
      },
    });
    sendWelcomeEmail(email, name).catch(() => {});
  }

  return user;
}

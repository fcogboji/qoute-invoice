import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getOrCreateUser } from "@/lib/auth";
import { getUserSubscription } from "@/lib/subscription";

export async function GET() {
  const user = await getOrCreateUser();
  if (!user) return NextResponse.json({ hasSubscription: false }, { status: 401 });
  const hasSubscription = await getUserSubscription(user.id);
  return NextResponse.json({ hasSubscription });
}

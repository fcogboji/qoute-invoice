import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ hasSubscription: false }, { status: 401 });

  const stripe = getStripe();
  if (!stripe) return NextResponse.json({ hasSubscription: false }, { status: 500 });

  let body: { session_id?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ hasSubscription: false }, { status: 400 });
  }
  const sessionId = body.session_id;
  if (!sessionId || typeof sessionId !== "string") {
    return NextResponse.json({ hasSubscription: false }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.mode !== "subscription" || !session.subscription || !session.customer) {
      return NextResponse.json({ hasSubscription: false }, { status: 200 });
    }
    const clerkId = session.client_reference_id as string | null;
    if (!clerkId || clerkId !== userId) {
      return NextResponse.json({ hasSubscription: false }, { status: 403 });
    }

    const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
    const status = subscription.status;
    const item = subscription.items?.data?.[0];
    const currentPeriodEnd = item?.current_period_end
      ? new Date(item.current_period_end * 1000)
      : null;

    await prisma.user.updateMany({
      where: { clerkId },
      data: {
        stripeCustomerId:
          typeof session.customer === "string" ? session.customer : session.customer.id,
        stripeSubscriptionId: subscription.id,
        subscriptionStatus: status,
        ...(currentPeriodEnd && { subscriptionCurrentPeriodEnd: currentPeriodEnd }),
      },
    });

    const hasActive = ["trialing", "active"].includes(status);
    return NextResponse.json({ hasSubscription: hasActive });
  } catch (err) {
    console.error("Verify session error:", err);
    return NextResponse.json({ hasSubscription: false }, { status: 500 });
  }
}

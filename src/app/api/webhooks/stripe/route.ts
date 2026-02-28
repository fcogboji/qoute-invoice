import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

async function upsertSubscription(
  clerkId: string,
  stripeCustomerId: string,
  subscription: Stripe.Subscription
) {
  const status = subscription.status;
  const item = subscription.items?.data?.[0];
  const currentPeriodEnd = item?.current_period_end
    ? new Date(item.current_period_end * 1000)
    : null;

  await prisma.user.updateMany({
    where: { clerkId },
    data: {
      stripeCustomerId,
      stripeSubscriptionId: subscription.id,
      subscriptionStatus: status,
      ...(currentPeriodEnd && { subscriptionCurrentPeriodEnd: currentPeriodEnd }),
    },
  });
}

async function clearSubscription(clerkId: string) {
  await prisma.user.updateMany({
    where: { clerkId },
    data: {
      stripeSubscriptionId: null,
      subscriptionStatus: "canceled",
      subscriptionCurrentPeriodEnd: null,
    },
  });
}

export async function POST(req: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Webhook error" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode !== "subscription" || !session.subscription || !session.customer) break;
        const clerkId = session.client_reference_id as string | null;
        if (!clerkId) break;
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        await upsertSubscription(
          clerkId,
          typeof session.customer === "string" ? session.customer : session.customer.id,
          subscription
        );
        break;
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const user = await prisma.user.findFirst({
          where: { stripeSubscriptionId: subscription.id },
        });
        if (!user) break;
        await upsertSubscription(
          user.clerkId,
          typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id,
          subscription
        );
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const user = await prisma.user.findFirst({
          where: { stripeSubscriptionId: subscription.id },
        });
        if (user) await clearSubscription(user.clerkId);
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.error("Stripe webhook error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import {
  sendSubscriptionConfirmation,
  sendSubscriptionCanceled,
  sendPaymentReceipt,
  sendPaymentFailed,
} from "@/lib/email";

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
        const user = await prisma.user.findFirst({ where: { clerkId } });
        if (user?.email) {
          sendSubscriptionConfirmation(user.email, user.name).catch(() => {});
        }
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
        if (user) {
          if (user.email) sendSubscriptionCanceled(user.email, user.name).catch(() => {});
          await clearSubscription(user.clerkId);
        }
        break;
      }
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;
        if (!customerId) break;
        const user = await prisma.user.findFirst({ where: { stripeCustomerId: customerId } });
        if (!user?.email) break;
        const amount = invoice.amount_paid
          ? `£${(invoice.amount_paid / 100).toFixed(2)}`
          : "—";
        const isRenewal = !!invoice.billing_reason && invoice.billing_reason !== "subscription_create";
        sendPaymentReceipt(user.email, user.name, amount, isRenewal).catch(() => {});
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;
        if (!customerId) break;
        const user = await prisma.user.findFirst({ where: { stripeCustomerId: customerId } });
        if (user?.email) sendPaymentFailed(user.email, user.name).catch(() => {});
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

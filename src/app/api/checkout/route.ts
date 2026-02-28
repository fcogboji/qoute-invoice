import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";
import { getOrCreateUser } from "@/lib/auth";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

function getPriceId(plan: string, interval: string): string | undefined {
  if (plan === "starter") {
    return interval === "yearly"
      ? process.env.STRIPE_PRICE_ID_STARTER_YEARLY
      : process.env.STRIPE_PRICE_ID_STARTER;
  }
  return interval === "yearly"
    ? (process.env.STRIPE_PRICE_ID_PRO_YEARLY ?? process.env.STRIPE_PRICE_ID_PRO)
    : (process.env.STRIPE_PRICE_ID_PRO ?? process.env.STRIPE_PRICE_ID);
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await getOrCreateUser();

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 500 }
    );
  }

  let body: { plan?: string; interval?: string } = {};
  try {
    body = await req.json();
  } catch {
    // default to pro if no body
  }
  const plan = (body.plan || "pro") as "starter" | "pro";
  const interval = (body.interval || "monthly") as "monthly" | "yearly";
  const priceId = getPriceId(plan, interval);

  if (!priceId) {
    return NextResponse.json(
      { error: "Price not configured for this plan" },
      { status: 500 }
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    subscription_data: {
      trial_period_days: 7,
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    client_reference_id: userId,
  });

  return NextResponse.json({ url: session.url });
}

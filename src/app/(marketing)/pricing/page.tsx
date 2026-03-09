import { redirect } from "next/navigation";
import { getOrCreateUser } from "@/lib/auth";
import { getUserSubscription } from "@/lib/subscription";
import { isPlatformAdmin } from "@/lib/admin";
import PricingContent from "./PricingContent";

export default async function PricingPage() {
  const user = await getOrCreateUser();
  if (user) {
    const [isAdmin, hasSubscription] = await Promise.all([
      isPlatformAdmin(),
      getUserSubscription(user.id),
    ]);
    if (isAdmin || hasSubscription) {
      redirect("/dashboard");
    }
  }

  return <PricingContent />;
}

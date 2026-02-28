import DashboardHeader from "@/components/dashboard-header";
import Footer from "@/components/footer";
import { getOrCreateUser } from "@/lib/auth";
import { isPlatformAdmin } from "@/lib/admin";
import { getUserSubscription } from "@/lib/subscription";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getOrCreateUser();
  if (!user) redirect("/sign-in");
  const isAdmin = await isPlatformAdmin();
  const hasSubscription = await getUserSubscription(user.id);
  if (!isAdmin && !hasSubscription) redirect("/pricing");

  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <DashboardHeader showAdmin={isAdmin} />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

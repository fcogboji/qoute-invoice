import { getOrCreateUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const user = await getOrCreateUser();
  if (!user) redirect("/");

  return (
    <div>
      <h1 className="text-3xl font-bold text-stone-900">Settings</h1>
      <p className="mt-2 text-stone-600">
        Manage your account settings.
      </p>
      <p className="mt-6 text-stone-500">
        Company name and logo can be set on your{" "}
        <a href="/dashboard" className="font-medium text-amber-600 hover:underline">
          Dashboard
        </a>{" "}
        under &quot;Your business&quot;.
      </p>
    </div>
  );
}

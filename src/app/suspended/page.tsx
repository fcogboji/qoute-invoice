import { getOrCreateUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SuspendedPage() {
  const user = await getOrCreateUser();
  if (!user) redirect("/sign-in");
  if (!user.suspended) redirect("/dashboard");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-md rounded-xl border border-amber-200 bg-amber-50/50 p-8 text-center">
        <h1 className="text-2xl font-bold text-stone-900">Account suspended</h1>
        <p className="mt-4 text-stone-600">
          Your account has been suspended. If you believe this is an error, please contact support.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-lg bg-stone-800 px-4 py-2 font-medium text-white hover:bg-stone-900"
        >
          Contact support
        </Link>
        <p className="mt-6 text-sm text-stone-500">
          <Link href="/" className="underline hover:text-stone-700">
            Return to homepage
          </Link>
        </p>
      </div>
    </div>
  );
}

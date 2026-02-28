import Link from "next/link";
import { getAdminRevenue, getAdminUserGrowth } from "@/lib/admin-analytics";
import { UserGrowthChart, RevenueChart } from "@/components/admin-analytics-charts";

type Props = { searchParams: Promise<{ days?: string }> };

const VALID_DAYS = [7, 30, 90] as const;

export default async function AdminAnalyticsPage({ searchParams }: Props) {
  const params = await searchParams;
  const daysRaw = params.days ? parseInt(params.days, 10) : 30;
  const days = VALID_DAYS.includes(daysRaw as (typeof VALID_DAYS)[number]) ? daysRaw : 30;

  const [userGrowth, revenue] = await Promise.all([
    getAdminUserGrowth(days),
    getAdminRevenue(days),
  ]);

  const totalNewUsers = userGrowth.reduce((s, p) => s + p.count, 0);
  const totalPaid = revenue.reduce((s, p) => s + p.paid, 0);
  const totalInvoiced = revenue.reduce((s, p) => s + p.invoiced, 0);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">Analytics</h1>
          <p className="mt-2 text-stone-600">User growth and revenue over time.</p>
        </div>
        <div className="flex gap-2">
          {VALID_DAYS.map((d) => (
            <Link
              key={d}
              href={"/admin/analytics?days=" + d}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                days === d
                  ? "bg-amber-600 text-white"
                  : "bg-stone-200 text-stone-700 hover:bg-stone-300"
              }`}
            >
              Last {d} days
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-stone-500">New users</p>
          <p className="mt-1 text-2xl font-bold text-stone-900">{totalNewUsers}</p>
          <p className="mt-1 text-xs text-stone-500">in last {days} days</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Paid revenue</p>
          <p className="mt-1 text-2xl font-bold text-emerald-700">£{totalPaid.toLocaleString("en-GB", { minimumFractionDigits: 2 })}</p>
          <p className="mt-1 text-xs text-stone-500">in last {days} days</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Invoiced</p>
          <p className="mt-1 text-2xl font-bold text-stone-900">£{totalInvoiced.toLocaleString("en-GB", { minimumFractionDigits: 2 })}</p>
          <p className="mt-1 text-xs text-stone-500">in last {days} days</p>
        </div>
      </div>

      <div className="mt-10 space-y-10">
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-stone-900">User growth</h2>
          <p className="mt-1 text-sm text-stone-500">New signups and total users over time.</p>
          <div className="mt-6">
            <UserGrowthChart data={userGrowth} />
          </div>
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-stone-900">Revenue</h2>
          <p className="mt-1 text-sm text-stone-500">Invoiced vs paid revenue by date.</p>
          <div className="mt-6">
            <RevenueChart data={revenue} />
          </div>
        </div>
      </div>
    </div>
  );
}

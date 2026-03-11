import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { hasActiveSubscription } from "@/lib/subscription";
import { suspendUser, unsuspendUser, removeUser, grantSubscription, removeSubscription } from "../actions";
import { SuspendButton } from "../suspend-button";
import { RemoveButton } from "../remove-button";
import { SubscriptionForm } from "../subscription-form";

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      _count: { select: { quotes: true, invoices: true, customers: true } },
    },
  });

  if (!user) notFound();

  const [recentQuotes, recentInvoices, revenue, subscriptionLogs] = await Promise.all([
    prisma.quote.findMany({
      where: { userId: id },
      include: { customer: true },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    prisma.invoice.findMany({
      where: { userId: id },
      include: { customer: true },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    prisma.invoice.aggregate({
      where: { userId: id },
      _sum: { total: true },
    }),
    prisma.subscriptionAuditLog.findMany({
      where: { targetUserId: id },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  const totalRevenue = revenue._sum.total ?? 0;

  return (
    <div>
      <Link href="/admin/users" className="text-sm font-medium text-stone-500 hover:text-stone-900">
        ← Back to users
      </Link>

      <div className="mt-6 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">{user.email}</h1>
            <p className="mt-1 text-stone-600">{user.name ?? "—"}</p>
            {user.suspended && (
              <span className="mt-2 inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">Suspended</span>
            )}
          </div>
          <div className="flex gap-2">
            <SuspendButton userId={user.id} suspended={user.suspended} onSuspend={suspendUser} onUnsuspend={unsuspendUser} />
            <RemoveButton userId={user.id} onRemove={removeUser} />
          </div>
        </div>
        {user.companyName && (
          <p className="mt-1 text-sm font-medium text-stone-700">{user.companyName}</p>
        )}
        {user.companyAddress && (
          <p className="mt-1 text-sm text-stone-600 whitespace-pre-line">{user.companyAddress}</p>
        )}
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-stone-500">
          <span>Joined {new Date(user.createdAt).toLocaleDateString("en-GB")}</span>
          <span>{user._count.customers} customers</span>
          <span>{user._count.quotes} quotes</span>
          <span>{user._count.invoices} invoices</span>
          <span className="font-medium text-emerald-700">£{totalRevenue.toFixed(2)} total revenue</span>
        </div>

        <div className="mt-6 border-t border-stone-200 pt-6">
          <h3 className="text-sm font-semibold text-stone-900">Subscription</h3>
          {hasActiveSubscription(user.subscriptionStatus) ? (
            <p className="mt-2 text-sm text-stone-600">
              <span className={user.subscriptionStatus === "active" ? "text-emerald-600" : "text-amber-600"}>
                {user.subscriptionStatus}
              </span>
              {user.subscriptionAdminGranted && (
                <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">Admin-granted</span>
              )}
              {user.subscriptionCurrentPeriodEnd && (
                <> · Ends {new Date(user.subscriptionCurrentPeriodEnd).toLocaleDateString("en-GB")}</>
              )}
            </p>
          ) : (
            <p className="mt-2 text-sm text-stone-500">No active subscription</p>
          )}
          <div className="mt-3">
            <SubscriptionForm
              userId={user.id}
              hasSubscription={hasActiveSubscription(user.subscriptionStatus)}
              onGrant={grantSubscription}
              onRemove={removeSubscription}
            />
          </div>
          {subscriptionLogs.length > 0 && (
            <div className="mt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-stone-500">Audit log</h4>
              <ul className="mt-2 space-y-1 text-sm text-stone-600">
                {subscriptionLogs.map((log) => (
                  <li key={log.id}>
                    {log.action === "granted" ? (
                      <span>
                        <strong>{log.adminEmail}</strong> granted {log.plan} for {log.durationMonths} month{log.durationMonths === 1 ? "" : "s"} — {new Date(log.createdAt).toLocaleString("en-GB")}
                      </span>
                    ) : (
                      <span>
                        <strong>{log.adminEmail}</strong> removed subscription — {new Date(log.createdAt).toLocaleString("en-GB")}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-stone-900">Recent Quotes</h2>
          {recentQuotes.length === 0 ? (
            <p className="mt-4 text-sm text-stone-500">No quotes</p>
          ) : (
            <ul className="mt-4 divide-y divide-stone-100">
              {recentQuotes.map((q) => (
                <li key={q.id} className="flex items-center justify-between py-3">
                  <Link
                    href={`/dashboard/quotes/${q.id}`}
                    className="font-medium text-stone-900 hover:text-amber-600"
                  >
                    {q.number ?? "Quote"} — {q.customer.name}
                  </Link>
                  <span className="text-sm text-stone-600">£{q.total.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-stone-900">Recent Invoices</h2>
          {recentInvoices.length === 0 ? (
            <p className="mt-4 text-sm text-stone-500">No invoices</p>
          ) : (
            <ul className="mt-4 divide-y divide-stone-100">
              {recentInvoices.map((inv) => (
                <li key={inv.id} className="flex items-center justify-between py-3">
                  <Link
                    href={`/dashboard/invoices/${inv.id}`}
                    className="font-medium text-stone-900 hover:text-amber-600"
                  >
                    {inv.number ?? "Invoice"} — {inv.customer.name}
                  </Link>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-stone-600">£{inv.total.toFixed(2)}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        inv.paid ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {inv.paid ? "Paid" : "Unpaid"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

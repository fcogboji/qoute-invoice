import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/auth";
import ExportPdfButton from "./export-pdf-button";

export default async function QuotesPage() {
  const user = await getOrCreateUser();
  if (!user) return null;

  const quotes = await prisma.quote.findMany({
    where: { userId: user.id },
    include: { customer: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">Quotes</h1>
        <Link
          href="/dashboard/quotes/new"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg bg-amber-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-amber-700"
        >
          New Quote
        </Link>
      </div>

      {quotes.length === 0 ? (
        <div className="mt-12 rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 p-12 text-center">
          <p className="text-stone-600">No quotes yet.</p>
          <Link
            href="/dashboard/quotes/new"
            className="mt-4 inline-block font-medium text-amber-600 hover:underline"
          >
            Create your first quote
          </Link>
        </div>
      ) : (
        <div className="mt-6 sm:mt-8 overflow-x-auto rounded-xl border border-stone-200 bg-white  [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-stone-300">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">
                  Number
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">Total</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">Status</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">Date</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => (
                <tr
                  key={q.id}
                  className="border-b border-stone-100 hover:bg-stone-50"
                >
                  <td className="px-4 py-3 text-sm text-stone-600 sm:px-6 sm:py-4">
                    {q.number ?? "—"}
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4">
                    <Link
                      href={`/dashboard/quotes/${q.id}`}
                      className="font-medium text-stone-900 hover:text-amber-600"
                    >
                      {q.customer.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-medium sm:px-6 sm:py-4">£{q.total.toFixed(2)}</td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        q.status === "sent"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-stone-100 text-stone-700"
                      }`}
                    >
                      {q.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-stone-600 sm:px-6 sm:py-4">
                    {new Date(q.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-3 text-right sm:px-6 sm:py-4">
                    <ExportPdfButton quoteId={q.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

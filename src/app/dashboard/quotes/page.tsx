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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-stone-900">Quotes</h1>
        <Link
          href="/dashboard/quotes/new"
          className="rounded-lg bg-amber-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-amber-700"
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
        <div className="mt-8 overflow-hidden rounded-xl border border-stone-200 bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-stone-900">
                  Number
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-stone-900">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-stone-900">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-stone-900">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-stone-900">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-stone-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => (
                <tr
                  key={q.id}
                  className="border-b border-stone-100 hover:bg-stone-50"
                >
                  <td className="px-6 py-4 text-sm text-stone-600">
                    {q.number ?? "—"}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/quotes/${q.id}`}
                      className="font-medium text-stone-900 hover:text-amber-600"
                    >
                      {q.customer.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 font-medium">£{q.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
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
                  <td className="px-6 py-4 text-right text-sm text-stone-600">
                    {new Date(q.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-6 py-4 text-right">
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

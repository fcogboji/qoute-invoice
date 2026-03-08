import { seoKeywords } from "@/lib/seoKeywords";

const BASE = "https://tradeinvoice.co.uk";

export default function sitemap() {
  const seoPages = seoKeywords.map((keyword) => ({
    url: `${BASE}/seo/${keyword.replace(/\s+/g, "-").toLowerCase()}`,
    lastModified: new Date(),
  }));

  return [
    { url: BASE, lastModified: new Date() },
    { url: `${BASE}/about`, lastModified: new Date() },
    { url: `${BASE}/pricing`, lastModified: new Date() },
    { url: `${BASE}/contact`, lastModified: new Date() },
    { url: `${BASE}/features`, lastModified: new Date() },
    { url: `${BASE}/sign-in`, lastModified: new Date() },
    { url: `${BASE}/privacy`, lastModified: new Date() },
    { url: `${BASE}/terms`, lastModified: new Date() },
    { url: `${BASE}/cookies`, lastModified: new Date() },
    { url: `${BASE}/tools`, lastModified: new Date() },
    { url: `${BASE}/tools/invoice-generator`, lastModified: new Date() },
    { url: `${BASE}/tools/vat-calculator`, lastModified: new Date() },
    { url: `${BASE}/features/invoice-generator`, lastModified: new Date() },
    { url: `${BASE}/features/recurring-invoices`, lastModified: new Date() },
    { url: `${BASE}/use-cases/freelancers`, lastModified: new Date() },
    { url: `${BASE}/use-cases/small-business`, lastModified: new Date() },
    { url: `${BASE}/guides/how-to-create-an-invoice`, lastModified: new Date() },
    ...seoPages,
  ];
}

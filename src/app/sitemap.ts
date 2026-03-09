import { prisma } from "@/lib/prisma";
import { seoKeywords } from "@/lib/seoKeywords";

const BASE = "https://tradeinvoice.co.uk";

export default async function sitemap() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });
  const blogPages = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.updatedAt,
  }));
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
    { url: `${BASE}/use-cases/electricians`, lastModified: new Date() },
    { url: `${BASE}/use-cases/plumbers`, lastModified: new Date() },
    { url: `${BASE}/use-cases/carpenters`, lastModified: new Date() },
    { url: `${BASE}/use-cases/fitters`, lastModified: new Date() },
    { url: `${BASE}/use-cases/freelancers`, lastModified: new Date() },
    { url: `${BASE}/use-cases/small-business`, lastModified: new Date() },
    { url: `${BASE}/guides/how-to-create-an-invoice`, lastModified: new Date() },
    { url: `${BASE}/blog`, lastModified: new Date() },
    ...blogPages,
    ...seoPages,
  ];
}

import { prisma } from "@/lib/prisma";
import { seoKeywords } from "@/lib/seoKeywords";

const BASE = "https://tradeinvoice.co.uk";

export default async function sitemap() {
  let blogPages: { url: string; lastModified: Date }[] = [];
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    blogPages = posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.updatedAt,
    }));
  } catch {
    // If DB is unreachable, sitemap still returns static URLs
  }

  const seoPages = seoKeywords.map((keyword) => ({
    url: `${BASE}/seo/${keyword.replace(/\s+/g, "-").toLowerCase()}`,
  }));

  const staticPages = [
    { url: BASE },
    { url: `${BASE}/about` },
    { url: `${BASE}/pricing` },
    { url: `${BASE}/contact` },
    { url: `${BASE}/features` },
    { url: `${BASE}/privacy` },
    { url: `${BASE}/terms` },
    { url: `${BASE}/cookies` },
    { url: `${BASE}/tools` },
    { url: `${BASE}/tools/invoice-generator` },
    { url: `${BASE}/tools/vat-calculator` },
    { url: `${BASE}/features/invoice-generator` },
    { url: `${BASE}/features/recurring-invoices` },
    { url: `${BASE}/use-cases/electricians` },
    { url: `${BASE}/use-cases/plumbers` },
    { url: `${BASE}/use-cases/carpenters` },
    { url: `${BASE}/use-cases/fitters` },
    { url: `${BASE}/use-cases/freelancers` },
    { url: `${BASE}/use-cases/small-business` },
    { url: `${BASE}/guides/how-to-create-an-invoice` },
    { url: `${BASE}/blog` },
  ];

  return [...staticPages, ...blogPages, ...seoPages];
}

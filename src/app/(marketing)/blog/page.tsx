import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips and guides for UK tradespeople. Invoicing, quoting, VAT and getting paid.",
};

function getEmbedUrl(url: string | null): string | null {
  const u = url?.trim();
  if (!u) return null;
  if (u.includes("youtube.com/watch")) {
    const match = u.match(/[?&]v=([^&]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  }
  if (u.includes("youtube.com/shorts/")) {
    const match = u.match(/shorts\/([^?&/]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  }
  if (u.includes("youtu.be/")) {
    const match = u.match(/youtu\.be\/([^?&/]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  }
  if (u.includes("youtube.com/embed/") || u.includes("youtube-nocookie.com/embed/")) return u;
  if (u.includes("vimeo.com/")) {
    const match = u.match(/vimeo\.com\/(\d+)/);
    return match ? `https://player.vimeo.com/video/${match[1]}` : null;
  }
  if (u.includes("player.vimeo.com/video/")) return u;
  return null;
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });

  const dateFor = (p: { publishedAt: Date | null; createdAt: Date }) =>
    p.publishedAt ?? p.createdAt;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-bold text-[#0F2544] md:text-4xl">Blog</h1>
      <p className="mt-4 text-lg text-[#0F2544]/70">
        Tips, guides and updates for UK tradespeople. Invoicing, quoting and
        getting paid.
      </p>

      <div className="mt-12 space-y-8">
        {posts.map((post) => {
          const embedUrl = post.videoUrl ? getEmbedUrl(post.videoUrl) : null;
          return (
          <article
            key={post.id}
            className="rounded-xl border border-[#0F2544]/10 bg-white overflow-hidden transition-colors hover:border-[#0F2544]/20"
          >
            {embedUrl && (
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative w-full overflow-hidden bg-[#0F2544]/5" style={{ aspectRatio: "16/9" }}>
                  <iframe
                    src={embedUrl}
                    title={post.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full pointer-events-none"
                  />
                </div>
              </Link>
            )}
            <div className="p-6">
            <Link href={`/blog/${post.slug}`} className="block">
              <h2 className="text-xl font-semibold text-[#0F2544] hover:text-[#00C6A2]">
                {post.title}
              </h2>
            </Link>
            <p className="mt-2 text-sm text-[#0F2544]/60">
              {new Date(dateFor(post)).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="mt-2 text-[#0F2544]/70">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-4 inline-block text-sm font-medium text-[#00C6A2] hover:text-[#00A3FF]"
            >
              Read more →
            </Link>
            </div>
          </article>
          );
        })}
      </div>

      {posts.length === 0 && (
        <div className="mt-12 rounded-xl border-2 border-dashed border-[#0F2544]/20 bg-white p-12 text-center">
          <p className="text-[#0F2544]/70">No posts yet. Check back soon.</p>
        </div>
      )}

      <div className="mt-12">
        <Link
          href="/"
          className="text-sm font-medium text-[#0F2544]/70 hover:text-[#0F2544]"
        >
          ← Back to TradeInvoice
        </Link>
      </div>
    </div>
  );
}

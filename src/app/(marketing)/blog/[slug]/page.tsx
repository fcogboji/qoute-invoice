import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ slug: string }> };

function getEmbedUrl(url: string): string | null {
  const u = url?.trim();
  if (!u) return null;
  // YouTube watch
  if (u.includes("youtube.com/watch")) {
    const match = u.match(/[?&]v=([^&]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  }
  // YouTube Shorts
  if (u.includes("youtube.com/shorts/")) {
    const match = u.match(/shorts\/([^?&/]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  }
  // youtu.be
  if (u.includes("youtu.be/")) {
    const match = u.match(/youtu\.be\/([^?&/]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  }
  // Already YouTube embed
  if (u.includes("youtube.com/embed/") || u.includes("youtube-nocookie.com/embed/")) {
    return u;
  }
  // Vimeo
  if (u.includes("vimeo.com/")) {
    const match = u.match(/vimeo\.com\/(\d+)/);
    return match ? `https://player.vimeo.com/video/${match[1]}` : null;
  }
  // Already Vimeo embed
  if (u.includes("player.vimeo.com/video/")) {
    return u;
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug, published: true },
  });
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug, published: true },
  });
  if (!post) notFound();

  const embedUrl = post.videoUrl ? getEmbedUrl(post.videoUrl) : null;
  const date = post.publishedAt ?? post.createdAt;

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <Link
        href="/blog"
        className="mb-8 inline-block text-sm font-medium text-[#0F2544]/70 hover:text-[#0F2544]"
      >
        ← Blog
      </Link>

      <h1 className="text-3xl font-bold text-[#0F2544] md:text-4xl">
        {post.title}
      </h1>
      <p className="mt-4 text-sm text-[#0F2544]/60">
        {new Date(date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        {post.author && ` · ${post.author}`}
      </p>

      {embedUrl && (
        <div className="relative mt-8 w-full overflow-hidden rounded-xl bg-[#0F2544]/5" style={{ aspectRatio: "16/9" }}>
          <iframe
            src={embedUrl}
            title={post.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      )}

      <div
        className="prose prose-stone mt-8 max-w-none prose-p:mt-4 prose-p:text-[#0F2544]/80 prose-ul:mt-4 prose-li:text-[#0F2544]/80 prose-strong:text-[#0F2544]"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-12 flex gap-4">
        <Link
          href="/blog"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[#0F2544]/20 px-6 py-3 font-medium text-[#0F2544] transition-colors hover:bg-[#0F2544]/5"
        >
          All posts
        </Link>
        <Link
          href="/sign-up?redirect_url=%2Fpricing"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#0F2544] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1A3A6E]"
        >
          Start free trial
        </Link>
      </div>
    </article>
  );
}

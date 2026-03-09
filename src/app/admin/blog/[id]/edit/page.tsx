import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateBlogPost } from "../../actions";

export default async function AdminBlogEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  const publishedAtValue =
    post.publishedAt?.toISOString().slice(0, 16) ?? "";

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/blog" className="text-sm font-medium text-stone-600 hover:text-stone-900">
          ← Blog
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-stone-900 sm:text-3xl">Edit: {post.title}</h1>
      </div>

      <form action={updateBlogPost.bind(null, id)} className="space-y-6 max-w-2xl">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-stone-700">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={post.title}
            className="mt-1 block w-full min-h-[44px] rounded-lg border border-stone-300 px-4 py-2 text-stone-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-stone-700">
            Slug (URL)
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            required
            defaultValue={post.slug}
            className="mt-1 block w-full min-h-[44px] rounded-lg border border-stone-300 px-4 py-2 text-stone-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-stone-700">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={3}
            required
            defaultValue={post.excerpt}
            className="mt-1 block w-full rounded-lg border border-stone-300 px-4 py-2 text-stone-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-stone-700">
            Content (HTML)
          </label>
          <textarea
            id="content"
            name="content"
            rows={12}
            required
            defaultValue={post.content}
            className="mt-1 block w-full rounded-lg border border-stone-300 px-4 py-2 font-mono text-sm text-stone-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div>
          <label htmlFor="videoUrl" className="block text-sm font-medium text-stone-700">
            Video URL (YouTube or Vimeo)
          </label>
          <input
            id="videoUrl"
            name="videoUrl"
            type="url"
            defaultValue={post.videoUrl ?? ""}
            placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
            className="mt-1 block w-full min-h-[44px] rounded-lg border border-stone-300 px-4 py-2 text-stone-900 placeholder:text-stone-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-stone-700">
            Author
          </label>
          <input
            id="author"
            name="author"
            type="text"
            defaultValue={post.author ?? ""}
            placeholder="TradeInvoice"
            className="mt-1 block w-full min-h-[44px] rounded-lg border border-stone-300 px-4 py-2 text-stone-900 placeholder:text-stone-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div>
          <label htmlFor="publishedAt" className="block text-sm font-medium text-stone-700">
            Published date (optional)
          </label>
          <input
            id="publishedAt"
            name="publishedAt"
            type="datetime-local"
            defaultValue={publishedAtValue}
            className="mt-1 block w-full min-h-[44px] rounded-lg border border-stone-300 px-4 py-2 text-stone-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="published"
            name="published"
            type="checkbox"
            defaultChecked={post.published}
            className="h-4 w-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
          />
          <label htmlFor="published" className="text-sm font-medium text-stone-700">
            Published (visible on blog)
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-stone-900 px-4 py-2 font-medium text-white hover:bg-stone-800"
          >
            Save
          </button>
          <Link
            href="/admin/blog"
            className="rounded-lg border border-stone-300 px-4 py-2 font-medium text-stone-700 hover:bg-stone-100"
          >
            Cancel
          </Link>
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            className="rounded-lg border border-stone-300 px-4 py-2 font-medium text-stone-700 hover:bg-stone-100"
          >
            View post →
          </Link>
        </div>
      </form>
    </div>
  );
}

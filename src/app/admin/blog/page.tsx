import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteBlogPost } from "./actions";
import { DeleteButton } from "./delete-button";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">Blog</h1>
          <p className="mt-2 text-stone-600">Manage blog posts.</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="rounded-lg bg-stone-900 px-4 py-2 font-medium text-white hover:bg-stone-800"
        >
          New post
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">Title</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">Slug</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">Status</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-stone-900 sm:px-6 sm:py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-stone-100 hover:bg-stone-50">
                <td className="px-4 py-3 sm:px-6 sm:py-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-medium text-stone-900 hover:text-amber-600"
                    target="_blank"
                  >
                    {post.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-stone-600 sm:px-6 sm:py-4 font-mono text-sm">{post.slug}</td>
                <td className="px-4 py-3 sm:px-6 sm:py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      post.published ? "bg-emerald-100 text-emerald-800" : "bg-stone-200 text-stone-700"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right sm:px-6 sm:py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/blog/${post.id}/edit`}
                      className="rounded-lg border border-stone-300 px-3 py-1.5 text-sm font-medium text-stone-700 hover:bg-stone-100"
                    >
                      Edit
                    </Link>
                    <form action={deleteBlogPost.bind(null, post.id)} className="inline">
                      <DeleteButton />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {posts.length === 0 && (
        <div className="mt-8 rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 p-12 text-center">
          <p className="mb-4 text-stone-600">No blog posts yet.</p>
          <Link
            href="/admin/blog/new"
            className="inline-flex rounded-lg bg-stone-900 px-4 py-2 font-medium text-white hover:bg-stone-800"
          >
            Create first post
          </Link>
        </div>
      )}
    </div>
  );
}

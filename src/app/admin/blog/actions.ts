"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isPlatformAdmin } from "@/lib/admin";

async function guard() {
  if (!(await isPlatformAdmin())) {
    throw new Error("Unauthorized");
  }
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createBlogPost(formData: FormData) {
  await guard();
  const title = (formData.get("title") as string)?.trim();
  const excerpt = (formData.get("excerpt") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();
  const slug = slugify((formData.get("slug") as string) || title || "untitled");
  const videoUrl = (formData.get("videoUrl") as string)?.trim() || null;
  const author = (formData.get("author") as string)?.trim() || null;
  const published = formData.get("published") === "on";
  const publishedAtRaw = (formData.get("publishedAt") as string)?.trim();

  if (!title || !excerpt || !content) {
    throw new Error("Title, excerpt and content are required");
  }

  const publishedAt = publishedAtRaw ? new Date(publishedAtRaw) : null;

  await prisma.blogPost.create({
    data: {
      slug: slug || "untitled-" + Date.now(),
      title,
      excerpt,
      content,
      videoUrl,
      author,
      published,
      publishedAt,
    },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/sitemap.xml");
  redirect("/admin/blog");
}

export async function updateBlogPost(id: string, formData: FormData) {
  await guard();
  const title = (formData.get("title") as string)?.trim();
  const excerpt = (formData.get("excerpt") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();
  const slug = slugify((formData.get("slug") as string) || title || "untitled");
  const videoUrl = (formData.get("videoUrl") as string)?.trim() || null;
  const author = (formData.get("author") as string)?.trim() || null;
  const published = formData.get("published") === "on";
  const publishedAtRaw = (formData.get("publishedAt") as string)?.trim();

  if (!title || !excerpt || !content) {
    throw new Error("Title, excerpt and content are required");
  }

  const publishedAt = publishedAtRaw ? new Date(publishedAtRaw) : null;

  await prisma.blogPost.update({
    where: { id },
    data: {
      slug: slug || "untitled-" + Date.now(),
      title,
      excerpt,
      content,
      videoUrl,
      author,
      published,
      publishedAt,
    },
  });

  revalidatePath("/blog");
  revalidatePath("/blog/[slug]");
  revalidatePath("/admin/blog");
  revalidatePath("/sitemap.xml");
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  await guard();
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/sitemap.xml");
  redirect("/admin/blog");
}

import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { BlogPostForm, type SerializedBlogPost } from "@/components/admin/BlogPostForm";

type Props = { params: Promise<{ id: string }> };

function serialize(post: NonNullable<Awaited<ReturnType<typeof prisma.blogPost.findUnique>>>): SerializedBlogPost {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: post.coverImage,
    category: post.category,
    authorName: post.authorName,
    status: post.status,
    publishedAt: post.publishedAt?.toISOString() ?? null,
    metaTitle: post.metaTitle,
    metaDesc: post.metaDesc,
    isFeatured: post.isFeatured,
  };
}

export default async function AdminBlogEditorPage({ params }: Props) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div className="w-full min-w-0">
      <Link href="/admin/blog" className="text-xs uppercase tracking-wider text-[#D3AE6E] hover:underline">
        ← Blog
      </Link>
      <h1 className="mt-4 break-words font-headline text-2xl text-white sm:text-3xl">Editar entrada</h1>
      <p className="mt-2 text-sm text-white/50">{post.title}</p>
      <div className="mt-8">
        <BlogPostForm post={serialize(post)} />
      </div>
    </div>
  );
}

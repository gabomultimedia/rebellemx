import Link from "next/link";
import { BlogPostForm } from "@/components/admin/BlogPostForm";

export default function AdminBlogNewPage() {
  return (
    <div className="w-full min-w-0">
      <Link href="/admin/blog" className="text-xs uppercase tracking-wider text-[#D3AE6E] hover:underline">
        ← Blog
      </Link>
      <h1 className="mt-4 font-headline text-2xl text-white sm:text-3xl">Nueva entrada</h1>
      <p className="mt-2 text-sm text-white/50">Al guardar se crea el borrador o publicación según el estado elegido.</p>
      <div className="mt-8">
        <BlogPostForm post={null} />
      </div>
    </div>
  );
}

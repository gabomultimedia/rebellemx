import Link from "next/link";
import prisma from "@/lib/prisma";
import { blogCategoryLabel } from "@/lib/blog";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" }, take: 80 });

  return (
    <div className="w-full min-w-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-headline text-2xl text-white sm:text-3xl">Blog / Journal</h1>
          <p className="mt-2 max-w-xl text-sm text-white/50">
            Las entradas publicadas aparecen en <span className="text-[#D3AE6E]">/journal</span>. Borradores y programadas solo se ven aquí.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/journal"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 px-4 py-2 text-center font-label text-xs uppercase tracking-wider text-white/80 hover:border-[#D3AE6E] hover:text-[#D3AE6E]"
          >
            Ver sitio
          </Link>
          <Link
            href="/admin/blog/nuevo"
            className="bg-[#785915] px-4 py-2 text-center font-label text-xs uppercase tracking-wider text-white hover:bg-[#8f6b1a]"
          >
            Nueva entrada
          </Link>
        </div>
      </div>

      <ul className="mt-8 space-y-3">
        {posts.map((p) => (
          <li
            key={p.id}
            className="flex flex-col gap-3 border-b border-white/10 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-white">{p.title}</p>
              <p className="mt-1 text-xs text-white/45">
                /journal/{p.slug} · {blogCategoryLabel(p.category)}
                {p.isFeatured ? <span className="ml-2 text-[#D3AE6E]">★ Destacado</span> : null}
              </p>
            </div>
            <div className="flex flex-shrink-0 items-center gap-3 sm:gap-4">
              <span className="rounded-sm bg-white/10 px-2 py-1 font-mono text-[10px] uppercase text-white/60">{p.status}</span>
              <Link href={`/admin/blog/${p.id}`} className="whitespace-nowrap text-sm text-[#D3AE6E] hover:underline">
                Editar
              </Link>
            </div>
          </li>
        ))}
      </ul>
      {posts.length === 0 ? <p className="mt-8 text-sm text-white/50">No hay entradas. Crea la primera.</p> : null}
    </div>
  );
}

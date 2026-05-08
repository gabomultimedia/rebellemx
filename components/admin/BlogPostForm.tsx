"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Link from "next/link";
import { BlogCategory, PostStatus } from "@prisma/client";
import { slugifyTitle } from "@/lib/blog";

export type SerializedBlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  category: BlogCategory;
  authorName: string;
  status: PostStatus;
  publishedAt: string | null;
  metaTitle: string | null;
  metaDesc: string | null;
  isFeatured: boolean;
};

type FormValues = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: BlogCategory;
  authorName: string;
  status: PostStatus;
  publishedAt: string;
  metaTitle: string;
  metaDesc: string;
  isFeatured: boolean;
};

const empty: FormValues = {
  id: "",
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  category: BlogCategory.TREND_ALERT,
  authorName: "Editorial Rebelle",
  status: PostStatus.DRAFT,
  publishedAt: "",
  metaTitle: "",
  metaDesc: "",
  isFeatured: false,
};

function postToValues(post: SerializedBlogPost | null): FormValues {
  if (!post) return empty;
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? "",
    content: post.content,
    coverImage: post.coverImage ?? "",
    category: post.category,
    authorName: post.authorName,
    status: post.status,
    publishedAt: post.publishedAt ? post.publishedAt.slice(0, 16) : "",
    metaTitle: post.metaTitle ?? "",
    metaDesc: post.metaDesc ?? "",
    isFeatured: post.isFeatured,
  };
}

type Props = { post: SerializedBlogPost | null };

export function BlogPostForm({ post }: Props) {
  const router = useRouter();
  const isNew = !post;
  const [v, setV] = useState<FormValues>(() => postToValues(post));
  const [err, setErr] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const set = useCallback(<K extends keyof FormValues>(key: K, val: FormValues[K]) => {
    setV((prev) => ({ ...prev, [key]: val }));
  }, []);

  const genSlug = () => {
    if (v.title.trim()) set("slug", slugifyTitle(v.title));
  };

  async function save() {
    setErr(null);
    setSaving(true);
    try {
      const payload = {
        title: v.title.trim(),
        slug: v.slug.trim().toLowerCase(),
        excerpt: v.excerpt.trim() || null,
        content: v.content,
        coverImage: v.coverImage.trim() || null,
        category: v.category,
        authorName: v.authorName.trim(),
        status: v.status,
        publishedAt: v.publishedAt || null,
        metaTitle: v.metaTitle.trim() || null,
        metaDesc: v.metaDesc.trim() || null,
        isFeatured: v.isFeatured,
      };

      const url = isNew ? "/api/admin/blog" : `/api/admin/blog/${v.id}`;
      const res = await fetch(url, {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(typeof data.error === "string" ? data.error : "Error al guardar");
        return;
      }
      if (isNew && data.id) {
        router.push(`/admin/blog/${data.id}`);
        router.refresh();
        return;
      }
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!v.id || !confirm("¿Eliminar esta entrada del blog?")) return;
    setSaving(true);
    setErr(null);
    try {
      const res = await fetch(`/api/admin/blog/${v.id}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErr(typeof data.error === "string" ? data.error : "Error al eliminar");
        return;
      }
      router.push("/admin/blog");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 px-1">
      {err ? <p className="rounded-sm border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{err}</p> : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex min-w-0 flex-col gap-2 text-sm text-white/70">
          Título
          <input
            className="min-w-0 border border-white/15 bg-black/40 px-3 py-2 text-white"
            value={v.title}
            onChange={(e) => set("title", e.target.value)}
          />
        </label>
        <label className="flex min-w-0 flex-col gap-2 text-sm text-white/70">
          <span className="flex flex-wrap items-center justify-between gap-2">
            Slug (URL)
            <button type="button" onClick={genSlug} className="text-xs uppercase tracking-wider text-[#D3AE6E] hover:underline">
              Generar desde título
            </button>
          </span>
          <input
            className="min-w-0 border border-white/15 bg-black/40 px-3 py-2 text-white"
            value={v.slug}
            onChange={(e) => set("slug", e.target.value)}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm text-white/70">
        Resumen (excerpt)
        <textarea
          className="min-h-[100px] border border-white/15 bg-black/40 px-3 py-2 text-white"
          value={v.excerpt}
          onChange={(e) => set("excerpt", e.target.value)}
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-white/70">
        Contenido (HTML)
        <textarea
          className="min-h-[min(50vh,420px)] border border-white/15 bg-black/40 px-3 py-2 font-mono text-sm text-white"
          value={v.content}
          onChange={(e) => set("content", e.target.value)}
        />
        <span className="text-xs text-white/40">
          Se muestra en el Journal como HTML. Usa &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, enlaces, etc.
        </span>
      </label>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex min-w-0 flex-col gap-2 text-sm text-white/70">
          Imagen de portada (URL)
          <input
            className="min-w-0 border border-white/15 bg-black/40 px-3 py-2 text-white"
            value={v.coverImage}
            onChange={(e) => set("coverImage", e.target.value)}
            placeholder="https://..."
          />
        </label>
        <label className="flex min-w-0 flex-col gap-2 text-sm text-white/70">
          Autor (nombre visible)
          <input
            className="min-w-0 border border-white/15 bg-black/40 px-3 py-2 text-white"
            value={v.authorName}
            onChange={(e) => set("authorName", e.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-white/70">
          Categoría
          <select
            className="border border-white/15 bg-black/40 px-3 py-2 text-white"
            value={v.category}
            onChange={(e) => set("category", e.target.value as BlogCategory)}
          >
            {Object.values(BlogCategory).map((c) => (
              <option key={c} value={c}>
                {c.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm text-white/70">
          Estado
          <select
            className="border border-white/15 bg-black/40 px-3 py-2 text-white"
            value={v.status}
            onChange={(e) => set("status", e.target.value as PostStatus)}
          >
            {Object.values(PostStatus).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex min-w-0 flex-col gap-2 text-sm text-white/70">
          Publicado el (opcional)
          <input
            type="datetime-local"
            className="min-w-0 border border-white/15 bg-black/40 px-3 py-2 text-white"
            value={v.publishedAt}
            onChange={(e) => set("publishedAt", e.target.value)}
          />
        </label>
        <label className="mt-0 flex cursor-pointer items-center gap-3 self-center text-sm text-white/80 sm:mt-8">
          <input type="checkbox" checked={v.isFeatured} onChange={(e) => set("isFeatured", e.target.checked)} className="h-4 w-4 shrink-0" />
          Destacar en portada del Journal
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex min-w-0 flex-col gap-2 text-sm text-white/70">
          Meta título (SEO)
          <input
            className="min-w-0 border border-white/15 bg-black/40 px-3 py-2 text-white"
            value={v.metaTitle}
            onChange={(e) => set("metaTitle", e.target.value)}
          />
        </label>
        <label className="flex min-w-0 flex-col gap-2 text-sm text-white/70">
          Meta descripción (SEO)
          <textarea
            className="min-h-[80px] border border-white/15 bg-black/40 px-3 py-2 text-white"
            value={v.metaDesc}
            onChange={(e) => set("metaDesc", e.target.value)}
          />
        </label>
      </div>

      <div className="flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:flex-wrap sm:items-center">
        <button
          type="button"
          disabled={saving}
          onClick={save}
          className="bg-[#785915] px-8 py-3 font-label text-xs uppercase tracking-wider text-white hover:bg-[#8f6b1a] disabled:opacity-50"
        >
          {saving ? "Guardando…" : "Guardar"}
        </button>
        {!isNew ? (
          <>
            <button
              type="button"
              disabled={saving}
              onClick={remove}
              className="border border-red-500/50 px-8 py-3 font-label text-xs uppercase tracking-wider text-red-300 hover:bg-red-500/10 disabled:opacity-50"
            >
              Eliminar
            </button>
            {v.status === PostStatus.PUBLISHED ? (
              <Link
                href={`/journal/${v.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center font-label text-xs uppercase tracking-wider text-[#D3AE6E] hover:underline sm:ml-2"
              >
                Ver en Journal →
              </Link>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
}

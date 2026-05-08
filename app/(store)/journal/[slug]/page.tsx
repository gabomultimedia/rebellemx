import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { PostStatus } from "@prisma/client";
import { blogCategoryLabel, estimateReadMinutesFromHtml } from "@/lib/blog";
import { resolveJournalCover } from "@/lib/store-images";

type Props = { params: Promise<{ slug: string }> };

function formatJournalDate(d: Date | null) {
  if (!d) return "";
  return new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "long", year: "numeric" }).format(d);
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findFirst({
    where: { slug, status: PostStatus.PUBLISHED },
    select: { title: true, metaTitle: true, metaDesc: true, excerpt: true },
  });
  if (!post) return { title: "Journal" };
  return {
    title: post.metaTitle ?? post.title,
    description: post.metaDesc ?? post.excerpt ?? undefined,
  };
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findFirst({
    where: { slug, status: PostStatus.PUBLISHED },
  });
  if (!post) notFound();

  const mins = estimateReadMinutesFromHtml(post.content);
  const hero = resolveJournalCover(post.coverImage, post.slug, post.title);

  return (
    <article className="pb-20">
      <div className="mx-auto max-w-[900px] px-4 pt-4 sm:px-6 md:pt-8">
        <Link
          href="/journal"
          className="inline-block font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant transition-colors hover:text-primary sm:text-xs"
        >
          ← Journal
        </Link>
      </div>

      <header className="mx-auto mt-6 max-w-[900px] px-4 sm:mt-8 sm:px-6">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-primary sm:text-xs">
          <span>{blogCategoryLabel(post.category)}</span>
          {post.publishedAt ? (
            <>
              <span className="text-outline" aria-hidden>
                ·
              </span>
              <span className="text-on-surface-variant">{formatJournalDate(post.publishedAt)}</span>
            </>
          ) : null}
          <span className="text-outline" aria-hidden>
            ·
          </span>
          <span className="text-on-surface-variant">{mins} min lectura</span>
        </div>
        <h1 className="font-headline text-3xl font-light leading-tight tracking-tight text-on-surface sm:text-4xl md:text-5xl lg:text-6xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-on-surface-variant sm:text-base">Por {post.authorName}</p>
      </header>

      <div className="relative mx-auto mt-10 aspect-[16/10] max-w-[1100px] overflow-hidden px-4 sm:px-6">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          quality={90}
          className="object-cover"
          sizes="(max-width:1100px) 100vw, 1100px"
          priority
        />
      </div>

      <div
        className="journal-prose mx-auto mt-10 max-w-[720px] px-4 pb-12 text-on-surface sm:px-6 sm:pb-16"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}

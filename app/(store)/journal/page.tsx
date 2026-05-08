import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { PostStatus, BlogCategory } from "@prisma/client";
import { blogCategoryLabel, estimateReadMinutesFromHtml } from "@/lib/blog";
import { resolveJournalCover } from "@/lib/store-images";

export const metadata = { title: "Journal | Rebelle" };

function formatJournalDate(d: Date | null) {
  if (!d) return "";
  return new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "short", year: "numeric" }).format(d);
}

type SearchProps = { searchParams: Promise<{ c?: string; q?: string }> };

export default async function JournalPage({ searchParams }: SearchProps) {
  const { c: catParam, q: qParam } = await searchParams;
  const q = qParam?.trim() ?? "";
  const catOk = catParam && Object.values(BlogCategory).includes(catParam as BlogCategory);
  const categoryFilter = catOk ? (catParam as BlogCategory) : undefined;

  const posts = await prisma.blogPost.findMany({
    where: {
      status: PostStatus.PUBLISHED,
      ...(categoryFilter ? { category: categoryFilter } : {}),
      ...(q
        ? {
            OR: [
              { title: { contains: q } },
              { excerpt: { contains: q } },
            ],
          }
        : {}),
    },
    orderBy: [{ isFeatured: "desc" }, { publishedAt: "desc" }],
  });

  if (posts.length === 0) {
    return (
      <div className="min-h-[50vh] px-4 py-16 text-center sm:px-6">
        <header className="mx-auto max-w-[1920px] border-b border-outline-variant/20 px-2 pb-10 pt-6 md:pb-12 md:pt-10">
          <h1 className="parallax-header font-headline text-4xl font-light text-on-surface sm:text-6xl md:text-8xl">Journal Rebelle</h1>
          <p className="mt-3 font-label text-xs uppercase tracking-[0.3em] text-primary sm:text-sm">Crónicas de Estilo, Poder y Alta Costura</p>
          <p className="mx-auto mt-6 max-w-2xl font-body text-sm leading-relaxed text-on-surface-variant sm:text-base">
            Tu dosis semanal de inspiración estratégica. Desde las últimas tendencias en las pasarelas europeas hasta consejos de ingeniería de imagen para tus eventos
            más importantes.
          </p>
          <ul className="mx-auto mt-8 max-w-xl list-none space-y-2 text-left text-sm text-on-surface-variant">
            <li>
              <span className="font-label text-primary">Trend Alert:</span> Análisis de lo que viene en la moda global.
            </li>
            <li>
              <span className="font-label text-primary">Estrategia Rebelle:</span> Tips de psicología del color, etiqueta y fisonomía.
            </li>
            <li>
              <span className="font-label text-primary">Behind the Seams:</span> El diario de viaje de Thalia y el proceso de curaduría internacional.
            </li>
          </ul>
        </header>
        <p className="mx-auto mt-16 max-w-md text-on-surface-variant">
          {q || categoryFilter
            ? "No hay crónicas con estos filtros. Prueba otra categoría o búsqueda."
            : "Próximamente nuevas crónicas. Vuelve pronto."}
        </p>
        <Link href="/journal" className="mt-8 inline-block font-label text-xs uppercase tracking-wider text-primary hover:underline">
          Ver todo el journal
        </Link>
      </div>
    );
  }

  const featured = posts.find((p) => p.isFeatured) ?? posts[0];
  const gridPosts = featured ? posts.filter((p) => p.id !== featured.id) : [];
  const featuredCover = featured ? resolveJournalCover(featured.coverImage, featured.slug, featured.title) : null;

  const filterLinkClass = (active: boolean) =>
    `font-label text-[11px] uppercase tracking-[0.2em] transition-colors ${
      active ? "border-b border-primary pb-1 text-primary" : "text-outline hover:text-primary"
    }`;

  return (
    <div className="min-h-screen">
      <header className="mx-auto max-w-[1920px] border-b border-outline-variant/20 px-4 pb-10 pt-6 text-center sm:px-6 md:px-8 md:pb-12 md:pt-10">
        <h1 className="parallax-header font-headline text-4xl font-light tracking-tight text-on-surface sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
          Journal Rebelle
        </h1>
        <p className="mt-3 font-label text-xs font-semibold uppercase tracking-[0.3em] text-primary sm:text-sm">
          Crónicas de Estilo, Poder y Alta Costura
        </p>
        <p className="mx-auto mt-6 max-w-2xl font-body text-sm leading-relaxed text-on-surface-variant sm:text-base md:text-lg">
          Tu dosis semanal de inspiración estratégica. Desde las últimas tendencias en las pasarelas europeas hasta consejos de ingeniería de imagen para tus eventos más
          importantes.
        </p>
        <ul className="mx-auto mt-8 max-w-xl list-none space-y-3 text-left font-body text-sm text-on-surface-variant sm:mt-10 sm:text-base">
          <li>
            <span className="font-label text-primary">Trend Alert:</span> Análisis de lo que viene en la moda global.
          </li>
          <li>
            <span className="font-label text-primary">Estrategia Rebelle:</span> Tips de psicología del color, etiqueta y fisonomía.
          </li>
          <li>
            <span className="font-label text-primary">Behind the Seams:</span> El diario de viaje de Thalia y el proceso de curaduría internacional.
          </li>
        </ul>
      </header>

      {featured && featuredCover ? (
        <section className="mx-auto max-w-[1920px] px-4 py-12 sm:px-6 md:px-8 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="group relative overflow-hidden lg:col-span-7">
              <div className="relative aspect-[4/5] w-full sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[16/10]">
                <Image
                  src={featuredCover.src}
                  alt={featuredCover.alt}
                  fill
                  quality={90}
                  className="object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                  sizes="(max-width:1024px) 100vw, 58vw"
                  priority
                />
              </div>
              <div className="absolute left-4 top-4 sm:left-8 sm:top-8">
                <span className="bg-primary px-3 py-1 font-label text-[10px] uppercase tracking-[0.2em] text-on-primary sm:px-4">
                  Post destacado
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-6 lg:col-span-5 lg:space-y-8 lg:pl-8 xl:pl-12">
              <div className="space-y-3 sm:space-y-4">
                <span className="font-label text-xs uppercase tracking-[0.2em] text-outline">
                  {blogCategoryLabel(featured.category)} — {formatJournalDate(featured.publishedAt)}
                </span>
                <h2 className="font-headline text-3xl font-light leading-tight text-on-surface sm:text-4xl md:text-5xl lg:text-6xl">
                  {featured.title}
                </h2>
                {featured.excerpt ? (
                  <p className="max-w-md font-body text-base leading-relaxed text-secondary sm:text-lg">{featured.excerpt}</p>
                ) : null}
              </div>
              <div>
                <Link
                  href={`/journal/${featured.slug}`}
                  className="group inline-flex items-center gap-3 border-b border-primary pb-2 sm:gap-4"
                >
                  <span className="font-label text-sm uppercase tracking-[0.2em] text-on-surface">Leer crónica</span>
                  <span className="text-primary transition-transform group-hover:translate-x-2" aria-hidden>
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="sticky top-20 z-30 border-y border-outline-variant/20 bg-surface/95 py-4 backdrop-blur-md md:top-20 md:py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-stretch gap-4 px-4 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-6 md:px-8">
          <div className="hide-scrollbar flex flex-wrap justify-center gap-6 md:gap-12">
            <Link href="/journal" className={filterLinkClass(!categoryFilter)}>
              Ver todo
            </Link>
            {Object.values(BlogCategory).map((c) => (
              <Link
                key={c}
                href={q ? `/journal?c=${c}&q=${encodeURIComponent(q)}` : `/journal?c=${c}`}
                className={filterLinkClass(categoryFilter === c)}
              >
                {blogCategoryLabel(c)}
              </Link>
            ))}
          </div>
          <form action="/journal" method="get" className="relative w-full md:max-w-xs md:flex-shrink-0">
            {categoryFilter ? <input type="hidden" name="c" value={categoryFilter} /> : null}
            <input
              name="q"
              defaultValue={q}
              placeholder="Buscar crónica…"
              className="w-full border-0 border-b border-outline-variant bg-transparent py-2 pr-10 font-label text-[10px] uppercase tracking-[0.2em] text-on-surface placeholder:text-outline-variant focus:border-primary focus:outline-none focus:ring-0"
            />
            <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary" aria-label="Buscar">
              ⌕
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-[1920px] px-4 py-16 sm:px-6 md:px-8 md:py-24">
        {gridPosts.length === 0 && featured ? (
          <p className="text-center text-on-surface-variant">No hay más entradas con estos filtros.</p>
        ) : null}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-x-12 md:gap-y-20 lg:grid-cols-3 lg:gap-y-24">
          {gridPosts.map((post, idx) => {
            const mins = estimateReadMinutesFromHtml(post.content);
            const cover = resolveJournalCover(post.coverImage, post.slug, post.title);
            return (
              <article key={post.id} className={`group space-y-6 sm:space-y-8 ${idx % 3 === 1 ? "md:mt-16 lg:mt-24" : ""}`}>
                <Link href={`/journal/${post.slug}`} className="block overflow-hidden">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={cover.src}
                      alt={cover.alt}
                      fill
                      quality={88}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                </Link>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-label text-[10px] uppercase tracking-[0.2em] text-primary">{blogCategoryLabel(post.category)}</span>
                    <span className="font-label text-[10px] uppercase tracking-[0.2em] text-outline">{mins} min lectura</span>
                  </div>
                  <Link href={`/journal/${post.slug}`}>
                    <h3 className="font-headline text-2xl font-light text-on-surface transition-colors group-hover:text-primary sm:text-3xl">
                      {post.title}
                    </h3>
                  </Link>
                  {post.excerpt ? <p className="font-body text-sm leading-relaxed text-secondary">{post.excerpt}</p> : null}
                  <Link
                    href={`/journal/${post.slug}`}
                    className="inline-block border-b border-outline-variant pt-2 font-label text-[10px] uppercase tracking-[0.2em] transition-colors hover:border-primary"
                  >
                    Continuar lectura
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-surface-container-low px-4 py-20 sm:px-6 md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl space-y-8 text-center md:space-y-12">
          <div className="space-y-3 md:space-y-4">
            <span className="font-label text-[10px] uppercase tracking-[0.4em] text-primary">El newsletter</span>
            <h2 className="font-headline text-3xl font-light text-on-surface md:text-5xl">Suscríbase a la exclusividad</h2>
            <p className="mx-auto max-w-lg font-body leading-relaxed text-secondary">
              Crónicas de alta costura y alertas de tendencias. Escríbenos desde contacto para unirte a la lista VIP.
            </p>
          </div>
          <Link
            href="/contacto"
            className="inline-block bg-primary px-8 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-on-primary transition-colors hover:bg-on-surface hover:text-surface"
          >
            Ir a contacto
          </Link>
        </div>
      </section>
    </div>
  );
}

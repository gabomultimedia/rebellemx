import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { BoutiqueProductCard, type BoutiqueCardProduct } from "@/components/store/BoutiqueProductCard";
import { RebelleImg } from "@/lib/rebelle-images";

type Props = { searchParams: Promise<{ c?: string }> };

export default async function BoutiquePage({ searchParams }: Props) {
  const { c: categorySlug } = await searchParams;
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
  const cat = categorySlug ? categories.find((x) => x.slug === categorySlug) : null;

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      ...(cat ? { categoryId: cat.id } : {}),
    },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });

  const cards: BoutiqueCardProduct[] = products.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    badge: p.badge,
    isFeatured: p.isFeatured,
    images: p.images.map((i) => ({ url: i.url, altText: i.altText })),
  }));

  return (
    <>
      <div className="border-b border-outline-variant/20 bg-surface-container-low px-5 py-4 text-center sm:px-6 md:py-5">
        <p className="font-headline text-lg text-on-surface sm:text-xl md:text-2xl">Diseña tu Impacto.</p>
        <p className="mt-1 font-body text-sm text-on-surface-variant sm:text-base">El ecosistema de lujo donde tu imagen se convierte en poder.</p>
      </div>
      <header className="relative mt-0 flex min-h-[420px] w-full items-center justify-center overflow-hidden sm:min-h-[500px] md:h-[563px]">
        <div className="absolute inset-0 z-0">
          <Image
            src={RebelleImg.editorialFurCoat.src}
            alt={RebelleImg.editorialFurCoat.alt}
            fill
            priority
            className="object-cover object-[center_20%] brightness-[0.88] sm:object-[center_25%]"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 max-w-4xl px-5 text-center sm:px-6">
          <p className="mb-3 font-label text-[10px] uppercase tracking-[0.3em] text-white sm:mb-4">Maison de Couture · The Boutique</p>
          <h1 className="mb-4 font-headline text-4xl tracking-tight text-white sm:mb-6 sm:text-5xl md:text-7xl">The Boutique</h1>
          <p className="mx-auto max-w-2xl font-body text-sm font-normal leading-relaxed text-white/95 sm:text-base">
            Curaduría internacional de piezas únicas y edición limitada.
          </p>
          <p className="mx-auto mt-3 max-w-2xl font-body text-base font-light italic leading-relaxed text-white/90 sm:text-lg md:text-xl">
            Piezas de novedad mundial seleccionadas personalmente en Europa.
          </p>
        </div>
      </header>

      <section className="sticky top-20 z-40 overflow-x-auto border-y border-outline-variant/20 bg-surface/95 py-6 backdrop-blur-md hide-scrollbar">
        <div className="mx-auto flex min-w-max max-w-[1920px] items-center justify-center space-x-4 px-6 md:px-12">
          <Link
            href="/boutique"
            className={`px-6 py-2 text-[10px] uppercase tracking-[0.15em] transition-all duration-300 ${
              !categorySlug ? "bg-primary text-white" : "border border-primary text-primary hover:bg-primary hover:text-white"
            }`}
          >
            Todas
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/boutique?c=${c.slug}`}
              className={`px-6 py-2 text-[10px] uppercase tracking-[0.15em] transition-all duration-300 ${
                categorySlug === c.slug
                  ? "bg-primary text-white"
                  : "border border-primary text-primary hover:bg-primary hover:text-white"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <main className="mx-auto max-w-[1920px] bg-surface px-6 py-24 md:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-4">
          {cards.map((p, index) => (
            <BoutiqueProductCard key={p.id} product={p} index={index} />
          ))}
        </div>
        {products.length === 0 ? (
          <p className="mt-12 text-center text-on-surface-variant">No hay piezas en esta categoría por ahora.</p>
        ) : null}
      </main>
    </>
  );
}

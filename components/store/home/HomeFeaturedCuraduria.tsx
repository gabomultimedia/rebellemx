import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { formatMoney } from "@/lib/utils";
import { RebelleImg } from "@/lib/rebelle-images";
import { isLocalStoreAsset } from "@/lib/store-images";

const STATIC = [
  RebelleImg.editorialFurCoat,
  RebelleImg.galaWhiteSculptural,
  RebelleImg.sequinsJacket,
  RebelleImg.editorialStairsColor,
] as const;

export async function HomeFeaturedCuraduria() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    take: 4,
    include: { images: { orderBy: { sortOrder: "asc" }, take: 1 } },
  });

  const p = (i: number) => products[i];
  const url = (i: number) => {
    const u = p(i)?.images[0]?.url;
    return u && isLocalStoreAsset(u) ? u : STATIC[i].src;
  };
  const alt = (i: number) => {
    const u = p(i)?.images[0]?.url;
    if (u && isLocalStoreAsset(u)) return p(i)?.images[0]?.altText ?? STATIC[i].alt;
    return STATIC[i].alt;
  };
  const name = (i: number, fallback: string) => p(i)?.name ?? fallback;
  const slug = (i: number) => p(i)?.slug;
  const price = (i: number, fallback: number) => (p(i) ? Number(p(i)!.price) : fallback);

  return (
    <section className="bg-surface-container-low py-20 sm:py-24 md:py-32">
      <div className="mx-auto mb-10 max-w-[1400px] px-5 sm:px-6 md:mb-16 md:px-12">
        <h2 className="font-headline text-3xl text-on-surface sm:text-4xl md:text-5xl">
          Curaduría de Lujo <br className="hidden sm:block" />
          Internacional
        </h2>
        <p className="mt-6 max-w-[65ch] font-body text-[15px] leading-relaxed text-on-surface-variant sm:text-base">
          Traemos lo mejor de las pasarelas del mundo directamente a tu clóset. Piezas únicas, calzado de autor y perfumería nicho seleccionadas personalmente en Europa
          para garantizar que seas la única protagonista de cada escenario.
        </p>
        <ul className="mt-6 space-y-2 font-body text-sm text-on-surface-variant sm:mt-8 sm:text-base">
          <li>
            <span className="font-label text-primary">Gala &amp; Red Carpet:</span> Vestidos de impacto absoluto.
          </li>
          <li>
            <span className="font-label text-primary">Business Power:</span> Conjuntos que proyectan autoridad.
          </li>
          <li>
            <span className="font-label text-primary">Novedad Europea:</span> Acceso a lo inalcanzable.
          </li>
        </ul>
        <Link
          href="/boutique"
          className="mt-8 inline-block font-label text-[11px] uppercase tracking-[0.2em] text-primary underline-offset-4 hover:underline sm:mt-10 sm:text-[12px]"
        >
          Comprar la Selección Exclusiva
        </Link>
      </div>

      <div className="mb-10 flex items-end justify-between px-5 sm:px-6 md:mb-0 md:px-12">
        <Link
          href="/boutique"
          className="hidden font-label text-[12px] uppercase tracking-[0.2em] text-on-surface-variant transition-colors hover:text-primary md:inline"
        >
          Ver Todo el Catálogo
        </Link>
      </div>

      <div className="mx-auto grid max-w-[1920px] grid-cols-1 gap-6 px-5 sm:px-6 md:grid-cols-4 md:px-12">
        <div className="group relative overflow-hidden bg-white md:col-span-2">
          <div className="absolute left-4 top-4 z-10 bg-primary px-3 py-1 text-[10px] uppercase tracking-widest text-white">Exclusivo</div>
          <div className="relative aspect-[4/5] w-full min-h-[280px] md:aspect-[21/10] md:min-h-[380px] lg:min-h-[420px]">
            <Image
              src={url(0)}
              alt={alt(0)}
              fill
              quality={90}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width:768px) 100vw, 50vw"
            />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end bg-black/0 p-6 opacity-0 transition-all duration-500 group-hover:bg-black/50 group-hover:opacity-100 sm:p-10">
            <h4 className="mb-2 font-headline text-2xl text-white sm:text-3xl">{name(0, "Abrigo Estructural 'Nuit'")}</h4>
            <p className="font-headline text-lg text-tertiary-container sm:text-xl">{formatMoney(price(0, 2450))}</p>
            {slug(0) ? (
              <Link
                href={`/boutique/${slug(0)}`}
                className="mt-4 inline-block border border-white px-6 py-2 text-[10px] uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black sm:mt-6 sm:px-8 sm:py-3 sm:text-[11px]"
              >
                Ver Pieza
              </Link>
            ) : null}
          </div>
        </div>
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="group relative aspect-[4/5] min-h-[240px] overflow-hidden bg-white sm:min-h-[280px]">
              <Image
                src={url(i)}
                alt={alt(i)}
                fill
                quality={90}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-black/0 p-5 opacity-0 transition-all duration-500 group-hover:bg-black/50 group-hover:opacity-100 sm:p-6">
                <h4 className="mb-1 font-headline text-lg text-white">{name(i, i === 1 ? "Bolso Atelier Gold" : "Pendientes 'Lumière'")}</h4>
                <p className="font-headline text-lg text-tertiary-container">{formatMoney(price(i, i === 1 ? 1200 : 890))}</p>
                {slug(i) ? (
                  <Link
                    href={`/boutique/${slug(i)}`}
                    className="mt-3 inline-block border border-white px-5 py-2 text-[9px] uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black sm:mt-4"
                  >
                    Ver Pieza
                  </Link>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <div className="relative aspect-[4/5] min-h-[280px] overflow-hidden bg-white md:min-h-[520px] md:self-stretch">
          <div className="group relative h-full min-h-[280px] md:min-h-full">
            <Image
              src={url(3)}
              alt={alt(3)}
              fill
              quality={90}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width:768px) 100vw, 25vw"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-black/0 p-5 opacity-0 transition-all duration-500 group-hover:bg-black/50 group-hover:opacity-100 sm:p-6">
              <h4 className="mb-1 font-headline text-lg text-white">{name(3, "Stilettos Velvet Noir")}</h4>
              <p className="font-headline text-lg text-tertiary-container">{formatMoney(price(3, 1150))}</p>
              {slug(3) ? (
                <Link
                  href={`/boutique/${slug(3)}`}
                  className="mt-3 inline-block border border-white px-5 py-2 text-[9px] uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black sm:mt-4"
                >
                  Ver Pieza
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 px-5 sm:px-6 md:hidden">
        <Link href="/boutique" className="font-label text-[12px] uppercase tracking-[0.2em] text-primary">
          Ver Todo el Catálogo →
        </Link>
      </div>
    </section>
  );
}

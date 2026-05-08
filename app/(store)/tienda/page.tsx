import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { ServiceType } from "@prisma/client";
import { formatMoney } from "@/lib/utils";
import { RebelleImg } from "@/lib/rebelle-images";
import { isLocalStoreAsset } from "@/lib/store-images";

export const metadata = { title: "Tienda en línea | Rebelle" };

export default async function TiendaHubPage() {
  const [featuredProducts, studioServices, consultServices] = await Promise.all([
    prisma.product.findMany({
      where: { isActive: true },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      take: 4,
      include: { images: { orderBy: { sortOrder: "asc" }, take: 1 } },
    }),
    prisma.service.findMany({
      where: { isActive: true, type: ServiceType.STUDIO },
      orderBy: { sortOrder: "asc" },
      take: 4,
    }),
    prisma.service.findMany({
      where: { isActive: true, type: ServiceType.CONSULTORIA },
      orderBy: { sortOrder: "asc" },
      take: 4,
    }),
  ]);

  const studioFallbackNames = [
    "Maquillaje Social & Editorial",
    "Hairstyling de Alto Perfil",
    "Diseño de Mirada HD (Pestañas)",
    "Arquitectura de Cejas & Microblading",
  ];
  const consultFallbackNames = [
    "Diagnóstico de Imagen Estratégica",
    "European Concierge (Personal Shopper)",
    "Auditoría de Guardarropa",
    "Asesoría para Eventos de Gala",
  ];

  const studioDisplay = [0, 1, 2, 3].map((i) => {
    const s = studioServices[i];
    return {
      name: s?.name ?? studioFallbackNames[i],
      price: s != null ? Number(s.price) : null,
      href: "/studio" as const,
    };
  });

  const consultDisplay = [0, 1, 2, 3].map((i) => {
    const s = consultServices[i];
    return {
      name: s?.name ?? consultFallbackNames[i],
      price: s != null ? Number(s.price) : null,
      href: "/consultoria" as const,
    };
  });

  const productPlaceholders = [
    RebelleImg.winterOversizedCoat,
    RebelleImg.sequinsJacket,
    RebelleImg.galaWhiteSculptural,
    RebelleImg.leatherEditorial,
  ];

  return (
    <div className="bg-surface">
      <header className="border-b border-outline-variant/20 px-5 py-12 text-center sm:px-6 md:py-16">
        <p className="font-label text-[10px] uppercase tracking-[0.3em] text-primary">Tienda en línea</p>
        <h1 className="mt-4 font-headline text-3xl text-on-surface sm:text-4xl md:text-5xl">Diseña tu Impacto.</h1>
        <p className="mx-auto mt-4 max-w-xl font-body text-[15px] leading-relaxed text-on-surface-variant sm:text-lg">
          El ecosistema de lujo donde tu imagen se convierte en poder.
        </p>
      </header>

      {/* Bloque A: The Boutique */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 md:py-24">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="font-headline text-2xl text-on-surface sm:text-3xl md:text-4xl">The Boutique</h2>
          <p className="mt-3 font-body text-on-surface-variant">Curaduría internacional de piezas únicas y edición limitada.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {[0, 1, 2, 3].map((i) => {
            const prod = featuredProducts[i];
            const ph = productPlaceholders[i];
            const raw = prod?.images[0]?.url;
            const src = raw && isLocalStoreAsset(raw) ? raw : ph.src;
            const alt = raw && isLocalStoreAsset(raw) ? prod!.images[0]!.altText ?? ph.alt : ph.alt;
            const inner = (
              <div className="relative aspect-[3/4] overflow-hidden bg-surface-container">
                <Image src={src} alt={alt} fill quality={90} className="object-cover transition-transform duration-700 hover:scale-105" sizes="25vw" />
                {prod ? (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-left text-white">
                    <p className="font-headline text-sm line-clamp-2 sm:text-base">{prod.name}</p>
                    <p className="mt-1 font-label text-[10px] text-tertiary-container">{formatMoney(Number(prod.price))}</p>
                  </div>
                ) : null}
              </div>
            );
            return prod ? (
              <Link key={prod.id} href={`/boutique/${prod.slug}`} className="group block">
                {inner}
              </Link>
            ) : (
              <div key={i} className="group block opacity-90">
                {inner}
              </div>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/boutique"
            className="inline-block border border-primary bg-primary px-10 py-4 font-label text-[11px] uppercase tracking-[0.2em] text-on-primary transition-colors hover:bg-on-surface hover:text-surface"
          >
            Ver toda la Boutique
          </Link>
        </div>
      </section>

      {/* Bloque B: Studio */}
      <section className="border-t border-outline-variant/20 bg-surface-container-low px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 text-center md:mb-14">
            <h2 className="font-headline text-2xl text-on-surface sm:text-3xl md:text-4xl">Studio Rebelle</h2>
            <p className="mt-3 font-body text-on-surface-variant">El arte de la sincronización: Maquillaje y peinado editorial.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {studioDisplay.map((s) => (
              <Link
                key={s.name}
                href={s.href}
                className="border border-outline-variant/40 bg-surface p-6 transition-colors hover:border-primary/50"
              >
                <p className="font-headline text-lg text-on-surface">{s.name}</p>
                {s.price != null ? <p className="mt-3 font-label text-primary">{formatMoney(s.price)}</p> : <p className="mt-3 text-xs text-on-surface-variant">Ver precios en agenda</p>}
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/studio"
              className="inline-block border border-primary px-10 py-4 font-label text-[11px] uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-on-primary"
            >
              Ver Menú de Studio
            </Link>
          </div>
        </div>
      </section>

      {/* Bloque C: Consultoría VIP */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 md:py-24">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="font-headline text-2xl text-on-surface sm:text-3xl md:text-4xl">Consultoría VIP</h2>
          <p className="mt-3 font-body text-on-surface-variant">Ingeniería de Imagen estratégica bajo la visión de Thalia.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {consultDisplay.map((s) => (
            <Link
              key={s.name}
              href={s.href}
              className="border border-outline-variant/40 bg-surface-container-low p-6 transition-colors hover:border-primary/50"
            >
              <p className="font-headline text-lg text-on-surface">{s.name}</p>
              {s.price != null ? <p className="mt-3 font-label text-primary">{formatMoney(s.price)}</p> : <p className="mt-3 text-xs text-on-surface-variant">Sesión bajo cita</p>}
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/consultoria"
            className="inline-block bg-on-surface px-10 py-4 font-label text-[11px] uppercase tracking-[0.2em] text-surface transition-colors hover:bg-primary hover:text-white"
          >
            Reservar Consultoría
          </Link>
        </div>
      </section>
    </div>
  );
}

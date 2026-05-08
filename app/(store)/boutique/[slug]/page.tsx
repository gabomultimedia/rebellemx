import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Award, BadgeCheck, Globe } from "lucide-react";
import prisma from "@/lib/prisma";
import { formatMoney } from "@/lib/utils";
import { productDisplayImage, productGalleryImages } from "@/lib/store-images";
import type { ProductBadge } from "@prisma/client";
import { ProductBreadcrumbs, ProductDetailGallery } from "./ProductDetailGallery";
import { ProductDetailPurchase } from "./ProductDetailPurchase";

type Props = { params: Promise<{ slug: string }> };

function badgePill(product: {
  badge: ProductBadge;
  category: { name: string } | null;
  tags: { tag: string }[];
}) {
  const t = product.tags[0]?.tag?.trim();
  if (t) return t;
  if (product.category?.name) return product.category.name;
  switch (product.badge) {
    case "EXCLUSIVE":
      return "Exclusivo";
    case "NEW":
      return "Nuevo";
    case "LIMITED":
      return "Edición limitada";
    case "BESTSELLER":
      return "Esencial";
    default:
      return "Colección Rebelle";
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    select: { name: true, metaTitle: true, metaDesc: true, shortDesc: true },
  });
  if (!product) return { title: "Producto" };
  return {
    title: product.metaTitle ?? product.name,
    description: product.metaDesc ?? product.shortDesc ?? undefined,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findFirst({
    where: { slug, isActive: true },
    include: {
      category: true,
      images: { orderBy: { sortOrder: "asc" } },
      variants: true,
      tags: true,
    },
  });
  if (!product) notFound();

  const price = Number(product.price);
  const display = productDisplayImage({
    slug: product.slug,
    name: product.name,
    images: product.images,
  });
  const galleryImages = productGalleryImages(product.images, product.name, product.slug);

  const sameCategory =
    product.categoryId != null
      ? await prisma.product.findMany({
          where: { isActive: true, categoryId: product.categoryId, id: { not: product.id } },
          orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
          take: 3,
          include: { images: { orderBy: { sortOrder: "asc" }, take: 1 } },
        })
      : [];

  const need = 3 - sameCategory.length;
  const excludeIds = [product.id, ...sameCategory.map((p) => p.id)];
  const filler =
    need > 0
      ? await prisma.product.findMany({
          where: {
            isActive: true,
            id: { notIn: excludeIds },
          },
          orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
          take: need,
          include: { images: { orderBy: { sortOrder: "asc" }, take: 1 } },
        })
      : [];

  const related = [...sameCategory, ...filler].slice(0, 3);

  const pill = badgePill(product);

  return (
    <main className="mx-auto max-w-[1920px] px-6 pb-24 pt-32 md:px-12">
      <ProductBreadcrumbs productName={product.name} />

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-10 lg:gap-24">
        <ProductDetailGallery images={galleryImages} productName={product.name} />

        <div className="flex flex-col lg:col-span-4">
          <div className="mb-4">
            <span className="inline-block bg-primary/10 px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              {pill}
            </span>
          </div>
          <h1 className="mb-4 font-headline text-5xl leading-tight tracking-tight text-on-surface md:text-6xl">{product.name}</h1>
          <div className="mb-8">
            {product.comparePrice ? (
              <p className="mb-1 text-sm text-on-surface-variant line-through">{formatMoney(Number(product.comparePrice))}</p>
            ) : null}
            <p className="font-headline text-3xl text-primary">{formatMoney(price)}</p>
          </div>

          <div className="mb-12 space-y-6">
            {product.shortDesc ? (
              <p className="text-lg font-light leading-relaxed text-on-surface-variant">{product.shortDesc}</p>
            ) : null}
            {product.description ? (
              <p className="whitespace-pre-wrap text-lg font-light leading-relaxed text-on-surface-variant">{product.description}</p>
            ) : null}
            {product.badge === "LIMITED" || product.badge === "EXCLUSIVE" ? (
              <p className="font-label text-[11px] uppercase italic tracking-widest text-on-surface-variant">
                Limitada a pocas unidades por temporada.
              </p>
            ) : null}
          </div>

          <ProductDetailPurchase
            productId={product.id}
            slug={product.slug}
            name={product.name}
            imageUrl={display.cartImageUrl}
            basePrice={price}
            stock={product.stock}
            variants={product.variants.map((v) => ({
              id: v.id,
              name: v.name,
              value: v.value,
              stock: v.stock,
              priceAdj: v.priceAdj,
            }))}
          />

          <div className="mt-20 grid grid-cols-1 gap-8 border-t border-outline-variant/30 py-10">
            <div className="flex items-center gap-6">
              <Globe className="h-9 w-9 shrink-0 text-primary" strokeWidth={1.25} />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface">Traída de Europa</p>
                <p className="text-xs font-light text-on-surface-variant">
                  {product.origin?.trim()
                    ? product.origin
                    : "Importada bajo estándares de curaduría italiana."}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <BadgeCheck className="h-9 w-9 shrink-0 text-primary" strokeWidth={1.25} />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface">Edición limitada</p>
                <p className="text-xs font-light text-on-surface-variant">
                  Piezas seleccionadas con protocolo de autenticidad Rebelle.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Award className="h-9 w-9 shrink-0 text-primary" strokeWidth={1.25} />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface">Garantía Rebelle</p>
                <p className="text-xs font-light text-on-surface-variant">Soporte y asesoría posventa con tu compra.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-40">
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <span className="mb-4 block font-label text-[10px] uppercase tracking-[0.3em] text-primary">Editorial Selection</span>
              <h2 className="font-headline text-4xl text-on-surface md:text-5xl">Completa el Look</h2>
            </div>
            <p className="max-w-md font-light italic text-on-surface-variant">
              Nuestros asesores en REBELLE STUDIO han curado estas piezas para complementar la fuerza de tu selección.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {related.map((p, idx) => {
              const rel = productDisplayImage({
                slug: p.slug,
                name: p.name,
                images: p.images,
              });
              const sub =
                p.badge === "NEW"
                  ? "Nuevo"
                  : p.badge === "EXCLUSIVE" || p.badge === "LIMITED"
                    ? "Handcrafted"
                    : "Rebelle Studio";
              return (
                <Link
                  key={p.id}
                  href={`/boutique/${p.slug}`}
                  className={`group block ${idx === 1 ? "md:mt-12" : ""}`}
                >
                  <div className="relative mb-6 aspect-[2/3] overflow-hidden bg-surface-container">
                    <Image
                      src={rel.src}
                      alt={rel.alt}
                      fill
                      quality={88}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="33vw"
                    />
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-surface/90 px-3 py-1 font-label text-[10px] uppercase tracking-[0.2em] backdrop-blur">
                        {sub}
                      </span>
                    </div>
                  </div>
                  <h3 className="mb-2 font-headline text-xl">{p.name}</h3>
                  <p className="text-sm uppercase tracking-widest text-primary">{formatMoney(Number(p.price))}</p>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}
    </main>
  );
}

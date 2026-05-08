"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatMoney, cn } from "@/lib/utils";
import type { ProductBadge } from "@prisma/client";
import { productDisplayImage } from "@/lib/store-images";

export type BoutiqueCardProduct = {
  id: string;
  slug: string;
  name: string;
  price: unknown;
  badge: ProductBadge;
  isFeatured?: boolean;
  images: { url: string; altText: string | null }[];
};

function staggerClass(index: number) {
  const mod = index % 6;
  if (mod === 1) return "md:mt-12";
  if (mod === 3) return "lg:mt-20";
  if (mod === 4) return "md:-mt-12";
  return "";
}

export function BoutiqueProductCard({ product, index }: { product: BoutiqueCardProduct; index: number }) {
  const addLine = useCartStore((s) => s.addLine);
  const display = productDisplayImage(product);
  const price = Number(product.price);
  const showExclusive = product.badge === "EXCLUSIVE" || product.badge === "LIMITED" || product.badge === "BESTSELLER";
  const showNuevo = product.badge === "NEW";

  return (
    <article className={cn("boutique-card group relative flex flex-col", staggerClass(index))}>
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-container">
        <Image
          src={display.src}
          alt={display.alt}
          fill
          quality={88}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 25vw"
        />
        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {showExclusive ? (
            <span className="bg-primary px-3 py-1 text-[9px] font-semibold uppercase tracking-widest text-white">Exclusivo</span>
          ) : null}
          {showNuevo ? (
            <span className="bg-on-surface px-3 py-1 text-[9px] font-semibold uppercase tracking-widest text-white">Nuevo</span>
          ) : null}
        </div>
        <div className="boutique-action-overlay absolute inset-x-0 bottom-0 flex flex-col gap-3 bg-white/90 p-6 backdrop-blur-sm">
          <button
            type="button"
            className="w-full bg-on-surface py-3 text-[11px] font-medium uppercase tracking-widest text-surface transition-opacity hover:opacity-90"
            onClick={() =>
              addLine({
                productId: product.id,
                slug: product.slug,
                name: product.name,
                imageUrl: display.cartImageUrl,
                unitPrice: price,
              })
            }
          >
            Agregar al carrito
          </button>
          <Link
            href={`/boutique/${product.slug}`}
            className="self-center border-b border-primary/30 pb-1 text-center text-[10px] uppercase tracking-widest text-primary transition-colors hover:border-primary"
          >
            Ver detalle
          </Link>
        </div>
      </div>
      <div className="pt-6">
        <h3 className="mb-1 font-headline text-xl text-on-surface">{product.name}</h3>
        <p className="font-medium tracking-tight text-primary">{formatMoney(price)}</p>
      </div>
    </article>
  );
}

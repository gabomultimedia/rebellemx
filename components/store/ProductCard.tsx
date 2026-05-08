"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { formatMoney } from "@/lib/utils";
import { productDisplayImage } from "@/lib/store-images";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import type { ProductBadge } from "@prisma/client";

export type ProductCardProduct = {
  id: string;
  slug: string;
  name: string;
  shortDesc: string | null;
  price: unknown;
  badge: ProductBadge;
  images: { url: string; altText: string | null }[];
};

const badgeLabel: Record<ProductBadge, string | null> = {
  NONE: null,
  NEW: "Nuevo",
  EXCLUSIVE: "Exclusivo",
  LIMITED: "Limitado",
  BESTSELLER: "Bestseller",
  SALE: "Oferta",
};

export function ProductCard({ product }: { product: ProductCardProduct }) {
  const addLine = useCartStore((s) => s.addLine);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const inWishlist = useWishlistStore((s) => s.productIds.includes(product.id));
  const display = productDisplayImage(product);
  const price = Number(product.price);
  const label = badgeLabel[product.badge];

  return (
    <article className="product-card group relative overflow-hidden bg-surface-container-lowest">
      <Link href={`/boutique/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-surface-container">
          <Image
            src={display.src}
            alt={display.alt}
            fill
            quality={88}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 33vw"
          />
          <div className="action-overlay absolute inset-x-0 bottom-0 bg-on-surface/90 p-4">
            <button
              type="button"
              className="w-full border border-primary py-3 text-[10px] font-label uppercase tracking-[0.2em] text-surface hover:bg-primary"
              onClick={(e) => {
                e.preventDefault();
                addLine({
                  productId: product.id,
                  slug: product.slug,
                  name: product.name,
                  imageUrl: display.cartImageUrl,
                  unitPrice: price,
                });
              }}
            >
              Añadir — {formatMoney(price)}
            </button>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            {label ? (
              <span className="text-[9px] uppercase tracking-[0.2em] text-primary">{label}</span>
            ) : null}
            <Link href={`/boutique/${product.slug}`}>
              <h3 className="font-headline text-lg leading-tight hover:text-primary">{product.name}</h3>
            </Link>
            {product.shortDesc ? (
              <p className="mt-1 line-clamp-2 text-xs text-on-surface-variant">{product.shortDesc}</p>
            ) : null}
          </div>
          <button
            type="button"
            aria-label={inWishlist ? "Quitar de la lista de deseos" : "Añadir a la lista de deseos"}
            onClick={() => toggleWish(product.id)}
            className="shrink-0 text-primary transition-opacity hover:opacity-70"
          >
            <Heart
              strokeWidth={1}
              className="h-5 w-5"
              fill={inWishlist ? "currentColor" : "none"}
              aria-hidden
            />
          </button>
        </div>
        <p className="mt-2 font-label text-sm text-on-surface">{formatMoney(price)}</p>
      </div>
    </article>
  );
}

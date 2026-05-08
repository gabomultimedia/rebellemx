"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

type Img = { url: string; altText: string | null };

export function ProductDetailGallery({ images, productName }: { images: Img[]; productName: string }) {
  const [active, setActive] = useState(0);
  const list = images.length ? images : [];
  const main = list[active] ?? list[0];

  if (!main) {
    return <div className="aspect-[3/4] bg-surface-container" />;
  }

  return (
    <div className="lg:col-span-6">
      <div className="zoom-container relative cursor-crosshair overflow-hidden bg-surface-container">
        <div className="relative h-[min(800px,70vh)] w-full md:h-[800px]">
          <Image
            src={main.url}
            alt={main.altText ?? productName}
            fill
            quality={90}
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 60vw"
            priority
          />
        </div>
      </div>
      {list.length > 1 ? (
        <div className="mt-4 grid grid-cols-4 gap-4">
          {list.slice(0, 4).map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`group relative aspect-[3/4] overflow-hidden bg-surface-container ${active === i ? "border-b-2 border-primary" : ""}`}
            >
              <Image
                src={img.url}
                alt={img.altText ?? `${productName} ${i + 1}`}
                fill
                quality={85}
                className="object-cover transition-opacity group-hover:opacity-80"
                sizes="15vw"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function ProductBreadcrumbs({ productName }: { productName: string }) {
  return (
    <nav className="mb-12 flex flex-wrap items-center gap-2 font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
      <Link className="transition-colors hover:text-primary" href="/">
        Inicio
      </Link>
      <ChevronRight className="h-3 w-3 shrink-0" strokeWidth={1.5} />
      <Link className="transition-colors hover:text-primary" href="/boutique">
        Boutique
      </Link>
      <ChevronRight className="h-3 w-3 shrink-0" strokeWidth={1.5} />
      <span className="text-on-surface">{productName}</span>
    </nav>
  );
}

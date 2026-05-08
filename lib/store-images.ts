import { RebelleImg } from "@/lib/rebelle-images";

const FALLBACK_CYCLE = [
  RebelleImg.editorialFurCoat,
  RebelleImg.galaWhiteSculptural,
  RebelleImg.structuredSuit,
  RebelleImg.sequinsJacket,
  RebelleImg.editorialStairsColor,
  RebelleImg.leatherEditorial,
  RebelleImg.trenchBricks,
  RebelleImg.winterOversizedCoat,
  RebelleImg.bomberFurCollar,
  RebelleImg.duoUrbanWinter,
  RebelleImg.editorialStairsLounge,
  RebelleImg.editorialBlackCoatDoor,
] as const;

export function isLocalStoreAsset(url: string | undefined | null): boolean {
  return typeof url === "string" && url.startsWith("/imgs/");
}

function stringHashBucket(s: string, modulo: number): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) >>> 0;
  }
  return modulo > 0 ? h % modulo : 0;
}

function fallbackByKey(key: string) {
  return FALLBACK_CYCLE[stringHashBucket(key, FALLBACK_CYCLE.length)];
}

export function productDisplayImage(product: {
  slug: string;
  name: string;
  images: { url: string; altText: string | null }[];
}) {
  const first = product.images[0];
  if (first && isLocalStoreAsset(first.url)) {
    return {
      src: first.url,
      alt: first.altText ?? product.name,
      cartImageUrl: first.url,
    };
  }
  const fb = fallbackByKey(product.slug);
  return {
    src: fb.src,
    alt: fb.alt,
    cartImageUrl: fb.src,
  };
}

export function productGalleryImages(
  images: { url: string; altText: string | null }[],
  productName: string,
  slug: string,
): { url: string; altText: string | null }[] {
  const locals = images.filter((i) => isLocalStoreAsset(i.url));
  if (locals.length > 0) return locals;
  const fb = fallbackByKey(slug);
  return [{ url: fb.src, altText: fb.alt }];
}

export function resolveJournalCover(coverImage: string | null | undefined, slug: string, title: string) {
  if (coverImage && isLocalStoreAsset(coverImage)) {
    return { src: coverImage, alt: title || "Journal Rebelle" };
  }
  const fb = fallbackByKey(slug);
  return { src: fb.src, alt: title ? `${title} — campaña Rebelle` : fb.alt };
}

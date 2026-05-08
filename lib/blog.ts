import { BlogCategory } from "@prisma/client";

const CATEGORY_LABELS: Record<BlogCategory, string> = {
  TREND_ALERT: "Trend Alert",
  ESTRATEGIA_REBELLE: "Estrategia Rebelle",
  BEHIND_THE_SEAMS: "Behind the Seams",
};

export function blogCategoryLabel(cat: BlogCategory): string {
  return CATEGORY_LABELS[cat] ?? cat;
}

/** ~200 palabras por minuto */
export function estimateReadMinutesFromHtml(html: string): number {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  return Math.max(1, Math.ceil(words / 200));
}

export function slugifyTitle(title: string): string {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);
}

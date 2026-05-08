import prisma from "@/lib/prisma";

const KEYS = ["boutique_address", "boutique_hours", "whatsapp_number", "instagram_url"] as const;

export async function getPublicSiteStrings() {
  const rows = await prisma.siteConfig.findMany({
    where: { key: { in: [...KEYS] } },
  });
  const m = Object.fromEntries(rows.map((r) => [r.key, r.value])) as Record<string, string>;
  return {
    boutiqueAddress: m.boutique_address ?? "Zona Río, Tijuana, B.C., México",
    boutiqueHours: m.boutique_hours ?? "Lunes a Sábado 10:00 - 20:00 · Cita previa recomendada",
    whatsappNumber: m.whatsapp_number ?? "526641234567",
    instagramUrl: m.instagram_url ?? "#",
  };
}

import {
  PrismaClient,
  Role,
  VibLevel,
  ProductBadge,
  ServiceType,
  BlogCategory,
  PostStatus,
} from "@prisma/client";
import bcrypt from "bcryptjs";
import { RebelleImg } from "../lib/rebelle-images";

const prisma = new PrismaClient();

/** Imagen principal por producto — siempre /public/imgs (sin stock externo) */
const PRODUCT_SEED_IMAGES: Record<string, { url: string; altText: string }> = {
  "vestido-gala-seda-italiana": {
    url: RebelleImg.galaWhiteSculptural.src,
    altText: RebelleImg.galaWhiteSculptural.alt,
  },
  "conjunto-business-power-negro": {
    url: RebelleImg.structuredSuit.src,
    altText: RebelleImg.structuredSuit.alt,
  },
  "vestido-coctel-bordado-parisino": {
    url: RebelleImg.sequinsJacket.src,
    altText: RebelleImg.sequinsJacket.alt,
  },
  "stilettos-piel-italiana-dorados": {
    url: RebelleImg.leatherEditorial.src,
    altText: RebelleImg.leatherEditorial.alt,
  },
  "perfume-nicho-oud-imperial": {
    url: RebelleImg.editorialBlackCoatDoor.src,
    altText: RebelleImg.editorialBlackCoatDoor.alt,
  },
  "collar-statement-oro-18k": {
    url: RebelleImg.duoUrbanWinter.src,
    altText: RebelleImg.duoUrbanWinter.alt,
  },
};

async function main() {
  console.log("🌱 Iniciando seed de Rebelle Store...");

  const adminPassword = await bcrypt.hash("Admin2024!Rebelle", 12);
  await prisma.user.upsert({
    where: { email: "admin@rebelleboutique.com" },
    update: {},
    create: {
      email: "admin@rebelleboutique.com",
      name: "Thalia — Rebelle",
      password: adminPassword,
      role: Role.ADMIN,
    },
  });
  console.log("✓ Admin creado: admin@rebelleboutique.com");

  const clientPassword = await bcrypt.hash("Cliente2024!", 12);
  await prisma.user.upsert({
    where: { email: "cliente@test.com" },
    update: {},
    create: {
      email: "cliente@test.com",
      name: "Valentina García",
      phone: "6641234567",
      password: clientPassword,
      role: Role.CLIENT,
      vibLevel: VibLevel.VIB,
      vibPoints: 1250,
      sizeTop: "M",
      sizePants: "28",
      sizeShoes: "25",
    },
  });
  console.log("✓ Cliente de prueba creado");

  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "gala-red-carpet" },
      update: {},
      create: { name: "Gala & Red Carpet", slug: "gala-red-carpet", sortOrder: 1 },
    }),
    prisma.category.upsert({
      where: { slug: "business-power" },
      update: {},
      create: { name: "Business Power", slug: "business-power", sortOrder: 2 },
    }),
    prisma.category.upsert({
      where: { slug: "novedad-europea" },
      update: {},
      create: { name: "Novedad Europea", slug: "novedad-europea", sortOrder: 3 },
    }),
    prisma.category.upsert({
      where: { slug: "calzado" },
      update: {},
      create: { name: "Calzado & Bolsos", slug: "calzado", sortOrder: 4 },
    }),
    prisma.category.upsert({
      where: { slug: "perfumeria" },
      update: {},
      create: { name: "Perfumería Nicho", slug: "perfumeria", sortOrder: 5 },
    }),
    prisma.category.upsert({
      where: { slug: "joyeria" },
      update: {},
      create: { name: "Joyería", slug: "joyeria", sortOrder: 6 },
    }),
  ]);
  console.log(`✓ ${categories.length} categorías creadas`);

  const productos: Array<{
    name: string;
    slug: string;
    shortDesc: string;
    description: string;
    price: number;
    comparePrice?: number;
    categoryId: string;
    badge: ProductBadge;
    origin: string;
    stock: number;
    isFeatured?: boolean;
  }> = [
    {
      name: "Vestido de Gala Seda Italiana",
      slug: "vestido-gala-seda-italiana",
      shortDesc: "Pieza traída personalmente de Milán. Seda natural, corte imperial.",
      description:
        "Una obra maestra de la alta costura italiana. Este vestido de seda natural fue seleccionado personalmente por Thalia durante su último viaje a Milán.",
      price: 8500,
      categoryId: categories[0].id,
      badge: ProductBadge.EXCLUSIVE,
      origin: "Europa — Milán, Italia",
      stock: 2,
      isFeatured: true,
    },
    {
      name: "Conjunto Business Power Negro",
      slug: "conjunto-business-power-negro",
      shortDesc: "Blazer estructurado + pantalón palazzo. Autoridad pura.",
      description:
        "El conjunto definitivo para la mujer que comanda respeto. Blazer de lana italiana con hombros estructurados y pantalón palazzo de caída perfecta.",
      price: 5200,
      categoryId: categories[1].id,
      badge: ProductBadge.NEW,
      origin: "Europa — París, Francia",
      stock: 4,
      isFeatured: true,
    },
    {
      name: "Vestido Cóctel Bordado Parisino",
      slug: "vestido-coctel-bordado-parisino",
      shortDesc: "Bordado artesanal de París. Edición de 3 piezas para México.",
      description:
        "Directamente de los talleres artesanales del Marais en París. Bordado a mano con hilo dorado sobre base de seda champagne.",
      price: 12800,
      comparePrice: 15000,
      categoryId: categories[2].id,
      badge: ProductBadge.LIMITED,
      origin: "Europa — París, Francia",
      stock: 3,
      isFeatured: true,
    },
    {
      name: "Stilettos Piel Italiana Dorados",
      slug: "stilettos-piel-italiana-dorados",
      shortDesc: "El sello dorado de tu Total Look. Piel de Florencia.",
      description:
        "Stilettos de piel genuina de Florencia en acabado dorado metálico. El complemento perfecto para cualquier pieza de gala.",
      price: 4200,
      categoryId: categories[3].id,
      badge: ProductBadge.EXCLUSIVE,
      origin: "Europa — Florencia, Italia",
      stock: 6,
    },
    {
      name: "Perfume Nicho Oud Imperial",
      slug: "perfume-nicho-oud-imperial",
      shortDesc: "Fragancia de nicho. Tu firma olfativa exclusiva.",
      description:
        "Una fragancia arquitectónica de la maison boutique Parfums de Rebellion (París). Notas de corazón de Oud, ambar y vainilla de Madagascar.",
      price: 3800,
      categoryId: categories[4].id,
      badge: ProductBadge.LIMITED,
      origin: "Europa — París, Francia",
      stock: 8,
    },
    {
      name: "Collar Statement Oro 18K",
      slug: "collar-statement-oro-18k",
      shortDesc: "Joyería de impacto. El punto focal de tu armadura.",
      description:
        "Collar statement en oro 18K con cristales Swarovski clear. Diseño contemporáneo que eleva cualquier escote.",
      price: 6500,
      categoryId: categories[5].id,
      badge: ProductBadge.EXCLUSIVE,
      origin: "Europa — Barcelona, España",
      stock: 3,
    },
  ];

  for (const prod of productos) {
    const seedImg = PRODUCT_SEED_IMAGES[prod.slug];
    if (!seedImg) {
      throw new Error(`Falta PRODUCT_SEED_IMAGES para slug: ${prod.slug}`);
    }
    const imageCreate = {
      url: seedImg.url,
      altText: seedImg.altText,
      isPrimary: true,
      sortOrder: 0,
    };
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        images: {
          deleteMany: {},
          create: [imageCreate],
        },
      },
      create: {
        name: prod.name,
        slug: prod.slug,
        shortDesc: prod.shortDesc,
        description: prod.description,
        price: prod.price,
        comparePrice: prod.comparePrice ?? null,
        categoryId: prod.categoryId,
        badge: prod.badge,
        origin: prod.origin,
        stock: prod.stock,
        isFeatured: prod.isFeatured ?? false,
        images: {
          create: [imageCreate],
        },
      },
    });
  }
  console.log(`✓ ${productos.length} productos creados`);

  const servicios = [
    {
      name: "Maquillaje Social & Editorial",
      slug: "maquillaje-social-editorial",
      shortDesc: "Aplicación técnica de alta duración. Diseñado según tu colorimetría.",
      description:
        "Nuestro servicio estrella. Aplicación técnica con productos premium que duran todo el evento.",
      type: ServiceType.STUDIO,
      price: 1200,
      duration: 90,
      isActive: true,
      sortOrder: 1,
    },
    {
      name: "Hairstyling de Alto Perfil",
      slug: "hairstyling-alto-perfil",
      shortDesc: "Recogidos editoriales, ondas perfectas, estructura de cabello.",
      description:
        "Desde ondas Hollywoodenses perfectas hasta recogidos de pasarela.",
      type: ServiceType.STUDIO,
      price: 900,
      duration: 75,
      isActive: true,
      sortOrder: 2,
    },
    {
      name: "Diseño de Mirada HD",
      slug: "diseno-mirada-hd",
      shortDesc: "Extensiones de pestañas + diseño de cejas. Impacto visual inmediato.",
      description:
        "Aplicación de extensiones de pestañas en efecto natural o volumen ruso.",
      type: ServiceType.STUDIO,
      price: 750,
      duration: 60,
      isActive: true,
      sortOrder: 3,
    },
    {
      name: "Microblading & Arquitectura de Cejas",
      slug: "microblading-cejas",
      shortDesc: "Micropigmentación de larga duración. Cejas perfectas 24/7.",
      description:
        "Técnica de micropigmentación semi-permanente que diseña cejas perfectas con apariencia completamente natural.",
      type: ServiceType.STUDIO,
      price: 3500,
      duration: 120,
      isActive: true,
      sortOrder: 4,
    },
    {
      name: "Total Look Package",
      slug: "total-look-package",
      shortDesc: "Maquillaje + Peinado + Accesorios. La experiencia Rebelle completa.",
      description:
        "El paquete insignia de Rebelle. Incluye asesoría de outfit, maquillaje social completo, hairstyling editorial.",
      type: ServiceType.STUDIO,
      price: 2500,
      duration: 180,
      isActive: true,
      sortOrder: 5,
    },
    {
      name: "Diagnóstico de Imagen Estratégica",
      slug: "diagnostico-imagen-estrategica",
      shortDesc: "Sesión privada con Thalia. Colorimetría + fisonomía + estrategia.",
      description:
        "Una sesión de 2 horas donde Thalia analiza tu fisonomía, paleta de color personal y objetivos.",
      type: ServiceType.CONSULTORIA,
      price: 4500,
      duration: 120,
      isActive: true,
      sortOrder: 6,
    },
    {
      name: "Auditoría de Guardarropa",
      slug: "auditoria-guardarropa",
      shortDesc: "Thalia va a tu clóset y lo convierte en una herramienta eficiente.",
      description:
        "Thalia visita tu hogar y transforma tu guardarropa en un arsenal estratégico.",
      type: ServiceType.CONSULTORIA,
      price: 6000,
      duration: 180,
      isActive: true,
      sortOrder: 7,
    },
    {
      name: "European Concierge — Personal Shopper",
      slug: "european-concierge-personal-shopper",
      shortDesc: "Thalia compra por ti en Europa. Piezas únicas bajo pedido.",
      description:
        "Durante sus viajes a los centros de moda europeos, Thalia actúa como tu cazadora de tendencias personal.",
      type: ServiceType.CONSULTORIA,
      price: 8000,
      duration: 60,
      isActive: true,
      sortOrder: 8,
    },
  ];

  for (const srv of servicios) {
    await prisma.service.upsert({
      where: { slug: srv.slug },
      update: {},
      create: srv,
    });
  }
  console.log(`✓ ${servicios.length} servicios creados`);

  const configs = [
    { key: "site_name", value: "Rebelle Fashion Store", description: "Nombre del sitio" },
    { key: "site_tagline", value: "Rebelledía con causa: Tu confianza.", description: "Tagline" },
    { key: "whatsapp_number", value: "526641234567", description: "WhatsApp Business" },
    { key: "shipping_cost", value: "350", description: "Costo envío MXN" },
    { key: "free_shipping_threshold", value: "8000", description: "Envío gratis desde" },
    { key: "boutique_address", value: "Zona Río, Tijuana, B.C., México", description: "Dirección" },
    {
      key: "boutique_hours",
      value: "Lunes a Sábado 10:00 - 20:00 | Citas previas recomendadas",
      description: "Horarios",
    },
    { key: "instagram_url", value: "https://instagram.com/rebelleboutique", description: "Instagram" },
    { key: "tiktok_url", value: "https://tiktok.com/@rebelleboutique", description: "TikTok" },
    { key: "vib_threshold", value: "15000", description: "Umbral VIB" },
    { key: "vib_gold_threshold", value: "40000", description: "Umbral VIB Gold" },
  ];

  for (const config of configs) {
    await prisma.siteConfig.upsert({
      where: { key: config.key },
      update: { value: config.value },
      create: config,
    });
  }
  console.log(`✓ ${configs.length} configuraciones`);

  await prisma.blogPost.upsert({
    where: { slug: "tendencias-otono-2025-paris" },
    update: {
      isFeatured: true,
      coverImage: RebelleImg.editorialStairsLounge.src,
    },
    create: {
      title: "Lo que vi en París: Las 5 tendencias que dominarán el otoño 2025",
      slug: "tendencias-otono-2025-paris",
      excerpt:
        "Acabo de regresar de mi último viaje a los showrooms del Marais y tengo que contarte qué viene.",
      content:
        "<p>El viaje de esta temporada fue revelador. En Rebelle curamos cada pieza pensando en mujeres que lideran con presencia.</p><p>Estas son las cinco señales que marcarán el otoño en Europa y que ya puedes anticipar en tu armario.</p>",
      category: BlogCategory.BEHIND_THE_SEAMS,
      status: PostStatus.PUBLISHED,
      publishedAt: new Date(),
      isFeatured: true,
      coverImage: RebelleImg.editorialStairsLounge.src,
      metaTitle: "Tendencias Otoño 2025 desde París | Journal Rebelle",
      metaDesc: "Thalia comparte las 5 tendencias de moda de lujo que vienen para otoño 2025.",
    },
  });
  console.log("✓ Blog post de ejemplo");

  console.log("\n🎉 Seed completado");
  console.log("Admin:   admin@rebelleboutique.com / Admin2024!Rebelle");
  console.log("Cliente: cliente@test.com / Cliente2024!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

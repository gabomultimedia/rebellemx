/**
 * Imágenes locales en /public/imgs (WebP, mayormente 2550×3300 retrato).
 * Textos alt alineados con descripcion_imagenes.md
 */
const base = "/imgs" as const;

export const RebelleImg = {
  /** Hero inicio — editorial nítida full-bleed (evitar L1004748 muy suave en pantalla ancha) */
  heroHome: {
    src: `${base}/6A4A4300-2_resultado.webp`,
    alt: "Mujer con abrigo de piel sintética, guantes de cuero negro y tacones aguja en pose elegante.",
  },
  /** Cortinas, luz natural — ambiente horizontal (texturas / mood secundario) */
  heroAtmosphere: {
    src: `${base}/L1004748-2_resultado.webp`,
    alt: "Cortinas blancas con luz natural filtrándose en interior de tonos cálidos y minimalistas.",
  },
  /** Moda oscura, abrigo piel y tacones */
  editorialFurCoat: {
    src: `${base}/6A4A4300-2_resultado.webp`,
    alt: "Mujer con abrigo de piel sintética, guantes de cuero negro y tacones aguja en pose elegante.",
  },
  /** Vestido blanco escultural, fondo negro */
  galaWhiteSculptural: {
    src: `${base}/6A4A4358-2_resultado.webp`,
    alt: "Modelo con vestido blanco satinado de diseño escultural sobre fondo negro, iluminación lateral dramática.",
  },
  /** Abrigo negro, gafas sol, puerta blanca */
  editorialBlackCoatDoor: {
    src: `${base}/6A4A4527-2_resultado.webp`,
    alt: "Modelo con abrigo negro de piel y gafas de sol — moda elegante invierno.",
  },
  /** Abrigo piel bicolor, escalera hormigón */
  editorialStairsColor: {
    src: `${base}/6A4A4705-2_resultado.webp`,
    alt: "Modelo con abrigo de piel bicolor y gafas de sol posando en escalera minimalista con iluminación fashion.",
  },
  /** Chaqueta lentejuelas y plumas */
  sequinsJacket: {
    src: `${base}/L1004137-2_resultado.webp`,
    alt: "Modelo con chaqueta de lentejuelas bicolor y plumas negras posando sobre fondo industrial gris.",
  },
  /** Conjunto blanco y negro, botones dorados */
  structuredSuit: {
    src: `${base}/L1004215-2_resultado.webp`,
    alt: "Modelo luciendo conjunto de moda blanco y negro con botones dorados en estilo elegante y sofisticado.",
  },
  /** Trench beige, ladrillos */
  trenchBricks: {
    src: `${base}/L1004331-2_resultado.webp`,
    alt: "Mujer con trench coat beige y guantes negros sosteniendo gafas de sol contra pared de ladrillos.",
  },
  /** Abrigo gris satinado, cuello pelo */
  winterOversizedCoat: {
    src: `${base}/L1004471-2_resultado.webp`,
    alt: "Modelo con abrigo oversized de piel sintética y mangas voluminosas en tonos grises, moda invierno editorial.",
  },
  /** Chaqueta cuero negra, medias */
  leatherEditorial: {
    src: `${base}/L1004526-2_resultado.webp`,
    alt: "Modelo con chaqueta de cuero negra, medias y tacones posando contra pared gris — moda urbana elegante.",
  },
  /** Bomber pelo sintético */
  bomberFurCollar: {
    src: `${base}/L1004645-2_resultado.webp`,
    alt: "Modelo con chaqueta negra acolchada con cuello de pelo sintético — moda urbana invierno.",
  },
  /** Dos modelos, abrigos negros */
  duoUrbanWinter: {
    src: `${base}/L1004692-2_resultado.webp`,
    alt: "Dos modelos femeninas con abrigos negros de moda urbana posando en interior minimalista.",
  },
  /** Escaleras hormigón, top blanco */
  editorialStairsLounge: {
    src: `${base}/L1004838-2_resultado.webp`,
    alt: "Mujer con vestimenta blanca y negra recostada en escaleras de cemento, gafas de sol y accesorios dorados, estética editorial minimalista.",
  },
  /** Reserva — documentación incompleta en descripcion_imagenes.md */
  editorialReserve: {
    src: `${base}/6A4A4751-2_resultado.webp`,
    alt: "Campaña editorial Rebelle Boutique — moda de lujo.",
  },
} as const;

export type RebelleImageKey = keyof typeof RebelleImg;

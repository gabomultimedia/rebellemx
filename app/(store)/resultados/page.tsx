import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { ProductCard } from "@/components/store/ProductCard";
import { RebelleImg } from "@/lib/rebelle-images";

type Props = { searchParams: Promise<{ q?: string }> };

const testimonios = [
  {
    quote:
      "Rebelle no solo me vendió un vestido, me dio la armadura necesaria para cerrar mi negociación más importante. La asesoría de Thalia es estratégica.",
    author: "Valentina, CEO & Visionaria",
  },
  {
    quote:
      "La tranquilidad de saber que mi peinado, maquillaje y outfit están en perfecta sincronía no tiene precio. Es el máximo lujo de la eficiencia.",
    author: "Regina, Líder Social",
  },
  {
    quote: "Buscaba exclusividad y encontré una identidad. En mi graduación, sentí que era la única mujer en el salón. No hubo comparaciones, solo admiración.",
    author: "Miranda, Relevo Generacional",
  },
  {
    quote: "Es mi cámara de secretos. Cada vez que tengo un evento de gala, sé que en Rebelle diseñarán mi mejor versión sin que yo tenga que preocuparme por la logística.",
    author: "Cliente VIB",
  },
];

/** Orden alineado con paginas.md — mosaico Total Look */
const mosaic = [
  RebelleImg.leatherEditorial,
  RebelleImg.galaWhiteSculptural,
  RebelleImg.sequinsJacket,
  RebelleImg.duoUrbanWinter,
  RebelleImg.structuredSuit,
  RebelleImg.winterOversizedCoat,
];

export default async function ResultadosPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const term = q?.trim() ?? "";

  if (term) {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: term } },
          { shortDesc: { contains: term } },
          { description: { contains: term } },
        ],
      },
      include: { images: { orderBy: { sortOrder: "asc" } } },
      take: 48,
    });

    return (
      <div className="px-5 py-12 sm:px-6 md:px-12">
        <div className="mx-auto max-w-[1600px]">
          <h1 className="font-headline text-2xl text-on-surface sm:text-3xl">Búsqueda en boutique</h1>
          <p className="mt-2 text-sm text-on-surface-variant">Resultados para &quot;{term}&quot;</p>
          <p className="mt-4 text-sm">
            <Link href="/resultados" className="text-primary underline">
              Volver a galería y testimonios
            </Link>
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {products.length === 0 ? <p className="mt-12 text-center text-on-surface-variant">Sin resultados. Prueba otro término.</p> : null}
        </div>
      </div>
    );
  }

  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "526641234567";

  return (
    <div className="px-5 py-14 sm:px-6 md:px-12 md:py-20">
      <header className="mx-auto max-w-[900px] text-center">
        <p className="font-label text-[10px] uppercase tracking-[0.25em] text-primary">Resultados</p>
        <h1 className="mt-4 font-headline text-3xl text-on-surface sm:text-4xl md:text-5xl">La prueba real de un estilo imponente.</h1>
        <p className="mx-auto mt-6 max-w-[65ch] font-body text-[15px] leading-relaxed text-on-surface-variant sm:text-base">
          En Rebelle Boutique, los resultados hablan por sí mismos. No solo entregamos piezas de lujo; diseñamos la seguridad con la que nuestras clientas conquistan sus
          escenarios. Explora los testimonios de quienes han vivido la experiencia y la galería visual de nuestra metodología de Total Look.
        </p>
      </header>

      <section className="mx-auto mt-16 max-w-[1000px] sm:mt-20">
        <h2 className="text-center font-headline text-2xl text-on-surface sm:text-3xl">La Experiencia Rebelle en sus Propias Palabras.</h2>
        <ul className="mt-10 space-y-10">
          {testimonios.map((t) => (
            <li key={t.author} className="border-b border-outline-variant/30 pb-10 last:border-0">
              <blockquote className="font-headline text-lg italic leading-relaxed text-on-surface sm:text-xl">&quot;{t.quote}&quot;</blockquote>
              <cite className="mt-4 block font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant not-italic sm:text-[11px]">— {t.author}</cite>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-20 max-w-[1400px] sm:mt-28">
        <h2 className="text-center font-headline text-2xl text-on-surface sm:text-3xl md:text-4xl">
          Mosaico de Transformaciones: El Total Look en Acción.
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-6">
          {mosaic.map((img, i) => (
            <div
              key={img.src}
              className={`relative aspect-[3/4] overflow-hidden bg-surface-container ${
                i === 1 ? "md:mt-12" : ""} ${i === 4 ? "md:mt-10" : ""}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                quality={88}
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width:768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-[720px] text-center sm:mt-28">
        <h2 className="font-headline text-2xl text-on-surface sm:text-3xl">¿Lista para ser la próxima protagonista?</h2>
        <p className="mt-4 font-body text-on-surface-variant">Tu transformación comienza con una conversación. Asegura tu lugar en nuestra agenda y permite que diseñemos tu look de impacto.</p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center bg-on-surface px-8 py-4 font-label text-[11px] uppercase tracking-[0.2em] text-surface transition-colors hover:bg-primary hover:text-white"
          >
            Agendar mi Experiencia Total Look
          </Link>
          <a
            href={`https://wa.me/${wa}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-primary px-8 py-4 font-label text-[11px] uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Hablar con un Concierge por WhatsApp
          </a>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-[600px] border-t border-outline-variant/30 pt-14 text-center sm:mt-24">
        <h2 className="font-headline text-xl text-on-surface sm:text-2xl">Buscar en la boutique</h2>
        <form action="/resultados" method="get" className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            name="q"
            placeholder="Vestido, bolso, tendencia…"
            className="min-w-0 flex-1 border border-outline-variant bg-surface px-4 py-3 font-body text-sm text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:outline-none"
          />
          <button
            type="submit"
            className="bg-primary px-6 py-3 font-label text-[11px] uppercase tracking-[0.2em] text-on-primary hover:bg-on-surface hover:text-surface"
          >
            Buscar
          </button>
        </form>
      </section>
    </div>
  );
}

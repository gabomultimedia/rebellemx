import Link from "next/link";
import Image from "next/image";
import { HomeFeaturedCuraduria } from "@/components/store/home/HomeFeaturedCuraduria";
import { HomeStudioBlock } from "@/components/store/home/HomeStudioBlock";
import { HomeTestimonial } from "@/components/store/home/HomeTestimonial";
import { HomeConciergeCta } from "@/components/store/home/HomeConciergeCta";
import { RebelleImg } from "@/lib/rebelle-images";

const pilares = [
  {
    n: "01",
    title: "Boutique",
    sub: "CURADURÍA INTERNACIONAL",
    href: "/boutique",
    ...RebelleImg.galaWhiteSculptural,
  },
  {
    n: "02",
    title: "Studio",
    sub: "EL ARTE DE LA IMAGEN",
    href: "/studio",
    ...RebelleImg.leatherEditorial,
  },
  {
    n: "03",
    title: "Consultoría",
    sub: "ESTILO ESTRATÉGICO",
    href: "/consultoria",
    ...RebelleImg.trenchBricks,
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={RebelleImg.heroHome.src}
            alt={RebelleImg.heroHome.alt}
            fill
            priority
            quality={92}
            className="object-cover object-[center_22%] sm:object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-5xl px-5 text-center sm:px-6">
          <span className="mb-5 block font-label text-[13px] uppercase leading-snug tracking-[0.2em] text-surface-container/95 sm:mb-6 sm:text-[15px] md:text-[16px]">
            El destino definitivo de la exclusividad y el lujo en la frontera. Fusionamos curaduría de moda internacional con estilismo profesional para diseñar tu
            armadura de poder.
          </span>
          <h1 className="mb-10 font-headline text-4xl leading-[1.08] tracking-[-0.02em] text-white sm:mb-12 sm:text-6xl md:text-7xl lg:text-8xl">
            Domina tu entorno con el look que nadie más tiene.
          </h1>
          <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-6">
            <Link
              href="/studio"
              className="inline-flex w-full items-center justify-center bg-on-surface px-10 py-4 text-center font-label text-[11px] uppercase tracking-[0.15em] text-surface transition-colors duration-500 hover:bg-primary sm:w-auto sm:px-12 sm:py-5 sm:text-[12px]"
            >
              Asegura tu Look de Poder (Reserva Studio)
            </Link>
            <Link
              href="/tienda"
              className="inline-flex w-full items-center justify-center border border-primary px-10 py-4 text-center font-label text-[11px] uppercase tracking-[0.15em] text-primary backdrop-blur-sm transition-all duration-500 hover:bg-primary hover:text-white sm:w-auto sm:px-12 sm:py-5 sm:text-[12px]"
            >
              Explorar la Colección (Tienda)
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 sm:bottom-10">
          <div className="h-20 w-px bg-gradient-to-b from-primary to-transparent sm:h-24" />
        </div>
      </section>

      <section className="bg-surface px-5 py-20 sm:px-6 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-end gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <h2 className="mb-6 font-headline text-3xl text-on-surface sm:mb-8 sm:text-4xl md:text-5xl lg:text-6xl">Rebelledía con causa: Tu confianza.</h2>
            <div className="mb-6 h-px w-full bg-primary/30 sm:mb-8" />
          </div>
          <div className="space-y-6 sm:space-y-8">
            <p className="max-w-[60ch] font-body text-[15px] leading-relaxed text-on-surface-variant sm:text-base">
              Rebelle Boutique nace de la visión de Thalia, experta en consultoría de imagen, para resolver la desconexión entre la moda de lujo y el arreglo personal.
              Entendemos que tu tiempo es tu activo más valioso y tu imagen tu herramienta de negociación más fuerte. Aquí, no solo eliges una pieza; diseñas una
              transformación total bajo nuestra metodología de Ingeniería de Imagen.
            </p>
            <Link
              href="/nosotros"
              className="inline-block border-b border-primary/40 pb-1 font-label text-[11px] uppercase tracking-[0.2em] text-primary transition-all duration-300 hover:border-primary sm:text-[12px]"
            >
              Conoce la historia detrás de Rebelle →
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-6 md:px-12 md:pb-32">
        <div className="mx-auto grid max-w-[1920px] grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
          {pilares.map((p) => (
            <Link key={p.n} href={p.href} className="hover-gold-overlay group relative aspect-[3/4] min-h-[280px] cursor-pointer overflow-hidden sm:min-h-[320px]">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                quality={90}
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/40" />
              <div className="absolute left-6 top-6 sm:left-10 sm:top-10">
                <span className="font-headline text-6xl text-stroke-thin opacity-50 sm:text-7xl md:text-8xl">{p.n}</span>
              </div>
              <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10">
                <h3 className="font-headline text-2xl uppercase tracking-wider text-white sm:text-3xl">{p.title}</h3>
                <p className="mt-2 font-label text-[9px] uppercase tracking-[0.1em] text-white/70 sm:text-[10px]">{p.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <HomeFeaturedCuraduria />
      <HomeStudioBlock />
      <HomeTestimonial />
      <HomeConciergeCta />
    </>
  );
}

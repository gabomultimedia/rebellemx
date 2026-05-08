import Link from "next/link";

export function HomeTestimonial() {
  return (
    <section className="bg-[#F7F4EF] py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-6 md:px-12">
        <span className="block select-none font-headline text-7xl leading-none text-primary/10 sm:text-8xl md:text-9xl">“</span>
        <div className="relative -mt-10 sm:-mt-12 md:-mt-16">
          <h2 className="mb-3 font-label text-[11px] uppercase tracking-[0.3em] text-primary sm:mb-4 sm:text-[12px]">Mujeres que Comandan Respeto</h2>
          <p className="mb-8 font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant sm:mb-10 sm:text-[11px]">El impacto de una imagen coherente.</p>
          <p className="mx-auto mb-8 max-w-[52ch] font-body text-sm leading-relaxed text-on-surface-variant sm:mb-10 sm:text-base">
            Nuestras clientas no solo visten bien; proyectan éxito. Explora las transformaciones de las mujeres líderes que han confiado en la Ingeniería de Imagen de
            Rebelle para sus momentos más cruciales.
          </p>
          <blockquote className="mb-8 font-headline text-xl italic leading-relaxed text-on-surface sm:mb-10 sm:text-2xl md:text-3xl lg:text-4xl">
            &quot;Rebelle me devolvió la seguridad de saber que soy la mujer mejor vestida del salón. La asesoría de Thalia es, literalmente, una herramienta de
            poder.&quot;
          </blockquote>
          <cite className="not-italic font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant sm:text-[11px]">
            — Valentina, CEO &amp; Visionaria
          </cite>
          <div className="mt-10 sm:mt-12">
            <Link
              href="/resultados"
              className="inline-block border-b border-primary/50 pb-1 font-label text-[11px] uppercase tracking-[0.2em] text-primary transition-colors hover:border-primary sm:text-[12px]"
            >
              Ver Galería de Éxito Visual
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

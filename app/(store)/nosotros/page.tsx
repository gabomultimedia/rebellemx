import Image from "next/image";
import Link from "next/link";
import { RebelleImg } from "@/lib/rebelle-images";

export const metadata = { title: "Nosotros | Rebelle Boutique" };

const valores = [
  "Exclusividad Real: Si es para todas, no es para una mujer Rebelle. Nos alejamos de lo masivo para proteger tu identidad.",
  "Empoderamiento: Cada acción que tomamos busca elevar tu seguridad interior.",
  "Excelencia Estética: El detalle es nuestra obsesión, desde la costura de una prenda hasta el diseño de una ceja.",
  "Disrupción: Desafiamos las reglas tradicionales para ofrecer soluciones que respeten tu tiempo y tu ambición.",
];

export default function NosotrosPage() {
  return (
    <div className="px-5 py-14 sm:px-6 md:px-12 md:py-20">
      <article className="mx-auto max-w-[900px]">
        <header className="mb-12 text-center md:mb-16">
          <p className="font-label text-[10px] uppercase tracking-[0.25em] text-primary">Acerca de</p>
          <h1 className="mt-4 font-headline text-3xl text-on-surface sm:text-4xl md:text-5xl">La Moda es tu Lenguaje de Poder.</h1>
        </header>

        <div className="relative mb-12 aspect-[4/5] w-full max-w-md overflow-hidden sm:mx-auto sm:mb-16 md:max-w-lg">
          <Image
            src={RebelleImg.structuredSuit.src}
            alt={RebelleImg.structuredSuit.alt}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 28rem"
            priority
          />
        </div>

        <section className="space-y-6 text-[15px] leading-relaxed text-on-surface-variant sm:text-base">
          <p>
            En el dinamismo de la frontera, donde la imagen personal es una herramienta de negociación y estatus, nace Rebelle Boutique. No somos una tienda de moda
            convencional; somos un ecosistema disruptivo diseñado para la mujer que no busca simplemente encajar, sino dominar su entorno.
          </p>
          <p>
            Creemos que la ropa tiene el poder de transformar tu psicología y, por ende, tu proyección ante el mundo. Nuestra misión es simple: eliminar la inseguridad
            estética y entregarte una armadura de confianza absoluta.
          </p>
        </section>

        <section className="mt-16 border-t border-outline-variant/30 pt-14 md:mt-20 md:pt-16">
          <h2 className="font-headline text-2xl text-on-surface sm:text-3xl md:text-4xl">El Ojo Clínico detrás del Lujo.</h2>
          <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-on-surface-variant sm:text-base">
            <p>
              Con una trayectoria sólida en el mundo del estilismo y una pasión innata por la estética, Thalia fundó Rebelle Boutique tras identificar una carencia
              crítica en el mercado: la falta de una visión integral.
            </p>
            <p>
              Observó que muchas mujeres adquirían piezas espectaculares pero perdían el impacto al no lograr una armonía visual entre su vestimenta y su arreglo
              personal. Como curadora y Personal Shopper internacional, Thalia viaja personalmente a los epicentros de la moda global para seleccionar piezas que no solo
              siguen tendencias, sino que cuentan una historia de éxito. Su visión es clara: que cada mujer que entre a Rebelle, salga lista para conquistar su propia
              historia.
            </p>
          </div>
        </section>

        <section className="mt-16 border-t border-outline-variant/30 pt-14 md:mt-20 md:pt-16">
          <h2 className="font-headline text-2xl text-on-surface sm:text-3xl md:text-4xl">Más que una Boutique, un Cuartel General de Estilo.</h2>
          <p className="mt-6 text-[15px] leading-relaxed text-on-surface-variant sm:text-base">
            ¿Qué nos hace diferentes? Nuestra metodología de Ingeniería de Imagen. Entendemos que un look imponente no se logra solo con un vestido; es la sincronización
            perfecta entre tres pilares:
          </p>
          <ol className="mt-8 list-decimal space-y-4 pl-5 font-body text-[15px] leading-relaxed text-on-surface-variant sm:text-base">
            <li>
              <strong className="font-medium text-on-surface">Curaduría de exclusividad:</strong> Piezas únicas y accesorios de importación que garantizan que nunca te
              verás igual a nadie más.
            </li>
            <li>
              <strong className="font-medium text-on-surface">Consultoría estratégica:</strong> Analizamos tu fisonomía, colorimetría y los objetivos de tu evento para
              seleccionar lo que realmente te empodera.
            </li>
            <li>
              <strong className="font-medium text-on-surface">Studio Rebelle:</strong> El toque final. Sincronizamos tu maquillaje y peinado editorial con tu outfit en un
              mismo lugar, eliminando el caos logístico y asegurando la perfección técnica.
            </li>
          </ol>
        </section>

        <section className="mt-16 border-t border-outline-variant/30 pt-14 md:mt-20 md:pt-16">
          <h2 className="font-headline text-2xl text-on-surface sm:text-3xl md:text-4xl">Nuestros valores (lo que nos mueve)</h2>
          <ul className="mt-8 space-y-4 font-body text-[15px] leading-relaxed text-on-surface-variant sm:text-base">
            {valores.map((v) => (
              <li key={v.slice(0, 24)} className="flex gap-2">
                <span className="text-primary" aria-hidden>
                  ●
                </span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 border-t border-outline-variant/30 pt-14 md:mt-20 md:pt-16">
          <h2 className="font-headline text-2xl text-on-surface sm:text-3xl md:text-4xl">Un Legado de Confianza.</h2>
          <p className="mt-6 text-[15px] leading-relaxed text-on-surface-variant sm:text-base">
            Rebelle Boutique se proyecta como la marca de estilo de vida premium más influyente de la región, expandiendo nuestra experiencia de &quot;Total Look&quot; a
            través de una plataforma digital líder y nuestra propia línea de ropa exclusiva. Nuestra Rebelledía tiene una causa: la causa de tu propia confianza.
          </p>
          <Link
            href="/resultados"
            className="mt-10 inline-block border-b border-primary/50 pb-1 font-label text-[11px] uppercase tracking-[0.2em] text-primary hover:border-primary sm:text-[12px]"
          >
            Explora nuestros resultados →
          </Link>
        </section>
      </article>
    </div>
  );
}

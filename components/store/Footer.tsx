import Link from "next/link";
import { Camera, Clapperboard, MessageCircle } from "lucide-react";
import { RebelleLogo } from "@/components/store/RebelleLogo";

const ig = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "#";
const yt = process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "#";
const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "526641234567";

export function Footer() {
  const waHref = `https://wa.me/${wa}`;

  return (
    <footer className="border-t border-primary/30 bg-surface px-5 pt-16 sm:px-6 md:px-12 md:pt-20">
      <p className="mx-auto mb-10 max-w-3xl text-center font-body text-sm leading-relaxed text-on-surface-variant">
        El destino definitivo de la exclusividad y el lujo en la frontera: traemos lo mejor de la moda mundial directamente a tu clóset, fusionándolo con asesoría
        experta y estilismo profesional para crear un Total Look imponente que garantiza que seas la única protagonista de cada escenario.
      </p>
      <div className="mx-auto mb-12 flex max-w-xl flex-col items-center justify-center gap-3 border-y border-outline-variant/20 py-8 text-center sm:flex-row sm:gap-6">
        <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Exclusividad garantizada. Envíos de lujo a todo México.</span>
        <a href={waHref} className="inline-flex items-center gap-2 font-label text-[10px] uppercase tracking-[0.2em] text-primary hover:underline">
          <MessageCircle className="h-4 w-4" strokeWidth={1.25} />
          ¿Dudas con tu talla o look? Hablar con una experta
        </a>
      </div>

      <div className="mx-auto grid max-w-[1920px] grid-cols-1 gap-10 md:grid-cols-4 md:gap-12">
        <div className="md:col-span-1">
          <RebelleLogo href="/" wordmarkOnly className="mb-4 h-8 w-[150px] md:h-9 md:w-[170px]" />
          <p className="font-label text-[10px] uppercase leading-loose tracking-[0.15em] text-on-surface-variant">
            Curaduría de piezas únicas y servicios de belleza de alto nivel para la mujer contemporánea.
          </p>
        </div>
        <div>
          <h4 className="mb-6 font-label text-[11px] uppercase tracking-[0.2em] text-primary">Explorar</h4>
          <ul className="space-y-4 font-label text-[10px] uppercase tracking-[0.15em] text-on-surface-variant">
            <li>
              <Link href="/tienda" className="transition-colors hover:text-on-surface">
                Tienda
              </Link>
            </li>
            <li>
              <Link href="/boutique" className="transition-colors hover:text-on-surface">
                Boutique
              </Link>
            </li>
            <li>
              <Link href="/studio" className="transition-colors hover:text-on-surface">
                Studio
              </Link>
            </li>
            <li>
              <Link href="/consultoria" className="transition-colors hover:text-on-surface">
                Consultoría
              </Link>
            </li>
            <li>
              <Link href="/journal" className="transition-colors hover:text-on-surface">
                Journal
              </Link>
            </li>
            <li>
              <Link href="/resultados" className="transition-colors hover:text-on-surface">
                Galería &amp; resultados
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-6 font-label text-[11px] uppercase tracking-[0.2em] text-primary">Compañía</h4>
          <ul className="space-y-4 font-label text-[10px] uppercase tracking-[0.15em] text-on-surface-variant">
            <li>
              <Link href="/nosotros" className="transition-colors hover:text-on-surface">
                Nosotros
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="transition-colors hover:text-on-surface">
                Privacidad
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="transition-colors hover:text-on-surface">
                Términos
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="transition-colors hover:text-on-surface">
                Contacto
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-6 font-label text-[11px] uppercase tracking-[0.2em] text-primary">Síguenos</h4>
          <div className="flex gap-4">
            <a
              href={ig}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center border border-outline-variant/30 transition-all hover:bg-primary hover:text-white"
              aria-label="Instagram"
            >
              <Camera className="h-5 w-5" strokeWidth={1.25} />
            </a>
            <a
              href={yt}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center border border-outline-variant/30 transition-all hover:bg-primary hover:text-white"
              aria-label="YouTube"
            >
              <Clapperboard className="h-5 w-5" strokeWidth={1.25} />
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-6 border-t border-outline-variant/10 pt-10 md:col-span-4 md:flex-row md:items-center md:justify-between">
          <p className="font-label text-[9px] uppercase tracking-[0.2em] text-on-surface-variant/80">
            © {new Date().getFullYear()} REBELLE ATELIER. TODOS LOS DERECHOS RESERVADOS.
          </p>
          <div className="flex flex-wrap gap-8">
            <span className="cursor-pointer font-label text-[9px] uppercase tracking-[0.2em] text-on-surface-variant/80 transition-colors hover:text-primary">
              Vogue Partner
            </span>
            <span className="cursor-pointer font-label text-[9px] uppercase tracking-[0.2em] text-on-surface-variant/80 transition-colors hover:text-primary">
              LVMH Member
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

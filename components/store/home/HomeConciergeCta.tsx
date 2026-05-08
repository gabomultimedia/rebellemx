import Link from "next/link";
import { MessageCircle, MapPin } from "lucide-react";

export function HomeConciergeCta() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "526641234567";
  const waHref = `https://wa.me/${wa}`;

  return (
    <section className="border-t border-outline-variant/30 px-5 py-20 sm:px-6 md:px-12 md:py-32">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center text-center">
        <h2 className="mb-6 font-headline text-2xl text-on-surface sm:mb-8 sm:text-3xl md:text-4xl lg:text-5xl">Tu asistente personal de estilo te espera.</h2>
        <p className="mx-auto mb-10 max-w-[48ch] font-body text-[15px] leading-relaxed text-on-surface-variant sm:mb-12 sm:text-base">
          ¿Tienes un evento próximo o buscas una renovación estratégica de tu imagen? Estamos listas para diseñar tu mejor versión.
        </p>
        <div className="mb-6 flex w-full max-w-md flex-col gap-4 sm:max-w-none sm:flex-row sm:justify-center sm:gap-6">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-green-900 px-8 py-4 font-label text-[10px] uppercase tracking-[0.15em] text-white transition-colors hover:bg-green-800 sm:px-10 sm:py-5 sm:text-[11px]"
          >
            <MessageCircle className="h-[18px] w-[18px] shrink-0" strokeWidth={1.5} />
            Hablar con una Asesora ahora
          </a>
          <Link
            href="/contacto"
            className="flex items-center justify-center gap-3 border border-primary px-8 py-4 font-label text-[10px] uppercase tracking-[0.15em] text-primary transition-all hover:bg-primary hover:text-white sm:px-10 sm:py-5 sm:text-[11px]"
          >
            <MapPin className="h-[18px] w-[18px] shrink-0" strokeWidth={1.5} />
            Ubicación Flagship (Tijuana)
          </Link>
        </div>
        <p className="text-center font-label text-[10px] uppercase tracking-wider text-on-surface-variant sm:text-[11px]">
          WhatsApp Concierge: atención inmediata y citas · Visítanos bajo cita previa
        </p>
      </div>
    </section>
  );
}

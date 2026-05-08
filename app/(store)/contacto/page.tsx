import Link from "next/link";
import { MessageCircle, MapPin, Mail } from "lucide-react";
import { ContactForm } from "./contact-form";
import { getPublicSiteStrings } from "@/lib/site-public";

export const metadata = { title: "Contacto & Concierge | Rebelle" };

export default async function ContactoPage() {
  const { boutiqueAddress, boutiqueHours, whatsappNumber } = await getPublicSiteStrings();
  const waHref = `https://wa.me/${whatsappNumber}`;
  const vipEmail = process.env.NEXT_PUBLIC_VIP_EMAIL ?? "concierge@rebelleboutique.com";

  return (
    <div className="px-5 py-14 sm:px-6 md:px-12 md:py-20">
      <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="font-label text-[10px] uppercase tracking-[0.25em] text-primary">Concierge</p>
          <h1 className="mt-4 font-headline text-3xl text-on-surface sm:text-4xl">Contacto</h1>
          <p className="mt-2 font-label text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">Estamos listas para diseñar tu mejor versión.</p>
          <p className="mt-6 font-body text-[15px] leading-relaxed text-on-surface-variant sm:text-base">
            ¿Tienes un evento próximo o buscas una renovación estratégica? Escríbenos por los canales VIP o deja tu mensaje en el formulario.
          </p>

          <ul className="mt-10 space-y-8">
            <li className="flex gap-4">
              <MessageCircle className="mt-1 h-5 w-5 shrink-0 text-primary" strokeWidth={1.25} />
              <div>
                <p className="font-label text-[11px] uppercase tracking-[0.2em] text-on-surface">WhatsApp Concierge</p>
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm text-primary hover:underline">
                  Atención personalizada inmediata para tus dudas de estilo o disponibilidad de agenda.
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" strokeWidth={1.25} />
              <div>
                <p className="font-label text-[11px] uppercase tracking-[0.2em] text-on-surface">Ubicación Flagship</p>
                <p className="mt-1 text-sm text-on-surface-variant">{boutiqueAddress}</p>
                <p className="mt-1 text-xs text-on-surface-variant">
                  Vive la experiencia completa en nuestro ecosistema físico de lujo. Flagship Boutique en Tijuana, B.C.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" strokeWidth={1.25} />
              <div>
                <p className="font-label text-[11px] uppercase tracking-[0.2em] text-on-surface">Email VIP</p>
                <a href={`mailto:${vipEmail}`} className="mt-1 block text-sm text-primary hover:underline">
                  {vipEmail}
                </a>
                <p className="mt-1 text-xs text-on-surface-variant">Personal Shopper internacional o solicitudes de prensa.</p>
              </div>
            </li>
          </ul>

          <div className="mt-10 border-t border-outline-variant/30 pt-8">
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-primary">Horarios de atención</p>
            <p className="mt-2 text-sm text-on-surface-variant">{boutiqueHours}</p>
            <p className="mt-2 text-xs text-on-surface-variant">Atención exclusiva bajo cita previa.</p>
          </div>

          <Link href="/studio" className="mt-8 inline-block font-label text-[11px] uppercase tracking-wider text-primary hover:underline">
            Agendar Studio →
          </Link>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

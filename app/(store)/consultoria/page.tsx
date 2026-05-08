import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { ServiceType } from "@prisma/client";
import { formatMoney } from "@/lib/utils";
import { RebelleImg } from "@/lib/rebelle-images";

export const metadata = { title: "Consultoría VIP | Rebelle" };

const copyBlocks = [
  {
    title: "Diagnóstico de Imagen Estratégica",
    body: "Sesión privada de análisis de color (colorimetría) y morfología (fisonomía). Aprenderás qué cortes, texturas y tonos potencian tu autoridad natural.",
  },
  {
    title: "European Concierge (Personal Shopper)",
    body: "Acceso directo a las pasarelas del mundo. Durante sus viajes a Europa, Thalia actúa como tu cazadora de tendencias, adquiriendo piezas bajo pedido que no llegarán a ninguna otra tienda en México.",
  },
  {
    title: "Auditoría de Guardarropa",
    body: "Transformamos tu clóset en una herramienta eficiente. Filtramos, organizamos y creamos combinaciones de alto impacto con tus piezas actuales y nuevas adquisiciones.",
  },
  {
    title: "Asesoría para Eventos de Gala",
    body: "Acompañamiento total para tus momentos de mayor exposición. Desde la elección del vestido hasta la supervisión final en el Studio para garantizar un éxito rotundo.",
  },
];

export default async function ConsultoriaPage() {
  const services = await prisma.service.findMany({
    where: { isActive: true, type: ServiceType.CONSULTORIA },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="px-5 py-14 sm:px-6 md:px-12 md:py-20">
      <div className="relative mx-auto mb-12 aspect-[3/4] max-h-[520px] w-full max-w-md overflow-hidden sm:mb-16 md:max-w-lg">
        <Image
          src={RebelleImg.trenchBricks.src}
          alt={RebelleImg.trenchBricks.alt}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 28rem"
          priority
        />
      </div>

      <div className="mx-auto max-w-[900px] text-center">
        <p className="font-label text-[10px] uppercase tracking-[0.25em] text-primary">Consultoría VIP</p>
        <h1 className="mt-4 font-headline text-3xl text-on-surface sm:text-4xl md:text-5xl">Consultoría VIP</h1>
        <p className="mt-3 font-label text-[11px] uppercase tracking-[0.2em] text-on-surface-variant sm:text-xs">
          Tu inversión más rentable: El conocimiento aplicado a tu imagen.
        </p>
        <p className="mx-auto mt-8 max-w-[65ch] text-left font-body text-[15px] leading-relaxed text-on-surface-variant sm:text-center sm:text-base">
          La verdadera elegancia nace de la estrategia. Thalia utiliza su metodología de &quot;Ingeniería de Imagen&quot; para alinear tu apariencia con tus objetivos de
          vida, asegurando que cada prenda que vistas trabaje a tu favor.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-[1000px] gap-8 sm:mt-16">
        {copyBlocks.map((b) => (
          <div key={b.title} className="border border-outline-variant/40 bg-surface-container-low p-6 sm:p-8">
            <h2 className="font-headline text-xl text-on-surface sm:text-2xl">{b.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-on-surface-variant sm:text-base">{b.body}</p>
          </div>
        ))}
      </div>

      {services.length > 0 ? (
        <>
          <h2 className="mx-auto mt-16 max-w-[1000px] font-headline text-2xl text-on-surface sm:mt-20 sm:text-3xl">Servicios con precio en agenda</h2>
          <ul className="mx-auto mt-8 grid max-w-[1000px] gap-6">
            {services.map((s) => (
              <li key={s.id} className="border border-outline-variant/40 bg-surface p-6 sm:p-8">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <h3 className="font-headline text-xl text-on-surface sm:text-2xl">{s.name}</h3>
                    {s.shortDesc ? <p className="mt-2 text-sm text-on-surface-variant">{s.shortDesc}</p> : null}
                    <p className="mt-2 text-xs text-on-surface-variant">{s.duration} min</p>
                  </div>
                  <p className="font-headline text-lg text-primary sm:text-xl">{formatMoney(Number(s.price))}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <div className="mx-auto mt-14 max-w-[1000px] text-center sm:mt-16">
        <Link
          href="/contacto"
          className="inline-block bg-primary px-10 py-4 font-label text-[11px] uppercase tracking-[0.2em] text-on-primary transition-colors hover:bg-on-surface hover:text-surface sm:px-12 sm:text-[12px]"
        >
          Reservar Consultoría
        </Link>
      </div>
    </div>
  );
}

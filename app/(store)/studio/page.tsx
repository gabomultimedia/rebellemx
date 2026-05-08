import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { ServiceType } from "@prisma/client";
import { formatMoney } from "@/lib/utils";
import { RebelleImg } from "@/lib/rebelle-images";

export const metadata = { title: "Studio Rebelle" };

const copyBlocks = [
  {
    title: "Maquillaje Social & Editorial",
    body: "Aplicación técnica de alta duración utilizando productos premium. Diseñado según tu colorimetría para resaltar tus facciones bajo cualquier iluminación.",
  },
  {
    title: "Hairstyling de Alto Perfil",
    body: "Desde ondas Hollywoodenses hasta recogidos editoriales. Estructuramos tu cabello para armonizar con el escote y el estilo de tu vestido.",
  },
  {
    title: "Diseño de Mirada HD (Pestañas)",
    body: "Aplicación de extensiones de pestañas con efecto natural o volumen ruso, diseñadas para abrir tu mirada y eliminar el cansancio visual.",
  },
  {
    title: "Arquitectura de Cejas & Microblading",
    body: "Definición profesional de cejas para enmarcar tu rostro. Incluye diseño de simetría y técnicas de micropigmentación de larga duración.",
  },
];

export default async function StudioPage() {
  const services = await prisma.service.findMany({
    where: { isActive: true, type: ServiceType.STUDIO },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="px-5 py-14 sm:px-6 md:px-12 md:py-20">
      <div className="relative mx-auto mb-12 aspect-[21/10] max-h-[420px] w-full max-w-[1200px] overflow-hidden sm:mb-16">
        <Image
          src={RebelleImg.editorialStairsLounge.src}
          alt={RebelleImg.editorialStairsLounge.alt}
          fill
          className="object-cover object-[center_30%]"
          sizes="(max-width:1200px) 100vw, 1200px"
          priority
        />
      </div>

      <div className="mx-auto max-w-[900px] text-center">
        <p className="font-label text-[10px] uppercase tracking-[0.25em] text-primary">Studio Rebelle</p>
        <h1 className="mt-4 font-headline text-3xl text-on-surface sm:text-4xl md:text-5xl">Studio Rebelle</h1>
        <p className="mt-3 font-label text-[11px] uppercase tracking-[0.2em] text-on-surface-variant sm:text-xs">Sal lista para conquistar con una experiencia de lujo impecable.</p>
        <p className="mx-auto mt-8 max-w-[65ch] text-left font-body text-[15px] leading-relaxed text-on-surface-variant sm:text-center sm:text-base">
          Bajo la dirección técnica de Thalia, nuestro Studio es el lugar donde la belleza se encuentra con la moda editorial. No aplicamos maquillaje; diseñamos rostros
          que complementan tu armadura Rebelle.
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
          <h2 className="mx-auto mt-16 max-w-[1000px] font-headline text-2xl text-on-surface sm:mt-20 sm:text-3xl">Reserva en agenda</h2>
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
          Agendar mi Experiencia Studio
        </Link>
      </div>
    </div>
  );
}

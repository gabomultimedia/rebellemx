import Image from "next/image";
import Link from "next/link";
import { Brush, Scissors, Eye, UserCircle } from "lucide-react";
import { RebelleImg } from "@/lib/rebelle-images";

const items = [
  { icon: Brush, label: "Maquillaje Social y Editorial" },
  { icon: Scissors, label: "Hairstyling de Alto Perfil" },
  { icon: Eye, label: "Diseño de Mirada HD (Pestañas)" },
  { icon: UserCircle, label: "Arquitectura de Cejas" },
];

export function HomeStudioBlock() {
  return (
    <section className="relative overflow-hidden bg-stone-950 py-20 text-white sm:py-28 md:py-32">
      <div className="absolute inset-0 z-0">
        <Image
          src={RebelleImg.duoUrbanWinter.src}
          alt={RebelleImg.duoUrbanWinter.alt}
          fill
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-stone-950/85" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 text-center sm:px-6 md:px-12">
        <h2 className="mb-6 font-headline text-3xl tracking-tight sm:mb-8 sm:text-4xl md:mb-10 md:text-5xl lg:text-6xl">
          Studio Rebelle: El Arte de la Sincronización
        </h2>
        <p className="mx-auto mb-12 max-w-[52ch] font-body text-[15px] leading-relaxed text-white/85 sm:mb-16 sm:text-base md:mb-24">
          ¿Por qué dejar tu arreglo personal al azar? En nuestro Studio, diseñamos el maquillaje editorial y el peinado que complementan específicamente tu outfit. Sal
          lista para conquistar tu evento en una sola parada de guante blanco.
        </p>
        <div className="mb-16 grid grid-cols-2 gap-8 sm:mb-20 sm:gap-10 md:mb-24 md:grid-cols-4 md:gap-12">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="group flex flex-col items-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center border border-white/20 transition-colors duration-500 group-hover:border-primary sm:mb-6 sm:h-16 sm:w-16">
                <Icon className="h-7 w-7 text-white sm:h-8 sm:w-8" strokeWidth={1} />
              </div>
              <span className="max-w-[12rem] font-label text-[10px] uppercase leading-snug tracking-[0.15em] text-white/90 sm:text-[11px] sm:tracking-[0.2em]">
                {label}
              </span>
            </div>
          ))}
        </div>
        <Link
          href="/studio"
          className="editorial-shadow inline-block bg-primary px-10 py-5 font-label text-[11px] uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-tertiary-container hover:text-on-tertiary-container sm:px-16 sm:py-6 sm:text-[12px]"
        >
          Agendar mi Experiencia Studio
        </Link>
      </div>
    </section>
  );
}

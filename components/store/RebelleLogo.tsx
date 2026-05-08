import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Logo dorado oficial en `public/branding/` (espacios codificados para URL estable). */
export const REBELLE_LOGO_SRC = "/branding/LOGO%20-%20DORADO%20-%20REBELLE.png";

type Props = {
  href?: string | null;
  className?: string;
  priority?: boolean;
  /** Variante compacta (misma pieza gráfica, menor caja). */
  wordmarkOnly?: boolean;
};

/**
 * Logo oficial (PNG dorado). Sin texto duplicado en HTML: solo la imagen.
 */
export function RebelleLogo({ href = "/", className, priority, wordmarkOnly = true }: Props) {
  const img = (
    <span
      className={cn(
        "relative inline-block shrink-0 overflow-hidden",
        wordmarkOnly
          ? "h-7 w-[130px] sm:h-8 sm:w-[148px] md:h-9 md:w-[168px]"
          : "h-10 w-[180px] sm:h-11 sm:w-[200px]",
        className,
      )}
      aria-label="Rebelle"
      role="img"
    >
      <Image
        src={REBELLE_LOGO_SRC}
        alt="Rebelle"
        fill
        sizes="200px"
        priority={priority}
        className="object-contain object-center"
      />
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        {img}
      </Link>
    );
  }

  return <span className="inline-flex items-center">{img}</span>;
}

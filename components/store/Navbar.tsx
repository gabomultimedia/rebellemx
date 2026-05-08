"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Search, Heart, User, ShoppingBag } from "lucide-react";
import { useUiStore } from "@/store/uiStore";
import { cn } from "@/lib/utils";
import { RebelleLogo } from "@/components/store/RebelleLogo";

const links = [
  { href: "/tienda", label: "Tienda" },
  { href: "/boutique", label: "Boutique" },
  { href: "/studio", label: "Studio" },
  { href: "/consultoria", label: "Consultoría" },
  { href: "/journal", label: "Journal" },
  { href: "/nosotros", label: "Nosotros" },
];

const iconClass =
  "text-primary transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const toggleCart = useUiStore((s) => s.toggleCart);

  return (
    <nav className="fixed top-0 z-50 flex h-20 w-full max-w-[1920px] items-center justify-between border-b border-outline-variant/20 bg-[#fcf9f4]/80 px-6 backdrop-blur-xl md:px-12">
      <RebelleLogo href="/" priority wordmarkOnly />
      <div className="hidden items-center gap-12 md:flex">
        {links.map(({ href, label }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "font-headline text-[11px] font-light uppercase tracking-tight transition-colors",
                active ? "border-b border-primary pb-1 text-black" : "text-stone-500 hover:text-black",
              )}
            >
              {label}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        <Link href="/resultados" className={iconClass} aria-label="Buscar">
          <Search strokeWidth={1} className="h-5 w-5" />
        </Link>
        <Link href="/cuenta/deseos" className={iconClass} aria-label="Lista de deseos">
          <Heart strokeWidth={1} className="h-5 w-5" />
        </Link>
        <Link href={session ? "/cuenta" : "/cuenta/login"} className={iconClass} aria-label="Mi cuenta">
          <User strokeWidth={1} className="h-5 w-5" />
        </Link>
        <button type="button" aria-label="Abrir carrito" onClick={() => toggleCart()} className={iconClass}>
          <ShoppingBag strokeWidth={1} className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
}

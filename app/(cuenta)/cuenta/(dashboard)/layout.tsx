import Link from "next/link";
import { signOut } from "@/lib/auth";

const nav = [
  { href: "/cuenta", label: "Perfil" },
  { href: "/cuenta/pedidos", label: "Pedidos" },
  { href: "/cuenta/citas", label: "Citas" },
  { href: "/cuenta/deseos", label: "Deseos" },
  { href: "/cuenta/membresia", label: "Membresía VIB" },
];

export default function CuentaDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface px-6 py-12 md:flex md:gap-12 md:px-12">
      <aside className="mb-10 w-full shrink-0 border-b border-outline-variant/30 pb-8 md:w-56 md:border-b-0 md:border-r md:pb-0 md:pr-8">
        <p className="font-label text-[10px] uppercase tracking-[0.2em] text-primary">Mi cuenta</p>
        <nav className="mt-6 flex flex-col gap-3">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm hover:text-primary">
              {n.label}
            </Link>
          ))}
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button type="submit" className="text-left text-sm text-on-surface-variant hover:text-error">
              Salir
            </button>
          </form>
        </nav>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}

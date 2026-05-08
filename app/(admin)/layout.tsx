import Link from "next/link";
import { signOut } from "@/lib/auth";
import { RebelleLogo } from "@/components/store/RebelleLogo";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/productos", label: "Productos" },
  { href: "/admin/pedidos", label: "Pedidos" },
  { href: "/admin/citas", label: "Citas" },
  { href: "/admin/clientes", label: "Clientes" },
  { href: "/admin/blog", label: "Journal" },
  { href: "/admin/configuracion", label: "Configuración" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F7F4EF]">
      <div className="flex">
        <aside className="fixed left-0 top-0 z-40 hidden h-screen w-56 flex-col border-r border-white/10 pt-8 md:flex">
          <div className="px-6">
            <RebelleLogo href="/admin" wordmarkOnly className="h-9 w-[168px]" />
          </div>
          <p className="px-6 font-label text-[9px] uppercase tracking-[0.2em] text-white/40">Admin</p>
          <nav className="mt-10 flex flex-col gap-2 px-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-sm px-2 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-[#D3AE6E]"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto px-4 pb-8">
            <Link href="/" className="block px-2 py-2 text-xs text-white/40 hover:text-white">
              Ver tienda
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button type="submit" className="px-2 py-2 text-xs text-white/40 hover:text-error">
                Salir
              </button>
            </form>
          </div>
        </aside>
        <main className="min-w-0 flex-1 md:pl-56">
          <div className="border-b border-white/10 md:hidden">
            <div className="flex items-center gap-2 px-4 py-4">
              <RebelleLogo href="/admin" wordmarkOnly className="h-8 w-[140px]" />
              <span className="font-label text-[10px] uppercase tracking-wider text-white/50">Admin</span>
            </div>
            <nav className="hide-scrollbar flex gap-1 overflow-x-auto border-t border-white/5 px-2 py-2">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="shrink-0 rounded-sm px-3 py-2 font-label text-[10px] uppercase tracking-wider text-white/70 hover:bg-white/5 hover:text-[#D3AE6E]"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="p-4 sm:p-6 md:p-10">{children}</div>
        </main>
      </div>
    </div>
  );
}

import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signOut } from "@/lib/auth";
import { customAuth } from "@/lib/custom-auth";
import prisma from "@/lib/prisma";

const customerNav = [
  { href: "/cuenta", label: "Perfil" },
  { href: "/cuenta/pedidos", label: "Pedidos" },
  { href: "/cuenta/citas", label: "Citas" },
  { href: "/cuenta/deseos", label: "Deseos" },
  { href: "/cuenta/membresia", label: "Membresía VIB" },
];

const adminNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/productos", label: "Productos" },
  { href: "/admin/pedidos", label: "Pedidos" },
  { href: "/admin/clientes", label: "Clientes" },
  { href: "/admin/citas", label: "Citas" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/configuracion", label: "Configuración" },
];

export default async function CuentaDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await customAuth();

  if (!session?.user?.id) {
    redirect("/cuenta/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, name: true, email: true, role: true },
  });

  if (!user) {
    redirect("/cuenta/login");
  }

  const isAdmin = user.role === "ADMIN" || user.role === "SUPERADMIN";
  const firstName = user.name?.split(" ")[0] || "Mi cuenta";

  return (
    <div className="min-h-screen bg-surface px-6 py-12 md:flex md:gap-12 md:px-12">
      <aside className="mb-10 w-full shrink-0 border-b border-outline-variant/30 pb-8 md:w-56 md:border-b-0 md:border-r md:pb-0 md:pr-8">
        <p className="font-label text-[10px] uppercase tracking-[0.2em] text-primary">
          Hola, {firstName}
        </p>
        <p className="mt-1 truncate text-xs text-on-surface-variant">{user.email}</p>

        <nav className="mt-6 flex flex-col gap-3">
          <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60">
            Mi cuenta
          </p>
          {customerNav.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm hover:text-primary">
              {n.label}
            </Link>
          ))}

          {isAdmin && (
            <>
              <p className="mt-4 font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60">
                Administración
              </p>
              {adminNav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="text-sm font-medium text-primary hover:text-primary/80"
                >
                  {n.label}
                </Link>
              ))}
            </>
          )}

          <form
            action={async () => {
              "use server";
              const cookieStore = await cookies();
              cookieStore.delete("auth-token");
              await signOut({ redirectTo: "/" });
            }}
            className="mt-4 border-t border-outline-variant/30 pt-4"
          >
            <button
              type="submit"
              className="text-left text-sm text-on-surface-variant hover:text-error"
            >
              Salir
            </button>
          </form>
        </nav>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}

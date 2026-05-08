import Link from "next/link";
import prisma from "@/lib/prisma";
import { formatMoney } from "@/lib/utils";

export default async function AdminProductosPage() {
  const products = await prisma.product.findMany({
    orderBy: { updatedAt: "desc" },
    take: 100,
    include: { category: true },
  });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl text-white">Productos</h1>
          <p className="mt-1 text-sm text-white/50">Listado (primeros 100)</p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="border border-[#D3AE6E] px-4 py-2 text-xs uppercase tracking-wider text-[#D3AE6E] hover:bg-[#D3AE6E]/10"
        >
          Nuevo producto
        </Link>
      </div>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm text-white/80">
          <thead className="border-b border-white/10 text-[10px] uppercase tracking-wider text-white/40">
            <tr>
              <th className="pb-3">Nombre</th>
              <th className="pb-3">Categoría</th>
              <th className="pb-3">Precio</th>
              <th className="pb-3">Stock</th>
              <th className="pb-3">Activo</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-white/5">
                <td className="py-3">
                  <Link href={`/admin/productos/${p.id}`} className="hover:text-[#D3AE6E]">
                    {p.name}
                  </Link>
                </td>
                <td className="py-3">{p.category?.name ?? "—"}</td>
                <td className="py-3">{formatMoney(Number(p.price))}</td>
                <td className="py-3">{p.stock}</td>
                <td className="py-3">{p.isActive ? "Sí" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

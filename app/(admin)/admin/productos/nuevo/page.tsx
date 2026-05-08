import Link from "next/link";

export default function AdminNuevoProductoPage() {
  return (
    <div>
      <Link href="/admin/productos" className="text-xs uppercase text-[#D3AE6E]">
        ← Productos
      </Link>
      <h1 className="mt-4 font-headline text-3xl text-white">Nuevo producto</h1>
      <p className="mt-4 max-w-xl text-sm text-white/50">
        Formulario completo + subida Cloudinary: siguiente iteración. Desde aquí puedes usar Prisma Studio (
        <code className="text-[#D3AE6E]">npm run db:studio</code>) o extender con{" "}
        <code className="text-[#D3AE6E]">POST /api/productos</code> cuando lo implementes.
      </p>
    </div>
  );
}

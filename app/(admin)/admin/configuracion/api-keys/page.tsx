import Link from "next/link";

/** Placeholder: la UI completa de API keys requería dependencias (shadcn/ui, sonner) no incluidas en el proyecto. */
export default function ApiKeysConfigPage() {
  return (
    <div className="max-w-xl text-white">
      <Link href="/admin/configuracion" className="text-xs uppercase tracking-wider text-[#D3AE6E] hover:underline">
        ← Configuración
      </Link>
      <h1 className="mt-4 font-headline text-2xl">Claves API</h1>
      <p className="mt-4 text-sm text-white/60">
        Configura Stripe, Resend y demás variables en el archivo <code className="text-[#D3AE6E]">.env</code> del servidor y en la pantalla principal de configuración del
        admin. Para una UI dedicada aquí, añade los componentes <code className="text-white/80">@/components/ui/*</code> y la librería <code className="text-white/80">sonner</code>.
      </p>
    </div>
  );
}

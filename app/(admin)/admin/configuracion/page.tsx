import prisma from "@/lib/prisma";

export default async function AdminConfigPage() {
  const configs = await prisma.siteConfig.findMany({ orderBy: { key: "asc" } });

  return (
    <div>
      <h1 className="font-headline text-3xl text-white">Configuración</h1>
      <p className="mt-2 text-sm text-white/50">Claves en base de datos (SiteConfig).</p>
      <ul className="mt-8 space-y-4 text-sm text-white/80">
        {configs.map((c) => (
          <li key={c.id} className="border border-white/10 p-4">
            <p className="font-mono text-[#D3AE6E]">{c.key}</p>
            <p className="mt-2 text-white/70">{c.value}</p>
            {c.description ? <p className="mt-1 text-xs text-white/40">{c.description}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

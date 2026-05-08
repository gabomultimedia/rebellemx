"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { RebelleLogo } from "@/components/store/RebelleLogo";

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const callbackUrl = search.get("callbackUrl") ?? "/cuenta";
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email"));
    const password = String(fd.get("password"));
    
    try {
      // Usar endpoint de login simple temporal
      const res = await fetch("/api/auth/simple-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      setLoading(false);
      
      if (!res.ok) {
        setError(data.error || "Credenciales incorrectas");
        return;
      }
      
      // Redirigir después de login exitoso
      router.push(callbackUrl);
      router.refresh();
    } catch (err) {
      setLoading(false);
      setError("Error de conexión");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-6">
      <div className="w-full max-w-md border border-outline-variant/40 bg-surface-container-low p-10">
        <RebelleLogo href="/" wordmarkOnly className="h-9 w-[168px] sm:h-10 sm:w-[188px]" />
        <h1 className="mt-8 font-headline text-2xl">Acceso</h1>
        <p className="mt-2 text-sm text-on-surface-variant">Cliente o administración</p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email"
            className="w-full border border-outline-variant px-3 py-2 text-sm"
          />
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Contraseña"
            className="w-full border border-outline-variant px-3 py-2 text-sm"
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Entrando…" : "Entrar"}
          </Button>
          {error ? <p className="text-sm text-error">{error}</p> : null}
        </form>
        <Link href="/" className="mt-8 inline-block text-xs uppercase tracking-wider text-primary">
          ← Volver a la tienda
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" />}>
      <LoginForm />
    </Suspense>
  );
}

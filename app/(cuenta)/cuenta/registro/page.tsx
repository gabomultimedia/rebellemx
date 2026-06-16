"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { RebelleLogo } from "@/components/store/RebelleLogo";

function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name")),
      email: String(fd.get("email")),
      password: String(fd.get("password")),
      phone: String(fd.get("phone") || ""),
    };

    if (payload.password !== String(fd.get("confirmPassword"))) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.error || "No se pudo crear la cuenta");
        return;
      }

      const loginRes = await fetch("/api/auth/simple-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: payload.email, password: payload.password }),
      });

      if (loginRes.ok) {
        router.push("/cuenta");
        router.refresh();
      } else {
        router.push("/cuenta/login");
      }
    } catch (err) {
      setLoading(false);
      setError("Error de conexión");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-6">
      <div className="w-full max-w-md border border-outline-variant/40 bg-surface-container-low p-10">
        <RebelleLogo href="/" wordmarkOnly className="h-9 w-[168px] sm:h-10 sm:w-[188px]" />
        <h1 className="mt-8 font-headline text-2xl">Crear cuenta</h1>
        <p className="mt-2 text-sm text-on-surface-variant">Nueva clienta Rebelle</p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Nombre completo"
            className="w-full border border-outline-variant px-3 py-2 text-sm"
          />
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email"
            className="w-full border border-outline-variant px-3 py-2 text-sm"
          />
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Teléfono (opcional)"
            className="w-full border border-outline-variant px-3 py-2 text-sm"
          />
          <input
            name="password"
            type="password"
            required
            autoComplete="new-password"
            placeholder="Contraseña (mín. 8 caracteres)"
            className="w-full border border-outline-variant px-3 py-2 text-sm"
          />
          <input
            name="confirmPassword"
            type="password"
            required
            autoComplete="new-password"
            placeholder="Confirmar contraseña"
            className="w-full border border-outline-variant px-3 py-2 text-sm"
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creando cuenta…" : "Crear cuenta"}
          </Button>
          {error ? <p className="text-sm text-error">{error}</p> : null}
        </form>
        <p className="mt-6 text-sm text-on-surface-variant">
          ¿Ya tienes cuenta?{" "}
          <Link href="/cuenta/login" className="text-primary underline">
            Inicia sesión
          </Link>
        </p>
        <Link href="/" className="mt-4 inline-block text-xs uppercase tracking-wider text-primary">
          ← Volver a la tienda
        </Link>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" />}>
      <RegisterForm />
    </Suspense>
  );
}

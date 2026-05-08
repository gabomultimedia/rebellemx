"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setStatus(res.ok ? "ok" : "err");
    } catch {
      setStatus("err");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 border border-outline-variant/40 bg-surface-container-low p-8">
      <div>
        <label className="text-xs uppercase tracking-wider text-on-surface-variant">Nombre</label>
        <input name="name" required className="mt-1 w-full border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="text-xs uppercase tracking-wider text-on-surface-variant">Email</label>
        <input
          name="email"
          type="email"
          required
          className="mt-1 w-full border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="text-xs uppercase tracking-wider text-on-surface-variant">Teléfono</label>
        <input name="phone" className="mt-1 w-full border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="text-xs uppercase tracking-wider text-on-surface-variant">Mensaje</label>
        <textarea
          name="message"
          required
          rows={4}
          className="mt-1 w-full border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm"
        />
      </div>
      <Button type="submit">Enviar</Button>
      {status === "ok" ? <p className="text-sm text-primary">Recibido. Te contactaremos pronto.</p> : null}
      {status === "err" ? <p className="text-sm text-error">No se pudo enviar. Intenta de nuevo.</p> : null}
    </form>
  );
}

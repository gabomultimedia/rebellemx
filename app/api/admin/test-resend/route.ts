import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST() {
  const session = await auth();
  if (!session?.user?.role || (session.user.role !== "ADMIN" && session.user.role !== "SUPERADMIN")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let Resend: typeof import("resend").Resend;
  try {
    Resend = (await import("resend")).Resend;
  } catch {
    return NextResponse.json(
      { success: false, message: "Instala el paquete `resend` (npm i resend) para probar el envío." },
      { status: 501 },
    );
  }

  const resendConfig = await prisma.siteConfig.findUnique({
    where: { key: "RESEND_API_KEY" },
  });

  if (!resendConfig?.value) {
    return NextResponse.json({
      success: false,
      message: "Clave de Resend no configurada",
    });
  }

  const adminEmailConfig = await prisma.siteConfig.findUnique({
    where: { key: "ADMIN_EMAIL" },
  });

  const adminEmail = adminEmailConfig?.value || session.user.email || "admin@rebelleboutique.com";
  const resend = new Resend(resendConfig.value);

  const testEmail = await resend.emails.send({
    from: "Rebelle Boutique <test@rebelleboutique.com>",
    to: [adminEmail],
    subject: "Prueba de conexión Resend - Rebelle Boutique",
    text: `Prueba OK. Destinatario: ${adminEmail}`,
  });

  if (testEmail.error) {
    return NextResponse.json(
      { success: false, message: testEmail.error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    message: "Email de prueba enviado correctamente",
    data: { emailId: testEmail.data?.id, to: adminEmail },
  });
}

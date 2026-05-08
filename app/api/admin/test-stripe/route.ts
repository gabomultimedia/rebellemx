import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST() {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Obtener clave de Stripe desde la base de datos
    const stripeConfig = await prisma.siteConfig.findUnique({
      where: { key: "STRIPE_SECRET_KEY" },
    });

    if (!stripeConfig || !stripeConfig.value) {
      return NextResponse.json({
        success: false,
        message: "Clave de Stripe no configurada",
      });
    }

    // Inicializar Stripe en modo test
    const stripe = new Stripe(stripeConfig.value, {
      apiVersion: "2026-02-25.clover",
    });

    // Hacer una llamada de prueba a la API de Stripe
    const balance = await stripe.balance.retrieve();

    return NextResponse.json({
      success: true,
      message: "Conexión con Stripe exitosa",
      data: {
        available: balance.available[0]?.amount || 0,
        pending: balance.pending[0]?.amount || 0,
        currency: balance.available[0]?.currency || "usd",
        livemode: balance.livemode,
      },
    });
  } catch (error: unknown) {
    console.error("Error testing Stripe connection:", error);
    const msg = error instanceof Error ? error.message : "Error al conectar con Stripe";
    const type = error && typeof error === "object" && "type" in error ? String((error as { type?: string }).type) : "unknown";
    return NextResponse.json(
      {
        success: false,
        message: msg,
        error: type,
      },
      { status: 500 },
    );
  }
}
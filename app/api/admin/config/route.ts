import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET: Obtener todas las configuraciones
export async function GET() {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const configs = await prisma.siteConfig.findMany({
      orderBy: { key: "asc" },
    });

    return NextResponse.json(configs);
  } catch (error) {
    console.error("Error fetching configs:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// POST: Guardar o actualizar configuraciones
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const configs = await request.json();
    
    if (!Array.isArray(configs)) {
      return NextResponse.json(
        { error: "Formato de datos inválido" },
        { status: 400 }
      );
    }

    const results = [];
    
    for (const config of configs) {
      const { key, value, description } = config;
      
      if (!key || typeof value === "undefined") {
        continue;
      }

      // Encriptar valores sensibles (simplificado - en producción usar cifrado real)
      const encryptedValue = value;
      
      const existing = await prisma.siteConfig.findUnique({
        where: { key },
      });

      if (existing) {
        // Actualizar
        const updated = await prisma.siteConfig.update({
          where: { key },
          data: { 
            value: encryptedValue,
            description: description || existing.description
          },
        });
        results.push(updated);
      } else {
        // Crear nuevo
        const created = await prisma.siteConfig.create({
          data: {
            key,
            value: encryptedValue,
            description: description || "",
          },
        });
        results.push(created);
      }
    }

    return NextResponse.json({
      success: true,
      message: `${results.length} configuraciones guardadas`,
      data: results,
    });
  } catch (error) {
    console.error("Error saving configs:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
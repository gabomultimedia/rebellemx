import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { AppointmentStatus } from "@prisma/client";

const createSchema = z.object({
  serviceId: z.string().min(1),
  clientName: z.string().min(1),
  clientEmail: z.string().email(),
  clientPhone: z.string().min(1),
  date: z.string().min(1),
  notes: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = createSchema.parse(json);
    const service = await prisma.service.findUnique({ where: { id: data.serviceId } });
    if (!service || !service.isActive) {
      return NextResponse.json({ error: "Servicio no disponible" }, { status: 400 });
    }
    const session = await auth();
    const when = new Date(data.date);
    if (Number.isNaN(when.getTime())) {
      return NextResponse.json({ error: "Fecha inválida" }, { status: 400 });
    }
    const apt = await prisma.appointment.create({
      data: {
        userId: session?.user?.id ?? null,
        serviceId: service.id,
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        clientPhone: data.clientPhone,
        date: when,
        duration: service.duration,
        price: service.price,
        status: AppointmentStatus.PENDING,
        notes: data.notes ?? null,
      },
    });
    return NextResponse.json({ id: apt.id });
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }
}

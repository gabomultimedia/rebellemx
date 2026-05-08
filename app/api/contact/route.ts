import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = contactSchema.parse(json);
    console.info("[contact]", data.email, data.name);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
}

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST() {
  const session = await auth();
  const role = session?.user?.role;
  if (role !== "ADMIN" && role !== "SUPERADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (!process.env.CLOUDINARY_API_SECRET) {
    return NextResponse.json({ error: "Cloudinary no configurado" }, { status: 503 });
  }
  return NextResponse.json({ error: "Implementar firma Cloudinary en el cliente o server" }, { status: 501 });
}

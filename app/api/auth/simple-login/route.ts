import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

function getSecret() {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error("NEXTAUTH_SECRET no está configurado. Configúralo en .env antes de iniciar el servidor.");
  }
  return new TextEncoder().encode(secret);
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email y contraseña requeridos" }, { status: 400 });
    }

    // Validate directly against MySQL (not via VPS proxy that no longer exists)
    const user = await prisma.user.findUnique({
      where: { email: String(email).toLowerCase().trim() },
      select: { id: true, email: true, name: true, role: true, password: true },
    });

    if (!user || !user.password) {
      return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
    }

    const valid = await bcrypt.compare(String(password), user.password);
    if (!valid) {
      return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
    }

    // Issue our own JWT (compatible with custom-auth in proxy.ts)
    const token = await new SignJWT({
      sub: user.id,
      email: user.email,
      name: user.name || "",
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30d")
      .sign(getSecret());

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token,
    });

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Login API is working",
    hasSecret: !!process.env.NEXTAUTH_SECRET,
  });
}

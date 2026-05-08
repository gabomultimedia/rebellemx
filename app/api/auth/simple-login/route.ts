import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";
import { SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "dev-secret-key-for-testing-only-2026"
);

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: "Email y contraseña requeridos" }, { status: 400 });
    }
    
    // Buscar usuario
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user?.password) {
      return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
    }
    
    // Verificar contraseña
    const valid = await compare(password, user.password);
    
    if (!valid) {
      return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
    }
    
    // Crear token JWT
    const token = await new SignJWT({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      image: user.image
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30d")
      .sign(JWT_SECRET);
    
    // Crear respuesta
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        image: user.image
      }
    });
    
    // Establecer cookie
    response.cookies.set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 // 30 días
    });
    
    return response;
  } catch (error) {
    console.error("Error en simple-login:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
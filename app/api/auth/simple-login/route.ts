import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";

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
    
    const backendRes = await fetch("https://rebelle.abundiss.com/api/auth/simple-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await backendRes.json();
    
    if (!backendRes.ok || !data.success) {
      return NextResponse.json(data, { status: backendRes.status });
    }
    
    // We got a valid token from the backend
    // Set the cookie ourselves for the frontend domain
    const response = NextResponse.json({
      success: true,
      user: data.user,
      token: data.token,
    });
    
    response.cookies.set("auth-token", data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    
    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({ error: error?.message || "Error interno" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  // Test endpoint
  return NextResponse.json({ 
    success: true, 
    message: "Login API is working",
    hasSecret: !!process.env.NEXTAUTH_SECRET 
  });
}
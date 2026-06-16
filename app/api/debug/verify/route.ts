import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

function getSecret() {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error("NEXTAUTH_SECRET no está configurado. Configúralo en .env antes de iniciar el servidor.");
  }
  return new TextEncoder().encode(secret);
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  
  if (!token) {
    return NextResponse.json({ error: "No token" });
  }
  
  // Try to verify with our secret
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return NextResponse.json({ 
      verified: true, 
      sub: payload.sub,
      email: payload.email,
      exp: payload.exp,
      secretMatch: true,
    });
  } catch (err: any) {
    // Try to decode without verification
    try {
      const parts = token.split(".");
      const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());
      return NextResponse.json({ 
        verified: false, 
        error: err?.message,
        decodedPayload: payload,
        envSecretPreview: (process.env.NEXTAUTH_SECRET || "").substring(0, 10) + "...",
      });
    } catch {
      return NextResponse.json({ verified: false, decodeError: true });
    }
  }
}
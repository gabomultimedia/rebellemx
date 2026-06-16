import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";

function getSecret() {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error("NEXTAUTH_SECRET no está configurado. Configúralo en .env antes de iniciar el servidor.");
  }
  return new TextEncoder().encode(secret);
}

export async function GET(request: NextRequest) {
  // Generate a test token with our secret
  const testToken = await new SignJWT({
    sub: "test-user-123",
    email: "test@test.com",
    name: "Test User",
    role: "ADMIN",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(getSecret());
  
  // Try to verify it immediately
  try {
    const { payload } = await jwtVerify(testToken, getSecret());
    return NextResponse.json({
      success: true,
      generatedToken: testToken.substring(0, 50) + "...",
      verifiedPayload: payload,
      envSecretPreview: (process.env.NEXTAUTH_SECRET || "").substring(0, 10) + "...",
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message,
      code: err.code,
      envSecretPreview: (process.env.NEXTAUTH_SECRET || "").substring(0, 10) + "...",
    });
  }
}
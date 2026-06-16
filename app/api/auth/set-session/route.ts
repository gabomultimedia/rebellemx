import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") || request.nextUrl.searchParams.get("auth_token");
  
  if (!token) {
    return NextResponse.redirect(new URL("/cuenta/login?error=session", request.url));
  }
  
  const parts = token.split(".");
  if (parts.length !== 3) {
    return NextResponse.redirect(new URL("/cuenta/login?error=invalid", request.url));
  }
  
  try {
    const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());
    const now = Math.floor(Date.now() / 1000);
    
    if (payload.exp && payload.exp < now) {
      return NextResponse.redirect(new URL("/cuenta/login?error=expired", request.url));
    }
    
    const resp = NextResponse.redirect(new URL("/cuenta", request.url), { status: 302 });
    resp.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return resp;
  } catch {
    return NextResponse.redirect(new URL("/cuenta/login?error=server", request.url));
  }
}
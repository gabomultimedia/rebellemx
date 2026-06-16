import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get token from cookie (primary), Authorization header, or query param
    let token = request.cookies.get("auth-token")?.value;
    
    if (!token) {
      const auth = request.headers.get("authorization") || "";
      token = auth.replace("Bearer ", "") || request.nextUrl.searchParams.get("token") || "";
    }
    
    if (!token) {
      return NextResponse.json({ user: null, authenticated: false });
    }
    
    // Verify token directly (decode JWT locally)
    const parts = token.split(".");
    if (parts.length !== 3) {
      return NextResponse.json({ user: null, authenticated: false });
    }
    
    const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());
    if (!payload.sub || !payload.email) {
      return NextResponse.json({ user: null, authenticated: false });
    }
    
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return NextResponse.json({ user: null, authenticated: false, expired: true });
    }
    
    return NextResponse.json({ 
      user: { id: payload.sub, email: payload.email, name: payload.name, role: payload.role, image: payload.image },
      authenticated: true 
    });
  } catch {
    return NextResponse.json({ user: null, authenticated: false });
  }
}
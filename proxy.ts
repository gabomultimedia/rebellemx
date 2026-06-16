import { NextRequest, NextResponse } from "next/server";

function decodeJWT(token: string): { sub: string; email: string; name: string; role: string; exp: number } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    
    // Add padding if needed
    let payload = parts[1];
    while (payload.length % 4 !== 0) {
      payload += "=";
    }
    
    const decoded = Buffer.from(payload, "base64").toString("utf-8");
    const data = JSON.parse(decoded);
    
    if (!data.sub || !data.email) return null;
    
    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (data.exp && data.exp < now) return null;
    
    return {
      sub: data.sub,
      email: data.email,
      name: data.name || "",
      role: data.role || "",
      exp: data.exp || 0,
    };
  } catch {
    return null;
  }
}

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Allow login and registro pages without auth
  if (path === "/cuenta/login" || path === "/cuenta/registro") {
    return NextResponse.next();
  }
  
  // If at /cuenta with token in URL, decode and set cookie
  if (path === "/cuenta" || path === "/cuenta/") {
    const urlToken = request.nextUrl.searchParams.get("token") || 
                     request.nextUrl.searchParams.get("auth_token");
    
    if (urlToken) {
      const payload = decodeJWT(urlToken);
      
      if (payload) {
        const redirectUrl = new URL("/cuenta", request.url);
        
        const response = NextResponse.redirect(redirectUrl, 302);
        response.cookies.set("auth-token", urlToken, {
          httpOnly: true,
          secure: true,
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 30,
        });
        
        return response;
      } else {
        const loginUrl = new URL("/cuenta/login", request.url);
        loginUrl.searchParams.set("error", "invalid");
        return NextResponse.redirect(loginUrl);
      }
    }
  }
  
  // For all other /cuenta paths - pass through
  return NextResponse.next();
}

export const config = {
  matcher: ["/cuenta/:path*"],
};
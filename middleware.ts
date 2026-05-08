import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "dev-secret-key-for-testing-only-2026"
);

async function verifyAuthToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
}

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Obtener token de la cookie
  const token = request.cookies.get("auth-token")?.value;
  let session: any = null;
  
  if (token) {
    const payload = await verifyAuthToken(token);
    if (payload) {
      session = {
        user: {
          id: payload.sub,
          email: payload.email,
          name: payload.name,
          role: payload.role,
          image: payload.image
        }
      };
    }
  }
  
  const role = session?.user?.role;
  const isAdmin = role === "ADMIN" || role === "SUPERADMIN";

  if (path.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/cuenta/login?callbackUrl=/admin", request.url));
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (path.startsWith("/cuenta") && !path.startsWith("/cuenta/login")) {
    if (!session) {
      const login = new URL("/cuenta/login", request.url);
      login.searchParams.set("callbackUrl", path);
      return NextResponse.redirect(login);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/cuenta/:path*"],
};
import { NextRequest, NextResponse } from "next/server";

function decodeJWT(token: string): { sub: string; email: string; name: string; role: string; exp: number } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    let payload = parts[1];
    while (payload.length % 4 !== 0) {
      payload += "=";
    }

    const decoded = Buffer.from(payload, "base64").toString("utf-8");
    const data = JSON.parse(decoded);

    if (!data.sub || !data.email) return null;

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

function isPublicPath(path: string): boolean {
  // Paths that don't require authentication
  return (
    path === "/cuenta/login" ||
    path === "/cuenta/registro" ||
    path === "/cuenta/recuperar" ||
    path === "/cuenta/logout" ||
    path === "/"
  );
}

function isAdminPath(path: string): boolean {
  return path.startsWith("/admin");
}

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow public paths
  if (isPublicPath(path)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("auth-token")?.value;
  const payload = token ? decodeJWT(token) : null;

  // Handle /cuenta with token in URL (login redirect flow)
  if ((path === "/cuenta" || path === "/cuenta/") && !payload) {
    const urlToken = request.nextUrl.searchParams.get("token") ||
                     request.nextUrl.searchParams.get("auth_token");
    if (urlToken) {
      const urlPayload = decodeJWT(urlToken);
      if (urlPayload) {
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

  // REQUIRE authentication for /cuenta/* and /admin/*
  if (path.startsWith("/cuenta") || isAdminPath(path)) {
    if (!payload) {
      const loginUrl = new URL("/cuenta/login", request.url);
      if (path !== "/cuenta") {
        loginUrl.searchParams.set("callbackUrl", path);
      }
      return NextResponse.redirect(loginUrl);
    }

    // Admin-only routes require ADMIN or SUPERADMIN role
    if (isAdminPath(path)) {
      const role = String(payload.role || "").toUpperCase();
      if (role !== "ADMIN" && role !== "SUPERADMIN") {
        return NextResponse.redirect(new URL("/cuenta", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cuenta/:path*", "/admin/:path*"],
};

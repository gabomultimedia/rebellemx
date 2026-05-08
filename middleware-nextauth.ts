import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const path = req.nextUrl.pathname;
  const session = req.auth;
  const role = session?.user?.role;
  const isAdmin = role === "ADMIN" || role === "SUPERADMIN";

  if (path.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/cuenta/login?callbackUrl=/admin", req.url));
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (path.startsWith("/cuenta") && !path.startsWith("/cuenta/login")) {
    if (!session) {
      const login = new URL("/cuenta/login", req.url);
      login.searchParams.set("callbackUrl", path);
      return NextResponse.redirect(login);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/cuenta/:path*"],
};

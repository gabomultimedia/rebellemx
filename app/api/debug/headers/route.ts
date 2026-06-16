import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookies = request.cookies.getAll();
  const auth = request.headers.get("authorization");
  
  return NextResponse.json({
    cookies: cookies.map(c => ({ name: c.name, valueLength: c.value.length })),
    cookieNames: cookies.map(c => c.name),
    hasAuthHeader: !!auth,
    authPrefix: auth?.substring(0, 20),
    userAgent: request.headers.get("user-agent")?.substring(0, 50),
  });
}
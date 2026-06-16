import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    secret: process.env.NEXTAUTH_SECRET ? "SET" : "NOT SET",
    secretPreview: process.env.NEXTAUTH_SECRET?.substring(0, 10) + "...",
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
  });
}
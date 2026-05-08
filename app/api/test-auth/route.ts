import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    return NextResponse.json({ 
      authenticated: !!session,
      user: session?.user,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error en test-auth:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
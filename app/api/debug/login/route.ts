import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({ 
      where: { email },
      select: { id: true, email: true, password: true }
    });
    
    if (!user) {
      return NextResponse.json({ 
        found: false, 
        error: "User not found",
        emailSearched: email 
      });
    }
    
    if (!user.password) {
      return NextResponse.json({ 
        found: true, 
        hasPassword: false,
        error: "User has no password set"
      });
    }
    
    // Try to verify
    let valid = false;
    try {
      valid = await compare(password, user.password);
    } catch (e: any) {
      return NextResponse.json({ 
        found: true, 
        hasPassword: true,
        compareError: e?.message,
        passwordHash: user.password.substring(0, 20) + "..."
      });
    }
    
    return NextResponse.json({
      found: true,
      hasPassword: true,
      compareResult: valid,
      email: user.email,
      passwordHashPreview: user.password.substring(0, 30) + "..."
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Unknown error" });
  }
}
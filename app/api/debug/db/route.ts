import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Try to import prisma
    const { default: prisma } = await import("@/lib/prisma");
    
    // Try a simple query
    const userCount = await prisma.user.count();
    
    return NextResponse.json({
      success: true,
      dbConnected: true,
      userCount,
      env: {
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        databaseUrlPreview: process.env.DATABASE_URL 
          ? process.env.DATABASE_URL.replace(/\/\/.*:.*@/, "//***:***@") 
          : null,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      dbConnected: false,
      error: error?.message || "Unknown error",
      env: {
        hasDatabaseUrl: !!process.env.DATABASE_URL,
      },
    });
  }
}
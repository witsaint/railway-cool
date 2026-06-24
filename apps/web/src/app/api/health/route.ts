import { prisma } from "@repo/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({
      status: "ok",
      service: "web",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        service: "web",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 503 },
    );
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json(
      { error: "Order ID diperlukan" },
      { status: 400 }
    );
  }

  try {
    const project = await prisma.project.findUnique({
      where: { orderId },
      include: {
        client: {
          select: {
            name: true,
            company: true,
          },
        },
        stages: {
          orderBy: { order: "asc" },
        },
        updates: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Track API error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

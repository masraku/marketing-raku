import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireApiAuth } from "@/lib/require-auth";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({ interval: 60_000, limit: 30 });

export async function GET(request) {
  const limited = limiter.check(request);
  if (limited) return limited;

  const authResult = await requireApiAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    const projects = await prisma.project.findMany({
      include: {
        client: {
          select: { name: true, phone: true, company: true },
        },
        stages: { orderBy: { order: "asc" } },
        _count: { select: { updates: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Projects GET error:", error);
    return NextResponse.json(
      { error: "Gagal memuat projects" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const limited = limiter.check(request);
  if (limited) return limited;

  const authResult = await requireApiAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    const body = await request.json();
    const {
      orderId,
      name,
      type,
      description,
      clientId,
      totalCost,
      startDate,
      estimatedEnd,
    } = body;

    if (!orderId || !name || !type || !clientId) {
      return NextResponse.json(
        { error: "Order ID, nama, tipe, dan klien wajib diisi" },
        { status: 400 }
      );
    }

    // Default stages
    const defaultStages = [
      { name: "Konsultasi Awal", order: 1 },
      { name: "Deal & Pembayaran DP", order: 2 },
      { name: "Desain UI/UX", order: 3 },
      { name: "Development", order: 4 },
      { name: "Testing & Review", order: 5 },
      { name: "Deployment", order: 6 },
    ];

    const project = await prisma.project.create({
      data: {
        orderId,
        name,
        type,
        description,
        clientId,
        totalCost,
        startDate: startDate ? new Date(startDate) : null,
        estimatedEnd: estimatedEnd ? new Date(estimatedEnd) : null,
        stages: {
          create: defaultStages,
        },
      },
      include: {
        client: true,
        stages: { orderBy: { order: "asc" } },
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Projects POST error:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Order ID sudah digunakan" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Gagal membuat project" },
      { status: 500 }
    );
  }
}

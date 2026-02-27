import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireApiAuth } from "@/lib/require-auth";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({ interval: 60_000, limit: 30 });

export async function GET(request, { params }) {
  const limited = limiter.check(request);
  if (limited) return limited;

  const authResult = await requireApiAuth();
  if (authResult instanceof NextResponse) return authResult;

  const { id } = await params;

  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        client: true,
        stages: { orderBy: { order: "asc" } },
        updates: { orderBy: { createdAt: "desc" } },
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
    console.error("Project GET error:", error);
    return NextResponse.json(
      { error: "Gagal memuat project" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const limited = limiter.check(request);
  if (limited) return limited;

  const authResult = await requireApiAuth();
  if (authResult instanceof NextResponse) return authResult;

  const { id } = await params;

  try {
    const body = await request.json();
    const { name, type, description, status, progress, totalCost, paidAmount, startDate, estimatedEnd } = body;

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(type && { type }),
        ...(description !== undefined && { description }),
        ...(status && { status }),
        ...(progress !== undefined && { progress: parseInt(progress) }),
        ...(totalCost !== undefined && { totalCost }),
        ...(paidAmount !== undefined && { paidAmount }),
        ...(startDate !== undefined && { startDate: startDate ? new Date(startDate) : null }),
        ...(estimatedEnd !== undefined && { estimatedEnd: estimatedEnd ? new Date(estimatedEnd) : null }),
      },
      include: {
        client: true,
        stages: { orderBy: { order: "asc" } },
        updates: { orderBy: { createdAt: "desc" } },
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Project PUT error:", error);
    return NextResponse.json(
      { error: "Gagal mengupdate project" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const limited = limiter.check(request);
  if (limited) return limited;

  const authResult = await requireApiAuth();
  if (authResult instanceof NextResponse) return authResult;

  const { id } = await params;

  try {
    // Delete related data first
    await prisma.projectUpdate.deleteMany({ where: { projectId: id } });
    await prisma.projectStage.deleteMany({ where: { projectId: id } });
    await prisma.project.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Project DELETE error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus project" },
      { status: 500 }
    );
  }
}

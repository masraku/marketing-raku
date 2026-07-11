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
    const {
      orderId,
      name,
      type,
      description,
      status,
      progress,
      totalCost,
      paidAmount,
      startDate,
      estimatedEnd,
      client,
    } = body;

    if (orderId !== undefined && !String(orderId).trim()) {
      return NextResponse.json(
        { error: "Order ID wajib diisi" },
        { status: 400 }
      );
    }

    if (name !== undefined && !String(name).trim()) {
      return NextResponse.json(
        { error: "Nama project wajib diisi" },
        { status: 400 }
      );
    }

    if (type !== undefined && !String(type).trim()) {
      return NextResponse.json(
        { error: "Tipe project wajib diisi" },
        { status: 400 }
      );
    }

    if (client !== undefined) {
      if (!client?.name || !String(client.name).trim()) {
        return NextResponse.json(
          { error: "Nama klien wajib diisi" },
          { status: 400 }
        );
      }

      if (!client?.phone || !String(client.phone).trim()) {
        return NextResponse.json(
          { error: "Nomor HP klien wajib diisi" },
          { status: 400 }
        );
      }
    }

    const projectData = {
      ...(orderId !== undefined && { orderId: String(orderId).trim() }),
      ...(name !== undefined && { name: String(name).trim() }),
      ...(type !== undefined && { type: String(type).trim() }),
      ...(description !== undefined && { description }),
      ...(status && { status }),
      ...(totalCost !== undefined && {
        totalCost: String(totalCost).replace(/\D/g, ""),
      }),
      ...(paidAmount !== undefined && {
        paidAmount: String(paidAmount).replace(/\D/g, ""),
      }),
      ...(startDate !== undefined && {
        startDate: startDate ? new Date(startDate) : null,
      }),
      ...(estimatedEnd !== undefined && {
        estimatedEnd: estimatedEnd ? new Date(estimatedEnd) : null,
      }),
    };

    if (progress !== undefined) {
      const parsedProgress = parseInt(progress);

      if (Number.isNaN(parsedProgress)) {
        return NextResponse.json(
          { error: "Progress harus berupa angka" },
          { status: 400 }
        );
      }

      projectData.progress = Math.min(100, Math.max(0, parsedProgress));
    }

    const project = await prisma.$transaction(async (tx) => {
      const existingProject = await tx.project.findUnique({
        where: { id },
        select: { clientId: true },
      });

      if (!existingProject) return null;

      if (Object.keys(projectData).length > 0) {
        await tx.project.update({
          where: { id },
          data: projectData,
        });
      }

      if (client !== undefined) {
        await tx.client.update({
          where: { id: existingProject.clientId },
          data: {
            name: String(client.name).trim(),
            phone: String(client.phone).trim(),
            email: client.email ? String(client.email).trim() : null,
            company: client.company ? String(client.company).trim() : null,
          },
        });
      }

      return tx.project.findUnique({
        where: { id },
        include: {
          client: true,
          stages: { orderBy: { order: "asc" } },
          updates: { orderBy: { createdAt: "desc" } },
        },
      });
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Project PUT error:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Order ID sudah digunakan" },
        { status: 409 }
      );
    }

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

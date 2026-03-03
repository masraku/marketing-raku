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
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        _count: { select: { projects: true } },
        projects: {
          select: { id: true, name: true, orderId: true, status: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!client) {
      return NextResponse.json(
        { error: "Client tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(client);
  } catch (error) {
    console.error("Client GET error:", error);
    return NextResponse.json(
      { error: "Gagal memuat client" },
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
    const { name, email, phone, company } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Nama dan nomor HP wajib diisi" },
        { status: 400 }
      );
    }

    const client = await prisma.client.update({
      where: { id },
      data: { name, email: email || null, phone, company: company || null },
      include: {
        _count: { select: { projects: true } },
      },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.error("Client PUT error:", error);
    return NextResponse.json(
      { error: "Gagal mengupdate client" },
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
    // Check if client has projects
    const client = await prisma.client.findUnique({
      where: { id },
      include: { _count: { select: { projects: true } } },
    });

    if (!client) {
      return NextResponse.json(
        { error: "Client tidak ditemukan" },
        { status: 404 }
      );
    }

    if (client._count.projects > 0) {
      return NextResponse.json(
        {
          error: "Tidak bisa menghapus klien yang masih memiliki project",
          detail: `Klien ini memiliki ${client._count.projects} project`,
        },
        { status: 400 }
      );
    }

    await prisma.client.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Client DELETE error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus client" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      include: {
        _count: { select: { projects: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.error("Clients GET error:", error);
    return NextResponse.json(
      { error: "Gagal memuat clients" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, company } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Nama dan nomor HP wajib diisi" },
        { status: 400 }
      );
    }

    const client = await prisma.client.create({
      data: { name, email, phone, company },
    });

    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error("Clients POST error:", error);
    return NextResponse.json(
      { error: "Gagal menambah client" },
      { status: 500 }
    );
  }
}

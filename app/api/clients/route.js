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
  const limited = limiter.check(request);
  if (limited) return limited;

  const authResult = await requireApiAuth();
  if (authResult instanceof NextResponse) return authResult;

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

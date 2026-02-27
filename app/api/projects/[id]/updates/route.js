import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireApiAuth } from "@/lib/require-auth";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({ interval: 60_000, limit: 30 });

export async function POST(request, { params }) {
  const limited = limiter.check(request);
  if (limited) return limited;

  const authResult = await requireApiAuth();
  if (authResult instanceof NextResponse) return authResult;

  const { id } = await params;

  try {
    const body = await request.json();
    const { message, type = "update", fileUrl } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Pesan update diperlukan" },
        { status: 400 }
      );
    }

    const update = await prisma.projectUpdate.create({
      data: {
        message,
        type,
        fileUrl,
        projectId: id,
      },
    });

    return NextResponse.json(update, { status: 201 });
  } catch (error) {
    console.error("Updates POST error:", error);
    return NextResponse.json(
      { error: "Gagal menambah update" },
      { status: 500 }
    );
  }
}

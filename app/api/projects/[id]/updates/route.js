import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request, { params }) {
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

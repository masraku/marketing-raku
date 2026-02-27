import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PUT(request, { params }) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { stages } = body; // Array of { id, status, progress }

    if (!stages || !Array.isArray(stages)) {
      return NextResponse.json(
        { error: "Data stages diperlukan" },
        { status: 400 }
      );
    }

    // Update each stage
    const updatePromises = stages.map((stage) =>
      prisma.projectStage.update({
        where: { id: stage.id },
        data: {
          status: stage.status,
          progress: parseInt(stage.progress || 0),
        },
      })
    );

    await Promise.all(updatePromises);

    // Recalculate overall project progress
    const allStages = await prisma.projectStage.findMany({
      where: { projectId: id },
    });

    const totalProgress = allStages.reduce((sum, s) => {
      if (s.status === "completed") return sum + 100;
      if (s.status === "in_progress") return sum + s.progress;
      return sum;
    }, 0);

    const overallProgress = Math.round(totalProgress / allStages.length);

    await prisma.project.update({
      where: { id },
      data: { progress: overallProgress },
    });

    return NextResponse.json({ success: true, progress: overallProgress });
  } catch (error) {
    console.error("Stages PUT error:", error);
    return NextResponse.json(
      { error: "Gagal mengupdate stages" },
      { status: 500 }
    );
  }
}

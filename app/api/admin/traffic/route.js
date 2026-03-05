import { prisma } from "@/lib/db";
import { requireApiAuth } from "@/lib/require-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const authResult = await requireApiAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sevenDaysAgo = new Date(todayStart);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    // Total views hari ini
    const todayViews = await prisma.pageView.count({
      where: { createdAt: { gte: todayStart } },
    });

    // Unique paths hari ini (sebagai proxy unique visitors)
    const todayUnique = await prisma.pageView.groupBy({
      by: ["userAgent"],
      where: { createdAt: { gte: todayStart } },
    });

    // Total views keseluruhan
    const totalViews = await prisma.pageView.count();

    // Views per hari (7 hari terakhir)
    const dailyViews = [];
    for (let i = 6; i >= 0; i--) {
      const dayStart = new Date(todayStart);
      dayStart.setDate(dayStart.getDate() - i);
      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayEnd.getDate() + 1);

      const count = await prisma.pageView.count({
        where: {
          createdAt: { gte: dayStart, lt: dayEnd },
        },
      });

      dailyViews.push({
        date: dayStart.toISOString().split("T")[0],
        label: dayStart.toLocaleDateString("id-ID", {
          weekday: "short",
          day: "numeric",
        }),
        views: count,
      });
    }

    // Top 5 halaman
    const topPages = await prisma.pageView.groupBy({
      by: ["path"],
      _count: { path: true },
      orderBy: { _count: { path: "desc" } },
      take: 5,
    });

    return NextResponse.json({
      todayViews,
      todayUnique: todayUnique.length,
      totalViews,
      dailyViews,
      topPages: topPages.map((p) => ({
        path: p.path,
        views: p._count.path,
      })),
    });
  } catch (error) {
    console.error("Traffic API error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data traffic" },
      { status: 500 }
    );
  }
}

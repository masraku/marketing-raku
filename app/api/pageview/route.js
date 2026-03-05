import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { path, referrer } = await request.json();

    // Jangan track halaman admin
    if (!path || path.startsWith("/admin")) {
      return NextResponse.json({ ok: true });
    }

    const userAgent = request.headers.get("user-agent") || null;

    await prisma.pageView.create({
      data: {
        path,
        referrer: referrer || null,
        userAgent,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("PageView track error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

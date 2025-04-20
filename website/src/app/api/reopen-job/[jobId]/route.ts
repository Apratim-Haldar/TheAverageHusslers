import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(
  req: NextRequest,
  { params }: { params: { jobId: string } }
) {
  const { jobId } = params;

  try {
    await db.jobPost.update({
      where: { id: jobId },
      data: { status: "open" },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error reopening job:", error);
    return NextResponse.json({ error: "Failed to reopen job" }, { status: 500 });
  }
}

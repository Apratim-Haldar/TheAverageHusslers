import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db"; // your Prisma client instance

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const jobs = await db.jobPost.findMany({
      where: {
        status: "open",
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

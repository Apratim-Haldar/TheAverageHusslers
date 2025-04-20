import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  try {
    // 1. Get the company code of the user
    const company = await db.user.findUnique({
      where: { id: userId },
      select: { companyCode: true },
    });

    if (!company?.companyCode) {
      return NextResponse.json({ error: 'Company code not found' }, { status: 404 });
    }

    // 2. Get HR users in the same company
    const hrUsers = await db.user.findMany({
      where: {
        type: 'Candidate',
        ishr: true,
        companyCode: company.companyCode,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
      },
    });

    const hrUserIds = hrUsers.map((hr) => hr.id);

    // 3. Get job posts created by those HRs
    const jobPosts = await db.jobPost.findMany({
      where: {
        createdBy: {
          in: hrUserIds,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      hrUsers,
      jobPosts,
    });
  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json({ error: 'Failed to fetch data', details: err }, { status: 500 });
  }
}

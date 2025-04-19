import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db'; // ensure this path is correct

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      noOfOpenings,
      deadline,
      location,
      jobType,
      createdById, // expect this from client
    } = body;

    if (!createdById) {
      return NextResponse.json({ error: 'Missing createdById' }, { status: 400 });
    }

    const newJobPost = await db.jobPost.create({
      data: {
        title,
        description,
        noOfOpenings: parseInt(noOfOpenings),
        deadline: new Date(deadline),
        location,
        jobType,
        status: 'open',
        createdBy: {
          connect: {
            id: createdById,
          },
        },
      },
    });

    return NextResponse.json(newJobPost, { status: 201 });
  } catch (error: any) {
    console.error('Error creating job post:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

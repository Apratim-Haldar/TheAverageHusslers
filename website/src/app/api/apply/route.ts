import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db'; // Adjust path as needed

export async function POST(request: NextRequest) {
  try {
    const applicationData = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      job_id,
      s3FileKey,
      immediateJoiner,
      experience,
      user_id,
    } = applicationData;

    // Create the new application directly without checking for duplicates
    const application = await db.application.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        job_id,
        s3FileKey,
        interview_date: new Date(),
        offerletter:false,
        immediateJoiner,
        experience,
        createdAt: new Date(),
        status: 'applied',
        resume_details: "",
        user_id,
      }
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error: any) {
    console.error('Application submission error:', error);

    // Handle Prisma's unique constraint violation error (if duplicate occurs)
    if (
      error.code === 'P2002' &&
      error.meta?.target?.includes('email_jobPostId')
    ) {
      return NextResponse.json(
        { error: 'You have already applied for this position', isDuplicate: true },
        { status: 400 }
      );
    }

    // Handle any other unexpected errors
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

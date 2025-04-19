import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';

import db from '@/lib/db';

// const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { user_id: string } }) {
  const { user_id } = params;

  if (!ObjectId.isValid(user_id)) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  try {
    const user = await db.user.findUnique({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        type: true,
        ishr: true,
        companyCode: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      role: user.ishr ? 'hr' : 'candidate',
      companyCode: user.companyCode || '',
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

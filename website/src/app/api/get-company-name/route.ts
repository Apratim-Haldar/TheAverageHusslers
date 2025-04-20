import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      createdBy,
    } = body;

    if (!createdBy) {
      return NextResponse.json({ error: 'Missing createdBy' }, { status: 400 });
    }

    // Step 1: Fetch user by ID
    const hrUser = await db.user.findUnique({
      where: {
        id: createdBy,
        ishr: true
      },
    });

    if (!hrUser) {
      return NextResponse.json({ error: 'Unauthorized or invalid HR user' }, { status: 403 });
    }

    // Step 2: Find company by companyCode and isCompany === true
    const companyUser = await db.user.findFirst({
      where: {
        companyCode: hrUser.companyCode,
        iscompany: true,
      },
    });

    if (!companyUser) {
      return NextResponse.json({ error: 'Company not found for given companyCode' }, { status: 404 });
    }
    
    console.log('Company User:', companyUser); // Log the company user for debugging


    return NextResponse.json(companyUser.name, { status: 201 });
  } catch (error: any) {
    console.error('Error creating job post:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import  db  from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
  }

  try {
    // Get company info
    const company = await db.user.findUnique({
      where: { id: userId },
      select: { companyCode: true },
    })

    if (!company?.companyCode) {
      return NextResponse.json({ error: 'Company code not found' }, { status: 404 })
    }

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
    })

    return NextResponse.json(hrUsers)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch HRs', details: err }, { status: 500 })
  }
}

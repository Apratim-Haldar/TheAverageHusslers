import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db' // Adjust based on your setup

export async function POST(req: NextRequest) {
  const { email, phone } = await req.json()

  if (!email && !phone) {
    return NextResponse.json({ error: 'Email or phone number is required' }, { status: 400 });
  }

  const user = await db.user.findFirst({ // Use findFirst as there might be multiple with the same name
    where: {
      OR: [
        { email: email },
        { phone: phone },
      ],
    },
  })

  if (!user) {
    return NextResponse.json({ redirectTo: '/get-started' })
  }

  return NextResponse.json({ redirectTo: `/candidate/${user.id}/dashboard` })
}
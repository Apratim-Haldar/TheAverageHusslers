// File: src/app/api/companies/route.ts

import prisma from '@/lib/db'

export async function GET() {
  const companies = await prisma.user.findMany({
    where: {
      iscompany: true, // Only fetch companies
    },
    select: {
      id: true,
      name: true,
    },
  })

  return new Response(JSON.stringify(companies), {
    status: 200,
  })
}

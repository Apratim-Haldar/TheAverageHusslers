// File: src/app/api/validate-company-code/route.ts

import prisma from '@/lib/db'

export async function GET(req: Request) {
  // Extract companyCode and companyId from the query string
  const { searchParams } = new URL(req.url)
  const companyCode = searchParams.get('companyCode')
  const companyId = searchParams.get('companyId')

  // Check if companyCode and companyId are provided
  if (!companyCode || !companyId) {
    return new Response(JSON.stringify({ isValid: false, error: 'Missing parameters' }), {
      status: 400,
    })
  }

  // Fetch the company from the database based on companyId
  const company = await prisma.user.findUnique({
    where: { id: companyId },
  })

  // Validate the company code
  const isValid = company?.companyCode === companyCode

  // Return validation result
  return new Response(JSON.stringify({ isValid }), {
    status: 200,
  })
}

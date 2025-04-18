'use server'

import { redirect } from 'next/navigation'
import prisma from '@/lib/db'

export async function createUser(formData: FormData) {
  const name = formData.get('name') as string
  const phone = formData.get('phone') as string
  const type = formData.get('type') as 'Company' | 'Candidate'
  const ishr = formData.get('ishr') === 'true'
  const email = formData.get('email') as string
  const clerk_id = formData.get('clerk_id') as string
  const iscompany = formData.get('iscompany') === 'true'
  const companyCode = formData.get('companyCode') as string

  if (type === 'Candidate' && ishr) {
    const company = await prisma.user.findFirst({
      where: {
        companyCode,
        type: 'Company',
      },
    })

    if (!company) {
      return new Response(JSON.stringify({ error: 'Invalid company code for HR' }), { status: 400 })
    }
  }

  if (type === 'Company') {
    if (!companyCode) {
      return new Response(JSON.stringify({ error: 'Company code is required' }), { status: 400 })
    }

    const existingCompany = await prisma.user.findFirst({
      where: {
        companyCode,
        type: 'Company',
      },
    })

    if (existingCompany) {
      return new Response(JSON.stringify({ error: 'Company with this code already exists' }), { status: 400 })
    }
  }

  const user = await prisma.user.create({
    data: {
      name,
      phone,
      type,
      iscompany,
      ishr,
      email,
      clerk_id,
      companyCode,
    },
  })

  const userId = user.id

  if (type === 'Company') return redirect('/success')
  if (type === 'Candidate') {
    return ishr
      ? redirect(`/company/${user.name}/${userId}/dashboard`)
      : redirect(`/candidate/${userId}/dashboard`)
  }

  return redirect('/')
}

// /app/api/get-user/route.ts (Next.js 14 App Router)
import { NextResponse } from 'next/server';
import  redis  from '@/lib/redis'; // Your configured Redis client

export async function GET() {
  try {
    const userData = await redis.get('User');
    return NextResponse.json(userData ?? {});
  } catch (error) {
    console.error('Redis fetch error:', error);
    return NextResponse.json({ error: 'Unable to fetch user data' }, { status: 500 });
  }
}

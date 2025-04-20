import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import redis from '@/lib/redis'
import Link from 'next/link'



const page = async () => {



  const user = await currentUser()
  console.log('User:', user)

  await redis.set('User', user?.id);
  let data = await redis.get('User');
  console.log(data)


  return (
    <div>
      <Link href="/get-started">
      <button className="btn btn-primary w-32 h-20 p-3 m-3 bg-red-200">
         Get Star
      </button>
      </Link>
    </div>
  )
}

export default page
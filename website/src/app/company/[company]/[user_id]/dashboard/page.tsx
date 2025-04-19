'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { MessageSquare, Users, ArrowLeft, BarChart2, PieChart as PieChartIcon, TrendingUp, Users2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Link from 'next/link';
import HRProfileModal from '@/components/HRProfileModal';
import { motion } from 'framer-motion';



type HRUser = {
  id: string
  name: string
  email: string
  phone: string
  createdAt: string
}

const CompanyDashboard = () => {
  const [hrList, setHrList] = useState<HRUser[]>([])
  const params = useParams()
  const userId = params?.user_id as string

  console.log('User ID:', userId)

  useEffect(() => {
    if (!userId) return

    const fetchHRs = async () => {
      try {
        const res = await fetch(`/api/company/hr?userId=${userId}`)
        const data = await res.json()
        if (!data.error) setHrList(data)
        else console.error(data.error)
      } catch (err) {
        console.error('Error fetching HRs:', err)
      }
    }

    fetchHRs()
  }, [userId])

  return (
    // <div className='w-full min-h-screen bg-purple-300 p-8 text-black'>
    //   <h1 className='text-4xl font-bold mb-6'>Company Dashboard</h1>

    //   {hrList.length === 0 ? (
    //     <p className='text-lg'>No HRs found for this company.</p>
    //   ) : (
    //     <div className='grid gap-4'>
    //       {hrList.map(hr => (
    //         <div
    //           key={hr.id}
    //           className='bg-white p-4 rounded-xl shadow hover:shadow-md transition'
    //         >
    //           <h2 className='text-xl font-semibold'>{hr.name}</h2>
    //           <p className='text-gray-700'>📧 {hr.email}</p>
    //           <p className='text-gray-700'>📱 {hr.phone}</p>
    //           <p className='text-sm text-gray-500'>
    //             Joined: {new Date(hr.createdAt).toLocaleDateString()}
    //           </p>
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>

    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          {/* <Link
            to="/"
            className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link> */}
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#60A5FA] via-[#C084FC] to-[#F472B6]">
            Company Dashboard
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* HR List Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-[#60A5FA]" />
                HR Representatives
              </h2>
            </div>

            <div className="space-y-4">
              {hrList.map((hr, index) => (
                <motion.div
                  key={hr.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#1E293B]/50 rounded-xl p-4 border border-gray-700 hover:border-[#60A5FA]/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    {/* <img
                      src={hr.avatar}
                      alt={hr.name}
                      className="w-12 h-12 rounded-full object-cover"
                    /> */}
                    <div className="flex-1">
                      <h3 className="font-semibold">{hr.name}</h3>
                      <p className="text-gray-400 text-sm">Email : - {hr.email}</p>
                      <p className="text-gray-400 text-sm">Phone : - {hr.phone}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Joined At</div>
                      <div className="font-semibold text-[#60A5FA]">{hr.createdAt}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    {/* <span className="text-sm text-gray-400">
                      Specialization: {hr.specialization}
                    </span> */}
                    {/* <button 
                      onClick={() => handleViewProfile(hr)}
                      className="text-[#60A5FA] hover:text-[#60A5FA]/80 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-3 py-1"
                    >
                      View Profile
                    </button> */}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* HR Profile Modal
      {selectedHR && (
        <HRProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          hr={selectedHR}
        />
      )} */}
    </div>
  )
}

export default CompanyDashboard

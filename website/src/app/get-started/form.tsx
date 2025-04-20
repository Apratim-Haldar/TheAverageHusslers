'use client'

import { useState, useEffect } from 'react'
import { createUser } from './actions'
import Link from 'next/link';

export default function Form({ email, clerk_id }: { email: string; clerk_id: string }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    type: '',
    ishr: 'false',
    companyCode: '',
    companyId: '',
    iscompany: 'false',
  })

  const [companyCodeValid, setCompanyCodeValid] = useState<boolean | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCompanyCodeValidation = async () => {
    const response = await fetch(`/api/validate-company-code?companyCode=${form.companyCode}&companyId=${form.companyId}`)
    const data = await response.json()
    setCompanyCodeValid(data.isValid)
  }

  const showCompanyCodeField =
    form.type === 'Company' || (form.type === 'Candidate' && form.ishr === 'true')
  const showIsCompanyToggle = form.type === 'Company'

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white px-4">
      <form
        action={async (formData) => {
          formData.append('email', email)
          formData.append('clerk_id', clerk_id)
          await createUser(formData)
        }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Register</h2>

        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="John Doe"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="+1234567890"
            required
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Type */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-600 mb-1">
            Role Type
          </label>
          <select
            name="type"
            id="type"
            value={form.type}
            required
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select...</option>
            <option value="Company">Company</option>
            <option value="Candidate">Candidate</option>
          </select>
        </div>

        {/* Are you an HR? */}
        {form.type === 'Candidate' && (
          <div>
            <label htmlFor="ishr" className="block text-sm font-medium text-gray-600 mb-1">
              Are you an HR?
            </label>
            <select
              name="ishr"
              id="ishr"
              value={form.ishr}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
        )}

        {/* Company Code */}
        {showCompanyCodeField && (
          <div>
            <label htmlFor="companyCode" className="block text-sm font-medium text-gray-600 mb-1">
              Company Code
            </label>
            <input
              type="text"
              name="companyCode"
              id="companyCode"
              placeholder="Enter your company code"
              required
              value={form.companyCode}
              onChange={handleChange}
              onBlur={handleCompanyCodeValidation}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {companyCodeValid === false && (
              <p className="text-sm text-red-500 mt-1">Invalid company code</p>
            )}
            {companyCodeValid === true && (
              <p className="text-sm text-green-600 mt-1">Company code is valid</p>
            )}
          </div>
        )}

        {/* Are you a company? */}
        {showIsCompanyToggle && (
          <div>
            <label htmlFor="iscompany" className="block text-sm font-medium text-gray-600 mb-1">
              Are you a company?
            </label>
            <select
              name="iscompany"
              id="iscompany"
              value={form.iscompany}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>  
       </div> 

    </div>
    
  )
}

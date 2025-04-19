'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams, redirect } from 'next/navigation';
import axios from 'axios';

export default function CandidateDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const user_id = params.user_id as string;

  const [loading, setLoading] = useState(true);
  const [userExists, setUserExists] = useState(false);
  const [role, setRole] = useState<'hr' | 'candidate' | null>(null);
  const [companyCode, setCompanyCode] = useState('');
  const [storedCompanyCode, setStoredCompanyCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/user/${user_id}`);
        console.log('User data:', res.data);
        if (res.data) {
          setUserExists(true);
          setRole(res.data.role);
          setStoredCompanyCode(res.data.companyCode);
        } else {
          setError('User not found');
        }
      } catch (err) {
        setError('User not found or server error');
      } finally {
        setLoading(false);
      }
    };

    if (user_id) fetchUser();
  }, [user_id]);

  const handleVerifyCode = () => {
    setError('');
    if (companyCode === storedCompanyCode) {
      router.push(`/hr/${user_id}/dashboard`);
    } else {
      setError('Invalid company code');
    }
  };

  if (loading) return <div className="p-6 text-white">Checking user...</div>;
  if (!userExists) return <div className="p-6 text-red-500">{error}</div>;

  if (role === 'hr') {
    return (
      <div className="min-h-screen bg-slate-800 text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4">Enter Company Code to Access HR Dashboard</h1>
        <input
          type="text"
          value={companyCode}
          onChange={(e) => setCompanyCode(e.target.value)}
          placeholder="Company Code"
          className="border p-2 rounded text-black w-64"
        />
        <button
          onClick={handleVerifyCode}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 transition rounded disabled:opacity-50"
          disabled={!companyCode}
        >
          Verify
        </button>
        {error && <p className="mt-4 text-red-400">{error}</p>}
      </div>
    );
  }

  else if (role === 'candidate') {
    redirect(`/candidate/${user_id}/dashboard/seeker`);
  }

  return (
    <div className="w-full h-full bg-green-100 text-black text-3xl flex items-center justify-center">
      Candidate Dashboard
    </div>
  );
}

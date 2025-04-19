"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
// import { Link } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Users, Briefcase, UserCheck, Bot, Plus, Search, Building2, MessageSquare, Upload } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import JobCreateForm from '@/components/JobCreateForm';

const COLORS = ['#60A5FA', '#C084FC', '#F472B6', '#34D399'];

const HR: React.FC = () => {
  const [showAI, setShowAI] = useState(false);
  const [showCreateJobPost, setShowCreateJobPost] = useState(false);

  const showForm = () => {
    setShowCreateJobPost(true);
    // <JobCreateForm />;
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white">
      {/* Header */}
      <header className="bg-[#1E293B]/50 backdrop-blur-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#60A5FA] via-[#C084FC] to-[#F472B6]">
                HR Dashboard
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#1E293B]/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#60A5FA]/20 rounded-xl">
                <Briefcase className="w-6 h-6 text-[#60A5FA]" />
              </div>
              <div>
                <h2 className="text-sm text-gray-400">Active Job Posts</h2>
                <p className="text-2xl font-bold text-[#60A5FA]">24</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1E293B]/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#C084FC]/20 rounded-xl">
                <Users className="w-6 h-6 text-[#C084FC]" />
              </div>
              <div>
                <h2 className="text-sm text-gray-400">Total Candidates</h2>
                <p className="text-2xl font-bold text-[#C084FC]">156</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1E293B]/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#F472B6]/20 rounded-xl">
                <UserCheck className="w-6 h-6 text-[#F472B6]" />
              </div>
              <div>
                <h2 className="text-sm text-gray-400">Shortlisted</h2>
                <p className="text-2xl font-bold text-[#F472B6]">45</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 flex-wrap mb-8">
          <button
            onClick={showForm}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-[#60A5FA] to-[#C084FC] text-white rounded-xl hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#1E293B]"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Job Post
          </button>
          <button
            className="flex items-center px-6 py-3 bg-[#1E293B] border border-gray-700 text-white rounded-xl hover:border-[#60A5FA]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#1E293B]"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload Job Description
          </button>
        </div>
        {showCreateJobPost && (
          <JobCreateForm onClose={() => setShowCreateJobPost(false)} />
        )}
      </main>
    </div>
  );
};

export default HR;
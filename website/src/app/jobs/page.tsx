"use client"
import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Search, Building2, X } from 'lucide-react';
import ApplicationFormModal from '@/components/ApplicationForm';
import { SuccessModal } from '@/components/success-modal';


type JobType = {
  id: string;
  _id?: string; // Add this to handle MongoDB IDs
  title: string;
  location?: string;
  jobType: string;
  description?: string;
  noOfOpenings: number;
  status: string;
  createdAt: any;
  createdBy: any;
  company: string;
};

const  Jobs = () => {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobType | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [data, setData] = useState(null);
  
  const setData1 = async () => {
    try {
      const res = await fetch('/api/get-user'); // Fetch from your Redis API route
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error('Failed to fetch user data from Redis:', err);
    }
  };

  useEffect(() => {
    setData1();
  }, []);

  console.log('Data:', data);

  
  // console.log('User:', user); // Log the user object for debugging
  
  const handleViewDetails = (job: JobType) => {
    setSelectedJob(job);
    setIsDetailsModalOpen(true);
  };
  
  const handleApply = (job: JobType) => {
    setSelectedJob(job);
    setSelectedJobId(job.id || job._id || '');
    setIsApplicationModalOpen(true);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/get-job-posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        console.log('Fetched Jobs:', data);
        setJobs(data.jobs || []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search term and location
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (job.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || 
                           (job.location || '').toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#60A5FA] via-[#C084FC] to-[#F472B6]">
            Available Jobs
          </h1>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <div className="bg-[#1E293B]/50 rounded-xl p-6 border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#0F172A]/50 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#60A5FA] border border-gray-700"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Location..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full bg-[#0F172A]/50 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#60A5FA] border border-gray-700"
                />
              </div>
              <button 
                onClick={() => {
                  // Reset filters if they're already applied
                  if (searchTerm || locationFilter) {
                    setSearchTerm('');
                    setLocationFilter('');
                  }
                }}
                className="bg-gradient-to-r from-[#60A5FA] to-[#C084FC] text-white py-2 px-6 rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#1E293B]"
              >
                {searchTerm || locationFilter ? 'Clear Filters' : 'Search Jobs'}
              </button>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id || job._id} className="bg-[#1E293B] border border-gray-700 rounded-xl p-4 shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <span className="text-sm text-gray-400">{job.jobType}</span>
                </div>
                <p className="text-sm text-gray-500">{job.location || 'Remote'}</p>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleViewDetails(job)}
                    className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-md"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleApply(job)}
                    className="px-4 py-2 text-sm bg-pink-600 hover:bg-pink-700 rounded-md"
                  >
                    Apply
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-400">No jobs found matching your criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Application Form Modal */}
      {selectedJob && (
        <ApplicationFormModal
          isOpen={isApplicationModalOpen}
          userId = {data}
          onClose={() => setIsApplicationModalOpen(false)}
          jobTitle={selectedJob.title}
          companyName={selectedJob.company || 'Company'}
          jobId={selectedJobId || ''}
          onSuccess={() => {
            setIsApplicationModalOpen(false);
            setShowSuccess(true);
          }}
        />
      )}
      
      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
    </div>
  );
};

export default Jobs;
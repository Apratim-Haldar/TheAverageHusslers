"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, Clock, X } from "lucide-react";

interface Job {
  id: string;
  title: string;
  jobType: string;
  status: string;
  createdAt: string;
  deadline: string;
  requirements: string[];
  location: string;
}

export default function JobList(userId:any) {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/get-job-posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const closeJob = async (jobId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const res = await fetch(`/api/close-job/${jobId}`, {
        method: "PUT",
        credentials: "include",
      });

      if (res.ok) {
        setJobs((prev) =>
          prev.map((job) =>
            job.id === jobId ? { ...job, status: "closed" } : job
          )
        );
      } else {
        console.error("Failed to close job");
      }
    } catch (err) {
      console.error("Error closing job:", err);
    }
  };

  const reopenJob = async (jobId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const res = await fetch(`/api/reopen-job/${jobId}`, {
        method: "PUT",
        credentials: "include",
      });

      if (res.ok) {
        setJobs((prev) =>
          prev.map((job) =>
            job.id === jobId ? { ...job, status: "open" } : job
          )
        );
      } else {
        console.error("Failed to reopen job");
      }
    } catch (err) {
      console.error("Error reopening job:", err);
    }
  };

  const activeJobs = jobs.filter((job) => job.status === "open");
  const closedJobs = jobs.filter((job) => job.status === "closed");

  if (loading)
    return <div className="p-6 text-gray-500">Loading jobs...</div>;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Active Job Posts ({activeJobs.length})
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {activeJobs.map((job) => (
            <div
              key={job.id}
              className="p-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
              onClick={() => router.push(`/jobs/${job.id}`)}
            >
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {job.location} — {job.jobType}
                </p>
              </div>
              <button
                onClick={(e) => closeJob(job.id, e)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Closed Jobs Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Closed Job Posts ({closedJobs.length})
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {closedJobs.map((job) => (
            <div
              key={job.id}
              className="p-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
              onClick={() => router.push(`/jobs/${job.id}`)}
            >
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {job.location} — {job.jobType}
                </p>
              </div>
              <button
                onClick={(e) => reopenJob(job.id, e)}
                className="text-green-600 hover:text-green-800"
              >
                Reopen
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

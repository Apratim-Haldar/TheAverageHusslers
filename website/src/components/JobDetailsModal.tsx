import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, MapPin, DollarSign, Clock, Briefcase, CheckCircle2, GraduationCap, Users2, Globe } from 'lucide-react';

interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
    salary: string;
    type: string;
    posted: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
    benefits: string[];
    companyInfo: {
      description: string;
      size: string;
      industry: string;
      website: string;
    };
  };
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ isOpen, onClose, job }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
          <Dialog.Portal>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div className="bg-[#1E293B] border border-gray-700 rounded-2xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto custom-scrollbar">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <Dialog.Title className="text-2xl font-bold text-white mb-2">
                          {job.title}
                        </Dialog.Title>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {job.company}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.posted}
                          </div>
                        </div>
                      </div>
                      <Dialog.Close asChild>
                        <button
                          className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
                          aria-label="Close"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </Dialog.Close>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <Briefcase className="w-5 h-5 text-[#60A5FA]" />
                          Job Description
                        </h3>
                        <p className="text-gray-300">{job.description}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-[#C084FC]" />
                          Requirements
                        </h3>
                        <ul className="list-none space-y-2">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-300">
                              <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <GraduationCap className="w-5 h-5 text-[#F472B6]" />
                          Responsibilities
                        </h3>
                        <ul className="list-none space-y-2">
                          {job.responsibilities.map((resp, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-300">
                              <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <Users2 className="w-5 h-5 text-[#34D399]" />
                          Benefits
                        </h3>
                        <ul className="list-none space-y-2">
                          {job.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-300">
                              <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-gray-700 pt-6">
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-[#60A5FA]" />
                          About {job.company}
                        </h3>
                        <p className="text-gray-300 mb-4">{job.companyInfo.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Industry:</span>
                            <span className="text-white ml-2">{job.companyInfo.industry}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Company Size:</span>
                            <span className="text-white ml-2">{job.companyInfo.size}</span>
                          </div>
                          <div className="col-span-2">
                            <a
                              href={job.companyInfo.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-[#60A5FA] hover:text-[#60A5FA]/80 transition-colors"
                            >
                              <Globe className="w-4 h-4" />
                              Company Website
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 mt-8">
                        <button className="flex-1 bg-gradient-to-r from-[#60A5FA] to-[#C084FC] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#1E293B]">
                          Apply Now
                        </button>
                        <button className="flex-1 border border-[#60A5FA] text-[#60A5FA] py-3 rounded-lg font-semibold hover:bg-[#60A5FA]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#1E293B]">
                          Save Job
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </AnimatePresence>
  );
};

export default JobDetailsModal;
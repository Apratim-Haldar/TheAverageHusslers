import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, Award, Briefcase, GraduationCap, Calendar, Star } from 'lucide-react';

interface HRProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  hr: {
    id: number;
    name: string;
    position: string;
    company: string;
    avatar: string;
    experience: string;
    specialization: string;
    email?: string;
    phone?: string;
    location?: string;
    education?: string;
    certifications?: string[];
    skills?: string[];
    achievements?: string[];
  };
}

const HRProfileModal: React.FC<HRProfileModalProps> = ({ isOpen, onClose, hr }) => {
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
                <div className="bg-[#1E293B] border border-gray-700 rounded-2xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-hidden">
                  <div className="relative flex flex-col h-full">
                    <Dialog.Title className="sr-only">
                      HR Profile Details for {hr.name}
                    </Dialog.Title>
                    
                    <div className="absolute top-4 right-4 z-10">
                      <Dialog.Close asChild>
                        <button
                          className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
                          aria-label="Close"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </Dialog.Close>
                    </div>
                    
                    <div className="p-8 overflow-y-auto custom-scrollbar">
                      <div className="flex items-center gap-6 mb-8">
                        <img
                          src={hr.avatar}
                          alt={hr.name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-[#60A5FA]"
                        />
                        <div>
                          <h2 className="text-2xl font-bold text-white mb-2">{hr.name}</h2>
                          <p className="text-[#60A5FA]">{hr.position}</p>
                          <p className="text-gray-400">{hr.company}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-[#60A5FA]" />
                            Professional Info
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-gray-300">
                              <Calendar className="w-4 h-4 text-[#C084FC]" />
                              Experience: {hr.experience}
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <Star className="w-4 h-4 text-[#C084FC]" />
                              Specialization: {hr.specialization}
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <GraduationCap className="w-4 h-4 text-[#C084FC]" />
                              Education: Master's in HR Management
                            </div>
                          </div>

                          <h3 className="text-lg font-semibold mt-6 mb-4 flex items-center gap-2">
                            <Award className="w-5 h-5 text-[#60A5FA]" />
                            Certifications
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-[#0F172A]/50 text-sm text-gray-300 px-3 py-1 rounded-full border border-gray-700">
                              SHRM-CP
                            </span>
                            <span className="bg-[#0F172A]/50 text-sm text-gray-300 px-3 py-1 rounded-full border border-gray-700">
                              PHR
                            </span>
                            <span className="bg-[#0F172A]/50 text-sm text-gray-300 px-3 py-1 rounded-full border border-gray-700">
                              HRCI
                            </span>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 text-gray-300">
                              <Mail className="w-5 h-5 text-[#C084FC]" />
                              {hr.email || 'hr@techcorp.com'}
                            </div>
                            <div className="flex items-center gap-3 text-gray-300">
                              <Phone className="w-5 h-5 text-[#C084FC]" />
                              {hr.phone || '+1 (555) 123-4567'}
                            </div>
                            <div className="flex items-center gap-3 text-gray-300">
                              <MapPin className="w-5 h-5 text-[#C084FC]" />
                              {hr.location || 'San Francisco, CA'}
                            </div>
                          </div>

                          <h3 className="text-lg font-semibold mt-6 mb-4">Key Skills</h3>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-[#0F172A]/50 text-sm text-gray-300 px-3 py-1 rounded-full border border-gray-700">
                              Talent Acquisition
                            </span>
                            <span className="bg-[#0F172A]/50 text-sm text-gray-300 px-3 py-1 rounded-full border border-gray-700">
                              Employee Relations
                            </span>
                            <span className="bg-[#0F172A]/50 text-sm text-gray-300 px-3 py-1 rounded-full border border-gray-700">
                              Performance Management
                            </span>
                            <span className="bg-[#0F172A]/50 text-sm text-gray-300 px-3 py-1 rounded-full border border-gray-700">
                              Leadership Development
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
                        <div className="space-y-3">
                          <div className="flex items-start gap-2">
                            <Award className="w-5 h-5 text-[#F472B6] mt-1" />
                            <p className="text-gray-300">Reduced average time-to-hire by 35% through process optimization</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <Award className="w-5 h-5 text-[#F472B6] mt-1" />
                            <p className="text-gray-300">Implemented new employee onboarding program with 95% satisfaction rate</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <Award className="w-5 h-5 text-[#F472B6] mt-1" />
                            <p className="text-gray-300">Led successful recruitment drive hiring 100+ engineers in Q4 2024</p>
                          </div>
                        </div>
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

export default HRProfileModal;
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, User, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GetStartedModal: React.FC<GetStartedModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleOptionClick = (path: string) => {
    onClose();
    navigate(path);
  };

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
                className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-[90vw] max-w-md"
              >
                <div className="bg-[#1E293B] border border-gray-700 rounded-2xl shadow-xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <Dialog.Title className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#60A5FA] via-[#C084FC] to-[#F472B6]">
                      Get Started
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button
                        className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
                        aria-label="Close"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOptionClick('/company')}
                      className="w-full p-4 bg-gradient-to-r from-[#60A5FA] to-[#C084FC] rounded-xl text-white flex items-center gap-3 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#1E293B]"
                    >
                      <Building2 className="w-6 h-6" />
                      <div className="text-left">
                        <div className="font-semibold">Company</div>
                        <div className="text-sm opacity-90">Manage your company profile and jobs</div>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOptionClick('/hr')}
                      className="w-full p-4 bg-gradient-to-r from-[#C084FC] to-[#F472B6] rounded-xl text-white flex items-center gap-3 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#1E293B]"
                    >
                      <Users className="w-6 h-6" />
                      <div className="text-left">
                        <div className="font-semibold">HR</div>
                        <div className="text-sm opacity-90">Manage recruitment and candidates</div>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOptionClick('/jobs')}
                      className="w-full p-4 bg-gradient-to-r from-[#F472B6] to-[#34D399] rounded-xl text-white flex items-center gap-3 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-[#1E293B]"
                    >
                      <User className="w-6 h-6" />
                      <div className="text-left">
                        <div className="font-semibold">Job Seeker</div>
                        <div className="text-sm opacity-90">Find and apply for jobs</div>
                      </div>
                    </motion.button>
                  </div>

                  <p className="mt-6 text-sm text-gray-400 text-center">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </AnimatePresence>
  );
};

export default GetStartedModal;
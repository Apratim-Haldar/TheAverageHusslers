"use client";
import React, { useState } from "react";
import { X, Upload } from 'lucide-react';
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import countries from 'country-telephone-data';

interface ApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  companyName: string;
  jobId?: string;
  onSuccess: () => void;
  userId: any; // Add userId prop
}

const ApplicationFormModal = ({
  isOpen,
  onClose,
  jobTitle,
  companyName,
  jobId,
  onSuccess,
  userId
}: ApplicationFormModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const [countrySearch, setCountrySearch] = useState('');
  const [selectedCode, setSelectedCode] = useState('+91');
  const [submitError, setSubmitError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Prepare a dedicated registration object for the resume
  const resumeRegister = register('resume', {
    required: 'Resume is required',
    validate: {
      pdfFormat: files =>
        files?.[0]?.type === 'application/pdf' || 'Only PDF files are allowed'
    }
  });



  // Sort & filter country codes
  const sortedCountries = countries.allCountries.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const filteredCountries = sortedCountries.filter(c =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    c.iso2.includes(countrySearch.toUpperCase()) ||
    c.dialCode.includes(countrySearch)
  );

  console.log("User ID:", userId); // Log the user ID for debugging

  // Upload helper with logging
  const uploadResume = async (file: File) => {
    try {
      // 1) Fetch presigned URL
      const { data } = await axios.get('/api/s3-presigned-url', {
        params: { fileName: file.name, fileType: file.type }
      });
      console.log('Got presigned URL →', data);

      // 2) PUT the file to S3
      const putResponse = await axios.put(data.url, file, {
        headers: { 'Content-Type': file.type },
        onUploadProgress: (progressEvent) => {
          const pct = (
            (progressEvent.loaded / (progressEvent.total || 1)) *
            100
          ).toFixed(0);
          console.log(`Upload progress: ${pct}%`);
        }
      });
      console.log('S3 PUT response:', putResponse.status, putResponse.statusText);

      return data.key;
    } catch (err) {
      console.error('Error uploading file:', err);
      throw new Error('Failed to upload resume');
    }
  };

  const onSubmit = async (formData: any) => {
    try {
      setSubmitError('');
      const file = formData.resume[0];
      setSelectedFile(file);

      const s3Key = await uploadResume(file);
      const fullPhone = `${selectedCode} ${formData.phone.replace(/[-\s]/g, '')}`;

      await axios.post('/api/apply', {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.toLowerCase().trim(),
        phone: fullPhone,
        job_id: jobId,
        s3FileKey: s3Key,
        immediateJoiner: Boolean(formData.immediateJoiner),
        experience: Number(formData.experience),
        user_id: userId,
      });

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Application failed:', error);
      if (error.response?.data?.isDuplicate) {
        setSubmitError('You have already applied for this position');
      } else {
        setSubmitError('Failed to submit application. Please try again.');
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-[#1E293B] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#1E293B] p-4 border-b border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Apply for {jobTitle}</h2>
            <p className="text-gray-400 text-sm">{companyName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {submitError && (
            <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-2 rounded-md">
              {submitError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First & Last Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                {...register("firstName", { required: "First name is required" })}
                className="w-full bg-[#0F172A]/50 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#60A5FA] border border-gray-700"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.firstName.message as string}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                type="text"
                {...register("lastName", { required: "Last name is required" })}
                className="w-full bg-[#0F172A]/50 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#60A5FA] border border-gray-700"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.lastName.message as string}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className="w-full bg-[#0F172A]/50 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#60A5FA] border border-gray-700"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-12 md:col-span-4 relative">
                  <div className="border rounded-md bg-[#0F172A]/50 border-gray-700">
                    <input
                      type="text"
                      placeholder="🔍 Search country..."
                      className="w-full p-2 border-b text-sm bg-transparent text-white border-gray-700"
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                    />
                    <select
                      className="w-full p-2 text-sm appearance-none bg-transparent h-10 text-white"
                      value={selectedCode}
                      onChange={(e) => {
                        setSelectedCode(e.target.value);
                        setCountrySearch('');
                      }}
                    >
                      {filteredCountries.map(c => (
                        <option
                          key={c.iso2}
                          value={c.dialCode}
                          className="bg-[#1E293B] text-white"
                        >
                          {c.name} ({c.dialCode})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-8">
                  <input
                    type="tel"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9\s-]{7,}$/,
                        message: "Invalid phone number format"
                      }
                    })}
                    className="w-full bg-[#0F172A]/50 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#60A5FA] border border-gray-700"
                    placeholder="1234567890"
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-sm">
                      {errors.phone.message as string}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Experience */}
            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Experience (years) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("experience", {
                  required: "Experience is required",
                  min: { value: 0, message: "Minimum 0 years" },
                  max: { value: 99, message: "Maximum 99 years" },
                  valueAsNumber: true
                })}
                className="w-full bg-[#0F172A]/50 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#60A5FA] border border-gray-700"
              />
              {errors.experience && (
                <span className="text-red-500 text-sm">
                  {errors.experience.message as string}
                </span>
              )}
            </div>

            {/* Immediate Joiner */}
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("immediateJoiner")}
                id="immediateJoiner"
                className="mr-2 bg-[#0F172A]/50 border-gray-700"
              />
              <label
                htmlFor="immediateJoiner"
                className="text-sm font-medium text-gray-300"
              >
                Immediate Joiner
              </label>
            </div>
          </div>

          {/* Resume Upload */}
          <div>
            <label
              htmlFor="resume-upload"
              className="cursor-pointer block"
            >
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-lg p-6 hover:border-[#60A5FA]/50 transition-colors">
                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                <p className="text-sm text-gray-400">
                  {selectedFile
                    ? selectedFile.name
                    : 'Click to upload or drag and drop'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PDF only (Max 5MB)
                </p>
              </div>
            </label>
            <input
              id="resume-upload"
              type="file"
              accept="application/pdf"
              className="hidden"
              {...resumeRegister}
              onChange={(e) => {
                resumeRegister.onChange(e);
                const file =
                  (e.target as HTMLInputElement).files?.[0] ?? null;
                setSelectedFile(file);
              }}
            />
            {errors.resume && (
              <span className="text-red-500 text-sm block mt-2">
                {errors.resume.message as string}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#60A5FA] to-[#C084FC] text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ApplicationFormModal;

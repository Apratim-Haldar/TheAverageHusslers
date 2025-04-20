'use client';

import React, { useState } from 'react';
import Modal from '@/components/modal';

type Props = {
  handleClose: () => void;
  userId: any;
};

const JobPdfForm = ({ handleClose, userId }: Props) => {
  const [uploadStatus, setUploadStatus] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [jobPosts, setJobPosts] = useState(0);

  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handlePdfUpload = async () => {
    if (!pdfFile) {
      setUploadStatus('Please select a PDF file first.');
      return;
    }

    setUploadStatus('Uploading...');

    try {
      const formData = new FormData();
      formData.append('file', pdfFile);

      const companyName = await fetch(
        `/api/get-company-name`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ createdBy: userId }),
        }
      )
      const name = await companyName.json()
      console.log('Company Name:', name); // Log the company name for debugging
      // const name = await companyName.json()
      const response = await fetch(
        `https://e0ce-103-249-38-15.ngrok-free.app/upload?user_id=${userId}&companyName=${name}`, // Replace with your actual API endpoint
        {
          method: 'POST',
          credentials: 'include',
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload PDF');
      }

      setUploadStatus('✅ Job post created successfully from PDF!');
      setPdfFile(null);

    //   // Refresh job posts count
    //   const jobPostsResponse = await fetch('/api/get-job-posts', {
    //     credentials: 'include',
    //   });

    //   const jobPostsData = await jobPostsResponse.json();
    //   console.log('Job posts data:', jobPostsData);
    //   setJobPosts(jobPostsData.response2.length);

      setTimeout(() => {
        handleClose();
        setUploadStatus('');
      }, 2000);
    } catch (error) {
      console.error('Error uploading PDF:', error);
      setUploadStatus(
        `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  };

  return (
    <Modal onClose={handleClose}>
      <div className="space-y-4 p-4">
        <h2 className="text-2xl font-bold text-gray-900">Upload Job Description PDF</h2>

        {uploadStatus && (
          <div
            className={`p-3 rounded-md transition-all ${
              uploadStatus.includes('Error') || uploadStatus.includes('❌')
                ? 'bg-red-100 text-red-700'
                : uploadStatus.includes('Uploading')
                ? 'bg-blue-100 text-blue-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {uploadStatus}
          </div>
        )}

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            accept=".pdf"
            onChange={handlePdfFileChange}
            className="hidden"
            id="pdf-upload"
          />
          <label
            htmlFor="pdf-upload"
            className="cursor-pointer text-blue-600 hover:text-blue-800"
          >
            {pdfFile ? pdfFile.name : 'Click to select a PDF file'}
          </label>
          {!pdfFile && (
            <p className="text-sm text-gray-500 mt-2">Only PDF files are supported.</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handlePdfUpload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            disabled={!pdfFile || uploadStatus.includes('Uploading')}
          >
            Upload PDF
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default JobPdfForm;

'use client'

import React, { useState } from 'react'
import Modal from '@/components/modal';
import JobPostForm from '@/components/job-post-form';

type JobCreateFormProps = {
    onClose: () => void;
}

const JobCreateForm = ({onClose}: JobCreateFormProps) => {
    const [showCreateJobPost, setShowCreateJobPost] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [showPDFUploadModal, setShowPDFUploadModal] = useState(false);

    const handleCreateJobPost = async (formData: any) => {
        try {
            const response = await fetch(
                "/api/create-job-post", // ✅ updated to App Router backend route
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData), // assuming formData includes createdById
                }
            );

            if (!response.ok) throw new Error("Failed to create job post");

            setSuccessMessage("Job post created successfully!");
            setTimeout(() => {
                setShowCreateJobPost(false);
                setShowPDFUploadModal(false);
                setSuccessMessage("");
            }, 1000);
        } catch (error) {
            console.error("Error:", error);
            setSuccessMessage("Error creating job post");
        }
    };

    return (
        <div>
            {showCreateJobPost && (
                <Modal onClose={() => setShowCreateJobPost(false)}>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Create New Job Post
                        </h2>
                        {successMessage && (
                            <div
                                className={`p-3 rounded-md ${successMessage.includes("Error")
                                    ? "bg-red-100 text-red-700"
                                    : "bg-green-100 text-green-700"
                                    }`}
                            >
                                {successMessage}
                            </div>
                        )}
                        <JobPostForm onSubmit={handleCreateJobPost} />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default JobCreateForm;

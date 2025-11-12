import React from 'react';
import { useNavigate } from 'react-router-dom';
import SubmissionForm from '../../components/participant/submission/SubmissionForm';
import Button from '../../components/common/Button';

const SubmissionFormPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    console.log('Submitting project:', formData);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert('Project submitted successfully!');
    navigate('/submissions'); // Navigate to submissions page
  };

  const handleSaveDraft = async (formData) => {
    console.log('Saving draft:', formData);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('Draft saved successfully!');
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div>
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Back</span>
        </button>
      </div>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">New Submission</h1>
        <p className="text-gray-600 mt-1">Fill out the form below to submit your project</p>
      </div>

      {/* Form */}
      <SubmissionForm
        onSubmit={handleSubmit}
        onSaveDraft={handleSaveDraft}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default SubmissionFormPage;
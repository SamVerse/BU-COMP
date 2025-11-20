// src/pages/participant/submissionFlow/SubmitStep.jsx
import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import SubmissionForm from "../../../components/participant/submission/SubmissionForm";

export default function SubmitStep() {
  const { submission } = useOutletContext();
  const navigate = useNavigate();

  if (!submission) {
    return <div className="p-6 text-gray-600">No submission found.</div>;
  }

  // Submit stage MUST ONLY run for drafts
  if (submission.status !== "draft") {
    return (
      <div className="p-6 text-gray-500">
        This submission is not in draft mode.  
        You cannot access Submit Stage now.
      </div>
    );
  }

  // Submit final project → backend → move to edit stage
  const handleFinalSubmit = async (formData) => {
    console.log("Final Submit:", formData);

    // TODO: backend call -> submit project
    // await api.submitProject(submission.id, formData)

    navigate(`/submissions/${submission.id}/edit`);
  };

  // Save draft again
  const handleSaveDraft = async (formData) => {
    console.log("Draft updated:", formData);

    // TODO: backend call -> update draft
    // await api.saveDraft(submission.id, formData)
  };

  return (
    <div className="space-y-4 p-2">
      <h2 className="text-2xl font-semibold text-gray-900">
        Submit Your Project
      </h2>

      <p className="text-gray-600">
        Fill out the details below and click <strong>Submit Project</strong> when ready.
      </p>

      {/* ✔ SAME FORM AS NEW SUBMISSION */}
      <SubmissionForm
        initialData={submission}
        onSubmit={handleFinalSubmit}
        onSaveDraft={handleSaveDraft}
        onCancel={() => navigate(-1)}
      />
    </div>
  );
}

// src/pages/participant/submissionFlow/EditStep.jsx
import React from "react";
import { useOutletContext } from "react-router-dom";
import EditStage from "./stages/edit/EditStage";

export default function EditStep() {
  const context = useOutletContext();

  if (!context || !context.submission) {
    return <div className="p-6 text-gray-600">No submission found</div>;
  }

  return <EditStage />;
}

// src/pages/participant/submissionFlow/EvaluatedDetails.jsx
import React from "react";
import { useOutletContext } from "react-router-dom";

export default function EvaluatedDetails() {
  const { submission } = useOutletContext();
  const evaluation = submission?.evaluation || {};

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Evaluation Details</h2>

      <div className="p-4 border rounded-lg bg-white">
        <h3 className="font-semibold">Evaluator Remarks</h3>
        <p className="text-gray-700 mt-2">{evaluation.remarks || "No remarks provided."}</p>
      </div>

      <div className="p-4 border rounded-lg bg-white">
        <h3 className="font-semibold">AI Analysis (Placeholder)</h3>
        <p className="text-gray-700 mt-2">AI suggestions and automated analysis will show here.</p>
      </div>

      <div className="p-4 border rounded-lg bg-white">
        <h3 className="font-semibold">Rubric / Breakdown</h3>
        <ul className="list-disc pl-5 text-gray-700 mt-2">
          <li>Implementation: 3.5/4</li>
          <li>Innovation: 2.5/3</li>
          <li>Presentation: 2.7/3</li>
        </ul>
      </div>
    </div>
  );
}

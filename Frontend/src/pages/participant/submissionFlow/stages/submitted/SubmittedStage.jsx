import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import Card from "../../../../../components/common/Card";

export default function SubmittedStage() {
  const { submission } = useOutletContext();
  const navigate = useNavigate();

  if (!submission) {
    return <div className="p-6 text-gray-600">No submission found.</div>;
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <Card padding="default" className="shadow-md">
        <h2 className="text-2xl font-bold text-gray-900">Project Submitted</h2>
        <p className="text-gray-600 mt-1">
          Your project has been successfully submitted. You can review the details below.
        </p>

        <div className="mt-3 inline-block px-4 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
          Status: Submitted
        </div>
      </Card>

      {/* PROJECT OVERVIEW */}
      <Card title="Project Overview" padding="default">
        <OverviewItem label="Project Title" value={submission.title} />
        <OverviewItem label="Event" value={submission.event} />
        <OverviewItem label="Track" value={submission.track} />
        <OverviewItem label="Event Secret Code" value={submission.secretCode} />
      </Card>

      {/* PROBLEM & SOLUTION */}
      <Card title="Problem & Solution" padding="default">
        <OverviewItem
          label="Problem Statement"
          value={submission.problemStatement || "Not provided"}
          multiline
        />
        <OverviewItem
          label="Solution Description"
          value={submission.solution || "Not provided"}
          multiline
        />
        <OverviewItem
          label="Challenges Faced"
          value={submission.challenges || "Not provided"}
          multiline
        />
      </Card>

      {/* TECHNICAL DETAILS */}
      <Card title="Technical Details" padding="default">
        <OverviewItem label="Tech Stack Used" value={submission.techStack || "Not provided"} />

        <OverviewItem
          label="Demo Link"
          value={
            submission.demoLink ? (
              <a
                href={submission.demoLink}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                {submission.demoLink}
              </a>
            ) : (
              "Not provided"
            )
          }
        />

        <OverviewItem
          label="GitHub Repository"
          value={
            submission.githubRepo ? (
              <a
                href={submission.githubRepo}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                {submission.githubRepo}
              </a>
            ) : (
              "Not provided"
            )
          }
        />
      </Card>

      {/* TEAM MEMBERS */}
      <Card title="Team Members" padding="default">
        {submission.teamMembers && submission.teamMembers.length > 0 ? (
          <div className="space-y-4">
            {submission.teamMembers.map((m, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center border p-4 rounded-lg bg-gray-50"
              >
                <p className="font-medium text-gray-800">{m.name}</p>
                <p className="text-gray-600">{m.email}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No team members added.</p>
        )}
      </Card>

      {/* SCREENSHOTS */}
      <Card title="Screenshots" padding="default">
        {submission.screenshots && submission.screenshots.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {submission.screenshots.map((url, idx) => (
              <img
                key={idx}
                src={url}
                className="w-full h-32 object-cover rounded-lg border"
                alt="screenshot"
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No screenshots uploaded.</p>
        )}
      </Card>

      {/* BUTTON TO EDIT STAGE */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate(`/submissions/${submission.id}/edit`)}
          className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow font-medium"
        >
          Go to Edit Stage →
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------- */
/* 🔹 REUSABLE READ-ONLY FIELD COMPONENT          */
/* ---------------------------------------------- */

function OverviewItem({ label, value, multiline = false }) {
  return (
    <div className="mb-4">
      <p className="text-sm text-gray-500">{label}</p>
      {multiline ? (
        <p className="mt-1 text-gray-800 leading-relaxed whitespace-pre-wrap">{value}</p>
      ) : (
        <p className="mt-1 font-medium text-gray-800">{value}</p>
      )}
    </div>
  );
}

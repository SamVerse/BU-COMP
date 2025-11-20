// src/pages/participant/Submissions.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import StatusBadge from "../../components/common/StatusBadge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFolderOpen } from "@fortawesome/free-solid-svg-icons";

// sample data; replace with API
const sampleData = [
  {
    id: "1",
    title: "AI-Powered Study Assistant",
    event: "TechFest 2025 Hackathon",
    status: "submitted", // draft | submitted | pending | shortlisted | evaluated
    submittedOn: "2025-11-05",
    lastUpdated: "2025-11-08",
    deadline: "2025-11-25",
    secretCode: "EVT-XYZ-111"
  },
  {
    id: "2",
    title: "Smart Campus Navigation",
    event: "Innovation Challenge 2025",
    status: "evaluated",
    submittedOn: "2025-10-01",
    lastUpdated: "2025-10-03",
    deadline: "2025-10-15",
    score: 8.5,
    secretCode: "EVT-ABC-222"
  },
  {
    id: "3",
    title: "EcoTrack Sensor",
    event: "Green Tech Summit",
    status: "pending",
    submittedOn: "2025-11-08",
    lastUpdated: "2025-11-10",
    deadline: "2025-11-20",
    secretCode: "EVT-ENV-333"
  },
  {
    id: "4",
    title: "AutoCrop Analyzer",
    event: "AgriTech Titans",
    status: "draft",
    submittedOn: null,
    lastUpdated: "2025-11-12",
    deadline: "2025-12-01",
    secretCode: "EVT-AGRI-999"
  }
];

export default function SubmissionsPage() {
  const navigate = useNavigate();
  const submissions = useMemo(() => sampleData, []);

  const [filter, setFilter] = useState("all");

  const filteredSubmissions = submissions.filter((s) => {
    if (filter === "all") return true;
    if (filter === "under-review") return s.status === "pending";
    if (filter === "shortlisted") return s.status === "shortlisted";
    if (filter === "drafts") return s.status === "draft";
    if (filter === "evaluated") return s.status === "evaluated";
    return true;
  });

  const hasSubmissions = submissions && submissions.length > 0;
  const hasFiltered = filteredSubmissions.length > 0;

  const filters = [
    { id: "all", label: "All Submissions" },
    { id: "under-review", label: "Under Review" },
    { id: "shortlisted", label: "Shortlisted" },
    { id: "drafts", label: "Drafts" },
    { id: "evaluated", label: "Evaluated" }
  ];

  return (
    <div className="space-y-6 p-4">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Submissions</h1>
          <p className="text-gray-600 mt-1">
            Manage your project submissions and track evaluation progress
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            icon={<FontAwesomeIcon icon={faPlus} />}
            onClick={() => navigate("/submissions/new")}
          >
            New Submission
          </Button>
        </div>
      </div>

      {/* SEARCH + FILTERS */}
      <Card padding="default">
        <div className="space-y-4">
          <Input placeholder="Search by title or event..." onChange={() => {}} />

          {/* FILTERS */}
          <div className="flex gap-4 overflow-x-auto border-b pb-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition 
                  ${
                    filter === f.id
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }
                `}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* EMPTY STATE IF NO SUBMISSIONS */}
      {!hasSubmissions && (
        <Card padding="lg">
          <div className="text-center py-12">
            <div className="mx-auto w-28 h-28 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-4xl">
              <FontAwesomeIcon icon={faFolderOpen} />
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-6">
              No submissions yet
            </h3>
            <p className="text-gray-600 mt-2">
              You haven't added any project submissions. Add your first project.
            </p>

            <div className="mt-6">
              <Button
                variant="primary"
                icon={<FontAwesomeIcon icon={faPlus} />}
                onClick={() => navigate("/submissions/new")}
              >
                Add your first project
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* LIST */}
      {hasSubmissions && (
        <div className="space-y-4">
          {!hasFiltered ? (
            <Card padding="lg">
              <p className="text-center text-gray-600 py-6">No submissions found in this category.</p>
            </Card>
          ) : (
            filteredSubmissions.map((s) => (
              <div
                key={s.id}
                className="p-4 border rounded-lg hover:shadow-sm transition cursor-pointer"
                onClick={() => navigate(`/submissions/${s.id}/submitted`)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Avatar */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-lg font-semibold">
                        {s.title
                          .split(" ")
                          .map((t) => t[0])
                          .slice(0, 2)
                          .join("")}
                      </div>

                      <div className="min-w-0">
                        <p className="text-lg font-semibold text-gray-900 truncate">
                          {s.title}
                        </p>
                        <p className="text-sm text-gray-600 mt-1 truncate">
                          {s.event}
                        </p>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-6 mt-3 text-sm text-gray-500">
                      <div>
                        Submitted{" "}
                        {s.submittedOn
                          ? new Date(s.submittedOn).toLocaleDateString()
                          : "—"}
                      </div>
                      <div>
                        Last updated{" "}
                        {s.lastUpdated
                          ? new Date(s.lastUpdated).toLocaleDateString()
                          : "—"}
                      </div>
                      {s.score && (
                        <div>
                          Score:{" "}
                          <span className="font-medium text-gray-900">
                            {s.score}/10
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status + Actions */}
                  <div className="flex flex-col items-end gap-3">
                    <StatusBadge status={s.status} />

                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/submissions/${s.id}/submitted`);
                        }}
                      >
                        View
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/submissions/${s.id}/edit`);
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

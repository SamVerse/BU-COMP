// src/pages/participant/submissionFlow/SubmissionFlowLayout.jsx
import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import Card from "../../../components/common/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faEdit,
    faHourglassHalf,
    faFlagCheckered,
} from "@fortawesome/free-solid-svg-icons";

const STEPS = [
    { id: "submitted", label: "Submit", icon: faCheckCircle, color: "bg-green-500", path: "submitted" },
    { id: "edit", label: "Edit", icon: faEdit, color: "bg-orange-500", path: "edit" },
    { id: "pending", label: "Pending", icon: faHourglassHalf, color: "bg-yellow-500", path: "pending" },
    { id: "evaluated", label: "Evaluated", icon: faFlagCheckered, color: "bg-purple-600", path: "evaluated" },
];

// ---- MOCK API CALL (Replace with real backend call) ----
function fetchSubmissionById(id) {
    const items = {
        "1": { id: "1", title: "Demo Project", event: "TechFest", status: "submitted", deadline: "2025-12-10" },
        "2": { id: "2", title: "Demo Project", event: "TechFest", status: "edit", deadline: "2025-20-12" },
        "3": { id: "3", title: "Demo Project", event: "TechFest", status: "pending", deadline: "2025-09-10" },
        "4": { id: "4", title: "Demo Project", event: "TechFest", status: "evaluated", deadline: "2025-09-10" },
    };
    return new Promise((res) => setTimeout(() => res(items[id] || null), 300));
}

export default function SubmissionFlowLayout() {
    const { submissionId } = useParams();
    const navigate = useNavigate();
    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetchSubmissionById(submissionId).then((data) => {
            setSubmission(data);
            setLoading(false);

            if (data) {
                navigate(`/submissions/${submissionId}/${data.status}`, { replace: true });
            }
        });
    }, [submissionId, navigate]);

    if (loading) return <div className="p-6">Loading...</div>;
    if (!submission) return <div className="p-6">No submission found</div>;

    const now = new Date();
    const deadlinePassed = submission.deadline ? now > new Date(submission.deadline) : false;

    return (
        <div className="space-y-6 p-4">

            {/* HEADER */}
            <div className="mb-4">

                {/* BACK BUTTON */}
                <div className="flex items-center gap-3 mb-2">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 flex items-center gap-2 transition"
                    >
                        ← Back
                    </button>
                </div>

                {/* TITLE */}
                <h2 className="text-2xl font-bold text-gray-900">{submission.title}</h2>
                <p className="text-gray-600 text-sm">{submission.event}</p>
            </div>

            {/* TIMELINE */}
            <Card padding="default">
                <div className="flex items-center">
                    {STEPS.map((step, index) => {
                        const isCurrent = submission.status === step.id;

                        const buttonColor = isCurrent
                            ? step.color
                            : STEPS.findIndex(s => s.id === submission.status) > index
                                ? step.color
                                : "bg-gray-300";

                        return (
                            <React.Fragment key={step.id}>
                                <button
                                    disabled={!isCurrent}
                                    className={`
              px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium text-white
              relative transition-all duration-200
              ${buttonColor}
              ${isCurrent ? "scale-110 shadow-md" : "opacity-40 cursor-not-allowed"}
            `}
                                    style={{
                                        border: isCurrent ? "3px solid rgba(0,0,0,0.25)" : "3px solid transparent",
                                        boxShadow: isCurrent ? "0 0 10px rgba(0,0,0,0.15)" : "none",
                                    }}
                                >
                                    <FontAwesomeIcon icon={step.icon} />
                                    {step.label}
                                </button>

                                {index < STEPS.length - 1 && (
                                    <div className="flex-1 border-t border-gray-300 mx-3"></div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </Card>


            {/* CONTENT */}
            <Card padding="default">
                <Outlet context={{ submission, deadlinePassed }} />
            </Card>
        </div>
    );
}

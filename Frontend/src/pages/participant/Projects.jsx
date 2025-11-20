import React, { useState, useEffect } from "react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

import Timeline from "../../components/project/Timeline";
import SubmittedComponent from "../../components/project/SubmittedComponent";
import EditComponent from "../../components/project/EditComponent";
import PendingComponent from "../../components/project/PendingComponent";
import EvaluatedComponent from "../../components/project/EvaluatedComponent";

import {
  faCheckCircle,
  faEdit,
  faHourglassHalf,
  faFlagCheckered,
} from "@fortawesome/free-solid-svg-icons";

// TIMELINE STEPS
const STEPS = [
  { id: "submitted", label: "Submitted", icon: faCheckCircle },
  { id: "edit", label: "Edit", icon: faEdit },
  { id: "pending", label: "Pending", icon: faHourglassHalf },
  { id: "evaluated", label: "Evaluated", icon: faFlagCheckered },
];

export default function ProjectPage() {
  // This will later come from backend
  const project = {
    title: "AI-Powered Study Assistant",
    description: "Intelligent project that helps students.",
    status: "submitted", // submitted | pending | evaluated
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    evaluation: {
      score: 8.7,
      remarks: "Excellent project implementation!",
    },
  };

  const now = new Date();
  const deadlinePassed = now > project.deadline;
  const isEditable = project.status === "submitted" && !deadlinePassed;

  // Auto step selection
  const [activeStep, setActiveStep] = useState(project.status);

  useEffect(() => {
    setActiveStep(project.status);
  }, [project.status]);

  // Locking logic
  const isLocked = (stepId) => {
    if (project.status === "submitted") {
      if (!deadlinePassed) {
        return stepId !== "submitted" && stepId !== "edit";
      }
      return stepId !== "submitted";
    }

    if (project.status === "pending") {
      return stepId !== "pending" && stepId !== "evaluated";
    }

    if (project.status === "evaluated") {
      return stepId !== "evaluated";
    }

    return false;
  };

  // Content renderer using new components
  const renderContent = () => {
    switch (activeStep) {
      case "submitted":
        return (
          <SubmittedComponent
            project={project}
            deadlinePassed={deadlinePassed}
          />
        );

      case "edit":
        return isEditable ? (
          <EditComponent project={project} />
        ) : (
          <p className="text-gray-600">
            Editing is locked because the deadline has passed.
          </p>
        );

      case "pending":
        return <PendingComponent />;

      case "evaluated":
        return <EvaluatedComponent project={project} />;

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* TIMELINE */}
      <Card padding="default">
        <Timeline
          steps={STEPS}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          isLocked={isLocked}
        />
      </Card>

      {/* CONTENT */}
      <Card padding="default">{renderContent()}</Card>

      {/* SUBMIT BUTTON ONLY IN EDIT MODE */}
      {activeStep === "edit" && isEditable && (
        <div className="flex justify-end">
          <Button variant="primary">Submit Updated Project</Button>
        </div>
      )}
    </div>
  );
}

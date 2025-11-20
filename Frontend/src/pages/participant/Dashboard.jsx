import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import ProfileSection from "../../components/participant/dashboard/ProfileSection";
import SubmissionOverview from "../../components/participant/dashboard/SubmissionOverview";
import QuickActions from "../../components/participant/dashboard/QuickActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUpload, faCalendar, faEye } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const navigate = useNavigate();

  // TEMP USER (Clerk removed)
  const user = {
    firstName: "Ayush",
    fullName: "Ayush Pandey",
    primaryEmailAddress: { emailAddress: "participant@example.com" },
    imageUrl: "https://ui-avatars.com/api/?name=Ayush+Pandey"
  };

  // TEMP stats
  const stats = {
    totalSubmissions: 5,
    eventsParticipated: 3,
    underReview: 2,
  };

  const latestSubmission = {
    title: "AI-Powered Study Assistant",
    event: "TechFest 2025 Hackathon",
    status: "under-review",
    submittedOn: "2025-11-05",
    lastUpdated: "2025-11-08",
  };

  const upcomingEvents = [
    {
      id: 1,
      name: "Innovation Challenge 2025",
      deadline: "2025-11-20",
      daysLeft: 10,
    },
    {
      id: 2,
      name: "Code Sprint Winter",
      deadline: "2025-12-01",
      daysLeft: 21,
    },
  ];

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case "new-submission":
        navigate("/submissions/new");
        break;
      case "my-projects":
        navigate("/projects");
        break;
      case "browse-events":
        navigate("/events");
        break;
      case "view-results":
        navigate("/submissions");
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.firstName}!
          </h1>
          <p className="text-gray-600 mt-1">
            Track your submissions and explore new events
          </p>
        </div>
        <Button
          variant="primary"
          icon={<FontAwesomeIcon icon={faPlus} />}
          onClick={() => navigate("/submissions/new")}
        >
          New Submission
        </Button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Submissions"
          value={stats.totalSubmissions}
          icon={<FontAwesomeIcon icon={faUpload} />}
          color="blue"
        />
        <StatCard
          title="Events Participated"
          value={stats.eventsParticipated}
          icon={<FontAwesomeIcon icon={faCalendar} />}
          color="green"
        />
        <StatCard
          title="Under Review"
          value={stats.underReview}
          icon={<FontAwesomeIcon icon={faEye} />}
          color="yellow"
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SubmissionOverview submission={latestSubmission} />

          <Card title="Upcoming Events" subtitle="Don't miss these opportunities">
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <EventItem key={event.id} event={event} />
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <ProfileSection
            userData={{
              name: user.fullName,
              email: user.primaryEmailAddress.emailAddress,
              avatar: user.imageUrl,
            }}
          />
          <QuickActions onAction={handleQuickAction} />
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------- UTILS ----------------------------------- */

const StatCard = ({ title, value, icon, color }) => {
  const colorStyles = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    yellow: "bg-yellow-50 text-yellow-600",
  };

  return (
    <Card padding="default" hover>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div
          className={`w-12 h-12 rounded-lg ${colorStyles[color]} flex items-center justify-center text-2xl`}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
};

const EventItem = ({ event }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{event.name}</h4>
        <p className="text-sm text-gray-500 mt-1">
          Deadline:{" "}
          {new Date(event.deadline).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}{" "}
          ({event.daysLeft} days left)
        </p>
      </div>
      <Button variant="ghost" size="sm" onClick={() => navigate("/events")}>
        View →
      </Button>
    </div>
  );
};

export default Dashboard;

// src/routes/index.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "../home/LandingPage";
import DashboardLayout from "../components/layout/DashboardLayout";

// Auth Pages
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

// Participant Pages
import Dashboard from "../pages/participant/Dashboard";
import SubmissionsPage from "../pages/participant/Submissions";
import SubmissionFormPage from "../pages/participant/SubmissionFormPage";

// Submission Flow Layout + Stages
import SubmissionFlowLayout from "../pages/participant/submissionFlow/SubmissionFlowLayout";
import SubmitStep from "../pages/participant/submissionFlow/SubmitStep";
import EditStep from "../pages/participant/submissionFlow/EditStep";
import PendingStep from "../pages/participant/submissionFlow/PendingStep";
import EvaluatedStep from "../pages/participant/submissionFlow/EvaluatedStep";
import EvaluatedDetails from "../pages/participant/submissionFlow/EvaluatedDetails";

import EventsPage from "../pages/participant/Events";
import SettingsPage from "../pages/participant/Settings";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Dashboard layout pages */}
      <Route element={<DashboardLayout />}>

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/submissions" element={<SubmissionsPage />} />
        <Route path="/submissions/new" element={<SubmissionFormPage />} />

        <Route path="/submissions/:submissionId" element={<SubmissionFlowLayout />}>
          <Route path="submitted" element={<SubmitStep />} />
          <Route path="edit" element={<EditStep />} />
          <Route path="pending" element={<PendingStep />} />
          <Route path="evaluated" element={<EvaluatedStep />} />
          <Route path="evaluated/details" element={<EvaluatedDetails />} />
        </Route>

        <Route path="/events" element={<EventsPage />} />
        <Route path="/settings" element={<SettingsPage />} />

      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

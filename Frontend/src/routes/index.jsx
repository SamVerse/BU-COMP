import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/participant/Dashboard';
import SubmissionsPage from '../pages/participant/Submissions';
import ProjectsPage from '../pages/participant/Projects';
import EventsPage from '../pages/participant/Events';
import SettingsPage from '../pages/participant/Settings';
import SubmissionFormPage from '../pages/participant/SubmissionFormPage';

const AppRoutes = ({ onNewSubmission }) => {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* Main routes */}
      <Route path="/dashboard" element={<Dashboard onNewSubmission={onNewSubmission} />} />
      <Route path="/submissions" element={<SubmissionsPage onNewSubmission={onNewSubmission} />} />
      <Route path="/submissions/new" element={<SubmissionFormPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      
      {/* 404 Page */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
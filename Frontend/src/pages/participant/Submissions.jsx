import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import StatusBadge from '../../components/common/StatusBadge';

const SubmissionsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock submissions data
  const submissions = [
    {
      id: 1,
      title: 'AI-Powered Study Assistant',
      event: 'TechFest 2025 Hackathon',
      status: 'under-review',
      submittedOn: '2025-11-05',
      description: 'An intelligent chatbot that helps students with their coursework',
      score: null,
    },
    {
      id: 2,
      title: 'Smart Campus Navigation',
      event: 'Innovation Challenge 2024',
      status: 'shortlisted',
      submittedOn: '2024-09-15',
      description: 'AR-based navigation system for university campus',
      score: 8.5,
    },
    {
      id: 3,
      title: 'Code Review Assistant',
      event: 'Code Sprint Fall 2024',
      status: 'rejected',
      submittedOn: '2024-10-20',
      description: 'Automated code review tool using machine learning',
      score: 6.2,
    },
    {
      id: 4,
      title: 'Sustainability Tracker',
      event: 'Green Tech Hackathon',
      status: 'draft',
      submittedOn: null,
      description: 'Track and reduce your carbon footprint',
      score: null,
    },
  ];

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.event.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || sub.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const tabs = [
    { id: 'all', label: 'All Submissions', count: submissions.length },
    { id: 'under-review', label: 'Under Review', count: submissions.filter((s) => s.status === 'under-review').length },
    { id: 'shortlisted', label: 'Shortlisted', count: submissions.filter((s) => s.status === 'shortlisted').length },
    { id: 'draft', label: 'Drafts', count: submissions.filter((s) => s.status === 'draft').length },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Submissions</h1>
          <p className="text-gray-600 mt-1">Manage all your project submissions</p>
        </div>
        <Button variant="primary" icon="➕" onClick={() => navigate('/submissions/new')}>
          New Submission
        </Button>
      </div>

      <Card padding="default">
        <div className="space-y-4">
          <Input
            placeholder="Search by project title or event name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />

          <div className="flex gap-2 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {filteredSubmissions.length === 0 ? (
          <Card padding="lg">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No submissions found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery ? 'Try adjusting your search' : 'Start by creating your first submission'}
              </p>
              {!searchQuery && (
                <Button variant="primary" onClick={() => navigate('/submissions/new')}>
                  Create Submission
                </Button>
              )}
            </div>
          </Card>
        ) : (
          filteredSubmissions.map((submission) => <SubmissionCard key={submission.id} submission={submission} />)
        )}
      </div>
    </div>
  );
};

const SubmissionCard = ({ submission }) => {
  return (
    <Card padding="default" hover>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-2xl flex-shrink-0">
              📁
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{submission.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{submission.event}</p>
                </div>
                <StatusBadge status={submission.status} />
              </div>

              <p className="text-sm text-gray-700 mt-3 line-clamp-2">{submission.description}</p>

              <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
                {submission.submittedOn && (
                  <div className="flex items-center gap-1">
                    <span>📅</span>
                    <span>
                      Submitted {new Date(submission.submittedOn).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                )}
                {submission.score && (
                  <div className="flex items-center gap-1">
                    <span>⭐</span>
                    <span>Score: {submission.score}/10</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-4">
                <Button variant="primary" size="sm">
                  View Details
                </Button>
                {submission.status === 'draft' ? (
                  <Button variant="outline" size="sm">
                    Continue Editing
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SubmissionsPage;
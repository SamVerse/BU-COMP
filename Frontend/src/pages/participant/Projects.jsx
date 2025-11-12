import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import StatusBadge from '../../components/common/StatusBadge';

const ProjectsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const projects = [
    {
      id: 1,
      title: 'AI-Powered Study Assistant',
      description: 'An intelligent chatbot that helps students with their coursework',
      event: 'TechFest 2025 Hackathon',
      status: 'under-review',
      techStack: ['React', 'Python', 'TensorFlow', 'FastAPI'],
      teamSize: 4,
      thumbnail: '🤖',
    },
    {
      id: 2,
      title: 'Smart Campus Navigation',
      description: 'AR-based navigation system for university campus',
      event: 'Innovation Challenge 2024',
      status: 'shortlisted',
      techStack: ['Unity', 'ARCore', 'Firebase', 'Node.js'],
      teamSize: 3,
      score: 8.5,
      thumbnail: '🗺️',
    },
  ];

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
          <p className="text-gray-600 mt-1">All your projects across different events</p>
        </div>
        <Button variant="primary" icon="➕">
          New Project
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Projects" value={projects.length} icon="📁" />
        <StatCard label="Shortlisted" value="1" icon="⭐" />
        <StatCard label="Under Review" value="1" icon="👀" />
        <StatCard label="Avg Score" value="8.5" icon="📊" />
      </div>

      {/* Filters */}
      <Card padding="default">
        <div className="flex items-center justify-between">
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
          />

          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </Card>

      {/* Projects Display */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredProjects.map((project) =>
          viewMode === 'grid' ? (
            <ProjectCardGrid key={project.id} project={project} />
          ) : (
            <ProjectCardList key={project.id} project={project} />
          )
        )}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon }) => (
  <Card padding="default">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className="text-2xl">{icon}</div>
    </div>
  </Card>
);

const ProjectCardGrid = ({ project }) => (
  <Card padding="none" hover>
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-3xl">
          {project.thumbnail}
        </div>
        <StatusBadge status={project.status} size="sm" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{project.title}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.slice(0, 3).map((tech) => (
          <span key={tech} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
            {tech}
          </span>
        ))}
      </div>
      <Button variant="primary" size="sm" fullWidth>
        View Details
      </Button>
    </div>
  </Card>
);

const ProjectCardList = ({ project }) => (
  <Card padding="default" hover>
    <div className="flex items-start gap-4">
      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-3xl">
        {project.thumbnail}
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{project.event}</p>
          </div>
          <StatusBadge status={project.status} size="sm" />
        </div>
        <p className="text-sm text-gray-700 mb-3">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span key={tech} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="primary" size="sm">
          View
        </Button>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </div>
    </div>
  </Card>
);

export default ProjectsPage;
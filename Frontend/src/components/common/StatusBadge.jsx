import React from 'react';

const StatusBadge = ({ status, size = 'md' }) => {
  const statusConfig = {
    pending: {
      label: 'Pending',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: '⏳',
    },
    'under-review': {
      label: 'Under Review',
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: '👀',
    },
    shortlisted: {
      label: 'Shortlisted',
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: '✓',
    },
    rejected: {
      label: 'Not Selected',
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: '✕',
    },
    draft: {
      label: 'Draft',
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      icon: '📝',
    },
    submitted: {
      label: 'Submitted',
      color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      icon: '📤',
    },
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  };

  const config = statusConfig[status] || statusConfig.draft;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-medium ${config.color} ${sizeStyles[size]}`}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
};

export default StatusBadge;
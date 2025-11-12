import React from 'react';
import Card from '../../common/Card';

const QuickActions = ({ onAction }) => {
  const actions = [
    { id: 'new-submission', icon: '📤', label: 'New Submission' },
    { id: 'my-projects', icon: '📁', label: 'My Projects' },
    { id: 'browse-events', icon: '📅', label: 'Browse Events' },
    { id: 'view-results', icon: '📊', label: 'View Results' },
  ];

  return (
    <Card title="Quick Actions" padding="default">
      <div className="space-y-2">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onAction(action.id)}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <span className="text-2xl">{action.icon}</span>
            <span className="font-medium text-gray-700">{action.label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
};

export default QuickActions;
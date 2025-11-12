import React from 'react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import StatusBadge from '../../common/StatusBadge';

const SubmissionOverview = ({ submission }) => {
  if (!submission) {
    return (
      <Card title="Latest Submission" padding="default">
        <div className="text-center py-8">
          <p className="text-gray-500">No submissions yet</p>
          <Button variant="primary" size="sm" className="mt-4">
            Create Your First Submission
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Latest Submission" padding="default">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">{submission.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{submission.event}</p>
          </div>
          <StatusBadge status={submission.status} />
        </div>

        <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-200">
          <div>
            <p className="text-sm text-gray-500">Submitted On</p>
            <p className="text-base font-medium text-gray-900 mt-1">
              {new Date(submission.submittedOn).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="text-base font-medium text-gray-900 mt-1">
              {new Date(submission.lastUpdated).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="primary" size="sm">
            View Details
          </Button>
          <Button variant="outline" size="sm">
            Edit Submission
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SubmissionOverview;
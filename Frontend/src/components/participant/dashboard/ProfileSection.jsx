import React from 'react';
import Card from '../../common/Card';
import Button from '../../common/Button';

const ProfileSection = ({ userData }) => {
  const initials = userData.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card title="Profile" padding="default">
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold mb-4">
          {initials}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{userData.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{userData.email}</p>
        <p className="text-sm text-gray-500 mt-1">{userData.department}</p>
        
        <Button variant="outline" size="sm" fullWidth className="mt-4">
          Edit Profile
        </Button>
      </div>
    </Card>
  );
};

export default ProfileSection;
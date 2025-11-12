import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  

  // Profile Settings State
  const [profileData, setProfileData] = useState({
    fullName: 'Ayush Pandey',
    email: 'pandeyayush.0005@gmail.com',
    phone: '+91 7275799282',
    department: 'Computer Science',
    year: '3rd Year',
    college: 'Bennett University',
    bio: 'Passionate about building innovative tech solutions',
  });

  // Account Settings State
  const [accountData, setAccountData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Notification Settings State
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    submissionUpdates: true,
    eventReminders: true,
    evaluationResults: true,
    marketingEmails: false,
  });

  const handleProfileChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAccountChange = (field, value) => {
    setAccountData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationToggle = (field) => {
    setNotifications((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('Profile updated successfully!');
  };

  const handleChangePassword = async () => {
    if (accountData.newPassword !== accountData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (accountData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }

    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setAccountData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    alert('Password changed successfully!');
  };

  const sections = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'account', label: 'Account & Security', icon: '🔒' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'privacy', label: 'Privacy', icon: '🛡️' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card padding="sm">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">{section.icon}</span>
                  <span>{section.label}</span>
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeSection === 'profile' && (
            <Card title="Profile Information" subtitle="Update your personal details">
              <div className="space-y-4">
                {/* Avatar Section */}
                <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
                  <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                    {profileData.fullName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{profileData.fullName}</h3>
                    <p className="text-sm text-gray-600 mt-1">{profileData.email}</p>
                    <Button variant="outline" size="sm" className="mt-3">
                      Change Avatar
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={(e) => handleProfileChange('fullName', e.target.value)}
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    required
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                  />
                  <Input
                    label="Department"
                    name="department"
                    value={profileData.department}
                    onChange={(e) => handleProfileChange('department', e.target.value)}
                  />
                  <Input
                    label="Year"
                    name="year"
                    value={profileData.year}
                    onChange={(e) => handleProfileChange('year', e.target.value)}
                  />
                  <Input
                    label="College/University"
                    name="college"
                    value={profileData.college}
                    onChange={(e) => handleProfileChange('college', e.target.value)}
                  />
                </div>

                <Input
                  label="Bio"
                  type="textarea"
                  name="bio"
                  rows={3}
                  value={profileData.bio}
                  onChange={(e) => handleProfileChange('bio', e.target.value)}
                  helperText="Tell us a bit about yourself and your interests"
                />

                <div className="flex justify-end pt-4">
                  <Button variant="primary" onClick={handleSaveProfile} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeSection === 'account' && (
            <Card title="Account & Security" subtitle="Manage your password and security settings">
              <div className="space-y-6">
                <div className="space-y-4">
                  <Input
                    label="Current Password"
                    type="password"
                    name="currentPassword"
                    value={accountData.currentPassword}
                    onChange={(e) => handleAccountChange('currentPassword', e.target.value)}
                    placeholder="Enter your current password"
                  />
                  <Input
                    label="New Password"
                    type="password"
                    name="newPassword"
                    value={accountData.newPassword}
                    onChange={(e) => handleAccountChange('newPassword', e.target.value)}
                    placeholder="Enter new password (min 8 characters)"
                    helperText="Use a strong password with letters, numbers, and symbols"
                  />
                  <Input
                    label="Confirm New Password"
                    type="password"
                    name="confirmPassword"
                    value={accountData.confirmPassword}
                    onChange={(e) => handleAccountChange('confirmPassword', e.target.value)}
                    placeholder="Re-enter new password"
                  />
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <Button variant="primary" onClick={handleChangePassword} disabled={isSaving}>
                    {isSaving ? 'Changing...' : 'Change Password'}
                  </Button>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Enable 2FA</p>
                      <p className="text-sm text-gray-600 mt-1">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h3>
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-gray-700 mb-3">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button variant="danger" size="sm">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeSection === 'notifications' && (
            <Card title="Notification Preferences" subtitle="Choose what updates you want to receive">
              <div className="space-y-4">
                <NotificationToggle
                  label="Email Notifications"
                  description="Receive email updates about your account"
                  checked={notifications.emailNotifications}
                  onChange={() => handleNotificationToggle('emailNotifications')}
                />
                <NotificationToggle
                  label="Submission Updates"
                  description="Get notified when your submission status changes"
                  checked={notifications.submissionUpdates}
                  onChange={() => handleNotificationToggle('submissionUpdates')}
                />
                <NotificationToggle
                  label="Event Reminders"
                  description="Receive reminders about upcoming event deadlines"
                  checked={notifications.eventReminders}
                  onChange={() => handleNotificationToggle('eventReminders')}
                />
                <NotificationToggle
                  label="Evaluation Results"
                  description="Get notified when your project has been evaluated"
                  checked={notifications.evaluationResults}
                  onChange={() => handleNotificationToggle('evaluationResults')}
                />
                <NotificationToggle
                  label="Marketing Emails"
                  description="Receive news about new features and events"
                  checked={notifications.marketingEmails}
                  onChange={() => handleNotificationToggle('marketingEmails')}
                />

                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <Button variant="primary" onClick={handleSaveProfile} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Preferences'}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeSection === 'privacy' && (
            <Card title="Privacy Settings" subtitle="Control how your data is used">
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Data Collection</h4>
                  <p className="text-sm text-gray-700">
                    We collect minimal data to provide you with the best experience. Your project data is only visible
                    to assigned evaluators and event organizers.
                  </p>
                </div>

                <NotificationToggle
                  label="Profile Visibility"
                  description="Make your profile visible to other participants"
                  checked={true}
                  onChange={() => {}}
                />
                <NotificationToggle
                  label="Show My Projects"
                  description="Allow others to see your public projects"
                  checked={false}
                  onChange={() => {}}
                />

                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Data Export</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Download a copy of all your data including submissions and evaluations
                  </p>
                  <Button variant="outline" size="sm">
                    Download My Data
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

// Notification Toggle Component
const NotificationToggle = ({ label, description, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200">
      <div className="flex-1">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default SettingsPage;
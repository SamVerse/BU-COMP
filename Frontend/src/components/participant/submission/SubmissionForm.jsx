import React, { useState } from 'react';
import Card from '../../common/Card';
import Input from '../../common/Input';
import Button from '../../common/Button';

const SubmissionForm = ({ onSubmit, onSaveDraft, initialData = {}, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    eventCode: initialData.eventCode || '',
    demoLink: initialData.demoLink || '',
    githubRepo: initialData.githubRepo || '',
    techStack: initialData.techStack || '',
    problemStatement: initialData.problemStatement || '',
    solution: initialData.solution || '',
    challenges: initialData.challenges || '',
    track: initialData.track || '',
    teamMembers: initialData.teamMembers || [{ name: '', email: '' }],
    screenshots: initialData.screenshots || [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleTeamMemberChange = (index, field, value) => {
    const updatedMembers = [...formData.teamMembers];
    updatedMembers[index][field] = value;
    setFormData((prev) => ({ ...prev, teamMembers: updatedMembers }));
  };

  const addTeamMember = () => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: '', email: '' }],
    }));
  };

  const removeTeamMember = (index) => {
    const updatedMembers = formData.teamMembers.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, teamMembers: updatedMembers }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const mockUrls = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      screenshots: [...prev.screenshots, ...mockUrls],
    }));
  };

  const removeScreenshot = (index) => {
    const updatedScreenshots = formData.screenshots.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, screenshots: updatedScreenshots }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.eventCode.trim()) newErrors.eventCode = 'Event code is required';
    if (!formData.problemStatement.trim()) 
      newErrors.problemStatement = 'Problem statement is required';
    if (!formData.solution.trim()) 
      newErrors.solution = 'Solution description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitClick = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraftClick = async () => {
    setIsSubmitting(true);
    try {
      await onSaveDraft(formData);
    } catch (error) {
      console.error('Draft save error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card title="Basic Information" subtitle="Tell us about your project">
        <div className="space-y-4">
          <Input
            label="Project Title"
            name="title"
            placeholder="Enter your project title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            error={errors.title}
            required
          />

          <Input
            label="Event Code"
            name="eventCode"
            placeholder="Enter the unique event code"
            value={formData.eventCode}
            onChange={(e) => handleChange('eventCode', e.target.value)}
            error={errors.eventCode}
            required
            helperText="You'll receive this code from the event organizer"
          />

          <Input
            label="Track"
            name="track"
            placeholder="e.g., AI/ML, Web Development, IoT"
            value={formData.track}
            onChange={(e) => handleChange('track', e.target.value)}
          />
        </div>
      </Card>

      {/* Project Details */}
      <Card title="Project Details" subtitle="Describe your solution">
        <div className="space-y-4">
          <Input
            label="What problem are you solving?"
            type="textarea"
            name="problemStatement"
            rows={4}
            placeholder="Describe the problem your project addresses..."
            value={formData.problemStatement}
            onChange={(e) => handleChange('problemStatement', e.target.value)}
            error={errors.problemStatement}
            required
          />

          <Input
            label="What solution are you providing?"
            type="textarea"
            name="solution"
            rows={4}
            placeholder="Explain how your project solves the problem..."
            value={formData.solution}
            onChange={(e) => handleChange('solution', e.target.value)}
            error={errors.solution}
            required
          />

          <Input
            label="Challenges Faced"
            type="textarea"
            name="challenges"
            rows={3}
            placeholder="What challenges did you encounter during development?"
            value={formData.challenges}
            onChange={(e) => handleChange('challenges', e.target.value)}
          />
        </div>
      </Card>

      {/* Technical Details */}
      <Card title="Technical Details" subtitle="Links and technology">
        <div className="space-y-4">
          <Input
            label="Live Demo Link"
            type="url"
            name="demoLink"
            placeholder="https://your-demo-link.com"
            value={formData.demoLink}
            onChange={(e) => handleChange('demoLink', e.target.value)}
            helperText="Deployed project URL or video demo"
          />

          <Input
            label="GitHub Repository"
            type="url"
            name="githubRepo"
            placeholder="https://github.com/username/repo"
            value={formData.githubRepo}
            onChange={(e) => handleChange('githubRepo', e.target.value)}
          />

          <Input
            label="Tech Stack Used"
            name="techStack"
            placeholder="e.g., React, Node.js, MongoDB, TensorFlow"
            value={formData.techStack}
            onChange={(e) => handleChange('techStack', e.target.value)}
            helperText="Comma-separated list of technologies"
          />
        </div>
      </Card>

      {/* Team Members */}
      <Card
        title="Team Members"
        subtitle="Add your team members"
        actions={
          <Button variant="ghost" size="sm" onClick={addTeamMember}>
            + Add Member
          </Button>
        }
      >
        <div className="space-y-4">
          {formData.teamMembers.map((member, index) => (
            <div key={index} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  placeholder="Member name"
                  value={member.name}
                  onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Member email"
                  value={member.email}
                  onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)}
                />
              </div>
              {formData.teamMembers.length > 1 && (
                <button
                  onClick={() => removeTeamMember(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Screenshots */}
      <Card title="Screenshots" subtitle="Upload project screenshots (optional)">
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="screenshot-upload"
            />
            <label htmlFor="screenshot-upload" className="cursor-pointer">
              <div className="text-4xl mb-2">📸</div>
              <p className="text-gray-600 font-medium">Click to upload screenshots</p>
              <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 5MB each</p>
            </label>
          </div>

          {formData.screenshots.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.screenshots.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Screenshot ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    onClick={() => removeScreenshot(index)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Submit Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <Button variant="outline" onClick={handleSaveDraftClick} disabled={isSubmitting}>
          Save as Draft
        </Button>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitClick} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Project'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionForm;
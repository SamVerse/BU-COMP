import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Card from "../../../../../components/common/Card";
import Input from "../../../../../components/common/Input";
import Button from "../../../../../components/common/Button";


export default function EditStage() {
  const { submission, deadlinePassed } = useOutletContext();

  // ----- INITIAL FORM DATA BASED ON SUBMISSION -----
  const [formData, setFormData] = useState({
    title: submission.title || "",
    eventCode: submission.secretCode || "",
    demoLink: submission.demoLink || "",
    githubRepo: submission.githubRepo || "",
    techStack: submission.techStack || "",
    problemStatement: submission.problemStatement || "",
    solution: submission.solution || "",
    challenges: submission.challenges || "",
    track: submission.track || "",
    teamMembers: submission.teamMembers || [{ name: "", email: "" }],
    screenshots: submission.screenshots || [],
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // ----- HANDLE CHANGES -----
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleTeamMemberChange = (index, field, value) => {
    const updated = [...formData.teamMembers];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, teamMembers: updated }));
  };

  const addTeamMember = () => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: "", email: "" }],
    }));
  };

  const removeTeamMember = (index) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index),
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      screenshots: [...prev.screenshots, ...urls],
    }));
  };

  const removeScreenshot = (index) => {
    setFormData((prev) => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index),
    }));
  };

  // ----- VALIDATION -----
  const validate = () => {
    const newErr = {};
    if (!formData.title.trim()) newErr.title = "Title is required";
    if (!formData.problemStatement.trim())
      newErr.problemStatement = "Problem statement required";
    if (!formData.solution.trim())
      newErr.solution = "Solution description required";

    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  // ----- SAVE BUTTON -----
  const handleUpdate = async () => {
    if (!validate()) return;

    setSaving(true);
    try {
      console.log("Updating submission:", formData);

      // 🔥 Here you will call your backend API
      // await api.updateSubmission(submission.id, formData);

      alert("Project Updated Successfully!");
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  // ⭐ IF DEADLINE PASSED → LOCK UI
  if (deadlinePassed) {
    return (
      <div className="bg-yellow-50 border border-yellow-300 p-8 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-yellow-800">Editing Locked</h2>
        <p className="text-yellow-700 mt-2">
          The deadline for editing this submission has passed.  
          Your project is now in the Pending Stage and waiting for evaluation.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* TITLE + STATUS */}
      <Card
        title="Edit Submission"
        subtitle="Update your project details before the deadline"
      >
        <p className="mt-2 inline-block px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-lg">
          Editing Enabled — Deadline Active
        </p>
      </Card>

      {/* BASIC INFO */}
      <Card title="Basic Information">
        <div className="space-y-4">
          <Input
            label="Project Title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            error={errors.title}
            required
          />

          <Input
            label="Event Secret Code"
            value={formData.eventCode}
            disabled
            helperText="Cannot be changed"
          />

          <Input
            label="Track"
            value={formData.track}
            onChange={(e) => handleChange("track", e.target.value)}
          />
        </div>
      </Card>

      {/* PROJECT DETAILS */}
      <Card title="Project Details">
        <div className="space-y-4">
          <Input
            type="textarea"
            label="Problem Statement"
            rows={4}
            value={formData.problemStatement}
            onChange={(e) => handleChange("problemStatement", e.target.value)}
            error={errors.problemStatement}
            required
          />

          <Input
            type="textarea"
            label="Solution Description"
            rows={4}
            value={formData.solution}
            onChange={(e) => handleChange("solution", e.target.value)}
            error={errors.solution}
            required
          />

          <Input
            type="textarea"
            label="Challenges Faced"
            rows={3}
            value={formData.challenges}
            onChange={(e) => handleChange("challenges", e.target.value)}
          />
        </div>
      </Card>

      {/* TECHNICAL DETAILS */}
      <Card title="Technical Details">
        <div className="space-y-4">
          <Input
            label="Demo Link"
            value={formData.demoLink}
            onChange={(e) => handleChange("demoLink", e.target.value)}
          />

          <Input
            label="GitHub Repository"
            value={formData.githubRepo}
            onChange={(e) => handleChange("githubRepo", e.target.value)}
          />

          <Input
            label="Tech Stack"
            value={formData.techStack}
            onChange={(e) => handleChange("techStack", e.target.value)}
          />
        </div>
      </Card>

      {/* TEAM MEMBERS */}
      <Card
        title="Team Members"
        actions={
          <Button variant="ghost" size="sm" onClick={addTeamMember}>
            + Add Member
          </Button>
        }
      >
        <div className="space-y-4">
          {formData.teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border"
            >
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  placeholder="Member Name"
                  value={member.name}
                  onChange={(e) =>
                    handleTeamMemberChange(index, "name", e.target.value)
                  }
                />
                <Input
                  placeholder="Member Email"
                  value={member.email}
                  onChange={(e) =>
                    handleTeamMemberChange(index, "email", e.target.value)
                  }
                />
              </div>

              {formData.teamMembers.length > 1 && (
                <button
                  onClick={() => removeTeamMember(index)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* SCREENSHOTS */}
      <Card title="Screenshots">
        <div className="space-y-4">
          <div className="border-2 border-dashed p-8 rounded-xl text-center">
            <input
              type="file"
              accept="image/*"
              multiple
              id="edit-upload"
              className="hidden"
              onChange={handleFileUpload}
            />
            <label htmlFor="edit-upload" className="cursor-pointer">
              <div className="text-4xl">📸</div>
              <p className="text-gray-600 font-medium">Click to upload screenshots</p>
            </label>
          </div>

          {formData.screenshots.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.screenshots.map((url, i) => (
                <div key={i} className="relative group">
                  <img
                    src={url}
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                  <button
                    onClick={() => removeScreenshot(i)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* ACTIONS */}
      <div className="flex justify-end border-t pt-4">
        <Button variant="primary" onClick={handleUpdate} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}

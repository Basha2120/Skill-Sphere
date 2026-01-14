import React, { useState, useEffect } from "react";
import { useSkills } from "../context/skillContext";

const Profile = () => {
  const { skills } = useSkills();

  // Load profile from localStorage
  const [profile, setProfile] = useState(() => {
    const stored = localStorage.getItem("profile");
    return stored
      ? JSON.parse(stored)
      : {
          name: "User Name",
          role: "Role",
          bio: "Tell us about yourself and your learning goals.",
        };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  const handleSave = () => {
    if (!tempProfile.name.trim()) return;
    setProfile({
      ...tempProfile,
      name: tempProfile.name.trim(),
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-6">
      {/* ================= PROFILE CARD ================= */}
      <div className="bg-white shadow-lg rounded-2xl p-8">
        {!isEditing ? (
          /* ---------- VIEW MODE ---------- */
          <div className="flex flex-col items-center">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                profile.name
              )}&background=0D8ABC&color=fff&size=128`}
              alt="Profile"
              className="rounded-full mb-4 shadow-md"
            />

            <h2 className="text-2xl font-bold text-gray-800">
              {profile.name}
            </h2>
            <p className="text-xl font-bold text-blue-900 mb-2">{profile.role}</p>
            <p className="text-md text-gray-600 text-center mb-6">
              {profile.bio}
            </p>

            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Edit Profile
            </button>

            {/* SKILLS */}
            <div className="w-full mt-8">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Skills Added in SkillSphere
              </h3>

              {skills.length === 0 ? (
                <p className="text-md text-gray-600 text-sm">
                  No skills added yet.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ---------- EDIT MODE ---------- */
          <div>
            <h2 className="text-xl font-bold mb-6">
              Edit Profile
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={tempProfile.name}
                  onChange={(e) =>
                    setTempProfile({
                      ...tempProfile,
                      name: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Role
                </label>
                <input
                  type="text"
                  value={tempProfile.role}
                  onChange={(e) =>
                    setTempProfile({
                      ...tempProfile,
                      role: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Bio
                </label>
                <textarea
                  rows="3"
                  value={tempProfile.bio}
                  onChange={(e) =>
                    setTempProfile({
                      ...tempProfile,
                      bio: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="text-gray-600 hover:underline"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

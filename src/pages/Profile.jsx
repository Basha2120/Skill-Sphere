import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useSkills } from "../context/skillContext";

const Profile = () => {
  const { user } = useAuth();
  const { skills } = useSkills();

  // For fields not yet in DB, we use defaults or localStorage enhancements
  const [profileAddons, setProfileAddons] = useState(() => {
    const stored = localStorage.getItem(`profile_addons_${user?.email}`);
    return stored ? JSON.parse(stored) : { role: "Product Designer & Developer", bio: "Passionate about building intuitive user experiences and learning new technologies." };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempAddons, setTempAddons] = useState(profileAddons);

  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(`profile_addons_${user.email}`, JSON.stringify(profileAddons));
    }
  }, [profileAddons, user?.email]);

  const handleSave = () => {
    setProfileAddons(tempAddons);
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* ================= PROFILE HEADER ================= */}
      <div className="relative mb-10">
        <div className="min-h-[260px] w-full bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700 rounded-3xl overflow-hidden shadow-xl flex items-center px-8 sm:px-12 py-10 relative">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-center space-y-6 sm:space-y-0 sm:space-x-10 w-full text-center sm:text-left">
            <div className="relative flex-shrink-0">
              <div className="p-1 rounded-3xl bg-white/20 backdrop-blur-md">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=fff&color=2563eb&size=160&bold=true`}
                  alt="Profile"
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl shadow-2xl object-cover bg-white"
                />
              </div>
              <div className="absolute bottom-2 right-2 w-7 h-7 bg-green-500 border-4 border-white dark:border-slate-800 rounded-full shadow-lg"></div>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-md tracking-tight">
                {user.name}
              </h1>
              <p className="text-blue-100 font-semibold text-xl mt-2 opacity-95">
                {profileAddons.role}
              </p>
              <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-4">
                <span className="flex items-center px-4 py-1.5 bg-white/10 backdrop-blur-md text-white text-sm font-medium rounded-full border border-white/20">
                  <span className="mr-2">📧</span> {user.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: About */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
                  👤
                </span>
                About Me
              </h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Professional Role
                  </label>
                  <input
                    type="text"
                    value={tempAddons.role}
                    onChange={(e) => setTempAddons({ ...tempAddons, role: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="e.g. Software Engineer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Personal Bio
                  </label>
                  <textarea
                    rows="4"
                    value={tempAddons.bio}
                    onChange={(e) => setTempAddons({ ...tempAddons, bio: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="Tell us about your learning journey..."
                  />
                </div>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl transition-all active:scale-95"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {profileAddons.bio}
                </p>
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl">
                  <span className="mr-2">📧</span>
                  {user.email}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Skill Stats */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <span className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mr-3">
                🎯
              </span>
              Skills
            </h2>

            {skills.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-slate-400 text-sm">No skills tracked yet.</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="group relative px-4 py-2 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-default"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 text-center">
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {skills.length}
              </p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">
                Active Skills
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

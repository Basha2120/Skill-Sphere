import React from "react";
import { useSkills } from "../context/skillContext";

const Profile = () => {
  const { skills } = useSkills();

  const user = {
    name: "Basha",
    role: "Aspiring Software Developer",
    bio: "Final-year engineering student passionate about frontend, Java backend, and building real-world projects.",
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-6">
      <div className="flex flex-col items-center">
        <img
          src="https://ui-avatars.com/api/?name=Basha&background=0D8ABC&color=fff&size=128"
          alt="Profile"
          className="rounded-full mb-4 shadow-md"
        />

        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-blue-700 mb-2">{user.role}</p>
        <p className="text-gray-600 text-center mb-6">{user.bio}</p>

        {/* Dynamic Skills */}
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Skills Added in SkillSphere
          </h3>

          {skills.length === 0 ? (
            <p className="text-gray-500 text-sm">
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
    </div>
  );
};

export default Profile;

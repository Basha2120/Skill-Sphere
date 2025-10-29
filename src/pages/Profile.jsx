import React from "react";

const Profile = () => {
    const user = {
        name:"Basha",
        role:"Aspiring Software Developer",
        bio: "Final-year engineering student passionate about frontend, Java backend, and building real-world projects.",
        skills: ["React", "Tailwind CSS", "Java", "Spring Boot", "MySQL"],
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
        <p className="text-blue-800 mb-2">{user.role}</p>
        <p className="text-gray-600 text-center">{user.bio}</p>

        <div className="mt-6 w-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 text-left">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

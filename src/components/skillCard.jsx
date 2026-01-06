import React from "react";
const SkillCard = ({ skill }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-end mb-2">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight">
          {skill.name}
        </h3>
        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
          {skill.progress}%
        </span>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
        <div
          className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${skill.progress}%` }}
        />
      </div>
    </div>
  );
};

export default SkillCard;

import React from "react";
import { useSkills } from "../context/skillContext";
import {
  calculateProgress,
  calculateCategoryProgress,
} from "../utils/Progress";

const Dashboard = () => {
  const { skills } = useSkills();

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Skill Overview Dashboard 📊</h2>

      {Object.keys(skillsByCategory).map((category) => (
        <div key={category} className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold">{category}</h3>
            <span className="text-sm font-medium text-gray-600">
              {calculateCategoryProgress(skillsByCategory[category])}% overall
            </span>
          </div>

          <div className="space-y-4">
            {skillsByCategory[category].map((skill) => {
              const progress = calculateProgress(skill.topics);

              return (
                <div
                  key={skill.id}
                  className="bg-white p-4 rounded-xl shadow-sm"
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-500">{progress}%</span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-500 h-3 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;

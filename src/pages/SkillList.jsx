import React from "react";
import { useSkills } from "../context/skillContext";
import { Link } from "react-router-dom";

const calculateProgress = (topics) => {
  const completed = topics.filter((t) => t.completed).length;
  return Math.round((completed / topics.length) * 100);
};

const SkillList = () => {
  const { skills } = useSkills();

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">My Skills 📚</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill) => {
          const progress = calculateProgress(skill.topics);

          return (
            <div
              key={skill.id}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-semibold">{skill.name}</h3>
              <p className="text-sm text-gray-500 mb-3">
                {skill.category}
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="bg-blue-500 h-3 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <p className="text-sm mb-4">{progress}% completed</p>

              <Link
                to={`/skills/${skill.id}`}
                className="text-blue-600 font-medium hover:underline"
              >
                View Details →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillList;

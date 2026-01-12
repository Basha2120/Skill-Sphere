import React from "react";
import { useParams } from "react-router-dom";
import { useSkills } from "../context/skillContext";

const calculateProgress = (topics) => {
  const completed = topics.filter((t) => t.completed).length;
  return Math.round((completed / topics.length) * 100);
};

const SkillDetail = () => {
  const { id } = useParams();
  const { skills, toggleTopic } = useSkills();

  const skill = skills.find((s) => s.id === id);

  if (!skill) {
    return <p className="text-red-500">Skill not found.</p>;
  }

  const progress = calculateProgress(skill.topics);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-1">{skill.name}</h2>
      <p className="text-gray-500 mb-4">{skill.category}</p>

      {/* Progress */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm mt-2">{progress}% completed</p>
      </div>

      {/* Topics */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Topics</h3>

        <ul className="space-y-3">
          {skill.topics.map((topic) => (
            <li
              key={topic.id}
              className="flex items-center justify-between"
            >
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={topic.completed}
                  onChange={() =>
                    toggleTopic(skill.id, topic.id)
                  }
                  className="w-5 h-5 accent-blue-500"
                />
                <span
                  className={
                    topic.completed
                      ? "line-through text-gray-500"
                      : ""
                  }
                >
                  {topic.name}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SkillDetail;

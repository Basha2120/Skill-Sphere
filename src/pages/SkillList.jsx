import React from "react";
import { Link } from "react-router-dom";
import { useSkills } from "../context/skillContext";

const SkillList = () => {
  const { skills, deleteSkill } = useSkills();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold mb-6">My Skills 📚</h2>

        <Link
          to="/skills/add"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          + Add Skill
        </Link>
      </div>

      {skills.length === 0 ? (
        <p className="text-gray-500">
          No skills added yet. Start by adding one.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-1">{skill.name}</h3>

              <p className="text-sm text-gray-500 mb-2">{skill.category}</p>

              <p className="text-sm mb-4">
                {skill.topics.length} topic
                {skill.topics.length !== 1 && "s"}
              </p>

              {/* Divider */}
              <div className="border-t pt-4 mt-4 flex justify-between items-center">
                {/* Primary action */}
                <Link
                  to={`/skills/${skill.id}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  View Details →
                </Link>

                {/* Secondary actions */}
                <div className="flex items-center gap-4 text-sm">
                  <Link
                    to={`/skills/edit/${skill.id}`}
                    className="text-green-600 font-bold hover:underline"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => {
                      const confirmDelete = window.confirm(
                        `Are you sure you want to delete "${skill.name}"?`
                      );
                      if (confirmDelete) {
                        deleteSkill(skill.id);
                      }
                    }}
                    className="text-red-600 font-bold hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillList;

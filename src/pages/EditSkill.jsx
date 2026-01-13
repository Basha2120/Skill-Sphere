import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSkills } from "../context/skillContext";

const EditSkill = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { skills, editSkill } = useSkills();

  const skill = skills.find((s) => s.id === id);

  const [name, setName] = useState(skill?.name || "");
  const [category, setCategory] = useState(skill?.category || "");

  if (!skill) {
    return <p className="text-red-500">Skill not found.</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !category.trim()) return;

    editSkill(skill.id, name, category);
    navigate("/skills");
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Skill ✏️</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Skill Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate("/skills")}
            className="text-gray-600 hover:underline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSkill;

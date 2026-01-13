import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSkills } from "../context/skillContext";

const AddSkill = () => {
  const { addSkill } = useSkills();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !category.trim()) return;

    addSkill(name, category);
    navigate("/skills");
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Skill ➕</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Skill Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Java"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Programming Language"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add Skill
        </button>
      </form>
    </div>
  );
};

export default AddSkill;

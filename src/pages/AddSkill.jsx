import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSkills } from "../context/skillContext";

const AddSkill = () => {
  const { addSkill } = useSkills();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [topics, setTopics] = useState([{ name: "", completed: false }]);

  const handleTopicNameChange = (index, value) => {
    const newTopics = [...topics];
    newTopics[index].name = value;
    setTopics(newTopics);
  };

  const toggleTopicCompleted = (index) => {
    const newTopics = [...topics];
    newTopics[index].completed = !newTopics[index].completed;
    setTopics(newTopics);
  };

  const addTopicField = () => setTopics([...topics, { name: "", completed: false }]);

  const removeTopicField = (index) => {
    if (topics.length > 1) {
      setTopics(topics.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !category.trim()) return;

    const validTopics = topics.filter(t => t.name.trim() !== "");

    await addSkill(name, category, validTopics);
    navigate("/dashboard");
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

        <div>
          <label className="block mb-2 font-medium">Sub-Topics 📚</label>
          {topics.map((topic, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={topic.completed}
                onChange={() => toggleTopicCompleted(index)}
                className="w-5 h-5 accent-blue-500 cursor-pointer"
              />
              <input
                type="text"
                value={topic.name}
                onChange={(e) => handleTopicNameChange(index, e.target.value)}
                placeholder={`Topic ${index + 1}`}
                className={`flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none ${topic.completed ? "line-through text-gray-400" : ""
                  }`}
              />
              <button
                type="button"
                onClick={() => removeTopicField(index)}
                className="text-red-500 hover:text-red-700 font-bold px-2"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addTopicField}
            className="text-blue-500 hover:text-blue-700 text-sm font-semibold flex items-center gap-1"
          >
            + Add Another Topic
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200"
        >
          Add Skill
        </button>
      </form>
    </div>
  );
};

export default AddSkill;

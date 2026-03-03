import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSkills } from "../context/skillContext";

const EditSkill = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { skills, editSkill } = useSkills();

  const skill = skills.find((s) => s.id.toString() === id);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    if (skill) {
      setName(skill.name);
      setCategory(skill.category);
      setTopics(skill.topics || []);
    }
  }, [skill]);

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
    setTopics(topics.filter((_, i) => i !== index));
    // Implementation note: Backend updateSkill will need to handle deletions.
    // For now, it updates existing and adds new.
  };

  if (!skill) {
    return <p className="text-blue-500 p-6">Loading skill details...</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !category.trim()) return;

    const validTopics = topics.filter(t => t.name.trim() !== "");

    editSkill(skill.id, name, category, validTopics);
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
                className={`flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${topic.completed ? "line-through text-gray-400" : ""
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

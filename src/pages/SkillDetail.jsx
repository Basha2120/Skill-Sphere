import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSkills } from "../context/skillContext";
import { calculateProgress } from "../utils/Progress";

const SkillDetail = () => {
  const { id } = useParams();
  const { skills, toggleTopic, addTopic, editTopic, deleteTopic } = useSkills();

  const skill = skills.find((s) => s.id === id);
  const [newTopic, setNewTopic] = useState("");

  const [editingTopicId, setEditingTopicId] = useState(null);
  const [editedTopicName, setEditedTopicName] = useState("");

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
        <p className="text-sm mt-2">
          {Number.isNaN(progress) ? 0 : progress}% completed
        </p>
      </div>
      {/* Add Topic */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Add Topic</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            placeholder="e.g. Collections Framework"
            className="flex-1 border rounded-lg px-3 py-2"
          />
          <button
            onClick={() => {
              if (!newTopic.trim()) return;
              addTopic(skill.id, newTopic);
              setNewTopic("");
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
      {/* Topics */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Topics</h3>

        <ul className="space-y-3">
          {skill.topics.map((topic) => (
            <li key={topic.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={topic.completed}
                  onChange={() => toggleTopic(skill.id, topic.id)}
                  className="w-5 h-5 accent-blue-500"
                />

                {editingTopicId === topic.id ? (
                  <input
                    type="text"
                    value={editedTopicName}
                    onChange={(e) => setEditedTopicName(e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  />
                ) : (
                  <span
                    className={
                      topic.completed ? "line-through text-gray-500" : ""
                    }
                  >
                    {topic.name}
                  </span>
                )}
              </div>

              <div className="flex gap-3 text-sm">
                {editingTopicId === topic.id ? (
                  <>
                    <button
                      onClick={() => {
                        if (!editedTopicName.trim()) return;
                        editTopic(skill.id, topic.id, editedTopicName);
                        setEditingTopicId(null);
                        setEditedTopicName("");
                      }}
                      className="text-green-600 hover:underline"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => {
                        setEditingTopicId(null);
                        setEditedTopicName("");
                      }}
                      className="text-gray-500 hover:underline"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingTopicId(topic.id);
                        setEditedTopicName(topic.name);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        const confirmDelete = window.confirm(
                          `Delete topic "${topic.name}"?`
                        );
                        if (confirmDelete) {
                          deleteTopic(skill.id, topic.id);
                        }
                      }}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SkillDetail;

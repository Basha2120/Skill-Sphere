import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "./AuthContext";

const SkillContext = createContext();

export const SkillProvider = ({ children }) => {
  const [skills, setSkills] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchSkills();
    } else {
      setSkills([]);
    }
  }, [user]);

  const fetchSkills = async () => {
    try {
      const res = await API.get("/skills");
      setSkills(res.data);
    } catch (err) {
      console.error("Error fetching skills:", err);
    }
  };

  const addSkill = async (name, category, topics = []) => {
    try {
      const res = await API.post("/skills", {
        name,
        category,
        topics: topics.map(t => ({
          name: t.name,
          completed: t.completed
        }))
      });
      setSkills((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding skill:", err);
    }
  };

  const addTopic = async (skillId, topicName) => {
    try {
      const res = await API.post(`/skills/${skillId}/topics`, { name: topicName });
      setSkills((prevSkills) =>
        prevSkills.map((skill) =>
          skill.id === skillId
            ? {
              ...skill,
              topics: [...(skill.topics || []), res.data],
            }
            : skill
        )
      );
    } catch (err) {
      console.error("Error adding topic:", err);
    }
  };

  const editSkill = async (skillId, updatedName, updatedCategory, updatedTopics = null) => {
    try {
      const payload = {
        name: updatedName,
        category: updatedCategory,
      };

      if (updatedTopics) {
        payload.topics = updatedTopics;
      }

      const res = await API.put(`/skills/${skillId}`, payload);
      setSkills((prevSkills) =>
        prevSkills.map((skill) => (skill.id === skillId ? res.data : skill))
      );
    } catch (err) {
      console.error("Error editing skill:", err);
    }
  };

  const deleteSkill = async (skillId) => {
    try {
      await API.delete(`/skills/${skillId}`);
      setSkills((prevSkills) =>
        prevSkills.filter((skill) => skill.id !== skillId)
      );
    } catch (err) {
      console.error("Error deleting skill:", err);
    }
  };

  const editTopic = async (skillId, topicId, updatedName) => {
    try {
      const res = await API.put(`/topics/${topicId}`, {
        name: updatedName,
      });
      setSkills((prevSkills) =>
        prevSkills.map((skill) =>
          skill.id === skillId
            ? {
              ...skill,
              topics: skill.topics.map((topic) =>
                topic.id === topicId ? res.data : topic
              ),
            }
            : skill
        )
      );
    } catch (err) {
      console.error("Error editing topic:", err);
    }
  };

  const deleteTopic = async (skillId, topicId) => {
    try {
      await API.delete(`/topics/${topicId}`);
      setSkills((prevSkills) =>
        prevSkills.map((skill) =>
          skill.id === skillId
            ? {
              ...skill,
              topics: skill.topics.filter((topic) => topic.id !== topicId),
            }
            : skill
        )
      );
    } catch (err) {
      console.error("Error deleting topic:", err);
    }
  };

  const toggleTopic = async (skillId, topicId) => {
    const skill = skills.find((s) => s.id === skillId);
    if (!skill) return;
    const topic = skill.topics.find((t) => t.id === topicId);
    if (!topic) return;

    try {
      const res = await API.put(`/topics/${topicId}`, {
        ...topic,
        completed: !topic.completed,
      });
      setSkills((prevSkills) =>
        prevSkills.map((skill) =>
          skill.id === skillId
            ? {
              ...skill,
              topics: skill.topics.map((topic) =>
                topic.id === topicId ? res.data : topic
              ),
            }
            : skill
        )
      );
    } catch (err) {
      console.error("Error toggling topic:", err);
    }
  };

  return (
    <SkillContext.Provider
      value={{
        skills,
        toggleTopic,
        addSkill,
        addTopic,
        editSkill,
        deleteSkill,
        editTopic,
        deleteTopic,
      }}
    >
      {children}
    </SkillContext.Provider>
  );
};

export const useSkills = () => useContext(SkillContext);


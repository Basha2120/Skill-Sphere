import { createContext, useContext, useEffect, useState } from "react";

const SkillContext = createContext();


export const SkillProvider = ({ children }) => {
  const [skills, setSkills] = useState(() => {
    const stored = localStorage.getItem("skills");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("skills", JSON.stringify(skills));
  }, [skills]);

  const addSkill = (name, category) => {
    const newSkill = {
      id: name.toLowerCase().replaceAll(/\s+/g, "-"),
      name,
      category,
      topics: [],
    };

    setSkills((prev) => [...prev, newSkill]);
  };

  const addTopic = (skillId, topicName) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) =>
        skill.id === skillId
          ? {
              ...skill,
              topics: [
                ...skill.topics,
                {
                  id: Date.now(),
                  name: topicName,
                  completed: false,
                },
              ],
            }
          : skill
      )
    );
  };

  const editSkill = (skillId, updatedName, updatedCategory) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) =>
        skill.id === skillId
          ? {
              ...skill,
              name: updatedName,
              category: updatedCategory,
            }
          : skill
      )
    );
  };

  const deleteSkill = (skillId) => {
    setSkills((prevSkills) =>
      prevSkills.filter((skill) => skill.id !== skillId)
    );
  };

  const editTopic = (skillId, topicId, updatedName) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) =>
        skill.id === skillId
          ? {
              ...skill,
              topics: skill.topics.map((topic) =>
                topic.id === topicId ? { ...topic, name: updatedName } : topic
              ),
            }
          : skill
      )
    );
  };

  const deleteTopic = (skillId, topicId) => {
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
  };

  const toggleTopic = (skillId, topicId) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) =>
        skill.id === skillId
          ? {
              ...skill,
              topics: skill.topics.map((topic) =>
                topic.id === topicId
                  ? { ...topic, completed: !topic.completed }
                  : topic
              ),
            }
          : skill
      )
    );
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

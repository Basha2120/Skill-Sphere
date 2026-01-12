import { createContext, useContext, useEffect, useState } from "react";

const SkillContext = createContext();

const initialSkills = [
  {
    id: "java",
    name: "Java",
    category: "Programming Language",
    topics: [
      { id: 1, name: "Variables & Operators", completed: true },
      { id: 2, name: "Loops", completed: true },
      { id: 3, name: "Conditionals", completed: true },
      { id: 4, name: "Arrays", completed: false },
      { id: 5, name: "OOPS", completed: false },
    ],
  },
];

export const SkillProvider = ({ children }) => {
  const [skills, setSkills] = useState(() => {
    const stored = localStorage.getItem("skills");
    return stored ? JSON.parse(stored) : initialSkills;
  });

  useEffect(() => {
    localStorage.setItem("skills", JSON.stringify(skills));
  }, [skills]);

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
    <SkillContext.Provider value={{ skills, toggleTopic }}>
      {children}
    </SkillContext.Provider>
  );
};

export const useSkills = () => useContext(SkillContext);

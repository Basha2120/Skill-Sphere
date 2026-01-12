import { createContext, useContext, useState } from "react";

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
  const [skills, setSkills] = useState(initialSkills);

  return (
    <SkillContext.Provider value={{ skills }}>
      {children}
    </SkillContext.Provider>
  );
};

export const useSkills = () => useContext(SkillContext);

import React from "react";
import SkillCard from "../components/skillCard";
import skillsData from "../utils/skillsData";


const DashBoard = () => {
    return(
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Learning DashBoard 📊
            </h2>
            <div className="grid grid-cols-1 gap-6">
                {skillsData.map((skill) => (
                    <SkillCard key={skill.id} skill={skill} />
                ))}
            </div>
        </div>
        
    );
};

export default DashBoard;
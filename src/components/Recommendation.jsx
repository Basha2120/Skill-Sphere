import React from "react";

const Recommendation = ({ skills }) => {
  const getRecommendations = () => {
    const recommendations = [];

    skills.forEach((skill) => {
      if (skill.name === "React" && skill.progress >= 50) {
        recommendations.push("Start learning Next.js for advanced React apps");
      }

      if (skill.name === "Java" && skill.progress >= 60) {
        recommendations.push("Move to Spring Boot for backend development");
      }

      if (skill.name === "SQL" && skill.progress >= 60) {
        recommendations.push("Practice complex joins and query optimization");
      }
    });

    return recommendations;
  };

  const recommendations = getRecommendations();

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-10">
      <h3 className="text-xl font-semibold mb-4">
        Recommended Next Steps 🤖
      </h3>

      {recommendations.length === 0 ? (
        <p className="text-gray-500">
          Keep learning! Recommendations will appear as you progress.
        </p>
      ) : (
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Recommendation;

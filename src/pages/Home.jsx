import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="max-w-5xl mx-auto text-center py-16">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to <span className="text-blue-600">SkillSphere</span>
      </h1>

      <p className="text-lg text-gray-700 mb-8">
        A smart platform to track your skills, plan daily learning,
        and visualize progress — all in one place.
      </p>

      {/* CTA Buttons */}
      <div className="flex justify-center gap-6 mb-12">
        <Link
          to="/dashboard"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          View Dashboard
        </Link>

        <Link
          to="/skills"
          className="border border-blue-500 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50"
        >
          Manage Skills
        </Link>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-2">📊 Skill Tracking</h3>
          <p className="text-gray-600 text-sm">
            Track progress dynamically based on topic completion.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-2">🗂 Task Planner</h3>
          <p className="text-gray-600 text-sm">
            Plan tasks by date and focus on what matters today.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-2">📈 Insights</h3>
          <p className="text-gray-600 text-sm">
            Get a clear overview of learning progress across categories.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

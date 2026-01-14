import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-gray-900 text-white px-6 py-4 relative z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-3xl font-bold">Skill Sphere</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6">
            <Link to="/" className="hover:text-blue-400">Home</Link>
            <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
            <Link to="/skills" className="hover:text-blue-400">Skills</Link>
            <Link to="/planner" className="hover:text-blue-400">Planner</Link>
            <Link to="/profile" className="hover:text-blue-400">Profile</Link>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setIsOpen(true)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SLIDE-IN DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            className="text-2xl hover:text-blue-400"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-6 px-6 py-8 text-lg">
          <Link onClick={() => setIsOpen(false)} to="/" className="hover:text-blue-400">Home</Link>
          <Link onClick={() => setIsOpen(false)} to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
          <Link onClick={() => setIsOpen(false)} to="/skills" className="hover:text-blue-400">Skills</Link>
          <Link onClick={() => setIsOpen(false)} to="/planner" className="hover:text-blue-400">Planner</Link>
          <Link onClick={() => setIsOpen(false)} to="/profile" className="hover:text-blue-400">Profile</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;

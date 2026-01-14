import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-3xl font-bold">Skill Sphere</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-blue-400">
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-blue-400">
            Dashboard
          </Link>
          <Link to="/skills" className="hover:text-blue-400">
            Skills
          </Link>
          <Link to="/planner" className="hover:text-blue-400">
            Planner
          </Link>
          <Link to="/profile" className="hover:text-blue-400">
            Profile
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 px-6 pb-4 flex flex-col gap-4">
          <Link onClick={() => setIsOpen(false)} to="/">
            Home
          </Link>
          <Link onClick={() => setIsOpen(false)} to="/dashboard">
            Dashboard
          </Link>
          <Link onClick={() => setIsOpen(false)} to="/skills">
            Skills
          </Link>
          <Link onClick={() => setIsOpen(false)} to="/planner">
            Planner
          </Link>
          <Link onClick={() => setIsOpen(false)} to="/profile">
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

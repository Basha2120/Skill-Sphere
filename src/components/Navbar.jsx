import React from "react";
import {Link} from "react-router-dom";

const Navbar=() => {
    return(
        <nav className="bg-gray-900 text-white flex justify-between items-center px-6 py-6">
            <h1 className="text-3xl font-bold">Skill Sphere</h1>
            <div className="flex gap-6">
                <Link to="/" className="hover:text-blue-400">Home</Link>
                <Link to="/dashboard" className="hover:text-blue-400">DashBoard</Link>
                <Link to="/profile" className="hover:text-blue-400">Profile</Link>
            </div>
        </nav>
    );
};

export default Navbar;

import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout= () => {
    return(
        <div className="min-h-screen flex flex-col">
            <Navbar />
        <main className="flex-grow p-6 bg-gradient-to-b from-gray-100 to-blue-200">
            <Outlet />
        </main>
        <Footer />
        </div>
    );
};

export default MainLayout;

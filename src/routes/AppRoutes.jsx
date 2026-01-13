import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import DashBoard from "../pages/DashBoard";
import SkillList from "../pages/skillList";
import SkillDetail from "../pages/SkillDetail";
import AddSkill from "../pages/AddSkill";
import EditSkill from "../pages/EditSkill";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/profile", element: <Profile /> },
      { path: "/dashboard", element: <DashBoard /> },
      { path: "/skills", element: <SkillList /> },
      { path: "/skills/:id", element: <SkillDetail /> },
      { path: "/skills/add", element: <AddSkill /> },
      { path: "/skills/edit/:id", element: <EditSkill /> },
      // Add future routes here like Dashboard, Profile, etc.
    ],
  },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;

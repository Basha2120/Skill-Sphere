import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import DashBoard from "../pages/DashBoard";
import SkillList from "../pages/SkillList";
import SkillDetail from "../pages/SkillDetail";
import AddSkill from "../pages/AddSkill";
import EditSkill from "../pages/EditSkill";
import Planner from "../pages/Planner";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/skills",
        element: (
          <ProtectedRoute>
            <SkillList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/skills/:id",
        element: (
          <ProtectedRoute>
            <SkillDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "/skills/add",
        element: (
          <ProtectedRoute>
            <AddSkill />
          </ProtectedRoute>
        ),
      },
      {
        path: "/skills/edit/:id",
        element: (
          <ProtectedRoute>
            <EditSkill />
          </ProtectedRoute>
        ),
      },
      {
        path: "/planner",
        element: (
          <ProtectedRoute>
            <Planner />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;


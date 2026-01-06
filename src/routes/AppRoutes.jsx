import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import DashBoard from "../pages/DashBoard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/profile", element: <Profile /> },
      { path: "/dashboard", element: <DashBoard /> },
      // Add future routes here like Dashboard, Profile, etc.
    ],
  },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;

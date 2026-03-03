import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SkillProvider } from "./context/skillContext";
import { TaskProvider } from "./context/TaskContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SkillProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </SkillProvider>
    </AuthProvider>
  </React.StrictMode>
);


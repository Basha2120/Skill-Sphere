import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SkillProvider } from "./context/skillContext";
import { TaskProvider } from "./context/TaskContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SkillProvider>
      <TaskProvider>
      <App />
      </TaskProvider>
    </SkillProvider>
  </React.StrictMode>
);

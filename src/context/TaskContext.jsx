import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

// Helper to get today's date in YYYY-MM-DD
const getToday = () => {
  return new Date().toISOString().split("T")[0];
};



export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  // Persist tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  

  // ➕ Add task
  const addTask = (title, date) => {
    const newTask = {
      id: Date.now(),
      title,
      date,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  // ✏️ Edit task (title or date)
  const editTask = (taskId, updatedTitle, updatedDate) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              title: updatedTitle,
              date: updatedDate,
            }
          : task
      )
    );
  };

  // ✔ Toggle completion
  const toggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // 🗑 Delete task
  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        editTask,
        toggleTask,
        deleteTask,
        getToday, // exposed for reuse
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);

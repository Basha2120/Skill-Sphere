import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "./AuthContext";

const TaskContext = createContext();

const getToday = () => {
  return new Date().toISOString().split("T")[0];
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const addTask = async (title, date) => {
    try {
      const res = await API.post("/tasks", { title, date, completed: false });
      setTasks((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const editTask = async (taskId, updatedTitle, updatedDate) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    try {
      const res = await API.put(`/tasks/${taskId}`, {
        ...task,
        title: updatedTitle,
        date: updatedDate,
      });
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? res.data : t))
      );
    } catch (err) {
      console.error("Error editing task:", err);
    }
  };

  const toggleTask = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    try {
      const res = await API.put(`/tasks/${taskId}`, {
        ...task,
        completed: !task.completed,
      });
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? res.data : t))
      );
    } catch (err) {
      console.error("Error toggling task:", err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        editTask,
        toggleTask,
        deleteTask,
        getToday,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);


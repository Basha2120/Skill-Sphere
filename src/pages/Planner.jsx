import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";

const Planner = () => {
  const { tasks, addTask, toggleTask, deleteTask, editTask, getToday } =
    useTasks();

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const isOverdue = (task) => {
    return task.date < today && !task.completed;
  };

  const today = getToday();

  const todaysTasks = tasks.filter((task) => task.date === today);

  // Form state
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(today);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

    addTask(title, date);
    setTitle("");
    setDate(today);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Task Planner 🗂️</h2>

      {/* ================= TODAY'S TASKS ================= */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Today’s Tasks 📌</h3>

        {todaysTasks.length === 0 ? (
          <p className="text-gray-500">No tasks scheduled for today.</p>
        ) : (
          <div className="space-y-3">
            {todaysTasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center bg-blue-200 p-4 rounded-lg shadow"
              >
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="w-5 h-5 accent-blue-500"
                  />
                  <span
                    className={
                      task.completed ? "line-through text-gray-500" : ""
                    }
                  >
                    {task.title}
                  </span>
                </label>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-1xl text-red-600 font-bold hover:text-red-900 text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= ADD TASK ================= */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Add New Task ➕</h3>

        <form
          onSubmit={handleAddTask}
          className="flex flex-col sm:flex-row gap-4"
        >
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </form>
      </section>

      {/* ================= ALL TASKS ================= */}
      <section>
        <h3 className="text-xl font-semibold mb-4">All Tasks 📋</h3>

        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks created yet.</p>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center bg-white p-4 rounded-lg shadow"
              >
                <div>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-5 h-5 accent-blue-500"
                    />

                    {editingTaskId === task.id ? (
                      <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                      />
                    ) : (
                      <span
                        className={
                          task.completed
                            ? "line-through text-gray-500"
                            : isOverdue(task)
                            ? "text-red-600 font-medium"
                            : ""
                        }
                      >
                        {task.title}
                      </span>
                    )}

                    {isOverdue(task) && editingTaskId !== task.id && (
                      <span className="text-1xl text-red-500 ml-3 font-bold ">
                        ⚠ Overdue
                      </span>
                    )}
                  </label>

                  <p className="text-xs text-gray-500 ml-8">📅 {task.date}</p>
                </div>

                {editingTaskId === task.id ? (
                  <div>
                    <button
                      onClick={() => {
                        if (!editedTitle.trim()) return;
                        editTask(task.id, editedTitle, task.date);
                        setEditingTaskId(null);
                        setEditedTitle("");
                      }}
                      className="text-green-600 hover:underline"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => {
                        setEditingTaskId(null);
                        setEditedTitle("");
                      }}
                      className="text-gray-500 hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => {
                        setEditingTaskId(task.id);
                        setEditedTitle(task.title);
                      }}
                      className="text-green-600 font-bold hover:underline p-4"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-600 font-bold hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Planner;

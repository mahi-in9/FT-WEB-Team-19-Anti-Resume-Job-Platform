import React, { useState, useEffect } from "react";
import useLocalData from "../../hooks/useLocalData";

/**
 * Small tasks panel (to-do) for candidate to manage small tasks.
 */

export default function TasksPanel() {
  const { data, save } = useLocalData("candidate_tasks", [
    { id: "t1", text: "Complete 'Build a Todo App' challenge", done: false },
    { id: "t2", text: "Update portfolio link", done: false },
  ]);

  const [tasks, setTasks] = useState(data || []);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    setTasks(data || []);
  }, [data]);

  function toggle(id) {
    const next = tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
    setTasks(next);
    save(next);
  }

  function add() {
    if (!newTask.trim()) return;
    const t = { id: `t${Date.now()}`, text: newTask.trim(), done: false };
    const next = [t, ...tasks];
    setTasks(next);
    save(next);
    setNewTask("");
  }

  function remove(id) {
    const next = tasks.filter((t) => t.id !== id);
    setTasks(next);
    save(next);
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h4 className="text-lg font-semibold mb-3">Tasks</h4>

      <div className="flex gap-2">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task..."
          className="flex-1 border px-3 py-2 rounded-md"
        />
        <button
          onClick={add}
          className="px-3 py-2 bg-indigo-600 text-white rounded-md"
        >
          Add
        </button>
      </div>

      <ul className="mt-4 space-y-3">
        {tasks.map((t) => (
          <li key={t.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggle(t.id)}
                className="w-4 h-4"
              />
              <span className={`${t.done ? "line-through text-gray-400" : ""}`}>
                {t.text}
              </span>
            </div>
            <button
              onClick={() => remove(t.id)}
              className="text-sm text-red-500"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

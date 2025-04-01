"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client using client-exposed environment variables.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DashboardTasksCreate() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Create Task form fields
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [createError, setCreateError] = useState("");

  // Search and Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Fetch tasks for the logged-in user
  const fetchTasks = async () => {
    setLoading(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", session.user.id);

    if (error) {
      setError(error.message);
    } else {
      setTasks(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Update a task in Supabase
  const updateTask = async (
    id: string,
    updatedData: Partial<{ title: string; description: string; status: string }>
  ) => {
    const { error } = await supabase
      .from("tasks")
      .update(updatedData)
      .eq("id", id);
    if (error) {
      setError(error.message);
    } else {
      fetchTasks();
    }
  };

  // Delete a task in Supabase
  const deleteTask = async (id: string) => {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);
    if (error) {
      setError(error.message);
    } else {
      fetchTasks();
    }
  };

  // Create a new task in Supabase
  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setCreateError("User not logged in.");
      return;
    }

    const userId = session.user.id;

    const { error } = await supabase.from("tasks").insert([
      {
        user_id: userId,
        title: newTaskTitle,
        description: newTaskDescription,
        status: "Pending",
      },
    ]);
    if (error) {
      setCreateError(error.message);
    } else {
      setNewTaskTitle("");
      setNewTaskDescription("");
      setCreateError("");
      setShowCreateForm(false);
      fetchTasks();
    }
  };

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const pendingTasks = tasks.filter((t) => t.status === "Pending").length;
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress").length;

  // Filter tasks based on search and status filter
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" ? true : task.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen p-4 bg-white text-black dark:bg-gray-900 dark:text-white">
      {/* Dashboard Stats */}
      <h1 className="text-3xl font-bold mb-4">📊 Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Tasks" value={totalTasks.toString()} />
        <StatCard title="Completed" value={completedTasks.toString()} />
        <StatCard title="Pending" value={pendingTasks.toString()} />
        <StatCard title="In Progress" value={inProgressTasks.toString()} />
      </div>

      {/* Toggle Create Task Form */}
      <div className="mb-6">
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-4 py-2 bg-blue-500 rounded text-white"
        >
          {showCreateForm ? "Close Create Task" : "Create New Task"}
        </button>
      </div>
      {showCreateForm && (
        <div className="mb-8 bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">➕ Create Task</h2>
          <form onSubmit={createTask} className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Task Title"
              className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white border"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <textarea
              placeholder="Task Description"
              className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white border"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
            />
            {createError && <p className="text-red-400">{createError}</p>}
            <button type="submit" className="px-4 py-2 bg-green-500 rounded text-white">
              Create Task
            </button>
          </form>
        </div>
      )}

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          className="p-2 rounded border-gray-700 bg-gray-100 text-black dark:bg-gray-700 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 rounded border-gray-700 bg-gray-100 text-black dark:bg-gray-700 dark:text-white"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>


      {/* Tasks List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={updateTask}
                onDelete={deleteTask}
              />
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No tasks found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow">
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

type Task = {
  id: string;
  title: string;
  description?: string;
  status?: string;
};

type TaskItemProps = {
  task: Task;
  onUpdate: (id: string, updatedData: Partial<Task>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

const TaskItem = ({ task, onUpdate, onDelete }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description || "");

  const statusOptions = ["Pending", "In Progress", "Completed"];

  const handleSave = async () => {
    if (newTitle.trim() === "") return;
    await onUpdate(task.id, {
      title: newTitle.trim(),
      description: newDescription.trim(),
    });
    setIsEditing(false);
  };

  return (
    <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow">
      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white border w-full mb-2"
            placeholder="Task Title"
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white border w-full mb-2"
            placeholder="Task Description"
          />
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 rounded text-white mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-red-500 rounded text-white"
          >
            Cancel
          </button>
        </>
      ) : (
        <div className="flex justify-between items-start">
          {/* Left Column: Title, Description, Edit button */}
          <div>
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-black dark:text-gray-300 mb-2">
              Description: {task.description || "No description"}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-500 rounded text-white"
            >
              Edit
            </button>
          </div>
          {/* Right Column: Status dropdown & Delete button */}
          <div className="flex flex-col items-end gap-2">
            <select
              value={task.status || "Pending"}
              onChange={(e) =>
                onUpdate(task.id, { status: e.target.value })
              }
              className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              onClick={() => onDelete(task.id)}
              className="px-4 py-2 bg-red-500 rounded text-white"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

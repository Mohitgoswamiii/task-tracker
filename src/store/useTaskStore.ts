import create from "zustand";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

interface TaskStore {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, "id">) => Promise<void>;
  toggleComplete: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  fetchTasks: async () => {
    // Retrieve current user session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", session.user.id);
    if (!error && data) {
      set({ tasks: data });
    }
  },
  addTask: async (task) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { error } = await supabase.from("tasks").insert([
      {
        ...task,
        user_id: session.user.id,
      },
    ]);
    if (!error) {
      get().fetchTasks();
    }
  },
  toggleComplete: async (id) => {
    const task = get().tasks.find((t) => t.id === id);
    if (!task) return;

    const { error } = await supabase
      .from("tasks")
      .update({ completed: !task.completed })
      .eq("id", id);
    if (!error) {
      get().fetchTasks();
    }
  },
  deleteTask: async (id) => {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);
    if (!error) {
      get().fetchTasks();
    }
  },
}));

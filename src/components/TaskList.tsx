import { useTaskStore } from "../store/useTaskStore";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const { tasks } = useTaskStore();

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">Task Tracker</h1>
      <ul className="mt-4">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

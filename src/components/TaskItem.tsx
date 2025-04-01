import { Task, useTaskStore } from "../store/useTaskStore";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleComplete, deleteTask } = useTaskStore();

  return (
    <li className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md my-2">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          className="cursor-pointer"
        />
        <span className={task.completed ? "line-through text-gray-400" : ""}>
          {task.title}
        </span>
      </div>
      <button onClick={() => deleteTask(task.id)} className="text-red-500">
        ❌
      </button>
    </li>
  );
};

export default TaskItem;

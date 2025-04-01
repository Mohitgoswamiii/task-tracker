// import { useState } from "react";
// import { useTaskStore } from "../store/useTaskStore";

// const AddTask = () => {
//   const { addTask } = useTaskStore();
//   const [title, setTitle] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title.trim()) return; 

//     addTask({
//       id: crypto.randomUUID(),
//       title: title.trim(),  
//       completed: false,
//       priority: "Low",       
//     });
//     setTitle("");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex gap-2 p-4">
//       <input
//         type="text"
//         placeholder="New Task"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//       />
//       <button
//         type="submit"
//         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//       >
//         Add
//       </button>
//     </form>
//   );
// };

// export default AddTask;

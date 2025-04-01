// src/app/page.tsx

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-5xl font-bold">🚀 Welcome to Task Tracker</h1>
        <p className="text-lg text-gray-300 mt-3">
          Manage your tasks efficiently with ease.
        </p>
      </div>

      {/* Task Tracker Dashboard */}
      <div className="glass w-72 h-72 flex items-center justify-center rounded-full border border-gray-200 relative mt-8">
        <div className="w-16 h-16 bg-blue-500 rounded-full"></div>
        <span className="absolute top-4 text-sm">🔵 Task 1</span>
        <span className="absolute bottom-4 text-sm">🟢 Task 2</span>
        <span className="absolute left-4 text-sm">🟠 Task 3</span>
        <span className="absolute right-4 text-sm">🔴 Task 4</span>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 space-x-4">
        <a
          href="/dashboard"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg rounded-lg shadow hover:scale-105 transition"
        >
          View Tasks 📝
        </a>
        <a
          href="/signin"
          className="px-6 py-3 bg-gray-700 text-white text-lg rounded-lg shadow hover:scale-105 transition"
        >
          Sign In 🔑
        </a>
        <a
          href="/signup"
          className="px-6 py-3 bg-gray-700 text-white text-lg rounded-lg shadow hover:scale-105 transition"
        >
          Sign Up ✍️
        </a>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
        <FeatureCard title="Task Management" icon="📝" desc="Track and manage your tasks efficiently." />
        <FeatureCard title="Task Categorization" icon="⚙️" desc="Group tasks into categories for better organization." />
        <FeatureCard title="Search & Filter" icon="🔍" desc="Easily find tasks with advanced filtering." />
      </div>
    </div>
  );
}

// Feature Card Component
const FeatureCard = ({ title, icon, desc }: { title: string; icon: string; desc: string }) => {
  return (
    <div className="glass p-6 w-64 rounded-lg flex flex-col items-center text-center shadow-lg">
      <span className="text-4xl">{icon}</span>
      <h2 className="text-xl font-semibold mt-2">{title}</h2>
      <p className="text-gray-300 text-sm mt-1">{desc}</p>
    </div>
  );
};

"use client";
import { useState, useEffect } from "react";

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // On mount, load the user's preference from localStorage.
  useEffect(() => {
    const darkModeSetting = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(darkModeSetting);
    if (darkModeSetting) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle dark mode and persist the preference.
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode.toString());
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">⚙️ Settings</h1>
      <p className="text-gray-300">Adjust your preferences.</p>
      <div className="mt-6">
        <label className="flex items-center">
          <span className="mr-2">Dark Mode:</span>
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleDarkMode}
            className="ml-2"
          />
        </label>
      </div>
    </div>
  );
}

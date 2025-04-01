"use client";

import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Account created successfully!");
      
      setTimeout(() => router.push("/signin"), 1500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">Sign Up</h1>
      <p className="text-gray-300 mt-2">Create your task tracker account</p>
      <form
        onSubmit={handleSubmit}
        className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg w-80"
      >
        <label className="block text-gray-300">Full Name:</label>
        <input
          type="text"
          className="w-full p-2 mt-1 rounded bg-gray-700 text-white"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <label className="block text-gray-300 mt-4">Email:</label>
        <input
          type="email"
          className="w-full p-2 mt-1 rounded bg-gray-700 text-white"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="block text-gray-300 mt-4">Password:</label>
        <input
          type="password"
          className="w-full p-2 mt-1 rounded bg-gray-700 text-white"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-400 mt-2">{error}</p>}
        {success && <p className="text-green-400 mt-2">{success}</p>}
        <button className="w-full bg-green-500 hover:bg-green-600 p-2 mt-4 rounded text-white">
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-gray-400">
        Already have an account?{" "}
        <a href="/signin" className="text-blue-400 hover:underline">
          Sign In
        </a>
      </p>
    </div>
  );
}

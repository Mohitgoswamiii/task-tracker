"use client";

import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">Sign In</h1>
      <p className="text-gray-300 mt-2">Access your task tracker account</p>
      <form onSubmit={handleSubmit} className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        <label className="block text-gray-300">Email:</label>
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
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-400 mt-2">{error}</p>}
        <button className="w-full bg-blue-500 hover:bg-blue-600 p-2 mt-4 rounded text-white">
          Sign In
        </button>
      </form>
      <p className="mt-4 text-gray-400">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="text-blue-400 hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  );
}

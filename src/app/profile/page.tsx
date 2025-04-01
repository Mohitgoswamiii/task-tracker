"use client";

import { createClient, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
      } else {
        setUser(user);
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user)
    return (
      <p className="text-red-500">
        No user logged in. Please sign in to view your profile.
      </p>
    );

  return (
    <div>
      <h1 className="text-3xl font-bold">👤 Profile</h1>
      <p className="text-gray-300">Manage your account details.</p>

      <div className="mt-6">
        <p>
          <strong>Name:</strong>{" "}
          {user.user_metadata?.full_name || user.email}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Joined:</strong>{" "}
          {user.created_at
            ? new Date(user.created_at).toLocaleDateString()
            : "N/A"}
        </p>
      </div>
    </div>
  );
}

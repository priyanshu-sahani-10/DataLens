"use client";

import { useEffect, useState } from "react";

import api from "@/lib/api";
import { removeToken } from "@/lib/auth";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/auth/me");

        setUser(response.data);
      } catch (error) {
        removeToken();

        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    removeToken();

    router.push("/login");
  };

  if (!user) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-4">
        Dashboard
      </h1>

      <p className="mb-2">
        Name: {user.fullName}
      </p>

      <p className="mb-6">
        Email: {user.email}
      </p>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}
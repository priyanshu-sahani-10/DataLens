"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Navbar } from "../navbar";

import api from "@/lib/api";

export default function SignupForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/auth/signup", formData);
      toast.success("Account created successfully");
      router.push("/login");
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.detail || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 40% at 50% 30%, rgba(8,145,178,0.1) 0%, transparent 70%)",
        }}
      />
      <Navbar showLinks={false}/>
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white border border-slate-200 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h1 className="font-display text-3xl font-bold mb-6 text-center text-slate-900">Create Account</h1>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 p-3 rounded-lg mb-4 focus:outline-none focus:border-cyan-500"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 p-3 rounded-lg mb-4 focus:outline-none focus:border-cyan-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 p-3 rounded-lg mb-6 focus:outline-none focus:border-cyan-500"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-600 text-white font-semibold p-3 rounded-lg hover:bg-cyan-700 transition shadow-[0_4px_20px_rgba(8,145,178,0.3)] disabled:opacity-50"
        >
          {loading ? "Creating..." : "Signup"}
        </button>
      </form>
    </div>
  );
}

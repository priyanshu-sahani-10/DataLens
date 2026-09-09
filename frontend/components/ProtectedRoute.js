"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

export default function ProtectedRoute({
  children,
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(
      "access_token"
    );

    if (!token) {
      toast.error(
        "Please login to access this page"
      );

      router.replace("/login");
    }
  }, []);

  return children;
}
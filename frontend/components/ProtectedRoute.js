"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import api from "@/lib/api";
import { removeToken } from "@/lib/auth";

export default function ProtectedRoute({
  children,
}) {
  const router = useRouter();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem(
        "access_token"
      );

      if (!token) {
        toast.error(
          "Please login to access this page"
        );

        router.replace("/login");
        return;
      }

      try {
        await api.get("/auth/me");
        setVerified(true);
      } catch {
        removeToken();
        toast.error("Session expired. Please login again");
        router.replace("/login");
      }
    };

    verify();
  }, [router]);

  if (!verified) {
    return <div className="p-10">Verifying session...</div>;
  }

  return children;
}
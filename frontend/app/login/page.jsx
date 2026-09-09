"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import LoginForm from "@/components/auth/LoginForm";
import { getToken } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (token) {
      router.replace("/");
    }
  }, []);

  return <LoginForm />;
}
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import SignupForm from "@/components/auth/SignupForm";
import { getToken } from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (token) {
      router.replace("/");
    }
  }, []);

  return <SignupForm />;
}
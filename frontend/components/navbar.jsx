"use client";

import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export function Navbar({
  showLinks = true,
  showAuthButtons = true,
  showLogin = true,
  showSignup = true,
  showLogout = true,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");

    toast.success("Logged out successfully");

    setIsLoggedIn(false);

    router.push("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 px-[5%] flex items-center justify-between bg-black/90 backdrop-blur-xl border-b border-white/[0.06]">
      {/* Logo */}
      <a href="/" className="flex items-center gap-2.5 no-underline">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="8" width="2.5" height="7" rx="0.8" fill="black" />
            <rect
              x="5"
              y="5"
              width="2.5"
              height="10"
              rx="0.8"
              fill="black"
              opacity="0.7"
            />
            <rect
              x="9"
              y="2"
              width="2.5"
              height="13"
              rx="0.8"
              fill="black"
              opacity="0.5"
            />
            <circle cx="14" cy="1.5" r="1.5" fill="black" opacity="0.9" />
          </svg>
        </div>

        <span
          className="text-white font-black text-xl tracking-tight"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          DataLens
        </span>
      </a>

      {/* Links */}
      {showLinks && (
        <ul className="hidden md:flex items-center gap-8 list-none">
          {[
            { name: "Features", id: "feature" },
            { name: "How It Works", id: "how" },
            { name: "Pricing", id: "pricing" },
            { name: "Customers", id: "customer" },
          ].map((item) => (
            <li key={item.name}>
              <a
                href={`#${item.id}`}
                className="text-sm text-white/40 hover:text-white transition-colors no-underline"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* Actions */}
      {showAuthButtons && (
        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              {showLogin && (
                <Button
                  variant="ghost"
                  onClick={() => router.push("/login")}
                  className="text-white/40 hover:text-white hover:bg-white/5 border border-white/[0.08] text-sm h-9"
                >
                  Login
                </Button>
              )}

              {showSignup && (
                <Button
                  onClick={() => router.push("/signup")}
                  className="bg-white text-black hover:bg-white/85 font-medium text-sm h-9 px-5"
                >
                  Signup
                </Button>
              )}
            </>
          ) : (
            <>
              {showLogout && (
                <Button
                  onClick={handleLogout}
                  className="text-white font-medium text-sm h-9 px-5"
                >
                  Logout
                </Button>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  );
}
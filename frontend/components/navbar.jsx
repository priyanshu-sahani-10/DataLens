"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
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
    // Sync auth badge on navigation; localStorage has no reactive API.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoggedIn(!!localStorage.getItem("access_token"));
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");

    toast.success("Logged out successfully");

    setIsLoggedIn(false);

    router.push("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 px-[5%] flex items-center justify-between bg-white/85 backdrop-blur-xl border-b border-slate-200">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 no-underline">
        <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-[0_4px_16px_rgba(8,145,178,0.35)]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="8" width="2.5" height="7" rx="0.8" fill="white" />
            <rect
              x="5"
              y="5"
              width="2.5"
              height="10"
              rx="0.8"
              fill="white"
              opacity="0.7"
            />
            <rect
              x="9"
              y="2"
              width="2.5"
              height="13"
              rx="0.8"
              fill="white"
              opacity="0.5"
            />
            <circle cx="14" cy="1.5" r="1.5" fill="white" opacity="0.9" />
          </svg>
        </div>

        <span
          className="text-slate-900 font-display font-bold text-xl tracking-tight"
        >
          DataLens
        </span>
      </Link>

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
                className="text-sm text-slate-600 hover:text-cyan-700 transition-colors no-underline"
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
                  className="text-slate-600 hover:text-cyan-700 hover:bg-cyan-50 border border-slate-200 text-sm h-9"
                >
                  Login
                </Button>
              )}

              {showSignup && (
                <Button
                  onClick={() => router.push("/signup")}
                  className="bg-cyan-600 text-white hover:bg-cyan-700 font-semibold text-sm h-9 px-5 shadow-[0_4px_16px_rgba(8,145,178,0.35)]"
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
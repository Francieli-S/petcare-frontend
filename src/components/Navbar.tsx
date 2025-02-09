"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full bg-[var(--color-white)] shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="logo font-bold text-2xl text-[var(--color-primary)]">
          <Link href="/" className="no-underline">
            PetCare
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 items-center">
          <li>
            <Link
              href="/"
              className="text-gray-700 no-underline hover:text-[var(--color-accent)] transition-colors hover:scale-105 transform"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/sitters"
              className="text-gray-700 no-underline hover:text-[var(--color-accent)] transition-colors hover:scale-105 transform"
            >
              Find a Sitter
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link
                  href="/profile"
                  className="text-gray-700 no-underline hover:text-[var(--color-accent)] transition-colors hover:scale-105 transform"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="text-gray-700 no-underline hover:text-[var(--color-accent)] transition-colors hover:scale-105 transform"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/auth/signin"
                  className="text-gray-700 no-underline hover:text-[var(--color-accent)] transition-colors hover:scale-105 transform"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/signup"
                  className="text-gray-700 no-underline hover:text-[var(--color-accent)] transition-colors hover:scale-105 transform"
                >
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}


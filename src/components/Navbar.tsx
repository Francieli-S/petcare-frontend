"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/">PetCare</Link>
      </div>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/sitters">Find a Sitter</Link></li>

        {user ? (
          <>
            <li><Link href="/profile">My Profile</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link href="/auth/signin">Sign in</Link></li>
            <li><Link href="/auth/signup">Sign up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

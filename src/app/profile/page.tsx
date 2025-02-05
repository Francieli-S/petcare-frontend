"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading...</p>;
  }

  if (!user) return null;

  return (
    <main className="max-w-3xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.firstName}!</h1>
      <p className="text-gray-700">Email: {user.email}</p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Your Dashboard</h2>
        <ul className="mt-4 list-disc pl-5 space-y-2">
          {/* {!user.isSitter ? ( */}
            <>
              <li>📅 <a href="/bookings" className="text-blue-600">My Bookings</a></li>
              <li>🐶 <a href="/pets" className="text-blue-600">My Pets</a></li>
              <li>❤️ <a href="/favorites" className="text-blue-600">My Favorite Sitters</a></li>
            </>
          {/* ) : ( */}
            <>
              <li>📅 <a href="/bookings" className="text-blue-600">My Bookings</a></li>
              <li>🐾 <a href="/clients" className="text-blue-600">My Clients</a></li>
              <li>⭐ <a href="/reviews" className="text-blue-600">My Reviews</a></li>
              <li>📝 <a href="/sitter-bio" className="text-blue-600">My Bio</a></li>
            </>
          {/* )} */}
        </ul>
      </section>
    </main>
  );
}

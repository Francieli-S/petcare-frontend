"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SitterForm from "../../components/SitterForm";
import { useSitter } from "@/context/SitterContext";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const { isSitter, sitterData, refreshSitterStatus } = useSitter();
  const router = useRouter();
  const [showSitterForm, setShowSitterForm] = useState(false);

  console.log("IS SITTER: ", isSitter);
  console.log("SITTER DATA: ", sitterData);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login"); // Redirect to login if user is not authenticated
    }
  }, [user, loading, router, isSitter, sitterData]);

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg text-[var(--color-primary)]">
        Loading...
      </p>
    );
  }

  if (!user) return null;

  return (
    <main className="container mt-10">
      {/* Profile Card */}
      <div className="card">
        <h1 className="text-3xl font-bold">Welcome, {user.firstName}!</h1>

        {/* User Dashboard */}
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Your Dashboard</h2>
          <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700">
            <li>
              📅{" "}
              <a href="/bookings" className="hover:text-[var(--color-accent)]">
                My Bookings
              </a>
            </li>
            <li>
              🐶{" "}
              <a href="/pets" className="hover:text-[var(--color-accent)]">
                My Pets
              </a>
            </li>
            <li>
              ❤️{" "}
              <a href="/favorites" className="hover:text-[var(--color-accent)]">
                My Favorite Sitters
              </a>
            </li>
          </ul>
        </section>

        {/* Sitter Dashboard (Visible only for sitters) */}
        {isSitter && (
          <section className="mt-6">
            <h2 className="text-xl font-semibold">Sitter Dashboard</h2>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700">
              <li>
                🐾{" "}
                <a href="/clients" className="hover:text-[var(--color-accent)]">
                  My Clients
                </a>
              </li>
              <li>
                ⭐{" "}
                <a href="/reviews" className="hover:text-[var(--color-accent)]">
                  My Reviews
                </a>
              </li>
              <li>
                📝{" "}
                <a
                  href="/sitter-bio"
                  className="hover:text-[var(--color-accent)]"
                >
                  My Bio
                </a>
              </li>
            </ul>
          </section>
        )}

        {/* Become a Sitter Section */}
        {!isSitter && (
          <section className="mt-8">
            <button
              onClick={() => setShowSitterForm((prev) => !prev)}
              className="btn-primary w-full hover:bg-[var(--color-accent)] transition duration-300"
            >
              {showSitterForm ? "Hide Sitter Form" : "Become a Sitter"}
            </button>

            {showSitterForm && (
              <div className="mt-4">
                <SitterForm
                  onClose={async () => {
                    setShowSitterForm(false);
                    await refreshSitterStatus(); // Refresh global sitter state after submission
                  }}
                />
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}



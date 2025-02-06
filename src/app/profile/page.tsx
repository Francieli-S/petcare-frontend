'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import SitterForm from '../../components/SitterForm';
import { useSitter } from '@/context/SitterContext';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const { isSitter, sitterData, refreshSitterStatus } = useSitter();
  const router = useRouter();
  const [showSitterForm, setShowSitterForm] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <p className='text-center mt-10 text-lg'>Loading...</p>;
  }

  if (!user) return null;

  return (
    <main className="max-w-3xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.firstName}!</h1>
      <p className="text-gray-700">Email: {user.email}</p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Your Dashboard</h2>
        <ul className="mt-4 list-disc pl-5 space-y-2">
          <li>
            📅 <a href="/bookings" className="text-blue-600">My Bookings</a>
          </li>
          <li>
            🐶 <a href="/pets" className="text-blue-600">My Pets</a>
          </li>
          <li>
            ❤️ <a href="/favorites" className="text-blue-600">My Favorite Sitters</a>
          </li>
          {isSitter && (
            <>
              <li>
                🐾 <a href="/clients" className="text-blue-600">My Clients</a>
              </li>
              <li>
                ⭐ <a href="/reviews" className="text-blue-600">My Reviews</a>
              </li>
              <li>
                📝 <a href="/sitter-bio" className="text-blue-600">My Bio: {sitterData.bio}</a>
              </li>
            </>
          )}
        </ul>
      </section>

      {/* Become a Sitter Section */}
      {!isSitter && (
        <section className="mt-8">
          <button
            onClick={() => setShowSitterForm((prev) => !prev)}
            className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {showSitterForm ? "Hide Sitter Form" : "Become a Sitter"}
          </button>

          {showSitterForm && (
            <div className="mt-4">
              <SitterForm
                onClose={async () => {
                  setShowSitterForm(false);
                  await refreshSitterStatus(); // refresh global sitter state after creating a sitter
                }}
              />
            </div>
          )}
        </section>
      )}
    </main>
  );
}

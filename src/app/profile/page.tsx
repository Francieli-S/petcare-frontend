'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import SitterForm from '../../components/SitterForm';
import { useSitter } from '@/context/SitterContext';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const { isSitter, sitterData, refreshSitterStatus } = useSitter();
  const router = useRouter();
  const [showSitterForm, setShowSitterForm] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router, isSitter, sitterData]);

  if (loading) {
    return (
      <p className='text-center mt-10 text-lg text-[var(--color-primary)]'>
        Loading...
      </p>
    );
  }

  if (!user) return null;

  return (
    <main className='container mt-10'>
      <div className='bg-white p-8 shadow-lg rounded-lg'>
        <h1 className='text-3xl font-bold text-[var(--color-primary)]'>
          Welcome, {user.firstName}!
        </h1>
        <section className='mt-6 space-y-3'>
          <h2 className='text-xl font-semibold text-gray-800'>
            Your Dashboard
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2'>
            <Link
              href='/bookings'
              className='block bg-gray-100 p-4 rounded-lg transition
              no-underline hover:no-underline'
            >
              {' '}
              📅 My Bookings
            </Link>
            <Link
              href='/pets'
              className='block bg-gray-100 p-4 rounded-lg transition
              no-underline hover:no-underline'
            >
              {' '}
              🐶 My Pets
            </Link>
            <Link
              href='/favorites'
              className='block bg-gray-100 p-4 rounded-lg transition
              no-underline hover:no-underline'
            >
              {' '}
              ❤️ My Favorite Sitters
            </Link>
            <Link
              href='/payment-settings'
              className='block bg-gray-100 p-4 rounded-lg transition
              no-underline hover:no-underline'
            >
              {' '}
              💳 Payment Settings
            </Link>
            <Link
              href='/settings'
              className='block bg-gray-100 p-4 rounded-lg transition
              no-underline hover:no-underline'
            >
              {' '}
              ⚙️ General Settings
            </Link>
          </div>
        </section>
        {isSitter && (
          <section className='mt-6 space-y-3'>
            <h2 className='text-xl font-semibold text-gray-800'>
              Sitter Dashboard
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2'>
              <Link
                href='/clients'
                className='block bg-gray-100 p-4 rounded-lg transition
                no-underline hover:no-underline'
              >
                {' '}
                🐾 My Clients
              </Link>
              <Link
                href='/reviews'
                className='block bg-gray-100 p-4 rounded-lg transition
                no-underline hover:no-underline'
              >
                {' '}
                ⭐ My Reviews
              </Link>
              <Link
                href='/sitter-bio'
                className='block bg-gray-100 p-4 rounded-lg transition
                no-underline hover:no-underline'
              >
                {' '}
                📝 My Bio
              </Link>
              <Link
                href='/earnings'
                className='block bg-gray-100 p-4 rounded-lg transition
                no-underline hover:no-underline'
              >
                {' '}
                💰 My Earnings
              </Link>
            </div>
          </section>
        )}
        {!isSitter && (
          <section className='mt-8'>
            <button
              onClick={() => setShowSitterForm((prev) => !prev)}
              className='btn-primary hover:bg-[var(--color-accent)] transition duration-300'
            >
              {showSitterForm ? 'Hide Sitter Form' : 'Become a Sitter'}
            </button>

            {showSitterForm && (
              <div className='mt-4'>
                <SitterForm
                  onClose={async () => {
                    setShowSitterForm(false);
                    await refreshSitterStatus(); // Refresh sitter status
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

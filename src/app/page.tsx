'use client';

import { useState, useEffect } from 'react';
import { apiRequest } from '@/utils/api';
import SitterCard from '@/components/SitterCard';
import { Sitter } from '../types/sitter';

export default function Home() {
  const [sitters, setSitters] = useState<Sitter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // ✅ Prevents state updates after unmounting

    const fetchSitters = async () => {
      try {
        setLoading(true);
        const data = await apiRequest('/sitters/all');
        if (isMounted) setSitters(data.sitters);
      } catch (err) {
        if (isMounted) setError('Failed to fetch sitters.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSitters();

    return () => {
      isMounted = false; // ✅ Cleanup function to avoid memory leaks
    };
  }, []); // ✅ Runs only on mount

  console.log('SITTERS: ', sitters);

  if (loading) return <p className='text-center mt-10'>Loading sitters...</p>;
  if (error) return <p className='text-red-500 text-center'>{error}</p>;

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>Find the Best Pet Sitters</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {sitters.map((sitter) => (
          <SitterCard
            key={sitter.sitterId}
            firstName={sitter.firstName}
            lastName={sitter.lastName}
            bio={sitter.bio}
            email={sitter.email}
            rating={sitter.rating}
            sitterId={sitter.sitterId}
          />
        ))}
      </div>
    </div>
  );
}

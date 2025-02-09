'use client';

import { useState, useEffect } from 'react';
import { apiRequest } from '@/utils/api';
import { Sitter } from '../../types/sitter';
import SitterCard from '@/components/SitterCard';

export default function SittersPage() {
  const [sitters, setSitters] = useState<Sitter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // Prevent state updates after unmounting

    const fetchSitters = async () => {
      setLoading(true);
      try {
        const data = await apiRequest('/sitters/all');
        if (isMounted) {
          setSitters(data.sitters);
        }
      } catch (err) {
        if (isMounted) setError('Failed to fetch sitters.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSitters();

    return () => {
      isMounted = false; // Cleanup to avoid memory leaks
    };
  }, []);

  if (loading) {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6'>
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className='animate-pulse bg-gray-300 h-40 rounded-lg'
            ></div>
          ))}
      </div>
    );
  }

  if (!loading && sitters.length === 0) {
    return (
      <p className='text-center text-gray-600 mt-10'>
        No sitters found!
      </p>
    );
  }
  if (error)
    return (
      <div className='text-center mt-10'>
        <p className='text-red-500 text-lg'>{error}</p>
        <button onClick={() => setError(null)} className='...'>
          Try Again
        </button>
      </div>
    );

  return (
    <div className='max-w-5xl mx-auto p-6'>
      <h1 className='text-3xl font-bold text-[var(--color-primary)] mb-6 text-center'>
        Find the Best Pet Sitters
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {sitters.map((sitter) => (
          <SitterCard
            key={sitter.sitterId}
            firstName={sitter.firstName}
            bio={sitter.bio}
            rating={sitter.rating}
            sitterId={sitter.sitterId}
          />
        ))}
      </div>
    </div>
  );
}

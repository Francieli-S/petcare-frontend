"use client";

import { useState, useEffect } from 'react';
import { apiRequest } from '@/utils/api';
import SitterCard from '@/components/SitterCard';
import { Sitter } from '../../types/sitter';

export default function SittersPage() {
  const [sitters, setSitters] = useState<Sitter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // Prevent state updates after unmounting

    const fetchSitters = async () => {
      try {
        setLoading(true);
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

  if (loading)
    return <p className="text-center mt-10 text-lg">Loading sitters...</p>;
  if (error)
    return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-6 text-center">
        Find the Best Pet Sitters
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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

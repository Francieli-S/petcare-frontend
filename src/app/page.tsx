'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  if (loading) return <p className='text-center mt-10'>Loading sitters...</p>;
  if (error) return <p className='text-red-500 text-center'>{error}</p>;

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'></h1>
      <Link href={'/sitters/'}>
        <button>Find the Best Pet Sitters</button>
      </Link>
    
    </div>
  );
}

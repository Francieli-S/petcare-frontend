'use client';

import Link from 'next/link';

interface SitterCardProps {
  sitterId: string;
  firstName: string;
  bio: string;
  rating: number;
  profileImage?: string; // Optional, for future DB updates
}

export default function SitterCard({
  firstName,
  bio,
  rating,
  sitterId,
}: SitterCardProps) {
  return (
    <div
      className='bg-white p-6 rounded-lg shadow-md transition-all duration-300 
    hover:shadow-2xl hover:scale-105'
    >
      <div className='flex flex-col h-full'>
        <div className='flex items-center gap-4'>
          <img
            src='/images/profile-placeholder.jpg'
            alt={`${firstName}`}
            className='w-20 h-20 object-cover border border-gray-300'
          />
          <h3 className='text-xl font-semibold text-[var(--color-primary)]'>
            {firstName}
          </h3>
        </div>

        <p className='text-gray-700 mt-2 mb-4 line-clamp-2'>{bio}</p>

        <div className='mt-auto flex justify-between items-center'>
          <span className='text-yellow-500 font-bold'>⭐ {rating}</span>
          <Link href={`/sitters/${sitterId}`}>
            <button className='py-2 px-4 bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-accent)] transition-colors'>
              View Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

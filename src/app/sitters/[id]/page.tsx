'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiRequest } from '@/utils/api';
import { Sitter } from '../../../types/sitter';
import BookingForm from '@/components/BookingForm';

export default function SitterProfile() {
  const { id } = useParams();
  const [sitter, setSitter] = useState<Sitter | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    if (!id) return; // Ensure ID exists
    let isMounted = true; // Prevent state updates after unmounting

    const fetchSitter = async () => {
      setLoading(true);
      try {
        const data = await apiRequest(`/sitters/${id}`);
        if (isMounted) {
          setSitter(data.sitter);
        }
      } catch (err) {
        if (isMounted) setError('Failed to load sitter details.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSitter();
    return () => {
      isMounted = false; // Cleanup to avoid memory leaks
    };
  }, [id]);

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

  if (!sitter) {
    return (
      <p className='text-center text-gray-600 mt-10'>
        No sitters found. Check back later!
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
    <div className='max-w-3xl mx-auto p-8 bg-[var(--color-white)] shadow-lg rounded-lg'>
      <div className='flex justify-center'>
        <img
          src='/images/profile-placeholder.jpg'
          alt={`${sitter.firstName}`}
          className='w-40 h-40 object-cover border border-gray-300'
        />
      </div>
      <h1 className='text-2xl font-bold text-center text-[var(--color-primary)]'>
        {sitter.firstName} {sitter.lastName}
      </h1>
      <p className='text-gray-700 mt-4 text-center'>{sitter.email}</p>
      <p className='text-gray-700 mt-4 text-center'>{sitter.bio}</p>
      <p className='text-yellow-500 mt-2 font-bold text-center'>
        ⭐ {sitter.rating}
      </p>

      {/* Booking Section */}
      <div className='mt-6'>
        {showBookingForm ? (
          <BookingForm
            sitterId={sitter.sitterId}
            onClose={() => setShowBookingForm(false)}
          />
        ) : (
          <div className='flex justify-center'>
            <button
              onClick={() => setShowBookingForm(true)}
              className="py-2 px-6 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition-colors"            >
              Make a Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { apiRequest } from '@/utils/api';
import BookingCard from '../../components/BookingCard';
import { Booking } from '@/types/booking';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // Prevent state updates if component unmounts

    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await apiRequest('/bookings/');
        if (isMounted) {
          setBookings(data.bookings);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch bookings.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBookings();

    return () => {
      isMounted = false;
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
  if (!loading && bookings.length === 0) {
    return (
      <p className='text-center text-gray-600 mt-10'>No bookings found!</p>
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
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-3xl font-bold text-center text-[var(--color-primary)] mb-6'>
        My Bookings
      </h1>
      <div className='space-y-6'>
        {bookings.map((booking) => (
          <BookingCard
            key={booking.bookingId}
            bookingId={booking.bookingId}
            status={booking.status}
            sitter={booking.sitter}
            user={booking.user}
          />
        ))}
      </div>
    </div>
  );
}

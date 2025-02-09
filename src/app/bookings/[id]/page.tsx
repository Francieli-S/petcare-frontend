'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { apiRequest } from '@/utils/api';
import { useSitter } from '@/context/SitterContext';
import { Booking } from '@/types/booking';
import BookingForm from '@/components/BookingForm';

export default function BookingDetailsPage() {
  const { id } = useParams();
  const { isSitter } = useSitter();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false); // Track status update loading

  // 🔹 Status Badge Styles
  const statusStyles: Record<string, string> = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Canceled: 'bg-red-100 text-red-700',
    Accepted: 'bg-green-100 text-green-700',
    Completed: 'bg-blue-100 text-blue-700',
  };

  useEffect(() => {
    if (!id) return;
    let isMounted = true;

    const fetchBooking = async () => {
      try {
        setLoading(true);
        const data = await apiRequest(`/bookings/${id}`);
        if (isMounted) {
          setBooking(data.booking);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch booking details.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBooking();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleUpdateStatus = async (newStatus: string) => {
    if (!booking || updating) return;
    setUpdating(true);
    try {
      const updatedBooking = await apiRequest(
        `/bookings/sitter/${id}`,
        'PATCH',
        { status: newStatus }
      );
      setBooking(updatedBooking.booking);
    } catch (err) {
      console.error('Error updating booking status:', err);
    } finally {
      setUpdating(false);
    }
  };

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

  if (error)
    return (
      <div className='text-center mt-10'>
        <p className='text-red-500 text-lg'>{error}</p>
        <button onClick={() => setError(null)} className='btn-primary mt-4'>
          Try Again
        </button>
      </div>
    );

  if (!booking) {
    return <p className='text-center text-gray-600 mt-10'>No booking found!</p>;
  }

  return (
    <div className='max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg'>
      <h1 className='text-3xl font-bold text-[var(--color-primary)] mb-6 text-center'>
        Booking Details
      </h1>

      <span
        className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold ${
          statusStyles[booking.status] || 'bg-gray-100 text-gray-700'
        }`}
      >
        {booking.status}
      </span>

      <div className='mt-4 space-y-3 text-gray-700'>
        <p>
          <strong>Service Type:</strong> <br /> {booking.serviceType}
        </p>
        <p>
          <strong>Number of Days:</strong> <br /> {booking.numberOfDays}
        </p>
        <p>
          <strong>Total Cost:</strong> <br /> € {booking.totalCost.toFixed(2)}
        </p>
        {!isSitter ? (
          <p>
            <strong>Sitter:</strong> <br /> {booking.sitter.firstName}
          </p>
        ) : (
          <p>
            <strong>Client:</strong> <br /> {booking.user.firstName}
          </p>
        )}
        <p>
          <strong>Booking Ref:</strong> <br /> {booking.bookingId}
        </p>
      </div>

      {isSitter && (
        <div className='mt-6 space-y-3'>
          {booking.status === 'Pending' && (
            <button
              onClick={() => handleUpdateStatus('Accepted')}
              className='btn-primary hover:bg-[var(--color-info)] transition duration-300 w-full'
              disabled={updating}
            >
              {updating ? 'Processing...' : 'Accept Booking'}
            </button>
          )}

          {booking.status === 'Accepted' && (
            <button
              onClick={() => handleUpdateStatus('Completed')}
              className='btn-primary hover:bg-[var(--color-info)] transition duration-300 w-full'
              disabled={updating}
            >
              {updating ? 'Processing...' : 'Mark as Completed'}
            </button>
          )}
        </div>
      )}

      {!isSitter && (
        <div className='mt-6'>
          <button
            onClick={() => setEditing(true)}
            className='btn-secondary w-full hover:bg-[var(--color-accent)] transition duration-300'
          >
            Change Booking
          </button>

          {editing && (
            <div className='mt-4'>
              <BookingForm
                initialData={{ ...booking }}
                onClose={() => setEditing(false)}
                onSave={(updatedBooking) => setBooking(updatedBooking)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

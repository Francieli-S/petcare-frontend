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

  console.log('BOOKING ID:', id);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const fetchBooking = async () => {
      try {
        setLoading(true);
        const data = await apiRequest(`/bookings/${id}`);
        console.log('BOOKING BY ID:', data.booking);
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
    if (!booking) return;
console.log('NEW STATUS: ', newStatus);
    try {
      const updatedBooking = await apiRequest(
        `/bookings/sitter/${id}`,
        'PATCH',
        {
          // id: booking.bookingId,
          status: newStatus,
        }
      );
      console.log('UPDATED BOOKING: ', updatedBooking);

      setBooking(updatedBooking.booking);
    } catch (err) {
      console.error('Error updating booking status:', err);
    }
  };

  if (loading) {
    return (
      <p className='text-center mt-10 text-lg text-[var(--color-primary)]'>
        Loading booking details...
      </p>
    );
  }

  if (error) {
    return <p className='text-red-500 text-center mt-10 text-lg'>{error}</p>;
  }

  if (!booking) {
    return <p className='text-center mt-10 text-lg'>No booking found.</p>;
  }

  return (
    <div className='max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg'>
      <h1 className='text-3xl font-bold text-[var(--color-primary)] mb-6 text-center'>
        Booking Details
      </h1>

      <p className='text-gray-700 mb-4'>
        <strong>Status:</strong> <br /> {booking.status}
      </p>

      <p className='text-gray-700 mb-4'>
        <strong>Service Type:</strong> <br /> {booking.serviceType}
      </p>

      <p className='text-gray-700 mb-4'>
        <strong>Number of Days:</strong> <br /> {booking.numberOfDays}
      </p>

      <p className='text-gray-700 mb-4'>
        <strong>Total Cost:</strong> € <br /> {booking.totalCost.toFixed(2)}
      </p>
      {!isSitter ? (
        <p className='text-gray-700 mb-4'>
          <strong>Sitter:</strong> <br /> {booking.sitter.firstName}
        </p>
      ) : (
        <p className='text-gray-700 mb-4'>
          <strong>Client:</strong> <br /> {booking.user.firstName}
        </p>
      )}

      <p className='mt-2 text-gray-600'>
        <strong>Booking Ref:</strong> <br /> {booking.bookingId}
      </p>

      {/* Buttons for Sitters */}
      {isSitter && booking.status === 'Pending' && (
        <button
          onClick={() => handleUpdateStatus('Accepted')}
          className='btn-primary mt-4 w-full hover:bg-[var(--color-info)] transition duration-300'
        >
          Accept Booking
        </button>
      )}

      {isSitter && booking.status === 'Accepted' && (
        <button
          onClick={() => handleUpdateStatus('Completed')}
          className='btn-primary mt-4 w-full hover:bg-[var(--color-info)] transition duration-300'
        >
          Booking Completed
        </button>
      )}

      {/* Button for Users (Non-Sitters) */}
      {!isSitter && (
        <>
          <button
            onClick={() => setEditing(true)}
            className='btn-secondary mt-4 w-full hover:bg-[var(--color-accent)] transition duration-300'
          >
            Change Booking
          </button>

          {/* Display Booking Form when editing */}
          {editing && (
            <div className='mt-4'>
              <BookingForm
                initialData={{ ...booking }}
                onClose={() => setEditing(false)}
                onSave={(updatedBooking) => setBooking(updatedBooking)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/utils/api';

type BookingFormProps = {
  sitterId?: string;
  onClose: () => void;
  initialData?: {
    bookingId?: string;
    serviceType: string;
    numberOfDays: number;
    status: string;
  };
  onSave?: (updatedBooking: any) => void;
};

export default function BookingForm({
  sitterId,
  onClose,
  initialData,
  onSave,
}: BookingFormProps) {
  const [serviceType, setServiceType] = useState(
    initialData?.serviceType || ''
  );
  const [numberOfDays, setNumberOfDays] = useState(
    initialData?.numberOfDays || 1
  );
  const [status, setStatus] = useState(initialData?.status || 'Pending');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();
  const isEditing = !!initialData?.bookingId;

  const inputClass =
    'w-full p-3 mt-1 border border-gray-300 rounded-lg bg-white text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-shadow cursor-pointer hover:border-[var(--color-primary)] hover:shadow-md';

  const submitBooking = async (
    data: object,
    method: 'POST' | 'PATCH',
    endpoint: string
  ) => {
    try {
      return await apiRequest(endpoint, method, data);
    } catch (error) {
      console.error('Booking error:', error);
      throw new Error('An error occurred while saving.');
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const endpoint = isEditing
        ? `/bookings/${initialData.bookingId}`
        : '/bookings';
      const method = isEditing ? 'PATCH' : 'POST';
      const data = isEditing
        ? { serviceType, numberOfDays, status }
        : { sitterId, serviceType, numberOfDays };

      const response = await submitBooking(data, method, endpoint);
      if (response.booking) {
        setSuccessMessage('Booking saved successfully!');
        onSave?.(response.booking);
      } else {
        throw new Error('Failed to save booking. You should sign in first.');
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mt-4 p-6 border border-gray-300 rounded-lg bg-white shadow-md'>
      <h3 className='text-lg font-semibold text-[var(--color-primary)] mb-4'>
        {isEditing ? 'Edit Booking' : 'Book this Sitter'}
      </h3>

      {successMessage ? (
        <>
          <p className='mt-2 text-green-600 font-medium'>{successMessage}</p>
          <button
            onClick={() => router.push('/bookings')}
            className='w-full mt-4 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition-colors'
          >
            See My Bookings
          </button>
        </>
      ) : (
        <>
          <label className='block mt-4'>
            <span className='font-medium text-gray-700'>Service Type:</span>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className={inputClass}
            >
              <option value='One visit a day'>One visit a day</option>
              <option value='House sitting'>House sitting</option>
              <option value='Dog walking'>Dog walking</option>
            </select>
          </label>

          <label className='block mt-4'>
            <span className='font-medium text-gray-700'>Number of Days:</span>
            <input
              type='number'
              min='1'
              value={numberOfDays}
              onChange={(e) => setNumberOfDays(Number(e.target.value))}
              className='w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-shadow'
            />
          </label>

          {isEditing && (
            <label className='block mt-4'>
              <span className='font-medium text-gray-700'>Booking Status:</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={inputClass}
              >
                <option value='Pending'>Pending</option>
                <option value='Canceled'>Canceled</option>
              </select>
            </label>
          )}

          {error && <p className='text-red-500 mt-4'>{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className='w-full mt-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition-colors'
          >
            {loading
              ? 'Saving...'
              : isEditing
              ? 'Save Changes'
              : 'Confirm Booking'}
          </button>

          <button
            onClick={onClose}
            className='w-full mt-4 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors'
          >
            Close
          </button>
        </>
      )}
    </div>
  );
}

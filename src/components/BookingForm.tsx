'use client';

import { useState, useEffect } from 'react';
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
    initialData?.serviceType
  );
  const [numberOfDays, setNumberOfDays] = useState(
    initialData?.numberOfDays
  );
  const [status, setStatus] = useState(initialData?.status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();
  const isEditing = !!initialData?.bookingId;

  useEffect(() => {
    setError(null);
    setSuccessMessage(null);
  }, [serviceType, numberOfDays, status]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    console.log('IS EDITING:', isEditing);
    console.log('STATUS:', status);

    try {
      let response;

      if (isEditing) {
        response = await apiRequest(
          `/bookings/${initialData.bookingId}`,
          'PATCH',
          {
            serviceType,
            numberOfDays,
            status,
          }
        );
        console.log('RESPONSE AFTER EDIT :', response);
      } else {
        response = await apiRequest('/bookings', 'POST', {
          sitterId,
          serviceType,
          numberOfDays,
        });
      }

      if (response.booking) {
        setSuccessMessage('Booking saved successfully!');
        onSave?.(response.booking);
      } else {
        setError('Failed to save booking.');
      }
    } catch (err) {
      console.error('Booking error:', err);
      setError('An error occurred while saving.');
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
          {/* Service Type Select with Improved Styling */}
          <label className='block mt-4'>
            <span className='font-medium text-gray-700'>Service Type:</span>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className='w-full p-3 mt-1 border border-gray-300 rounded-lg bg-white text-[var(--color-primary)] 
             focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-shadow 
             cursor-pointer hover:border-[var(--color-primary)] hover:shadow-md'
            >
              <option value='One visit a day' className='text-black'>
                One visit a day
              </option>
              <option value='House sitting' className='text-black'>
                House sitting
              </option>
              <option value='Dog walking' className='text-black'>
                Dog walking
              </option>
            </select>
          </label>

          {/* Number of Days Input */}
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

          {/* Status Select (Only in Edit Mode) */}
          {isEditing && (
            <label className='block mt-4'>
              <span className='font-medium text-gray-700'>Booking Status:</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className='w-full p-3 mt-1 border border-gray-300 rounded-lg bg-white text-[var(--color-primary)] 
             focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-shadow 
             cursor-pointer hover:border-[var(--color-primary)] hover:shadow-md'
              >
                <option value='Pending' className='text-black'>
                  Pending
                </option>
                <option value='Canceled' className='text-black'>
                  Canceled
                </option>
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
            Cancel
          </button>
        </>
      )}
    </div>
  );
}

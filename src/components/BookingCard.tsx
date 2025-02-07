'use client';

import React from 'react';
import Link from 'next/link';
import { Sitter } from '@/types/sitter';

interface BookingCardProps {
  bookingId: string;
  status: string;
  serviceType: string;
  numberOfDays: number;
  totalCost: number;
  sitter: Sitter;
}

export default function BookingCard({
  bookingId,
  status,
  serviceType,
  numberOfDays,
  totalCost,
  sitter,
}: BookingCardProps) {
  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <p className='text-gray-700 mb-2'>
        <strong>Status:</strong> {status}
      </p>

      <Link href={`/bookings/${bookingId}`}>
        <button className='mt-4 w-full py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition-colors'>
          View Booking
        </button>
      </Link>
    </div>
  );
}

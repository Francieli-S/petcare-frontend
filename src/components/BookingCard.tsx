'use client';

import React from 'react';
import Link from 'next/link';
import { Sitter } from '@/types/sitter';

interface BookingCardProps {
  bookingId: string;
  status: string;
  sitter: Sitter;
}

export default function BookingCard({
  bookingId,
  status,
  sitter,
}: BookingCardProps) {
  const statusStyles: Record<string, string> = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Canceled: 'bg-red-100 text-red-700',
    Accepted: 'bg-green-100 text-green-700',
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
      <span
        className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold ${
          statusStyles[status] || 'bg-gray-100 text-gray-700'
        }`}
      >
        {status}
      </span>
      <p className='text-gray-700 mt-3'>
        <strong>Sitter:</strong> {sitter.firstName}
      </p>
      <Link href={`/bookings/${bookingId}`}>
        <button className='mt-4 px-8 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition-colors'>
          View Booking
        </button>
      </Link>
    </div>
  );
}

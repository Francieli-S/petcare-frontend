"use client";

import React from "react";
import { Booking } from "@/types/booking";
import Link from 'next/link';

interface BookingCardProps {
  booking: Booking;
  // sitter: Booking["sitter"];       // Assuming 'sitter' is a property of Booking
  totalCost: number;
  status: string;
}

export default function BookingCard({
  booking,
  // sitter,
  totalCost,
  status,
}: BookingCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Uncomment the following line to display sitter's name if available */}
      {/* <h2 className="text-xl font-bold mb-2">Booking for {sitter.name}</h2> */}
      
      <p className="text-gray-700 mb-2">
        <strong>Status:</strong> {status}
      </p>
      
      <p className="text-gray-700 mb-2">
        <strong>Total Cost:</strong> ${totalCost.toFixed(2)}
      </p>
      
      {/* Render other booking details as needed */}
      <p className="mt-2 text-gray-600">
        <strong>Booking ID:</strong> {booking.bookingId}
      </p>
      
      <Link href={`/booking/${booking.bookingId}`}>
        <button className="mt-4 w-full py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition-colors">
          View Booking
        </button>
      </Link>
    </div>
  );
}


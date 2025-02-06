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
  //sitter,
  totalCost,
  status,
}: BookingCardProps) {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      {/* <h2 className="text-xl font-bold mb-2">Booking for {sitter.name}</h2> */}
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Total Cost:</strong> ${totalCost.toFixed(2)}</p>
      {/* Render other booking details as needed */}
      <p className="mt-2 text-gray-600">
        Booking ID: {booking.bookingId}
      </p>
      <Link href={`/booking/${booking.bookingId}`}>
        <button>View booking</button>
      </Link>
    </div>
  );
}

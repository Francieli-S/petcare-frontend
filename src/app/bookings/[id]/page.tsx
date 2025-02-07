"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { apiRequest } from "@/utils/api";
import { Booking } from "@/types/booking"; // Make sure this interface is defined

export default function BookingDetailsPage() {
  const { id } = useParams(); // Retrieves the booking ID from the URL
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // If no ID is present, do nothing

    let isMounted = true; // Prevents state updates if the component unmounts

    const fetchBooking = async () => {
      try {
        setLoading(true);
        // Call the API to get booking details by id
        const data = await apiRequest(`/bookings/${id}`, "GET");
        console.log('BOOKING BY ID: ', data.booking);
        if (isMounted) {
          setBooking(data.booking);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to fetch booking details.");
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

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg">
        Loading booking details...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-center mt-10 text-lg">
        {error}
      </p>
    );
  }

  if (!booking) {
    return (
      <p className="text-center mt-10 text-lg">
        No booking found.
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      {/* Booking Details Heading */}
      <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-6 text-center">
        Booking Details
      </h1>

      {/* Booking ID */}
      <p className="text-gray-700 mb-4">
        <strong>Booking ID:</strong> {booking.bookingId}
      </p>

      {/* Booking Status */}
      <p className="text-gray-700 mb-4">
        <strong>Status:</strong> {booking.status}
      </p>

      {/* Total Cost */}
      <p className="text-gray-700 mb-4">
        <strong>Total Cost:</strong> ${booking.totalCost.toFixed(2)}
      </p>

      {/* Optional: Display Service Type if available */}
      {booking.serviceType && (
        <p className="text-gray-700 mb-4">
          <strong>Service Type:</strong> {booking.serviceType}
        </p>
      )}

      {/* Optional: Display Number of Days if available */}
      {booking.numberOfDays && (
        <p className="text-gray-700 mb-4">
          <strong>Number of Days:</strong> {booking.numberOfDays}
        </p>
      )}

      {/* Additional fields can be added here as needed */}
    </div>
  );
}


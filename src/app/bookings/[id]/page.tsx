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
    return <p className="text-center mt-10">Loading booking details...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  if (!booking) {
    return <p className="text-center mt-10">No booking found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Booking Details</h1>
      <p><strong>Booking ID:</strong> {booking.bookingId}</p>
      <p><strong>Status:</strong> {booking.status}</p>
      <p><strong>Total Cost:</strong> ${booking.totalCost.toFixed(2)}</p>
      {/* If your Booking interface includes serviceType and numberOfDays, display them as well */}
      {booking.serviceType && (
        <p>
          <strong>Service Type:</strong> {booking.serviceType}
        </p>
      )}
      {booking.numberOfDays && (
        <p>
          <strong>Number of Days:</strong> {booking.numberOfDays}
        </p>
      )}
      {/* You can add additional fields as needed */}
    </div>
  );
}

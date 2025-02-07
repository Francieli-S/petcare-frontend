"use client";

import { useState, useEffect } from "react";
import { apiRequest } from "@/utils/api";
import BookingCard from "../../components/BookingCard";
import { Booking } from "@/types/booking";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // Prevent state updates if component unmounts

    const fetchBookings = async () => {
      try {
        setLoading(true);
        // Adjust the endpoint as needed; assuming GET /bookings returns an object with a bookings array.
        const data = await apiRequest("/bookings");
        if (isMounted) {
          // Assuming the API returns { bookings: Booking[] }
          setBookings(data.bookings);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to fetch bookings.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBookings();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-lg">Loading bookings...</p>;
  if (error)
    return <p className="text-red-500 text-center mt-10 text-lg">{error}</p>;
  if (bookings.length === 0)
    return <p className="text-center mt-10 text-lg">No bookings found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-[var(--color-primary)] mb-6">
        My Bookings
      </h1>
      <div className="space-y-6">
        {bookings.map((booking) => (
          <BookingCard
            key={booking.bookingId}
            booking={booking}
            totalCost={booking.totalCost}
            status={booking.status}
          />
        ))}
      </div>
    </div>
  );
}

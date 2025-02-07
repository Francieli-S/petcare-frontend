"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/utils/api";

type BookingFormProps = {
  sitterId: string;
  onClose: () => void; // Function to close the form (optional)
};

export default function BookingForm({ sitterId, onClose }: BookingFormProps) {
  const [serviceType, setServiceType] = useState<string>("");
  const [numberOfDays, setNumberOfDays] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  
  const router = useRouter();

  const handleBooking = async () => {
    setLoading(true);
    setError(null);

    try {
      
      const response = await apiRequest("/bookings", "POST", {
        sitterId,
        serviceType,
        numberOfDays,
      });

      if (response.booking) {
        console.log('BOOKING RESPONSE: ', response.booking);
        setBookingSuccess(true);
      } else {
        setError("Failed to create booking.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      setError("An error occurred while booking.");
    } finally {
      setLoading(false);
    }
  };

  const handleSeeBookings = () => {
    // Redirect to the bookings page
    router.push("/bookings");
  };

  return (
    <div className="mt-4 p-6 border border-gray-300 rounded-lg bg-white shadow-md">
      <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-4">
        Book this Sitter
      </h3>

      {bookingSuccess ? (
        <>
          <p className="mt-2 text-green-600 font-medium">
            Booking successful!
          </p>
          <button
            onClick={handleSeeBookings}
            className="w-full mt-4 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition-colors"
          >
            See My Bookings
          </button>
        </>
      ) : (
        <>
          <label className="block mt-4">
            <span className="font-medium text-gray-700">Service Type:</span>
            <input
              type="text"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              placeholder="e.g., Dog walking, overnight care"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </label>

          <label className="block mt-4">
            <span className="font-medium text-gray-700">Number of Days:</span>
            <input
              type="number"
              min="1"
              value={numberOfDays}
              onChange={(e) => setNumberOfDays(Number(e.target.value))}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </label>

          {error && (
            <p className="text-red-500 mt-4">{error}</p>
          )}

          <button
            onClick={handleBooking}
            disabled={loading}
            className="w-full mt-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition-colors"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>

          <button
            onClick={onClose}
            className="w-full mt-4 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
}


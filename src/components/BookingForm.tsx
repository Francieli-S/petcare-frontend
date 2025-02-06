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
      // Send the POST request with sitterId, serviceType, and numberOfDays
      const response = await apiRequest("/bookings", "POST", {
        sitterId,
        serviceType,
        numberOfDays,
      });

      if (response.success) {
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
    <div className="mt-4 p-4 border rounded-lg bg-gray-100">
      <h3 className="text-lg font-semibold">Book this Sitter</h3>

      {bookingSuccess ? (
        <>
          <p className="mt-2 text-green-600 font-medium">Booking successful!</p>
          <button
            onClick={handleSeeBookings}
            className="w-full mt-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            See My Bookings
          </button>
        </>
      ) : (
        <>
          <label className="block mt-2">
            <span>Service Type:</span>
            <input
              type="text"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="e.g., Dog walking, overnight care"
            />
          </label>

          <label className="block mt-2">
            <span>Number of Days:</span>
            <input
              type="number"
              min="1"
              value={numberOfDays}
              onChange={(e) => setNumberOfDays(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </label>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <button
            onClick={handleBooking}
            disabled={loading}
            className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>

          <button
            onClick={onClose}
            className="w-full mt-2 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiRequest } from "@/utils/api";
import { Sitter } from '../../../types/sitter';
import BookingForm from "@/components/BookingForm";

export default function SitterProfile() {
  const { id } = useParams();
  const [sitter, setSitter] = useState<Sitter | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false); // Control form visibility

  useEffect(() => {
    if (!id) return; // Ensure ID exists

    const fetchSitter = async () => {
      try {
        setLoading(true);
        const data = await apiRequest(`/sitters/${id}`);
        console.log('SITTER BY ID: ', data.sitter );
        setSitter(data.sitter);
      } catch (err) {
        setError("Failed to load sitter details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSitter();
  }, [id]);

  if (loading) return <p>Loading sitter details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!sitter) return <p>No sitter found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <img
        // src={sitter.profileImage}
        alt={sitter.firstName}
        className="w-32 h-32 rounded-full mx-auto"
      />
      <h1 className="text-2xl font-bold text-center mt-4">{sitter.firstName}</h1>
      {/* <p className="text-gray-600 text-center">{sitter.location}</p> */}
      <p className="text-gray-700 mt-4">{sitter.bio}</p>
      <p className="text-gray-700 mt-2">
        {/* <strong>Experience:</strong> {sitter.experience} */}
      </p>
      <p className="text-yellow-500 mt-2">
        ⭐ {sitter.rating}
      </p>

      {/* Booking Section */}
      <div className="mt-6">
        {showBookingForm ? (
          <BookingForm sitterId={sitter.sitterId} onClose={() => setShowBookingForm(false)} />
        ) : (
          <button
            onClick={() => setShowBookingForm(true)}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Make a Booking
          </button>
        )}
      </div>
    </div>
  );
}

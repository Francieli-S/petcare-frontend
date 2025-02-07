"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/utils/api";

type SitterFormProps = {
  onClose: () => void;
};

export default function SitterForm({ onClose }: SitterFormProps) {
  const [bio, setBio] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setConfirmation(null);

    try {
      // Call the /sitter POST endpoint with the bio
      const response = await apiRequest("/sitter", "POST", { bio });

      // Check for success in your response structure (adjust if needed)
      if (response) {
        setConfirmation("Sitter profile created successfully!");
        // Optionally, you can redirect to a sitter dashboard or update user data
        // router.push("/profile/dashboard/sitter");
      } else {
        setError("Failed to create sitter profile.");
      }
    } catch (err) {
      console.error("Error creating sitter profile:", err);
      setError("An error occurred while creating your sitter profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 border border-gray-300 rounded-lg bg-white shadow-md"
    >
      <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-4">
        Sitter Profile Form
      </h3>

      <label className="block mt-4">
        <span className="font-medium text-gray-700">Bio:</span>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          placeholder="Tell us about your experience and services..."
          rows={4}
          required
        />
      </label>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {confirmation && (
        <p className="text-green-600 mt-4 font-medium">{confirmation}</p>
      )}

      <div className="mt-6 flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition-colors"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}


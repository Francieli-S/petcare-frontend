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
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg bg-gray-100">
      <h3 className="text-lg font-semibold mb-2">Sitter Profile Form</h3>

      <label className="block mt-2">
        <span className="font-medium">Bio:</span>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-2 border rounded mt-1"
          placeholder="Tell us about your experience and services..."
          rows={4}
          required
        />
      </label>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {confirmation && <p className="text-green-600 mt-2">{confirmation}</p>}

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

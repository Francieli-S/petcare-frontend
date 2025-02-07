"use client";

import Link from 'next/link';
import { Sitter } from '../types/sitter';

interface SitterCardProps extends Sitter {}

export default function SitterCard({
  firstName,
  lastName,
  bio,
  rating,
  sitterId,
}: SitterCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">
        {firstName} {lastName}
      </h3>
      <p className="text-gray-700 mb-4">{bio}</p>
      <div className="flex justify-between items-center">
        <span className="text-yellow-500 font-bold">⭐ {rating}</span>
        <Link href={`/sitters/${sitterId}`}>
          <button className="py-2 px-4 bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-accent)] transition-colors">
            View Profile
          </button>
        </Link>
      </div>
    </div>
  );
}

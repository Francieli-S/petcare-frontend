"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [error, setError] = useState<string | null>(null);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      {/* Hero Section */}
      <h1 className="text-4xl font-bold mb-4 text-[var(--color-primary)]">
        Discover the Best Pet Sitters
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Let us take care of your beloved pet with warmth, care, and professionalism.
      </p>
      <Link href="/sitters">
        <button className="w-full md:w-auto py-3 px-6 bg-[var(--color-primary)] text-white rounded-lg shadow hover:bg-[var(--color-accent)] transition-colors">
          Find the Best Pet Sitters
        </button>
      </Link>

      {/* Articles Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Dog Walking */}
        <div className="card p-4 bg-white shadow rounded-lg">
          <img
            src="/images/dog-walking.jpg"
            alt="Dog Walking"
            className="w-full h-40 object-cover rounded-md"
          />
          <h3 className="mt-4 text-xl font-semibold text-[var(--color-primary)]">
            Dog Walking
          </h3>
          <p className="mt-2 text-gray-600">
            Explore our top tips for safe and enjoyable dog walking experiences.
          </p>
        </div>
        {/* Card 2: Cat Home Visit */}
        <div className="card p-4 bg-white shadow rounded-lg">
          <img
            src="/images/cat-visit.jpg"
            alt="Visit a Cat at Home"
            className="w-full h-40 object-cover rounded-md"
          />
          <h3 className="mt-4 text-xl font-semibold text-[var(--color-primary)]">
            Cat Home Visit
          </h3>
          <p className="mt-2 text-gray-600">
            Discover how to make home visits a pleasant experience for your cat.
          </p>
        </div>
        {/* Card 3: Fun with Cats */}
        <div className="card p-4 bg-white shadow rounded-lg">
          <img
            src="/images/cat-play.jpg"
            alt="Play with Cats"
            className="w-full h-40 object-cover rounded-md"
          />
          <h3 className="mt-4 text-xl font-semibold text-[var(--color-primary)]">
            Fun with Cats
          </h3>
          <p className="mt-2 text-gray-600">
            Learn creative ways to engage and play with your feline friend.
          </p>
        </div>
      </div>
    </div>
  );
}



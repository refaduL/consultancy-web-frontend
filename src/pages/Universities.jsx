import React from "react";
import { universitiesList } from "../data/universitiesDB";
import UniversityCard from "../components/universities/UniversityCard";

export default function Universities() {
  return (
    <div className="min-h-screen bg-gradient-default font-sans px-4 sm:px-8 py-24">
      <div className="max-w-6xl mx-auto pt-6">
        {/* --- Header --- */}
        <header className="text-center mb-16">
          <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Top Universities
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Explore Universities
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover top universities across the globe. Click on any university
            to learn more about programs, requirements, and opportunities.
          </p>
        </header>

        {/* --- University Cards --- */}
        <main className="space-y-8">
          {universitiesList.map((uni) => (
            <UniversityCard key={uni._id} university={uni} />
          ))}
        </main>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import UniversityCard from "../components/universities/UniversityCard";
import { fetchUniversities } from "../services/universityService";

export default function Universities() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUniversityData = async () => {
      try {
        const universitiesData = await fetchUniversities();
        setUniversities(universitiesData.payload.universities);
        setLoading(false);
      } catch (error) {
        console.error("Universities data load failed:", error);
        setError(error.response?.data?.message || "Failed to load universities");
        setLoading(false);
      }
    };
    loadUniversityData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-default font-sans px-4 sm:px-8 py-24">
      <div className="max-w-6xl mx-auto pt-6">

        {/* ── Header ── */}
        <header className="text-center mb-16">
          <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Top Universities
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Explore Universities
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover top universities across the globe. Click on any university to learn more
            about programs, requirements, and opportunities.
          </p>
        </header>

        {/* ── Loading ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 text-lg">Loading universities...</p>
          </div>
        )}

        {/* ── Error ── */}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-500 font-semibold text-lg">{error}</p>
            <p className="text-gray-400 text-sm mt-2">Please try again later.</p>
          </div>
        )}

        {/* ── University Cards ── */}
        {!loading && !error && (
          <main className="space-y-8">
            {universities.length > 0 ? (
              universities.map((uni) => (
                <UniversityCard key={uni._id} university={uni} />
              ))
            ) : (
              <p className="text-center text-gray-500 text-lg py-16">
                No universities found.
              </p>
            )}
          </main>
        )}

      </div>
    </div>
  );
}
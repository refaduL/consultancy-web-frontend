// src/components/home/UniversitiesPreview.jsx
import { useState, useEffect } from 'react';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UniversityCard from '../universities/UniversityCard';
import { fetchUniversities } from '../../services/universityService';

export default function UniversitiesPreview() {
  const navigate = useNavigate();

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

  // Loading State
  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Top Universities
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Explore Universities
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover top universities across the globe. Click on any university to learn more about programs, requirements, and opportunities.
            </p>
          </div>

          <div className="bg-gradient-to-b from-gray-50 to-white font-sans px-4 sm:px-8">
            <div className="mx-auto max-w-6xl">
              <main className="space-y-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex items-start gap-6">
                        <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                        <div className="flex-1">
                          <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </main>
            </div>
          </div>

          <div className="text-center mt-12">
            <button disabled className="px-8 py-4 bg-gray-300 text-gray-500 font-semibold rounded-xl flex justify-center items-center mx-auto gap-2 cursor-not-allowed">
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading Universities...
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Error Loading
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Unable to Load Universities
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              We're having trouble fetching the university data. Please try again later.
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-2xl mx-auto text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Top Universities
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Explore Universities
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover top universities across the globe. Click on any university to learn more about programs, requirements, and opportunities.
          </p>
        </div>

        <div className="bg-gradient-to-b from-gray-50 to-white font-sans px-4 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <main className="space-y-8">
              {universities.slice(0, 4).map((uni) => (
                <UniversityCard key={uni._id} university={uni} />
              ))}
            </main>
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/universities")}
            className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-300 hover:from-primary-500 hover:to-primary-300/70 text-white font-semibold rounded-xl flex justify-center items-center mx-auto gap-2 transition-all duration-300 shadow-md hover:shadow-lg group"
          >
            View All Universities
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
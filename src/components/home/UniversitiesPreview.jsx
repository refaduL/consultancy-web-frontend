// src/components/home/UniversitiesPreview.jsx
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { universitiesList } from '../../data/universitiesDB';
import { UniversityCard } from '../../pages/UniversityList';

export default function UniversitiesPreview() {
  const navigate = useNavigate();


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
              <div className="mx-auto m-20 max-w-6xl">
         
                {/* --- University Cards --- */}
                <main className="space-y-8">
                  {universitiesList.map((uni, i) => (
                    (i<4) && <UniversityCard key={uni._id} university={uni} />
                  ))}
                </main>
              </div>
            </div>

        <div className="text-center">
          <button
            onClick={() => navigate("/universities")}
            className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-300 hover:from-primary-500 hover:to-primary-500 text-white font-semibold rounded-xl flex justify-center items-center mx-auto gap-2 transition-all duration-300 shadow-md hover:shadow-lg group"
          >
            View All Universities
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

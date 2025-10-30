// src/components/home/UniversitiesPreview.jsx
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UniversitiesPreview() {
  const navigate = useNavigate();

  const universities = [
    { id: 1, name: "Harvard University", country: "USA", flag: "🇺🇸" },
    { id: 2, name: "University of Toronto", country: "Canada", flag: "🇨🇦" },
    { id: 3, name: "Imperial College London", country: "UK", flag: "🇬🇧" },
    { id: 4, name: "University of Melbourne", country: "Australia", flag: "🇦🇺" },
    { id: 5, name: "University of Toronto", country: "Canada", flag: "🇨🇦" },
    { id: 6, name: "Imperial College London", country: "UK", flag: "🇬🇧" },
    { id: 7, name: "Harvard University", country: "USA", flag: "🇺🇸" },
    { id: 8, name: "University of Toronto", country: "Canada", flag: "🇨🇦" },
  ];

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

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {universities.map((uni) => (
            <div
              key={uni.id}
              onClick={() => navigate(`/page-not-found`)}
              className="cursor-pointer bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="text-5xl mb-4">{uni.flag}</div>
              <h3 className="font-semibold text-gray-900 text-lg">{uni.name}</h3>
              <p className="text-gray-500 mt-1">{uni.country}</p>
            </div>
          ))}
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

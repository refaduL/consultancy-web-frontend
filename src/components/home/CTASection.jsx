// src/components/home/CTASection.jsx
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CTASection() {
  const navigate = useNavigate();
  
  return (
    <section className="relative py-20 bg-gray-50">
      <div className="container  max-w-7xl mx-auto px-4">
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between px-8 py-12 md:py-16 space-y-6 md:space-y-0 md:space-x-8">
          
          {/* Text Section */}
          <div className="text-center md:text-left max-w-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Make Your Move Abroad?
            </h2>
            <p className="text-gray-600 text-lg">
              Expert guidance, personalized plans, and streamlined applications. Your future starts here.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <button 
            onClick={() => navigate("/universities")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition duration-300 flex items-center gap-2">
              Start Your Journey
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="border border-gray-300 text-gray-800 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition duration-300">
              Schedule a Call
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

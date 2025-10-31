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
            className="w-full px-8 py-4 bg-gradient-to-br from-primary-500 to-primary-300 hover:from-primary-500 hover:to-primary-300/70 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center group">
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white hover:bg-primary-100 text-gray-700 font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-soft border border-gray-200">
              Schedule a Call
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

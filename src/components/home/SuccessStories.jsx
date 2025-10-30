// src/components/home/SuccessStories.jsx
import { Quote, Star, Play } from 'lucide-react';

export default function SuccessStories() {
  const stories = [
    {
      name: "Sarah Chen",
      program: "MSc Computer Science",
      university: "University of Toronto",
      image: "👩‍🎓",
      story: "EduGlobal helped me secure admission with a $20,000 scholarship. Their guidance was invaluable throughout the process.",
      rating: 5,
      country: "Canada"
    },
    {
      name: "Raj Patel",
      program: "MBA",
      university: "Imperial College London",
      image: "👨‍💼",
      story: "From GMAT preparation to visa approval, the team provided exceptional support. I couldn't have done it without them!",
      rating: 5,
      country: "UK"
    },
    {
      name: "Maria Rodriguez",
      program: "BSc Engineering",
      university: "University of Melbourne",
      image: "👩‍🔧",
      story: "The university matching was perfect for my profile. The entire process was smooth and stress-free.",
      rating: 5,
      country: "Australia"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-purple-50 via-white to-pink-50">
      <div className="container  max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
            Hear from students who transformed their aspirations into international education success
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {stories.map((story, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 border border-gray-200 hover:border-purple-300 transition-all duration-500 hover:-translate-y-2 hover:scale-105"
            >
              <Quote className="w-8 h-8 text-primary-300 mb-4 opacity-50" />

              {/* <div className="flex items-center mb-4 space-x-1">
                {[...Array(story.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                ))}
              </div> */}

              <p className="text-gray-700 mb-6 leading-relaxed font-light text-sm md:text-base">
                "{story.story}"
              </p>

              <div className="flex items-center gap-4">
                <div className="text-3xl">{story.image}</div>
                <div>
                  <div className="font-semibold text-gray-900">{story.name}</div>
                  <div className="text-sm text-gray-600">{story.program}</div>
                  <div className="text-sm text-gray-500">{story.university}</div>
                </div>
              </div>

              <div className="absolute bottom-6 right-6 bg-gradient-to-r from-primary-500 to-primary-300 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                {story.country}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="group bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-purple-50 hover:text-purple-700 transition-all duration-300 flex items-center gap-2 mx-auto border border-gray-200">
            <Play className="w-5 h-5" />
            Watch More Stories
          </button>
        </div>
      </div>
    </section>
  );
}
``

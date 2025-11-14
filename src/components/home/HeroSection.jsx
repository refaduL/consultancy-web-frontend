import { ArrowRight, Award, Globe2, GraduationCap, Play, Search, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import SearchBar from "../common/SearchBar";

const HeroSection = () => {
  const [activeDestination, setActiveDestination] = useState(0);

  const destinations = [
    { country: "USA", gradient: "from-[#8FB9A8] to-[#3F6A8A]", flag: "🇺🇸" },
    { country: "UK", gradient: "from-[#F2CC8C] to-[#F1828D]", flag: "🇬🇧" },
    { country: "Canada", gradient: "from-[#4D5E72] to-[#8FB9A8]", flag: "🇨🇦" },
    { country: "Australia", gradient: "from-[#FCD0BA] to-[#DDA5B6]", flag: "🇦🇺" },
  ];

  const floatingStats = [
    { icon: GraduationCap, label: "500+ Universities", color: "primary" },
    { icon: Globe2, label: "30+ Countries", color: "secondary" },
    { icon: Award, label: "95% Success Rate", color: "accent" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDestination((prev) => (prev + 1) % destinations.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [destinations.length]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#FEFAD4] via-white to-[#F1E6C1] overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 -left-10 w-60 sm:w-72 h-60 sm:h-72 bg-primary-300/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-secondary-300/20 rounded-full blur-3xl animate-float" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:pt-36 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in text-center lg:text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 sm:px-5 py-2.5 rounded-full shadow-soft border border-gray-200 mx-auto lg:mx-0">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-primary-300 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-secondary-500 to-secondary-300 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent-300 to-accent-100 border-2 border-white"></div>
              </div>
              <span className="text-sm font-semibold text-gray-700">
                Join 5,000+ successful students
              </span>
              <TrendingUp className="w-4 h-4 text-[#3F6A8A]" />
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2E2E42] leading-tight">
                Your Gateway to
                <span className="block mt-2 bg-gradient-to-r from-primary-300 via-primary-500 to-secondary-500 bg-clip-text text-transparent">
                  World-Class Education
                </span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Expert guidance for studying abroad — we connect you with the
                perfect university, streamline your applications, and stay with
                you every step of the journey.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
            <SearchBar
              placeholder="Search universities, programs, or countries..." 
              onChange={(text) => console.log(text)} />
              {/* <div className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-[#8FB9A8]/30">

                <div className="flex items-center px-5 flex-1">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search universities, programs, or countries..."
                    className="flex-1 pl-3 py-3 text-base outline-none text-gray-800"
                  />
                </div>

                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-300 hover:from-[#3F6A8A] hover:to-[#3F6A8A] text-white font-semibold sm:rounded-r-2xl rounded-b-2xl sm:rounded-b-none transition-all duration-300 shadow-md hover:shadow-lg group">
                  Search
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div> */}

              {/* Quick Filters */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-4">
                <span className="text-sm text-gray-500 font-medium">
                  Popular:
                </span>
                {["USA", "UK", "Canada", "Australia"].map(
                  (country) => (
                    <button
                      key={country}
                      className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white hover:bg-[#8FB9A8]/10 hover:text-[#3F6A8A] rounded-lg border border-gray-200 transition-all"
                    >
                      {country}
                    </button>
                  )
                )}
              </div>
            </div> 

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
              <button className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-300 hover:from-primary-500 hover:to-primary-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg group">
                Get Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white hover:bg-primary-100 text-gray-700 font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-soft border border-gray-200">
                <Play className="w-5 h-5 text-primary-300" />
                Watch How It Works
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative mt-14 lg:mt-0 animate-slide-up">
            <div className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-large p-6 sm:p-8 border border-gray-100">
              {/* Destination Carousel */}
              <div
                className={`relative h-56 sm:h-64 rounded-2xl mb-6 overflow-hidden bg-gradient-to-br ${destinations[activeDestination].gradient}`}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center space-y-3">
                  <div className="text-7xl sm:text-8xl animate-float">
                    {destinations[activeDestination].flag}
                  </div>
                  <h3 className="text-2xl sm:text-3xl text-neutral-100 font-bold">
                    Study in {destinations[activeDestination].country}
                  </h3>
                </div>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {destinations.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveDestination(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === activeDestination
                          ? "w-8 bg-white"
                          : "w-2 bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                {[
                  {
                    label: "Partner Universities",
                    value: "500+",
                    icon: GraduationCap,
                  },
                  { label: "Success Rate", value: "95%", icon: Award },
                  { label: "Countries", value: "30+", icon: Globe2 },
                  { label: "Students Helped", value: "5K+", icon: TrendingUp },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-100 shadow-soft text-center sm:text-left"
                  >
                    <stat.icon className="w-6 h-6 text-[#3F6A8A] mb-2 mx-auto sm:mx-0" />
                    <p className="text-2xl font-bold text-[#2E2E42]">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Stats */}
            {floatingStats.map((stat, idx) => (
              <div
                key={idx}
                className="hidden sm:flex absolute bg-white rounded-2xl shadow-md p-4 border border-gray-100 animate-float"
                style={{
                  top: `${20 + idx * 30}%`,
                  right: idx % 2 === 0 ? "-2rem" : "auto",
                  left: idx % 2 === 1 ? "-2rem" : "auto",
                  animationDelay: `${idx * 0.5}s`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl ${
                      stat.color === "primary"
                        ? "bg-[#8FB9A8]/20"
                        : stat.color === "secondary"
                        ? "bg-[#F2CC8C]/20"
                        : "bg-[#F1828D]/20"
                    }`}
                  >
                    <stat.icon
                      className={`w-5 h-5 ${
                        stat.color === "primary"
                          ? "text-[#3F6A8A]"
                          : stat.color === "secondary"
                          ? "text-[#DDA5B6]"
                          : "text-[#F1828D]"
                      }`}
                    />
                  </div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="opacity-0 md:opacity-100 absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

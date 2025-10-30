// src/pages/AboutUs.jsx
import { Globe2, Rocket, Target, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 text-gray-900">
      <div className="container mx-auto pt-12 max-w-7xl">
        {/* Intro Section */}
        <section className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 to-indigo-500 text-transparent bg-clip-text">
            About EduGlobal
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Empowering students to explore global education opportunities with
            expert guidance, trusted partnerships, and lifelong impact.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our mission is to simplify international education by connecting
              students to world-class universities and guiding them through
              every step — from application to arrival.
            </p>

            <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              To become a global leader in education consultancy, creating a
              world where every student has access to life-changing academic
              experiences.
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-purple-100 to-indigo-100 p-8 flex items-center justify-center shadow-inner">
            <Globe2 className="w-40 h-40 text-purple-500" />
          </div>
        </section>

        {/* Core Values */}
        <section className="bg-gradient-to-r from-indigo-50 to-purple-50 py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-12 text-gray-900">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Users className="w-10 h-10 text-indigo-600" />,
                  title: "Student-Centric",
                  desc: "Every decision we make revolves around student success and satisfaction.",
                },
                {
                  icon: <Target className="w-10 h-10 text-purple-600" />,
                  title: "Transparency",
                  desc: "We ensure honesty and clarity in every process, from counseling to admission.",
                },
                {
                  icon: <Rocket className="w-10 h-10 text-pink-600" />,
                  title: "Excellence",
                  desc: "Our experienced team strives for perfection and continuous growth.",
                },
              ].map((value, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:-translate-y-1"
                >
                  <div className="mb-4 flex justify-center">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="py-28 text-center border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Let’s Shape Your{" "}
              <span className="text-primary-600">Global Future</span>
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Whether you're planning to study abroad or seeking the right
              academic path, our expert team will guide you with precision,
              care, and insight — every step of the way.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-full font-semibold tracking-wide hover:bg-primary-700 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Start Your Journey
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.6"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

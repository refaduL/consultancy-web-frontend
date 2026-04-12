// src/components/ServicesPreview.jsx
import {
  ArrowRight,
  BookOpen,
  FileText,
  FileCheck,
  Globe,
  GraduationCap,
  Newspaper,
  UserCheck,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    id: 1,
    title: "University Admissions",
    description: "Free guidance and support for university applications. Get expert help with university selection, documents, and applications.",
    icon: GraduationCap,
    gradient: "from-indigo-500 to-purple-500",
    path: "/services/university-admissions" 
  },
  {
    id: 2,
    title: "Visa Assistance",
    description: "Complete visa documentation support, interview preparation, and application guidance for your study visa.",
    icon: Globe,
    gradient: "from-emerald-500 to-teal-500",
    path: "/services/visa-assistance"
  },
  {
    id: 3,
    title: "Test Prep & Language Coaching",
    description:
      "IELTS, TOEFL, GRE, GMAT coaching with structured study plans and expert mentors.",
    icon: BookOpen,
    gradient: "from-orange-500 to-amber-500",
    path: "/services/language-test-prep"
  },
  {
    id: 4,
    title: "Scholarship Guidance",
    description: "Discover merit-based and need-based scholarships to significantly reduce education costs. Get expert help to find and apply for scholarships.",
    icon: FileText,
    gradient: "from-pink-500 to-rose-500",
    path: "/services/scholarship-guidance"
  },
  {
    id: 5,
    title: "Career Counseling",
    description: "One-on-one career guidance sessions to help you choose the right path based on your interests, skills, and goals.",
    icon: UserCheck,
    gradient: "from-sky-500 to-blue-500",
    path: "/services/career-counseling"
  },
  {
    id: 6,
    title: "Document Review",
    description: "Professional review of your academic documents with personalized feedback and consultation for study abroad applications.",
    icon: FileCheck,
    gradient: "from-violet-500 to-fuchsia-500",
    path: "/services/document-review"
  },
  // {
  //   id: 6,
  //   title: "Study Abroad Blog",
  //   description: "Curated articles, tips, and experiences from successful students.",
  //   icon: Newspaper,
  //   gradient: "from-violet-500 to-fuchsia-500",
  //   path: "study-abroad-blog",
  //   details: {
  //     content: ["Success stories", "Tips & tricks", "Country guides"],
  //     format: "Weekly newsletter + online access"
  //   }
  // },
];

export default function ServicesPreview() {
   const navigate = useNavigate();

  const handleLearnMore = (servicePath) => {
    navigate(`${servicePath}`);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-teal-50 via-white to-white overflow-hidden">
      {/* Decorative blur */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Everything You Need to Study Abroad
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We provide a complete support system for your international education journey.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Header row: Icon + Title */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.gradient} text-white shadow-md transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Icon size={22} />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* CTA */}
                <button 
                onClick={() => handleLearnMore(service.path)}
                className="inline-flex items-center gap-2 text-primary-600 font-medium group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight size={16} />
                </button>

                {/* Hover glow */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

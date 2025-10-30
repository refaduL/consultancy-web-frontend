// src/components/ServicesPreview.jsx
import {
  Globe,
  GraduationCap,
  BookOpen,
  UserCheck,
  FileText,
  Users,
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "University Admissions",
    description:
      "Expert guidance for undergraduate and graduate admissions worldwide.",
    icon: <GraduationCap size={32} />,
  },
  {
    id: 2,
    title: "Visa Assistance",
    description:
      "Complete support for student visa applications and documentation.",
    icon: <Globe size={32} />,
  },
  {
    id: 3,
    title: "Test Prep & Language Coaching",
    description:
      "Prepare for IELTS, TOEFL, GRE, GMAT and other exams with expert coaching.",
    icon: <BookOpen size={32} />,
  },
  {
    id: 4,
    title: "Scholarship Guidance",
    description:
      "Identify scholarships and funding opportunities to make education affordable.",
    icon: <FileText size={32} />,
  },
  {
    id: 5,
    title: "Career Counseling",
    description:
      "Personalized career advice to align studies with future goals.",
    icon: <UserCheck size={32} />,
  },
  {
    id: 6,
    title: "Pre-departure Support",
    description:
      "Assistance with travel, accommodation, and settling in your destination country.",
    icon: <Users size={32} />,
  },
];

export default function ServicesPreview() {
  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 bg-teal-50">
      <div className="max-w-7xl mx-auto text-center pt-12">

        <div className="text-center mb-16">
          <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Our Services
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            What We Offer
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
            A complete suite of services to guide your international education journey.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="group p-6 rounded-2xl bg-white border border-gray-200 hover:border-primary-400 hover:translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="p-4 mb-4 rounded-full bg-primary-100 text-primary-600 inline-flex transition-transform duration-300 group-hover:scale-110">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600">{service.description}</p>

              {/* Learn More Button */}
              <button className="mt-4 text-primary-600 font-medium hover:underline">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

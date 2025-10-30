// src/components/layout/Footer.jsx
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-100/70 backdrop-blur-md border-t border-neutral-300/40 pt-16 pb-10 relative overflow-hidden">
      {/* Soft Floating Pastel Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-primary-100/40 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-secondary-100/30 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Info */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-primary-700">EduGlobal</h2>
          <p className="text-neutral-600 text-sm leading-relaxed max-w-xs">
            Guiding students to global education excellence with transparency, care, and expertise.
          </p>
          <div className="flex gap-3 pt-2">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-soft border border-neutral-200 hover:bg-primary-100 hover:text-primary-700 transition duration-300"
              >
                <Icon className="w-4 h-4 text-primary-500" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-primary-500 mb-4">Quick Links</h4>
          <ul className="space-y-2 text-neutral-600 text-sm">
            {["Home", "Services", "Universities", "About", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="hover:text-primary-700 transition-colors duration-300"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-semibold text-primary-500 mb-4">Services</h4>
          <ul className="space-y-2 text-neutral-600 text-sm">
            {[
              "Career Counseling",
              "University Admissions",
              "Visa Assistance",
              "Scholarship Guidance",
              "Application Support",
            ].map((service) => (
              <li key={service} className="hover:text-primary-700 transition-colors duration-300">
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-primary-500 mb-4">Contact</h4>
          <ul className="space-y-3 text-neutral-600 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-primary-300" />
              <span>123 Global Avenue, Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 mt-0.5 text-primary-300" />
              <span>+880 123 456 789</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 mt-0.5 text-primary-300" />
              <span>info@eduglobal.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-neutral-500 text-sm gap-3 px-6 max-w-7xl mx-auto">
        <p>
          © {new Date().getFullYear()} <span className="text-primary-700 font-medium">EduGlobal</span>. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link to="#" className="hover:text-primary-700 transition-colors duration-300">Privacy Policy</Link>
          <Link to="#" className="hover:text-primary-700 transition-colors duration-300">Terms of Service</Link>
        </div>
      </div>

      {/* Floating Animations */}
      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float 8s ease-in-out infinite 2s; }
      `}</style>
    </footer>
  );
}

import { Link } from "react-router-dom";
import { Globe, MapPin, BookOpen, User, ArrowRight } from "lucide-react";

export default function UniversityCard ({ university }) {
  const { _id, name, type, nationalities, internationalStudents, location, totalPrograms, imageUrl } = university;

  return (
    <div className="p-8 group bg-gradient-to-br from-white via-gray-50 to-indigo-50 hover:from-indigo-50 hover:to-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 md:grid-cols-[2fr_1.5fr_auto] gap-6 md:items-center">
      
      {/* Left Section */}
      <div className="flex items-start gap-5">
        <img
          src="https://plus.unsplash.com/premium_photo-1683888229109-17cb0975af20?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1632"
          alt={name}
          className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border border-gray-200 shadow-sm flex-shrink-0"
        />
        <div className="min-w-0 flex flex-col justify-center">
          <Link
            to={`/universities/${_id}`}
            className="text-xl md:text-2xl font-bold text-gray-900 hover:text-indigo-700 transition-colors duration-200 leading-snug line-clamp-2"
          >
            {name}
          </Link>
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-red-500" />
            <span className="truncate">{location}</span>
          </div>
          <div className="mt-2 inline-block text-xs font-semibold text-indigo-700 bg-indigo-100/80 px-3 py-1 rounded-full w-fit">
            {type}
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex justify-between md:justify-start md:gap-10 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-8">
        <div className="text-center md:text-left">
          <div className="text-lg font-semibold text-blue-700">{nationalities}</div>
          <div className="flex items-center justify-center md:justify-start text-xs text-gray-500 mt-0.5">
            <Globe className="w-3.5 h-3.5 mr-1" /> Nations
          </div>
        </div>

        <div className="text-center md:text-left">
          <div className="text-lg font-semibold text-purple-700">
            {(internationalStudents / 1000).toFixed(1)}K+
          </div>
          <div className="flex items-center justify-center md:justify-start text-xs text-gray-500 mt-0.5">
            <User className="w-3.5 h-3.5 mr-1" /> Int. Students
          </div>
        </div>

        <div className="text-center md:text-left">
          <div className="text-lg font-semibold text-green-700">{totalPrograms}</div>
          <div className="flex items-center justify-center md:justify-start text-xs text-gray-500 mt-0.5">
            <BookOpen className="w-3.5 h-3.5 mr-1" /> Programs
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex justify-start md:justify-end items-center">
        <Link
          to={`/universities/${_id}`}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-primary-500 to-primary-300 hover:from-primary-500 hover:to-primary-300/70 text-white font-semibold py-3 px-7 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <span>View Details</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      
    </div>
  );
};
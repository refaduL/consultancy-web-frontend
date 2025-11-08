import { ArrowLeft, Award, Calendar, Check, DollarSign, Globe, GraduationCap, MapPin, Sparkles, Star, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUniversityById } from "../data/universitiesDB";
import BackButton from "../components/common/BackButton";

export default function UniversityDetail() {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getUniversityById(id);
    setUniversity(data || null);
    setLoading(false);
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading university data...</p>
        </div>
      </div>
    );

  if (!university)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-center px-4">
        <h1 className="text-5xl font-bold text-slate-900 mb-4">404</h1>
        <p className="text-slate-600 text-xl mb-6">University Not Found</p>
        <BackButton text="Back to Universities" />
      </div>
    );

  const { name, type, location, admission, international, ranking, programs, summary, imageUrl } = university;

  return (
    <div className="min-h-screen bg-gradient-default">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-red/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          <BackButton text="Back to Universities" />
          {/* <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full font-semibold transition-all shadow-lg shadow-indigo-200">
            Apply Now
          </button> */}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative md:pt-10 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://plus.unsplash.com/premium_photo-1683888229109-17cb0975af20?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1632"
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/85 to-white"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="px-4 py-1.5 bg-indigo-100 border border-indigo-200 rounded-full">
              <span className="text-indigo-700 text-sm font-semibold">
                {type}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">
                {location.city}, {location.country}
              </span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent leading-tight">
            {name}
          </h1>

          <p className="text-xl text-slate-700 max-w-3xl leading-relaxed">
            {summary}
          </p>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
            <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-slate-600 text-sm font-medium">
                  QS Rank
                </span>
              </div>
              <p className="text-3xl font-bold text-slate-900">
                #{ranking.worldQS}
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-slate-600 text-sm font-medium">
                  Intl. Students
                </span>
              </div>
              <p className="text-3xl font-bold text-slate-900">
                {international.internationalStudents.toLocaleString()}
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-green-500" />
                <span className="text-slate-600 text-sm font-medium">
                  Nationalities
                </span>
              </div>
              <p className="text-3xl font-bold text-slate-900">
                {international.nationalities}+
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <span className="text-slate-600 text-sm font-medium">
                  Acceptance
                </span>
              </div>
              <p className="text-3xl font-bold text-slate-900">
                {admission.acceptanceRate}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pb-20 mt-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Programs */}
            <section className="bg-gradient-to-br from-indigo-50 via-indigo-25 to-white rounded-2xl border border-indigo-100 p-8 shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Featured Programs
                </h2>
              </div>
              <div className="space-y-3">
                {programs.map((program, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-5 bg-white/90 hover:bg-indigo-50 rounded-xl transition-all border border-indigo-50 shadow-sm"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">
                        {program.name}
                      </h3>
                      <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <Calendar className="w-4 h-4 text-indigo-500" />
                        <span>{program.duration} years</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        ${(program.fee / 1000).toFixed(0)}K
                      </div>
                      <div className="text-xs text-slate-500">per year</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Admission Requirements */}
            <section className="bg-gradient-to-br from-purple-50 via-purple-25 to-white rounded-2xl border border-purple-100 p-8 shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center shadow-md shadow-purple-200">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Admission Requirements
                </h2>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-purple-100/60 rounded-xl p-4 border border-purple-200">
                  <div className="text-xs text-slate-600 mb-1 font-medium">
                    Application Fee
                  </div>
                  <div className="text-2xl font-bold text-slate-900">
                    £{admission.applicationFee}
                  </div>
                </div>
                <div className="bg-pink-100/60 rounded-xl p-4 border border-pink-200">
                  <div className="text-xs text-slate-600 mb-1 font-medium">
                    Deadline
                  </div>
                  <div className="text-2xl font-bold text-slate-900">
                    {admission.internationalDeadline}
                  </div>
                </div>
                <div className="bg-green-100/60 rounded-xl p-4 border border-green-200">
                  <div className="text-xs text-slate-600 mb-1 font-medium">
                    Acceptance
                  </div>
                  <div className="text-2xl font-bold text-slate-900">
                    {admission.acceptanceRate}%
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t border-purple-100 pt-6">
                {admission.entryRequirements.map((req, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-50"
                  >
                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-purple-600" />
                    </div>
                    <span className="text-slate-700 leading-relaxed">
                      {req}
                    </span>
                  </div>
                ))}
                {international.scholarshipOptions && (
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                    <Sparkles className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-800 font-semibold leading-relaxed">
                      Scholarships Available
                    </span>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Financial Info */}
            <section className="bg-gradient-to-br from-green-100/80 via-green-200/60 to-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-400/20 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-800" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Financial Details
                </h2>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-green-800 text-sm font-medium mb-2">
                    Annual Tuition Fee
                  </p>
                  <p className="text-3xl font-bold mb-1">
                    £{international.tuitionFee.toLocaleString()}
                  </p>
                  <p className="text-green-800 text-sm">
                    For international students
                  </p>
                </div>
                <div className="border-t border-green-200/40 pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-green-800" />
                    <p className="font-semibold text-slate-900">
                      International Community
                    </p>
                  </div>
                  <p className="text-2xl font-bold mb-1 text-green-700">
                    {international.internationalStudents.toLocaleString()}
                  </p>
                  <p className="text-green-800 text-sm">Students enrolled</p>
                </div>
              </div>
            </section>

            {/* Rankings */}
            <section className="bg-gradient-to-br from-yellow-50 via-yellow-25 to-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-yellow-400/30 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-yellow-800" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Global Rankings
                </h2>
              </div>
              <div className="space-y-3">
                {ranking.worldQS && (
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border border-yellow-100 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">🌎</span>
                      </div>
                      <span className="text-slate-700 font-medium">
                        QS World
                      </span>
                    </div>
                    <span className="text-xl font-bold text-yellow-600">
                      #{ranking.worldQS}
                    </span>
                  </div>
                )}
                {ranking.uk && (
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">🇬🇧</span>
                      </div>
                      <span className="text-slate-700 font-medium">
                        UK Rank
                      </span>
                    </div>
                    <span className="text-xl font-bold text-blue-600">
                      #{ranking.uk}
                    </span>
                  </div>
                )}
                {ranking.engineering && (
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-100 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">⚙️</span>
                      </div>
                      <span className="text-slate-700 font-medium">
                        Engineering
                      </span>
                    </div>
                    <span className="text-xl font-bold text-purple-600">
                      #{ranking.engineering}
                    </span>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

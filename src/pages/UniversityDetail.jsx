import {
  Award,
  BookOpen,
  Building2,
  Calendar,
  Check,
  Clock,
  DollarSign,
  Globe,
  GraduationCap,
  MapPin,
  Phone,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/common/BackButton";
import { fetchUniversityById } from "../services/universityService";

// ─── helpers ────────────────────────────────────────────────────────────────

function formatDeadline(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return "N/A";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getNextDeadline(programs = []) {
  const dates = programs
    .flatMap((p) => p.intakes ?? [])
    .map((i) => new Date(i.deadline))
    .filter((d) => !isNaN(d))
    .sort((a, b) => a - b);
  if (!dates.length) return "N/A";
  return dates[0].toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getIntakeSeasons(programs = []) {
  const seasons = new Set(
    programs.flatMap((p) => p.intakes ?? []).map((i) => i.season)
  );
  return [...seasons];
}

function countOpenIntakes(programs = []) {
  return programs
    .flatMap((p) => p.intakes ?? [])
    .filter((i) => i.status === "open").length;
}

function formatTuition(fee, currency, feeType) {
  if (!fee) return null;
  const formatted = Number(fee).toLocaleString();
  const label = feeType ? `/ ${feeType}` : "";
  return `${currency ?? ""} ${formatted} ${label}`.trim();
}

const degreeBadgeColor = {
  "PhD":        "bg-purple-100 text-purple-700",
  "Master's":   "bg-blue-100 text-blue-700",
  "Bachelor's": "bg-green-100 text-green-700",
  "Diploma":    "bg-orange-100 text-orange-700",
};

// ─── component ──────────────────────────────────────────────────────────────

export default function UniversityDetail() {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUniversity = async () => {
      try {
        const universityData = await fetchUniversityById(id);
        setUniversity(universityData.payload.university);
        setLoading(false);
      } catch (error) {
        console.error("University data load failed:", error);
        setLoading(false);
      }
    };
    loadUniversity();
  }, [id]);

  // ── loading ──────────────────────────────────────────────────────────────
  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 text-lg">Loading university data...</p>
        </div>
      </div>
    );

  // ── 404 ──────────────────────────────────────────────────────────────────
  if (!university)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-center px-4">
        <h1 className="text-5xl font-bold text-slate-900 mb-4">404</h1>
        <p className="text-slate-600 text-xl mb-6">University Not Found</p>
        <BackButton text="Back to Universities" />
      </div>
    );

  // ── destructure ───────────────────────────────────────────────────────────
  const {
    name,
    type,
    country,
    city,
    description,
    logo_url,
    website_url,
    rankings = {},
    contact_info = {},
    general_application_info,
    facilities = [],
    programs = [],
    scholarships = [],
    established_year,
  } = university;

  // ── derived ───────────────────────────────────────────────────────────────
  const nextDeadline  = getNextDeadline(programs);
  const intakeSeasons = getIntakeSeasons(programs);
  const openIntakes   = countOpenIntakes(programs);

  return (
    <div className="min-h-screen bg-gradient-default">

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <BackButton text="Back to Universities" />
          {website_url && (
            <a
              href={website_url}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full font-semibold transition-all shadow-lg shadow-indigo-200 text-sm"
            >
              Visit Website
            </a>
          )}
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className="relative md:pt-10 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://plus.unsplash.com/premium_photo-1683888229109-17cb0975af20?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1632"
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/85 to-white" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-12">

          {/* Badges row */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="px-4 py-1.5 bg-indigo-100 border border-indigo-200 rounded-full text-indigo-700 text-sm font-semibold">
              {type}
            </span>
            {established_year && (
              <span className="px-4 py-1.5 bg-slate-100 border border-slate-200 rounded-full text-slate-600 text-sm font-semibold">
                Est. {established_year}
              </span>
            )}
            {openIntakes > 0 && (
              <span className="px-4 py-1.5 bg-green-100 border border-green-200 rounded-full text-green-700 text-sm font-semibold">
                {openIntakes} Intake{openIntakes > 1 ? "s" : ""} Open
              </span>
            )}
            <div className="flex items-center gap-1.5 text-slate-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">{city}, {country}</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent leading-tight">
            {name}
          </h1>

          <p className="text-xl text-slate-700 max-w-3xl leading-relaxed">{description}</p>

          {/* ── Stats Bar ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
            <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-slate-600 text-sm font-medium">QS Rank</span>
              </div>
              <p className="text-3xl font-bold text-slate-900">
                {rankings.qs ? `#${rankings.qs}` : "—"}
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-blue-500" />
                <span className="text-slate-600 text-sm font-medium">Times Rank</span>
              </div>
              <p className="text-3xl font-bold text-slate-900">
                {rankings.times ? `#${rankings.times}` : "—"}
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-green-500" />
                <span className="text-slate-600 text-sm font-medium">Programs</span>
              </div>
              <p className="text-3xl font-bold text-slate-900">{programs.length}</p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-purple-500" />
                <span className="text-slate-600 text-sm font-medium">Scholarships</span>
              </div>
              <p className="text-3xl font-bold text-slate-900">{scholarships.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-6xl mx-auto px-6 pb-20 mt-16">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ══ Left Column ══ */}
          <div className="lg:col-span-2 space-y-6">

            {/* Programs */}
            <section className="bg-gradient-to-br from-indigo-50 via-indigo-25 to-white rounded-2xl border border-indigo-100 p-8 shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Programs</h2>
              </div>

              {programs.length > 0 ? (
                <div className="space-y-4">
                  {programs.map((program) => {
                    const tuitionDisplay = formatTuition(
                      program.tuition_fee,
                      program.currency,
                      program.tuition_fee_type
                    );
                    const firstIntake = program.intakes?.[0];
                    const isOpen = firstIntake?.status === "open";

                    return (
                      <div
                        key={program._id?.toString() ?? program.id}
                        className="p-5 bg-white/90 hover:bg-indigo-50 rounded-xl transition-all border border-indigo-50 shadow-sm"
                      >
                        {/* Name + status */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-slate-900 leading-snug">
                              {program.program_name}
                            </h3>
                            <p className="text-sm text-slate-500 mt-0.5">{program.field_of_study}</p>
                          </div>
                          {firstIntake && (
                            <span
                              className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${
                                isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                              }`}
                            >
                              {isOpen ? "Open" : "Closed"}
                            </span>
                          )}
                        </div>

                        {/* Meta chips */}
                        <div className="flex flex-wrap gap-2 items-center">
                          {program.degree_level && (
                            <span
                              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                                degreeBadgeColor[program.degree_level] ?? "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {program.degree_level}
                            </span>
                          )}
                          {program.duration && (
                            <div className="flex items-center gap-1 text-slate-500 text-xs">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{program.duration}</span>
                            </div>
                          )}
                          {program.study_mode && (
                            <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                              {program.study_mode}
                            </span>
                          )}
                          {tuitionDisplay && (
                            <div className="flex items-center gap-1 text-green-700 text-xs font-semibold ml-auto">
                              <DollarSign className="w-3.5 h-3.5" />
                              <span>{tuitionDisplay}</span>
                            </div>
                          )}
                        </div>

                        {/* Intake pills */}
                        {program.intakes?.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-indigo-50 flex flex-wrap gap-2">
                            {program.intakes.map((intake, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg"
                              >
                                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                                <span className="font-medium">{intake.season} {intake.year}</span>
                                <span className="text-slate-300">·</span>
                                <span>{formatDeadline(intake.deadline)}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* External link */}
                        {program.program_url && (
                          <a
                            href={program.program_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block mt-3 text-xs text-indigo-600 hover:underline font-medium"
                          >
                            View Program Page →
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-slate-400 text-sm">No programs available.</p>
              )}
            </section>

            {/* Scholarships */}
            {scholarships.length > 0 && (
              <section className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl border border-yellow-100 p-8 shadow-md">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center shadow-md shadow-yellow-200">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Scholarships</h2>
                </div>
                <div className="space-y-4">
                  {scholarships.map((s) => (
                    <div
                      key={s._id?.toString()}
                      className="p-5 bg-white/90 rounded-xl border border-yellow-100 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-base font-semibold text-slate-900">{s.scholarship_name}</h3>
                        {s.is_active && (
                          <span className="flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">
                            Active
                          </span>
                        )}
                      </div>
                      {s.description && (
                        <p className="text-sm text-slate-600 mb-3">{s.description}</p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {s.amount && (
                          <span className="text-xs font-semibold text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full">
                            💰 {s.amount}
                          </span>
                        )}
                        {s.eligible_nationalities?.length > 0 && (
                          <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                            🌍{" "}
                            {s.eligible_nationalities.length === 1
                              ? s.eligible_nationalities[0]
                              : `${s.eligible_nationalities.length} nationalities eligible`}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Admission Overview */}
            <section className="bg-gradient-to-br from-purple-50 via-purple-25 to-white rounded-2xl border border-purple-100 p-8 shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center shadow-md shadow-purple-200">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Admission Overview</h2>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-purple-100/60 rounded-xl p-4 border border-purple-200">
                  <div className="text-xs text-slate-600 mb-1 font-medium">Open Intakes</div>
                  <div className="text-2xl font-bold text-slate-900">{openIntakes}</div>
                </div>
                <div className="bg-pink-100/60 rounded-xl p-4 border border-pink-200">
                  <div className="text-xs text-slate-600 mb-1 font-medium">Next Deadline</div>
                  <div className="text-base font-bold text-slate-900 leading-tight">{nextDeadline}</div>
                </div>
                <div className="bg-indigo-100/60 rounded-xl p-4 border border-indigo-200">
                  <div className="text-xs text-slate-600 mb-1 font-medium">Seasons</div>
                  <div className="text-base font-bold text-slate-900 leading-tight">
                    {intakeSeasons.length ? intakeSeasons.join(", ") : "—"}
                  </div>
                </div>
              </div>

              {general_application_info && (
                <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700 leading-relaxed text-sm">{general_application_info}</p>
                </div>
              )}
            </section>

            {/* Facilities */}
            {facilities.length > 0 && (
              <section className="bg-gradient-to-br from-teal-50 to-white rounded-2xl border border-teal-100 p-8 shadow-md">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-md shadow-teal-200">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Facilities</h2>
                </div>
                <div className="space-y-3">
                  {facilities.map((facility, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 bg-teal-50 rounded-xl border border-teal-50"
                    >
                      <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-teal-600" />
                      </div>
                      <span className="text-slate-700 leading-relaxed">{facility}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ══ Right Column ══ */}
          <div className="space-y-6">

            {/* Contact */}
            <section className="bg-gradient-to-br from-green-100/80 via-green-200/60 to-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-green-400/20 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-green-800" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Contact</h2>
              </div>
              <div className="space-y-4">
                {contact_info.email && (
                  <div>
                    <p className="text-green-800 text-xs font-semibold uppercase tracking-wide mb-1">Email</p>
                    <a
                      href={`mailto:${contact_info.email}`}
                      className="text-slate-800 font-medium hover:text-indigo-600 transition-colors text-sm break-all"
                    >
                      {contact_info.email}
                    </a>
                  </div>
                )}
                {contact_info.phone && (
                  <div>
                    <p className="text-green-800 text-xs font-semibold uppercase tracking-wide mb-1">Phone</p>
                    <a
                      href={`tel:${contact_info.phone}`}
                      className="text-slate-800 font-medium hover:text-indigo-600 transition-colors text-sm"
                    >
                      {contact_info.phone}
                    </a>
                  </div>
                )}
                {contact_info.address && (
                  <div>
                    <p className="text-green-800 text-xs font-semibold uppercase tracking-wide mb-1">Address</p>
                    <p className="text-slate-700 text-sm leading-relaxed">{contact_info.address}</p>
                  </div>
                )}
                {website_url && (
                  <div>
                    <p className="text-green-800 text-xs font-semibold uppercase tracking-wide mb-1">Website</p>
                    <a
                      href={website_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 font-medium hover:underline text-sm break-all"
                    >
                      {website_url.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
              </div>
            </section>

            {/* Rankings */}
            <section className="bg-gradient-to-br from-yellow-50 via-yellow-25 to-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-yellow-400/30 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-yellow-800" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Global Rankings</h2>
              </div>
              <div className="space-y-3">
                {rankings.qs && (
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-yellow-100 rounded-lg flex items-center justify-center text-lg">🌎</div>
                      <span className="text-slate-700 font-medium text-sm">QS World</span>
                    </div>
                    <span className="text-xl font-bold text-yellow-600">#{rankings.qs}</span>
                  </div>
                )}
                {rankings.times && (
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center text-lg">🏛️</div>
                      <span className="text-slate-700 font-medium text-sm">Times Higher</span>
                    </div>
                    <span className="text-xl font-bold text-blue-600">#{rankings.times}</span>
                  </div>
                )}
                {rankings.us_news && (
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-100">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center text-lg">📰</div>
                      <span className="text-slate-700 font-medium text-sm">US News</span>
                    </div>
                    <span className="text-xl font-bold text-purple-600">#{rankings.us_news}</span>
                  </div>
                )}
                {!rankings.qs && !rankings.times && !rankings.us_news && (
                  <p className="text-slate-400 text-sm">No ranking data available.</p>
                )}
              </div>
            </section>

            {/* At a Glance */}
            <section className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-md text-white">
              <h2 className="text-lg font-bold mb-4 text-slate-100">At a Glance</h2>
              <div className="space-y-3">
                {[
                  { label: "Country",      value: country },
                  { label: "City",         value: city },
                  { label: "Type",         value: type },
                  { label: "Founded",      value: established_year },
                  { label: "Programs",     value: programs.length || "—" },
                  { label: "Scholarships", value: scholarships.length || "—" },
                  { label: "Intakes",      value: intakeSeasons.length ? intakeSeasons.join(", ") : "—" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center py-1.5 border-b border-slate-700/50 last:border-0"
                  >
                    <span className="text-slate-400 text-sm">{label}</span>
                    <span className="text-slate-100 text-sm font-semibold">{value ?? "—"}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
import { Link } from "react-router-dom";
import {
  ArrowRight, CheckCircle, FileText, Globe,
  GraduationCap, Search, MessageCircle, Clock, Award,
  Users, BookOpen, Sparkles, ChevronRight
} from "lucide-react";

const steps = [
  {
    number: "01", title: "Initial Consultation",
    description: "A free session with our expert counselors to map your academic background, career goals, and preferences.",
    icon: MessageCircle, duration: "30–45 min",
    bg: "bg-[#F1828D]/10 border-[#F1828D]/20", iconBg: "bg-[#F1828D]/15 text-[#c0525d]", num: "text-[#F1828D]",
  },
  {
    number: "02", title: "University Selection",
    description: "We shortlist universities matched to your profile, budget, and aspirations — balancing ambition with realism.",
    icon: Search, duration: "1–2 weeks",
    bg: "bg-[#3F6A8A]/8 border-[#3F6A8A]/18", iconBg: "bg-[#3F6A8A]/15 text-[#3F6A8A]", num: "text-[#3F6A8A]",
  },
  {
    number: "03", title: "Document Preparation",
    description: "Guidance on crafting your SOP, securing strong LORs, and compiling transcripts and test scores.",
    icon: FileText, duration: "2–3 weeks",
    bg: "bg-[#F1828D]/10 border-[#F1828D]/20", iconBg: "bg-[#F1828D]/15 text-[#c0525d]", num: "text-[#F1828D]",
  },
  {
    number: "04", title: "Application Submission",
    description: "We review every application for completeness and help you submit confidently before each deadline.",
    icon: Globe, duration: "1–2 weeks",
    bg: "bg-[#3F6A8A]/8 border-[#3F6A8A]/18", iconBg: "bg-[#3F6A8A]/15 text-[#3F6A8A]", num: "text-[#3F6A8A]",
  },
  {
    number: "05", title: "Interview Preparation",
    description: "Mock interviews, Q&A drills, and confidence-building sessions for admission interviews.",
    icon: Users, duration: "1 week",
    bg: "bg-[#FEFAD4] border-[#dfd280]/30", iconBg: "bg-[#dfd280]/40 text-[#7a6e1c]", num: "text-[#c4b030]",
  },
  {
    number: "06", title: "Offer & Acceptance",
    description: "Guidance on evaluating offers, negotiating scholarships, and making the right final decision.",
    icon: Award, duration: "Ongoing",
    bg: "bg-[#3F6A8A]/8 border-[#3F6A8A]/18", iconBg: "bg-[#3F6A8A]/15 text-[#3F6A8A]", num: "text-[#3F6A8A]",
  },
];

const documents = [
  "Academic transcripts (10th, 12th, Bachelor's)",
  "Passport copy",
  "Statement of Purpose (SOP)",
  "Letters of Recommendation (2–3)",
  "Updated CV / Resume",
  "Language test scores (IELTS / TOEFL)",
  "Work experience certificates (if applicable)",
  "Extra-curricular activity certificates",
  "Financial documents (if required)",
];

const tips = [
  "Start the process 6–8 months before your desired intake",
  "Research universities thoroughly before shortlisting",
  "Keep digital copies of all documents ready",
  "Apply to a mix of dream, target, and safety universities",
  "Never miss application deadlines",
  "Proofread every document before submission",
];

const stats = [
  { value: "95%", label: "Admission success rate", color: "text-[#3F6A8A]" },
  { value: "500+", label: "Partner universities", color: "text-[#8FB9A8]" },
  { value: "10+", label: "Years of experience", color: "text-[#F1828D]" },
  { value: "2,000+", label: "Students placed", color: "text-[#3F6A8A]" },
];

export default function UniversityAdmissions() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-28 pb-24 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(150deg, #FEFAD4 0%, #ffffff 45%, #fce9ea 100%)" }}
      >
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #8FB9A8, transparent)" }} />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #F1828D, transparent)" }} />

        <div className="relative max-w-4xl mx-auto text-center">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-7 bg-[#8FB9A8] text-white"
          >
            <GraduationCap className="w-4 h-4" />
            University Admissions
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-slate-900 leading-[1.1] mb-6">
            Your path to global education, simplified.
          </h1>

          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            From shortlisting universities to signing your acceptance letter — expert guidance at every step, completely free.
          </p>

          <div className="flex flex-col items-center justify-center gap-2">
            <Link
              to="/consultation"
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-300 hover:from-primary-500 hover:to-primary-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg group"
            >
              Get Free Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-sm text-slate-500 font-medium">No commitment · 100% free session</p>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────────── */}
      <section className="border-y border-slate-100 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`px-6 py-9 text-center ${i < 3 ? "sm:border-r border-slate-100" : ""} ${i < 2 ? "border-b sm:border-b-0 border-slate-100" : ""}`}
              >
                <p className={`text-3xl sm:text-4xl font-bold mb-1.5 text-[#3F6A8A]`}>{s.value}</p>
                <p className="text-sm text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process Steps ─────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: "#f8f9fa" }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#8FB9A8] text-white mb-4"
            >
              How it works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Our admission process</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className={`relative rounded-2xl p-6 border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${step.bg}`}
                >
                  <div className="flex items-start justify-between mb-5">
                    <span className={`text-5xl font-black opacity-15 select-none leading-none ${step.num}`}>
                      {step.number}
                    </span>
                    <div className={`p-2.5 rounded-xl ${step.iconBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-5">{step.description}</p>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {step.duration}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Documents ────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div className="lg:sticky lg:top-28">
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#8FB9A8] text-white mb-4"
              >
                What you'll need
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-5">Required documents</h2>
              <p className="text-base text-slate-500 leading-relaxed mb-8">
                Gather these documents early to avoid last-minute delays. Our counselors will provide a customised checklist based on your target universities.
              </p>
              <div
                className="p-5 rounded-2xl border"
                style={{ background: "#FEFAD4", borderColor: "#dfd280" }}
              >
                <p className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4" style={{ color: "#a89820" }} />
                  Counselor tip
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Start collecting documents 3 months before the deadline. Translation and notarisation can take weeks.
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {documents.map((doc, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-50 border border-transparent hover:border-[#8FB9A8]/40 hover:bg-[#8FB9A8]/5 transition-all duration-200 group"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 bg-[#8FB9A8]"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm text-slate-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tips ─────────────────────────────────────────────────── */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(135deg, #f0f7f4 0%, #ffffff 50%, #fef2f3 100%)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#8FB9A8] text-white mb-4"
            >
              From our counselors
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Tips for a strong application</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-[#8FB9A8] text-white"
                >
                  {i + 1}
                </span>
                <p className="text-sm text-slate-600 leading-relaxed pt-1">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us + CTA ─────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#8FB9A8] text-white mb-4"
              >
                Why choose us
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">Expert support, zero cost</h2>
              <ul className="space-y-4">
                {[
                  { icon: "🎓", title: "Expert counselors", sub: "10+ years guiding students worldwide", pill: "bg-[#8FB9A8]/15 text-[#3F6A8A]" },
                  { icon: "🌍", title: "Global partner network", sub: "500+ universities across 30+ countries", pill: "bg-[#F1828D]/10 text-[#c0525d]" },
                  { icon: "📄", title: "Document review", sub: "In-depth SOP, LOR, and CV feedback", pill: "bg-[#3F6A8A]/10 text-[#3F6A8A]" },
                  { icon: "🏆", title: "95% success rate", sub: "Proven track record of acceptances", pill: "bg-[#FEFAD4] text-[#7a6e1c]" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <span className={`text-xl w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.pill}`}>
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-400">{item.sub}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="relative rounded-2xl p-8 text-white overflow-hidden"
              style={{ background: "linear-gradient(135deg, #3F6A8A 0%, #8FB9A8 100%)" }}
            >
              <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full opacity-10" style={{ background: "#fff" }} />
              <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full opacity-10" style={{ background: "#F1828D" }} />
              <div className="relative">
                <div
                  className="p-3 rounded-xl w-fit mb-6"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                >
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Ready to apply?</h3>
                <p className="text-white/75 text-sm leading-relaxed mb-8">
                  Book a free 30-minute consultation. No obligation — just clear, honest advice tailored to your profile.
                </p>
                <Link
                  to="/consultation"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white font-semibold rounded-xl transition-all hover:shadow-lg group text-sm"
                  style={{ color: "#3F6A8A" }}
                >
                  Book free consultation
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <p className="text-white/40 text-xs mt-4">Limited slots available · Reserve yours today</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, CheckCircle, FileText, Calendar,
  Award, DollarSign, Search, Users, Clock, Target,
  ExternalLink, X, ChevronRight, Sparkles, TrendingUp
} from "lucide-react";

const scholarships = [
  { name: "Fulbright Scholarship", flag: "🇺🇸", country: "USA", level: "Master's & PhD", coverage: "Full tuition · Stipend · Travel", deadline: "October annually", tag: "Highly competitive", link: "https://foreign.fulbrightonline.org/", accent: "border-[#8FB9A8]/30 hover:border-[#8FB9A8]", badge: "bg-[#8FB9A8]/12 text-[#3F6A8A]" },
  { name: "Chevening Scholarship", flag: "🇬🇧", country: "UK", level: "Master's", coverage: "Full tuition · Living · Travel", deadline: "November annually", tag: "Leadership focused", link: "https://www.chevening.org/", accent: "border-[#F1828D]/25 hover:border-[#F1828D]", badge: "bg-[#F1828D]/10 text-[#c0525d]" },
  { name: "Australia Awards", flag: "🇦🇺", country: "Australia", level: "Bachelor's · Master's · PhD", coverage: "Full tuition · Living · Travel", deadline: "April annually", tag: "Development focus", link: "https://www.dfat.gov.au/people-to-people/australia-awards", accent: "border-[#3F6A8A]/20 hover:border-[#3F6A8A]", badge: "bg-[#3F6A8A]/10 text-[#3F6A8A]" },
  { name: "Erasmus Mundus", flag: "🇪🇺", country: "Europe", level: "Master's", coverage: "Full tuition · Living · Travel", deadline: "Varies by programme", tag: "Multi-country", link: "https://erasmus-plus.ec.europa.eu/erasmus-mundus", accent: "border-[#8FB9A8]/30 hover:border-[#8FB9A8]", badge: "bg-[#8FB9A8]/12 text-[#3F6A8A]" },
  { name: "Commonwealth Scholarship", flag: "🇬🇧", country: "UK", level: "Master's & PhD", coverage: "Full tuition · Living · Travel", deadline: "September annually", tag: "Commonwealth nations", link: "https://cscuk.fcdo.gov.uk/", accent: "border-[#F1828D]/25 hover:border-[#F1828D]", badge: "bg-[#F1828D]/10 text-[#c0525d]" },
  { name: "DAAD Scholarship", flag: "🇩🇪", country: "Germany", level: "Master's & PhD", coverage: "Stipend · Health · Travel", deadline: "Varies by programme", tag: "Research excellence", link: "https://www.daad.de/en/", accent: "border-[#3F6A8A]/20 hover:border-[#3F6A8A]", badge: "bg-[#3F6A8A]/10 text-[#3F6A8A]" },
  { name: "Vanier Canada Graduate", flag: "🇨🇦", country: "Canada", level: "PhD", coverage: "$50,000/year · 3 years", deadline: "November annually", tag: "Research leaders", link: "https://vanier.gc.ca/", accent: "border-[#8FB9A8]/30 hover:border-[#8FB9A8]", badge: "bg-[#8FB9A8]/12 text-[#3F6A8A]" },
  { name: "Gates Cambridge", flag: "🇬🇧", country: "UK", level: "Master's & PhD", coverage: "Full tuition · Living · Travel", deadline: "December annually", tag: "Academic excellence", link: "https://www.gatescambridge.org/", accent: "border-[#F1828D]/25 hover:border-[#F1828D]", badge: "bg-[#F1828D]/10 text-[#c0525d]" },
];

const tips = [
  { title: "Start early", description: "Begin 12–18 months before your intended start date.", icon: Calendar, color: "#8FB9A8" },
  { title: "Research broadly", description: "Explore multiple scholarship types — don't limit yourself.", icon: Search, color: "#F1828D" },
  { title: "Craft strong essays", description: "Your personal statement is your most powerful tool.", icon: FileText, color: "#3F6A8A" },
  { title: "Strong references", description: "Letters from professors who know your work well are crucial.", icon: Users, color: "#8FB9A8" },
  { title: "Maintain your GPA", description: "Most scholarships require a minimum GPA of 3.0 or higher.", icon: Target, color: "#F1828D" },
  { title: "Meet deadlines strictly", description: "Late applications are almost never accepted.", icon: Clock, color: "#3F6A8A" },
];

const documents = [
  "Academic transcripts (all degrees)",
  "Standardised test scores (GRE / GMAT / SAT)",
  "Language test scores (IELTS / TOEFL)",
  "Statement of Purpose (SOP)",
  "Letters of Recommendation (2–3)",
  "Updated CV / Resume",
  "Research proposal (for research scholarships)",
  "Portfolio (for creative programmes)",
  "Financial documents",
  "Passport copy",
];

const faqs = [
  { q: "When should I start applying for scholarships?", a: "Start researching 12–18 months before your intended start date. Most deadlines are 6–10 months before the programme begins." },
  { q: "Can I apply for multiple scholarships?", a: "Yes — we recommend applying to as many as you're eligible for to maximise your chances." },
  { q: "Do I need a high GPA?", a: "Not always. While merit scholarships require strong grades, many need-based and programme-specific scholarships have more flexible requirements." },
  { q: "What's your success rate?", a: "Our students have an 85% success rate in securing scholarships, with an average award of $15,000 per year." },
  { q: "Do you charge for guidance?", a: "Your initial consultation is free. We offer different support packages based on the level of assistance you need." },
];


export default function ScholarshipGuidance() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-28 pb-24 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(150deg, #fce9ea 0%, #ffffff 50%, #FEFAD4 100%)" }}
      >
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #F1828D, transparent)" }} />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #8FB9A8, transparent)" }} />

        <div className="relative max-w-4xl mx-auto text-center">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-7 bg-primary-500 text-white"
          >
            <Award className="w-4 h-4" />
            Scholarship Guidance
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-slate-900 leading-[1.1] mb-6">
            Fund your dream education with expert support.
            
          </h1>

          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover scholarships worth millions. We guide you from research to application — increasing your chances of securing the funding you deserve.
          </p>

          <div className="flex flex-col items-center justify-center gap-2">
            <Link
              to="/consultation"
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-300 hover:from-primary-500 hover:to-primary-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg group"
            >
              Get Free Scholarship Guidance
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-sm text-slate-500 font-medium">85% success rate · Free consultation</p>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────── */}
      <section className="border-y border-slate-100 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {[
              { value: "85%", label: "Scholarship success rate" },
              { value: "$15k+", label: "Avg. award per year" },
              { value: "50+", label: "Scholarships tracked" },
              { value: "500+", label: "Students funded" },
            ].map((s, i) => (
              <div key={s.label}
                className={`px-6 py-9 text-center ${i < 3 ? "sm:border-r border-slate-100" : ""} ${i < 2 ? "border-b sm:border-b-0 border-slate-100" : ""}`}>
                <p className={`text-3xl sm:text-4xl font-bold mb-1.5 text-[#8FB9A8]`}>{s.value}</p>
                <p className="text-sm text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scholarship Cards ─────────────────────────────────────── */}
      <section id="scholarships" className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: "#f8f9fa" }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#3F6A8A] text-white mb-4"
            >
              Featured opportunities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Top global scholarships</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {scholarships.map((s, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl border-2 p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col ${s.accent}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl">{s.flag}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${s.badge}`}>{s.country}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1 leading-snug">{s.name}</h3>
                <p className="text-xs text-slate-400 mb-4">{s.level}</p>

                <div className="space-y-2 flex-1">
                  <div className="flex items-start gap-2">
                    <DollarSign className="w-3.5 h-3.5 text-[#8FB9A8] mt-0.5 shrink-0" />
                    <span className="text-xs text-slate-600 leading-relaxed">{s.coverage}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-300 mt-0.5 shrink-0" />
                    <span className="text-xs text-slate-400">{s.deadline}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-300 italic">{s.tag}</span>
                  <a href={s.link} target="_blank" rel="noopener noreferrer"
                    className="text-[#3F6A8A] hover:text-[#8FB9A8] transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Application Tips ──────────────────────────────────────── */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100"
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#3F6A8A] text-white mb-4"
            >
              Application strategy
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Tips for winning scholarships</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tips.map((tip, i) => {
              const Icon = tip.icon;
              return (
                <div key={i} className="group flex items-start gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md hover:border-slate-200 transition-all duration-200">
                  <div
                    className="p-2.5 rounded-xl shrink-0 transition-transform group-hover:scale-110"
                    style={{ background: tip.color + "20" }}
                  >
                    <Icon className="w-4 h-4" style={{ color: tip.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-1.5">{tip.title}</p>
                    <p className="text-sm text-slate-500 leading-relaxed">{tip.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Documents + CTA ───────────────────────────────────────── */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(150deg, #f0f7f4 0%, #fff 55%, #fce9ea 100%)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div className="lg:sticky lg:top-28">
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#3F6A8A] text-white mb-4"
              >
                Document checklist
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-5">What you'll need to apply</h2>
              <p className="text-base text-slate-500 leading-relaxed mb-8">
                Most scholarship applications share a common set of documents. Our counselors help you tailor these to each specific opportunity.
              </p>
              <Link
                to="/consultation"
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-300 hover:from-primary-500 hover:to-primary-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg group"
              >
                Get personalised checklist
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {documents.map((doc, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:border-[#3F6A8A]/20 hover:shadow-md transition-all duration-200 group"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 bg-[#3F6A8A]/80"
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

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="mb-14 text-center">
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#3F6A8A] text-white mb-4"
            >
              Common questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Frequently asked questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#F1828D]/30 hover:bg-[#F1828D]/5 transition-all duration-200"
              >
                <p className="text-sm font-bold text-slate-900 mb-2">{item.q}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: "#f8f9fa" }}>
        <div className="max-w-3xl mx-auto">
          <div
            className="relative rounded-2xl p-10 sm:p-14 text-center text-white overflow-hidden"
            style={{ background: "linear-gradient(135deg, #3F6A8A 0%, #8FB9A8 100%)" }}
          >
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-10" style={{ background: "#fff" }} />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full opacity-10" style={{ background: "#F1828D" }} />
            <div className="relative">
              <div className="p-3 rounded-xl w-fit mx-auto mb-6" style={{ background: "rgba(255,255,255,0.15)" }}>
                <Award className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to fund your education?</h2>
              <p className="text-white/75 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
                Let our experts help you find and secure the right scholarships for your study abroad journey. Limited spots available for personalised guidance.
              </p>
              <Link
                to="/consultation"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white font-semibold rounded-xl transition-all hover:shadow-xl group text-sm"
                style={{ color: "#3F6A8A" }}
              >
                Fill out the eligibility form
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <p className="text-white/40 text-xs mt-4">*We only work with students who meet requirements</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
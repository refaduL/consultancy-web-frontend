import { Link } from "react-router-dom";
import {
  ArrowRight, CheckCircle, FileText, Globe,
  AlertCircle, Clock, Award, ExternalLink, Shield,
  ChevronRight, FileUser
} from "lucide-react";

const visaTypes = [
  {
    country: "Canada", flag: "🇨🇦", visaType: "Study Permit",
    processingTime: "8–12 weeks", fee: "CAD 150",
    requirements: [
      "Letter of Acceptance from DLI",
      "Proof of funds (CAD 10,000+ / year)",
      "Valid passport",
      "Medical examination",
      "IELTS / TOEFL scores",
      "Statement of Purpose",
    ],
    officialLink: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html",
    accent: "border-[#8FB9A8]/30 hover:border-[#8FB9A8]",
    badge: "bg-[#8FB9A8]/15 text-[#3F6A8A]",
  },
  {
    country: "Australia", flag: "🇦🇺", visaType: "Student Visa (500)",
    processingTime: "4–8 weeks", fee: "AUD 650",
    requirements: [
      "Confirmation of Enrolment (CoE)",
      "Genuine Temporary Entrant statement",
      "Proof of funds (AUD 21,041+ / year)",
      "Health insurance (OSHC)",
      "English proficiency",
      "Character requirements",
    ],
    officialLink: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
    accent: "border-[#F1828D]/25 hover:border-[#F1828D]",
    badge: "bg-[#F1828D]/10 text-[#c0525d]",
  },
  {
    country: "United Kingdom", flag: "🇬🇧", visaType: "Student Visa",
    processingTime: "3–6 weeks", fee: "GBP 363",
    requirements: [
      "CAS from licensed sponsor",
      "Proof of funds (maintenance)",
      "Valid passport",
      "Tuberculosis test (if applicable)",
      "English proficiency",
      "ATAS (if required)",
    ],
    officialLink: "https://www.gov.uk/student-visa",
    accent: "border-[#3F6A8A]/25 hover:border-[#3F6A8A]",
    badge: "bg-[#3F6A8A]/10 text-[#3F6A8A]",
  },
  {
    country: "USA", flag: "🇺🇸", visaType: "F-1 Student Visa",
    processingTime: "2–4 weeks", fee: "$160",
    requirements: [
      "I-20 form from SEVP school",
      "SEVIS fee payment receipt",
      "Valid passport",
      "Financial proof",
      "Visa interview appointment",
      "Ties to home country",
    ],
    officialLink: "https://travel.state.gov/content/travel/en/us-visas/study.html",
    accent: "border-[#8FB9A8]/30 hover:border-[#8FB9A8]",
    badge: "bg-[#8FB9A8]/15 text-[#3F6A8A]",
  },
  {
    country: "Germany", flag: "🇩🇪", visaType: "Student Visa",
    processingTime: "6–12 weeks", fee: "€75",
    requirements: [
      "University admission letter",
      "Blocked account (€11,208+ / year)",
      "Health insurance",
      "Valid passport",
      "Academic certificates",
      "Language proficiency",
    ],
    officialLink: "https://www.auswaertiges-amt.de/en/visa-service",
    accent: "border-[#F1828D]/25 hover:border-[#F1828D]",
    badge: "bg-[#F1828D]/10 text-[#c0525d]",
  },
  {
    country: "Ireland", flag: "🇮🇪", visaType: "Study Visa",
    processingTime: "4–8 weeks", fee: "€60",
    requirements: [
      "Letter of Acceptance",
      "Proof of funds (€7,000+ / year)",
      "Private health insurance",
      "Valid passport",
      "English proficiency",
      "Academic records",
    ],
    officialLink: "https://www.irishimmigration.ie/coming-to-study-in-ireland/",
    accent: "border-[#3F6A8A]/25 hover:border-[#3F6A8A]",
    badge: "bg-[#3F6A8A]/10 text-[#3F6A8A]",
  },
];

const documentCategories = [
  {
    category: "Personal Documents", icon: "🪪",
    items: ["Valid passport (6+ months validity)", "Passport-size photographs", "Birth certificate", "National ID card"],
    accent: "bg-[#8FB9A8]/10 border-[#8FB9A8]/20",
  },
  {
    category: "Academic Documents", icon: "🎓",
    items: ["University admission letter", "Academic transcripts & certificates", "IELTS / TOEFL scores", "Previous degree certificates"],
    accent: "bg-[#F1828D]/8 border-[#F1828D]/18",
  },
  {
    category: "Financial Documents", icon: "💳",
    items: ["Bank statements (last 6 months)", "Education loan sanction letter", "Scholarship award letter", "Income tax returns"],
    accent: "bg-[#8FB9A8]/10 border-[#8FB9A8]/20",
  },
  {
    category: "Additional Documents", icon: "📋",
    items: ["Statement of Purpose", "Medical examination reports", "Police clearance certificate", "Health insurance documents"],
    accent: "bg-[#3F6A8A]/8 border-[#3F6A8A]/18",
  },
];

const tips = [
  { text: "Apply as soon as you receive your university acceptance letter", color: "#8FB9A8" },
  { text: "Ensure your passport has 6+ months validity beyond your study period", color: "#F1828D" },
  { text: "Prepare genuine financial documents showing sufficient funds", color: "#3F6A8A" },
  { text: "Practice common visa interview questions beforehand", color: "#8FB9A8" },
  { text: "Be honest and confident during the visa interview", color: "#F1828D" },
  { text: "Never submit fraudulent documents — it results in permanent bans", color: "#3F6A8A" },
];

const faqs = [
  { q: "When should I apply for my student visa?", a: "Apply as soon as you receive your acceptance letter. Most countries allow applications 3–6 months before your course starts." },
  { q: "How much funds do I need to show?", a: "Typically enough to cover first-year tuition + living expenses — usually $10,000–$20,000+ depending on country." },
  { q: "Can I work while studying?", a: "Most countries allow part-time work (20 hrs/week during term, full-time during breaks). Check specific country regulations." },
  { q: "What if my visa gets rejected?", a: "You can reapply after addressing the rejection reasons. Some countries also offer an appeal process." },
  { q: "Do I need a medical exam?", a: "Many countries require medical examinations including chest X-rays and blood tests. Our counselors will advise based on your destination." },
];

export default function VisaAssistance() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-28 pb-24 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(150deg, #edf7f3 0%, #ffffff 50%, #FEFAD4 100%)" }}
      >
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #8FB9A8, transparent)" }} />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #3F6A8A, transparent)" }} />

        <div className="relative max-w-4xl mx-auto text-center">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-7 bg-[#3F6A8A] text-white"
          >
            <Globe className="w-4 h-4" />
            Visa Assistance
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-slate-900 leading-[1.1] mb-6">
            Navigate your student visa with confidence.
          </h1>

          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Complete documentation support, interview prep, and step-by-step guidance for your study visa, tailored to your destination.
          </p>

          <div className="flex flex-col items-center justify-center gap-2">
            <Link
              to="/consultation"
              className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-xl text-white transition-all duration-300 shadow-md hover:shadow-lg group"
              style={{ background: "linear-gradient(135deg, #3F6A8A 0%, #8FB9A8 100%)" }}
            >
              Fill Out The Eligibility Form
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-sm text-slate-400 font-medium">We only work with qualified applicants</p>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────── */}
      <section className="border-y border-slate-100 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {[
              { value: "95%", label: "Visa success rate" },
              { value: "6+", label: "Countries covered" },
              { value: "2,000+", label: "Visas processed" },
              { value: "48h", label: "Response time" },
            ].map((s, i) => (
              <div key={s.label}
                className={`px-6 py-9 text-center ${i < 3 ? "sm:border-r border-slate-100" : ""} ${i < 2 ? "border-b sm:border-b-0 border-slate-100" : ""}`}>
                <p className={`text-3xl sm:text-4xl font-bold mb-1.5 text-[#3F6A8A]`}>{s.value}</p>
                <p className="text-sm text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Country Visa Cards ────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: "#f8f9fa" }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#3F6A8A] text-white mb-4"
            >
              Country guide
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Visa requirements by country</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visaTypes.map((visa, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl border-2 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col ${visa.accent}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{visa.flag}</span>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-tight">{visa.country}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{visa.visaType}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg shrink-0 ml-2 ${visa.badge}`}>
                    {visa.fee}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  {visa.processingTime}
                </div>

                <ul className="space-y-2 flex-1">
                  {visa.requirements.map((req, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#8FB9A8] mt-0.5 shrink-0" />
                      <span className="text-xs text-slate-600 leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={visa.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#3F6A8A] hover:text-[#8FB9A8] transition-colors"
                >
                  Official website <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Documents ────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#3F6A8A] text-white mb-4"
            >
              Preparation checklist
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Documents you'll need</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {documentCategories.map((cat, i) => (
              <div key={i} className={`rounded-2xl border p-6 ${cat.accent}`}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xl w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
                    {cat.icon}
                  </span>
                  <h3 className="text-sm font-bold text-slate-800">{cat.category}</h3>
                </div>
                <ul className="space-y-2.5">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-[#3F6A8A]/80"
                      >
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-slate-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="mt-6 flex items-start gap-3 p-4 rounded-2xl border"
            style={{ background: "#FEFAD4", borderColor: "#dfd280" }}
          >
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#a89820" }} />
            <p className="text-sm" style={{ color: "#7a6e1c" }}>
              <span className="font-bold">Note: </span>
              Requirements vary by country and institution. Always verify on the official embassy website. Our counselors will provide a country-specific checklist.
            </p>
          </div>
        </div>
      </section>

      {/* ── Tips ─────────────────────────────────────────────────── */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(135deg, #f0f7f4 0%, #fff 60%, #fce9ea 100%)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#3F6A8A] text-white mb-4"
            >
              From our experts
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Tips for visa success</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-[#3F6A8A] text-white"
                >
                  {i + 1}
                </span>
                <p className="text-sm text-slate-600 leading-relaxed pt-1">{tip.text}</p>
              </div>
            ))}
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
                className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#8FB9A8]/40 hover:bg-[#8FB9A8]/5 transition-all duration-200"
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
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Need help with your visa?</h2>
              <p className="text-white/75 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
                We assist only students who are genuinely qualified and have complete documentation. Book a consultation to find out if we can help you.
              </p>
              <Link
                to="/consultation"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white font-semibold rounded-xl transition-all hover:shadow-xl group text-sm"
                style={{ color: "#3F6A8A" }}
              >
                Fill out the eligibility form
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <p className="text-white/40 text-xs mt-4">*We only work with students who meet visa requirements</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
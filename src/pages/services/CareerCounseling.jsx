import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, CheckCircle, Briefcase, TrendingUp, Users,
  Clock, Target, Award, Brain, Compass, Lightbulb,
  BarChart3, Code, Calculator, Microscope, Palette, Heart,
  Shield, MessageCircle, ChevronRight, X, Calendar,
  Star, Globe, BookOpen, Zap, UserCheck, Search
} from "lucide-react";

const inputCls = "w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#8FB9A8] focus:bg-white transition";
const labelCls = "block text-xs font-semibold text-slate-500 mb-1.5";

// ─── Data ─────────────────────────────────────────────────────────────────
const services = [
  {
    icon: Compass, title: "Career Direction Assessment",
    desc: "A structured 60-minute deep-dive into your interests, strengths, values, and personality type to chart a clear career direction.",
    tag: "Most popular", tagColor: "bg-[#8FB9A8]/15 text-[#3F6A8A]",
    details: ["Psychometric assessment (MBTI / Holland Codes)", "Strengths & values mapping", "1:1 debrief with counselor", "Written career direction report"],
  },
  {
    icon: BookOpen, title: "Higher Studies Planning",
    desc: "Match your career goals to the right degree, country, and university pathway — built around your profile and financial situation.",
    tag: "Academic focus", tagColor: "bg-[#3F6A8A]/10 text-[#3F6A8A]",
    details: ["Degree & country matching", "Program shortlisting", "Scholarship identification", "Application roadmap"],
  },
  {
    icon: Briefcase, title: "Industry & Role Exploration",
    desc: "In-depth research sessions on target industries, role requirements, salary bands, and day-to-day realities — so you choose with confidence.",
    tag: null, tagColor: null,
    details: ["Industry landscape briefing", "Role requirement mapping", "Salary benchmarking", "Informational interview coaching"],
  },
  {
    icon: UserCheck, title: "Job Search Strategy",
    desc: "A tactical plan for your job search — from crafting a standout CV and LinkedIn to interview preparation and offer negotiation.",
    tag: "For working professionals", tagColor: "bg-[#F1828D]/10 text-[#c0525d]",
    details: ["CV & cover letter review", "LinkedIn profile optimisation", "Job board & networking strategy", "Mock interviews with feedback"],
  },
  {
    icon: TrendingUp, title: "Career Switch Counseling",
    desc: "Structured guidance for mid-career professionals looking to pivot — identifying transferable skills and the fastest path forward.",
    tag: null, tagColor: null,
    details: ["Transferable skills audit", "Gap analysis & upskilling plan", "Pivot industry research", "Transition timeline planning"],
  },
  {
    icon: Zap, title: "Rapid Clarity Session",
    desc: "A focused 30-minute single-topic session for a specific career question — ideal if you have one burning decision to make.",
    tag: "30 min · free", tagColor: "bg-[#8FB9A8]/15 text-[#3F6A8A]",
    details: ["1 focused career question", "Expert counselor response", "Actionable next steps", "No prior booking required"],
  },
];

const careerPaths = [
  {
    field: "Technology & IT", icon: Code,
    roles: ["Software Developer", "Data Scientist", "AI Engineer", "Cloud Architect", "Cybersecurity Expert"],
    demand: "Very High", salary: "$80k – $150k", edu: "CS / IT Bachelor's or Master's",
    color: "#3F6A8A", bg: "bg-[#3F6A8A]/8 border-[#3F6A8A]/15",
  },
  {
    field: "Data Science & Analytics", icon: BarChart3,
    roles: ["Data Analyst", "Data Scientist", "BI Analyst", "ML Engineer"],
    demand: "Very High", salary: "$85k – $160k", edu: "Statistics / CS / Mathematics",
    color: "#8FB9A8", bg: "bg-[#8FB9A8]/10 border-[#8FB9A8]/20",
  },
  {
    field: "Business & Management", icon: Briefcase,
    roles: ["Business Analyst", "Marketing Manager", "HR Specialist", "Operations Manager"],
    demand: "High", salary: "$70k – $140k", edu: "BBA / MBA or equivalent",
    color: "#3F6A8A", bg: "bg-[#3F6A8A]/8 border-[#3F6A8A]/15",
  },
  {
    field: "Engineering", icon: Calculator,
    roles: ["Mechanical Engineer", "Civil Engineer", "Electrical Engineer", "Biomedical Engineer"],
    demand: "High", salary: "$75k – $130k", edu: "Engineering Bachelor's or Master's",
    color: "#8FB9A8", bg: "bg-[#8FB9A8]/10 border-[#8FB9A8]/20",
  },
  {
    field: "Healthcare & Medicine", icon: Heart,
    roles: ["Doctor", "Nurse", "Pharmacist", "Medical Researcher", "Healthcare Admin"],
    demand: "Very High", salary: "$90k – $200k+", edu: "Medical / Health Sciences degree",
    color: "#F1828D", bg: "bg-[#F1828D]/8 border-[#F1828D]/15",
  },
  {
    field: "Finance & Accounting", icon: TrendingUp,
    roles: ["Financial Analyst", "Accountant", "Investment Banker", "Auditor"],
    demand: "High", salary: "$75k – $150k", edu: "Finance / Accounting Bachelor's",
    color: "#3F6A8A", bg: "bg-[#3F6A8A]/8 border-[#3F6A8A]/15",
  },
  {
    field: "Research & Academia", icon: Microscope,
    roles: ["Research Scientist", "Professor", "Lab Manager", "Research Associate"],
    demand: "Medium", salary: "$60k – $120k", edu: "Master's / PhD required",
    color: "#8FB9A8", bg: "bg-[#8FB9A8]/10 border-[#8FB9A8]/20",
  },
  {
    field: "Creative Arts & Design", icon: Palette,
    roles: ["Graphic Designer", "UX/UI Designer", "Art Director", "Animator"],
    demand: "Medium-High", salary: "$55k – $110k", edu: "Design / Arts or equivalent",
    color: "#F1828D", bg: "bg-[#F1828D]/8 border-[#F1828D]/15",
  },
];

const process = [
  { step: "01", title: "Book a free 30-min clarity call", desc: "Tell us where you are and what's holding you back. We'll determine which service fits best.", icon: Calendar },
  { step: "02", title: "Complete your profile assessment", desc: "We send a short questionnaire covering your education, interests, skills, and career goals.", icon: Brain },
  { step: "03", title: "1:1 counseling session(s)", desc: "Deep-dive sessions with a dedicated career counselor, structured around your specific needs.", icon: MessageCircle },
  { step: "04", title: "Receive your career roadmap", desc: "A written, personalised action plan with clear milestones, resources, and accountability check-ins.", icon: Compass },
];

const testimonials = [
  { name: "Rafi Ahmed", role: "Software Engineer, Germany", text: "After 2 sessions I had a clear plan to pivot from accounting to tech. Got into a Master's in CS within 6 months.", initials: "RA", color: "#8FB9A8" },
  { name: "Nadia Islam", role: "Healthcare Admin, UK", text: "The career direction assessment pinpointed healthcare management — something I'd never considered. Best decision I made.", initials: "NI", color: "#3F6A8A" },
  { name: "Fahim Chowdhury", role: "Data Analyst, Canada", text: "The job search strategy session transformed my LinkedIn and resume. Had 3 interviews within 3 weeks.", initials: "FC", color: "#F1828D" },
];

const faqs = [
  { q: "Who is career counseling for?", a: "Students choosing a degree, recent graduates entering the job market, and working professionals seeking a career change or promotion strategy." },
  { q: "How many sessions will I need?", a: "Most clients see clarity after 2–3 sessions. Comprehensive career planning packages typically run 4–6 sessions over 6–8 weeks." },
  { q: "Are sessions online or in-person?", a: "All sessions are available online via video call. In-person is available on request for local clients." },
  { q: "Is the initial consultation really free?", a: "Yes — the first 30-minute clarity call is completely free. No commitment, no obligation." },
  { q: "Do you specialise in international careers?", a: "Yes. Our counselors have expertise in international higher education, global job markets, and cross-border career transitions." },
];

// ─── Consultation Modal ───────────────────────────────────────────────────
function ConsultModal({ onClose }) {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", level: "", mode: "", service: "", message: "" });
  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    alert("Thank you! Our career counselor will contact you within 24 hours.");
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[92vh]">
        <div className="flex items-center justify-between px-6 py-5 shrink-0 rounded-t-2xl"
          style={{ background: "linear-gradient(135deg, #3F6A8A, #8FB9A8)" }}>
          <div>
            <h2 className="text-base font-bold text-white">Book Free Career Consultation</h2>
            <p className="text-xs text-white/70 mt-0.5">30-minute clarity session · no commitment</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-white/70 hover:bg-white/15 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={submit} className="px-6 py-5 overflow-y-auto flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelCls}>Full Name *</label>
              <input name="fullName" required value={form.fullName} onChange={set} className={inputCls} placeholder="Your full name" />
            </div>
            <div>
              <label className={labelCls}>Email *</label>
              <input name="email" type="email" required value={form.email} onChange={set} className={inputCls} placeholder="you@example.com" />
            </div>
            <div>
              <label className={labelCls}>Phone *</label>
              <input name="phone" type="tel" required value={form.phone} onChange={set} className={inputCls} placeholder="+880..." />
            </div>
          </div>

          <div>
            <label className={labelCls}>I am currently a *</label>
            <select name="level" required value={form.level} onChange={set} className={inputCls}>
              <option value="">Select</option>
              <option>High School Student</option>
              <option>Undergraduate Student</option>
              <option>Graduate Student</option>
              <option>Early Career Professional (0–3 yrs)</option>
              <option>Mid-Career Professional (4+ yrs)</option>
            </select>
          </div>

          <div>
            <label className={labelCls}>Area of interest</label>
            <select name="service" value={form.service} onChange={set} className={inputCls}>
              <option value="">Select (optional)</option>
              <option>Career Direction Assessment</option>
              <option>Higher Studies Planning</option>
              <option>Industry & Role Exploration</option>
              <option>Job Search Strategy</option>
              <option>Career Switch Counseling</option>
              <option>Not sure yet</option>
            </select>
          </div>

          <div>
            <label className={labelCls}>Preferred consultation mode</label>
            <select name="mode" value={form.mode} onChange={set} className={inputCls}>
              <option value="">Select</option>
              <option>Online Video Call</option>
              <option>Phone Call</option>
              <option>In-Person (if available)</option>
            </select>
          </div>

          <div>
            <label className={labelCls}>Tell us about your situation (optional)</label>
            <textarea name="message" rows={3} value={form.message} onChange={set}
              className={inputCls + " resize-none"}
              placeholder="What career challenges are you facing? What are you hoping to achieve?" />
          </div>
        </form>

        <div className="px-6 py-4 border-t border-slate-100 shrink-0 flex gap-3">
          <button onClick={onClose} className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
            Cancel
          </button>
          <button onClick={submit}
            className="flex-1 px-4 py-2.5 text-sm font-bold text-white rounded-xl hover:opacity-90 hover:shadow-md transition-all"
            style={{ background: "linear-gradient(135deg, #3F6A8A, #8FB9A8)" }}>
            Book free consultation
          </button>
        </div>
        <p className="text-xs text-slate-400 text-center pb-4">We'll respond within 24 hours to confirm your slot.</p>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────
export default function CareerCounseling() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-28 pb-24 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(150deg, #edf7f3 0%, #ffffff 50%, #FEFAD4 100%)" }}
      >
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #3F6A8A, transparent)" }} />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #8FB9A8, transparent)" }} />

        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-7 text-white"
            style={{ background: "linear-gradient(135deg, #3F6A8A, #8FB9A8)" }}>
            <Compass className="w-4 h-4" />
            Career Counseling
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-slate-900 leading-[1.1] mb-6">
            Find clarity on your{" "}
            <span style={{
              background: "linear-gradient(135deg, #3F6A8A 0%, #8FB9A8 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              career path.
            </span>
          </h1>

          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            One-on-one guidance from expert counselors — whether you're choosing a degree, entering the job market, or considering a career change.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-xl text-white transition-all duration-300 shadow-md hover:shadow-lg group"
              style={{ background: "linear-gradient(135deg, #3F6A8A 0%, #8FB9A8 100%)" }}>
              Book Free Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Trust bar ────────────────────────────────────────────── */}
      <section className="border-y border-slate-100 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {[
              { value: "1,200+", label: "Clients counseled", color: "text-[#3F6A8A]" },
              { value: "95%", label: "Satisfaction rate", color: "text-[#8FB9A8]" },
              { value: "30+", label: "Countries placed", color: "text-[#F1828D]" },
              { value: "Free", label: "First session", color: "text-[#3F6A8A]" },
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

      {/* ── Services ─────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: "#f8f9fa" }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full text-white mb-4"
              style={{ background: "#3F6A8A" }}>
              What we offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Our counseling services</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-[#8FB9A8]/50 hover:shadow-md transition-all duration-200 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 rounded-xl" style={{ background: "#8FB9A8" + "20" }}>
                      <Icon className="w-5 h-5" style={{ color: "#3F6A8A" }} />
                    </div>
                    {svc.tag && (
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ml-2 ${svc.tagColor}`}>
                        {svc.tag}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{svc.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-5 flex-1">{svc.desc}</p>
                  <ul className="space-y-1.5 pt-4 border-t border-slate-100">
                    {svc.details.map((d, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: "#8FB9A8" }} />
                        <span className="text-xs text-slate-600">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full text-white mb-4"
              style={{ background: "linear-gradient(135deg, #3F6A8A, #8FB9A8)" }}>
              How it works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Our counseling process</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative">
                  {i < process.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-px z-0"
                      style={{ background: "linear-gradient(90deg, #8FB9A8, transparent)" }} />
                  )}
                  <div className="relative z-10 bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-[#8FB9A8]/50 hover:bg-white hover:shadow-sm transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-black text-slate-300 select-none">{step.step}</span>
                      <div className="p-2 rounded-lg" style={{ background: "#8FB9A8" + "20" }}>
                        <Icon className="w-4 h-4" style={{ color: "#3F6A8A" }} />
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">{step.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Career Paths ─────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: "#f8f9fa" }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full text-white mb-4"
              style={{ background: "#8FB9A8" }}>
              Career exploration
            </span>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Popular career fields</h2>
              <p className="text-sm text-slate-400 max-w-xs">Explore paths we commonly advise on. Your counselor will help you go deeper into any of these.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {careerPaths.map((path, i) => {
              const Icon = path.icon;
              const demandColor = path.demand === "Very High" ? "#8FB9A8" : path.demand === "High" ? "#3F6A8A" : "#F1828D";
              return (
                <div key={i} className={`rounded-2xl border p-5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 ${path.bg}`}>
                  <div className="p-2.5 rounded-xl w-fit mb-4" style={{ background: path.color + "20" }}>
                    <Icon className="w-5 h-5" style={{ color: path.color }} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1 leading-snug">{path.field}</h3>

                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ background: demandColor, fontSize: "10px" }}>
                      {path.demand}
                    </span>
                    <span className="text-xs text-slate-400">demand</span>
                  </div>

                  <p className="text-xs font-bold text-slate-700 mb-1">Avg. salary</p>
                  <p className="text-xs text-slate-500 mb-3">{path.salary}</p>

                  <p className="text-xs font-bold text-slate-700 mb-1">Common roles</p>
                  <div className="flex flex-wrap gap-1">
                    {path.roles.slice(0, 3).map((r) => (
                      <span key={r} className="text-xs bg-white text-slate-600 px-2 py-0.5 rounded-lg border border-slate-200">{r}</span>
                    ))}
                    {path.roles.length > 3 && (
                      <span className="text-xs text-slate-400 px-1 py-0.5">+{path.roles.length - 3} more</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full text-white mb-4"
              style={{ background: "#F1828D" }}>
              Success stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">What our clients say</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:border-slate-200 hover:shadow-sm transition-all">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-current" style={{ color: "#8FB9A8" }} />
                  ))}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: t.color }}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-tight">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why us ───────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: "#f8f9fa" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full text-white mb-4"
                style={{ background: "#3F6A8A" }}>
                Why choose us
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">
                Counseling that's honest, structured, and actionable.
              </h2>
              <div className="space-y-4">
                {[
                  { title: "Qualified career counselors", sub: "Certified professionals with 5+ years in career guidance and international education.", color: "#8FB9A8" },
                  { title: "Data-informed recommendations", sub: "Salary benchmarking, job market trends, and demand forecasting — not just opinions.", color: "#3F6A8A" },
                  { title: "No one-size-fits-all advice", sub: "Every plan is built around your background, constraints, and goals — not a template.", color: "#F1828D" },
                  { title: "Long-term accountability", sub: "Optional check-in sessions to track progress against your roadmap over 3–6 months.", color: "#8FB9A8" },
                  { title: "International expertise", sub: "Specialised knowledge of global job markets, visa pathways, and overseas study.", color: "#3F6A8A" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100 hover:border-slate-200 transition-colors">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: item.color }}>
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA card */}
            <div className="relative rounded-2xl p-8 text-white overflow-hidden"
              style={{ background: "linear-gradient(135deg, #3F6A8A 0%, #8FB9A8 100%)" }}>
              <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full opacity-10" style={{ background: "#fff" }} />
              <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full opacity-10" style={{ background: "#F1828D" }} />
              <div className="relative">
                <div className="p-3 rounded-xl w-fit mb-6" style={{ background: "rgba(255,255,255,0.15)" }}>
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Not sure where to start?</h3>
                <p className="text-white/75 text-sm leading-relaxed mb-4">
                  That's exactly what the free clarity call is for. 30 minutes with a counselor — no pressure, no agenda — just honest guidance.
                </p>
                <ul className="space-y-2 mb-8">
                  {["Understand your options clearly", "Identify what's holding you back", "Get a clear recommended next step"].map((p, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-white/60 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white font-semibold rounded-xl transition-all hover:shadow-lg group text-sm"
                  style={{ color: "#3F6A8A" }}>
                  Book free consultation
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <p className="text-white/40 text-xs mt-4">Responds within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="mb-14 text-center">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full text-white mb-4"
              style={{ background: "linear-gradient(135deg, #3F6A8A, #8FB9A8)" }}>
              Common questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Frequently asked questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#8FB9A8]/40 hover:bg-[#8FB9A8]/5 transition-all duration-200">
                <p className="text-sm font-bold text-slate-900 mb-2">{item.q}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────── */}
      {/* <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: "#f8f9fa" }}>
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-2xl p-10 sm:p-14 text-center text-white overflow-hidden"
            style={{ background: "linear-gradient(135deg, #3F6A8A 0%, #8FB9A8 100%)" }}>
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-10" style={{ background: "#fff" }} />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full opacity-10" style={{ background: "#F1828D" }} />
            <div className="relative">
              <div className="p-3 rounded-xl w-fit mx-auto mb-6" style={{ background: "rgba(255,255,255,0.15)" }}>
                <Compass className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to find your direction?</h2>
              <p className="text-white/75 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
                Career clarity doesn't come from waiting. Book your free 30-minute session and take the first real step.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white font-semibold rounded-xl transition-all hover:shadow-xl group text-sm"
                style={{ color: "#3F6A8A" }}>
                Book free career consultation
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <p className="text-white/40 text-xs mt-4">1,200+ clients counseled · 95% satisfaction</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* ── Modal ────────────────────────────────────────────────── */}
      {showModal && <ConsultModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
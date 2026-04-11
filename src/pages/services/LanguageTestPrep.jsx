import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, CheckCircle, FileText, Clock, Award,
  Users, BookOpen, Target, Calendar, Star, X,
  Headphones, Mic, PenTool, MessageCircle, ChevronRight, Sparkles
} from "lucide-react";

// ─── shared style tokens ─────────────────────────────────────────────────
const inputCls =
  "w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#8FB9A8] focus:bg-white transition";
const labelCls = "block text-xs font-semibold text-slate-500 mb-1.5";

// ─── course data ─────────────────────────────────────────────────────────
const courses = [
  {
    id: "ielts",
    name: "IELTS",
    fullName: "International English Language Testing System",
    icon: BookOpen,
    tag: "Most popular",
    duration: "8 weeks",
    classesPerWeek: 3,
    totalHours: 48,
    price: 399,
    batchSize: "10–12 students",
    targetScore: "Band 6.5 – 8.0",
    successRate: 92,
    color: "#8FB9A8",        // sage
    lightBg: "bg-[#8FB9A8]/10 border-[#8FB9A8]/25",
    pillBg: "bg-[#8FB9A8]/15 text-[#3F6A8A]",
    modules: [
      { icon: Headphones, label: "Listening", detail: "4 sections · 40 questions" },
      { icon: BookOpen,   label: "Reading",   detail: "3 sections · 40 questions" },
      { icon: PenTool,    label: "Writing",   detail: "Task 1 (Report) · Task 2 (Essay)" },
      { icon: Mic,        label: "Speaking",  detail: "Face-to-face interview · 3 parts" },
    ],
    features: [
      "60+ hours of live instruction",
      "20+ full-length practice tests",
      "Personalised study plan",
      "Weekly mock tests with feedback",
      "One-on-one speaking practice",
      "Writing evaluation with corrections",
      "Recorded session replay access",
      "All study materials included",
    ],
    schedule: [
      "Morning Batch  ·  09:00–11:00  ·  Mon / Wed / Fri",
      "Evening Batch  ·  18:00–20:00  ·  Tue / Thu / Sat",
      "Weekend Batch  ·  10:00–16:00  ·  Sat / Sun",
    ],
  },
  {
    id: "toefl",
    name: "TOEFL",
    fullName: "Test of English as a Foreign Language",
    icon: FileText,
    tag: "US university focused",
    duration: "8 weeks",
    classesPerWeek: 3,
    totalHours: 48,
    price: 399,
    batchSize: "10–12 students",
    targetScore: "90 – 110+",
    successRate: 89,
    color: "#3F6A8A",        // steel blue
    lightBg: "bg-[#3F6A8A]/8 border-[#3F6A8A]/18",
    pillBg: "bg-[#3F6A8A]/12 text-[#3F6A8A]",
    modules: [
      { icon: BookOpen,   label: "Reading",   detail: "3–4 passages · 30–40 questions" },
      { icon: Headphones, label: "Listening", detail: "4–6 lectures · 2–3 conversations" },
      { icon: Mic,        label: "Speaking",  detail: "4 tasks (independent + integrated)" },
      { icon: PenTool,    label: "Writing",   detail: "2 tasks (integrated + independent)" },
    ],
    features: [
      "50+ hours of live instruction",
      "15+ full-length practice tests",
      "Official TOEFL practice materials",
      "Speaking & writing evaluation",
      "Note-taking strategies",
      "Time management techniques",
      "Recorded session replay access",
      "All study materials included",
    ],
    schedule: [
      "Morning Batch  ·  09:00–11:00  ·  Mon / Wed / Fri",
      "Evening Batch  ·  18:00–20:00  ·  Tue / Thu / Sat",
      "Weekend Batch  ·  10:00–16:00  ·  Sat / Sun",
    ],
  },
  {
    id: "pte",
    name: "PTE",
    fullName: "Pearson Test of English",
    icon: Target,
    tag: "Fast results",
    duration: "6 weeks",
    classesPerWeek: 3,
    totalHours: 36,
    price: 349,
    batchSize: "10–12 students",
    targetScore: "65 – 79+",
    successRate: 91,
    color: "#F1828D",        // coral
    lightBg: "bg-[#F1828D]/10 border-[#F1828D]/22",
    pillBg: "bg-[#F1828D]/12 text-[#c0525d]",
    modules: [
      { icon: Mic,        label: "Speaking & Writing", detail: "7 task types" },
      { icon: BookOpen,   label: "Reading",            detail: "5 task types" },
      { icon: Headphones, label: "Listening",          detail: "8 task types" },
    ],
    features: [
      "40+ hours of live instruction",
      "10+ full-length practice tests",
      "AI-scored practice sessions",
      "Template-based strategies",
      "Time-saving techniques",
      "Quick score improvement focus",
      "Recorded session replay access",
      "All study materials included",
    ],
    schedule: [
      "Morning Batch  ·  09:00–11:00  ·  Mon / Wed / Fri",
      "Evening Batch  ·  18:00–20:00  ·  Tue / Thu / Sat",
      "Weekend Batch  ·  10:00–16:00  ·  Sat / Sun",
    ],
  },
];

const faqs = [
  { q: "Do you offer online classes?", a: "Yes — both online and offline. Online classes are live interactive sessions with the same curriculum and full support." },
  { q: "What is the batch size?", a: "We cap each batch at 10–12 students to ensure each student gets individual attention." },
  { q: "Are study materials included?", a: "All materials, practice tests, and resources are bundled into the course fee — no hidden extras." },
  { q: "What if I miss a class?", a: "Every session is recorded. You can replay it anytime or attend the same session in a parallel batch." },
  { q: "Is there a money-back guarantee?", a: "Yes. If you're not satisfied after the first week, we issue a full refund — no questions asked." },
];

// ─── Enrollment Modal ─────────────────────────────────────────────────────
function EnrollModal({ course, onClose }) {
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", preferredBatch: "",
    currentScore: "", targetScore: "", message: "",
  });
  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    alert(`Enrollment submitted for ${course.name}! Our team will contact you within 24 hours.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[92vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 shrink-0 rounded-t-2xl"
          style={{ background: `linear-gradient(135deg, ${course.color}dd, ${course.color}99)` }}>
          <div>
            <h2 className="text-base font-bold text-white">{course.name} Preparation — Enroll</h2>
            <p className="text-xs text-white/70 mt-0.5">{course.duration} · ${course.price} · {course.batchSize}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-white/70 hover:bg-white/15 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={submit} className="px-6 py-5 overflow-y-auto flex-1 space-y-4">

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelCls}>Full Name *</label>
              <input name="fullName" required value={form.fullName} onChange={set}
                className={inputCls} placeholder="Your full name" />
            </div>
            <div>
              <label className={labelCls}>Email *</label>
              <input name="email" type="email" required value={form.email} onChange={set}
                className={inputCls} placeholder="you@example.com" />
            </div>
            <div>
              <label className={labelCls}>Phone *</label>
              <input name="phone" type="tel" required value={form.phone} onChange={set}
                className={inputCls} placeholder="+880..." />
            </div>
          </div>

          <div>
            <label className={labelCls}>Preferred Batch *</label>
            <select name="preferredBatch" required value={form.preferredBatch} onChange={set} className={inputCls}>
              <option value="">Select a batch</option>
              <option>Morning Batch (09:00 – 11:00 · Mon/Wed/Fri)</option>
              <option>Evening Batch (18:00 – 20:00 · Tue/Thu/Sat)</option>
              <option>Weekend Batch (10:00 – 16:00 · Sat/Sun)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Current Score (if any)</label>
              <input name="currentScore" value={form.currentScore} onChange={set}
                className={inputCls} placeholder={course.id === "ielts" ? "e.g. Band 5.5" : "e.g. 70"} />
            </div>
            <div>
              <label className={labelCls}>Target Score</label>
              <input name="targetScore" value={form.targetScore} onChange={set}
                className={inputCls} placeholder={course.targetScore.split(" ")[0]} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Additional notes (optional)</label>
            <textarea name="message" rows={3} value={form.message} onChange={set}
              className={inputCls + " resize-none"} placeholder="Any specific questions or requirements?" />
          </div>

          {/* Course summary strip */}
          <div className="rounded-xl border p-4 space-y-2" style={{ background: course.color + "0f", borderColor: course.color + "30" }}>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Enrollment summary</p>
            {[
              ["Course", `${course.name} Preparation`],
              ["Duration", course.duration],
              ["Total hours", `${course.totalHours} hrs`],
              ["Batch size", course.batchSize],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between text-sm">
                <span className="text-slate-500">{k}</span>
                <span className="font-semibold text-slate-800">{v}</span>
              </div>
            ))}
            <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-100 mt-2">
              <span className="text-slate-500">Total fee</span>
              <span className="font-bold text-lg" style={{ color: course.color }}>${course.price}</span>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 shrink-0 flex gap-3">
          <button onClick={onClose} className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
            Cancel
          </button>
          <button onClick={submit}
            className="flex-1 px-4 py-2.5 text-sm font-bold text-white rounded-xl transition-all hover:opacity-90 hover:shadow-md"
            style={{ background: `linear-gradient(135deg, ${course.color}, ${course.color}bb)` }}>
            Submit Enrollment
          </button>
        </div>
        <p className="text-xs text-slate-400 text-center pb-4">
          We'll contact you within 24 hours to confirm and share payment details.
        </p>
      </div>
    </div>
  );
}

// ─── Course Card ──────────────────────────────────────────────────────────
function CourseCard({ course, onEnroll }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = course.icon;

  return (
    <div className={`rounded-2xl border-2 bg-white transition-all duration-200 hover:shadow-lg ${course.lightBg}`}>
      {/* Card header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl" style={{ background: course.color + "20" }}>
              <Icon className="w-5 h-5" style={{ color: course.color }} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{course.name}</h3>
              <p className="text-xs text-slate-400">{course.fullName}</p>
            </div>
          </div>
          {course.tag && (
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ml-2 ${course.pillBg}`}>
              {course.tag}
            </span>
          )}
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Duration", value: course.duration },
            { label: "Hours", value: `${course.totalHours}h` },
            { label: "Success", value: `${course.successRate}%` },
          ].map((s) => (
            <div key={s.label} className="bg-white/60 rounded-xl p-3 text-center">
              <p className="text-base font-bold text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Score target */}
        <div className="flex items-center gap-2 mb-5 p-3 rounded-xl bg-white/60">
          <Star className="w-4 h-4 shrink-0" style={{ color: course.color }} />
          <p className="text-xs text-slate-500">Target score:</p>
          <p className="text-sm font-bold text-slate-900">{course.targetScore}</p>
        </div>

        {/* Modules */}
        <div className="space-y-2 mb-5">
          {course.modules.map((m) => {
            const MIcon = m.icon;
            return (
              <div key={m.label} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/70">
                <MIcon className="w-3.5 h-3.5 shrink-0" style={{ color: course.color }} />
                <span className="text-xs font-semibold text-slate-700 w-24 shrink-0">{m.label}</span>
                <span className="text-xs text-slate-400">{m.detail}</span>
              </div>
            );
          })}
        </div>

        {/* Toggle features */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-semibold flex items-center gap-1 mb-4 transition-colors"
          style={{ color: course.color }}
        >
          {expanded ? "Hide details" : "Show all features & schedule"}
          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-90" : ""}`} />
        </button>

        {expanded && (
          <div className="space-y-4 mb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">What's included</p>
              <div className="grid grid-cols-1 gap-1.5">
                {course.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: course.color }} />
                    <span className="text-xs text-slate-600">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Available batches</p>
              <div className="space-y-1.5">
                {course.schedule.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 shrink-0" style={{ color: course.color }} />
                    <span className="text-xs text-slate-600">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Price + Enroll */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100/60">
          <div>
            <p className="text-2xl font-bold text-slate-900">${course.price}</p>
            <p className="text-xs text-slate-400">full course · all materials</p>
          </div>
          <button
            onClick={() => onEnroll(course)}
            className="inline-flex items-center gap-2 px-5 py-2.5 font-bold text-sm text-white rounded-xl transition-all hover:opacity-90 hover:shadow-md group"
            style={{ background: `linear-gradient(135deg, ${course.color} 0%, ${course.color}bb 100%)` }}
          >
            Enroll now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────
export default function LanguageTestPrep() {
  const [enrollCourse, setEnrollCourse] = useState(null);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-28 pb-24 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(150deg, #FEFAD4 0%, #ffffff 50%, #edf7f3 100%)" }}
      >
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #8FB9A8, transparent)" }} />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #F1828D, transparent)" }} />

        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-7 text-white"
            style={{ background: "linear-gradient(135deg, #8FB9A8, #3F6A8A)" }}>
            <BookOpen className="w-4 h-4" />
            Language Test Preparation
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-slate-900 leading-[1.1] mb-6">
            Achieve your target score:{" "}
            <span style={{
              background: "linear-gradient(135deg, #8FB9A8 0%, #3F6A8A 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              the first time.
            </span>
          </h1>

          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Expert coaching for IELTS, TOEFL, and PTE with proven strategies, small-batch attention, and a money-back guarantee.
          </p>

          <div className="flex flex-col items-center justify-center gap-2">
            <a href="#courses"
              className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-xl text-white transition-all duration-300 shadow-md hover:shadow-lg group"
              style={{ background: "linear-gradient(135deg, #8FB9A8 0%, #3F6A8A 100%)" }}>
              View Courses
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-sm text-slate-400 font-medium">Next batch starts soon · Limited seats</p>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────── */}
      <section className="border-y border-slate-100 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {[
              { value: "90%+", label: "Average success rate", color: "text-[#8FB9A8]" },
              { value: "10–12", label: "Students per batch", color: "text-[#3F6A8A]" },
              { value: "3 tests", label: "IELTS · TOEFL · PTE", color: "text-[#F1828D]" },
              { value: "500+", label: "Students trained", color: "text-[#3F6A8A]" },
            ].map((s, i) => (
              <div key={s.label}
                className={`px-6 py-9 text-center ${i < 3 ? "sm:border-r border-slate-100" : ""} ${i < 2 ? "border-b sm:border-b-0 border-slate-100" : ""}`}>
                <p className={`text-3xl sm:text-4xl font-bold mb-1.5 ${s.color}`}>{s.value}</p>
                <p className="text-sm text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Courses ──────────────────────────────────────────────── */}
      <section id="courses" className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: "#f8f9fa" }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full text-white mb-4"
              style={{ background: "#3F6A8A" }}>
              Our courses
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Choose your preparation course</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c) => (
              <CourseCard key={c.id} course={c} onEnroll={setEnrollCourse} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Teaching approach ─────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full text-white mb-4"
                style={{ background: "#8FB9A8" }}>
                Our approach
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-5">
                Small batches. Big results.
              </h2>
              <p className="text-base text-slate-500 leading-relaxed mb-8">
                We believe language tests are a skill, not luck. Our structured curriculum combines technique, timed practice, and personalised feedback to build real confidence — not just familiarity.
              </p>
              <ul className="space-y-3">
                {[
                  { label: "Expert instructors", detail: "IELTS/TOEFL certified with 5+ years experience", color: "#8FB9A8" },
                  { label: "Adaptive study plans", detail: "Built around your current level and target score", color: "#3F6A8A" },
                  { label: "Weekly mock tests", detail: "Full-length tests with section-by-section analysis", color: "#F1828D" },
                  { label: "24/7 doubt support", detail: "Mentorship access outside class hours", color: "#8FB9A8" },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: item.color }}>
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Score progression visual */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-8 space-y-5">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Typical student journey</p>
              {[
                { week: "Week 1–2", label: "Diagnostic & foundation", note: "Baseline test · Identify weak areas · Set goal", pct: 20 },
                { week: "Week 3–4", label: "Skill building", note: "Targeted modules per section", pct: 45 },
                { week: "Week 5–6", label: "Strategy & speed", note: "Timed practice · Exam technique", pct: 68 },
                { week: "Week 7–8", label: "Full mock tests", note: "Simulate real exam conditions", pct: 88 },
              ].map((item) => (
                <div key={item.week}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <span className="text-xs font-bold text-slate-900">{item.label}</span>
                      <span className="text-xs text-slate-400 ml-2">— {item.week}</span>
                    </div>
                    <span className="text-xs font-bold" style={{ color: "#8FB9A8" }}>{item.pct}%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${item.pct}%`, background: "linear-gradient(90deg, #8FB9A8, #3F6A8A)" }} />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: "#f8f9fa" }}>
        <div className="max-w-3xl mx-auto">
          <div className="mb-14 text-center">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full text-white mb-4"
              style={{ background: "linear-gradient(135deg, #8FB9A8, #3F6A8A)" }}>
              Common questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Frequently asked questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-slate-100 hover:border-[#8FB9A8]/40 hover:bg-[#8FB9A8]/5 transition-all duration-200">
                <p className="text-sm font-bold text-slate-900 mb-2">{item.q}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-2xl p-10 sm:p-14 text-center text-white overflow-hidden"
            style={{ background: "linear-gradient(135deg, #3F6A8A 0%, #8FB9A8 100%)" }}>
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-10" style={{ background: "#fff" }} />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full opacity-10" style={{ background: "#F1828D" }} />
            <div className="relative">
              <div className="p-3 rounded-xl w-fit mx-auto mb-6" style={{ background: "rgba(255,255,255,0.15)" }}>
                <Award className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to hit your target score?</h2>
              <p className="text-white/75 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
                Join our next batch and get expert coaching built around your goals. Seats fill fast — enroll early.
              </p>
              <a href="#courses"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white font-semibold rounded-xl transition-all hover:shadow-xl group text-sm"
                style={{ color: "#3F6A8A" }}>
                View courses & enroll
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <p className="text-white/40 text-xs mt-4">Money-back guarantee · All materials included</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Enrollment Modal ──────────────────────────────────────── */}
      {enrollCourse && <EnrollModal course={enrollCourse} onClose={() => setEnrollCourse(null)} />}
    </div>
  );
}
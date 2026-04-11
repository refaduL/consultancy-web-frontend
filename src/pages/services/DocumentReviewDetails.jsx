import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileCheck, ArrowLeft, Clock, Users, MessageCircle,
  Shield, CheckCircle, FileText, Eye, MessageSquare,
  Phone, ChevronRight, Star, Upload, Sparkles, AlertCircle
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────
const processSteps = [
  {
    step: "01", title: "Submit Request",
    desc: "Fill out the form and upload your documents. We accept PDF, Word, and image files up to 5 MB each.",
    icon: FileText,
  },
  {
    step: "02", title: "Expert Review",
    desc: "Our study-abroad consultants read every document line-by-line, checking accuracy and completeness.",
    icon: Eye,
  },
  {
    step: "03", title: "Detailed Feedback",
    desc: "You receive a written report with specific suggestions, corrections, and a priority action list.",
    icon: MessageSquare,
  },
  {
    step: "04", title: "Consultation Call",
    desc: "A 30-minute call with your assigned agent to walk through the report and answer your questions.",
    icon: Phone,
  },
];

const benefits = [
  {
    icon: Shield, title: "Expert verification",
    desc: "Reviewed by consultants with 5+ years of study-abroad admissions experience.",
  },
  {
    icon: MessageCircle, title: "Line-by-line feedback",
    desc: "Every section of every document is annotated — not a generic checklist.",
  },
  {
    icon: Clock, title: "3–5 business days",
    desc: "Fast turnaround as standard. Rush reviews available for urgent deadlines.",
  },
  {
    icon: Users, title: "Dedicated agent",
    desc: "One consistent consultant handles your review from submission to call.",
  },
];

const documentTypes = [
  "Academic Transcripts",
  "Degree Certificates",
  "Statement of Purpose (SOP)",
  "Letters of Recommendation",
  "CV / Resume",
  "Passport Copy",
  "Language Test Scores (IELTS / TOEFL)",
  "Financial Documents",
  "Portfolio (if applicable)",
  "Research Proposal (for PhD)",
];

const faqs = [
  {
    q: "How long does the review process take?",
    a: "Typically 3–5 business days from submission. Rush reviews are available for urgent cases — contact us to discuss.",
  },
  {
    q: "Is this service free?",
    a: "The initial document review is completely free. Premium consultation packages for complex applications may have a fee — we'll be upfront about that.",
  },
  {
    q: "Can I upload multiple documents at once?",
    a: "Yes. You can upload up to 10 documents per submission (PDF, Word, or image files — max 5 MB each).",
  },
  {
    q: "What happens after I submit?",
    a: "Our team reviews your documents, prepares a written feedback report, then contacts you within 24 hours to schedule a consultation call.",
  },
  {
    q: "Do you guarantee university admission?",
    a: "We strengthen your application — but admission decisions belong to universities. What we guarantee is thorough, honest feedback.",
  },
];

const stats = [
  { value: "3–5 days", label: "Turnaround time", color: "text-[#8FB9A8]" },
  { value: "10", label: "Documents per submission", color: "text-[#3F6A8A]" },
  { value: "Free", label: "Initial review", color: "text-[#F1828D]" },
  { value: "100%", label: "Human reviewed", color: "text-[#3F6A8A]" },
];

// ─── Accordion FAQ Item ───────────────────────────────────────────────────
function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
        open ? "border-[#8FB9A8]/40 bg-[#8FB9A8]/5" : "border-slate-100 bg-slate-50 hover:border-slate-200 hover:bg-white"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
      >
        <span className="text-sm font-bold text-slate-900 pr-4">{faq.q}</span>
        <ChevronRight
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${open ? "rotate-90 text-[#8FB9A8]" : "text-slate-300"}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────
export default function DocumentReviewDetails() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-28 pb-24 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(150deg, #edf7f3 0%, #ffffff 50%, #FEFAD4 100%)" }}
      >
        {/* Blobs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #8FB9A8, transparent)" }} />

        <div className="relative max-w-4xl mx-auto">
          {/* Back link */}
          <button
            onClick={() => navigate("/services")}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </button>

          <div className="text-center">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-7 text-white"
              style={{ background: "linear-gradient(135deg, #8FB9A8, #3F6A8A)" }}
            >
              <FileCheck className="w-4 h-4" />
              Document Review
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-slate-900 leading-[1.1] mb-6">
              Get your application documents{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #8FB9A8 0%, #3F6A8A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                reviewed by experts.
              </span>
            </h1>

            <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Professional, line-by-line feedback on your SOP, transcripts, CV, and more —
              so your application is as strong as it can be before submission.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate("/consultation")}
                className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-xl text-white transition-all duration-300 shadow-md hover:shadow-lg group"
                style={{ background: "linear-gradient(135deg, #8FB9A8 0%, #3F6A8A 100%)" }}
              >
                Start Free Review
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <p className="text-sm text-slate-400 font-medium">Free · No commitment · 3–5 day turnaround</p>
            </div>
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
                className={`px-6 py-9 text-center
                  ${i < 3 ? "sm:border-r border-slate-100" : ""}
                  ${i < 2 ? "border-b sm:border-b-0 border-slate-100" : ""}`}
              >
                <p className={`text-3xl sm:text-4xl font-bold mb-1.5 ${s.color}`}>{s.value}</p>
                <p className="text-sm text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: "#f8f9fa" }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full text-white mb-4"
              style={{ background: "linear-gradient(135deg, #8FB9A8, #3F6A8A)" }}
            >
              How it works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">From submission to consultation</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="relative">
                  {/* connector line */}
                  {i < processSteps.length - 1 && (
                    <div
                      className="hidden lg:block absolute top-8 left-full w-full h-px z-0"
                      style={{ background: "linear-gradient(90deg, #8FB9A8, transparent)" }}
                    />
                  )}
                  <div className="relative z-10 bg-white rounded-2xl border border-slate-200 p-5 hover:border-[#8FB9A8]/50 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-4xl font-black text-slate-100 select-none leading-none">{step.step}</span>
                      <div className="p-2 rounded-lg ml-auto" style={{ background: "#8FB9A8" + "20" }}>
                        <Icon className="w-4 h-4" style={{ color: "#3F6A8A" }} />
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Documents + Benefits split ────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14">

            {/* Documents we review */}
            <div>
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full text-white mb-4"
                style={{ background: "#8FB9A8" }}
              >
                What we review
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Documents we cover</h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-7">
                We review all standard study-abroad application documents. If yours isn't on this list, submit it anyway — we'll take a look.
              </p>
              <div className="space-y-2.5">
                {documentTypes.map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-transparent hover:border-[#8FB9A8]/35 hover:bg-[#8FB9A8]/5 transition-all duration-200 group"
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                      style={{ background: "linear-gradient(135deg, #8FB9A8, #3F6A8A)" }}
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm text-slate-700">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full text-white mb-4"
                style={{ background: "#3F6A8A" }}
              >
                Why choose us
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">What makes this different</h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-7">
                This isn't a template checklist. Every review is carried out by a human consultant who has read thousands of study-abroad applications.
              </p>
              <div className="space-y-4">
                {benefits.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all duration-200"
                    >
                      <div
                        className="p-2.5 rounded-xl shrink-0"
                        style={{ background: "#8FB9A8" + "20" }}
                      >
                        <Icon className="w-4 h-4" style={{ color: "#3F6A8A" }} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 mb-1">{b.title}</p>
                        <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Tip callout */}
              <div
                className="mt-5 flex items-start gap-3 p-4 rounded-2xl border"
                style={{ background: "#FEFAD4", borderColor: "#dfd280" }}
              >
                <Sparkles className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#a89820" }} />
                <p className="text-sm" style={{ color: "#7a6e1c" }}>
                  <span className="font-bold">Pro tip: </span>
                  Submit your SOP first — it's the document that has the greatest impact on admission outcomes and the one most applicants under-prepare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── After submission timeline ─────────────────────────────── */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(135deg, #f0f7f4 0%, #fff 60%, #FEFAD4 100%)" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="mb-14 text-center">
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full text-white mb-4"
              style={{ background: "linear-gradient(135deg, #8FB9A8, #3F6A8A)" }}
            >
              After you submit
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">What happens next</h2>
          </div>

          <div className="relative">
            {/* vertical line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px hidden sm:block"
              style={{ background: "linear-gradient(180deg, #8FB9A8, #3F6A8A, transparent)" }}
            />

            <div className="space-y-6">
              {[
                { n: "1", title: "Request confirmation", detail: "Your documents are assigned to a consultant immediately.", time: "Within 2 hours" },
                { n: "2", title: "Document verification", detail: "Your consultant reads every page, flags issues, and compares your documents against university requirements for your target countries.", time: "Days 1–3" },
                { n: "3", title: "Written feedback report", detail: "A structured report is sent to you — covering what's strong, what needs improvement, and what's missing, with specific revision suggestions.", time: "Days 3–5" },
                { n: "4", title: "Consultation call", detail: "A 30-minute video or phone call with your assigned agent to walk through the report, answer questions, and define your next steps.", time: "Scheduled with you" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6 sm:pl-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 z-10"
                    style={{ background: i % 2 === 0 ? "#8FB9A8" : "#3F6A8A" }}
                  >
                    {item.n}
                  </div>
                  <div className="flex-1 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0"
                        style={{ background: "#8FB9A8" + "18", color: "#3F6A8A" }}
                      >
                        {item.time}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.detail}</p>
                  </div>
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
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full text-white mb-4"
              style={{ background: "linear-gradient(135deg, #8FB9A8, #3F6A8A)" }}
            >
              Common questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Frequently asked questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => <FaqItem key={i} faq={faq} />)}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────── */}
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
                <FileCheck className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to get started?</h2>
              <p className="text-white/75 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
                Submit your documents today and receive expert feedback within 3–5 business days — completely free.
              </p>
              <button
                onClick={() => navigate("/consultation")}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white font-semibold rounded-xl transition-all hover:shadow-xl group text-sm"
                style={{ color: "#3F6A8A" }}
              >
                Start free document review
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <p className="text-white/40 text-xs mt-4">Sign-up required · Responds within 24 hours</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
// NOT IN USE : JUST MOCKUP FOR REVIEW PAGE DESIGN & LAYOUT

import React, { useState } from "react";
import {
  CheckCircle, XCircle, Clock, ArrowLeft, User, GraduationCap,
  FileText, MessageSquare, StickyNote, Globe, Calendar, DollarSign,
  ChevronDown, ChevronUp, Send, AlertCircle, BookOpen, Award,
  Phone, Mail, MapPin, Shield, Eye, Download, CheckSquare, X,
  Briefcase, Layers, Activity
} from "lucide-react";

// ─── Mock Data matching your applicationModel & userModel ───────────────────

const mockApplication = {
  _id: "app_001",
  status: "submitted",
  timeline: {
    submittedAt: "2024-01-15T09:30:00Z",
    acceptedAt: null,
    approvedAt: null,
    rejectedAt: null,
  },
  user: {
    _id: "user_001",
    first_name: "Alex",
    last_name: "Brown",
    email: "alex.brown@email.com",
    phone: "+1 (555) 234-5678",
    date_of_birth: "1999-04-12",
    gender: "Male",
    nationality: "American",
    country_of_residence: "United States",
    city: "Boston",
    country: "USA",
    address: "123 Harvard Ave, Cambridge, MA",
    profile_picture_url: null,
    is_verified: true,
    last_login: "2024-01-15T08:00:00Z",
    social_links: {
      linkedin: "https://linkedin.com/in/alexbrown",
      portfolio: "https://alexbrown.dev",
    },
  },
  educationHistory: [
    {
      institution: "Boston University",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      graduationYear: 2023,
      gpa: "3.7/4.0",
      grade_scale: "4.0",
    },
    {
      institution: "Cambridge High School",
      degree: "High School Diploma",
      fieldOfStudy: "Science",
      graduationYear: 2019,
      gpa: "4.0/4.0",
      grade_scale: "4.0",
    },
  ],
  testScores: {
    ielts: { score: "7.5", date: "2023-09-10", url: null },
    toefl: { score: "110/120", date: "2024-01-15", url: null },
    gre: { score: "320/340", date: "2023-07-20", url: null },
    gmat: { score: null, date: null, url: null },
    duolingo: { score: null, date: null, url: null },
    pte: { score: null, date: null, url: null },
    other: [],
  },
  preferences: {
    preferredCountries: ["United Kingdom", "Canada", "Germany"],
    preferredFieldOfStudy: "Artificial Intelligence",
    preferredIntake: "Fall 2024",
  },
  financial_info: {
    funding_source: "Education Loan",
    budget_range_usd: "30000-50000",
  },
  documents: {
    transcript: { status: "uploaded", url: "#", required: true, adminFeedback: null, uploadedAt: "2024-01-14" },
    degreeCertificate: { status: "approved", url: "#", required: true, adminFeedback: null, uploadedAt: "2024-01-13" },
    englishTestScore: { status: "uploaded", url: "#", required: true, adminFeedback: null, uploadedAt: "2024-01-14" },
    statementOfPurpose: { status: "under_review", url: "#", required: true, adminFeedback: null, uploadedAt: "2024-01-12" },
    resume_cv: { status: "uploaded", url: "#", required: true, adminFeedback: null, uploadedAt: "2024-01-11" },
    letterOfRecommendation1: { status: "not_uploaded", url: null, required: true, adminFeedback: null, uploadedAt: null },
    letterOfRecommendation2: { status: "not_uploaded", url: null, required: true, adminFeedback: null, uploadedAt: null },
    passportCopy: { status: "approved", url: "#", required: true, adminFeedback: null, uploadedAt: "2024-01-10" },
    portfolio: { status: "not_uploaded", url: null, required: false, adminFeedback: null, uploadedAt: null },
    workExperienceLetter: { status: "not_uploaded", url: null, required: false, adminFeedback: null, uploadedAt: null },
  },
  comments: [
    {
      _id: "c1",
      sender: { first_name: "Alex", last_name: "Brown", role: "student" },
      message: "I have uploaded all the required documents. Please let me know if anything else is needed.",
      createdAt: "2024-01-15T10:00:00Z",
    },
    {
      _id: "c2",
      sender: { first_name: "Sarah", last_name: "Agent", role: "agent" },
      message: "Thank you Alex! We are reviewing your Statement of Purpose. Please also upload your recommendation letters as soon as possible.",
      createdAt: "2024-01-15T14:30:00Z",
    },
  ],
  internalNotes: [
    {
      _id: "n1",
      agent: { first_name: "Sarah", last_name: "Agent" },
      note: "Strong GRE score. GPA slightly below our usual threshold but SOP is excellent. Recommend accepting.",
      createdAt: "2024-01-15T15:00:00Z",
    },
  ],
  createdAt: "2024-01-10T08:00:00Z",
  updatedAt: "2024-01-15T14:30:00Z",
};

// ─── Helpers ────────────────────────────────────────────────────────────────

const statusConfig = {
  draft:      { label: "Draft",     color: "bg-slate-100 text-slate-600",   icon: Clock,        dot: "bg-slate-400" },
  submitted:  { label: "Submitted", color: "bg-amber-100 text-amber-700",   icon: Clock,        dot: "bg-amber-400" },
  accepted:   { label: "Accepted",  color: "bg-blue-100 text-blue-700",     icon: CheckCircle,  dot: "bg-blue-500" },
  approved:   { label: "Approved",  color: "bg-emerald-100 text-emerald-700",icon: CheckCircle, dot: "bg-emerald-500" },
  rejected:   { label: "Rejected",  color: "bg-red-100 text-red-700",       icon: XCircle,      dot: "bg-red-500" },
};

const docStatusConfig = {
  not_uploaded:  { label: "Not Uploaded",  color: "text-slate-400",   bg: "bg-slate-50",    badge: "bg-slate-100 text-slate-500" },
  uploaded:      { label: "Uploaded",      color: "text-blue-600",    bg: "bg-blue-50",     badge: "bg-blue-100 text-blue-700" },
  under_review:  { label: "Under Review",  color: "text-amber-600",   bg: "bg-amber-50",    badge: "bg-amber-100 text-amber-700" },
  approved:      { label: "Approved",      color: "text-emerald-600", bg: "bg-emerald-50",  badge: "bg-emerald-100 text-emerald-700" },
  rejected:      { label: "Rejected",      color: "text-red-600",     bg: "bg-red-50",      badge: "bg-red-100 text-red-700" },
};

const docLabels = {
  transcript: "Academic Transcript",
  degreeCertificate: "Degree Certificate",
  englishTestScore: "English Test Score",
  statementOfPurpose: "Statement of Purpose",
  resume_cv: "Resume / CV",
  letterOfRecommendation1: "Recommendation Letter 1",
  letterOfRecommendation2: "Recommendation Letter 2",
  passportCopy: "Passport Copy",
  portfolio: "Portfolio",
  workExperienceLetter: "Work Experience Letter",
};

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

const formatDateTime = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionCard({ title, icon: Icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
            <Icon className="w-4 h-4 text-indigo-600" />
          </div>
          <span className="font-semibold text-sm text-slate-800">{title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>
      {open && <div className="px-6 pb-6 pt-1 border-t border-slate-100">{children}</div>}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start gap-2 py-2 border-b border-slate-50 last:border-0">
      <span className="text-xs text-slate-400 w-40 shrink-0 pt-0.5">{label}</span>
      <span className="text-sm text-slate-700 font-medium">{value || "—"}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.draft;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cfg.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}></span>
      {cfg.label}
    </span>
  );
}

function DocBadge({ status }) {
  const cfg = docStatusConfig[status] || docStatusConfig.not_uploaded;
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cfg.badge}`}>
      {cfg.label}
    </span>
  );
}

// ─── Sections ────────────────────────────────────────────────────────────────

function StudentProfile({ user }) {
  const initials = `${user.first_name[0]}${user.last_name?.[0] || ""}`;
  return (
    <div className="mt-3 space-y-1">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
          {initials}
        </div>
        <div>
          <div className="font-bold text-slate-900">{user.first_name} {user.last_name}</div>
          <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
            <Shield className="w-3 h-3 text-emerald-500" />
            {user.is_verified ? "Verified account" : "Unverified"}
          </div>
        </div>
      </div>
      <InfoRow label="Email" value={user.email} />
      <InfoRow label="Phone" value={user.phone} />
      <InfoRow label="Date of Birth" value={formatDate(user.date_of_birth)} />
      <InfoRow label="Gender" value={user.gender} />
      <InfoRow label="Nationality" value={user.nationality} />
      <InfoRow label="Country of Residence" value={user.country_of_residence} />
      <InfoRow label="City / Country" value={`${user.city || ""}${user.city && user.country ? ", " : ""}${user.country || ""}`} />
      <InfoRow label="Address" value={user.address} />
      <InfoRow label="Last Login" value={formatDateTime(user.last_login)} />
      {user.social_links?.linkedin && (
        <InfoRow label="LinkedIn" value={<a href={user.social_links.linkedin} className="text-indigo-600 hover:underline text-xs" target="_blank" rel="noreferrer">{user.social_links.linkedin}</a>} />
      )}
    </div>
  );
}

function EducationSection({ history }) {
  return (
    <div className="mt-3 space-y-3">
      {history.map((edu, i) => (
        <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-semibold text-sm text-slate-800">{edu.institution}</div>
              <div className="text-xs text-slate-500 mt-0.5">{edu.degree} · {edu.fieldOfStudy}</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-indigo-600">GPA {edu.gpa}</div>
              <div className="text-xs text-slate-400">{edu.graduationYear}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TestScoresSection({ scores }) {
  const tests = ["ielts", "toefl", "gre", "gmat", "duolingo", "pte"];
  const active = tests.filter(t => scores[t]?.score);
  if (active.length === 0) return <p className="text-xs text-slate-400 mt-3">No test scores submitted.</p>;
  return (
    <div className="mt-3 grid grid-cols-2 gap-3">
      {active.map(t => (
        <div key={t} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t}</div>
          <div className="text-lg font-bold text-slate-800 mt-1">{scores[t].score}</div>
          <div className="text-xs text-slate-400">{formatDate(scores[t].date)}</div>
        </div>
      ))}
    </div>
  );
}

function PreferencesSection({ prefs, financial }) {
  return (
    <div className="mt-3 space-y-1">
      <InfoRow label="Field of Study" value={prefs.preferredFieldOfStudy} />
      <InfoRow label="Intake" value={prefs.preferredIntake} />
      <InfoRow label="Countries" value={prefs.preferredCountries.join(", ")} />
      <InfoRow label="Funding Source" value={financial.funding_source} />
      <InfoRow label="Budget (USD)" value={financial.budget_range_usd ? `$${financial.budget_range_usd}` : "—"} />
    </div>
  );
}

function DocumentsSection({ documents, onDocAction }) {
  const [feedbackDoc, setFeedbackDoc] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  return (
    <div className="mt-3 space-y-2">
      {Object.entries(documents).map(([key, doc]) => {
        const label = docLabels[key] || key;
        const cfg = docStatusConfig[doc.status] || docStatusConfig.not_uploaded;
        const canAct = doc.status === "uploaded" || doc.status === "under_review";

        return (
          <div key={key} className={`rounded-xl border p-3 ${cfg.bg} border-slate-200`}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <FileText className={`w-4 h-4 shrink-0 ${cfg.color}`} />
                <div>
                  <div className="text-xs font-medium text-slate-700">{label}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <DocBadge status={doc.status} />
                    {!doc.required && <span className="text-xs text-slate-400">Optional</span>}
                    {doc.uploadedAt && <span className="text-xs text-slate-400">{formatDate(doc.uploadedAt)}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {doc.url && (
                  <a href={doc.url} target="_blank" rel="noreferrer">
                    <button className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 transition-colors" title="View">
                      <Eye className="w-3.5 h-3.5 text-slate-500 hover:text-indigo-600" />
                    </button>
                  </a>
                )}
                {canAct && (
                  <>
                    <button
                      onClick={() => onDocAction(key, "approved")}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-emerald-50 hover:border-emerald-200 transition-colors" title="Approve"
                    >
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                    </button>
                    <button
                      onClick={() => setFeedbackDoc(feedbackDoc === key ? null : key)}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-red-50 hover:border-red-200 transition-colors" title="Reject"
                    >
                      <X className="w-3.5 h-3.5 text-red-500" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Inline feedback input */}
            {feedbackDoc === key && (
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={feedbackText}
                  onChange={e => setFeedbackText(e.target.value)}
                  placeholder="Reason for rejection..."
                  className="flex-1 text-xs px-3 py-2 bg-white border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                />
                <button
                  onClick={() => { onDocAction(key, "rejected", feedbackText); setFeedbackDoc(null); setFeedbackText(""); }}
                  className="px-3 py-2 bg-red-500 text-white text-xs font-medium rounded-lg hover:bg-red-600 transition-colors"
                >
                  Reject
                </button>
              </div>
            )}

            {doc.adminFeedback && (
              <div className="mt-2 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-1.5">
                <span className="font-medium">Feedback:</span> {doc.adminFeedback}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function CommentsSection({ comments, onSend }) {
  const [msg, setMsg] = useState("");
  return (
    <div className="mt-3 space-y-3">
      {comments.map(c => {
        const isAgent = c.sender.role === "agent";
        return (
          <div key={c._id} className={`flex gap-3 ${isAgent ? "flex-row-reverse" : ""}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${isAgent ? "bg-indigo-500" : "bg-slate-400"}`}>
              {c.sender.first_name[0]}
            </div>
            <div className={`max-w-xs ${isAgent ? "items-end" : "items-start"} flex flex-col`}>
              <div className={`text-xs font-medium mb-1 text-slate-500 ${isAgent ? "text-right" : ""}`}>
                {c.sender.first_name} {c.sender.last_name} · {formatDateTime(c.createdAt)}
              </div>
              <div className={`text-xs text-slate-700 px-3 py-2 rounded-xl leading-relaxed ${isAgent ? "bg-indigo-50 border border-indigo-100" : "bg-slate-100 border border-slate-200"}`}>
                {c.message}
              </div>
            </div>
          </div>
        );
      })}
      <div className="flex gap-2 pt-2 border-t border-slate-100">
        <input
          type="text"
          value={msg}
          onChange={e => setMsg(e.target.value)}
          onKeyDown={e => e.key === "Enter" && msg && (onSend(msg), setMsg(""))}
          placeholder="Reply to student..."
          className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <button
          onClick={() => { if (msg) { onSend(msg); setMsg(""); }}}
          className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function InternalNotesSection({ notes, onAdd }) {
  const [note, setNote] = useState("");
  return (
    <div className="mt-3 space-y-3">
      {notes.map(n => (
        <div key={n._id} className="bg-amber-50 border border-amber-100 rounded-xl p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-amber-700">{n.agent.first_name} {n.agent.last_name}</span>
            <span className="text-xs text-amber-500">{formatDateTime(n.createdAt)}</span>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">{n.note}</p>
        </div>
      ))}
      <div className="flex gap-2 pt-2 border-t border-slate-100">
        <input
          type="text"
          value={note}
          onChange={e => setNote(e.target.value)}
          onKeyDown={e => e.key === "Enter" && note && (onAdd(note), setNote(""))}
          placeholder="Add internal note (agent-only)..."
          className="flex-1 text-xs px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300"
        />
        <button
          onClick={() => { if (note) { onAdd(note); setNote(""); }}}
          className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium rounded-xl transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
}

function Timeline({ timeline, status }) {
  const stages = [
    { key: "draft",     label: "Draft",     date: null },
    { key: "submitted", label: "Submitted", date: timeline.submittedAt },
    { key: "accepted",  label: "Accepted",  date: timeline.acceptedAt },
    { key: "approved",  label: "Approved",  date: timeline.approvedAt },
  ];
  const order = ["draft","submitted","accepted","approved","rejected"];
  const currentIdx = order.indexOf(status);

  return (
    <div className="mt-3 flex items-start gap-0">
      {stages.map((s, i) => {
        const stageIdx = order.indexOf(s.key);
        const done = stageIdx < currentIdx || (stageIdx === currentIdx && status !== "rejected");
        const active = stageIdx === currentIdx;
        const rejected = status === "rejected" && i === stages.length - 1;
        return (
          <div key={s.key} className="flex-1 flex flex-col items-center">
            <div className="flex items-center w-full">
              {i > 0 && <div className={`h-0.5 flex-1 ${done ? "bg-indigo-400" : "bg-slate-200"}`} />}
              <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 z-10 transition-all ${
                done ? "bg-indigo-500 border-indigo-500" :
                active ? "bg-white border-indigo-400 shadow-md shadow-indigo-100" :
                "bg-white border-slate-200"
              }`}>
                {done ? <CheckCircle className="w-4 h-4 text-white" /> : <div className={`w-2 h-2 rounded-full ${active ? "bg-indigo-400" : "bg-slate-300"}`} />}
              </div>
              {i < stages.length - 1 && <div className={`h-0.5 flex-1 ${done ? "bg-indigo-400" : "bg-slate-200"}`} />}
            </div>
            <div className="text-center mt-2">
              <div className={`text-xs font-medium ${done || active ? "text-indigo-600" : "text-slate-400"}`}>{s.label}</div>
              <div className="text-xs text-slate-400">{s.date ? formatDate(s.date) : "—"}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── ApplicationsTable (updated with navigation) ─────────────────────────────

function ApplicationsTable({ applications, onReview }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {["Student","University","Status","Date","Actions"].map((h, i) => (
                <th key={h} className={`px-5 py-3 text-xs font-semibold text-slate-900 uppercase tracking-wider ${i === 4 ? "text-right" : "text-left"}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {applications.map(app => (
              <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4 text-sm font-medium text-slate-900">{app.student}</td>
                <td className="px-5 py-4 text-sm text-slate-600">{app.university}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                    app.status === "approved" ? "bg-green-100 text-green-700" :
                    app.status === "pending"  ? "bg-yellow-100 text-yellow-700" :
                                               "bg-red-100 text-red-700"
                  }`}>
                    {app.status === "approved" ? <CheckCircle className="w-3 h-3" /> :
                     app.status === "pending"  ? <Clock className="w-3 h-3" /> :
                                                 <XCircle className="w-3 h-3" />}
                    {app.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-slate-600">{app.date}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => onReview(app)}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-xs font-medium"
                    >
                      Review
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── ApplicationCard (mobile, updated) ───────────────────────────────────────

function ApplicationCard({ application, onReview }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="font-semibold text-sm text-slate-900">{application.student}</div>
          <div className="text-xs text-slate-600 mt-0.5">{application.university}</div>
        </div>
        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
          application.status === "approved" ? "bg-green-100 text-green-700" :
          application.status === "pending"  ? "bg-yellow-100 text-yellow-700" :
                                             "bg-red-100 text-red-700"
        }`}>
          {application.status}
        </span>
      </div>
      <div className="text-xs text-slate-500 mb-3">{application.date}</div>
      <button
        onClick={() => onReview(application)}
        className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-xs font-medium"
      >
        Review Application
      </button>
    </div>
  );
}

// ─── Full Review Page ─────────────────────────────────────────────────────────

function ApplicationReviewPage({ application, onBack }) {
  const [app, setApp] = useState(application);

  const handleStatusChange = (newStatus) => {
    setApp(prev => ({ ...prev, status: newStatus }));
  };

  const handleDocAction = (docKey, action, feedback = null) => {
    setApp(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docKey]: {
          ...prev.documents[docKey],
          status: action,
          adminFeedback: feedback,
        },
      },
    }));
  };

  const handleSendComment = (msg) => {
    setApp(prev => ({
      ...prev,
      comments: [...prev.comments, {
        _id: Date.now().toString(),
        sender: { first_name: "Sarah", last_name: "Agent", role: "agent" },
        message: msg,
        createdAt: new Date().toISOString(),
      }],
    }));
  };

  const handleAddNote = (note) => {
    setApp(prev => ({
      ...prev,
      internalNotes: [...prev.internalNotes, {
        _id: Date.now().toString(),
        agent: { first_name: "Sarah", last_name: "Agent" },
        note,
        createdAt: new Date().toISOString(),
      }],
    }));
  };

  const docStats = Object.values(app.documents);
  const uploaded = docStats.filter(d => d.status !== "not_uploaded").length;
  const approved = docStats.filter(d => d.status === "approved").length;
  const total = docStats.length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Applications
            </button>
            <span className="text-slate-200">|</span>
            <span className="text-xs font-semibold text-slate-700">
              {app.user.first_name} {app.user.last_name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={app.status} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Hero header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {app.user.first_name[0]}{app.user.last_name?.[0] || ""}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-slate-900">{app.user.first_name} {app.user.last_name}</h1>
              <p className="text-sm text-slate-500 mt-0.5">{app.user.email} · {app.preferences.preferredFieldOfStudy}</p>
              <div className="flex flex-wrap gap-3 mt-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  {uploaded}/{total} docs uploaded
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  {approved} approved
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  Submitted {formatDate(app.timeline.submittedAt)}
                </div>
              </div>
            </div>
            {/* Action buttons */}
            <div className="flex flex-col gap-2">
              {app.status === "submitted" && (
                <>
                  <button
                    onClick={() => handleStatusChange("accepted")}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4" /> Accept Application
                  </button>
                  <button
                    onClick={() => handleStatusChange("rejected")}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <XCircle className="w-4 h-4" /> Reject Application
                  </button>
                </>
              )}
              {app.status === "accepted" && (
                <button
                  onClick={() => handleStatusChange("approved")}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Award className="w-4 h-4" /> Final Approve
                </button>
              )}
              {(app.status === "approved" || app.status === "rejected") && (
                <div className={`px-4 py-2 text-xs font-semibold rounded-xl text-center ${app.status === "approved" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                  {app.status === "approved" ? "✓ Finalized" : "✗ Rejected"}
                </div>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Application Progress</div>
            <Timeline timeline={app.timeline} status={app.status} />
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left column */}
          <div className="lg:col-span-1 space-y-4">
            <SectionCard title="Student Profile" icon={User}>
              <StudentProfile user={app.user} />
            </SectionCard>
            <SectionCard title="Preferences & Finances" icon={Globe}>
              <PreferencesSection prefs={app.preferences} financial={app.financial_info} />
            </SectionCard>
          </div>

          {/* Middle column */}
          <div className="lg:col-span-1 space-y-4">
            <SectionCard title="Education History" icon={GraduationCap}>
              <EducationSection history={app.educationHistory} />
            </SectionCard>
            <SectionCard title="Test Scores" icon={BookOpen}>
              <TestScoresSection scores={app.testScores} />
            </SectionCard>
            <SectionCard title="Internal Notes" icon={StickyNote} defaultOpen={false}>
              <InternalNotesSection notes={app.internalNotes} onAdd={handleAddNote} />
            </SectionCard>
          </div>

          {/* Right column */}
          <div className="lg:col-span-1 space-y-4">
            <SectionCard title="Documents" icon={FileText}>
              <DocumentsSection documents={app.documents} onDocAction={handleDocAction} />
            </SectionCard>
            <SectionCard title="Comments" icon={MessageSquare}>
              <CommentsSection comments={app.comments} onSend={handleSendComment} />
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Applications Tab (root, wires up navigation) ────────────────────────────

const tableApplications = [
  { id: 1, student: "Alex Brown",    university: "Harvard",   status: "pending",  date: "2024-01-15" },
  { id: 2, student: "Emma Davis",    university: "Oxford",    status: "approved", date: "2024-01-14" },
  { id: 3, student: "James Wilson",  university: "MIT",       status: "pending",  date: "2024-01-13" },
  { id: 4, student: "Olivia Taylor", university: "Cambridge", status: "rejected", date: "2024-01-12" },
];

export default function ApplicationsTab({ apps }) {
  const [reviewingApp, setReviewingApp] = useState(null);

  // When review is clicked we load the mock full application data.
  // In production: fetch from API by app.id
  const handleReview = (_app) => {
    setReviewingApp(mockApplication);
  };

  if (reviewingApp) {
    return (
      <ApplicationReviewPage
        application={reviewingApp}
        onBack={() => setReviewingApp(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">Applications</h3>
          <p className="text-xs text-slate-600 mt-0.5">Review and manage student applications</p>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-3">
        {tableApplications.map(app => (
          <ApplicationCard key={app.id} application={app} onReview={handleReview} />
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <ApplicationsTable applications={tableApplications} onReview={handleReview} />
      </div>
    </div>
  );
}
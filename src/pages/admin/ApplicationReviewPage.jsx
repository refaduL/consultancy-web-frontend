// pages/ApplicationReviewPage.jsx
import {
  ArrowLeft,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  Eye,
  FileText,
  Globe,
  GraduationCap,
  Loader2,
  MessageSquare,
  Send,
  Shield,
  StickyNote,
  User,
  X,
  XCircle,
} from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApplication } from "../../hooks/useApplication";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// ─── Config maps ──────────────────────────────────────────────────────────────

const statusConfig = {
  draft: {
    label: "Draft",
    color: "bg-slate-100 text-slate-600",
    dot: "bg-slate-400",
  },
  submitted: {
    label: "Submitted",
    color: "bg-amber-100 text-amber-700",
    dot: "bg-amber-400",
  },
  accepted: {
    label: "Accepted",
    color: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
  },
  approved: {
    label: "Approved",
    color: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
  },
  rejected: {
    label: "Rejected",
    color: "bg-red-100 text-red-700",
    dot: "bg-red-500",
  },
};

const docStatusConfig = {
  not_uploaded: {
    label: "Not Uploaded",
    bg: "bg-slate-50",
    badge: "bg-slate-100 text-slate-500",
    color: "text-slate-400",
  },
  uploaded: {
    label: "Uploaded",
    bg: "bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
    color: "text-blue-600",
  },
  under_review: {
    label: "Under Review",
    bg: "bg-amber-50",
    badge: "bg-amber-100 text-amber-700",
    color: "text-amber-600",
  },
  approved: {
    label: "Approved",
    bg: "bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-700",
    color: "text-emerald-600",
  },
  rejected: {
    label: "Rejected",
    bg: "bg-red-50",
    badge: "bg-red-100 text-red-700",
    color: "text-red-600",
  },
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatDate = (d) => {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatDateTime = (d) => {
  if (!d) return "—";
  return new Date(d).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ─── Tiny shared components ───────────────────────────────────────────────────

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.draft;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cfg.color}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function DocBadge({ status }) {
  const cfg = docStatusConfig[status] || docStatusConfig.not_uploaded;
  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-full ${cfg.badge}`}
    >
      {cfg.label}
    </span>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start gap-2 py-2 border-b border-slate-50 last:border-0">
      <span className="text-xs text-slate-400 w-40 shrink-0 pt-0.5">
        {label}
      </span>
      <span className="text-sm text-slate-700 font-medium">{value || "—"}</span>
    </div>
  );
}

function Spinner({ className = "w-4 h-4" }) {
  return <Loader2 className={`animate-spin ${className}`} />;
}

function ActionError({ message }) {
  if (!message) return null;

  return (
    <div className="mt-1 max-w-full">
      <div className="w-full px-2 py-1.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-md shadow-sm break-words whitespace-pre-wrap leading-snug animate-fade-in">
        {message}
      </div>
    </div>
  );
}

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
        {open ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-6 pt-1 border-t border-slate-100">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Page sections ────────────────────────────────────────────────────────────

function StudentProfile({ user }) {
  const initials = `${user.first_name[0]}${user.last_name?.[0] || ""}`;
  return (
    <div className="mt-3 space-y-1">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
          {initials}
        </div>
        <div>
          <div className="font-bold text-slate-900">
            {user.first_name} {user.last_name}
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
            <Shield className="w-3 h-3 text-emerald-500" />
            {user.is_verified ? "Verified" : "Unverified"}
          </div>
        </div>
      </div>
      <InfoRow label="Email" value={user.email} />
      <InfoRow label="Phone" value={user.phone} />
      <InfoRow label="Date of Birth" value={formatDate(user.date_of_birth)} />
      <InfoRow label="Gender" value={user.gender} />
      <InfoRow label="Nationality" value={user.nationality} />
      <InfoRow label="Country of Residence" value={user.country_of_residence} />
      <InfoRow
        label="City / Country"
        value={[user.city, user.country].filter(Boolean).join(", ")}
      />
      <InfoRow label="Address" value={user.address} />
      <InfoRow label="Last Login" value={formatDateTime(user.last_login)} />
      {user.social_links?.linkedin && (
        <InfoRow
          label="LinkedIn"
          value={
            <a
              href={user.social_links.linkedin}
              className="text-indigo-600 hover:underline text-xs"
              target="_blank"
              rel="noreferrer"
            >
              {user.social_links.linkedin}
            </a>
          }
        />
      )}
    </div>
  );
}

function EducationSection({ history }) {
  if (!history?.length)
    return <p className="text-xs text-slate-400 mt-3">No education history.</p>;
  return (
    <div className="mt-3 space-y-3">
      {history.map((edu, i) => (
        <div
          key={i}
          className="bg-slate-50 rounded-xl p-4 border border-slate-100"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="font-semibold text-sm text-slate-800">
                {edu.institution}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {edu.degree} · {edu.fieldOfStudy}
              </div>
            </div>
            <div className="text-right shrink-0 ml-3">
              <div className="text-xs font-bold text-indigo-600">
                GPA {edu.gpa}
              </div>
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
  const active = tests.filter((t) => scores?.[t]?.score);
  if (!active.length)
    return (
      <p className="text-xs text-slate-400 mt-3">No test scores submitted.</p>
    );
  return (
    <div className="mt-3 grid grid-cols-2 gap-3">
      {active.map((t) => (
        <div
          key={t}
          className="bg-slate-50 rounded-xl p-3 border border-slate-100"
        >
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {t}
          </div>
          <div className="text-lg font-bold text-slate-800 mt-1">
            {scores[t].score}
          </div>
          <div className="text-xs text-slate-400">
            {formatDate(scores[t].date)}
          </div>
        </div>
      ))}
    </div>
  );
}

function PreferencesSection({ prefs, financial }) {
  return (
    <div className="mt-3 space-y-1">
      <InfoRow label="Field of Study" value={prefs?.preferredFieldOfStudy} />
      <InfoRow label="Intake" value={prefs?.preferredIntake} />
      <InfoRow
        label="Countries"
        value={prefs?.preferredCountries?.join(", ")}
      />
      <InfoRow label="Funding Source" value={financial?.funding_source} />
      <InfoRow
        label="Budget (USD)"
        value={
          financial?.budget_range_usd ? `$${financial.budget_range_usd}` : null
        }
      />
    </div>
  );
}

function DocumentsSection({
  documents,
  onApprove,
  onReject,
  actionLoading,
  actionError,
}) {
  const [feedbackDoc, setFeedbackDoc] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  const handleReject = (key) => {
    onReject(key, feedbackText);
    setFeedbackDoc(null);
    setFeedbackText("");
  };

  return (
    <div className="mt-3 space-y-2">
      {Object.entries(documents).map(([key, doc]) => {
        const cfg = docStatusConfig[doc.status] || docStatusConfig.not_uploaded;
        const canAct =
          doc.status === "uploaded" || doc.status === "under_review";
        const isLoading = actionLoading[`doc_${key}`];
        const docError = actionError[`doc_${key}`];

        return (
          <div
            key={key}
            className={`rounded-xl border p-3 ${cfg.bg} border-slate-200`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <FileText className={`w-4 h-4 shrink-0 ${cfg.color}`} />
                <div>
                  <div className="text-xs font-medium text-slate-700">
                    {docLabels[key] || key}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <DocBadge status={doc.status} />
                    {!doc.required && (
                      <span className="text-xs text-slate-400">Optional</span>
                    )}
                    {doc.uploadedAt && (
                      <span className="text-xs text-slate-400">
                        {formatDate(doc.uploadedAt)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {isLoading && (
                  <Spinner className="w-3.5 h-3.5 text-slate-400" />
                )}

                {doc.url && (
                  <a href={doc.url} target="_blank" rel="noreferrer">
                    <button
                      onClick={() =>
                        window.open(`${BACKEND_URL}${doc.url}`, "_blank")
                      }
                      className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
                      title="View"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                    </button>
                  </a>
                )}

                {canAct && !isLoading && (
                  <>
                    <button
                      onClick={() => onApprove(key)}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-emerald-50 hover:border-emerald-200 transition-colors"
                      title="Approve"
                    >
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                    </button>
                    <button
                      onClick={() =>
                        setFeedbackDoc(feedbackDoc === key ? null : key)
                      }
                      className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-red-50 hover:border-red-200 transition-colors"
                      title="Reject with feedback"
                    >
                      <X className="w-3.5 h-3.5 text-red-500" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Inline rejection feedback input */}
            {feedbackDoc === key && (
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Reason for rejection..."
                  className="flex-1 text-xs px-3 py-2 bg-white border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                />
                <button
                  onClick={() => handleReject(key)}
                  disabled={!feedbackText.trim()}
                  className="px-3 py-2 bg-red-500 text-white text-xs font-medium rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Reject
                </button>
              </div>
            )}

            {doc.adminFeedback && (
              <div className="mt-2 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-1.5">
                <span className="font-medium">Feedback:</span>{" "}
                {doc.adminFeedback}
              </div>
            )}

            <ActionError message={docError} />
          </div>
        );
      })}
    </div>
  );
}

function CommentsSection({ comments, onSend, isSending, sendError }) {
  const [msg, setMsg] = useState("");

  const handleSend = () => {
    if (!msg.trim()) return;
    onSend(msg.trim());
    setMsg("");
  };

  return (
    <div className="mt-3 space-y-3">
      {comments.map((c) => {
        const isAgent = c.sender.role === "agent";
        const isTemp = c._id?.startsWith("temp_");
        return (
          <div
            key={c._id}
            className={`flex gap-3 ${isAgent ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${isAgent ? "bg-indigo-500" : "bg-slate-400"}`}
            >
              {c.sender.first_name[0]}
            </div>
            <div
              className={`max-w-xs flex flex-col ${isAgent ? "items-end" : "items-start"}`}
            >
              <div
                className={`text-xs font-medium mb-1 text-slate-500 ${isAgent ? "text-right" : ""}`}
              >
                {c.sender.first_name} {c.sender.last_name} ·{" "}
                {formatDateTime(c.createdAt)}
              </div>
              <div
                className={`text-xs text-slate-700 px-3 py-2 rounded-xl leading-relaxed transition-opacity ${
                  isAgent
                    ? "bg-indigo-50 border border-indigo-100"
                    : "bg-slate-100 border border-slate-200"
                } ${isTemp ? "opacity-60" : "opacity-100"}`}
              >
                {c.message}
                {isTemp && (
                  <span className="ml-1 text-slate-400">·sending</span>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <div className="pt-2 border-t border-slate-100 space-y-1">
        <div className="flex gap-2">
          <input
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isSending && handleSend()}
            placeholder="Reply to student..."
            disabled={isSending}
            className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-60"
          />
          <button
            onClick={handleSend}
            disabled={isSending || !msg.trim()}
            className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSending ? <Spinner /> : <Send className="w-4 h-4" />}
          </button>
        </div>
        <ActionError message={sendError} />
      </div>
    </div>
  );
}

function InternalNotesSection({ notes, onAdd, isAdding, addError }) {
  const [note, setNote] = useState("");

  const handleAdd = () => {
    if (!note.trim()) return;
    onAdd(note.trim());
    setNote("");
  };

  return (
    <div className="mt-3 space-y-3">
      {notes.map((n) => {
        const isTemp = n._id?.startsWith("temp_");
        return (
          <div
            key={n._id}
            className={`bg-amber-50 border border-amber-100 rounded-xl p-3 transition-opacity ${isTemp ? "opacity-60" : "opacity-100"}`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-amber-700">
                {n.agent.first_name} {n.agent.last_name}
              </span>
              <span className="text-xs text-amber-500">
                {formatDateTime(n.createdAt)}
              </span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">{n.note}</p>
          </div>
        );
      })}

      <div className="pt-2 border-t border-slate-100 space-y-1">
        <div className="flex gap-2">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isAdding && handleAdd()}
            placeholder="Add internal note (agent-only)..."
            disabled={isAdding}
            className="flex-1 text-xs px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:opacity-60"
          />
          <button
            onClick={handleAdd}
            disabled={isAdding || !note.trim()}
            className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isAdding ? <Spinner /> : "Add"}
          </button>
        </div>
        <ActionError message={addError} />
      </div>
    </div>
  );
}

function ApplicationTimeline({ timeline = {}, status }) {
  const containerRef = useRef(null);
  const bubbleRefs = useRef([]);
  const [trackStyle, setTrackStyle] = useState({
    bgLeft: 0,
    bgWidth: 0,
    fillLeft: 0,
    fillWidth: 0,
  });

  const stages = [
    { key: "draft", label: "Draft", date: null },
    {
      key: "submitted",
      label: "Submitted",
      date: timeline?.submittedAt ?? null,
    },
    {
      key: "review",
      label:
        status === "rejected" && !timeline?.approvedAt
          ? "Rejected"
          : status === "accepted"
            ? "Accepted"
            : "In review",
      date: timeline?.acceptedAt ?? timeline?.rejectedAt ?? null,
    },
    {
      key: "approved",
      label: "Final approval",
      date: timeline?.approvedAt ?? null,
    },
  ];

  let lastDone = 0;
  if (timeline?.submittedAt) lastDone = 1;
  if (timeline?.acceptedAt || (status === "rejected" && !timeline?.approvedAt))
    lastDone = 2;
  if (timeline?.approvedAt) lastDone = 3;

  const isTerminal = status === "accepted" || status === "rejected";
  const isReject = status === "rejected";

  useLayoutEffect(() => {
    function measure() {
      const container = containerRef.current;
      if (!container) return;
      const bubbles = bubbleRefs.current.filter(Boolean);
      if (bubbles.length < 2) return;

      const ctRect = container.getBoundingClientRect();
      const centers = bubbles.map((b) => {
        const r = b.getBoundingClientRect();
        return r.left + r.width / 2 - ctRect.left;
      });

      const first = centers[0];
      const last = centers[centers.length - 1];
      const bgWidth = last - first;

      let fillWidth = 0;
      if (lastDone === 0) {
        fillWidth = 0;
      } else if (lastDone >= stages.length - 1) {
        fillWidth = bgWidth;
      } else {
        const doneCx = centers[lastDone];
        const nextCx = centers[Math.min(lastDone + 1, stages.length - 1)];
        const fillTo = isTerminal ? doneCx : (doneCx + nextCx) / 2;
        fillWidth = fillTo - first;
      }

      setTrackStyle({ bgLeft: first, bgWidth, fillLeft: first, fillWidth });
    }

    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [lastDone, isTerminal, stages.length]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-start w-full mt-6 px-1"
    >
      {/* Background track */}
      <div
        className="absolute top-[19px] h-0.5 rounded-full pointer-events-none"
        style={{
          left: trackStyle.bgLeft,
          width: trackStyle.bgWidth,
          background: "var(--color-border-tertiary, #e2e8f0)",
        }}
      />

      {/* Progress fill */}
      <div
        className="absolute top-[19px] h-0.5 rounded-full pointer-events-none transition-all duration-700 ease-in-out"
        style={{
          left: trackStyle.fillLeft,
          width: trackStyle.fillWidth,
          background: isReject
            ? "linear-gradient(to right, #6366f1, #ef4444)"
            : "#6366f1",
        }}
      />

      {stages.map((stage, i) => {
        const done = i <= lastDone;
        const isNext = i === lastDone + 1 && !isTerminal;
        const isRejectNode =
          stage.key === "review" && isReject && !timeline?.approvedAt;

        let bubbleCls = "";
        let icon = null;

        if (isRejectNode) {
          bubbleCls = "bg-red-500 border-red-500";
          icon = <XCircle className="w-4 h-4 text-white" strokeWidth={2.5} />;
        } else if (done) {
          bubbleCls = "bg-indigo-500 border-indigo-500";
          icon = (
            <CheckCircle className="w-4 h-4 text-white" strokeWidth={2.5} />
          );
        } else if (isNext) {
          bubbleCls = "bg-white border-indigo-300 animate-pulse";
          icon = <div className="w-2 h-2 rounded-full bg-indigo-300" />;
        } else {
          bubbleCls = "bg-white border-slate-200";
          icon = <div className="w-2 h-2 rounded-full bg-slate-300" />;
        }

        const labelCls = isRejectNode
          ? "text-red-500"
          : done
            ? "text-slate-800"
            : isNext
              ? "text-indigo-500"
              : "text-slate-400";

        return (
          <div
            key={stage.key}
            className="flex-1 flex flex-col items-center relative z-10"
          >
            <div
              ref={(el) => (bubbleRefs.current[i] = el)}
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${bubbleCls}`}
            >
              {icon}
            </div>
            <div className="text-center mt-2 px-1 max-w-[80px]">
              <p
                className={`text-[11.5px] font-medium leading-snug ${labelCls}`}
              >
                {stage.label}
              </p>
              {stage.date && (
                <p className="text-[10px] mt-0.5 text-slate-400">
                  {formatDate(stage.date)}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StatusActions({
  status,
  onAccept,
  onReject,
  onFinalApprove,
  isLoading,
  error,
  rejectionFeedback = "",
}) {
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleReject = () => {
    onReject(feedback);
    setShowRejectInput(false);
    setFeedback("");
  };

  return (
    <div className="flex flex-col gap-2 shrink-0">
      {status === "submitted" && (
        <>
          <button
            onClick={onAccept}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? <Spinner /> : <CheckCircle className="w-4 h-4" />}
            Accept
          </button>

          <button
            onClick={() => setShowRejectInput(!showRejectInput)}
            disabled={isLoading}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <XCircle className="w-4 h-4" /> Reject
          </button>

          {showRejectInput && (
            <div className="flex flex-col gap-1.5">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Rejection reason (required)..."
                rows={2}
                className="text-xs px-3 py-2 bg-white border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 resize-none"
              />
              <button
                onClick={handleReject}
                disabled={!feedback.trim() || isLoading}
                className="px-3 py-2 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Confirm Rejection
              </button>
            </div>
          )}
        </>
      )}

      {status === "accepted" && (
        <button
          onClick={onFinalApprove}
          disabled={isLoading}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? <Spinner /> : <Award className="w-4 h-4" />}
          Final Approve
        </button>
      )}

      {(status === "approved" || status === "rejected") && (
        <div className="flex flex-col items-end gap-2">
          <div
            className={`px-4 py-2 text-xs font-semibold rounded-xl text-center ${
              status === "approved"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {status === "approved" ? "✓ Finalized" : "✗ Rejected"}
          </div>

          {status === "rejected" && (
            <div className="w-full max-w-[380px] px-3 py-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg shadow-sm break-words">
              <span className="font-medium">Reason:</span>{" "}
              {rejectionFeedback || "No reason provided."}
            </div>
          )}
        </div>
      )}

      <ActionError message={error} />
    </div>
  );
}

// ─── Loading / Error page states ──────────────────────────────────────────────

function LoadingState() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <Loader2 className="w-4 h-4 animate-spin" />
        Loading application...
      </div>
    </div>
  );
}

function ErrorState({ error, onBack }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3">
      <p className="text-sm text-red-500">
        {error || "Application not found."}
      </p>
      <button
        onClick={onBack}
        className="text-xs text-indigo-600 hover:underline"
      >
        Go back
      </button>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ApplicationReviewPage() {
  const { appId } = useParams();
  const navigate = useNavigate();

  const {
    app,
    loading,
    error,
    actionLoading,
    actionError,
    acceptApplication,
    rejectApplication,
    finalApproveApplication,
    approveDocument,
    rejectDocument,
    sendComment,
    addInternalNote,
  } = useApplication(appId, null);

  if (loading) return <LoadingState />;
  if (error || !app)
    return <ErrorState error={error} onBack={() => navigate(-1)} />;

  if (!app.documents) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading application data...
        </div>
      </div>
    );
  }

  const documents = app?.documents || {};
  const docValues = Object.values(documents);
  const uploadedCount = docValues.filter(
    (d) => d?.status !== "not_uploaded",
  ).length;
  const approvedCount = docValues.filter(
    (d) => d?.status === "approved",
  ).length;
  const totalDocs = docValues.length;

  // Replace the current docValues calculation with safe guards
  // const docValues = app?.documents ? Object.values(app.documents) : [];
  // const uploadedCount = docValues.filter(d => d?.status !== "not_uploaded").length;
  // const approvedCount = docValues.filter(d => d?.status === "approved").length;
  // const totalDocs = docValues.length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Applications
          </button>
          <StatusBadge status={app.status} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Hero card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0">
              {app.user.first_name[0]}
              {app.user.last_name?.[0] || ""}
            </div>

            {/* Name + meta chips */}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-slate-900">
                {app.user.first_name} {app.user.last_name}
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                {app.user.email}
                {app.preferences?.preferredFieldOfStudy &&
                  ` · ${app.preferences.preferredFieldOfStudy}`}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  {uploadedCount}/{totalDocs} docs uploaded
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  {approvedCount} approved
                </span>
                {app.timeline?.submittedAt && (
                  <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    Submitted {formatDate(app.timeline.submittedAt)}
                  </span>
                )}
              </div>
            </div>

            {/* Status action buttons */}
            <StatusActions
              status={app.status}
              rejectionFeedback={app.rejectionFeedback}
              onAccept={acceptApplication}
              onReject={rejectApplication}
              onFinalApprove={finalApproveApplication}
              isLoading={actionLoading.status}
              error={actionError.status}
            />
          </div>

          {/* Progress timeline */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Application Progress
            </div>
            <ApplicationTimeline timeline={app.timeline} status={app.status} />
          </div>
        </div>

        {/* 3-column content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left */}
          <div className="space-y-4">
            <SectionCard title="Student Profile" icon={User}>
              <StudentProfile user={app.user} />
            </SectionCard>
            <SectionCard title="Preferences & Finances" icon={Globe}>
              <PreferencesSection
                prefs={app.preferences}
                financial={app.financial_info}
              />
            </SectionCard>
          </div>

          {/* Middle */}
          <div className="space-y-4">
            <SectionCard title="Education History" icon={GraduationCap}>
              <EducationSection history={app.educationHistory} />
            </SectionCard>
            <SectionCard title="Test Scores" icon={BookOpen}>
              <TestScoresSection scores={app.testScores} />
            </SectionCard>
            {/* <SectionCard
              title="Internal Notes"
              icon={StickyNote}
              defaultOpen={false}
            >
              <InternalNotesSection
                notes={app.internalNotes}
                onAdd={addInternalNote}
                isAdding={actionLoading.note}
                addError={actionError.note}
              />
            </SectionCard> */}
          </div>

          {/* Right */}
          <div className="space-y-4">
            <SectionCard title="Documents" icon={FileText}>
              <DocumentsSection
                documents={app.documents}
                onApprove={approveDocument}
                onReject={rejectDocument}
                actionLoading={actionLoading}
                actionError={actionError}
              />
            </SectionCard>
            {/* <SectionCard title="Comments" icon={MessageSquare}>
              <CommentsSection
                comments={app.comments}
                onSend={sendComment}
                isSending={actionLoading.comment}
                sendError={actionError.comment}
              />
            </SectionCard> */}
          </div>
        </div>
      </div>
    </div>
  );
}

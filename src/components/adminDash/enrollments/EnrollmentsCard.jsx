// EnrollmentCard.jsx — mobile card view for enrollments
import React from "react";
import { Eye, Trash2, CheckCircle, Clock, XCircle, BookOpen, Calendar } from "lucide-react";
import formatDateTime from "../../../helpers/formatDateTime";


function StatusBadge({ status }) {
  const map = {
    pending:   { bg: "bg-amber-100", text: "text-amber-700", icon: Clock,       label: "Pending"   },
    confirmed: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle, label: "Confirmed" },
    cancelled: { bg: "bg-red-100",   text: "text-red-700",   icon: XCircle,     label: "Cancelled" },
  };
  const s = map[status] || map.pending;
  const Icon = s.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${s.bg} ${s.text}`}>
      <Icon className="w-3 h-3" />
      {s.label}
    </span>
  );
}


function CoursePill({ courseId }) {
  const map = {
    ielts:  { label: "IELTS",  bg: "bg-[#8FB9A8]/15", text: "text-[#3F6A8A]" },
    toefl:  { label: "TOEFL", bg: "bg-[#3F6A8A]/10", text: "text-[#3F6A8A]" },
    pte:    { label: "PTE",   bg: "bg-[#F1828D]/10", text: "text-[#c0525d]" },
  };
  const c = map[courseId] || { label: courseId?.toUpperCase(), bg: "bg-slate-100", text: "text-slate-600" };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${c.bg} ${c.text}`}>
      <BookOpen className="w-3 h-3" />
      {c.label}
    </span>
  );
}

export default function EnrollmentCard({ enrollment, onView, onUpdateStatus, onDelete, updatingAction, updatingId }) {
  const { _id, user, courseId, courseName, batchName, status, createdAt } = enrollment;
  
  // Check if this specific action is loading for this enrollment
  const isConfirming = updatingAction === 'confirm' && updatingId === _id;
  const isCancelling = updatingAction === 'cancel' && updatingId === _id;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className="font-semibold text-sm text-slate-900">
              {user?.first_name} {user?.last_name}
            </span>
            <CoursePill courseId={courseId} />
          </div>
          <p className="text-xs text-slate-500 truncate">{user?.email}</p>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Batch */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
        <Calendar className="w-3.5 h-3.5 shrink-0" />
        <span className="truncate">{batchName}</span>
      </div>

      {/* Submitted date */}
      <div className="text-xs text-slate-400 mb-3">
        Submitted: {formatDateTime(createdAt, "date")}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Confirm — only when pending */}
        {status === "pending" && (
          <button
            onClick={() => onUpdateStatus(_id, "confirmed")}
            disabled={isConfirming || isCancelling}
            className="flex-1 px-3 py-2 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-xs font-semibold text-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConfirming ? (
              <span className="flex items-center justify-center gap-1">
                <span className="w-3 h-3 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                Confirming...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                Confirm
              </span>
            )}
          </button>
        )}

        {/* Cancel — only when pending or confirmed */}
        {(status === "pending" || status === "confirmed") && (
          <button
            onClick={() => onUpdateStatus(_id, "cancelled")}
            disabled={isConfirming || isCancelling}
            className="flex-1 px-3 py-2 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors text-xs font-semibold text-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCancelling ? (
              <span className="flex items-center justify-center gap-1">
                <span className="w-3 h-3 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
                Cancelling...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1">
                <XCircle className="w-3.5 h-3.5" />
                Cancel
              </span>
            )}
          </button>
        )}

        <button
          onClick={() => onView(_id)}
          disabled={isConfirming || isCancelling}
          className="flex-1 px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-xs font-medium text-slate-700 disabled:opacity-50"
        >
          <Eye className="w-3.5 h-3.5 inline mr-1" />
          View
        </button>

        <button
          onClick={() => onDelete(_id)}
          disabled={isConfirming || isCancelling}
          className="px-3 py-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
        >
          <Trash2 className="w-3.5 h-3.5 text-red-600" />
        </button>
      </div>
    </div>
  );
}
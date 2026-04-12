// EnrollmentsTable.jsx — desktop tabular view for enrollments
import React from "react";
import { Eye, Trash2, CheckCircle, XCircle, Clock, BookOpen } from "lucide-react";
import formatDateTime from "../../../helpers/formatDateTime";

// ── Status badge (same visual language as project Badge) ──────────────────
function StatusBadge({ status }) {
  const map = {
    pending: {
      bg: "bg-amber-100", text: "text-amber-700",
      icon: Clock, label: "Pending",
    },
    confirmed: {
      bg: "bg-green-100", text: "text-green-700",
      icon: CheckCircle, label: "Confirmed",
    },
    cancelled: {
      bg: "bg-red-100", text: "text-red-700",
      icon: XCircle, label: "Cancelled",
    },
  };
  const s = map[status] || map.pending;
  const Icon = s.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
      <Icon className="w-3 h-3" />
      {s.label}
    </span>
  );
}

// ── Course pill ───────────────────────────────────────────────────────────
function CoursePill({ courseId }) {
  const map = {
    ielts: { label: "IELTS", bg: "bg-[#8FB9A8]/15", text: "text-[#3F6A8A]" },
    toefl: { label: "TOEFL", bg: "bg-[#3F6A8A]/10", text: "text-[#3F6A8A]" },
    pte:   { label: "PTE",   bg: "bg-[#F1828D]/10", text: "text-[#c0525d]" },
  };
  const c = map[courseId] || { label: courseId?.toUpperCase(), bg: "bg-slate-100", text: "text-slate-600" };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${c.bg} ${c.text}`}>
      <BookOpen className="w-3 h-3" />
      {c.label}
    </span>
  );
}

export default function EnrollmentsTable({
  enrollments,
  updatingId,
  onUpdateStatus,
  onView,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">

          <thead className="bg-slate-100 text-xs uppercase border-b border-slate-200 tracking-wider">
            <tr>
              <th className="px-5 py-3 text-left font-semibold">Student</th>
              <th className="px-5 py-3 text-left font-semibold">Email</th>
              <th className="px-5 py-3 text-center font-semibold">Course</th>
              <th className="px-5 py-3 text-left font-semibold">Batch</th>
              <th className="px-5 py-3 text-center font-semibold">Submitted</th>
              <th className="px-5 py-3 text-center font-semibold">Status</th>
              <th className="px-5 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {enrollments.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-sm text-slate-400">
                  No enrollments found.
                </td>
              </tr>
            ) : (
              enrollments.map((enrollment) => {
                const {
                  _id, user, courseId, batchName,
                  status, createdAt,
                } = enrollment;
                const isUpdating = updatingId === _id;

                return (
                  <tr key={_id} className="text-sm hover:bg-slate-50 transition-colors">

                    {/* Student name */}
                    <td className="px-5 py-4 font-medium text-slate-900 whitespace-nowrap">
                      {user?.first_name} {user?.last_name}
                    </td>

                    {/* Email */}
                    <td className="px-5 py-4 text-slate-600 max-w-[180px] truncate">
                      {user?.email}
                    </td>

                    {/* Course */}
                    <td className="px-5 py-4 text-center">
                      <CoursePill courseId={courseId} />
                    </td>

                    {/* Batch — truncated nicely */}
                    <td className="px-5 py-4 text-slate-600 max-w-[200px]">
                      <span className="text-xs leading-relaxed">{batchName}</span>
                    </td>

                    {/* Submitted date */}
                    <td className="px-5 py-4 text-slate-600 text-center whitespace-nowrap">
                      {formatDateTime(createdAt, "date")}
                    </td>

                    {/* Status — inline confirm/cancel or static badge */}
                    <td className="px-5 py-4 text-center align-middle">
                      {status === "confirmed" || status === "cancelled" ? (
                        <StatusBadge status={status} />
                      ) : (
                        // pending → show confirm button (same style as UsersTable verify button)
                        <button
                          onClick={() => onUpdateStatus(_id, "confirmed")}
                          disabled={isUpdating}
                          className="inline-flex px-3 py-1.5 rounded-md items-center justify-center gap-1.5 transition-all bg-green-600 hover:bg-green-700 text-white text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        >
                          {isUpdating ? (
                            <>
                              <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Confirming...</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>Confirm</span>
                            </>
                          )}
                        </button>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">

                        <button
                          onClick={() => onView?.(_id)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                          title="View details"
                        >
                          <Eye className="w-4 h-4 text-slate-600" />
                        </button>

                        {/* Cancel — only when not already cancelled */}
                        {status !== "cancelled" && (
                          <button
                            onClick={() => onUpdateStatus?.(_id, "cancelled")}
                            disabled={isUpdating}
                            className="p-2 hover:bg-amber-50 rounded-lg transition-colors disabled:opacity-40"
                            title="Cancel enrollment"
                          >
                            <XCircle className="w-4 h-4 text-amber-500" />
                          </button>
                        )}

                        <button
                          onClick={() => onDelete(_id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete record"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>

                      </div>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
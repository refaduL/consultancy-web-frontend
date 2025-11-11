import React from "react";
import { CheckCircle, XCircle, Clock, Upload, Globe } from "lucide-react";

export default function NotificationOverlay({ user, onClose }) {
  return (
    // Overlay background
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/30 p-2 sm:p-8 overflow-auto"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className={`w-full max-w-sm sm:max-w-md md:max-w-lg rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg relative
          ${
            user.applicationStatus === "approved"
              ? "bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200"
              : user.applicationStatus === "rejected"
              ? "bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200"
              : "bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-slate-500 hover:text-slate-700 text-lg"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          {/* Status Icon */}
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg
              ${
                user.applicationStatus === "approved"
                  ? "bg-green-100 shadow-green-200"
                  : user.applicationStatus === "rejected"
                  ? "bg-red-100 shadow-red-200"
                  : "bg-yellow-100 shadow-yellow-200"
              }`}
          >
            {user.applicationStatus === "approved" && <CheckCircle className="w-7 h-7 text-green-600" />}
            {user.applicationStatus === "rejected" && <XCircle className="w-7 h-7 text-red-600" />}
            {user.applicationStatus === "pending_review" && <Clock className="w-7 h-7 text-yellow-600" />}
          </div>

          {/* Message */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 flex-wrap">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-slate-900 truncate">
                {user.applicationStatus === "approved" && "Congratulations! You're Approved"}
                {user.applicationStatus === "rejected" && "Application Rejected"}
                {user.applicationStatus === "pending_review" && "Application Under Review"}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold w-fit whitespace-nowrap
                  ${user.applicationStatus === "approved" ? "bg-green-600 text-white" : ""}
                  ${user.applicationStatus === "rejected" ? "bg-red-600 text-white" : ""}
                  ${user.applicationStatus === "pending_review" ? "bg-yellow-500 text-white" : ""}`}
              >
                {user.applicationStatus.replace("_", " ").toUpperCase()}
              </span>
            </div>

            <div
              className={`bg-white rounded-xl p-3 sm:p-4 mb-4 border ${
                user.applicationStatus === "approved"
                  ? "border-green-200"
                  : user.applicationStatus === "rejected"
                  ? "border-red-200"
                  : "border-yellow-200"
              }`}
            >
              <p className="text-sm font-semibold text-slate-900 mb-1">Admin's Message:</p>
              <p className="text-sm text-slate-700">{user.adminFeedback}</p>
              {user.reviewDate && <p className="text-xs text-slate-500 mt-1">Reviewed on {user.reviewDate}</p>}
            </div>

            {user.applicationStatus !== "pending_review" && (
              <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4" /> Upload Documents
                </button>
                <button className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                  <Globe className="w-4 h-4" /> Browse Universities
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

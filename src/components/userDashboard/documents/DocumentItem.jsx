import React from "react";
import { CheckCircle, Clock, FileText, Trash2, Upload, XCircle, Eye } from "lucide-react";
import { dateTimeFormatter } from "../../../helpers/LocalTimestampFormatter";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function DocumentItem({ doc, onUpload, onDelete, loadingDocKey }) {
    const statusStyles = {
        not_uploaded: { bg: "bg-slate-100", text: "text-slate-600", label: "Not Uploaded", icon: <FileText /> },
        uploaded: { bg: "bg-blue-100", text: "text-blue-600", label: "Uploaded", icon: <Upload /> },
        under_review: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Under Review", icon: <Clock /> },
        approved: { bg: "bg-green-100", text: "text-green-700", label: "Approved", icon: <CheckCircle /> },
        rejected: { bg: "bg-red-100", text: "text-red-700", label: "Rejected", icon: <XCircle /> },
    };
    const style = statusStyles[doc.status] || statusStyles.not_uploaded;

    return (
        <div className="flex flex-col gap-2 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-all group">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${style.bg}`}>
                {React.cloneElement(style.icon, { className: `${style.text} w-6 h-6` })}
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 truncate">{doc.name}</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                {/* Status label */}
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${style.bg} ${style.text} truncate`}>
                    {style.label}
                </span>
                {/* UpdatedAt / Uploaded date */}
                {(doc.updatedAt || doc.uploadedAt) && (
                    <span className="text-xs text-slate-500 truncate">
                    • {dateTimeFormatter(doc.updatedAt || doc.uploadedAt, { type: "date", format: "readable" })}
                    </span>
                )}
                </div>
            </div>
            </div>

            {/* Action buttons: Upload / Eye button */}

            <div className="flex items-center gap-2 ml-4">

            {/* not_uploaded */}
            {doc.status === "not_uploaded" && (
                <label className={`cursor-pointer ${loadingDocKey === doc.key ? "opacity-50 pointer-events-none" : ""}`}>
                <input
                    type="file"
                    className="hidden"
                    disabled={loadingDocKey === doc.key}
                    onChange={(e) =>
                    e.target.files[0] && onUpload(doc.key, e.target.files[0])
                    }
                />
                <div className="p-2 sm:px-4 sm:py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    <span className="hidden sm:inline">
                    {loadingDocKey === doc.key ? "Uploading..." : "Upload"}
                    </span>
                </div>
                </label>
            )}

            {doc.status === "uploaded" && (
                <>
                <button
                    disabled={loadingDocKey === doc.key}
                    className="p-2 hover:bg-white rounded-lg transition-colors disabled:opacity-50"
                    onClick={() => window.open(`${BACKEND_URL}${doc.url}`, "_blank")}
                >
                    <Eye className="w-4 h-4 text-slate-600" />
                </button>

                <button
                    disabled={loadingDocKey === doc.key}
                    className="p-2 sm:px-4 sm:py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                    onClick={() => onDelete(doc.key)}
                >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">
                    {loadingDocKey === doc.key ? "Deleting..." : "Delete"}
                    </span>
                </button>
                </>
            )}

            {doc.status === "under_review" && (
                <button
                className="p-2 hover:bg-white rounded-lg transition-colors"
                onClick={() => window.open(`${BACKEND_URL}${doc.url}`, "_blank")}
                >
                <Eye className="w-4 h-4 text-slate-600" />
                </button>
            )}

            {doc.status === "approved" && (
                <button
                className="p-2 hover:bg-white rounded-lg transition-colors"
                onClick={() => window.open(`${BACKEND_URL}${doc.url}`, "_blank")}
                >
                <Eye className="w-4 h-4 text-slate-600" />
                </button>
            )}

            {doc.status === "rejected" && (
                <>
                <button
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                    onClick={() => window.open(`${BACKEND_URL}${doc.url}`, "_blank")}
                >
                    <Eye className="w-4 h-4 text-slate-600" />
                </button>

                <label className={`cursor-pointer ${loadingDocKey === doc.key ? "opacity-50 pointer-events-none" : ""}`}>
                    <input
                    type="file"
                    className="hidden"
                    disabled={loadingDocKey === doc.key}
                    onChange={(e) =>
                        e.target.files[0] && onUpload(doc.key, e.target.files[0])
                    }
                    />
                    <div className="p-2 sm:px-4 sm:py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    <span className="hidden sm:inline">
                        {loadingDocKey === doc.key ? "Uploading..." : "Re-upload"}
                    </span>
                    </div>
                </label>
                </>
            )}

            </div>
        </div>

        {/* Admin Feedback */}
        {(doc.status === "approved" || doc.status === "rejected") && doc.adminFeedback && (
            <div className={`mt-2 p-3 rounded-lg border-l-4 ${doc.status === "approved" ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}>
            <p className="text-sm text-slate-900">{doc.adminFeedback}</p>
            </div>
        )}
        </div>
    );
};
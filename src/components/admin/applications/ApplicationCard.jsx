import React from "react";
import Badge from "../common/Badge";

export default function ApplicationCard({ application }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="font-semibold text-sm text-slate-900">{application.student}</div>
          <div className="text-xs text-slate-600 mt-0.5">{application.university}</div>
        </div>
        <Badge status={application.status} />
      </div>
      <div className="text-xs text-slate-500 mb-3">{application.date}</div>
      <button className="w-full px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg transition-colors text-xs font-medium">
        Review Application
      </button>
    </div>
  );
}
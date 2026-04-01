import React from "react";
import { useNavigate } from "react-router-dom";
import Badge from "../common/Badge";
import formatDateTime from "../../../helpers/formatDateTime";

export default function ApplicationCard({ application }) {
  const navigate = useNavigate();

  const latest = Object.entries(application.timeline)
  .reduce((latest, [key, value]) => {
    const currentDate = new Date(value);
    return currentDate > latest.date 
      ? { key, date: currentDate, value } 
      : latest;
  }, { key: null, date: new Date(0), value: null });

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="font-semibold text-sm text-slate-900">{application.user.first_name} {application.user.last_name}</div>
          <div className="text-xs text-slate-600 mt-0.5">{application.university}</div>
        </div>
        <Badge status={application.status} />
      </div>
      {/* <div className="text-xs text-slate-500 mb-3">{formatDateTime(application.updatedAt, "date")}</div> */}
      <div className="text-xs text-slate-500 mb-3">Last Updated: {formatDateTime(latest.value, "date")}</div>
      
      <button
        onClick={() => navigate(`/admindashboard/applications/${application._id}`)}
        className="w-full px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg transition-colors text-xs font-medium"
      >
        Review Application
      </button>
    </div>
  );
}
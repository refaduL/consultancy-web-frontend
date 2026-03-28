import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import Badge from "../common/Badge";

export default function ApplicationsTable({ applications }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                Student
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                University
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                Date
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-slate-900 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {applications.map((app) => (
              <tr key={app._id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4 text-sm font-medium text-slate-900">{app.user.first_name} {app.user.last_name}</td>
                <td className="px-5 py-4 text-sm text-slate-600">{app.user.email}</td>
                <td className="px-5 py-4">
                  <Badge status={app.status} />
                </td>
                <td className="px-5 py-4 text-sm text-slate-600">{app.created_at}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => navigate(`/admindashboard/applications/${app._id}`)}
                      className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg transition-colors text-xs font-medium"
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
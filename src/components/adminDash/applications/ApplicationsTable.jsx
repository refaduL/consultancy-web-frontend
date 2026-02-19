import React from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";

export default function ApplicationsTable({ applications }) {
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
              <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4 text-sm font-medium text-slate-900">{app.student}</td>
                <td className="px-5 py-4 text-sm text-slate-600">{app.university}</td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                      app.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : app.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {app.status === "approved" ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : app.status === "pending" ? (
                      <Clock className="w-3 h-3" />
                    ) : (
                      <XCircle className="w-3 h-3" />
                    )}
                    {app.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-slate-600">{app.date}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end">
                    <button className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg transition-colors text-xs font-medium">
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
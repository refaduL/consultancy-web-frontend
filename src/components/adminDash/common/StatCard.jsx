import React from "react";

export default function StatCard({ label, value, change, trend }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-slate-600 font-medium uppercase tracking-wide">{label}</span>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {change}
        </span>
      </div>
      <div className="text-2xl md:text-3xl font-bold text-slate-900">{value}</div>
    </div>
  );
}
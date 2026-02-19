import React from "react";

export default function StatCard({ icon, title, value, subtitle, color }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 ${color.bg} rounded-lg flex items-center justify-center`}>
          {React.cloneElement(icon, { className: `${color.icon} w-5 h-5` })}
        </div>
        <span className="text-xs font-medium text-slate-600 uppercase">
          {title}
        </span>
      </div>
      <div className={`text-2xl font-bold ${color.text}`}>{value}</div>
      <p className="text-xs text-slate-600 mt-1">{subtitle}</p>
    </div>
  );
}

// FILE: src/components/admin/universities/UniversityCard.jsx
// ============================================
import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";

export default function UniversityCard({ university, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="min-w-0 flex-1">
          <h4 className="text-base font-bold text-slate-900 mb-1 truncate">{university.name}</h4>
          <p className="text-xs text-slate-600">{university.country}</p>
        </div>
        <span className="text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ml-2 bg-blue-100 text-blue-700">
          {university.admissionSeason}
        </span>
      </div>
      <div className="mb-4 pb-4 border-b border-slate-200">
        <div className="text-xs text-slate-600">
          <span className="font-semibold text-slate-900">{university.programs}</span> programs available
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex-1 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg transition-colors font-medium text-xs">
          <Eye className="w-3.5 h-3.5 inline mr-1" />
          View
        </button>
        <button
          onClick={() => onEdit(university)}
          className="flex-1 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg transition-colors font-medium text-xs"
        >
          <Edit className="w-3.5 h-3.5 inline mr-1" />
          Edit
        </button>
        <button
          onClick={() => onDelete(university)}
          className="px-3 py-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5 text-red-600" />
        </button>
      </div>
    </div>
  );
}
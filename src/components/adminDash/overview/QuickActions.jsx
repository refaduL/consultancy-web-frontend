// FILE: src/components/admin/overview/QuickActions.jsx
// ============================================
import React from "react";
import { Plus, FileText, TrendingUp } from "lucide-react";

export default function QuickActions({ onAddUniversity }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-6">
      <h3 className="text-base font-bold text-slate-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <button className="flex items-center justify-center gap-2 px-3 py-2.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors font-medium text-sm">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add User</span>
          <span className="sm:hidden">User</span>
        </button>
        <button
          onClick={onAddUniversity}
          className="flex items-center justify-center gap-2 px-3 py-2.5 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add University</span>
          <span className="sm:hidden">University</span>
        </button>
        <button className="flex items-center justify-center gap-2 px-3 py-2.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium text-sm">
          <FileText className="w-4 h-4" />
          <span className="hidden sm:inline">Reports</span>
          <span className="sm:hidden">Reports</span>
        </button>
        <button className="flex items-center justify-center gap-2 px-3 py-2.5 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors font-medium text-sm">
          <TrendingUp className="w-4 h-4" />
          <span className="hidden sm:inline">Analytics</span>
          <span className="sm:hidden">Analytics</span>
        </button>
      </div>
    </div>
  );
}
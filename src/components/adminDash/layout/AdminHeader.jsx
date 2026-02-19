// FILE: src/components/admin/layout/AdminHeader.jsx
// ============================================
import React from "react";
import { Search, Menu } from "lucide-react";

const menuItems = [
  { id: "overview", label: "Overview" },
  { id: "users", label: "Users" },
  { id: "universities", label: "Universities" },
  { id: "applications", label: "Applications" },
  { id: "messages", label: "Messages" },
  { id: "settings", label: "Settings" },
];

export default function AdminHeader({ activeTab, onMenuClick }) {
  return (
    <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Menu className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              {menuItems.find((item) => item.id === activeTab)?.label}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48 lg:w-64"
            />
          </div>
          <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
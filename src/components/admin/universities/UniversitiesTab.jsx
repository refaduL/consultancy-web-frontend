import React from "react";
import { Plus } from "lucide-react";
import UniversitiesGrid from "./UniversitiesGrid";

export default function UniversitiesTab({ universities, onAddUniversity, onEditUniversity, onDeleteUniversity }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">All Universities</h3>
          <p className="text-xs text-slate-600 mt-0.5">Manage university profiles and programs</p>
        </div>
        <button
          onClick={onAddUniversity}
          className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-300 hover:from-primary-500 hover:to-primary-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg group">
            <Plus className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Add University
        </button>
      </div>

      <UniversitiesGrid
        universities={universities}
        onEdit={onEditUniversity}
        onDelete={onDeleteUniversity}
      />
    </div>
  );
}
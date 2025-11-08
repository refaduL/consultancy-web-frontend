// FILE: src/components/admin/universities/DeleteConfirmModal.jsx
// ============================================
import React from "react";
import { Trash2 } from "lucide-react";

export default function DeleteConfirmModal({ university, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 className="w-6 h-6 text-red-600" />
        </div>

        <h2 className="text-xl font-bold text-slate-900 text-center mb-2">Delete University?</h2>
        <p className="text-sm text-slate-600 text-center mb-6">
          Are you sure you want to delete <span className="font-semibold">{university?.name}</span>? This action
          cannot be undone.
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors font-medium text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
// UserCard.jsx is the card view for mobile 
import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import Badge from "../common/Badge";

export default function UserCard({ user }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-sm text-slate-900">{user.name}</div>
          <div className="text-xs text-slate-600 mt-0.5">{user.email}</div>
        </div>
        <Badge status={user.status} />
      </div>
      <div className="text-xs text-slate-500 mb-3">Joined: {user.joinedAt}</div>
      <div className="flex items-center gap-2">
        <button className="flex-1 px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-xs font-medium text-slate-700">
          <Eye className="w-3.5 h-3.5 inline mr-1" />
          View
        </button>
        <button className="flex-1 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors text-xs font-medium text-indigo-600">
          <Edit className="w-3.5 h-3.5 inline mr-1" />
          Edit
        </button>
        <button className="px-3 py-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
          <Trash2 className="w-3.5 h-3.5 text-red-600" />
        </button>
      </div>
    </div>
  );
}
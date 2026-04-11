// UserCard.jsx is the card view for mobile 
import React from "react";
import { Eye, Edit, Trash2, CheckCircle, Shield } from "lucide-react";
import Badge from "../common/Badge";
import formatDateTime from "../../../helpers/formatDateTime";

export default function UserCard({ user, onVerifyUser, verifyingUserId }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      {/* Header with Name and Role Badge */}
      <div className="flex items-start justify-between mb-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div className="font-semibold text-sm text-slate-900">
              {user.first_name + " " + user.last_name}
            </div>
            {/* Verification Status Badge */}
            {user.is_verified ? (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-medium">
                <CheckCircle className="w-3 h-3" />
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-medium">
                <Shield className="w-3 h-3" />
                Unverified
              </span>
            )}
          </div>
          <div className="text-xs text-slate-600 mt-0.5">{user.email}</div>
        </div>
        <Badge status={user.applications?.[0]?.status || "pending"} />
      </div>

      {/* Joined Date */}
      <div className="text-xs text-slate-500 mb-3">
        Joined: {formatDateTime(user.createdAt, "date")}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Verify Button - Only show if not verified */}
        {!user.is_verified && (
          <button
            onClick={() => onVerifyUser?.(user._id)}
            disabled={verifyingUserId === user._id}
            className="flex-1 px-3 py-2 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors text-xs font-medium text-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {verifyingUserId === user._id ? (
              <>
                <div className="w-3 h-3 border-2 border-amber-600 border-t-transparent rounded-full animate-spin inline mr-1" />
                Verifying...
              </>
            ) : (
              <>
                <Shield className="w-3.5 h-3.5 inline mr-1" />
                Verify
              </>
            )}
          </button>
        )}
        
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
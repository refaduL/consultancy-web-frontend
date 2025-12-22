import React from "react";
import Badge from "../common/Badge";

export default function RecentActivity({ recentUsers, recentUniversities }) {
  return (
    <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
      <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-6">
        <h3 className="text-base font-bold text-slate-900 mb-4">Recent Users</h3>
        <div className="space-y-2">
          {recentUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-sm text-slate-900 truncate">{user.name}</div>
                <div className="text-xs text-slate-600 truncate">{user.email}</div>
              </div>
              <Badge status={user.applications[0]?.status || "draft"} />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-6">
        <h3 className="text-base font-bold text-slate-900 mb-4">Recent Universities</h3>
        <div className="space-y-2">
          {recentUniversities.map((uni) => (
            <div
              key={uni._id}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-sm text-slate-900 truncate">{uni.name}</div>
                <div className="text-xs text-slate-600">
                  {/* {uni.country} • {uni.programs} programs */}
                </div>
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ml-2 bg-blue-100 text-blue-700">
                {/* {uni.programs.length} Programs */}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
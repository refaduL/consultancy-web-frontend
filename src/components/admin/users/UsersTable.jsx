// UserTable.jsx is the tabluar view for desktop 
import React from "react";
import { Eye, Edit, Trash2, CheckCircle, Clock } from "lucide-react";
import Badge from "../common/Badge";

export default function UsersTable({ users }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 text-center text-xs font-semibold text-slate-900 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 text-center text-xs font-semibold text-slate-900 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-slate-900 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4 text-sm font-medium text-slate-900">{user.name}</td>
                <td className="px-5 py-4 text-sm text-slate-600 ">{user.email}</td>
                <td className="px-5 py-4 text-center">
                  <Badge status={user.status} />
                </td>
                <td className="px-5 py-4 text-sm text-slate-600 text-center">{user.joinedAt}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-slate-600" />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-slate-600" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
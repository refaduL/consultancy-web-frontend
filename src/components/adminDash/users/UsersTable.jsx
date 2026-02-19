// UserTable.jsx is the tabluar view for desktop 
import React from "react";
import { Eye, Edit, Trash2, CheckCircle, Clock } from "lucide-react";
import Badge from "../common/Badge";
import formatDateTime from "../../../helpers/formatDateTime";

export default function UsersTable({ users }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100 text-xs uppercase border-b border-slate-200  tracking-wider">
            <tr>
              <th className="px-5 py-3 text-left font-semibold">Name</th>
              <th className="px-5 py-3 text-left font-semibold">Email</th>
              <th className="px-5 py-3 text-center font-semibold">Status</th>
              <th className="px-5 py-3 text-center font-semibold">Joined</th>
              <th className="px-5 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {users.map((user) => (
              <tr key={user.id} className="text-sm hover:bg-slate-50 transition-colors">

                <td className="px-5 py-4  font-medium text-slate-900">{user.first_name + " " + user.last_name}</td>

                <td className="px-5 py-4  text-slate-600 ">{user.email}</td>

                <td className="px-5 py-4 text-center">
                  <Badge status={user.applications?.[0]?.status || "draft"} />
                </td>

                {/* <td className="px-5 py-4  text-slate-600 text-center">{formatDateTime(user.createdAt)}</td> */}
                <td className="px-5 py-4  text-slate-600 text-center">{formatDateTime(user.createdAt)}</td>

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
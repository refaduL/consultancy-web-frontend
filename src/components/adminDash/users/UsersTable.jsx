// UserTable.jsx is the tabluar view for desktop 
import React from "react";
import { Eye, Edit, Trash2, CheckCircle, Clock } from "lucide-react";
import Badge from "../common/Badge";
import formatDateTime from "../../../helpers/formatDateTime";

export default function UsersTable({ users, verifyingUserId, onVerifyUser, onDeleteUser }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100 text-xs uppercase border-b border-slate-200  tracking-wider">
            <tr>
              <th className="px-5 py-3 text-left font-semibold">Name</th>
              <th className="px-5 py-3 text-left font-semibold">Email</th>
              <th className="px-5 py-3 text-center font-semibold">APPL. Status</th>
              <th className="px-5 py-3 text-center font-semibold">Joined</th>
              <th className="px-5 py-3 text-center font-semibold">Verified</th>
              <th className="px-5 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {users.map((user) => (
              <tr key={user._id} className="text-sm hover:bg-slate-50 transition-colors">

                <td className="px-5 py-4  font-medium text-slate-900">{user.first_name + " " + user.last_name}</td>

                <td className="px-5 py-4  text-slate-600 ">{user.email}</td>

                <td className="px-5 py-4 text-center">
                  <Badge status={user.applications?.[0]?.status || "not applied"} />
                </td>

                <td className="px-5 py-4  text-slate-600 text-center">{formatDateTime(user.createdAt, "date")}</td>

                {/* <td className="px-5 py-4 text-slate-600 text-center align-middle">
                  <span className="inline-flex w-6 h-6 rounded-full items-center justify-center shrink-0 transition-transform bg-[#3F6A8A]/80">
                    {user.is_verified && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                  </span>
                </td> */}

                <td className="px-5 py-4 text-slate-600 text-center align-middle">
                  {user.is_verified ? (
                    <span className="inline-flex w-6 h-6 rounded-full items-center justify-center shrink-0 transition-transform bg-info-500/80">
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                    </span>
                  ) : (
                    <button
                      onClick={() => onVerifyUser(user._id, user.email)}
                      disabled={verifyingUserId === user._id}
                      className="inline-flex px-3 py-1.5 rounded-md items-center justify-center gap-1.5 transition-all bg-info-500 hover:bg-info-700 text-white text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                      title="Verify User"
                    >
                      {verifyingUserId === user._id ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Verify</span>
                        </>
                      )}
                    </button>
                  )}
                </td>

                

                {/* Action Buttons */}
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-slate-600" />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-slate-600" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" onClick={() => onDeleteUser(user._id)}>
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
import React from "react";
import { Plus } from "lucide-react";
import UsersTable from "./UsersTable";
import UserCard from "./UserCard";

export default function UsersTab({ users }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">All Users</h3>
          <p className="text-xs text-slate-600 mt-0.5">Manage user accounts and permissions</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-300 hover:from-primary-500 hover:to-primary-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg group">
          <Plus className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Add New User
        </button>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <UsersTable users={users} />
      </div>
    </div>
  );
}
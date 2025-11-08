// Didn't used anywhere yet, but it's a non-functional admin dashboard component with multiple tabs and mock data.

import React, { useState } from "react";
import {
  Users,
  GraduationCap,
  FileText,
  Settings,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Menu,
  X,
  Home,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

export default function AdminDashboardExperimental() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock Data
  const stats = [
    { label: "Total Users", value: "2,847", change: "+12.5%", trend: "up" },
    { label: "Universities", value: "156", change: "+8", trend: "up" },
    { label: "Applications", value: "1,234", change: "+23.1%", trend: "up" },
    { label: "Pending Review", value: "47", change: "-5", trend: "down" },
  ];

  const recentUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "active", joinedAt: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "active", joinedAt: "2024-01-14" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", status: "pending", joinedAt: "2024-01-13" },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", status: "active", joinedAt: "2024-01-12" },
  ];

  const recentUniversities = [
    { id: 1, name: "Harvard University", country: "USA", programs: 45, admissionSeason: "Spring 2025" },
    { id: 2, name: "Oxford University", country: "UK", programs: 38, admissionSeason: "Fall 2024" },
    { id: 3, name: "MIT", country: "USA", programs: 52, admissionSeason: "Spring 2025" },
    { id: 4, name: "Cambridge University", country: "UK", programs: 41, admissionSeason: "Fall 2024" },
  ];

  const menuItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "users", label: "Users", icon: Users },
    { id: "universities", label: "Universities", icon: GraduationCap },
    { id: "applications", label: "Applications", icon: FileText },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab stats={stats} recentUsers={recentUsers} recentUniversities={recentUniversities} />;
      case "users":
        return <UsersTab users={recentUsers} />;
      case "universities":
        return <UniversitiesTab universities={recentUniversities} />;
      case "applications":
        return <ApplicationsTab />;
      default:
        return <OverviewTab stats={stats} recentUsers={recentUsers} recentUniversities={recentUniversities} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0 md:w-20"
        } bg-white border-r border-slate-200 transition-all duration-300 fixed h-full z-50 overflow-hidden`}
      >
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-lg font-bold text-slate-900">Admin Panel</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5 text-slate-600" /> : <Menu className="w-5 h-5 text-slate-600" />}
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
                  activeTab === item.id
                    ? "bg-indigo-50 text-indigo-600 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 font-medium"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? "md:ml-64" : "md:ml-20"} transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
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

        {/* Content Area */}
        <div className="p-4 md:p-8">{renderContent()}</div>
      </main>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ stats, recentUsers, recentUniversities }) {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-600 font-medium uppercase tracking-wide">{stat.label}</span>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  stat.trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-slate-900">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-6">
        <h3 className="text-base font-bold text-slate-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <button className="flex items-center justify-center gap-2 px-3 py-2.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors font-medium text-sm">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add User</span>
            <span className="sm:hidden">User</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-3 py-2.5 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors font-medium text-sm">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add University</span>
            <span className="sm:hidden">University</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-3 py-2.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium text-sm">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Reports</span>
            <span className="sm:hidden">Reports</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-3 py-2.5 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors font-medium text-sm">
            <TrendingUp className="w-4 h-4" />
            <span className="hidden sm:inline">Analytics</span>
            <span className="sm:hidden">Analytics</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-6">
          <h3 className="text-base font-bold text-slate-900 mb-4">Recent Users</h3>
          <div className="space-y-2">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm text-slate-900 truncate">{user.name}</div>
                  <div className="text-xs text-slate-600 truncate">{user.email}</div>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ml-2 ${
                    user.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-6">
          <h3 className="text-base font-bold text-slate-900 mb-4">Recent Universities</h3>
          <div className="space-y-2">
            {recentUniversities.map((uni) => (
              <div key={uni.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm text-slate-900 truncate">{uni.name}</div>
                  <div className="text-xs text-slate-600">
                    {uni.country} • {uni.programs} programs
                  </div>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ml-2 bg-blue-100 text-blue-700">
                  {uni.admissionSeason}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Users Management Tab
function UsersTab({ users }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">All Users</h3>
          <p className="text-xs text-slate-600 mt-0.5">Manage user accounts and permissions</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm">
          <Plus className="w-4 h-4" />
          Add New User
        </button>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-sm text-slate-900">{user.name}</div>
                <div className="text-xs text-slate-600 mt-0.5">{user.email}</div>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ml-2 ${
                  user.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {user.status}
              </span>
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
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Name</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Email</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Joined</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-900 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-slate-900">{user.name}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{user.email}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                        user.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {user.status === "active" ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">{user.joinedAt}</td>
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
    </div>
  );
}

// Universities Management Tab
function UniversitiesTab({ universities }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">All Universities</h3>
          <p className="text-xs text-slate-600 mt-0.5">Manage university profiles and programs</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm">
          <Plus className="w-4 h-4" />
          Add University
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {universities.map((uni) => (
          <div key={uni.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="min-w-0 flex-1">
                <h4 className="text-base font-bold text-slate-900 mb-1 truncate">{uni.name}</h4>
                <p className="text-xs text-slate-600">{uni.country}</p>
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ml-2 bg-blue-100 text-blue-700">
                {uni.admissionSeason}
              </span>
            </div>
            <div className="mb-4 pb-4 border-b border-slate-200">
              <div className="text-xs text-slate-600">
                <span className="font-semibold text-slate-900">{uni.programs}</span> programs available
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex-1 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg transition-colors font-medium text-xs">
                <Eye className="w-3.5 h-3.5 inline mr-1" />
                View
              </button>
              <button className="flex-1 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg transition-colors font-medium text-xs">
                <Edit className="w-3.5 h-3.5 inline mr-1" />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Applications Tab
function ApplicationsTab() {
  const applications = [
    { id: 1, student: "Alex Brown", university: "Harvard", status: "pending", date: "2024-01-15" },
    { id: 2, student: "Emma Davis", university: "Oxford", status: "approved", date: "2024-01-14" },
    { id: 3, student: "James Wilson", university: "MIT", status: "pending", date: "2024-01-13" },
    { id: 4, student: "Olivia Taylor", university: "Cambridge", status: "rejected", date: "2024-01-12" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">Applications</h3>
          <p className="text-xs text-slate-600 mt-0.5">Review and manage student applications</p>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {applications.map((app) => (
          <div key={app.id} className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-semibold text-sm text-slate-900">{app.student}</div>
                <div className="text-xs text-slate-600 mt-0.5">{app.university}</div>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${
                  app.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : app.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {app.status}
              </span>
            </div>
            <div className="text-xs text-slate-500 mb-3">{app.date}</div>
            <button className="w-full px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg transition-colors text-xs font-medium">
              Review Application
            </button>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Student</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">University</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Date</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-900 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-slate-900">{app.student}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{app.university}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                        app.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : app.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {app.status === "approved" ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : app.status === "pending" ? (
                        <Clock className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      {app.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">{app.date}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end">
                      <button className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg transition-colors text-xs font-medium">
                        Review
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
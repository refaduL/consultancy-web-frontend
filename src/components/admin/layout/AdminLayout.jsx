import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout({ activeTab, onTabChange, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setSidebarOpen(true);   // md and above: open
    } else {
      setSidebarOpen(false);  // sm: collapsed
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          onTabChange(tab);
          if (window.innerWidth < 768) setSidebarOpen(false);
        }}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <main className={`flex-1 ${sidebarOpen ? "md:ml-64" : "md:ml-20"} transition-all duration-300`}>
        <AdminHeader
          activeTab={activeTab}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}

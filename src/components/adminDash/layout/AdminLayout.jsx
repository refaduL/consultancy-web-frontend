import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setSidebarOpen(window.innerWidth >= 768);
  }, []);

  const pathname = location.pathname;

  const activeTab = pathname.includes("/users")
    ? "users"
    : pathname.includes("/universities")
      ? "universities"
      : pathname.includes("/applications")
        ? "applications"
        : "overview";

  const handleTabChange = (tab) => {
    navigate(tab === "overview" ? "/admindashboard" : `/admindashboard/${tab}`);

    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <main
        className={`flex-1 ${
          sidebarOpen ? "md:ml-64" : "md:ml-20"
        } transition-all duration-300`}
      >
        <AdminHeader
          activeTab={activeTab}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

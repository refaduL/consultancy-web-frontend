
import DocumentsSection from "../components/userDashboard/documents/DocumentsSection";
import DashboardLayout from "../components/userDashboard/layout/DashboardLayout";
import DashboardNavbar from "../components/userDashboard/layout/DashboardNavbar";
import Sidebar from "../components/userDashboard/sidebar/Sidebar";
import StatsSection from "../components/userDashboard/stats/StatsSection";
import UniversitiesSection from "../components/userDashboard/universities/UniversitiesSection";
import useDashboardDocuments from "../hooks/useDashboardDocuments";

import { useAuth } from "../hooks/useAuth";

export default function UserDashboard() {
  const { user, loading, logout } = useAuth();

  const {
    documents,
    loadingDocKey,
    handleUpload,
    handleDelete,
    uploaded,
    total,
    completion
  } = useDashboardDocuments(user);

  const recentActivity = [
    { id: 1, type: "success", message: "Passport approved", date: "2 hours ago" },
    { id: 2, type: "success", message: "Visa application submitted", date: "1 day ago" },
    { id: 3, type: "warning", message: "Document verification pending", date: "3 days ago" },
  ];

  const uniImageLink = "https://plus.unsplash.com/premium_photo-1683888229109-17cb0975af20?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1632";
  const interestedUniversities = [
    { id: 1, name: "Harvard University", country: "USA", image: uniImageLink, ranking: 1, tuition: 55000 },
    { id: 2, name: "Stanford University", country: "USA", image: uniImageLink, ranking: 2, tuition: 52000 },
    { id: 3, name: "MIT", country: "USA", image: uniImageLink, ranking: 3, tuition: 58000 },
    { id: 4, name: "University of Cambridge", country: "UK", image: uniImageLink, ranking: 4, tuition: 45000 },
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar user={user} onLogout={logout} />
        <div className="flex items-center justify-center h-64">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
          {/* <div className="flex items-center justify-center h-screen">
            <p className="text-slate-500">Checking authentication...</p>
          </div> */}
        </div>
      </DashboardLayout>
    );
  }


  return (
    <DashboardLayout>
      <DashboardNavbar user={user} onLogout={logout} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <StatsSection
          applicationStatus={user?.application?.status?.toUpperCase() || "PENDING"}
          uploaded={uploaded}
          total={total}
          completion={completion}
          interestedCount={interestedUniversities.length}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          <DocumentsSection
            applicationStatus={user?.application?.status || "pending"}
            documents={documents}
            completion={completion}
            loadingDocKey={loadingDocKey}
            onUpload={handleUpload}
            onDelete={handleDelete}
          />

          <Sidebar activities={recentActivity} />
        </div>

        <UniversitiesSection universities={interestedUniversities} />
      </div>
    </DashboardLayout>
  );
}

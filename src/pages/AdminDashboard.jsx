import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ApplicationsTab from "../components/adminDash/applications/ApplicationsTab";
import AdminLayout from "../components/adminDash/layout/AdminLayout";
import OverviewTab from "../components/adminDash/overview/OverviewTab";
import DeleteConfirmModal from "../components/adminDash/common/DeleteConfirmModal";
import UniversitiesTab from "../components/adminDash/universities/UniversitiesTab";
import UsersTab from "../components/adminDash/users/UsersTab";
import { fetchApplications } from "../services/applicationsService";
import { fetchUniversities } from "../services/universityService";
import { fetchUsers } from "../services/userService";

const VALID_TABS = ["overview", "users", "universities", "applications"];

export default function AdminDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = VALID_TABS.includes(searchParams.get("tab"))
    ? searchParams.get("tab")
    : "overview";

  const handleTabChange = (tab) => setSearchParams({ tab });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingUniversity, setDeletingUniversity] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  const [users, setUsers] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [usersData, universitiesData, applicationsData] = await Promise.all([
          fetchUsers(),
          fetchUniversities(),
          fetchApplications(),
        ]);
        setUsers(usersData.payload.users);
        setUniversities(universitiesData.payload.universities);
        setApplications(applicationsData.payload.applications);
      } catch (error) {
        console.error("Dashboard data load failed:", error);
      }
    };
    loadDashboardData();
  }, []);

  const stats = useMemo(() => [
    { label: "Total Users", value: users.length, change: "+12.5%", trend: "up" },
    { label: "Universities", value: universities.length, change: "+8", trend: "up" },
    { label: "Applications", value: applications.length, change: "+23.1%", trend: "up" },
    {
      label: "Pending Review",
      value: applications.filter((app) => app.status === "submitted").length,
      change: "-5",
      trend: "down",
    },
  ], [users, universities, applications]);

  const recentUsers = useMemo(() =>
    [...users].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5),
  [users]);

  const recentUniversities = useMemo(() =>
    [...universities].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5),
  [universities]);

  const handleDeleteUser = (user) => {
    setDeletingUser(user);
    setShowDeleteModal(true);
  };

  const handleDeleteUniversity = (uni) => {
    setDeletingUniversity(uni);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    // TODO: call delete API here
    setShowDeleteModal(false);
    setDeletingUniversity(null);
    setDeletingUser(null);
  };

  const renderContent = () => {
    const commonProps = {
      stats,
      recentUsers,
      recentUniversities,
      onDeleteUniversity: handleDeleteUniversity,
    };

    switch (activeTab) {
      case "overview":
        return <OverviewTab {...commonProps} />;
      case "users":
        return <UsersTab users={users} onDeleteUser={handleDeleteUser} />;
      case "universities":
        return <UniversitiesTab universities={universities} onDeleteUniversity={handleDeleteUniversity} />;
      case "applications":
        return <ApplicationsTab apps={applications} />;
      default:
        return <OverviewTab {...commonProps} />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={handleTabChange}>
      {renderContent()}

      {showDeleteModal && (
        <DeleteConfirmModal
          entity={
            deletingUniversity
              ? { ...deletingUniversity, type: "University" }
              : deletingUser
              ? { ...deletingUser, type: "User" }
              : null
          }
          onClose={() => {
            setShowDeleteModal(false);
            setDeletingUniversity(null);
            setDeletingUser(null);
          }}
          onConfirm={handleConfirmDelete}
        />
      )}
    </AdminLayout>
  );
}
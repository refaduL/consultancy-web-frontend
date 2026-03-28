import { useEffect, useMemo, useState } from "react";
import ApplicationsTab from "../components/adminDash/applications/ApplicationsTab";
import AdminLayout from "../components/adminDash/layout/AdminLayout";
import OverviewTab from "../components/adminDash/overview/OverviewTab";
import UniDeleteConfirmModal from "../components/adminDash/universities/DeleteConfirmModal";
import DeleteConfirmModal from "../components/adminDash/common/DeleteConfirmModal";
import UniversitiesTab from "../components/adminDash/universities/UniversitiesTab";
import UniversityFormModal from "../components/adminDash/universities/UniversityFormModal";
import UsersTab from "../components/adminDash/users/UsersTab";
import { fetchApplications } from "../services/applicationsService";
import { createUniversity, fetchUniversities } from "../services/universityService";
import { fetchUsers } from "../services/userService";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showUniversityModal, setShowUniversityModal] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingUniversity, setDeletingUniversity] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  const [users, setUsers] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [usersData, universitiesData, applicationsData] =
          await Promise.all([
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

  useEffect(() => {
    console.log("Fetched Users:", users);
    console.log("Fetched Universities:", universities);
    console.log("Fetched Applications:", applications);
  }, [users, universities, applications]);

  const stats = useMemo(
    () => [
      { label: "Total Users", value: users.length, change: "+12.5%", trend: "up" },
      { label: "Universities", value: universities.length, change: "+8", trend: "up" },
      { label: "Applications", value: applications.length, change: "+23.1%", trend: "up" },
      { label: "Pending Review",
        value: applications.filter((app) => app.status === "submitted").length,
        change: "-5",
        trend: "down"
      },
    ],
    [users, universities, applications]
  );

  const recentUsers = useMemo(() => {
    return [...users]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [users]);

  const recentUniversities = useMemo(() => {
    return [...universities]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [universities]);

  const handleDeleteUser = (user) => {
    setDeletingUser(user);
    setShowDeleteModal(true);
  };

  const handleAddUniversity = () => {
    setEditingUniversity(null);
    setShowUniversityModal(true);
  };

  const handleEditUniversity = (uni) => {
    setEditingUniversity(uni);
    setShowUniversityModal(true);
  };

  const handleDeleteUniversity = (uni) => {
    setDeletingUniversity(uni);
    setShowDeleteModal(true);
  };

  const handleSaveUniversity = async (data) => {
    try {
      console.log("Saving university:", data);
      
      if (!data.name || !data.city || !data.country) {
        console.log("Validation failed: Missing required fields");
        return;
      }

      setShowUniversityModal(false);
      setEditingUniversity(null);

      await createUniversity(data);
      // Refresh universities list after creation
      const updatedUnis = await fetchUniversities();
      setUniversities(updatedUnis.payload.universities);
    } catch (error) {
      console.error("Error saving university:", error);
    }
  };

  const handleConfirmDelete = () => {
    console.log("Deleting... :", deletingUniversity || deletingUser);
    setShowDeleteModal(false);
    setDeletingUniversity(null);
    setDeletingUser(null);
  };

  const renderContent = () => {
    const commonProps = {
      stats,
      recentUsers,
      recentUniversities,
      onAddUniversity: handleAddUniversity,
      onEditUniversity: handleEditUniversity,
      onDeleteUniversity: handleDeleteUniversity,
    };

    switch (activeTab) {
      case "overview":
        return <OverviewTab {...commonProps} />;
      case "users":
        return <UsersTab users={users} onDeleteUser={handleDeleteUser} />;
      case "universities":
        return (
          <UniversitiesTab universities={universities} {...commonProps} />
        );
      case "applications":
        return <ApplicationsTab apps={applications} />;
      default:
        return <OverviewTab {...commonProps} />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>

      {renderContent()}

      {showUniversityModal && (
        <UniversityFormModal
          university={editingUniversity}
          onClose={() => {
            setShowUniversityModal(false);
            setEditingUniversity(null);
          }}
          onSave={handleSaveUniversity}
        />
      )} 

      {showDeleteModal && (
        <DeleteConfirmModal
          entity={ deletingUniversity && {...deletingUniversity, type: "University"} || deletingUser && {...deletingUser, type: "User"}}
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

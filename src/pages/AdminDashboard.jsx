import { useState } from "react";
import ApplicationsTab from "../components/admin/applications/ApplicationsTab";
import AdminLayout from "../components/admin/layout/AdminLayout";
import OverviewTab from "../components/admin/overview/OverviewTab";
import DeleteConfirmModal from "../components/admin/universities/DeleteConfirmModal";
import UniversitiesTab from "../components/admin/universities/UniversitiesTab";
import UniversityFormModal from "../components/admin/universities/UniversityFormModal";
import UsersTab from "../components/admin/users/UsersTab";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showUniversityModal, setShowUniversityModal] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingUniversity, setDeletingUniversity] = useState(null);

  // Mock Data - will move to context/state management later
  const stats = [
    { label: "Total Users", value: "2,847", change: "+12.5%", trend: "up" },
    { label: "Universities", value: "156", change: "+8", trend: "up" },
    { label: "Applications", value: "1,234", change: "+23.1%", trend: "up" },
    { label: "Pending Review", value: "47", change: "-5", trend: "down" },
  ];

  const recentUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "pending", joinedAt: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "active", joinedAt: "2024-01-14" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", status: "rejected", joinedAt: "2024-01-13" },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", status: "completed", joinedAt: "2024-01-12" },
  ];

  const recentUniversities = [
    { id: 1, name: "Harvard University", country: "USA", programs: 45, admissionSeason: "Spring 2025" },
    { id: 2, name: "Oxford University", country: "UK", programs: 38, admissionSeason: "Fall 2024" },
    { id: 3, name: "MIT", country: "USA", programs: 52, admissionSeason: "Spring 2025" },
    { id: 4, name: "Cambridge University", country: "UK", programs: 41, admissionSeason: "Fall 2024" },
  ];

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

  const handleSaveUniversity = (data) => {
    console.log('Saving university:', data);
    setShowUniversityModal(false);
    setEditingUniversity(null);
  };

  const handleConfirmDelete = () => {
    console.log('Deleting university:', deletingUniversity);
    setShowDeleteModal(false);
    setDeletingUniversity(null);
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
        return <UsersTab users={recentUsers} />;
      case "universities":
        return <UniversitiesTab universities={recentUniversities} {...commonProps} />;
      case "applications":
        return <ApplicationsTab />;
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
          university={deletingUniversity}
          onClose={() => {
            setShowDeleteModal(false);
            setDeletingUniversity(null);
          }}
          onConfirm={handleConfirmDelete}
        />
      )}
    </AdminLayout>
  );
}
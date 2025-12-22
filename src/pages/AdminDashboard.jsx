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
  { id: 1, name: "ETH Zurich", country: "Switzerland", programs: 58, admissionSeason: "Fall 2025" },
  { id: 2, name: "University of Toronto", country: "Canada", programs: 75, admissionSeason: "Fall 2025" },
  { id: 3, name: "National University of Singapore", country: "Singapore", programs: 62, admissionSeason: "Spring 2026" },
  { id: 4, name: "University of Melbourne", country: "Australia", programs: 81, admissionSeason: "Semester 1 2026" },
  { id: 5, name: "Technical University of Munich", country: "Germany", programs: 49, admissionSeason: "Winter 2025" },
  { id: 6, name: "University of Tokyo", country: "Japan", programs: 55, admissionSeason: "Spring 2026" },
  { id: 7, name: "PSL Research University Paris", country: "France", programs: 42, admissionSeason: "Fall 2025" },
  { id: 8, name: "Nanyang Technological University", country: "Singapore", programs: 67, admissionSeason: "Fall 2025" },
  { id: 9, name: "University of British Columbia", country: "Canada", programs: 70, admissionSeason: "Winter 2026" },
  { id: 10, name: "University of Sydney", country: "Australia", programs: 78, admissionSeason: "Semester 2 2025" },
  { id: 11, name: "Heidelberg University", country: "Germany", programs: 45, admissionSeason: "Summer 2026" },
  { id: 12, name: "Seoul National University", country: "South Korea", programs: 53, admissionSeason: "Spring 2026" },
  { id: 13, name: "KU Leuven", country: "Belgium", programs: 50, admissionSeason: "Fall 2025" },
  { id: 14, name: "Delft University of Technology", country: "Netherlands", programs: 48, admissionSeason: "Fall 2025" },
  { id: 15, name: "Peking University", country: "China", programs: 60, admissionSeason: "Fall 2025" },
  { id: 16, name: "Kyoto University", country: "Japan", programs: 52, admissionSeason: "Fall 2025" }
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
// pages/admin/AdminEnrollmentsPage.jsx
import { useEffect, useState } from "react";
import { useToast } from "../../hooks/useToast";
import EnrollmentsTab from "../../components/adminDash/enrollments/EnrollmentsTab";
import {
  fetchAllEnrollments,
  updateEnrollmentStatus,
  deleteEnrollment,
} from "../../services/enrollmentService";
import ViewEnrollmentModal from "../../components/adminDash/enrollments/ViewEnrollmentModal";

export default function AdminEnrollmentsPage() {
  const { addToast } = useToast();

  const [enrollments,  setEnrollments]  = useState([]);
  const [updatingId,   setUpdatingId]   = useState(null);
  const [updatingAction, setUpdatingAction] = useState(null);

  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAllEnrollments();
        setEnrollments(data.payload.enrollments);
        console.log("Fetched enrollments:", data.payload.enrollments);
      } catch (error) {
        console.error("Failed to load enrollments:", error);
      }
    };
    load();
  }, []);

  const handleUpdateStatus = async (enrollmentId, newStatus) => {
    const action = newStatus === 'confirmed' ? 'confirm' : 'cancel';
    
    setUpdatingAction(action);
    setUpdatingId(enrollmentId);
    try {
      const res = await updateEnrollmentStatus(enrollmentId, newStatus);
      if (res.success) {
        setEnrollments((prev) =>
          prev.map((e) =>
            e._id === enrollmentId ? { ...e, status: newStatus } : e
          )
        );
        addToast({
          type: "success",
          title: `Enrollment ${newStatus}`,
          description: res.message || `Status updated to ${newStatus}.`,
        });
      } else {
        throw new Error("Status update failed.");
      }
    } catch (error) {
      console.error("updateEnrollmentStatus error:", error);
      addToast({
        type: "error",
        title: "Update failed",
        description: error.message || "Could not update enrollment status.",
      });
    } finally {
      setUpdatingAction(null);
      setUpdatingId(null);
    }
  };

  // ── delete ──────────────────────────────────────────────────────────────
  const handleDelete = async (enrollmentId) => {
    // wire to your DeleteConfirmModal the same way AdminDashboard does
    // for now: direct delete
    try {
      const res = await deleteEnrollment(enrollmentId);
      if (res.success) {
        setEnrollments((prev) => prev.filter((e) => e._id !== enrollmentId));
        addToast({
          type: "success",
          title: "Enrollment deleted",
          description: "The enrollment record has been removed.",
        });
      }
    } catch (error) {
      console.error("deleteEnrollment error:", error);
      addToast({
        type: "error",
        title: "Delete failed",
        description: error.message || "Could not delete enrollment.",
      });
    }
  };

  const handleView = (enrollmentId) => {
    const enrollment = enrollments.find(e => e._id === enrollmentId);
    setSelectedEnrollment(enrollment);
    setShowViewModal(true);
  };

  return (
    <>
        <EnrollmentsTab
        enrollments={enrollments}
        updatingId={updatingId}
        updatingAction={updatingAction}
        onUpdateStatus={handleUpdateStatus}
        onView={handleView}
        onDelete={handleDelete}
        />

        {/* View Modal */}
        {showViewModal && (
            <ViewEnrollmentModal
                enrollment={selectedEnrollment}
                onClose={() => setShowViewModal(false)}
            />
        )}
    </>
    
  );
}
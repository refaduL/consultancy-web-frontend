import { useEffect, useState } from "react";
import UsersTab from "../../components/adminDash/users/UsersTab";
import { fetchUsers } from "../../services/userService";
import { verifyUserEmailByAdmin } from "../../services/authService";
import { useToast } from "../../hooks/useToast";

export default function AdminUsersPage() {
  const { addToast } = useToast();

  const [users, setUsers] = useState([]);
  const [verifyingUserId, setVerifyingUserId] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();
      setUsers(data.payload.users);
    };

    loadUsers();
  }, []);

  const handleVerifyUser = async (userId, email) => {
    setVerifyingUserId(userId);
    try {
      const res = await verifyUserEmailByAdmin(email);
      if (res.success) {
        // Option 1: Refetch users // fetchUsers();
        // Option 2: Update locally
        setUsers(users.map(user => 
          user._id === userId ? { ...user, is_verified: true } : user
        ));

        addToast({ 
          type: "success", 
          title: "Email verified Successfully", 
          description: res.message || "User verified successfully" 
        });
      } else {
        throw new Error('Verification failed');
      }
    } catch (error) {
      console.error("Verification failed:", error);
      addToast({ 
        type: "error", 
        title: "Failed to verify user", 
        description: error.message || "Failed to verify user email" 
      });
    } finally {
      setVerifyingUserId(null);
    }
  };

  function handleDeleteUser(userId) {
    console.log("Delete user with ID:", userId);
  }

  return (
    <UsersTab
      users={users}
      verifyingUserId={verifyingUserId}
      onVerifyUser={handleVerifyUser}
      onDeleteUser={handleDeleteUser}
    />
  );
}

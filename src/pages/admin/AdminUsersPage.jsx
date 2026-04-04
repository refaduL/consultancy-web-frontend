import { useEffect, useState } from "react";
import UsersTab from "../../components/adminDash/users/UsersTab";
import { fetchUsers } from "../../services/userService";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();
      setUsers(data.payload.users);
    };

    loadUsers();
  }, []);

  return <UsersTab users={users} />;
}
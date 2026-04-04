import { useEffect, useMemo, useState } from "react";
import OverviewTab from "../../components/adminDash/overview/OverviewTab";
import { fetchApplications } from "../../services/applicationsService";
import { fetchUniversities } from "../../services/universityService";
import { fetchUsers } from "../../services/userService";

export default function AdminOverviewPage() {
  const [users, setUsers] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [usersData, universitiesData, applicationsData] = await Promise.all([
        fetchUsers(),
        fetchUniversities(),
        fetchApplications(),
      ]);

      setUsers(usersData.payload.users);
      setUniversities(universitiesData.payload.universities);
      setApplications(applicationsData.payload.applications);
    };

    loadData();
  }, []);

  const stats = useMemo(
    () => [
      { label: "Total Users", value: users.length, change: "+12.5%", trend: "up" },
      { label: "Universities", value: universities.length, change: "+8", trend: "up" },
      { label: "Applications", value: applications.length, change: "+23.1%", trend: "up" },
      {
        label: "Pending Review",
        value: applications.filter((app) => app.status === "submitted").length,
        change: "-5",
        trend: "down",
      },
    ],
    [users, universities, applications]
  );

  const recentUsers = [...users]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const recentUniversities = [...universities]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <OverviewTab
      stats={stats}
      recentUsers={recentUsers}
      recentUniversities={recentUniversities}
    />
  );
}
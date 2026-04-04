import { useEffect, useState } from "react";
import ApplicationsTab from "../../components/adminDash/applications/ApplicationsTab";
import { fetchApplications } from "../../services/applicationsService";

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const loadApplications = async () => {
      const data = await fetchApplications();
      setApplications(data.payload.applications);
    };

    loadApplications();
  }, []);

  return <ApplicationsTab apps={applications} />;
}

import React from "react";
import {useEffect, useState} from "react";
import ApplicationsTable from "./ApplicationsTable";
import ApplicationCard from "./ApplicationCard";

// const applications = [
//   { _id: "app_1", student: "Alex Brown",    university: "Harvard",   status: "pending",  date: "2024-01-15" },
//   { _id: "app_2", student: "Emma Davis",    university: "Oxford",    status: "approved", date: "2024-01-14" },
//   { _id: "app_3", student: "James Wilson",  university: "MIT",       status: "pending",  date: "2024-01-13" },
//   { _id: "app_4", student: "Olivia Taylor", university: "Cambridge", status: "rejected", date: "2024-01-12" },
// ];

export default function ApplicationsTab({ apps }) {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    setApplications(apps);
  }, [apps]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">Applications</h3>
          <p className="text-xs text-slate-600 mt-0.5">Review and manage student applications</p>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {applications.map((app) => (
          <ApplicationCard key={app._id} application={app} />
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <ApplicationsTable applications={applications} />
      </div>
    </div>
  );
}
import React from "react";
import StatsGrid from "./StatsGrid";
import QuickActions from "./QuickActions";
import RecentActivity from "./RecentActivity";

export default function OverviewTab({ stats, recentUsers, recentUniversities, onAddUniversity }) {
  return (
    <div className="space-y-6">
      <StatsGrid stats={stats} />
      <QuickActions onAddUniversity={onAddUniversity} />
      <RecentActivity recentUsers={recentUsers} recentUniversities={recentUniversities} />
    </div>
  );
}
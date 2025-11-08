// FILE: src/components/admin/overview/StatsGrid.jsx
// ============================================
import React from "react";
import StatCard from "../common/StatCard";

export default function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}

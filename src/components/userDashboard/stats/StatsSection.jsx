import { Award, FileCheck, TrendingUp, Heart } from "lucide-react";
import StatCard from "./StatCard";

export default function StatsSection({
  applicationStatus,
  uploaded,
  total,
  completion,
  interestedCount
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard
        icon={<Award />}
        title="Status"
        value={applicationStatus}
        subtitle="Application"
        color={{ bg: "bg-green-100", text: "text-green-600", icon: "text-green-600" }}
      />
      <StatCard
        icon={<FileCheck />}
        title="Documents"
        value={`${uploaded}/${total}`}
        subtitle="Uploaded"
        color={{ bg: "bg-indigo-100", text: "text-indigo-600", icon: "text-indigo-600" }}
      />
      <StatCard
        icon={<TrendingUp />}
        title="Progress"
        value={`${completion}%`}
        subtitle="Complete"
        color={{ bg: "bg-purple-100", text: "text-slate-900", icon: "text-purple-600" }}
      />
      <StatCard
        icon={<Heart />}
        title="Interested"
        value={interestedCount}
        subtitle="Universities"
        color={{ bg: "bg-pink-100", text: "text-slate-900", icon: "text-pink-600" }}
      />
    </div>
  );
}

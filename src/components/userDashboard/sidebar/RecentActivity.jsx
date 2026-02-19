import { Calendar } from "lucide-react";
import ActivityItem from "./ActivityItem";

export default function RecentActivity({ activities }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-indigo-600" />
        Recent Activity
      </h3>
      <div className="space-y-3">
        {activities.map((a) => (
          <ActivityItem key={a.id} activity={a} />
        ))}
      </div>
    </div>
  );
}

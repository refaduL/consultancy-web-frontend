export default function ActivityItem({ activity }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
      <div
        className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${activity.type === "success" ? "bg-green-500" : "bg-blue-500"}`}
      ></div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-900">{activity.message}</p>
        <p className="text-xs text-slate-500 mt-0.5">{activity.date}</p>
      </div>
    </div>
  );
}

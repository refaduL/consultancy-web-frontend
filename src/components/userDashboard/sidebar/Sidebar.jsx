import QuickActions from "./QuickActions";
import RecentActivity from "./RecentActivity";

export default function Sidebar({ activities }) {
  return (
    <div className="w-full lg:w-80 flex flex-col gap-6">
      <RecentActivity activities={activities} />
      <QuickActions />
    </div>
  );
}

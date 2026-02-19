import { Globe, Heart, Upload } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
      <div className="space-y-2">
        <button className="w-full px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg flex items-center gap-2">
          <Upload className="w-4 h-4" /> Upload Documents
        </button>
        <button className="w-full px-4 py-2 bg-purple-50 text-purple-600 rounded-lg flex items-center gap-2">
          <Globe className="w-4 h-4" /> Browse Universities
        </button>
        <button className="w-full px-4 py-2 bg-green-50 text-green-600 rounded-lg flex items-center gap-2">
          <Heart className="w-4 h-4" /> My Interested List
        </button>
      </div>
    </div>
  );
}

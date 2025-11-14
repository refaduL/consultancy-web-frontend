import { FileText, GraduationCap, Home, Menu, Settings, Users, X } from "lucide-react";

const menuItems = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "users", label: "Users", icon: Users },
  { id: "universities", label: "Universities", icon: GraduationCap },
  { id: "applications", label: "Applications", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar({ activeTab, onTabChange, isOpen, onToggle }) {
  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-0 md:w-20"
      } bg-white border-r border-slate-200 transition-all duration-300 fixed h-full z-50 overflow-hidden`}
    >
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        {isOpen && <h1 className="text-lg font-bold text-slate-900">Admin Panel</h1>}
        <button onClick={onToggle} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          {isOpen ? <X className="w-5 h-5 text-slate-600" /> : <Menu className="w-5 h-5 text-slate-600" />}
        </button>
      </div>

      <nav className="p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
                activeTab === item.id
                  ? "bg-indigo-50 text-indigo-600 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 font-medium"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
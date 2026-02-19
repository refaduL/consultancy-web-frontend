import { useState } from "react";
import { Bell, GraduationCap, Home } from "lucide-react";
import { Link } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import NotificationOverlay from "../NotificationOverlay";

export default function DashboardNavbar({ user, onLogout }) {
  const [openUserDropdown, setOpenUserDropdown] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const initials = `${user?.first_name?.[0] ?? ""}${user?.last_name?.[0] ?? ""}`;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between relative">

          {/* LEFT: Dashboard + Name */}
          <div className="flex flex-col leading-tight min-w-0">
            <h1 className="text-sm sm:text-base font-semibold text-slate-900 truncate">
              Dashboard
            </h1>
            <p className="text-[11px] sm:text-xs text-slate-500 truncate max-w-[120px] sm:max-w-none">
              {user?.first_name} {user?.last_name}
            </p>
          </div>
          {/* Logo + Title (Clickable Home) */}
          {/* <Link
            to="/"
            className="flex items-center gap-3 group transition"
          >
            <div className="w-11 h-11 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>

            <div className="leading-tight">
              <h1 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition">
                My Dashboard
              </h1>
              <p className="text-xs text-slate-500">
                {user?.first_name} {user?.last_name}
              </p>
            </div>
          </Link> */}

          {/* CENTER: EduGlobal */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link
              to="/"
              className="text-lg sm:text-xl font-extrabold tracking-tight
              bg-gradient-to-r from-indigo-600 to-purple-600
              bg-clip-text text-transparent
              hover:opacity-80 transition-opacity duration-200"
            >
              EduGlobal
            </Link>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-2 sm:gap-3 relative">

            {/* Notification */}
            <button
              onClick={() => setShowNotification(true)}
              className="relative group p-2 rounded-xl
              hover:bg-slate-100 active:scale-95
              transition-all duration-200"
            >
              <Bell className="w-5 h-5 text-slate-600 group-hover:text-indigo-600 transition-colors" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>

            {/* Avatar */}
            <div
              onClick={() => setOpenUserDropdown(!openUserDropdown)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full
              bg-gradient-to-tr from-indigo-600 to-purple-600
              text-white font-semibold text-sm
              flex items-center justify-center
              cursor-pointer shadow-md
              hover:scale-105 active:scale-95
              transition-all duration-200"
            >
              {initials || "U"}
            </div>

            {openUserDropdown && (
              <UserDropdown
                user={user}
                onLogout={onLogout}
                onClose={() => setOpenUserDropdown(false)}
              />
            )}

          </div>
        </div>
      </nav>

      {showNotification && (
        <NotificationOverlay
          user={user}
          onClose={() => setShowNotification(false)}
        />
      )}
    </>
  );
}

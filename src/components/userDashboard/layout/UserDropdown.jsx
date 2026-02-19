import { useEffect, useRef } from "react";
import { LogOut, User as UserIcon, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserDropdown({ user, onLogout, onClose }) {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const roleName = user?.role?.role_name || "User";

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose?.();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <>
      {/* Full-page invisible overlay with subtle background */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm pointer-events-auto"
      />

      {/* Dropdown */}
      <div
        ref={dropdownRef}
        className="absolute right-0 top-14 w-72 z-50
        bg-white/95
        rounded-2xl
        border border-white/40
        shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)]
        p-3
        animate-[dropdownIn_0.18s_ease-out]
        pointer-events-auto"
      >
        {/* User Header */}
        <div className="relative px-4 py-3 rounded-xl 
          bg-gradient-to-r from-indigo-50 to-purple-50 
          border border-indigo-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-800 text-sm">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-xs text-slate-500 truncate mt-0.5">
                {user?.email}
              </p>
            </div>

            {/* Role Badge */}
            <span
              className="text-[10px] font-semibold uppercase tracking-wide
              px-2 py-1 rounded-full
              bg-indigo-600 text-white"
            >
              {roleName}
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="mt-3 space-y-1">

          <button
            onClick={() => {
              navigate("/profile");
              onClose?.();
            }}
            className="group w-full flex items-center gap-3 
            px-4 py-2.5 rounded-xl text-sm font-medium 
            text-slate-700 
            hover:bg-slate-100
            active:scale-95 
            transition-all duration-200"
          >
            <UserIcon className="w-4 h-4 text-slate-500 group-hover:text-indigo-600 transition-colors" />
            <span className="group-hover:translate-x-1 transition-transform">
              Profile
            </span>
          </button>

          <button
            onClick={() => {
              navigate("/settings");
              onClose?.();
            }}
            className="group w-full flex items-center gap-3 
            px-4 py-2.5 rounded-xl text-sm font-medium 
            text-slate-700 
            hover:bg-slate-100
            active:scale-95 
            transition-all duration-200"
          >
            <Settings className="w-4 h-4 text-slate-500 group-hover:text-indigo-600 transition-colors" />
            <span className="group-hover:translate-x-1 transition-transform">
              Settings
            </span>
          </button>

          <div className="border-t border-slate-200 my-2"></div>

          <button
            onClick={() => {
              onLogout();
              onClose?.();
            }}
            className="group w-full flex items-center gap-3 
            px-4 py-2.5 rounded-xl text-sm font-semibold 
            text-red-600 
            hover:bg-red-50
            active:scale-95 
            transition-all duration-200"
          >
            <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
            <span className="group-hover:translate-x-1 transition-transform">
              Logout
            </span>
          </button>

        </div>
      </div>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes dropdownIn {
            0% {
              opacity: 0;
              transform: translateY(-8px) scale(0.98);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
    </>
  );
}

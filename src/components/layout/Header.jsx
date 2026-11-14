import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Sun,
  Moon,
  User,
  LogOut,
  Check,
  Shield,
  GraduationCap,
  Sparkles,
  PhoneCall,
  Menu,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useSchool } from "../../context/SchoolContext";
import { useTheme } from "../../context/ThemeContext";
import { Badge } from "../common/Badge";

export function Header({ onOpenSearch, onOpenDrawer }) {
  const { user, logout, login } = useAuth();
  const { currentSchool } = useSchool();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      text: "New admission request for Aarav Sundaram",
      time: "10m ago",
      unread: true,
    },
    {
      id: 2,
      text: "Fee payment proof submitted by Mohammed Abdulla",
      time: "45m ago",
      unread: true,
    },
    {
      id: 3,
      text: "Staff leave request submitted by Kavita Menon",
      time: "2h ago",
      unread: false,
    },
    {
      id: 4,
      text: "Half-yearly exam schedule approved by Principal",
      time: "1d ago",
      unread: false,
    },
  ];

  const handleRoleQuickSwitch = (role) => {
    if (role === "Super Admin") {
      login("Super Admin", { email: "superadmin@sclerp.com" });
      navigate("/super-admin/dashboard");
    } else if (role === "School Admin") {
      login(
        "School Admin",
        {
          schoolCode: currentSchool.code,
          username: `${currentSchool.code}.admin`,
        },
        currentSchool,
      );
      navigate("/school/dashboard");
    } else if (role === "Staff") {
      login(
        "Staff",
        { schoolCode: currentSchool.code, employeeId: "EMP001" },
        currentSchool,
      );
      navigate("/staff/dashboard");
    } else if (role === "Student") {
      login(
        "Student",
        { schoolCode: currentSchool.code, admissionNumber: "DEMO-0001" },
        currentSchool,
      );
      navigate("/student/dashboard");
    }
    setShowUserMenu(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-4 sm:px-6 py-3 shrink-0">
      <div className="flex items-center justify-between gap-3">
        {/* Left Side: Mobile Menu Hamburger & Active School Portal Info */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenDrawer}
            className="p-2 -ml-1 text-slate-600 dark:text-slate-300 lg:hidden hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Active school identity */}
          <div className="relative">
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 text-left">
              <img
                src="/mountvally-logo.png"
                alt="Mount Valley Logo"
                className="w-8 h-8 object-contain shrink-0"
              />
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-800 dark:text-white truncate max-w-[150px] md:max-w-[200px]">
                    {user?.role === "Super Admin"
                      ? "Mount Valley Master"
                      : currentSchool?.name}
                  </span>
                </div>
                <p className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">
                  {user?.role === "Super Admin"
                    ? "Mount Valley.com"
                    : currentSchool?.subdomain}
                </p>
              </div>
              <div className="sm:hidden flex items-center gap-1">
                <span className="text-xs font-bold text-slate-800 dark:text-white truncate max-w-[110px]">
                  {currentSchool?.name?.split(" ")[0]}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Global Search Trigger, Notifications, Dark Mode, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Bar / Trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs transition-colors"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="hidden md:inline">Quick Search...</span>
            <kbd className="hidden lg:inline text-[10px] font-mono bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-300">
              ⌘K
            </kbd>
          </button>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowNotifMenu(!showNotifMenu);
                setShowUserMenu(false);
              }}
              className="relative p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-soft-lg border border-slate-100 dark:border-slate-800 p-3 z-50 animate-fade-in">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-800 dark:text-white">
                    Notifications
                  </span>
                  <span className="text-[11px] font-semibold text-teal-600 cursor-pointer">
                    Mark all as read
                  </span>
                </div>
                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs"
                    >
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        {n.text}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        {n.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Account / Role Quick Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifMenu(false);
              }}
              className="flex items-center gap-2 p-1.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-xs">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="hidden lg:block text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-800 dark:text-white">
                    {user?.name || "Administrator"}
                  </span>
                  {user?.isPro && (
                    <Badge variant="pro" size="sm">
                      PRO
                    </Badge>
                  )}
                </div>
                <p className="text-[10px] text-slate-400">
                  {user?.role || "School Admin"}
                </p>
              </div>
            </button>

            {/* User Dropdown with Quick Role Switcher for Testing */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-soft-lg border border-slate-100 dark:border-slate-800 p-2 z-50 animate-fade-in">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-800 dark:text-white">
                    {user?.name}
                  </p>
                  <p className="text-[11px] text-slate-400">{user?.email}</p>
                  <div className="mt-1 flex items-center gap-1">
                    <Badge variant="primary" size="sm">
                      {user?.role}
                    </Badge>
                    {user?.isPro && (
                      <Badge variant="pro" size="sm">
                        PRO
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Switch Portal Role
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => handleRoleQuickSwitch("School Admin")}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-left ${
                      user?.role === "School Admin"
                        ? "bg-teal-50 dark:bg-teal-950/40 text-teal-700"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <span>School Admin</span>
                    {user?.role === "School Admin" && (
                      <Check className="w-3.5 h-3.5 text-teal-600" />
                    )}
                  </button>
                  <button
                    onClick={() => handleRoleQuickSwitch("Super Admin")}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-left ${
                      user?.role === "Super Admin"
                        ? "bg-teal-50 dark:bg-teal-950/40 text-teal-700"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <span>Super Admin</span>
                    {user?.role === "Super Admin" && (
                      <Check className="w-3.5 h-3.5 text-teal-600" />
                    )}
                  </button>
                  <button
                    onClick={() => handleRoleQuickSwitch("Staff")}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-left ${
                      user?.role === "Staff"
                        ? "bg-teal-50 dark:bg-teal-950/40 text-teal-700"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <span>Staff (Teacher)</span>
                    {user?.role === "Staff" && (
                      <Check className="w-3.5 h-3.5 text-teal-600" />
                    )}
                  </button>
                  <button
                    onClick={() => handleRoleQuickSwitch("Student")}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-left ${
                      user?.role === "Student"
                        ? "bg-teal-50 dark:bg-teal-950/40 text-teal-700"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <span>Student Portal</span>
                    {user?.role === "Student" && (
                      <Check className="w-3.5 h-3.5 text-teal-600" />
                    )}
                  </button>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => {
                      logout();
                      navigate("/login");
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

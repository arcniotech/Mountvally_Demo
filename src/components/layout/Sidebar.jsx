import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  GraduationCap,
  BookOpen,
  Wallet,
  FileCheck2,
  CalendarDays,
  Megaphone,
  FileSpreadsheet,
  Image as ImageIcon,
  Bus,
  Package,
  FileText,
  Sparkles,
  UserCheck,
  CalendarOff,
  CreditCard,
  ArrowLeftRight,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  School,
  Building2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useSchool } from "../../context/SchoolContext";
import { Badge } from "../common/Badge";

export function Sidebar({ className = "", onCloseMobile }) {
  const { user, logout } = useAuth();
  const { currentSchool } = useSchool();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
    if (onCloseMobile) onCloseMobile();
  };

  const isSuperAdmin = user?.role === "Super Admin";
  const isStaff = user?.role === "Staff";
  const isStudent = user?.role === "Student";
  const isSchoolAdmin = !isSuperAdmin && !isStaff && !isStudent;

  // Primary navigation items for School Admin matching reference images 1 & 4
  const schoolAdminNavPrimary = [
    { to: "/school/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/school/approvals", label: "Approvals", icon: CheckSquare },
    { to: "/school/students", label: "Students", icon: Users },
    { to: "/school/teachers", label: "Teachers", icon: GraduationCap },
  ];

  const academicNav = [
    { to: "/school/academic", label: "Academic", icon: BookOpen },
    { to: "/school/attendance", label: "Attendance", icon: UserCheck },
    { to: "/school/exams", label: "Exams", icon: FileCheck2 },
    { to: "/school/calendar", label: "Calendar", icon: CalendarDays },
  ];

  const commNav = [
    { to: "/school/announcements", label: "Announcements", icon: Megaphone },
    { to: "/school/circulars", label: "Circulars", icon: FileSpreadsheet },
  ];

  const financeNav = [
    { to: "/school/finance", label: "Finance", icon: Wallet },
    { to: "/school/invoices", label: "Invoices", icon: FileText },
  ];

  const operationsNav = [
    { to: "/school/gallery", label: "Gallery", icon: ImageIcon },
    { to: "/school/transport", label: "Transport", icon: Bus },
    { to: "/school/inventory", label: "Inventory", icon: Package },
  ];

  const staffNav = [
    {
      to: "/school/staff-attendance",
      label: "Staff Attendance",
      icon: UserCheck,
    },
    { to: "/school/staff-leaves", label: "Staff Leaves", icon: CalendarOff },
    { to: "/school/payroll", label: "Payroll", icon: CreditCard },
    {
      to: "/school/substitutions",
      label: "Substitutions",
      icon: ArrowLeftRight,
    },
  ];

  const toolsNav = [
    {
      to: "/school/ai-question-paper",
      label: "AI Question Paper",
      icon: Sparkles,
    },
    { to: "/school/reports", label: "Reports", icon: BarChart3 },
    { to: "/school/settings", label: "Settings", icon: Settings },
  ];

  // Super admin items
  const superAdminNav = [
    { to: "/super-admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/super-admin/schools", label: "Schools", icon: School },
    {
      to: "/super-admin/schools/new",
      label: "Onboard School",
      icon: Building2,
    },
    {
      to: "/super-admin/subscriptions",
      label: "Subscriptions",
      icon: CreditCard,
    },
    { to: "/super-admin/reports", label: "Global Reports", icon: BarChart3 },
    { to: "/super-admin/settings", label: "Platform Settings", icon: Settings },
  ];

  // Staff items
  const staffNavItems = [
    { to: "/staff/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/staff/students", label: "My Students", icon: Users },
    { to: "/staff/attendance", label: "Attendance", icon: UserCheck },
    { to: "/staff/homework", label: "Homework", icon: BookOpen },
    { to: "/staff/exams", label: "Exams & Marks", icon: FileCheck2 },
    { to: "/staff/timetable", label: "Timetable", icon: CalendarDays },
    { to: "/staff/announcements", label: "Announcements", icon: Megaphone },
    { to: "/staff/leaves", label: "My Leaves", icon: CalendarOff },
    { to: "/staff/profile", label: "My Profile", icon: Settings },
  ];

  // Student items
  const studentNavItems = [
    { to: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/student/classes", label: "My Classes", icon: BookOpen },
    { to: "/student/timetable", label: "Timetable", icon: CalendarDays },
    { to: "/student/attendance", label: "Attendance", icon: UserCheck },
    { to: "/student/homework", label: "Homework", icon: BookOpen },
    { to: "/student/exams", label: "Exams & Schedule", icon: FileCheck2 },
    { to: "/student/results", label: "Results & Report Card", icon: BarChart3 },
    { to: "/student/fees", label: "Fees & Payments", icon: Wallet },
    { to: "/student/announcements", label: "Announcements", icon: Megaphone },
    { to: "/student/profile", label: "Profile", icon: Settings },
  ];

  const renderNavGroup = (title, items, showOrangeBar = false) => (
    <div className="mb-4">
      {title && (
        <div className="flex items-center gap-1.5 px-3 mb-2">
          {showOrangeBar && (
            <div className="w-1 h-3.5 bg-amber-500 rounded-full" />
          )}
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {title}
          </span>
        </div>
      )}
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.to ||
            (item.to !== "/school/dashboard" &&
              item.to !== "/super-admin/dashboard" &&
              item.to !== "/staff/dashboard" &&
              item.to !== "/student/dashboard" &&
              location.pathname.startsWith(item.to));

          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all touch-press ${
                isActive
                  ? "bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    isActive
                      ? "text-teal-600 dark:text-teal-400"
                      : "text-slate-400"
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {isActive && (
                <ChevronRight className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );

  return (
    <aside
      className={`w-72 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col h-full overflow-hidden ${className}`}
    >
      {/* School Branding Header */}
      <div className="p-5 pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <img
            src="/mountvally-logo.png"
            alt="Mount Valley Logo"
            className="w-10 h-10 object-contain shrink-0"
          />
          <div className="min-w-0">
            <h2 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-tight truncate">
              {isSuperAdmin
                ? "Mount Valley"
                : currentSchool?.name?.split(" ")[0] +
                  " " +
                  (currentSchool?.name?.split(" ")[1] || "")}
            </h2>
            <p className="text-[11px] text-slate-400 font-medium truncate">
              {isSuperAdmin
                ? "Mount Valley.com"
                : currentSchool?.name?.split(" ").slice(2).join(" ") ||
                  "School Portal"}
            </p>
          </div>
        </div>

        {/* User Card Capsule matching Image 1 & 4 */}
        <div className="mt-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-100 dark:ring-emerald-950 shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                  {user?.name || "Administrator"}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono truncate">
                {user?.username || currentSchool?.adminUsername || "mvps.admin"}
              </p>
            </div>
          </div>
          {user?.isPro && (
            <Badge variant="pro" size="sm">
              PRO
            </Badge>
          )}
        </div>
      </div>

      {/* Navigation Links (Scrollable) */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {isSuperAdmin &&
          renderNavGroup("Super Admin Platform", superAdminNav, true)}

        {isSchoolAdmin && (
          <>
            {renderNavGroup(null, schoolAdminNavPrimary)}
            {renderNavGroup("ACADEMIC", academicNav)}
            {renderNavGroup("COMMUNICATION", commNav)}
            {renderNavGroup("FINANCE", financeNav)}
            {renderNavGroup("OPERATIONS", operationsNav)}
            {renderNavGroup("STAFF MANAGEMENT", staffNav, true)}
            {renderNavGroup("TOOLS & REPORTS", toolsNav)}
          </>
        )}

        {isStaff && renderNavGroup("STAFF PORTAL", staffNavItems, true)}

        {isStudent && renderNavGroup("STUDENT PORTAL", studentNavItems, true)}
      </div>

      {/* Footer Logout Button matching Image 1 & 4 */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 shrink-0">
        <button
          onClick={handleLogout}
          type="button"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border border-rose-100 dark:border-rose-950 bg-rose-50/50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 font-bold text-xs sm:text-sm hover:bg-rose-100/70 dark:hover:bg-rose-900/40 transition-all touch-press"
        >
          <LogOut className="w-4 h-4 text-rose-500" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

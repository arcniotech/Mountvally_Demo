import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  X,
  ClipboardCheck,
  BookOpen,
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
  LayoutDashboard,
  Users,
  Wallet,
  School,
  Building2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSchool } from '../../context/SchoolContext';
import { Badge } from '../common/Badge';

export function MobileDrawer({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const { currentSchool } = useSchool();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    onClose();
  };

  const isSuperAdmin = user?.role === 'Super Admin';
  const isStaff = user?.role === 'Staff';
  const isStudent = user?.role === 'Student';
  const isSchoolAdmin = !isSuperAdmin && !isStaff && !isStudent;

  // School Admin Nav Sections matching reference image exactly
  const schoolAdminGeneral = [
    {
      to: '/school/approvals',
      label: 'Approvals',
      icon: ClipboardCheck,
      cardBg: 'bg-[#FDF3E8] dark:bg-amber-950/30',
      iconBg: 'bg-[#FDE2C8] dark:bg-amber-900/50',
      textColor: 'text-[#E67E22] dark:text-amber-400',
    },
    {
      to: '/school/academic',
      label: 'Academic',
      icon: BookOpen,
      cardBg: 'bg-[#E2F2F7] dark:bg-sky-950/30',
      iconBg: 'bg-[#C6E4EE] dark:bg-sky-900/50',
      textColor: 'text-[#0288D1] dark:text-sky-400',
    },
    {
      to: '/school/exams',
      label: 'Exams',
      icon: FileCheck2,
      cardBg: 'bg-[#FBF3DC] dark:bg-yellow-950/30',
      iconBg: 'bg-[#F6E7B9] dark:bg-yellow-900/50',
      textColor: 'text-[#C29214] dark:text-yellow-400',
    },
    {
      to: '/school/calendar',
      label: 'Calendar',
      icon: CalendarDays,
      cardBg: 'bg-[#DEF0EE] dark:bg-teal-950/30',
      iconBg: 'bg-[#C2E4E0] dark:bg-teal-900/50',
      textColor: 'text-[#188B80] dark:text-teal-400',
    },
    {
      to: '/school/announcements',
      label: 'Announcements',
      icon: Megaphone,
      cardBg: 'bg-[#FBE4E7] dark:bg-rose-950/30',
      iconBg: 'bg-[#F6C6CC] dark:bg-rose-900/50',
      textColor: 'text-[#DE435B] dark:text-rose-400',
    },
    {
      to: '/school/circulars',
      label: 'Circulars',
      icon: FileSpreadsheet,
      cardBg: 'bg-[#DFECF5] dark:bg-blue-950/30',
      iconBg: 'bg-[#BFDAEC] dark:bg-blue-900/50',
      textColor: 'text-[#3B7CA8] dark:text-blue-400',
    },
    {
      to: '/school/gallery',
      label: 'Gallery',
      icon: ImageIcon,
      cardBg: 'bg-[#EFE8F7] dark:bg-purple-950/30',
      iconBg: 'bg-[#DFD1EF] dark:bg-purple-900/50',
      textColor: 'text-[#7E57C2] dark:text-purple-400',
    },
    {
      to: '/school/transport',
      label: 'Transport',
      icon: Bus,
      cardBg: 'bg-[#DCF2E9] dark:bg-emerald-950/30',
      iconBg: 'bg-[#BEE5D3] dark:bg-emerald-900/50',
      textColor: 'text-[#2E7D32] dark:text-emerald-400',
    },
    {
      to: '/school/inventory',
      label: 'Inventory',
      icon: Package,
      cardBg: 'bg-[#FDF1DE] dark:bg-amber-950/30',
      iconBg: 'bg-[#FCE1BD] dark:bg-amber-900/50',
      textColor: 'text-[#D97706] dark:text-amber-400',
    },
    {
      to: '/school/invoices',
      label: 'Invoices',
      icon: FileText,
      cardBg: 'bg-[#DBF2ED] dark:bg-teal-950/30',
      iconBg: 'bg-[#BCE5DC] dark:bg-teal-900/50',
      textColor: 'text-[#0D9488] dark:text-teal-400',
    },
    {
      to: '/school/ai-question-paper',
      label: 'AI Question Paper',
      icon: Sparkles,
      cardBg: 'bg-[#ECE6F6] dark:bg-indigo-950/30',
      iconBg: 'bg-[#D7C7EE] dark:bg-indigo-900/50',
      textColor: 'text-[#6D28D9] dark:text-indigo-400',
    },
  ];

  const schoolAdminStaff = [
    {
      to: '/school/staff-attendance',
      label: 'Staff Attendance',
      icon: UserCheck,
      cardBg: 'bg-[#E2F2F7] dark:bg-sky-950/30',
      iconBg: 'bg-[#C6E4EE] dark:bg-sky-900/50',
      textColor: 'text-[#0288D1] dark:text-sky-400',
    },
    {
      to: '/school/staff-leaves',
      label: 'Staff Leaves',
      icon: CalendarOff,
      cardBg: 'bg-[#FDF3E8] dark:bg-amber-950/30',
      iconBg: 'bg-[#FDE2C8] dark:bg-amber-900/50',
      textColor: 'text-[#E67E22] dark:text-amber-400',
    },
    {
      to: '/school/payroll',
      label: 'Payroll',
      icon: CreditCard,
      cardBg: 'bg-[#DCF2E9] dark:bg-emerald-950/30',
      iconBg: 'bg-[#BEE5D3] dark:bg-emerald-900/50',
      textColor: 'text-[#2E7D32] dark:text-emerald-400',
    },
    {
      to: '/school/substitutions',
      label: 'Substitutions',
      icon: ArrowLeftRight,
      cardBg: 'bg-[#EFE8F7] dark:bg-purple-950/30',
      iconBg: 'bg-[#DFD1EF] dark:bg-purple-900/50',
      textColor: 'text-[#7E57C2] dark:text-purple-400',
    },
  ];

  const schoolAdminTools = [
    {
      to: '/school/attendance',
      label: 'Student Attendance',
      icon: UserCheck,
      cardBg: 'bg-[#DBF2ED] dark:bg-teal-950/30',
      iconBg: 'bg-[#BCE5DC] dark:bg-teal-900/50',
      textColor: 'text-[#0D9488] dark:text-teal-400',
    },
    {
      to: '/school/reports',
      label: 'Reports',
      icon: BarChart3,
      cardBg: 'bg-[#DFECF5] dark:bg-blue-950/30',
      iconBg: 'bg-[#BFDAEC] dark:bg-blue-900/50',
      textColor: 'text-[#3B7CA8] dark:text-blue-400',
    },
    {
      to: '/school/settings',
      label: 'Settings',
      icon: Settings,
      cardBg: 'bg-[#FBF3DC] dark:bg-yellow-950/30',
      iconBg: 'bg-[#F6E7B9] dark:bg-yellow-900/50',
      textColor: 'text-[#C29214] dark:text-yellow-400',
    },
  ];

  // Super Admin Sections
  const superAdminCards = [
    {
      to: '/super-admin/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      cardBg: 'bg-[#E2F2F7] dark:bg-sky-950/30',
      iconBg: 'bg-[#C6E4EE] dark:bg-sky-900/50',
      textColor: 'text-[#0288D1] dark:text-sky-400',
    },
    {
      to: '/super-admin/schools',
      label: 'Schools',
      icon: School,
      cardBg: 'bg-[#FDF3E8] dark:bg-amber-950/30',
      iconBg: 'bg-[#FDE2C8] dark:bg-amber-900/50',
      textColor: 'text-[#E67E22] dark:text-amber-400',
    },
    {
      to: '/super-admin/schools/new',
      label: 'Onboard School',
      icon: Building2,
      cardBg: 'bg-[#DCF2E9] dark:bg-emerald-950/30',
      iconBg: 'bg-[#BEE5D3] dark:bg-emerald-900/50',
      textColor: 'text-[#2E7D32] dark:text-emerald-400',
    },
    {
      to: '/super-admin/subscriptions',
      label: 'Subscriptions',
      icon: CreditCard,
      cardBg: 'bg-[#EFE8F7] dark:bg-purple-950/30',
      iconBg: 'bg-[#DFD1EF] dark:bg-purple-900/50',
      textColor: 'text-[#7E57C2] dark:text-purple-400',
    },
    {
      to: '/super-admin/reports',
      label: 'Global Reports',
      icon: BarChart3,
      cardBg: 'bg-[#DFECF5] dark:bg-blue-950/30',
      iconBg: 'bg-[#BFDAEC] dark:bg-blue-900/50',
      textColor: 'text-[#3B7CA8] dark:text-blue-400',
    },
    {
      to: '/super-admin/settings',
      label: 'Platform Settings',
      icon: Settings,
      cardBg: 'bg-[#FBF3DC] dark:bg-yellow-950/30',
      iconBg: 'bg-[#F6E7B9] dark:bg-yellow-900/50',
      textColor: 'text-[#C29214] dark:text-yellow-400',
    },
  ];

  // Staff Sections
  const staffCards = [
    {
      to: '/staff/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      cardBg: 'bg-[#E2F2F7] dark:bg-sky-950/30',
      iconBg: 'bg-[#C6E4EE] dark:bg-sky-900/50',
      textColor: 'text-[#0288D1] dark:text-sky-400',
    },
    {
      to: '/staff/students',
      label: 'Students',
      icon: Users,
      cardBg: 'bg-[#FDF3E8] dark:bg-amber-950/30',
      iconBg: 'bg-[#FDE2C8] dark:bg-amber-900/50',
      textColor: 'text-[#E67E22] dark:text-amber-400',
    },
    {
      to: '/staff/attendance',
      label: 'Attendance',
      icon: UserCheck,
      cardBg: 'bg-[#DBF2ED] dark:bg-teal-950/30',
      iconBg: 'bg-[#BCE5DC] dark:bg-teal-900/50',
      textColor: 'text-[#0D9488] dark:text-teal-400',
    },
    {
      to: '/staff/homework',
      label: 'Homework',
      icon: BookOpen,
      cardBg: 'bg-[#FBF3DC] dark:bg-yellow-950/30',
      iconBg: 'bg-[#F6E7B9] dark:bg-yellow-900/50',
      textColor: 'text-[#C29214] dark:text-yellow-400',
    },
    {
      to: '/staff/exams',
      label: 'Exams & Marks',
      icon: FileCheck2,
      cardBg: 'bg-[#FBE4E7] dark:bg-rose-950/30',
      iconBg: 'bg-[#F6C6CC] dark:bg-rose-900/50',
      textColor: 'text-[#DE435B] dark:text-rose-400',
    },
    {
      to: '/staff/timetable',
      label: 'Timetable',
      icon: CalendarDays,
      cardBg: 'bg-[#EFE8F7] dark:bg-purple-950/30',
      iconBg: 'bg-[#DFD1EF] dark:bg-purple-900/50',
      textColor: 'text-[#7E57C2] dark:text-purple-400',
    },
    {
      to: '/staff/announcements',
      label: 'Announcements',
      icon: Megaphone,
      cardBg: 'bg-[#DEF0EE] dark:bg-teal-950/30',
      iconBg: 'bg-[#C2E4E0] dark:bg-teal-900/50',
      textColor: 'text-[#188B80] dark:text-teal-400',
    },
    {
      to: '/staff/leaves',
      label: 'My Leaves',
      icon: CalendarOff,
      cardBg: 'bg-[#FDF1DE] dark:bg-amber-950/30',
      iconBg: 'bg-[#FCE1BD] dark:bg-amber-900/50',
      textColor: 'text-[#D97706] dark:text-amber-400',
    },
    {
      to: '/staff/profile',
      label: 'My Profile',
      icon: Settings,
      cardBg: 'bg-[#ECE6F6] dark:bg-indigo-950/30',
      iconBg: 'bg-[#D7C7EE] dark:bg-indigo-900/50',
      textColor: 'text-[#6D28D9] dark:text-indigo-400',
    },
  ];

  // Student Sections
  const studentCards = [
    {
      to: '/student/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      cardBg: 'bg-[#E2F2F7] dark:bg-sky-950/30',
      iconBg: 'bg-[#C6E4EE] dark:bg-sky-900/50',
      textColor: 'text-[#0288D1] dark:text-sky-400',
    },
    {
      to: '/student/classes',
      label: 'My Classes',
      icon: BookOpen,
      cardBg: 'bg-[#FDF3E8] dark:bg-amber-950/30',
      iconBg: 'bg-[#FDE2C8] dark:bg-amber-900/50',
      textColor: 'text-[#E67E22] dark:text-amber-400',
    },
    {
      to: '/student/timetable',
      label: 'Timetable',
      icon: CalendarDays,
      cardBg: 'bg-[#DEF0EE] dark:bg-teal-950/30',
      iconBg: 'bg-[#C2E4E0] dark:bg-teal-900/50',
      textColor: 'text-[#188B80] dark:text-teal-400',
    },
    {
      to: '/student/attendance',
      label: 'Attendance',
      icon: UserCheck,
      cardBg: 'bg-[#DFECF5] dark:bg-blue-950/30',
      iconBg: 'bg-[#BFDAEC] dark:bg-blue-900/50',
      textColor: 'text-[#3B7CA8] dark:text-blue-400',
    },
    {
      to: '/student/homework',
      label: 'Homework',
      icon: BookOpen,
      cardBg: 'bg-[#FBF3DC] dark:bg-yellow-950/30',
      iconBg: 'bg-[#F6E7B9] dark:bg-yellow-900/50',
      textColor: 'text-[#C29214] dark:text-yellow-400',
    },
    {
      to: '/student/exams',
      label: 'Exams',
      icon: FileCheck2,
      cardBg: 'bg-[#FBE4E7] dark:bg-rose-950/30',
      iconBg: 'bg-[#F6C6CC] dark:bg-rose-900/50',
      textColor: 'text-[#DE435B] dark:text-rose-400',
    },
    {
      to: '/student/results',
      label: 'Report Card',
      icon: BarChart3,
      cardBg: 'bg-[#EFE8F7] dark:bg-purple-950/30',
      iconBg: 'bg-[#DFD1EF] dark:bg-purple-900/50',
      textColor: 'text-[#7E57C2] dark:text-purple-400',
    },
    {
      to: '/student/fees',
      label: 'Fees',
      icon: Wallet,
      cardBg: 'bg-[#DCF2E9] dark:bg-emerald-950/30',
      iconBg: 'bg-[#BEE5D3] dark:bg-emerald-900/50',
      textColor: 'text-[#2E7D32] dark:text-emerald-400',
    },
    {
      to: '/student/announcements',
      label: 'Announcements',
      icon: Megaphone,
      cardBg: 'bg-[#FDF1DE] dark:bg-amber-950/30',
      iconBg: 'bg-[#FCE1BD] dark:bg-amber-900/50',
      textColor: 'text-[#D97706] dark:text-amber-400',
    },
    {
      to: '/student/profile',
      label: 'Profile',
      icon: Settings,
      cardBg: 'bg-[#ECE6F6] dark:bg-indigo-950/30',
      iconBg: 'bg-[#D7C7EE] dark:bg-indigo-900/50',
      textColor: 'text-[#6D28D9] dark:text-indigo-400',
    },
  ];

  const renderSectionHeader = (title) => (
    <div className="flex items-center gap-2 px-4 pt-4 pb-2.5">
      <div className="w-1 h-3.5 bg-amber-500 rounded-full" />
      <span className="text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
        {title}
      </span>
    </div>
  );

  const renderCardGrid = (items) => (
    <div className="grid grid-cols-3 gap-3 px-4 py-1">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.to;

        return (
          <button
            key={item.to}
            type="button"
            onClick={() => handleNavigate(item.to)}
            className={`flex flex-col items-center justify-center p-3 rounded-3xl transition-all duration-150 touch-press relative aspect-square text-center shadow-xs ${
              item.cardBg
            } ${
              isActive ? 'ring-2 ring-amber-400 shadow-md scale-[1.02]' : 'hover:opacity-95'
            }`}
          >
            {/* Inner rounded icon container */}
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-1.5 shadow-xs transition-transform ${item.iconBg}`}
            >
              <Icon className={`w-5 h-5 ${item.textColor} stroke-[2.2]`} />
            </div>

            {/* Label in matching color */}
            <span
              className={`text-[11px] font-bold leading-tight line-clamp-2 ${item.textColor}`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="fixed inset-0 z-40 lg:hidden flex flex-col bg-white dark:bg-slate-950 animate-fade-in">
      {/* Top Header Bar matching reference image */}
      <div className="pt-4 px-5 pb-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          {/* Menu icon badge matching the pill in screenshot */}
          <div className="w-10 h-10 rounded-2xl bg-sky-50 dark:bg-sky-950/60 border border-sky-100 dark:border-sky-900/60 flex items-center justify-center text-sky-600 dark:text-sky-400 shadow-xs">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 7h16" />
              <path d="M4 12h11" />
              <path d="M4 17h16" />
            </svg>
          </div>

          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
              More
            </h1>
            <div className="w-10 h-1 bg-amber-500 rounded-full mt-1.5" />
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close navigation"
          className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* User info capsule */}
      <div className="px-4 py-2 bg-slate-50/80 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <img
            src="/mountvally-logo.png"
            alt="Mount Valley Logo"
            className="w-7 h-7 object-contain shrink-0"
          />
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
              {user?.name || 'Administrator'}
            </p>
            <p className="text-[10px] text-slate-400 truncate">
              {currentSchool?.name || 'School ERP'}
            </p>
          </div>
        </div>
        <Badge variant="pro" size="sm">
          {user?.role || 'Admin'}
        </Badge>
      </div>

      {/* Scrollable Body with 3-column Grid Cards */}
      <div className="flex-1 overflow-y-auto pb-28 pt-2 space-y-3">
        {isSchoolAdmin && (
          <>
            <div>
              {renderSectionHeader('GENERAL')}
              {renderCardGrid(schoolAdminGeneral)}
            </div>

            <div>
              {renderSectionHeader('STAFF MANAGEMENT')}
              {renderCardGrid(schoolAdminStaff)}
            </div>

            <div>
              {renderSectionHeader('TOOLS & SETTINGS')}
              {renderCardGrid(schoolAdminTools)}
            </div>
          </>
        )}

        {isSuperAdmin && (
          <div>
            {renderSectionHeader('SUPER ADMIN PLATFORM')}
            {renderCardGrid(superAdminCards)}
          </div>
        )}

        {isStaff && (
          <div>
            {renderSectionHeader('STAFF PORTAL')}
            {renderCardGrid(staffCards)}
          </div>
        )}

        {isStudent && (
          <div>
            {renderSectionHeader('STUDENT PORTAL')}
            {renderCardGrid(studentCards)}
          </div>
        )}

        {/* Footer actions inside scroll area */}
        <div className="p-4 pt-2">
          <button
            onClick={handleLogout}
            type="button"
            className="w-full flex items-center justify-center gap-2 p-3.5 rounded-2xl border border-rose-200 dark:border-rose-950 bg-rose-50/70 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 font-bold text-xs sm:text-sm hover:bg-rose-100 transition-all touch-press"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

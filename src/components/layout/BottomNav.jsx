import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutGrid, Users, GraduationCap, Wallet } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function BottomNav({ onOpenDrawer, isDrawerOpen, onCloseDrawer }) {
  const { user } = useAuth();
  const location = useLocation();

  const isSuperAdmin = user?.role === 'Super Admin';
  const isStaff = user?.role === 'Staff';
  const isStudent = user?.role === 'Student';

  let homePath = '/school/dashboard';
  let secondPath = '/school/students';
  let secondLabel = 'Students';
  let secondIcon = Users;
  let thirdPath = '/school/teachers';
  let thirdLabel = 'Teachers';
  let thirdIcon = GraduationCap;
  let fourthPath = '/school/finance';
  let fourthLabel = 'Finance';
  let fourthIcon = Wallet;

  if (isSuperAdmin) {
    homePath = '/super-admin/dashboard';
    secondPath = '/super-admin/schools';
    secondLabel = 'Schools';
    thirdPath = '/super-admin/subscriptions';
    thirdLabel = 'Plans';
    fourthPath = '/super-admin/reports';
    fourthLabel = 'Reports';
  } else if (isStaff) {
    homePath = '/staff/dashboard';
    secondPath = '/staff/students';
    secondLabel = 'Students';
    thirdPath = '/staff/attendance';
    thirdLabel = 'Attendance';
    fourthPath = '/staff/timetable';
    fourthLabel = 'Timetable';
  } else if (isStudent) {
    homePath = '/student/dashboard';
    secondPath = '/student/classes';
    secondLabel = 'Classes';
    thirdPath = '/student/timetable';
    thirdLabel = 'Timetable';
    fourthPath = '/student/fees';
    fourthLabel = 'Fees';
  }

  const navItems = [
    { to: homePath, label: 'Home', icon: LayoutGrid, exact: true },
    { to: secondPath, label: secondLabel, icon: secondIcon },
    { to: thirdPath, label: thirdLabel, icon: thirdIcon },
    { to: fourthPath, label: fourthLabel, icon: fourthIcon },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 px-2 py-1.5 shadow-lg safe-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            !isDrawerOpen &&
            (item.exact
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to));

          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseDrawer}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all touch-press ${
                isActive
                  ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.75]'}`} />
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
            </NavLink>
          );
        })}

        {/* 9-Dot "More" Button matching screenshot */}
        <button
          type="button"
          onClick={onOpenDrawer}
          className={`flex flex-col items-center justify-center py-1 px-3.5 rounded-2xl transition-all touch-press ${
            isDrawerOpen
              ? 'bg-[#E3EFF1] dark:bg-slate-800 text-teal-800 dark:text-teal-300 font-extrabold shadow-xs'
              : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          {/* Active orange accent bar if More menu is open */}
          {isDrawerOpen && (
            <div className="w-6 h-0.5 bg-amber-500 rounded-full -mt-0.5 mb-1" />
          )}

          {/* 9-dot keypad icon */}
          <div className="w-5 h-5 flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="currentColor"
              className={isDrawerOpen ? 'text-teal-700 dark:text-teal-300' : 'text-slate-500 dark:text-slate-400'}
            >
              <rect x="1.5" y="1.5" width="3.5" height="3.5" rx="1" />
              <rect x="7.25" y="1.5" width="3.5" height="3.5" rx="1" />
              <rect x="13" y="1.5" width="3.5" height="3.5" rx="1" />

              <rect x="1.5" y="7.25" width="3.5" height="3.5" rx="1" />
              <rect x="7.25" y="7.25" width="3.5" height="3.5" rx="1" />
              <rect x="13" y="7.25" width="3.5" height="3.5" rx="1" />

              <rect x="1.5" y="13" width="3.5" height="3.5" rx="1" />
              <rect x="7.25" y="13" width="3.5" height="3.5" rx="1" />
              <rect x="13" y="13" width="3.5" height="3.5" rx="1" />
            </svg>
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">More</span>
        </button>
      </div>
    </nav>
  );
}

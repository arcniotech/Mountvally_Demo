import React, { useState } from 'react';
import {
  Users,
  BookOpen,
  CalendarCheck,
  CalendarOff,
  Clock,
  Plus,
  CheckCircle2,
  FileCheck2,
  Megaphone,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';

export function StaffDashboardPage() {
  const { user } = useAuth();
  const { announcements, addLeave } = useData();
  const { showSuccess } = useToast();

  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [leaveData, setLeaveData] = useState({
    applicantName: user?.name || 'Deepak Sharma',
    employeeId: user?.employeeId || 'EMP001',
    leaveType: 'Casual',
    startDate: '2026-09-24',
    endDate: '2026-09-25',
    days: 2,
    reason: 'Family function in native town',
  });

  const todayClasses = [
    { period: 'Period 1 (08:30 AM)', class: 'Grade 10-A', subject: 'Mathematics', room: 'Hall 2A' },
    { period: 'Period 3 (10:15 AM)', class: 'Grade 10-B', subject: 'Mathematics', room: 'Hall 2B' },
    { period: 'Period 5 (12:30 PM)', class: 'Grade 12-Science', subject: 'Calculus & Vectors', room: 'Room 301' },
    { period: 'Period 6 (01:15 PM)', class: 'Grade 9-Blue Bell', subject: 'Maths Doubt Clearing', room: 'Room 204' },
  ];

  const handleApplyLeave = (e) => {
    e.preventDefault();
    addLeave(leaveData);
    showSuccess('Leave application submitted to Principal for approval.');
    setIsLeaveModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Staff Greeting Banner */}
      <div className="bg-gradient-to-r from-teal-700 to-brand-600 rounded-3xl p-6 sm:p-8 text-white shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/20 font-semibold">Faculty Workspace</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">Welcome back, {user?.name}</h1>
          <p className="text-xs sm:text-sm text-teal-100 mt-1">
            {user?.department || 'Mathematics Department'} &bull; {user?.employeeId || 'EMP001'} &bull; Mount Valley Public School
          </p>
        </div>
        <button
          onClick={() => setIsLeaveModalOpen(true)}
          className="px-4 py-2.5 bg-white text-teal-800 font-bold text-xs sm:text-sm rounded-xl shadow-sm self-start md:self-auto touch-press"
        >
          Apply for Leave
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <StatCard title="Today's Classes" value="4 Sessions" subtitle="3 Grades handled" icon={BookOpen} iconColor="text-teal-600" />
        <StatCard title="Students Taught" value="128" subtitle="Across 4 sections" icon={Users} iconColor="text-brand-500" />
        <StatCard title="Pending Homework" value="2 Batches" subtitle="To be reviewed" icon={FileCheck2} iconColor="text-amber-500" />
        <StatCard title="Leave Balance" value="14 Days" subtitle="Casual &amp; Medical" icon={CalendarOff} iconColor="text-indigo-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-800 dark:text-white">Today&apos;s Teaching Schedule</h3>
            <Badge variant="teal">Thursday, 17 Sep 2026</Badge>
          </div>

          <div className="space-y-3">
            {todayClasses.map((cls, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 flex items-center justify-center font-bold text-xs">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800 dark:text-white">{cls.class} &bull; {cls.subject}</h4>
                    <p className="text-xs text-slate-400">{cls.period} &bull; {cls.room}</p>
                  </div>
                </div>
                <button
                  onClick={() => showSuccess(`Attendance marked for ${cls.class}.`)}
                  className="px-3 py-1.5 rounded-xl bg-teal-600 text-white font-bold text-xs shadow-sm touch-press"
                >
                  Take Attendance
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Staff Announcements */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft space-y-4">
          <h3 className="font-bold text-base text-slate-800 dark:text-white">Faculty Notices</h3>
          <div className="space-y-3">
            {announcements.slice(0, 3).map((ann) => (
              <div key={ann.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <Badge variant="primary" size="sm">{ann.priority || 'Notice'}</Badge>
                  <span className="text-[10px] text-slate-400">{ann.publishedDate}</span>
                </div>
                <h4 className="font-bold text-xs text-slate-800 dark:text-white">{ann.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{ann.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

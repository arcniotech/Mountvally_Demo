import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  GraduationCap,
  CalendarCheck,
  Clock,
  PlusCircle,
  Megaphone,
  Receipt,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Calendar,
  Sparkles,
  Award,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useSchool } from '../../context/SchoolContext';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';

export function DashboardPage() {
  const { currentSchool } = useSchool();
  const { students, teachers, approvals, announcements, exams } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const pendingApprovalsCount = approvals.filter(a => a.status === 'Pending').length;

  const attendanceData = [
    { day: 'Mon', attendance: 95.2 },
    { day: 'Tue', attendance: 96.4 },
    { day: 'Wed', attendance: 94.8 },
    { day: 'Thu', attendance: 97.1 },
    { day: 'Fri', attendance: 94.6 },
    { day: 'Sat', attendance: 92.0 },
  ];

  const feeData = [
    { month: 'Apr', collected: 420000, target: 450000 },
    { month: 'May', collected: 380000, target: 400000 },
    { month: 'Jun', collected: 650000, target: 600000 },
    { month: 'Jul', collected: 520000, target: 550000 },
    { month: 'Aug', collected: 490000, target: 500000 },
    { month: 'Sep', collected: 580000, target: 600000 },
  ];

  const distributionData = [
    { name: 'Primary (1-5)', value: 480, color: '#0194F1' },
    { name: 'Middle (6-8)', value: 390, color: '#0D9488' },
    { name: 'High (9-10)', value: 240, color: '#6366F1' },
    { name: 'Higher Sec (11-12)', value: 138, color: '#F59E0B' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Greeting matching prompt specifications */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-teal-700 via-teal-600 to-brand-600 rounded-3xl p-6 sm:p-8 text-white shadow-soft">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs">
              Academic Year {currentSchool?.academicYear || '2026–27'}
            </span>
            <span className="text-xs text-teal-100">Live Campus</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Good Morning, {user?.name || 'Administrator'}
          </h1>
          <p className="text-sm text-teal-100 max-w-xl">
            {currentSchool?.name} &bull; Here is the real-time operational overview of your school.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => navigate('/school/students')}
            className="px-4 py-2.5 rounded-2xl bg-white text-teal-800 font-bold text-xs sm:text-sm hover:bg-teal-50 transition-all shadow-sm flex items-center gap-2 touch-press"
          >
            <PlusCircle className="w-4 h-4 text-teal-600" />
            <span>Add Student</span>
          </button>
          <button
            onClick={() => navigate('/school/attendance')}
            className="px-4 py-2.5 rounded-2xl bg-teal-800/60 hover:bg-teal-800/80 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 touch-press"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Mark Attendance</span>
          </button>
        </div>
      </div>

      {/* Key Metric Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <StatCard
          title="Total Students"
          value={currentSchool?.studentsCount?.toLocaleString() || students.length}
          subtitle="Enrolled active students"
          icon={Users}
          iconColor="text-brand-500"
          iconBg="bg-brand-50 dark:bg-brand-950/40"
          trend="4.2% YoY"
          trendPositive={true}
          onClick={() => navigate('/school/students')}
        />
        <StatCard
          title="Total Teachers"
          value={currentSchool?.teachersCount || teachers.length}
          subtitle="Qualified faculty"
          icon={GraduationCap}
          iconColor="text-teal-600"
          iconBg="bg-teal-50 dark:bg-teal-950/40"
          trend="8 Active Depts"
          onClick={() => navigate('/school/teachers')}
        />
        <StatCard
          title="Today's Attendance"
          value="94.6%"
          subtitle="1,180 present today"
          icon={CalendarCheck}
          iconColor="text-emerald-500"
          iconBg="bg-emerald-50 dark:bg-emerald-950/40"
          trend="+1.2% vs yesterday"
          trendPositive={true}
          onClick={() => navigate('/school/attendance')}
        />
        <StatCard
          title="Pending Approvals"
          value={pendingApprovalsCount}
          subtitle="Action required"
          icon={Clock}
          iconColor="text-amber-500"
          iconBg="bg-amber-50 dark:bg-amber-950/40"
          trend="5 Urgent items"
          trendPositive={false}
          onClick={() => navigate('/school/approvals')}
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Weekly Attendance Trend */}
        <div className="lg:col-span-8 p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base text-slate-800 dark:text-white">
                Weekly Attendance Overview
              </h3>
              <p className="text-xs text-slate-400">Class 1 to 12 aggregate daily attendance</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full">
              Avg 94.8%
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData}>
                <defs>
                  <linearGradient id="attendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0D9488" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0D9488" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis domain={[80, 100]} stroke="#94a3b8" fontSize={12} tickLine={false} unit="%" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: 'none', color: '#fff' }}
                  formatter={(val) => [`${val}%`, 'Attendance']}
                />
                <Area type="monotone" dataKey="attendance" stroke="#0D9488" strokeWidth={3} fillOpacity={1} fill="url(#attendGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Student Distribution Donut */}
        <div className="lg:col-span-4 p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-800 dark:text-white mb-1">
              Student Distribution
            </h3>
            <p className="text-xs text-slate-400 mb-4">By academic wing</p>
            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
            {distributionData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 dark:text-slate-400 truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Operations Row: Pending Approvals & Upcoming Exams & Announcements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Pending Approvals Widget */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <h3 className="font-bold text-sm text-slate-800 dark:text-white">
                  Pending Approvals
                </h3>
              </div>
              <button
                onClick={() => navigate('/school/approvals')}
                className="text-xs font-bold text-teal-600 hover:text-teal-700"
              >
                View all
              </button>
            </div>
            <div className="space-y-2.5">
              {approvals.slice(0, 3).map((app) => (
                <div
                  key={app.id}
                  onClick={() => navigate('/school/approvals')}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-800 dark:text-white truncate">
                      {app.title}
                    </span>
                    <Badge variant={app.priority === 'High' ? 'danger' : 'pending'} size="sm">
                      {app.category}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">
                    By {app.submittedBy} &bull; {app.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Exams Widget */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                <h3 className="font-bold text-sm text-slate-800 dark:text-white">
                  Upcoming Examinations
                </h3>
              </div>
              <button
                onClick={() => navigate('/school/exams')}
                className="text-xs font-bold text-teal-600 hover:text-teal-700"
              >
                Schedule
              </button>
            </div>
            <div className="space-y-2.5">
              {exams.slice(0, 3).map((exam) => (
                <div
                  key={exam.id}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 dark:text-white truncate">
                      {exam.subject} &bull; {exam.class}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {exam.date} &bull; {exam.time}
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-md shrink-0">
                    {exam.room}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Announcements Widget */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-500" />
                <h3 className="font-bold text-sm text-slate-800 dark:text-white">
                  Recent Announcements
                </h3>
              </div>
              <button
                onClick={() => navigate('/school/announcements')}
                className="text-xs font-bold text-teal-600 hover:text-teal-700"
              >
                Broadcast
              </button>
            </div>
            <div className="space-y-2.5">
              {announcements.slice(0, 3).map((ann) => (
                <div
                  key={ann.id}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-800 dark:text-white truncate">
                      {ann.title}
                    </span>
                    <Badge variant="primary" size="sm">
                      {ann.audience}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {ann.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

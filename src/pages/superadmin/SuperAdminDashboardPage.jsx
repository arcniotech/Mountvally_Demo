import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  School,
  Building2,
  Users,
  GraduationCap,
  CreditCard,
  TrendingUp,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
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
} from 'recharts';
import { useSchool } from '../../context/SchoolContext';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';

export function SuperAdminDashboardPage() {
  const { schools } = useSchool();
  const navigate = useNavigate();

  const totalStudents = schools.reduce((acc, s) => acc + (s.studentsCount || 0), 0);
  const totalTeachers = schools.reduce((acc, s) => acc + (s.teachersCount || 0), 0);
  const activeSchoolsCount = schools.filter(s => s.status === 'Active').length;

  const schoolGrowthData = [
    { month: 'Apr', schools: 18, students: 14000, revenue: 360000 },
    { month: 'May', schools: 22, students: 17500, revenue: 440000 },
    { month: 'Jun', schools: 28, students: 22000, revenue: 560000 },
    { month: 'Jul', schools: 34, students: 28000, revenue: 680000 },
    { month: 'Aug', schools: 40, students: 34000, revenue: 800000 },
    { month: 'Sep', schools: 48, students: 42000, revenue: 960000 },
  ];

  return (
    <div className="space-y-6">
      {/* Super Admin Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-brand-600 via-brand-500 to-teal-600 rounded-3xl p-6 sm:p-8 text-white shadow-soft">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs">
              SCL ERP Platform Master
            </span>
            <span className="text-xs text-brand-100">Global Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Super Administrator Control Center
          </h1>
          <p className="text-sm text-brand-100 max-w-xl">
            Centralized multi-tenant supervision, school onboarding, subdomain resolution, and subscription management.
          </p>
        </div>

        <button
          onClick={() => navigate('/super-admin/schools/new')}
          className="px-5 py-3 rounded-2xl bg-white text-brand-800 font-bold text-xs sm:text-sm hover:bg-brand-50 transition-all shadow-sm flex items-center gap-2 touch-press self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4 text-brand-600" />
          <span>Onboard New School</span>
        </button>
      </div>

      {/* Global Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <StatCard
          title="Total Schools"
          value={schools.length}
          subtitle={`${activeSchoolsCount} Active Institutional Portals`}
          icon={School}
          iconColor="text-brand-500"
          iconBg="bg-brand-50 dark:bg-brand-950/40"
          trend="+12% this quarter"
          trendPositive={true}
          onClick={() => navigate('/super-admin/schools')}
        />
        <StatCard
          title="Active Students"
          value={totalStudents.toLocaleString()}
          subtitle="Across all onboarded tenants"
          icon={Users}
          iconColor="text-teal-600"
          iconBg="bg-teal-50 dark:bg-teal-950/40"
          trend="+8.5% YoY"
          trendPositive={true}
        />
        <StatCard
          title="Total Faculty"
          value={totalTeachers.toLocaleString()}
          subtitle="Registered educators"
          icon={GraduationCap}
          iconColor="text-indigo-500"
          iconBg="bg-indigo-50 dark:bg-indigo-950/40"
        />
        <StatCard
          title="Active Subscriptions"
          value={`${schools.length} Active`}
          subtitle="SaaS Tier License Allocated"
          icon={CreditCard}
          iconColor="text-amber-500"
          iconBg="bg-amber-50 dark:bg-amber-950/40"
          trend="100% Onboarded"
          trendPositive={true}
          onClick={() => navigate('/super-admin/subscriptions')}
        />
      </div>

      {/* Platform Growth Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base text-slate-800 dark:text-white">Platform Tenant &amp; Student Expansion</h3>
              <p className="text-xs text-slate-400">Monthly cumulative active students across schools</p>
            </div>
            <Badge variant="teal">2026 Growth Metric</Badge>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={schoolGrowthData}>
                <defs>
                  <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0194F1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0194F1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="students" stroke="#0194F1" strokeWidth={3} fill="url(#growthGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subscription Plan Distribution */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-base text-slate-800 dark:text-white">Tier Allocations</h3>
              <Badge variant="pro" size="sm">Active Plans</Badge>
            </div>
            <p className="text-xs text-slate-400 mb-4">Live school licenses across plans</p>
            <div className="space-y-3 my-2">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-slate-800 dark:text-white block">Enterprise PRO</span>
                  <span className="text-[11px] text-slate-400">Unlimited capacity &amp; AI</span>
                </div>
                <Badge variant="pro" size="sm">2 Schools</Badge>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-slate-800 dark:text-white block">Premium</span>
                  <span className="text-[11px] text-slate-400">Up to 1500 students</span>
                </div>
                <Badge variant="teal" size="sm">1 School</Badge>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-slate-800 dark:text-white block">Standard</span>
                  <span className="text-[11px] text-slate-400">Up to 800 students</span>
                </div>
                <Badge variant="secondary" size="sm">1 School</Badge>
              </div>
            </div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-xs flex justify-between items-center mt-3">
            <span className="text-slate-500 font-medium">Active Multi-Tenant License:</span>
            <span className="font-bold text-teal-600">4 / 4 Active</span>
          </div>
        </div>
      </div>

      {/* Onboarded Schools Directory Preview */}
      <div className="bg-white dark:bg-slate-850 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-soft overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-800 dark:text-white">Active Tenant Institutions</h3>
            <p className="text-xs text-slate-400">Live subdomains configured on sclerp.com</p>
          </div>
          <button
            onClick={() => navigate('/super-admin/schools')}
            className="text-xs font-bold text-teal-600 hover:text-teal-700"
          >
            Manage All Schools &rarr;
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase">
                <th className="p-3.5">School Name</th>
                <th className="p-3.5">Tenant Subdomain</th>
                <th className="p-3.5">Students</th>
                <th className="p-3.5">Faculty</th>
                <th className="p-3.5">Plan Tier</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {schools.map((school) => (
                <tr key={school.id} className="hover:bg-slate-50/60">
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl ${school.logoColor} text-white flex items-center justify-center font-bold text-xs shrink-0`}>
                        {school.logoLetter}
                      </div>
                      <span className="font-bold text-slate-800 dark:text-white">{school.name}</span>
                    </div>
                  </td>
                  <td className="p-3.5 font-mono font-semibold text-teal-600">{school.subdomain}</td>
                  <td className="p-3.5 font-mono">{school.studentsCount?.toLocaleString()}</td>
                  <td className="p-3.5 font-mono">{school.teachersCount}</td>
                  <td className="p-3.5"><Badge variant="pro" size="sm">{school.plan}</Badge></td>
                  <td className="p-3.5"><Badge variant="active" size="sm">{school.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

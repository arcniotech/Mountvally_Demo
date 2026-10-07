import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Filter,
  FileSpreadsheet,
  Users,
  Wallet,
  GraduationCap,
  CalendarCheck,
  TrendingUp,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Badge } from '../../components/common/Badge';

export function ReportsPage() {
  const { showSuccess } = useToast();
  const [selectedReport, setSelectedReport] = useState('StudentReport');

  const reportCards = [
    { id: 'StudentReport', title: 'Student Enrollment & Demographics', icon: Users },
    { id: 'AttendanceReport', title: 'Attendance Analytics & Defaulters', icon: CalendarCheck },
    { id: 'FeeReport', title: 'Fee Realization & Dues Forecast', icon: Wallet },
    { id: 'ExamReport', title: 'Academic Performance & Subject Averages', icon: GraduationCap },
  ];

  const reportChartData = [
    { name: 'Grade 1', students: 84, feePaid: 92, avgMarks: 88 },
    { name: 'Grade 2', students: 90, feePaid: 88, avgMarks: 85 },
    { name: 'Grade 3', students: 105, feePaid: 84, avgMarks: 89 },
    { name: 'Grade 4', students: 95, feePaid: 90, avgMarks: 84 },
    { name: 'Grade 5', students: 110, feePaid: 95, avgMarks: 86 },
    { name: 'Grade 6', students: 88, feePaid: 82, avgMarks: 80 },
    { name: 'Grade 7', students: 92, feePaid: 86, avgMarks: 83 },
    { name: 'Grade 8', students: 102, feePaid: 89, avgMarks: 81 },
    { name: 'Grade 9', students: 96, feePaid: 91, avgMarks: 82 },
    { name: 'Grade 10', students: 118, feePaid: 94, avgMarks: 87 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analytics Hub"
        subtitle="Institutional data intelligence, performance metrics, and compliance exports"
        showAccent={true}
        action={
          <button
            onClick={() => showSuccess('Comprehensive institutional audit report generated.')}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Export Full PDF Report</span>
          </button>
        }
      />

      {/* Report Categories Selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {reportCards.map((rc) => {
          const Icon = rc.icon;
          const isSelected = selectedReport === rc.id;
          return (
            <div
              key={rc.id}
              onClick={() => setSelectedReport(rc.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-500 shadow-sm'
                  : 'bg-white dark:bg-slate-850 border-slate-100 dark:border-slate-800 hover:border-slate-200'
              }`}
            >
              <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-teal-600' : 'text-slate-400'}`} />
              <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-white">{rc.title}</h4>
            </div>
          );
        })}
      </div>

      {/* Chart Visualization */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-800 dark:text-white">Comparative Class-Wise Breakdown</h3>
            <p className="text-xs text-slate-400">Enrollment vs Fee Clearance Rates</p>
          </div>
          <Badge variant="teal">Academic Year 2026–27</Badge>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reportChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', color: '#fff' }} />
              <Bar dataKey="students" name="Enrollment Count" fill="#0194F1" radius={[6, 6, 0, 0]} />
              <Bar dataKey="feePaid" name="Fee Clearance %" fill="#0D9488" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

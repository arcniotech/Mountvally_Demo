import React, { useState } from 'react';
import {
  CalendarCheck,
  Check,
  X,
  Clock,
  Calendar,
  Save,
  Users,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Badge } from '../../components/common/Badge';

export function AttendancePage() {
  const { students } = useData();
  const { showSuccess } = useToast();

  const [selectedClass, setSelectedClass] = useState('Grade 3');
  const [selectedSection, setSelectedSection] = useState('Primrose-A');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedPeriod, setSelectedPeriod] = useState('Full Day');

  // Attendance state for students: 'Present', 'Absent', 'Late', 'Leave'
  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    const initial = {};
    students.forEach((s, idx) => {
      initial[s.id] = idx === 1 ? 'Absent' : idx === 3 ? 'Late' : 'Present';
    });
    return initial;
  });

  const handleStatusChange = (studentId, status) => {
    setAttendanceRecords(prev => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAllPresent = () => {
    const updated = {};
    students.forEach(s => { updated[s.id] = 'Present'; });
    setAttendanceRecords(updated);
    showSuccess('Marked all students in class as Present.');
  };

  const handleSaveAttendance = () => {
    showSuccess(`Attendance for ${selectedClass} - ${selectedSection} (${selectedDate}) saved successfully!`);
  };

  const totalCount = students.length;
  const presentCount = Object.values(attendanceRecords).filter(v => v === 'Present').length;
  const absentCount = Object.values(attendanceRecords).filter(v => v === 'Absent').length;
  const lateCount = Object.values(attendanceRecords).filter(v => v === 'Late').length;
  const leaveCount = Object.values(attendanceRecords).filter(v => v === 'Leave').length;
  const percentage = Math.round((presentCount / (totalCount || 1)) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Attendance"
        subtitle="Daily roll-call registry and attendance tracking system"
        showAccent={true}
        action={
          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAllPresent}
              className="px-3.5 py-2 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 font-bold text-xs hover:bg-teal-100 transition-colors flex items-center gap-1.5 touch-press"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Mark All Present</span>
            </button>
            <button
              onClick={handleSaveAttendance}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 touch-press"
            >
              <Save className="w-4 h-4" />
              <span>Save Attendance</span>
            </button>
          </div>
        }
      />

      {/* Class Selector Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-white"
          >
            {['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Section</label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-white"
          >
            <option value="Primrose-A">Primrose-A</option>
            <option value="Primrose-B">Primrose-B</option>
            <option value="Larkspur">Larkspur</option>
            <option value="Blue Bell">Blue Bell</option>
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-white font-mono"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Period</label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="w-full p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-white"
          >
            <option value="Full Day">Full Day (Session)</option>
            <option value="Morning">Morning Session</option>
            <option value="Afternoon">Afternoon Session</option>
          </select>
        </div>
      </div>

      {/* Attendance Summary Counter Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft">
          <span className="text-slate-400 block text-[11px] font-bold">Total Strength</span>
          <span className="text-xl font-extrabold text-slate-800 dark:text-white">{totalCount}</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50">
          <span className="text-emerald-700 dark:text-emerald-400 block text-[11px] font-bold">Present</span>
          <span className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400">{presentCount}</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/50">
          <span className="text-rose-700 dark:text-rose-400 block text-[11px] font-bold">Absent</span>
          <span className="text-xl font-extrabold text-rose-700 dark:text-rose-400">{absentCount}</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/50">
          <span className="text-amber-700 dark:text-amber-400 block text-[11px] font-bold">Late</span>
          <span className="text-xl font-extrabold text-amber-700 dark:text-amber-400">{lateCount}</span>
        </div>
        <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/50">
          <span className="text-teal-700 dark:text-teal-400 block text-[11px] font-bold">Turnout</span>
          <span className="text-xl font-extrabold text-teal-700 dark:text-teal-400">{percentage}%</span>
        </div>
      </div>

      {/* Student Roll-Call List */}
      <div className="bg-white dark:bg-slate-850 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-soft overflow-hidden">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {students.map((student, idx) => {
            const currentStatus = attendanceRecords[student.id] || 'Present';

            return (
              <div
                key={student.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800 dark:text-white">
                      {student.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {student.admissionNumber} &bull; Roll #{student.rollNo || idx + 1}
                    </p>
                  </div>
                </div>

                {/* Status Toggles: Present, Absent, Late, Leave */}
                <div className="flex items-center gap-1.5 self-end sm:self-center">
                  {[
                    { id: 'Present', label: 'Present', activeBg: 'bg-emerald-600 text-white', inactiveBg: 'bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200' },
                    { id: 'Absent', label: 'Absent', activeBg: 'bg-rose-600 text-white', inactiveBg: 'bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200' },
                    { id: 'Late', label: 'Late', activeBg: 'bg-amber-500 text-white', inactiveBg: 'bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200' },
                    { id: 'Leave', label: 'Leave', activeBg: 'bg-sky-500 text-white', inactiveBg: 'bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200' },
                  ].map(btn => (
                    <button
                      key={btn.id}
                      type="button"
                      onClick={() => handleStatusChange(student.id, btn.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all touch-press ${
                        currentStatus === btn.id ? btn.activeBg + ' shadow-xs' : btn.inactiveBg
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

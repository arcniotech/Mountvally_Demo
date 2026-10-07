import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  HeartPulse,
  BookOpen,
  Award,
  Wallet,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Badge } from '../../components/common/Badge';
import { Tabs } from '../../components/common/Tabs';

export function StudentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { students } = useData();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');

  // If id is provided in URL, match by id/admissionNumber; otherwise if logged in as student, match student's own account
  const student = id
    ? (students.find(s => s.id === id || s.admissionNumber === id) || students[0])
    : (students.find(s => s.admissionNumber === user?.admissionNumber || s.admissionNumber === user?.username || s.name === user?.name) || students[0]);

  const profileTabs = [
    { id: 'Overview', label: 'Overview' },
    { id: 'Attendance', label: 'Attendance' },
    { id: 'Academic', label: 'Academic & Timetable' },
    { id: 'Exams', label: 'Exams & Marks' },
    { id: 'Fees', label: 'Fees & Dues' },
    { id: 'Homework', label: 'Homework' },
    { id: 'Documents', label: 'Documents' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Back Navigation (only for Admin/Staff reviewing a student list) */}
      {user?.role !== 'Student' && (
        <button
          onClick={() => navigate('/school/students')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Students List</span>
        </button>
      )}

      {/* Student Profile Card Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 flex items-center justify-center font-extrabold text-2xl shrink-0 shadow-xs">
              {student.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  {student.name}
                </h1>
                <Badge variant="active" size="sm">ACTIVE</Badge>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                {student.admissionNumber} &bull; {student.class} - {student.section} &bull; Roll #{student.rollNo}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <Download className="w-4 h-4" />
              <span>ID Card</span>
            </button>
            <button className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm">
              Send Alert
            </button>
          </div>
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <Tabs
        tabs={profileTabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Tab 1: Overview */}
      {activeTab === 'Overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-fade-in">
          <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft space-y-4">
            <h3 className="font-bold text-sm text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Date of Birth</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{student.dob || '2015-05-10'}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Gender</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{student.gender}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Blood Group</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{student.bloodGroup}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Admission Date</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{student.admissionDate || '2023-06-01'}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-slate-400 block text-xs mb-0.5">Address</span>
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                {student.address || '14 Lotus Garden, Anna Nagar, Coimbatore, Tamil Nadu'}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft space-y-4">
            <h3 className="font-bold text-sm text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
              Parent & Guardian Contact
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Father&apos;s Name</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{student.fatherName || 'Rajesh Kumar'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Mother&apos;s Name</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{student.motherName || 'Sunita Kumar'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Phone Number</span>
                <span className="font-mono font-semibold text-teal-600">{student.parentPhone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Email</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{student.parentEmail || 'parent.contact@gmail.com'}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-slate-400 block text-xs mb-0.5">Medical Notes</span>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {student.medicalNotes || 'No known drug allergies. Fit for all regular sports and extracurricular activities.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Attendance */}
      {activeTab === 'Attendance' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-800 dark:text-white">Annual Attendance Summary</h3>
            <span className="text-base font-extrabold text-emerald-600">{student.attendance}% Overall</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50">
              <span className="text-emerald-700 dark:text-emerald-400 block font-bold text-lg">182</span>
              <span className="text-slate-500">Days Present</span>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/50">
              <span className="text-rose-700 dark:text-rose-400 block font-bold text-lg">6</span>
              <span className="text-slate-500">Days Absent</span>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/50">
              <span className="text-amber-700 dark:text-amber-400 block font-bold text-lg">4</span>
              <span className="text-slate-500">Late Arrivals</span>
            </div>
            <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/50">
              <span className="text-sky-700 dark:text-sky-400 block font-bold text-lg">2</span>
              <span className="text-slate-500">Approved Leaves</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Fees & Dues */}
      {activeTab === 'Fees' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-800 dark:text-white">Fee Breakdown & Payment Ledger</h3>
            <Badge variant={student.feeStatus === 'Paid' ? 'active' : 'pending'}>
              {student.feeStatus}
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <span className="text-xs text-slate-400">Total Fee</span>
              <p className="text-lg font-bold text-slate-800 dark:text-white">₹{student.totalFee?.toLocaleString() || '45,000'}</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30">
              <span className="text-xs text-emerald-600">Paid Amount</span>
              <p className="text-lg font-bold text-emerald-600">₹{student.paidFee?.toLocaleString() || '45,000'}</p>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30">
              <span className="text-xs text-rose-600">Pending Dues</span>
              <p className="text-lg font-bold text-rose-600">₹{student.pendingFee?.toLocaleString() || '0'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Exams & Marks */}
      {activeTab === 'Exams' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft space-y-4 animate-fade-in">
          <h3 className="font-bold text-sm text-slate-800 dark:text-white">Recent Examination Results (Unit Test 1)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold">
                  <th className="py-2">Subject</th>
                  <th className="py-2">Marks Obtained</th>
                  <th className="py-2">Max Marks</th>
                  <th className="py-2">Percentage</th>
                  <th className="py-2">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr><td className="py-2.5 font-bold">Mathematics</td><td>96</td><td>100</td><td>96%</td><td><Badge variant="active" size="sm">A1</Badge></td></tr>
                <tr><td className="py-2.5 font-bold">Science</td><td>92</td><td>100</td><td>92%</td><td><Badge variant="active" size="sm">A1</Badge></td></tr>
                <tr><td className="py-2.5 font-bold">English</td><td>88</td><td>100</td><td>88%</td><td><Badge variant="active" size="sm">A2</Badge></td></tr>
                <tr><td className="py-2.5 font-bold">Social Studies</td><td>90</td><td>100</td><td>90%</td><td><Badge variant="active" size="sm">A1</Badge></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Fallback for other tabs */}
      {['Academic', 'Homework', 'Documents'].includes(activeTab) && (
        <div className="p-8 text-center text-slate-500 bg-white dark:bg-slate-850 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-soft">
          <FileText className="w-8 h-8 mx-auto mb-2 text-slate-400" />
          <p className="text-sm font-semibold text-slate-800 dark:text-white">{activeTab} Records</p>
          <p className="text-xs text-slate-400 mt-1">All verified academic and student documents are active.</p>
        </div>
      )}
    </div>
  );
}

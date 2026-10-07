import React, { useState } from 'react';
import {
  BookOpen,
  CalendarCheck,
  Wallet,
  FileCheck2,
  Calendar,
  Clock,
  Download,
  CreditCard,
  CheckCircle2,
  Award,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export function StudentDashboardPage() {
  const { user } = useAuth();
  const { exams, circulars } = useData();
  const { showSuccess } = useToast();

  const [isPayModalOpen, setIsPayModalOpen] = useState(false);

  const studentSchedule = [
    { period: '08:30 - 09:15 AM', subject: 'Mathematics', teacher: 'Deepak Sharma', room: 'Hall 2A' },
    { period: '09:15 - 10:00 AM', subject: 'General Science', teacher: 'Priyanka Sen', room: 'Physics Lab' },
    { period: '10:15 - 11:00 AM', subject: 'English Literature', teacher: 'Arun Varghese', room: 'Room 102' },
    { period: '11:00 - 11:45 AM', subject: 'Social Science', teacher: 'Farhan Akhtar', room: 'Room 105' },
    { period: '12:30 - 01:15 PM', subject: 'Computer Applications', teacher: 'Meenakshi S', room: 'Computer Lab 1' },
  ];

  const handleOnlinePay = (e) => {
    e.preventDefault();
    showSuccess('Fee payment of ₹24,000 processed successfully. Official receipt downloaded.');
    setIsPayModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Student Greeting Banner */}
      <div className="bg-gradient-to-r from-brand-600 to-teal-600 rounded-3xl p-6 sm:p-8 text-white shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/20 font-semibold">Student Portal</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">Hello, {user?.name || 'Demo Child'}</h1>
          <p className="text-xs sm:text-sm text-teal-100 mt-1">
            {user?.class || 'Grade 10'} - Section {user?.section || 'A'} &bull; Admission No: {user?.admissionNumber || 'DEMO-0001'} &bull; Mount Valley Public School
          </p>
        </div>
        <button
          onClick={() => setIsPayModalOpen(true)}
          className="px-4 py-2.5 bg-white text-teal-800 font-bold text-xs sm:text-sm rounded-xl shadow-sm self-start md:self-auto touch-press flex items-center gap-1.5"
        >
          <Wallet className="w-4 h-4 text-teal-600" />
          <span>Pay Term Dues</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <StatCard title="Attendance Rate" value="96.5%" subtitle="182 / 188 Days" icon={CalendarCheck} iconColor="text-emerald-500" />
        <StatCard title="Term GPA / Rank" value="A1 (94%)" subtitle="Class Rank #3" icon={Award} iconColor="text-amber-500" />
        <StatCard title="Pending Homework" value="2 Tasks" subtitle="Due this week" icon={BookOpen} iconColor="text-brand-500" />
        <StatCard title="Fee Status" value="Clear" subtitle="Term 2 Verified" icon={Wallet} iconColor="text-teal-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Timetable */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-800 dark:text-white">Today&apos;s Class Schedule</h3>
            <Badge variant="teal">Session Active</Badge>
          </div>

          <div className="space-y-3">
            {studentSchedule.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-teal-600 w-6">{idx + 1}.</span>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800 dark:text-white">{item.subject}</h4>
                    <p className="text-xs text-slate-400">{item.teacher} &bull; {item.room}</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-slate-500">{item.period}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Homework & Upcoming Exams */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft space-y-3">
            <h3 className="font-bold text-base text-slate-800 dark:text-white">Active Homework Tasks</h3>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1">
                <div className="flex justify-between font-bold"><span className="text-slate-800 dark:text-white">Mathematics Quadratic Set 3</span><span className="text-rose-500">Due Sep 20</span></div>
                <p className="text-slate-400">Complete exercises 4.1 to 4.3 in notebook.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1">
                <div className="flex justify-between font-bold"><span className="text-slate-800 dark:text-white">Science Newton Laws Chart</span><span className="text-amber-500">Due Sep 21</span></div>
                <p className="text-slate-400">Prepare working diagram of third law.</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft space-y-3">
            <h3 className="font-bold text-base text-slate-800 dark:text-white">Upcoming Examinations</h3>
            <div className="space-y-2 text-xs">
              {exams.slice(0, 2).map((ex) => (
                <div key={ex.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-800 dark:text-white">{ex.subject}</p>
                    <p className="text-slate-400 font-mono text-[11px]">{ex.date} &bull; {ex.time}</p>
                  </div>
                  <Badge variant="primary" size="sm">{ex.room}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pay Fee Modal */}
      <Modal
        isOpen={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
        title="Pay School Fee Online"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleOnlinePay} className="space-y-4 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
            <div className="flex justify-between"><span className="text-slate-400">Student:</span><span className="font-bold">{user?.name}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Term:</span><span>Term 2 Tuition + Lab</span></div>
            <div className="flex justify-between text-teal-600 font-bold text-sm"><span>Amount Due:</span><span>₹24,000</span></div>
          </div>

          <div>
            <label className="font-bold block mb-1">Select Payment Gateway</label>
            <select className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border">
              <option>UPI / Google Pay / PhonePe</option>
              <option>Net Banking (All Indian Banks)</option>
              <option>Credit / Debit Card</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t">
            <button type="button" onClick={() => setIsPayModalOpen(false)} className="px-4 py-2 text-slate-500">Cancel</button>
            <button type="submit" className="px-5 py-2 bg-teal-600 text-white font-bold rounded-xl shadow-sm">Proceed to Pay ₹24,000</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

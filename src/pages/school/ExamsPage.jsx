import React, { useState } from 'react';
import {
  FileCheck2,
  Calendar,
  Award,
  Search,
  Plus,
  Printer,
  Download,
  CheckCircle2,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Tabs } from '../../components/common/Tabs';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export function ExamsPage() {
  const { exams, students } = useData();
  const { showSuccess } = useToast();
  const [activeTab, setActiveTab] = useState('Schedule');
  const [selectedStudentForReport, setSelectedStudentForReport] = useState(null);

  const tabs = [
    { id: 'Schedule', label: 'Exam Schedule' },
    { id: 'Results', label: 'Results & Marks Ledger' },
    { id: 'ReportCards', label: 'Report Cards' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Examinations & Assessments"
        subtitle="Exam scheduling, room allocation, score registers, and student report card generation"
        showAccent={true}
        action={
          <button
            onClick={() => showSuccess('Exam schedule draft saved.')}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center gap-1.5 touch-press"
          >
            <Plus className="w-4 h-4" />
            <span>Create Exam</span>
          </button>
        }
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'Schedule' && (
        <div className="bg-white dark:bg-slate-850 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-soft overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase">
                  <th className="p-3.5">Examination</th>
                  <th className="p-3.5">Class</th>
                  <th className="p-3.5">Subject</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Timing</th>
                  <th className="p-3.5">Hall / Room</th>
                  <th className="p-3.5">Max Marks</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {exams.map((ex) => (
                  <tr key={ex.id} className="hover:bg-slate-50/60">
                    <td className="p-3.5 font-bold text-slate-800 dark:text-white">{ex.examName}</td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300">{ex.class}</td>
                    <td className="p-3.5 font-semibold text-teal-600">{ex.subject}</td>
                    <td className="p-3.5 font-mono text-slate-600 dark:text-slate-400">{ex.date}</td>
                    <td className="p-3.5 text-slate-500">{ex.time}</td>
                    <td className="p-3.5 font-semibold">{ex.room}</td>
                    <td className="p-3.5 font-mono font-bold">{ex.maxMarks}</td>
                    <td className="p-3.5"><Badge variant="primary" size="sm">{ex.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Results' && (
        <div className="bg-white dark:bg-slate-850 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-soft overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase">
                  <th className="p-3.5">Student</th>
                  <th className="p-3.5">Admission No</th>
                  <th className="p-3.5">Class</th>
                  <th className="p-3.5">Maths</th>
                  <th className="p-3.5">Science</th>
                  <th className="p-3.5">English</th>
                  <th className="p-3.5">Social</th>
                  <th className="p-3.5">Total (400)</th>
                  <th className="p-3.5">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {students.slice(0, 8).map((s, idx) => {
                  const m1 = 92 - (idx * 2);
                  const m2 = 88 - (idx * 3);
                  const m3 = 90 - (idx * 1);
                  const m4 = 85 - (idx * 2);
                  const total = m1 + m2 + m3 + m4;
                  const pct = Math.round((total / 400) * 100);
                  const grade = pct >= 90 ? 'A1' : pct >= 80 ? 'A2' : 'B1';

                  return (
                    <tr key={s.id} className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-800 dark:text-white">{s.name}</td>
                      <td className="p-3.5 font-mono text-slate-400">{s.admissionNumber}</td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-300">{s.class}</td>
                      <td className="p-3.5 font-mono">{m1}</td>
                      <td className="p-3.5 font-mono">{m2}</td>
                      <td className="p-3.5 font-mono">{m3}</td>
                      <td className="p-3.5 font-mono">{m4}</td>
                      <td className="p-3.5 font-mono font-bold text-teal-600">{total} ({pct}%)</td>
                      <td className="p-3.5"><Badge variant="active" size="sm">{grade}</Badge></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'ReportCards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
          {students.slice(0, 6).map((student) => (
            <div key={student.id} className="p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 flex items-center justify-center font-bold text-sm">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800 dark:text-white">{student.name}</h4>
                    <p className="text-xs text-slate-400 font-mono">{student.admissionNumber} &bull; {student.class}</p>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-xs space-y-1">
                  <div className="flex justify-between"><span className="text-slate-400">Term 1 Rank:</span><span className="font-bold text-teal-600">Top 5%</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Overall Grade:</span><Badge variant="active" size="sm">A1 Excellent</Badge></div>
                </div>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setSelectedStudentForReport(student)}
                  className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 touch-press"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>View Report Card</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Printable Report Card Modal */}
      {selectedStudentForReport && (
        <Modal
          isOpen={!!selectedStudentForReport}
          onClose={() => setSelectedStudentForReport(null)}
          title={`Student Progress Report Card - ${selectedStudentForReport.name}`}
          maxWidth="max-w-xl"
        >
          <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-4 bg-white dark:bg-slate-900 text-xs">
            <div className="text-center border-b pb-3">
              <h2 className="text-base font-extrabold text-slate-800 dark:text-white uppercase tracking-wider">Mount Valley Public School</h2>
              <p className="text-slate-400">Term 1 Academic Progress Assessment Report &bull; 2026–27</p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-700 dark:text-slate-300">
              <p><strong>Student:</strong> {selectedStudentForReport.name}</p>
              <p><strong>Admission No:</strong> {selectedStudentForReport.admissionNumber}</p>
              <p><strong>Class &amp; Section:</strong> {selectedStudentForReport.class} - {selectedStudentForReport.section}</p>
              <p><strong>Roll Number:</strong> {selectedStudentForReport.rollNo || '01'}</p>
            </div>
            <table className="w-full text-left border">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr><th className="p-2 border">Subject</th><th className="p-2 border">Max</th><th className="p-2 border">Obtained</th><th className="p-2 border">Grade</th></tr>
              </thead>
              <tbody>
                <tr><td className="p-2 border">Mathematics</td><td className="p-2 border">100</td><td className="p-2 border font-bold">96</td><td className="p-2 border">A1</td></tr>
                <tr><td className="p-2 border">General Science</td><td className="p-2 border">100</td><td className="p-2 border font-bold">92</td><td className="p-2 border">A1</td></tr>
                <tr><td className="p-2 border">English Literature</td><td className="p-2 border">100</td><td className="p-2 border font-bold">88</td><td className="p-2 border">A2</td></tr>
                <tr><td className="p-2 border">Social Science</td><td className="p-2 border">100</td><td className="p-2 border font-bold">90</td><td className="p-2 border">A1</td></tr>
              </tbody>
            </table>
            <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-xl text-teal-800 dark:text-teal-200">
              <strong>Teacher Remarks:</strong> Exemplary performance in analytical problem solving and consistent classroom engagement.
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  showSuccess('Sending printable report card to printer...');
                  window.print();
                }}
                className="px-4 py-2 bg-teal-600 text-white font-bold rounded-xl flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Report</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

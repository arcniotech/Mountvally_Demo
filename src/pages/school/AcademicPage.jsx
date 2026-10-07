import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Layers,
  FileText,
  Clock,
  Plus,
  Edit2,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Tabs } from '../../components/common/Tabs';
import { Badge } from '../../components/common/Badge';

export function AcademicPage() {
  const { showSuccess } = useToast();
  const [activeTab, setActiveTab] = useState('Timetable');

  const tabs = [
    { id: 'Timetable', label: 'Master Timetable' },
    { id: 'Classes', label: 'Classes & Sections' },
    { id: 'Subjects', label: 'Subjects & Curriculum' },
    { id: 'Homework', label: 'Homework Manager' },
  ];

  const timetableSchedule = [
    { period: 'Period 1 (08:30 - 09:15)', mon: 'Mathematics (Deepak)', tue: 'Science (Priyanka)', wed: 'English (Arun)', thu: 'Mathematics (Deepak)', fri: 'Science (Priyanka)' },
    { period: 'Period 2 (09:15 - 10:00)', mon: 'Science (Priyanka)', tue: 'Mathematics (Deepak)', wed: 'Social Science (Farhan)', thu: 'English (Arun)', fri: 'Computer Sci (Meenakshi)' },
    { period: 'Break (10:00 - 10:15)', mon: 'Short Break', tue: 'Short Break', wed: 'Short Break', thu: 'Short Break', fri: 'Short Break' },
    { period: 'Period 3 (10:15 - 11:00)', mon: 'English (Arun)', tue: 'Chemistry (Kavita)', wed: 'Mathematics (Deepak)', thu: 'Social Science (Farhan)', fri: 'Mathematics (Deepak)' },
    { period: 'Period 4 (11:00 - 11:45)', mon: 'Social Science (Farhan)', tue: 'English (Arun)', wed: 'Physics Lab (Priyanka)', thu: 'Chemistry (Kavita)', fri: 'Sports (Suresh)' },
    { period: 'Lunch (11:45 - 12:30)', mon: 'Lunch Break', tue: 'Lunch Break', wed: 'Lunch Break', thu: 'Lunch Break', fri: 'Lunch Break' },
    { period: 'Period 5 (12:30 - 01:15)', mon: 'Computer Sci (Meenakshi)', tue: 'Social Science (Farhan)', wed: 'Chemistry (Kavita)', thu: 'Physics (Priyanka)', fri: 'Library / Reading' },
    { period: 'Period 6 (01:15 - 02:00)', mon: 'Sports & PE (Suresh)', tue: 'Art & Craft', wed: 'Mathematics (Deepak)', thu: 'English (Arun)', fri: 'Weekly Assembly' },
  ];

  const homeworkList = [
    { id: 1, class: 'Grade 10-A', subject: 'Mathematics', title: 'Quadratic Equations Practice Set 3', dueDate: '2026-09-20', assignedBy: 'Deepak Sharma', submissions: '28/32' },
    { id: 2, class: 'Grade 9-Blue Bell', subject: 'Science', title: 'Newton Laws of Motion Chapter Summary', dueDate: '2026-09-21', assignedBy: 'Priyanka Sen', submissions: '24/30' },
    { id: 3, class: 'Grade 4-Larkspur', subject: 'English', title: 'Poem Comprehension & Vocabulary List', dueDate: '2026-09-19', assignedBy: 'Arun Varghese', submissions: '29/30' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Academic Management"
        subtitle="Curriculum structuring, class scheduling, subject mapping, and homework logs"
        showAccent={true}
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'Timetable' && (
        <div className="bg-white dark:bg-slate-850 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-soft overflow-hidden animate-fade-in">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-sm sm:text-base text-slate-800 dark:text-white">Class Timetable: Grade 10 - Section A</h3>
            <span className="text-xs text-teal-600 font-semibold">Active Term Schedule</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase">
                  <th className="p-3.5">Period / Time</th>
                  <th className="p-3.5">Monday</th>
                  <th className="p-3.5">Tuesday</th>
                  <th className="p-3.5">Wednesday</th>
                  <th className="p-3.5">Thursday</th>
                  <th className="p-3.5">Friday</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {timetableSchedule.map((row, idx) => {
                  const isBreak = row.period.includes('Break') || row.period.includes('Lunch');
                  return (
                    <tr key={idx} className={isBreak ? 'bg-amber-50/30 dark:bg-amber-950/20 font-semibold text-amber-700' : 'hover:bg-slate-50/60'}>
                      <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">{row.period}</td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-400">{row.mon}</td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-400">{row.tue}</td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-400">{row.wed}</td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-400">{row.thu}</td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-400">{row.fri}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Homework' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
          {homeworkList.map((hw) => (
            <div key={hw.id} className="p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="teal" size="sm">{hw.class}</Badge>
                  <span className="text-[11px] font-bold text-rose-500 font-mono">Due {hw.dueDate}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-1">{hw.title}</h4>
                <p className="text-xs text-slate-400 mb-3">{hw.subject} &bull; Assigned by {hw.assignedBy}</p>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Submissions:</span>
                <span className="font-bold text-teal-600">{hw.submissions} Submitted</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Classes' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
          {['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map((c, i) => (
            <div key={c} className="p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-base text-slate-800 dark:text-white">{c}</h4>
                <Badge variant="primary" size="sm">3 Sections</Badge>
              </div>
              <div className="space-y-1.5 text-xs text-slate-500">
                <p>&bull; Sections: A, B, C</p>
                <p>&bull; Capacity: 35 per section</p>
                <p>&bull; Class Teacher Assigned</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Subjects' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
          {[
            { code: 'MATH-101', name: 'Mathematics', dept: 'Mathematics Dept', credits: 6 },
            { code: 'SCI-102', name: 'Science & Physics', dept: 'Science Dept', credits: 5 },
            { code: 'ENG-103', name: 'English Literature', dept: 'Languages Dept', credits: 4 },
            { code: 'SOC-104', name: 'Social Studies & Civics', dept: 'Humanities Dept', credits: 4 },
            { code: 'CS-105', name: 'Computer Applications', dept: 'Computer Sci Dept', credits: 3 },
            { code: 'CHE-106', name: 'Chemistry & Biology', dept: 'Science Dept', credits: 5 },
          ].map((sub) => (
            <div key={sub.code} className="p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft">
              <span className="text-[11px] font-mono font-bold text-slate-400 block mb-1">{sub.code}</span>
              <h4 className="font-bold text-base text-slate-800 dark:text-white">{sub.name}</h4>
              <p className="text-xs text-teal-600 mt-1">{sub.dept}</p>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 flex justify-between">
                <span>Credits: {sub.credits}</span>
                <span className="text-emerald-600 font-semibold">Active Syllabus</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

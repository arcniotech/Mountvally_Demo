import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Users, GraduationCap, FileText, Megaphone, Calendar, X } from 'lucide-react';
import { useData } from '../../context/DataContext';

export function GlobalSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { students, teachers, invoices, announcements } = useData();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredStudents = query
    ? students.filter(s => s.name.toLowerCase().includes(query.toLowerCase()) || s.admissionNumber.toLowerCase().includes(query.toLowerCase())).slice(0, 4)
    : [];

  const filteredTeachers = query
    ? teachers.filter(t => t.name.toLowerCase().includes(query.toLowerCase()) || t.department.toLowerCase().includes(query.toLowerCase())).slice(0, 3)
    : [];

  const filteredInvoices = query
    ? invoices.filter(i => i.studentName.toLowerCase().includes(query.toLowerCase()) || i.invoiceNumber.toLowerCase().includes(query.toLowerCase())).slice(0, 3)
    : [];

  const filteredAnnouncements = query
    ? announcements.filter(a => a.title.toLowerCase().includes(query.toLowerCase())).slice(0, 3)
    : [];

  const handleSelect = (path) => {
    navigate(path);
    onClose();
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs animate-fade-in" />
      
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden z-10 animate-fade-in">
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search students, teachers, invoices, announcements..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm md:text-base text-slate-800 dark:text-white placeholder-slate-400 outline-none"
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-4 space-y-4">
          {!query && (
            <div className="text-center py-8 text-xs text-slate-400">
              Type to search across students, staff, academics, finance and events...
            </div>
          )}

          {query && filteredStudents.length === 0 && filteredTeachers.length === 0 && filteredInvoices.length === 0 && filteredAnnouncements.length === 0 && (
            <div className="text-center py-6 text-sm text-slate-400">
              No results found for &ldquo;{query}&rdquo;
            </div>
          )}

          {filteredStudents.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-2">
                Students
              </span>
              <div className="space-y-1">
                {filteredStudents.map(s => (
                  <div
                    key={s.id}
                    onClick={() => handleSelect(`/school/students/${s.id}`)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-teal-600" />
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-white">{s.name}</p>
                        <p className="text-[11px] text-slate-400">{s.admissionNumber} · {s.class} - {s.section}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-teal-600">View</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredTeachers.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-2">
                Teachers
              </span>
              <div className="space-y-1">
                {filteredTeachers.map(t => (
                  <div
                    key={t.id}
                    onClick={() => handleSelect(`/school/teachers`)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-4 h-4 text-brand-600" />
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-white">{t.name}</p>
                        <p className="text-[11px] text-slate-400">{t.designation} · {t.department}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-brand-600">View</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredInvoices.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-2">
                Invoices & Finance
              </span>
              <div className="space-y-1">
                {filteredInvoices.map(i => (
                  <div
                    key={i.id}
                    onClick={() => handleSelect(`/school/invoices`)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-amber-600" />
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-white">{i.invoiceNumber} - {i.studentName}</p>
                        <p className="text-[11px] text-slate-400">₹{i.amount.toLocaleString()} · {i.status}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-amber-600">View</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

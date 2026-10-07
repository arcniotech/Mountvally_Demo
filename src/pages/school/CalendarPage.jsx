import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Tag,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Badge } from '../../components/common/Badge';

export function CalendarPage() {
  const { calendarEvents } = useData();
  const { showSuccess } = useToast();
  const [selectedType, setSelectedType] = useState('All');

  const eventTypes = ['All', 'Exam', 'Holiday', 'Meeting', 'School Event', 'Assignment'];

  const filteredEvents = calendarEvents.filter(ev => {
    if (selectedType === 'All') return true;
    return ev.type === selectedType;
  });

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      <PageHeader
        title="School Calendar"
        subtitle="Academic term milestones, holidays, examination dates, and parent meetings"
        showAccent={true}
        action={
          <button
            onClick={() => showSuccess('Event scheduled to calendar.')}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center gap-1.5 touch-press"
          >
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </button>
        }
      />

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {eventTypes.map(t => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              selectedType === t
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Calendar Grid View */}
        <div className="lg:col-span-8 p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-800 dark:text-white">September 2026</h3>
            <div className="flex items-center gap-2">
              <button className="p-1.5 rounded-xl border hover:bg-slate-50"><ChevronLeft className="w-4 h-4" /></button>
              <span className="text-xs font-bold px-2">Today</span>
              <button className="p-1.5 rounded-xl border hover:bg-slate-50"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <span key={d} className="font-bold text-slate-400 py-1.5">{d}</span>
            ))}
            {/* Calendar dates */}
            {daysInMonth.map(day => {
              const hasEvent = day === 17 || day === 26 || day === 30 || day === 12 || day === 2;
              const isToday = day === 17;

              return (
                <div
                  key={day}
                  className={`min-h-[52px] p-1.5 rounded-2xl border transition-all flex flex-col justify-between ${
                    isToday
                      ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-500 font-bold text-teal-700'
                      : 'border-slate-100 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="text-left text-[11px]">{day}</span>
                  {hasEvent && (
                    <span className="w-2 h-2 rounded-full bg-amber-500 self-center" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events Agenda */}
        <div className="lg:col-span-4 p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft space-y-4">
          <h3 className="font-bold text-base text-slate-800 dark:text-white">Upcoming Events Agenda</h3>
          <div className="space-y-3">
            {filteredEvents.map(ev => (
              <div key={ev.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <Badge variant={ev.type === 'Holiday' ? 'danger' : ev.type === 'Exam' ? 'primary' : 'teal'} size="sm">
                    {ev.type}
                  </Badge>
                  <span className="text-[11px] font-mono font-bold text-slate-400">{ev.date}</span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-white">{ev.title}</h4>
                <p className="text-[11px] text-slate-400">All campus attendees &bull; Official schedule</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

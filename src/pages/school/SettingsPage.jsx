import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Save,
  Building,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Sparkles,
  Shield,
  CheckCircle2,
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Badge } from '../../components/common/Badge';

export function SettingsPage() {
  const { currentSchool, updateSchool } = useSchool();
  const { showSuccess } = useToast();

  const [schoolData, setSchoolData] = useState({
    name: currentSchool?.name || '',
    phone: currentSchool?.phone || '',
    email: currentSchool?.email || '',
    address: currentSchool?.address || '',
    principalName: currentSchool?.principalName || '',
    academicYear: currentSchool?.academicYear || '2026–27',
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateSchool(currentSchool.id, schoolData);
    showSuccess('School profile & institutional configurations updated.');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="School Settings"
        subtitle="Institutional profile, portal subdomain mapping, and academic preferences"
        showAccent={true}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: General Settings Form */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft">
          <form onSubmit={handleSave} className="space-y-4">
            <h3 className="font-bold text-base text-slate-800 dark:text-white border-b pb-2">
              Institutional Profile
            </h3>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">School Name</label>
              <input
                type="text"
                value={schoolData.name}
                onChange={(e) => setSchoolData({ ...schoolData, name: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Official Email</label>
                <input
                  type="email"
                  value={schoolData.email}
                  onChange={(e) => setSchoolData({ ...schoolData, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={schoolData.phone}
                  onChange={(e) => setSchoolData({ ...schoolData, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Principal / Head of Institution</label>
                <input
                  type="text"
                  value={schoolData.principalName}
                  onChange={(e) => setSchoolData({ ...schoolData, principalName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Current Academic Year</label>
                <input
                  type="text"
                  value={schoolData.academicYear}
                  onChange={(e) => setSchoolData({ ...schoolData, academicYear: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Campus Address</label>
              <textarea
                rows="2"
                value={schoolData.address}
                onChange={(e) => setSchoolData({ ...schoolData, address: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm"
              />
            </div>

            <div className="flex justify-end pt-3 border-t">
              <button
                type="submit"
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm flex items-center gap-2 touch-press"
              >
                <Save className="w-4 h-4" />
                <span>Save Configuration</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right: Subdomain & Tenant Info */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft space-y-3">
            <h3 className="font-bold text-sm text-slate-800 dark:text-white">Tenant Portal Info</h3>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-2 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">School Code:</span>
                <span className="font-mono font-bold text-teal-600">{currentSchool?.code}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Subdomain Portal:</span>
                <a href={currentSchool?.portalUrl} target="_blank" rel="noreferrer" className="text-brand-600 underline font-semibold font-mono">
                  {currentSchool?.subdomain}
                </a>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Platform Plan:</span>
                <Badge variant="pro" size="sm">{currentSchool?.plan}</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

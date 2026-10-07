import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  School,
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Power,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  LogIn,
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Badge } from '../../components/common/Badge';

export function SuperAdminSchoolsPage() {
  const { schools, toggleSchoolStatus, switchSchool } = useSchool();
  const { login } = useAuth();
  const { showSuccess } = useToast();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');

  const handleLoginAsSchoolAdmin = (school) => {
    switchSchool(school.id);
    login('School Admin', { schoolCode: school.code, username: `${school.code}.admin` }, school);
    showSuccess(`Logged in as Administrator for ${school.name}`);
    navigate('/school/dashboard');
  };

  const filteredSchools = schools.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="School Directory & Tenant Control"
        subtitle="Manage all institutional tenant instances, subdomains, status and administrator access"
        showAccent={true}
        action={
          <button
            onClick={() => navigate('/super-admin/schools/new')}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center gap-2 touch-press"
          >
            <Plus className="w-4 h-4" />
            <span>Onboard School</span>
          </button>
        }
      />

      {/* Search Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search school name or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
          />
        </div>
      </div>

      {/* Schools Table */}
      <div className="bg-white dark:bg-slate-850 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">School Institution</th>
                <th className="py-3.5 px-4">Code</th>
                <th className="py-3.5 px-4">Subdomain Portal</th>
                <th className="py-3.5 px-4">Students</th>
                <th className="py-3.5 px-4">Teachers</th>
                <th className="py-3.5 px-4">Plan</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredSchools.map((school) => (
                <tr key={school.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-2xl ${school.logoColor} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs`}>
                        {school.logoLetter}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 dark:text-white">{school.name}</p>
                        <p className="text-[11px] text-slate-400">{school.city}, {school.state}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-700 dark:text-slate-300">{school.code}</td>
                  <td className="py-3.5 px-4">
                    <a
                      href={school.portalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-teal-600 dark:text-teal-400 font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>{school.subdomain}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="py-3.5 px-4 font-mono">{school.studentsCount?.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-mono">{school.teachersCount}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant="pro" size="sm">{school.plan}</Badge>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={school.status === 'Active' ? 'active' : 'danger'} size="sm">
                      {school.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleLoginAsSchoolAdmin(school)}
                        className="px-2.5 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 hover:bg-teal-100 font-bold text-xs flex items-center gap-1 transition-colors"
                        title="Sign into this school's admin portal"
                      >
                        <LogIn className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Admin Login</span>
                      </button>
                      <button
                        onClick={() => {
                          toggleSchoolStatus(school.id);
                          showSuccess(`School status changed to ${school.status === 'Active' ? 'Suspended' : 'Active'}.`);
                        }}
                        className={`p-1.5 rounded-xl ${
                          school.status === 'Active'
                            ? 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'
                            : 'text-emerald-600 hover:bg-emerald-50'
                        }`}
                        title={school.status === 'Active' ? 'Suspend Instance' : 'Activate Instance'}
                      >
                        <Power className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

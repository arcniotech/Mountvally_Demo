import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Globe,
  Lock,
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  School,
  ExternalLink,
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Badge } from '../../components/common/Badge';

export function SuperAdminOnboardingPage() {
  const { addSchool, generateSchoolCode } = useSchool();
  const { showSuccess } = useToast();
  const navigate = useNavigate();

  const [schoolName, setSchoolName] = useState('ABC Matriculation School');
  const [schoolCode, setSchoolCode] = useState('abc');
  const [email, setEmail] = useState('admin@abcschool.org');
  const [phone, setPhone] = useState('+91 98765 33445');
  const [address, setAddress] = useState('77 Heritage Crossway, Old Town');
  const [city, setCity] = useState('Chennai');
  const [state, setState] = useState('Tamil Nadu');
  const [country, setCountry] = useState('India');
  const [postalCode, setPostalCode] = useState('600004');
  const [principalName, setPrincipalName] = useState('Mr. K. Narayanan');
  const [academicYear, setAcademicYear] = useState('2026–27');
  const [plan, setPlan] = useState('Enterprise PRO');

  // Admin credentials
  const [adminName, setAdminName] = useState('Administrator');
  const [adminUsername, setAdminUsername] = useState('abc.admin');
  const [adminPassword, setAdminPassword] = useState('admin@123');

  const handleNameChange = (val) => {
    setSchoolName(val);
    const code = generateSchoolCode(val);
    setSchoolCode(code);
    setAdminUsername(`${code}.admin`);
    setEmail(`admin@${code}.edu.in`);
  };

  const handleCodeChange = (val) => {
    const clean = val.toLowerCase().replace(/[^a-z0-9]/g, '');
    setSchoolCode(clean);
    setAdminUsername(`${clean}.admin`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSchool = addSchool({
      name: schoolName,
      code: schoolCode,
      email,
      phone,
      address,
      city,
      state,
      country,
      postalCode,
      principalName,
      academicYear,
      plan,
      adminName,
      studentsCount: 650,
      teachersCount: 42,
    });

    showSuccess(`School ${newSchool.name} successfully onboarded on ${newSchool.subdomain}!`);
    navigate('/super-admin/schools');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="School Onboarding Wizard"
        subtitle="Provision a dedicated multi-tenant instance, subdomain routing, and administrator credentials"
        showAccent={true}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Onboarding Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: School Identity */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                1. Institutional Identity &amp; Portal
              </span>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  School Name *
                </label>
                <input
                  type="text"
                  required
                  value={schoolName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. ABC Matriculation School"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Generated School Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={schoolCode}
                    onChange={(e) => handleCodeChange(e.target.value)}
                    placeholder="e.g. abc"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-mono font-bold text-teal-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Subscription Plan
                  </label>
                  <select
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
                  >
                    <option value="Enterprise PRO">Enterprise PRO</option>
                    <option value="Premium">Premium</option>
                    <option value="Standard">Standard</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Contact & Location */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                2. Contact &amp; Campus Location
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Official Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Principal Name</label>
                  <input
                    type="text"
                    required
                    value={principalName}
                    onChange={(e) => setPrincipalName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: School Admin Account */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                3. Primary Administrator Credentials
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Admin Username</label>
                  <input
                    type="text"
                    required
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Temporary Password</label>
                  <input
                    type="text"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm font-mono"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 touch-press"
            >
              <span>Provision &amp; Launch School Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right: Live Subdomain & Portal Representation Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Globe className="w-5 h-5 text-teal-600" />
              <h3 className="font-bold text-sm sm:text-base text-slate-800 dark:text-white">
                Live Subdomain Portal Representation
              </h3>
            </div>

            {/* Subdomain URL Card */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
              <span className="text-[10px] font-mono uppercase text-teal-400 tracking-wider block">
                Simulated Tenant Domain
              </span>
              <p className="font-mono font-bold text-base text-teal-300 flex items-center gap-2 break-all">
                <span>https://{schoolCode || 'school'}.sclerp.com</span>
              </p>
              <p className="text-[11px] text-slate-400">
                Isolated portal namespace with automated security policy and data boundary.
              </p>
            </div>

            {/* School Brand Badge Preview */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-extrabold text-lg shadow-sm shrink-0">
                  {schoolName ? schoolName.charAt(0).toUpperCase() : 'S'}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white truncate">
                    {schoolName || 'School Name'}
                  </h4>
                  <p className="text-xs text-teal-600 font-medium truncate">
                    {schoolCode ? `${schoolCode}.sclerp.com` : 'portal'}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl space-y-1 text-xs">
                <div className="flex justify-between"><span className="text-slate-400">Admin Account:</span><span className="font-mono font-bold">{adminUsername}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Default Key:</span><span className="font-mono">{adminPassword}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Plan:</span><Badge variant="pro" size="sm">{plan}</Badge></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

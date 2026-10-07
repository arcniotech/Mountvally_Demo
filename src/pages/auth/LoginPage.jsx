import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  GraduationCap,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  School,
  Lock,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useSchool } from "../../context/SchoolContext";
import { useToast } from "../../context/ToastContext";
import { InstitutionLogo } from "../../components/common/InstitutionLogo";

export function LoginPage() {
  const [selectedRole, setSelectedRole] = useState("Institute Admin");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Form states
  const [adminEmail, setAdminEmail] = useState("admin@Mount Valley.com");
  const [schoolCode, setSchoolCode] = useState("mvps");
  const [employeeId, setEmployeeId] = useState("EMP001");
  const [admissionNumber, setAdmissionNumber] = useState("DEMO-0001");
  const [password, setPassword] = useState("admin@123");

  const { login } = useAuth();
  const { schools, switchSchool } = useSchool();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const roles = [
    { id: "Institute Admin", label: "Institute Admin", icon: Building2 },
    { id: "Staff", label: "Staff", icon: GraduationCap },
    { id: "Student", label: "Student", icon: User },
  ];

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    if (role === "Institute Admin") {
      setAdminEmail("admin@Mount Valley.com");
      setPassword("admin@123");
    } else if (role === "Staff") {
      setSchoolCode("mvps");
      setEmployeeId("EMP001");
      setPassword("staff@123");
    } else if (role === "Student") {
      setSchoolCode("mvps");
      setAdmissionNumber("DEMO-0001");
      setPassword("student@123");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedRole === "Institute Admin") {
      const lowerAdmin = adminEmail.trim().toLowerCase();

      // Check if superadmin is logging in through Institute Admin page
      if (
        lowerAdmin.includes("superadmin") ||
        lowerAdmin === "superadmin@sclerp.com" ||
        lowerAdmin === "superadmin@Mount Valley.com"
      ) {
        const loggedUser = login("Super Admin", {
          email: lowerAdmin,
          password,
        });
        showSuccess(`Signed in as Super Administrator`);
        navigate("/super-admin/dashboard");
        return;
      }

      // Automatically match school from the entered admin identifier (e.g. mvps.admin or admin@mvps.edu.in)
      const matchedSchool =
        schools.find(
          (s) =>
            lowerAdmin.includes(s.code) ||
            lowerAdmin.includes(s.id) ||
            lowerAdmin.startsWith(s.code),
        ) || schools[0];

      switchSchool(matchedSchool.id);
      const loggedUser = login(
        "School Admin",
        {
          schoolCode: matchedSchool.code,
          username: lowerAdmin.includes("@")
            ? lowerAdmin.split("@")[0]
            : lowerAdmin,
          password,
        },
        matchedSchool,
      );

      showSuccess(`Signed in as Administrator for ${matchedSchool.name}`);
      navigate("/school/dashboard");
      return;
    }

    // Staff & Student logins
    const selectedSchool =
      schools.find((s) => s.code === schoolCode.toLowerCase().trim()) ||
      schools[0];
    switchSchool(selectedSchool.id);

    if (selectedRole === "Staff") {
      const loggedUser = login(
        "Staff",
        {
          schoolCode: selectedSchool.code,
          employeeId: employeeId.trim(),
          password,
        },
        selectedSchool,
      );
      showSuccess(`Signed in as ${loggedUser.name} (Faculty)`);
      navigate("/staff/dashboard");
      return;
    }

    if (selectedRole === "Student") {
      const loggedUser = login(
        "Student",
        {
          schoolCode: selectedSchool.code,
          admissionNumber: admissionNumber.trim(),
          password,
        },
        selectedSchool,
      );
      showSuccess(`Signed in as ${loggedUser.name} (Student)`);
      navigate("/student/dashboard");
      return;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl sm:rounded-4xl shadow-soft-lg border border-slate-100 dark:border-slate-800 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left Side: InstitutionERP Hero Branding Panel (Desktop) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-teal-400/20 blur-3xl pointer-events-none" />

          {/* Logo & Platform Name */}
          <div className="relative z-10">
            {/* <div className="flex items-center gap-3 mb-8">
              <InstitutionLogo className="w-12 h-12" />
              <div>
                <span className="font-black text-xl tracking-tight block">
                  mount<span className="text-emerald-300">vally</span>
                </span>
                <span className="text-xs text-emerald-100 font-mono tracking-wide">
                  Mount Valley.com
                </span>
              </div>
            </div> */}

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Integrated Educational Portal
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                Manage Your Institution, Smarter.
              </h2>
              <p className="text-sm text-emerald-100/90 leading-relaxed max-w-sm">
                One connected portal for institutional administration,
                academics, automated payroll, examination grading, and parent
                communications.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white dark:bg-slate-900">
          <div className="max-w-md w-full mx-auto space-y-6">
            {/* Top Logo & App Title */}
            <div className="flex items-center gap-3.5 pb-1">
              <InstitutionLogo className="w-11 h-11 shadow-sm" />
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  mount
                  <span className="text-emerald-600 dark:text-emerald-400">
                    vally
                  </span>
                </h1>
                <p className="text-xs text-slate-400 font-medium">
                  Portal Sign In &bull; Mount Valley
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-white">
                Sign In to Portal
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Select your account role and enter credentials to continue.
              </p>
            </div>

            {/* Role Selector Tabs: Institute Admin, Staff, Student */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Select Your Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((r) => {
                  const Icon = r.icon;
                  const isSelected = selectedRole === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => handleRoleChange(r.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all touch-press ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold shadow-xs ring-1 ring-emerald-500"
                          : "border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 mb-1.5 ${
                          isSelected
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-slate-400"
                        }`}
                      />
                      <span className="text-xs font-bold leading-tight">
                        {r.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 1. INSTITUTE ADMIN MODE: Admin Email / Username only (no Institution Code needed) */}
              {selectedRole === "Institute Admin" && (
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    Admin Email Address / Username
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="e.g. admin@Mount Valley.com or mvps.admin"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* 2. STAFF & STUDENT MODE: Institution Code */}
              {selectedRole !== "Institute Admin" && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Institution Code
                    </label>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
                      https://{schoolCode || "school"}.Mount Valley.com
                    </span>
                  </div>
                  <div className="relative">
                    <School className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={schoolCode}
                      onChange={(e) =>
                        setSchoolCode(e.target.value.toLowerCase())
                      }
                      placeholder="e.g. mvps, gfms, sis, abc"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white font-mono focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* STAFF Employee ID */}
              {selectedRole === "Staff" && (
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    Faculty / Staff Employee ID
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      placeholder="e.g. EMP001, STF001"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white font-mono focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* STUDENT Admission Number */}
              {selectedRole === "Student" && (
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    Student Admission Number
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={admissionNumber}
                      onChange={(e) => setAdmissionNumber(e.target.value)}
                      placeholder="e.g. DEMO-0001, MVPS-2026-002"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white font-mono focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                    onClick={() =>
                      showSuccess(
                        "Password reset link sent to your registered email.",
                      )
                    }
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between py-0.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-700"
                  />
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                    Remember my session
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 touch-press"
              >
                <span>Sign In to {selectedRole}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Demo Quick Hint */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-[11px] text-slate-400">
                Demo prefilled credentials active &bull; Click any role above to
                test instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

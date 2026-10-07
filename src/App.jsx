import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { SchoolProvider, useSchool } from './context/SchoolContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import { AppLayout } from './components/layout/AppLayout';
import { LoginPage } from './pages/auth/LoginPage';

// School Admin Pages
import { DashboardPage } from './pages/school/DashboardPage';
import { StudentsPage } from './pages/school/StudentsPage';
import { StudentDetailPage } from './pages/school/StudentDetailPage';
import { TeachersPage } from './pages/school/TeachersPage';
import { ApprovalsPage } from './pages/school/ApprovalsPage';
import { FinancePage } from './pages/school/FinancePage';
import { AttendancePage } from './pages/school/AttendancePage';
import { AcademicPage } from './pages/school/AcademicPage';
import { ExamsPage } from './pages/school/ExamsPage';
import { InvoicesPage } from './pages/school/InvoicesPage';
import { StaffManagementPage } from './pages/school/StaffManagementPage';
import { AIQuestionPaperPage } from './pages/school/AIQuestionPaperPage';
import { AnnouncementsCircularsPage } from './pages/school/AnnouncementsCircularsPage';
import { CalendarPage } from './pages/school/CalendarPage';
import { OperationsPage } from './pages/school/OperationsPage';
import { ReportsPage } from './pages/school/ReportsPage';
import { SettingsPage } from './pages/school/SettingsPage';

// Super Admin Pages
import { SuperAdminDashboardPage } from './pages/superadmin/SuperAdminDashboardPage';
import { SuperAdminSchoolsPage } from './pages/superadmin/SuperAdminSchoolsPage';
import { SuperAdminOnboardingPage } from './pages/superadmin/SuperAdminOnboardingPage';
import { SuperAdminSubscriptionsPage } from './pages/superadmin/SuperAdminSubscriptionsPage';

// Staff & Student Pages
import { StaffDashboardPage } from './pages/staff/StaffDashboardPage';
import { StudentDashboardPage } from './pages/student/StudentDashboardPage';
import { StudentFeesPage } from './pages/student/StudentFeesPage';

// Local subdomain simulator: /school/mvps, /school/abc, /school/gfms, /school/sis
function SchoolSubdomainSimulator() {
  const { schoolCode } = useParams();
  const { switchSchool } = useSchool();

  useEffect(() => {
    if (schoolCode) {
      switchSchool(schoolCode);
    }
  }, [schoolCode, switchSchool]);

  return <Navigate to="/school/dashboard" replace />;
}

export function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <SchoolProvider>
          <AuthProvider>
            <DataProvider>
              <BrowserRouter>
                <Routes>
                  {/* Public / Auth */}
                  <Route path="/login" element={<LoginPage />} />

                  {/* Local Subdomain Simulation routes */}
                  <Route path="/school/:schoolCode" element={<SchoolSubdomainSimulator />} />

                  {/* Authenticated Layout */}
                  <Route element={<AppLayout />}>
                    {/* Default Redirect */}
                    <Route path="/" element={<Navigate to="/school/dashboard" replace />} />

                    {/* School Admin Portal Routes */}
                    <Route path="/school/dashboard" element={<DashboardPage />} />
                    <Route path="/school/approvals" element={<ApprovalsPage />} />
                    <Route path="/school/students" element={<StudentsPage />} />
                    <Route path="/school/students/:id" element={<StudentDetailPage />} />
                    <Route path="/school/teachers" element={<TeachersPage />} />
                    <Route path="/school/teachers/:id" element={<TeachersPage />} />
                    <Route path="/school/academic" element={<AcademicPage />} />
                    <Route path="/school/attendance" element={<AttendancePage />} />
                    <Route path="/school/exams" element={<ExamsPage />} />
                    <Route path="/school/finance" element={<FinancePage />} />
                    <Route path="/school/finance/*" element={<FinancePage />} />
                    <Route path="/school/invoices" element={<InvoicesPage />} />
                    <Route path="/school/calendar" element={<CalendarPage />} />
                    <Route path="/school/announcements" element={<AnnouncementsCircularsPage />} />
                    <Route path="/school/circulars" element={<AnnouncementsCircularsPage />} />
                    <Route path="/school/gallery" element={<OperationsPage />} />
                    <Route path="/school/transport" element={<OperationsPage />} />
                    <Route path="/school/inventory" element={<OperationsPage />} />
                    <Route path="/school/staff-attendance" element={<StaffManagementPage />} />
                    <Route path="/school/staff-leaves" element={<StaffManagementPage />} />
                    <Route path="/school/payroll" element={<StaffManagementPage />} />
                    <Route path="/school/substitutions" element={<StaffManagementPage />} />
                    <Route path="/school/ai-question-paper" element={<AIQuestionPaperPage />} />
                    <Route path="/school/reports" element={<ReportsPage />} />
                    <Route path="/school/settings" element={<SettingsPage />} />

                    {/* Super Admin Routes */}
                    <Route path="/super-admin/dashboard" element={<SuperAdminDashboardPage />} />
                    <Route path="/super-admin/schools" element={<SuperAdminSchoolsPage />} />
                    <Route path="/super-admin/schools/new" element={<SuperAdminOnboardingPage />} />
                    <Route path="/super-admin/subscriptions" element={<SuperAdminSubscriptionsPage />} />
                    <Route path="/super-admin/reports" element={<ReportsPage />} />
                    <Route path="/super-admin/settings" element={<SettingsPage />} />

                    {/* Staff Portal Routes */}
                    <Route path="/staff/dashboard" element={<StaffDashboardPage />} />
                    <Route path="/staff/students" element={<StudentsPage />} />
                    <Route path="/staff/attendance" element={<AttendancePage />} />
                    <Route path="/staff/homework" element={<AcademicPage />} />
                    <Route path="/staff/exams" element={<ExamsPage />} />
                    <Route path="/staff/timetable" element={<AcademicPage />} />
                    <Route path="/staff/announcements" element={<AnnouncementsCircularsPage />} />
                    <Route path="/staff/calendar" element={<CalendarPage />} />
                    <Route path="/staff/leaves" element={<StaffManagementPage />} />
                    <Route path="/staff/profile" element={<SettingsPage />} />

                    {/* Student Portal Routes */}
                    <Route path="/student/dashboard" element={<StudentDashboardPage />} />
                    <Route path="/student/profile" element={<StudentDetailPage />} />
                    <Route path="/student/classes" element={<AcademicPage />} />
                    <Route path="/student/timetable" element={<AcademicPage />} />
                    <Route path="/student/attendance" element={<AttendancePage />} />
                    <Route path="/student/homework" element={<AcademicPage />} />
                    <Route path="/student/exams" element={<ExamsPage />} />
                    <Route path="/student/results" element={<ExamsPage />} />
                    <Route path="/student/fees" element={<StudentFeesPage />} />
                    <Route path="/student/calendar" element={<CalendarPage />} />
                    <Route path="/student/announcements" element={<AnnouncementsCircularsPage />} />
                    <Route path="/student/circulars" element={<AnnouncementsCircularsPage />} />
                  </Route>

                  {/* Catch-all */}
                  <Route path="*" element={<Navigate to="/school/dashboard" replace />} />
                </Routes>
              </BrowserRouter>
            </DataProvider>
          </AuthProvider>
        </SchoolProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;

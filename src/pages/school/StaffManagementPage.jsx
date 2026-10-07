import React, { useState } from 'react';
import {
  UserCheck,
  CalendarOff,
  CreditCard,
  ArrowLeftRight,
  Plus,
  CheckCircle2,
  XCircle,
  Eye,
  Printer,
  FileText,
  Calendar,
  Download,
  Building2,
  Filter,
  DollarSign,
  Check,
  Clock,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Tabs } from '../../components/common/Tabs';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export function StaffManagementPage() {
  const {
    staffMembers,
    leaves,
    processLeave,
    substitutions,
    addSubstitution,
  } = useData();
  const { showSuccess, showError } = useToast();

  const [activeTab, setActiveTab] = useState('StaffAttendance');
  const [selectedPayslipStaff, setSelectedPayslipStaff] = useState(null);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [selectedSalaryMonth, setSelectedSalaryMonth] = useState('September 2026');

  const payrollMonths = [
    { month: 'September 2026', payDate: '30 Sep 2026', status: 'Paid', totalDisbursed: '₹3,84,500' },
    { month: 'August 2026', payDate: '31 Aug 2026', status: 'Paid', totalDisbursed: '₹3,84,500' },
    { month: 'July 2026', payDate: '31 Jul 2026', status: 'Paid', totalDisbursed: '₹3,78,000' },
    { month: 'June 2026', payDate: '30 Jun 2026', status: 'Paid', totalDisbursed: '₹3,78,000' },
    { month: 'May 2026', payDate: '31 May 2026', status: 'Paid', totalDisbursed: '₹3,72,500' },
    { month: 'April 2026', payDate: '30 Apr 2026', status: 'Paid', totalDisbursed: '₹3,72,500' },
  ];

  const activeMonthData = payrollMonths.find(m => m.month === selectedSalaryMonth) || payrollMonths[0];

  const [subFormData, setSubFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    period: 'Period 2 (09:15 - 10:00)',
    class: 'Grade 3 - Primrose-A',
    subject: 'Environmental Studies',
    originalTeacher: 'Rajeshwari Natarajan',
    substituteTeacher: 'Arun Varghese',
    room: 'Room 104',
  });

  const staffTabs = [
    { id: 'StaffAttendance', label: 'Staff Attendance' },
    { id: 'StaffLeaves', label: 'Leave Applications', count: leaves.filter(l => l.status === 'Pending').length },
    { id: 'Payroll', label: 'Payroll & Monthly Salary' },
    { id: 'Substitutions', label: 'Substitutions' },
  ];

  const handleCreateSubstitution = (e) => {
    e.preventDefault();
    addSubstitution(subFormData);
    showSuccess(`Substitution assigned to ${subFormData.substituteTeacher}.`);
    setIsSubModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Staff Operations & Payroll"
        subtitle="Daily staff attendance, leave approval pipeline, monthly salary disbursements, and substitutions"
        showAccent={true}
      />

      <Tabs tabs={staffTabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* TAB 1: STAFF ATTENDANCE */}
      {activeTab === 'StaffAttendance' && (
        <div className="bg-white dark:bg-slate-850 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-soft overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase">
                  <th className="p-3.5">Employee</th>
                  <th className="p-3.5">Employee ID</th>
                  <th className="p-3.5">Department</th>
                  <th className="p-3.5">Designation</th>
                  <th className="p-3.5">Check In</th>
                  <th className="p-3.5">Check Out</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {staffMembers.map((stf) => (
                  <tr key={stf.id} className="hover:bg-slate-50/60">
                    <td className="p-3.5 font-bold text-slate-800 dark:text-white">{stf.name}</td>
                    <td className="p-3.5 font-mono text-slate-400">{stf.employeeId}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{stf.department}</td>
                    <td className="p-3.5 text-slate-500">{stf.designation}</td>
                    <td className="p-3.5 font-mono font-semibold text-teal-600">{stf.checkIn}</td>
                    <td className="p-3.5 font-mono text-slate-400">{stf.checkOut}</td>
                    <td className="p-3.5">
                      <Badge variant={stf.status === 'Present' ? 'active' : 'pending'} size="sm">
                        {stf.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: STAFF LEAVES */}
      {activeTab === 'StaffLeaves' && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {leaves.map((l) => (
              <div key={l.id} className="p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="purple" size="sm">{l.leaveType} Leave</Badge>
                    <Badge variant={l.status === 'Approved' ? 'active' : l.status === 'Rejected' ? 'danger' : 'pending'} size="sm">
                      {l.status}
                    </Badge>
                  </div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white">{l.applicantName}</h4>
                  <p className="text-xs text-slate-400 font-mono mb-2">{l.employeeId} &bull; {l.days} Days ({l.startDate} to {l.endDate})</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">{l.reason}</p>
                </div>
                {l.status === 'Pending' && (
                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                    <button
                      onClick={() => { processLeave(l.id, 'Rejected'); showError('Leave application rejected.'); }}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 font-bold text-xs"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => { processLeave(l.id, 'Approved'); showSuccess('Leave approved and substitution notified.'); }}
                      className="px-3.5 py-1.5 rounded-xl bg-teal-600 text-white font-bold text-xs shadow-sm"
                    >
                      Approve
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MONTHLY PAYROLL & SALARY */}
      {activeTab === 'Payroll' && (
        <div className="space-y-5 animate-fade-in">
          {/* Monthly Payroll Summary & Month Selector Banner */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    Monthly Salary Disbursement Cycle
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  Salary Disbursed for: <span className="text-teal-600 dark:text-teal-400">{selectedSalaryMonth}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Payment frequency is processed <strong>monthly</strong> on the last working day via Direct Bank NEFT transfer.
                </p>
              </div>

              {/* Month Selector Dropdown */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Select Month:</span>
                </div>
                <select
                  value={selectedSalaryMonth}
                  onChange={(e) => {
                    setSelectedSalaryMonth(e.target.value);
                    showSuccess(`Switched payroll view to ${e.target.value}`);
                  }}
                  className="px-3.5 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {payrollMonths.map((m) => (
                    <option key={m.month} value={m.month}>
                      {m.month} ({m.status})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Metrics for the Selected Month */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/50">
                <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400 block mb-1">Salary Month</span>
                <p className="text-sm sm:text-base font-extrabold text-teal-900 dark:text-teal-200">{selectedSalaryMonth}</p>
                <p className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">Monthly Cycle (30 Days)</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50">
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 block mb-1">Disbursement Date</span>
                <p className="text-sm sm:text-base font-extrabold text-emerald-900 dark:text-emerald-200">{activeMonthData.payDate}</p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Paid via Bank NEFT</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/50">
                <span className="text-[11px] font-bold text-sky-700 dark:text-sky-400 block mb-1">Total Monthly Disbursed</span>
                <p className="text-sm sm:text-base font-mono font-extrabold text-sky-900 dark:text-sky-200">{activeMonthData.totalDisbursed}</p>
                <p className="text-[10px] text-sky-600 dark:text-sky-400 font-medium">{staffMembers.length} Staff Members Paid</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/50 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 block mb-1">Payment Status</span>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-200">100% Processed</span>
                  </div>
                </div>
                <button
                  onClick={() => showSuccess(`Bank payment statement for ${selectedSalaryMonth} downloaded.`)}
                  className="text-[11px] font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 mt-1 text-left"
                >
                  <Download className="w-3 h-3" />
                  <span>Download Bank Sheet</span>
                </button>
              </div>
            </div>
          </div>

          {/* Monthly Salary Table */}
          <div className="bg-white dark:bg-slate-850 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-soft overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-800 dark:text-white">
                  Monthly Salary Register &bull; {selectedSalaryMonth}
                </h4>
                <p className="text-xs text-slate-400">
                  Individual staff breakdown of monthly basic pay, allowances, PF deductions, and net disbursed salary.
                </p>
              </div>
              <Badge variant="teal" size="sm">
                Paid Monthly
              </Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase">
                    <th className="p-3.5">Employee</th>
                    <th className="p-3.5">Salary Month</th>
                    <th className="p-3.5">Basic Salary</th>
                    <th className="p-3.5">Allowances</th>
                    <th className="p-3.5">Deductions</th>
                    <th className="p-3.5">Net Disbursed</th>
                    <th className="p-3.5">Payment Date &amp; Mode</th>
                    <th className="p-3.5 text-right">Monthly Payslip</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {staffMembers.map((stf) => (
                    <tr key={stf.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-3.5">
                        <div className="font-bold text-slate-800 dark:text-white">{stf.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{stf.employeeId} &bull; {stf.department}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 font-bold text-xs">
                          {selectedSalaryMonth}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono">₹{stf.basicSalary.toLocaleString()}</td>
                      <td className="p-3.5 font-mono text-emerald-600">+₹{stf.allowances.toLocaleString()}</td>
                      <td className="p-3.5 font-mono text-rose-500">-₹{stf.deductions.toLocaleString()}</td>
                      <td className="p-3.5 font-mono font-extrabold text-teal-600">
                        ₹{stf.netSalary.toLocaleString()}
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{activeMonthData.payDate}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 block">Bank NEFT Credit</span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => setSelectedPayslipStaff({ ...stf, month: selectedSalaryMonth, payDate: activeMonthData.payDate })}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 ml-auto touch-press text-slate-700 dark:text-slate-200"
                        >
                          <FileText className="w-3.5 h-3.5 text-teal-600" />
                          <span>View Payslip</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SUBSTITUTIONS */}
      {activeTab === 'Substitutions' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex justify-end">
            <button
              onClick={() => setIsSubModalOpen(true)}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm touch-press"
            >
              <Plus className="w-4 h-4" />
              <span>Assign Substitution</span>
            </button>
          </div>
          <div className="bg-white dark:bg-slate-850 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase">
                    <th className="p-3.5">Date &amp; Period</th>
                    <th className="p-3.5">Class</th>
                    <th className="p-3.5">Subject</th>
                    <th className="p-3.5">Absent Faculty</th>
                    <th className="p-3.5">Substitute Assigned</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {substitutions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-semibold text-slate-800 dark:text-white">{sub.date} &bull; {sub.period}</td>
                      <td className="p-3.5">{sub.class}</td>
                      <td className="p-3.5 font-semibold text-teal-600">{sub.subject}</td>
                      <td className="p-3.5 text-rose-600 font-medium">{sub.originalTeacher}</td>
                      <td className="p-3.5 text-emerald-600 font-bold">{sub.substituteTeacher}</td>
                      <td className="p-3.5"><Badge variant="active" size="sm">{sub.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Monthly Payslip Modal */}
      {selectedPayslipStaff && (
        <Modal
          isOpen={!!selectedPayslipStaff}
          onClose={() => setSelectedPayslipStaff(null)}
          title={`Monthly Salary Payslip - ${selectedPayslipStaff.name}`}
          maxWidth="max-w-md"
        >
          <div className="p-5 border rounded-3xl space-y-4 text-xs bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            {/* School & Month Header */}
            <div className="text-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-white uppercase tracking-tight">
                Mount Valley Public School
              </h3>
              <p className="text-slate-400 text-[11px]">42 Pine Valley Road, Coimbatore, Tamil Nadu</p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-extrabold text-xs">
                <span>Monthly Salary Payslip:</span>
                <span>{selectedPayslipStaff.month || selectedSalaryMonth}</span>
              </div>
            </div>

            {/* Employee Info Matrix */}
            <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-850 p-3 rounded-2xl">
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold uppercase">Employee Name</span>
                <p className="font-bold text-slate-800 dark:text-white">{selectedPayslipStaff.name}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold uppercase">Employee ID</span>
                <p className="font-mono font-bold text-slate-800 dark:text-white">{selectedPayslipStaff.employeeId}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold uppercase">Department</span>
                <p className="font-semibold text-slate-700 dark:text-slate-200">{selectedPayslipStaff.department}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold uppercase">Salary Month</span>
                <p className="font-bold text-teal-600 dark:text-teal-400">{selectedPayslipStaff.month || selectedSalaryMonth}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold uppercase">Payment Mode</span>
                <p className="font-semibold text-slate-700 dark:text-slate-200">Bank NEFT Direct</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold uppercase">Disbursed On</span>
                <p className="font-mono font-semibold text-emerald-600">{selectedPayslipStaff.payDate || activeMonthData.payDate}</p>
              </div>
            </div>

            {/* Earnings and Deductions Table */}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                <span>Monthly Basic Salary:</span>
                <span className="font-mono font-bold">₹{selectedPayslipStaff.basicSalary.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400">
                <span>Dearness &amp; Special Allowances:</span>
                <span className="font-mono font-bold">+₹{selectedPayslipStaff.allowances.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-rose-600 dark:text-rose-400">
                <span>Provident Fund (PF) &amp; Tax Deductions:</span>
                <span className="font-mono font-bold">-₹{selectedPayslipStaff.deductions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-200 dark:border-slate-700 pt-2 font-black text-sm text-teal-700 dark:text-teal-300">
                <span>Net Monthly Disbursed Salary:</span>
                <span className="font-mono text-base">₹{selectedPayslipStaff.netSalary.toLocaleString()}</span>
              </div>
            </div>

            {/* Signature & Print Action */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400">Status: <strong className="text-emerald-600">Disbursed (Verified)</strong></span>
              <button
                onClick={() => { showSuccess(`Printing ${selectedSalaryMonth} payslip for ${selectedPayslipStaff.name}...`); window.print(); }}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm touch-press"
              >
                <Printer className="w-4 h-4" />
                <span>Print Payslip</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Substitution Modal */}
      <Modal
        isOpen={isSubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
        title="Assign Faculty Substitution"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleCreateSubstitution} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Absent Teacher</label>
            <input
              type="text"
              required
              value={subFormData.originalTeacher}
              onChange={(e) => setSubFormData({ ...subFormData, originalTeacher: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Substitute Teacher</label>
            <input
              type="text"
              required
              value={subFormData.substituteTeacher}
              onChange={(e) => setSubFormData({ ...subFormData, substituteTeacher: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Class</label>
              <input
                type="text"
                required
                value={subFormData.class}
                onChange={(e) => setSubFormData({ ...subFormData, class: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Subject</label>
              <input
                type="text"
                required
                value={subFormData.subject}
                onChange={(e) => setSubFormData({ ...subFormData, subject: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t">
            <button type="button" onClick={() => setIsSubModalOpen(false)} className="px-4 py-2 text-xs text-slate-500">Cancel</button>
            <button type="submit" className="px-5 py-2 bg-teal-600 text-white font-bold text-xs rounded-xl">Assign</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

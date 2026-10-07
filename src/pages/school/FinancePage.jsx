import React, { useState } from 'react';
import {
  Wallet,
  Receipt,
  FileCheck,
  CreditCard,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Eye,
  Send,
  Plus,
  RefreshCw,
  FileSpreadsheet,
  Layers,
  AlertTriangle,
  RotateCw,
  Download,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Tabs } from '../../components/common/Tabs';
import { Badge } from '../../components/common/Badge';
import { ErrorState } from '../../components/common/ErrorState';
import { Modal } from '../../components/common/Modal';

export function FinancePage() {
  const {
    students,
    paymentProofs,
    processPaymentProof,
    feeStructure,
    invoices,
  } = useData();
  const { showSuccess, showError, showInfo } = useToast();

  const [activeTab, setActiveTab] = useState('Defaulters');
  const [searchQuery, setSearchQuery] = useState('');
  const [simulateError, setSimulateError] = useState(false);
  const [selectedProof, setSelectedProof] = useState(null);
  const [isAddFeeModalOpen, setIsAddFeeModalOpen] = useState(false);

  // Tabs matching reference Image 2
  const financeTabs = [
    { id: 'Defaulters', label: 'Defaulters', count: students.filter(s => s.pendingFee > 0).length },
    { id: 'Verify Proofs', label: 'Verify Proofs', count: paymentProofs.filter(p => p.status === 'Pending').length },
    { id: 'Fee Structure', label: 'Fee Structure' },
    { id: 'Categories', label: 'Categories' },
    { id: 'Invoices', label: 'Invoices' },
  ];

  const defaultersList = students.filter(s => s.pendingFee > 0);

  const handleVerifyProof = (id) => {
    processPaymentProof(id, 'Verified');
    showSuccess('Payment proof verified and receipt generated.');
    setSelectedProof(null);
  };

  const handleRejectProof = (id) => {
    processPaymentProof(id, 'Rejected');
    showError('Payment proof rejected. Notification sent to student.');
    setSelectedProof(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Finance & Fees"
        subtitle="Manage fee collections, defaulters ledger, and payment proof verifications"
        showAccent={true}
        action={
          <div className="flex items-center gap-2">
            {/* Simulation toggle button for reference error state */}
            <button
              onClick={() => setSimulateError(!simulateError)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
                simulateError
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {simulateError ? 'Reset Connection' : 'Simulate Offline State'}
            </button>
            <button
              onClick={() => showSuccess('Fee ledger exported to Excel successfully.')}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors flex items-center gap-1.5 touch-press"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        }
      />

      {/* Tabs Container matching reference Image 2 */}
      <Tabs
        tabs={financeTabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* When simulateError is true, display Connection trouble ErrorState matching Image 2 */}
      {simulateError ? (
        <ErrorState
          title="Connection trouble"
          subtitle="Could not load finance data"
          onRetry={() => {
            setSimulateError(false);
            showSuccess('Connection restored successfully.');
          }}
          retryLabel="Retry Connection"
        />
      ) : (
        <>
          {/* TAB 1: DEFAULTERS (matching Image 2 default view) */}
          {activeTab === 'Defaulters' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search defaulter by name or class..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
                  />
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Total Outstanding Dues: <span className="font-bold text-rose-600">₹{defaultersList.reduce((acc, s) => acc + (s.pendingFee || 0), 0).toLocaleString()}</span>
                </div>
              </div>

              {/* Defaulters Table / List */}
              <div className="bg-white dark:bg-slate-850 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-soft overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        <th className="py-3.5 px-4">Student</th>
                        <th className="py-3.5 px-4">Class</th>
                        <th className="py-3.5 px-4">Fee Category</th>
                        <th className="py-3.5 px-4">Total Fee</th>
                        <th className="py-3.5 px-4">Paid</th>
                        <th className="py-3.5 px-4">Pending Dues</th>
                        <th className="py-3.5 px-4">Due Date</th>
                        <th className="py-3.5 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {defaultersList.map((student) => (
                        <tr key={student.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="py-3.5 px-4">
                            <div>
                              <p className="font-bold text-slate-800 dark:text-white">{student.name}</p>
                              <p className="text-[11px] font-mono text-slate-400">{student.admissionNumber}</p>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">{student.class} - {student.section}</td>
                          <td className="py-3.5 px-4 text-slate-500">{student.feeType || 'Tuition Fee - Term 2'}</td>
                          <td className="py-3.5 px-4 font-mono font-medium">₹{student.totalFee.toLocaleString()}</td>
                          <td className="py-3.5 px-4 font-mono text-emerald-600 font-semibold">₹{student.paidFee.toLocaleString()}</td>
                          <td className="py-3.5 px-4 font-mono font-bold text-rose-600">₹{student.pendingFee.toLocaleString()}</td>
                          <td className="py-3.5 px-4 text-slate-500">{student.dueDate || '2026-10-15'}</td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => showSuccess(`Payment reminder SMS & Email sent to ${student.name}'s parent.`)}
                              className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 hover:bg-amber-100 font-bold text-xs flex items-center gap-1.5 ml-auto touch-press"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Remind</span>
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

          {/* TAB 2: VERIFY PROOFS */}
          {activeTab === 'Verify Proofs' && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paymentProofs.map((proof) => (
                  <div
                    key={proof.id}
                    className="p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 font-mono">{proof.id}</span>
                        <Badge variant={proof.status === 'Verified' ? 'active' : proof.status === 'Rejected' ? 'danger' : 'pending'} size="sm">
                          {proof.status}
                        </Badge>
                      </div>

                      <div>
                        <h4 className="font-bold text-base text-slate-800 dark:text-white">{proof.studentName}</h4>
                        <p className="text-xs text-slate-400 font-mono">{proof.admissionNumber} &bull; {proof.class}</p>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Amount Paid:</span>
                          <span className="font-extrabold text-teal-600 font-mono text-sm">₹{proof.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Payment Mode:</span>
                          <span className="font-semibold text-slate-700 dark:text-slate-200">{proof.paymentMethod}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Transaction ID:</span>
                          <span className="font-mono text-[11px] text-slate-600 dark:text-slate-300">{proof.transactionId}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setSelectedProof(proof)}
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Inspect Receipt</span>
                      </button>

                      {proof.status === 'Pending' && (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleRejectProof(proof.id)}
                            className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/40"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleVerifyProof(proof.id)}
                            className="px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm touch-press"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Verify</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FEE STRUCTURE */}
          {activeTab === 'Fee Structure' && (
            <div className="bg-white dark:bg-slate-850 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-soft overflow-hidden animate-fade-in">
              <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-800 dark:text-white">Academic Year 2026–27 Fee Master</h3>
                  <p className="text-xs text-slate-400">Class group fee schedules and installment allocations</p>
                </div>
                <button
                  onClick={() => setIsAddFeeModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Fee Head</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-3.5 px-4">Class Group</th>
                      <th className="py-3.5 px-4">Fee Head</th>
                      <th className="py-3.5 px-4">Annual Amount</th>
                      <th className="py-3.5 px-4">Frequency</th>
                      <th className="py-3.5 px-4">Academic Year</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {feeStructure.map((fs) => (
                      <tr key={fs.id} className="hover:bg-slate-50/60">
                        <td className="py-3.5 px-4 font-bold text-slate-800 dark:text-white">{fs.classGroup}</td>
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">{fs.feeType}</td>
                        <td className="py-3.5 px-4 font-mono font-bold text-teal-600">₹{fs.amount.toLocaleString()}</td>
                        <td className="py-3.5 px-4 text-slate-500">{fs.frequency}</td>
                        <td className="py-3.5 px-4 text-slate-400">{fs.academicYear}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: CATEGORIES */}
          {activeTab === 'Categories' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
              {['Tuition Fee', 'Admission & Registration', 'Transport & Route Fee', 'Examination & Lab Fee', 'Library & Learning Media', 'Extracurricular & Sports'].map((cat, idx) => (
                <div key={cat} className="p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800 dark:text-white">{cat}</h4>
                      <span className="text-[11px] text-emerald-600 font-semibold">Active Category</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Automated ledger mapping and monthly reconciliation configured.
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: INVOICES */}
          {activeTab === 'Invoices' && (
            <div className="bg-white dark:bg-slate-850 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-soft overflow-hidden animate-fade-in">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-3.5 px-4">Invoice #</th>
                      <th className="py-3.5 px-4">Student</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Amount</th>
                      <th className="py-3.5 px-4">Issue Date</th>
                      <th className="py-3.5 px-4">Due Date</th>
                      <th className="py-3.5 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50/60">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-800 dark:text-white">{inv.invoiceNumber}</td>
                        <td className="py-3.5 px-4 font-medium">{inv.studentName}</td>
                        <td className="py-3.5 px-4 text-slate-500">{inv.category}</td>
                        <td className="py-3.5 px-4 font-mono font-bold text-teal-600">₹{inv.amount.toLocaleString()}</td>
                        <td className="py-3.5 px-4 text-slate-400">{inv.issueDate}</td>
                        <td className="py-3.5 px-4 text-slate-400">{inv.dueDate}</td>
                        <td className="py-3.5 px-4">
                          <Badge variant={inv.status === 'Paid' ? 'active' : inv.status === 'Overdue' ? 'danger' : 'pending'} size="sm">
                            {inv.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Floating Action Button matching Image 2 "Generate" in green/teal */}
      <div className="fixed bottom-20 right-5 z-40 lg:hidden">
        <button
          onClick={() => showSuccess('Generating batch fee bills and invoice drafts...')}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-soft-lg transition-all touch-press active:scale-95"
        >
          <Receipt className="w-5 h-5" />
          <span>Generate</span>
        </button>
      </div>

      {/* Payment Proof Receipt Modal */}
      {selectedProof && (
        <Modal
          isOpen={!!selectedProof}
          onClose={() => setSelectedProof(null)}
          title={`Payment Proof - ${selectedProof.studentName}`}
          maxWidth="max-w-lg"
        >
          <div className="space-y-4">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-1 text-xs">
              <div className="flex justify-between"><span className="text-slate-400">Admission No:</span><span className="font-mono font-bold">{selectedProof.admissionNumber}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Transaction ID:</span><span className="font-mono font-bold text-teal-600">{selectedProof.transactionId}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Amount:</span><span className="font-bold text-sm">₹{selectedProof.amount.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Date:</span><span>{selectedProof.submittedDate}</span></div>
            </div>

            <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
              <img
                src={selectedProof.proofImage}
                alt="Bank slip proof"
                className="w-full h-48 object-cover"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => handleRejectProof(selectedProof.id)}
                className="px-4 py-2 rounded-xl bg-rose-50 text-rose-600 font-bold text-xs hover:bg-rose-100"
              >
                Reject Proof
              </button>
              <button
                onClick={() => handleVerifyProof(selectedProof.id)}
                className="px-5 py-2 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 shadow-sm"
              >
                Verify &amp; Accept
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

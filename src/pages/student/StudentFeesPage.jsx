import React, { useState } from 'react';
import {
  Wallet,
  Receipt,
  FileCheck,
  CreditCard,
  Download,
  Printer,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  UploadCloud,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { Tabs } from '../../components/common/Tabs';
import { Modal } from '../../components/common/Modal';

export function StudentFeesPage() {
  const { user } = useAuth();
  const { students, invoices, paymentProofs, addPaymentProof } = useData();
  const { showSuccess } = useToast();

  const [activeTab, setActiveTab] = useState('Invoices');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Find currently logged-in student record
  const currentAdmissionNo = user?.admissionNumber || user?.username || 'DEMO-0001';
  const currentStudent = students.find(
    s => s.admissionNumber === currentAdmissionNo || s.name === user?.name
  ) || students[0] || {
    name: user?.name || 'Student',
    admissionNumber: currentAdmissionNo,
    class: user?.class || 'Grade 10',
    section: user?.section || 'A',
    totalFee: 48000,
    paidFee: 48000,
    pendingFee: 0,
    feeStatus: 'Paid',
    dueDate: '2026-10-25'
  };

  // Strictly filter records for ONLY the logged-in student
  const studentInvoices = invoices.filter(
    inv => inv.admissionNumber === currentStudent.admissionNumber ||
           inv.studentName?.toLowerCase() === currentStudent.name?.toLowerCase() ||
           (inv.studentName === 'Demo Child' && currentStudent.admissionNumber === 'DEMO-0001')
  );

  const studentProofs = paymentProofs.filter(
    p => p.admissionNumber === currentStudent.admissionNumber ||
         p.studentName?.toLowerCase() === currentStudent.name?.toLowerCase()
  );

  const feeTabs = [
    { id: 'Invoices', label: 'My Invoices', count: studentInvoices.length },
    { id: 'Receipts', label: 'Payment Receipts', count: studentProofs.length },
    { id: 'Breakdown', label: 'Fee Structure Breakdown' },
  ];

  // Fee breakdown schedule specific to student's grade
  const classFeeBreakdown = [
    { head: 'Tuition & Academic Term Fee', term: 'Term 1 & Term 2', amount: Math.round(currentStudent.totalFee * 0.6), status: 'Paid' },
    { head: 'Computer & Science Lab Maintenance', term: 'Annual Session', amount: Math.round(currentStudent.totalFee * 0.15), status: 'Paid' },
    { head: 'Library & Digital Media Access', term: 'Annual Session', amount: Math.round(currentStudent.totalFee * 0.1), status: 'Paid' },
    { head: 'Sports, Extracurricular & Activity', term: 'Annual Session', amount: Math.round(currentStudent.totalFee * 0.15), status: currentStudent.pendingFee > 0 ? 'Pending' : 'Paid' },
  ];

  const handlePayOnline = (e) => {
    e.preventDefault();
    showSuccess(`Fee payment processed successfully for ${currentStudent.name}. Official digital receipt generated.`);
    setIsPayModalOpen(false);
  };

  const handleUploadProof = (e) => {
    e.preventDefault();
    addPaymentProof({
      studentName: currentStudent.name,
      admissionNumber: currentStudent.admissionNumber,
      class: `${currentStudent.class}-${currentStudent.section}`,
      amount: currentStudent.pendingFee > 0 ? currentStudent.pendingFee : 24000,
      paymentMethod: 'Bank Transfer / Slip',
      transactionId: `TXN${Date.now().toString().slice(-6)}`,
      proofImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=60',
    });
    showSuccess('Payment slip submitted to accounts department for verification.');
    setIsUploadModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Student Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-brand-600 rounded-3xl p-5 sm:p-7 text-white shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs">
              Student Fee Portal
            </span>
            <span className="text-xs text-teal-100 font-mono font-semibold">
              {currentStudent.admissionNumber}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Fee Summary &amp; Billing - {currentStudent.name}
          </h1>
          <p className="text-xs sm:text-sm text-teal-100 mt-1">
            {currentStudent.class} &bull; Section {currentStudent.section} &bull; Academic Year 2026–2027
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-3.5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Slip</span>
          </button>
          <button
            onClick={() => setIsPayModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-white text-teal-800 font-bold text-xs sm:text-sm hover:bg-teal-50 transition-all shadow-sm flex items-center gap-1.5 touch-press"
          >
            <Wallet className="w-4 h-4 text-teal-600" />
            <span>Pay Dues Online</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <StatCard
          title="Total Academic Fee"
          value={`₹${currentStudent.totalFee.toLocaleString()}`}
          subtitle="Full Annual Schedule"
          icon={Wallet}
          iconColor="text-brand-500"
          iconBg="bg-brand-50 dark:bg-brand-950/40"
        />
        <StatCard
          title="Amount Paid"
          value={`₹${currentStudent.paidFee.toLocaleString()}`}
          subtitle="Verified by Accounts"
          icon={CheckCircle2}
          iconColor="text-emerald-500"
          iconBg="bg-emerald-50 dark:bg-emerald-950/40"
          trend="Receipts Active"
          trendPositive={true}
        />
        <StatCard
          title="Outstanding Dues"
          value={`₹${currentStudent.pendingFee.toLocaleString()}`}
          subtitle={currentStudent.pendingFee > 0 ? `Due by ${currentStudent.dueDate || '15 Oct 2026'}` : 'Zero Balance'}
          icon={Receipt}
          iconColor={currentStudent.pendingFee > 0 ? 'text-rose-500' : 'text-emerald-500'}
          iconBg={currentStudent.pendingFee > 0 ? 'bg-rose-50 dark:bg-rose-950/40' : 'bg-emerald-50 dark:bg-emerald-950/40'}
        />
        <StatCard
          title="Clearance Status"
          value={currentStudent.feeStatus === 'Paid' ? 'Clear' : 'Pending'}
          subtitle={currentStudent.feeStatus === 'Paid' ? 'Term 2 Cleared' : 'Installment Due'}
          icon={ShieldCheck}
          iconColor="text-teal-600"
          iconBg="bg-teal-50 dark:bg-teal-950/40"
        />
      </div>

      {/* Tabs */}
      <Tabs
        tabs={feeTabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* TAB 1: INVOICES */}
      {activeTab === 'Invoices' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-850 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-soft overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-slate-800 dark:text-white">Fee Invoices &amp; Bills</h3>
                <p className="text-xs text-slate-400">Official fee demand notes generated for your student account</p>
              </div>
              <Badge variant="teal" size="sm">{studentInvoices.length} Bills</Badge>
            </div>

            {studentInvoices.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs sm:text-sm">
                No unpaid invoice demands found for your student profile.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-3.5 px-4">Invoice #</th>
                      <th className="py-3.5 px-4">Fee Category</th>
                      <th className="py-3.5 px-4">Amount</th>
                      <th className="py-3.5 px-4">Issue Date</th>
                      <th className="py-3.5 px-4">Due Date</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Receipt / Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {studentInvoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-800 dark:text-white">{inv.invoiceNumber}</td>
                        <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-200">{inv.category}</td>
                        <td className="py-3.5 px-4 font-mono font-bold text-teal-600">₹{inv.amount.toLocaleString()}</td>
                        <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">{inv.issueDate}</td>
                        <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">{inv.dueDate}</td>
                        <td className="py-3.5 px-4">
                          <Badge variant={inv.status === 'Paid' ? 'active' : inv.status === 'Overdue' ? 'danger' : 'pending'} size="sm">
                            {inv.status}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setSelectedInvoice(inv)}
                            className="px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 hover:bg-teal-100 font-bold text-xs inline-flex items-center gap-1.5 transition-colors touch-press"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Bill</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: RECEIPTS */}
      {activeTab === 'Receipts' && (
        <div className="space-y-4 animate-fade-in">
          {studentProofs.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-slate-850 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-soft text-slate-400 text-xs sm:text-sm">
              <FileCheck className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
              <p className="font-bold text-slate-700 dark:text-slate-300">No Payment Slips Uploaded Yet</p>
              <p className="text-xs text-slate-400 mt-1">When you make offline payments or bank deposits, upload proof slips here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {studentProofs.map((proof) => (
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

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Amount:</span>
                        <span className="font-extrabold text-teal-600 font-mono text-sm">₹{proof.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Payment Mode:</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-200">{proof.paymentMethod}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Transaction Ref:</span>
                        <span className="font-mono text-[11px] text-slate-600 dark:text-slate-300">{proof.transactionId}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>Submitted: {proof.submittedDate || 'Today'}</span>
                    <span className="font-bold text-teal-600">{proof.status === 'Verified' ? 'Official Receipt Available' : 'Under Review'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: BREAKDOWN */}
      {activeTab === 'Breakdown' && (
        <div className="bg-white dark:bg-slate-850 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-soft overflow-hidden animate-fade-in">
          <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-800 dark:text-white">Fee Breakdown For {currentStudent.class}</h3>
              <p className="text-xs text-slate-400">Institutional head allocation for academic year 2026–2027</p>
            </div>
            <Badge variant="pro" size="sm">{currentStudent.class}</Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Fee Head</th>
                  <th className="py-3.5 px-4">Frequency / Term</th>
                  <th className="py-3.5 px-4">Allocated Amount</th>
                  <th className="py-3.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {classFeeBreakdown.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-4 font-bold text-slate-800 dark:text-white">{item.head}</td>
                    <td className="py-3.5 px-4 text-slate-500">{item.term}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-teal-600">₹{item.amount.toLocaleString()}</td>
                    <td className="py-3.5 px-4">
                      <Badge variant={item.status === 'Paid' ? 'active' : 'pending'} size="sm">
                        {item.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <Modal
          isOpen={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          title={`Fee Invoice - ${selectedInvoice.invoiceNumber}`}
          maxWidth="max-w-lg"
        >
          <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-4 bg-white dark:bg-slate-900 text-xs">
            <div className="flex justify-between items-start border-b pb-3">
              <div>
                <h3 className="font-extrabold text-sm text-slate-800 dark:text-white">Mount Valley Public School</h3>
                <p className="text-slate-400">Coimbatore Campus &bull; GSTIN: 33AAAAA0000A1Z5</p>
              </div>
              <Badge variant={selectedInvoice.status === 'Paid' ? 'active' : 'pending'}>{selectedInvoice.status}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-300">
              <p><strong>Student:</strong> {selectedInvoice.studentName}</p>
              <p><strong>Invoice #:</strong> {selectedInvoice.invoiceNumber}</p>
              <p><strong>Class:</strong> {currentStudent.class} - {currentStudent.section}</p>
              <p><strong>Due Date:</strong> {selectedInvoice.dueDate}</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-800 dark:text-white block">{selectedInvoice.category}</span>
                <span className="text-[11px] text-slate-400">Academic Year 2026–2027</span>
              </div>
              <span className="font-mono font-extrabold text-base text-teal-600">₹{selectedInvoice.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  showSuccess('Sending invoice to printer...');
                  window.print();
                }}
                className="px-4 py-2 bg-teal-600 text-white font-bold rounded-xl flex items-center gap-1.5 touch-press shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Pay Online Modal */}
      <Modal
        isOpen={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
        title="Pay School Fee Online"
        maxWidth="max-w-md"
      >
        <form onSubmit={handlePayOnline} className="space-y-4 text-xs">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-1.5">
            <div className="flex justify-between"><span className="text-slate-400">Student:</span><span className="font-bold">{currentStudent.name}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Admission No:</span><span className="font-mono font-semibold">{currentStudent.admissionNumber}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Fee Head:</span><span>Term 2 Tuition &amp; Academic Fee</span></div>
            <div className="flex justify-between text-teal-600 font-bold text-sm pt-1 border-t border-slate-200 dark:border-slate-700">
              <span>Amount Due:</span>
              <span>₹{currentStudent.pendingFee > 0 ? currentStudent.pendingFee.toLocaleString() : '24,000'}</span>
            </div>
          </div>

          <div>
            <label className="font-bold block mb-1">Select Payment Gateway</label>
            <select className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <option>UPI / Google Pay / PhonePe / Paytm</option>
              <option>Net Banking (All Indian Banks)</option>
              <option>Credit / Debit Card (Visa / Mastercard / RuPay)</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button type="button" onClick={() => setIsPayModalOpen(false)} className="px-4 py-2 text-slate-500 font-medium">Cancel</button>
            <button type="submit" className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-sm touch-press">
              Pay ₹{currentStudent.pendingFee > 0 ? currentStudent.pendingFee.toLocaleString() : '24,000'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Upload Payment Proof Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Bank Payment Slip"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleUploadProof} className="space-y-4 text-xs">
          <div>
            <label className="font-bold block mb-1">Payment Method / Bank</label>
            <input
              type="text"
              required
              placeholder="e.g. SBI NEFT / Cash Deposit"
              defaultValue="HDFC Bank Transfer"
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
            />
          </div>
          <div>
            <label className="font-bold block mb-1">Transaction Ref / UTR #</label>
            <input
              type="text"
              required
              placeholder="e.g. UTR12345678"
              defaultValue={`UTR${Date.now().toString().slice(-8)}`}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
            />
          </div>
          <div>
            <label className="font-bold block mb-1">Upload Receipt Photo / PDF</label>
            <div className="p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-center space-y-1 bg-slate-50/50 dark:bg-slate-800/50">
              <UploadCloud className="w-6 h-6 mx-auto text-teal-600" />
              <p className="font-semibold text-slate-700 dark:text-slate-300">Click or drag receipt image here</p>
              <p className="text-[11px] text-slate-400">PNG, JPG, PDF up to 5MB</p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button type="button" onClick={() => setIsUploadModalOpen(false)} className="px-4 py-2 text-slate-500 font-medium">Cancel</button>
            <button type="submit" className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-sm touch-press">
              Submit Slip
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

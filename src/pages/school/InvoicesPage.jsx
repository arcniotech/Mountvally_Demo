import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Search,
  Download,
  Printer,
  Eye,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export function InvoicesPage() {
  const { invoices, addInvoice } = useData();
  const { showSuccess } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    studentName: 'Demo Child',
    admissionNumber: 'DEMO-0001',
    class: 'Grade 10-A',
    amount: 24000,
    dueDate: '2026-10-25',
    category: 'Tuition Fee - Term 2',
  });

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    addInvoice(formData);
    showSuccess(`Invoice for ${formData.studentName} generated successfully!`);
    setIsAddModalOpen(false);
  };

  const filteredInvoices = invoices.filter(inv => {
    const matchQuery = inv.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = selectedStatus === 'All' || inv.status === selectedStatus;
    return matchQuery && matchStatus;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fee Invoices"
        subtitle="Generate and track student fee bills, due dates, and receipts"
        showAccent={true}
        action={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center gap-1.5 touch-press"
          >
            <Plus className="w-4 h-4" />
            <span>Create Invoice</span>
          </button>
        }
      />

      {/* Search & Status Filters */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search invoice number or student..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-white"
          />
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
        >
          <option value="All">All Invoices</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      {/* Invoices Table */}
      <div className="bg-white dark:bg-slate-850 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Invoice No</th>
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Fee Head</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Issue Date</th>
                <th className="py-3.5 px-4">Due Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800 dark:text-white">{inv.invoiceNumber}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-800 dark:text-white">{inv.studentName}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{inv.admissionNumber || inv.class}</p>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">{inv.category}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-teal-600">₹{inv.amount.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-slate-400">{inv.issueDate}</td>
                  <td className="py-3.5 px-4 text-slate-400">{inv.dueDate}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant={inv.status === 'Paid' ? 'active' : inv.status === 'Overdue' ? 'danger' : 'pending'} size="sm">
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="View Invoice"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => showSuccess(`Invoice ${inv.invoiceNumber} emailed to student's parent.`)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Send Email"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice View Modal */}
      {selectedInvoice && (
        <Modal
          isOpen={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          title={`Official Fee Invoice - ${selectedInvoice.invoiceNumber}`}
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
              <p><strong>Billed To:</strong> {selectedInvoice.studentName}</p>
              <p><strong>Invoice #:</strong> {selectedInvoice.invoiceNumber}</p>
              <p><strong>Class:</strong> {selectedInvoice.class || 'Grade 10-A'}</p>
              <p><strong>Due Date:</strong> {selectedInvoice.dueDate}</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-800 dark:text-white block">{selectedInvoice.category}</span>
                <span className="text-[11px] text-slate-400">Term 2 Academic Session</span>
              </div>
              <span className="font-mono font-extrabold text-base text-teal-600">₹{selectedInvoice.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  showSuccess('Sending invoice to printer...');
                  window.print();
                }}
                className="px-4 py-2 bg-teal-600 text-white font-bold rounded-xl flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Invoice</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Invoice Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create Student Fee Invoice"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleCreateInvoice} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Student Name</label>
            <input
              type="text"
              required
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Fee Category</label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Amount (₹)</label>
              <input
                type="number"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Due Date</label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-500">Cancel</button>
            <button type="submit" className="px-5 py-2 bg-teal-600 text-white font-bold text-xs rounded-xl">Create Invoice</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

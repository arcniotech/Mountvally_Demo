import React, { useState } from 'react';
import {
  CheckSquare,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  User,
  GraduationCap,
  Wallet,
  CalendarOff,
  Layers,
  Eye,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Tabs } from '../../components/common/Tabs';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export function ApprovalsPage() {
  const { approvals, processApproval } = useData();
  const { showSuccess, showError } = useToast();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedApproval, setSelectedApproval] = useState(null);

  const categories = [
    { id: 'All', label: 'All Requests', count: approvals.filter(a => a.status === 'Pending').length },
    { id: 'Student', label: 'Student', count: approvals.filter(a => a.category === 'Student' && a.status === 'Pending').length },
    { id: 'Teacher', label: 'Teacher', count: approvals.filter(a => a.category === 'Teacher' && a.status === 'Pending').length },
    { id: 'Finance', label: 'Finance', count: approvals.filter(a => a.category === 'Finance' && a.status === 'Pending').length },
    { id: 'Leave', label: 'Staff Leave', count: approvals.filter(a => a.category === 'Leave' && a.status === 'Pending').length },
  ];

  const handleApprove = (id) => {
    processApproval(id, 'Approved');
    showSuccess('Request approved successfully.');
    setSelectedApproval(null);
  };

  const handleReject = (id) => {
    processApproval(id, 'Rejected');
    showError('Request rejected.');
    setSelectedApproval(null);
  };

  const filteredApprovals = approvals.filter(a => {
    if (selectedCategory === 'All') return true;
    return a.category === selectedCategory;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Approvals & Authorizations"
        subtitle="Centralized management of admissions, finance receipts, staff leaves and procurement"
        showAccent={true}
      />

      <Tabs
        tabs={categories}
        activeTab={selectedCategory}
        onChange={setSelectedCategory}
      />

      <div className="space-y-3">
        {filteredApprovals.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft hover:shadow-soft-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <Badge variant={item.category === 'Student' ? 'teal' : item.category === 'Finance' ? 'primary' : item.category === 'Leave' ? 'pending' : 'purple'} size="sm">
                  {item.category}
                </Badge>
                <Badge variant={item.priority === 'High' ? 'danger' : 'neutral'} size="sm">
                  {item.priority} Priority
                </Badge>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {item.details}
              </p>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium pt-1">
                <span>Submitted by <strong className="text-slate-700 dark:text-slate-300">{item.submittedBy}</strong></span>
                <span>&bull;</span>
                <span>{item.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
              <Badge variant={item.status === 'Approved' ? 'active' : item.status === 'Rejected' ? 'danger' : 'pending'}>
                {item.status}
              </Badge>

              {item.status === 'Pending' && (
                <div className="flex items-center gap-2 ml-2">
                  <button
                    onClick={() => handleReject(item.id)}
                    className="px-3.5 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold text-xs hover:bg-rose-100 transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(item.id)}
                    className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 touch-press"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

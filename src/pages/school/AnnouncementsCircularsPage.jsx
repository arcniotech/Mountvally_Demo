import React, { useState } from 'react';
import {
  Megaphone,
  FileSpreadsheet,
  Plus,
  Search,
  Download,
  Send,
  Users,
  Calendar,
  Eye,
  Trash2,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Tabs } from '../../components/common/Tabs';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export function AnnouncementsCircularsPage() {
  const { announcements, circulars, addAnnouncement, addCircular } = useData();
  const { showSuccess } = useToast();

  const [activeTab, setActiveTab] = useState('Announcements');
  const [isAddAnnModalOpen, setIsAddAnnModalOpen] = useState(false);
  const [isAddCircModalOpen, setIsAddCircModalOpen] = useState(false);

  const [annFormData, setAnnFormData] = useState({
    title: '',
    description: '',
    audience: 'All',
    priority: 'Normal',
  });

  const [circFormData, setCircFormData] = useState({
    title: '',
    description: '',
    audience: 'All Students & Parents',
    attachmentName: 'Official_Notice.pdf',
  });

  const tabs = [
    { id: 'Announcements', label: 'Broadcast Announcements' },
    { id: 'Circulars', label: 'Official Circulars & Notices' },
  ];

  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    addAnnouncement({
      ...annFormData,
      author: 'Principal Office',
    });
    showSuccess('Announcement broadcasted to selected audience.');
    setIsAddAnnModalOpen(false);
    setAnnFormData({ title: '', description: '', audience: 'All', priority: 'Normal' });
  };

  const handleCreateCircular = (e) => {
    e.preventDefault();
    addCircular(circFormData);
    showSuccess('Official circular published successfully.');
    setIsAddCircModalOpen(false);
    setCircFormData({ title: '', description: '', audience: 'All Students & Parents', attachmentName: 'Official_Notice.pdf' });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="School Communication"
        subtitle="Broadcast campus announcements, administrative circulars, and parental notices"
        showAccent={true}
        action={
          activeTab === 'Announcements' ? (
            <button
              onClick={() => setIsAddAnnModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center gap-1.5 touch-press"
            >
              <Plus className="w-4 h-4" />
              <span>Broadcast Notice</span>
            </button>
          ) : (
            <button
              onClick={() => setIsAddCircModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center gap-1.5 touch-press"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Circular</span>
            </button>
          )
        }
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'Announcements' && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge variant={ann.priority === 'Urgent' ? 'danger' : ann.priority === 'Important' ? 'pending' : 'primary'} size="sm">
                      {ann.priority || 'Notice'}
                    </Badge>
                    <span className="text-[11px] text-slate-400">{ann.publishedDate}</span>
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-slate-800 dark:text-white mb-2">
                    {ann.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {ann.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Target: <strong className="text-slate-700 dark:text-slate-300">{ann.audience}</strong></span>
                  <span>By {ann.author || 'Admin'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Circulars' && (
        <div className="bg-white dark:bg-slate-850 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-soft overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase">
                  <th className="p-3.5">Circular No</th>
                  <th className="p-3.5">Title &amp; Subject</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Audience</th>
                  <th className="p-3.5">Attachment</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {circulars.map((circ) => (
                  <tr key={circ.id} className="hover:bg-slate-50/60">
                    <td className="p-3.5 font-mono font-bold text-teal-600">{circ.circularNo}</td>
                    <td className="p-3.5">
                      <p className="font-bold text-slate-800 dark:text-white">{circ.title}</p>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{circ.description}</p>
                    </td>
                    <td className="p-3.5 text-slate-500 whitespace-nowrap">{circ.date}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{circ.audience}</td>
                    <td className="p-3.5 font-mono text-xs text-slate-400">{circ.attachmentName || 'Notice.pdf'}</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => showSuccess(`Downloading ${circ.attachmentName || 'Circular.pdf'}...`)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Announcement Modal */}
      <Modal
        isOpen={isAddAnnModalOpen}
        onClose={() => setIsAddAnnModalOpen(false)}
        title="Broadcast New Announcement"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleCreateAnnouncement} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Title *</label>
            <input
              type="text"
              required
              value={annFormData.title}
              onChange={(e) => setAnnFormData({ ...annFormData, title: e.target.value })}
              placeholder="e.g. Science Exhibition Registration"
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Audience</label>
              <select
                value={annFormData.audience}
                onChange={(e) => setAnnFormData({ ...annFormData, audience: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs sm:text-sm"
              >
                <option value="All">All School</option>
                <option value="Students">Students Only</option>
                <option value="Parents">Parents Only</option>
                <option value="Teachers">Faculty / Staff</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Priority</label>
              <select
                value={annFormData.priority}
                onChange={(e) => setAnnFormData({ ...annFormData, priority: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs sm:text-sm"
              >
                <option value="Normal">Normal</option>
                <option value="Important">Important</option>
                <option value="Urgent">Urgent Alert</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Notice Description *</label>
            <textarea
              rows="4"
              required
              value={annFormData.description}
              onChange={(e) => setAnnFormData({ ...annFormData, description: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm"
            />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t">
            <button type="button" onClick={() => setIsAddAnnModalOpen(false)} className="px-4 py-2 text-xs text-slate-500">Cancel</button>
            <button type="submit" className="px-5 py-2 bg-teal-600 text-white font-bold text-xs rounded-xl">Broadcast</button>
          </div>
        </form>
      </Modal>

      {/* Add Circular Modal */}
      <Modal
        isOpen={isAddCircModalOpen}
        onClose={() => setIsAddCircModalOpen(false)}
        title="Publish Official School Circular"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleCreateCircular} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Circular Title *</label>
            <input
              type="text"
              required
              value={circFormData.title}
              onChange={(e) => setCircFormData({ ...circFormData, title: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Audience</label>
            <input
              type="text"
              required
              value={circFormData.audience}
              onChange={(e) => setCircFormData({ ...circFormData, audience: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Official Circular Summary</label>
            <textarea
              rows="3"
              required
              value={circFormData.description}
              onChange={(e) => setCircFormData({ ...circFormData, description: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm"
            />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t">
            <button type="button" onClick={() => setIsAddCircModalOpen(false)} className="px-4 py-2 text-xs text-slate-500">Cancel</button>
            <button type="submit" className="px-5 py-2 bg-teal-600 text-white font-bold text-xs rounded-xl">Publish</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

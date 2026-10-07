import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  GraduationCap,
  Mail,
  Phone,
  Calendar,
  Lock,
  Edit2,
  Trash2,
  UserCheck,
  Building,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { Modal, ConfirmModal } from '../../components/common/Modal';
import { ChipSelector } from '../../components/common/ChipSelector';

export function TeachersPage() {
  const { teachers, addTeacher, updateTeacher, deleteTeacher } = useData();
  const { showSuccess } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Form matching reference Image 3
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    gender: 'MALE',
    designation: 'TGT Teacher',
    department: 'Mathematics',
    role: 'SUBJECT TEACHER',
    employmentType: 'FULL TIME',
    qualification: 'M.Sc., B.Ed.',
    salary: 50000,
  });

  const departments = ['Mathematics', 'Science & Physics', 'Chemistry & Biology', 'English & Literature', 'Social Science', 'Computer Science', 'Primary Studies', 'Sports & Health'];

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      gender: 'MALE',
      designation: 'TGT Teacher',
      department: 'Mathematics',
      role: 'SUBJECT TEACHER',
      employmentType: 'FULL TIME',
      qualification: 'M.Sc., B.Ed.',
      salary: 50000,
    });
    setEditingTeacher(null);
  };

  const handleOpenAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (teacher) => {
    const parts = teacher.name.split(' ');
    setEditingTeacher(teacher);
    setFormData({
      firstName: parts[0] || '',
      lastName: parts.slice(1).join(' ') || '',
      phone: teacher.phone || '',
      email: teacher.email || '',
      gender: teacher.gender || 'MALE',
      designation: teacher.designation || 'TGT Teacher',
      department: teacher.department || 'Mathematics',
      role: teacher.role || 'SUBJECT TEACHER',
      employmentType: teacher.employmentType || 'FULL TIME',
      qualification: teacher.qualification || 'M.Sc., B.Ed.',
      salary: teacher.salary || 50000,
    });
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const generatedEmail = formData.email || `${formData.firstName.toLowerCase()}.${formData.lastName.toLowerCase() || 't'}@mvps.edu.in`;

    if (editingTeacher) {
      updateTeacher(editingTeacher.id, {
        ...formData,
        name: fullName,
        email: generatedEmail,
      });
      showSuccess(`Teacher ${fullName} updated successfully!`);
    } else {
      addTeacher({
        ...formData,
        name: fullName,
        email: generatedEmail,
      });
      showSuccess(`Teacher ${fullName} added successfully! Default login password: Welcome@123`);
    }
    setIsAddModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteTargetId) {
      deleteTeacher(deleteTargetId);
      showSuccess('Teacher profile removed.');
      setDeleteTargetId(null);
    }
  };

  const filteredTeachers = teachers.filter(t => {
    const matchQuery = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDept = selectedDept === 'All' || t.department === selectedDept;
    return matchQuery && matchDept;
  });

  const presentCount = teachers.filter(t => t.status === 'Present').length;
  const onLeaveCount = teachers.filter(t => t.status === 'On Leave').length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Teachers & Faculty"
        subtitle={`Total ${teachers.length} faculty members across 8 academic departments`}
        showAccent={true}
        action={
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 touch-press"
          >
            <Plus className="w-4 h-4" />
            <span>Add Teacher</span>
          </button>
        }
      />

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <StatCard
          title="Total Faculty"
          value={teachers.length}
          subtitle="Active faculty members"
          icon={GraduationCap}
          iconColor="text-teal-600"
          iconBg="bg-teal-50 dark:bg-teal-950/40"
        />
        <StatCard
          title="Present Today"
          value={presentCount}
          subtitle="On campus"
          icon={UserCheck}
          iconColor="text-emerald-500"
          iconBg="bg-emerald-50 dark:bg-emerald-950/40"
        />
        <StatCard
          title="On Leave"
          value={onLeaveCount}
          subtitle="Substitutions assigned"
          icon={Calendar}
          iconColor="text-amber-500"
          iconBg="bg-amber-50 dark:bg-amber-950/40"
        />
        <StatCard
          title="Departments"
          value="8"
          subtitle="Core academic wings"
          icon={Building}
          iconColor="text-brand-500"
          iconBg="bg-brand-50 dark:bg-brand-950/40"
        />
      </div>

      {/* Search & Filter */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search teacher by name, ID or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-600 transition-colors"
          />
        </div>
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-white"
        >
          <option value="All">All Departments</option>
          {departments.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {/* Teachers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft hover:shadow-soft-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl ${teacher.avatarBg || 'bg-teal-600'} text-white flex items-center justify-center font-bold text-base shrink-0 shadow-xs`}>
                    {teacher.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      {teacher.name}
                    </h3>
                    <p className="text-xs text-teal-600 dark:text-teal-400 font-semibold">
                      {teacher.designation}
                    </p>
                  </div>
                </div>
                <Badge variant={teacher.status === 'Present' ? 'active' : 'pending'} size="sm">
                  {teacher.status}
                </Badge>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-1.5 text-xs text-slate-600 dark:text-slate-300 mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Employee ID:</span>
                  <span className="font-mono font-bold">{teacher.employeeId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Department:</span>
                  <span className="font-semibold text-slate-800 dark:text-white">{teacher.department}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Role:</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{teacher.role}</span>
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono">{teacher.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{teacher.email}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                {teacher.employmentType}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEditModal(teacher)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                  title="Edit Teacher"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteTargetId(teacher.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Teacher Modal matching reference Image 3 */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={editingTeacher ? `Edit Teacher - ${editingTeacher.name}` : "Add Teacher"}
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Section: IDENTITY */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              IDENTITY
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">First name *</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="First name"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Last name *</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Last name"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Phone *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98401 22334"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-mono text-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* Info Notice Banner matching reference Image 3 */}
          <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/50 flex items-start gap-3">
            <Lock className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
            <p className="text-xs text-teal-800 dark:text-teal-200 leading-relaxed">
              Username &amp; password are auto-generated. Default password is <span className="font-mono font-bold">Welcome@123</span> &mdash; shown after you add the teacher.
            </p>
          </div>

          {/* Section: GENDER Chips matching reference Image 3 */}
          <ChipSelector
            label="GENDER"
            options={['MALE', 'FEMALE', 'OTHER']}
            value={formData.gender}
            onChange={(val) => setFormData({ ...formData, gender: val })}
            activeColor="purple"
          />

          {/* Section: EMPLOYMENT */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              EMPLOYMENT
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Designation (e.g. PRT, TGT)
                </label>
                <input
                  type="text"
                  required
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  placeholder="e.g. PGT Senior Teacher"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Department
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white"
                >
                  {departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Section: ROLE Chips matching reference Image 3 */}
          <ChipSelector
            label="ROLE"
            options={['CLASS TEACHER', 'SUBJECT TEACHER', 'COORDINATOR']}
            value={formData.role}
            onChange={(val) => setFormData({ ...formData, role: val })}
            activeColor="teal"
          />

          {/* Section: EMPLOYMENT TYPE Chips matching reference Image 3 */}
          <ChipSelector
            label="EMPLOYMENT TYPE"
            options={['FULL TIME', 'PART TIME', 'TEMPORARY']}
            value={formData.employmentType}
            onChange={(val) => setFormData({ ...formData, employmentType: val })}
            activeColor="green"
          />

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm touch-press"
            >
              {editingTeacher ? "Save Changes" : "Add Teacher"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDeleteConfirm}
        title="Remove Faculty Member"
        message="Are you sure you want to remove this teacher from the active staff directory?"
        confirmLabel="Remove"
        isDanger={true}
      />
    </div>
  );
}

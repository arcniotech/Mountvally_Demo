import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  UserPlus,
  Users,
  Eye,
  Edit2,
  Trash2,
  Download,
  Upload,
  User,
  CheckCircle2,
  ChevronRight,
  MoreVertical,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/common/PageHeader';
import { MobileDataCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { Modal, ConfirmModal } from '../../components/common/Modal';
import { ChipSelector } from '../../components/common/ChipSelector';

export function StudentsPage() {
  const { students, addStudent, updateStudent, deleteStudent } = useData();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    admissionNumber: '',
    dob: '',
    gender: 'Male',
    bloodGroup: 'O+',
    admissionDate: new Date().toISOString().split('T')[0],
    class: 'Grade 3',
    section: 'Primrose-A',
    rollNo: '',
    fatherName: '',
    motherName: '',
    parentPhone: '',
    parentEmail: '',
    address: '',
    medicalNotes: 'None',
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const classesList = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      admissionNumber: `MVPS_${String(students.length + 25).padStart(4, '0')}`,
      dob: '2015-05-10',
      gender: 'Male',
      bloodGroup: 'O+',
      admissionDate: new Date().toISOString().split('T')[0],
      class: 'Grade 3',
      section: 'Primrose-A',
      rollNo: String(students.length + 1),
      fatherName: '',
      motherName: '',
      parentPhone: '',
      parentEmail: '',
      address: '',
      medicalNotes: 'None',
    });
    setEditingStudent(null);
  };

  const handleOpenAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (student) => {
    const parts = student.name.split(' ');
    setEditingStudent(student);
    setFormData({
      firstName: parts[0] || '',
      lastName: parts.slice(1).join(' ') || '',
      admissionNumber: student.admissionNumber,
      dob: student.dob || '2015-05-10',
      gender: student.gender || 'Male',
      bloodGroup: student.bloodGroup || 'O+',
      admissionDate: student.admissionDate || '2023-06-01',
      class: student.class,
      section: student.section,
      rollNo: student.rollNo || '01',
      fatherName: student.fatherName || '',
      motherName: student.motherName || '',
      parentPhone: student.parentPhone || '',
      parentEmail: student.parentEmail || '',
      address: student.address || '',
      medicalNotes: student.medicalNotes || 'None',
    });
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    if (editingStudent) {
      updateStudent(editingStudent.id, {
        ...formData,
        name: fullName,
      });
      showSuccess(`Student ${fullName} updated successfully!`);
    } else {
      addStudent({
        ...formData,
        name: fullName,
      });
      showSuccess(`Student ${fullName} enrolled successfully!`);
    }

    setIsAddModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteTargetId) {
      deleteStudent(deleteTargetId);
      showSuccess('Student record deleted successfully.');
      setDeleteTargetId(null);
    }
  };

  // Filter logic
  const filteredStudents = students.filter(student => {
    const matchQuery =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.admissionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.class.toLowerCase().includes(searchQuery.toLowerCase());

    const matchClass = selectedClass === 'All' || student.class === selectedClass;
    const matchGender = selectedGender === 'All' || student.gender === selectedGender;
    const matchBlood = selectedBloodGroup === 'All' || student.bloodGroup === selectedBloodGroup;

    return matchQuery && matchClass && matchGender && matchBlood;
  });

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <PageHeader
        title="Students"
        subtitle={`Total ${students.length} enrolled students across classes`}
        showAccent={true}
        action={
          <div className="flex items-center gap-2">
            <button
              onClick={() => showSuccess('Student directory exported to CSV successfully.')}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors flex items-center gap-1.5 touch-press"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 touch-press"
            >
              <Plus className="w-4 h-4" />
              <span>Add Student</span>
            </button>
          </div>
        }
      />

      {/* Search Bar & Filter Toggle matching Image 5 */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft space-y-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or admission no."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-600 transition-colors"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`px-3 sm:px-4 py-2.5 rounded-2xl border text-xs font-semibold flex items-center gap-1.5 transition-colors touch-press ${
              showFilters || selectedClass !== 'All' || selectedGender !== 'All'
                ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-600 text-teal-600 dark:text-teal-400'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 animate-fade-in text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
              >
                <option value="All">All Classes</option>
                {classesList.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Gender</label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
              >
                <option value="All">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Blood Group</label>
              <select
                value={selectedBloodGroup}
                onChange={(e) => setSelectedBloodGroup(e.target.value)}
                className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
              >
                <option value="All">All Blood Groups</option>
                {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Card List matching Image 5 */}
      <div className="block lg:hidden space-y-2.5">
        {filteredStudents.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs bg-white dark:bg-slate-850 rounded-2xl">
            No students found matching current criteria.
          </div>
        ) : (
          filteredStudents.map((student) => (
            <MobileDataCard
              key={student.id}
              title={student.name}
              subtitle={`${student.admissionNumber} · ${student.class} ${student.section}`}
              badgeText="ACTIVE"
              badgeVariant="active"
              avatar={
                <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 stroke-[1.8]" />
                </div>
              }
              onClick={() => navigate(`/school/students/${student.id}`)}
            />
          ))
        )}
      </div>

      {/* Desktop Responsive Table */}
      <div className="hidden lg:block bg-white dark:bg-slate-850 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Admission No</th>
                <th className="py-3.5 px-4">Class & Section</th>
                <th className="py-3.5 px-4">Gender</th>
                <th className="py-3.5 px-4">Blood Group</th>
                <th className="py-3.5 px-4">Parent Phone</th>
                <th className="py-3.5 px-4">Attendance</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                  onClick={() => navigate(`/school/students/${student.id}`)}
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-teal-50 dark:bg-teal-950/50 text-teal-600 flex items-center justify-center font-bold text-xs shrink-0">
                        {student.name.charAt(0)}
                      </div>
                      <div className="font-bold text-slate-800 dark:text-white">
                        {student.name}
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">{student.admissionNumber}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                    {student.class} - {student.section}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">{student.gender}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      {student.bloodGroup}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono text-xs">{student.parentPhone}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600">{student.attendance}%</td>
                  <td className="py-3.5 px-4">
                    <Badge variant="active" size="sm">ACTIVE</Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => navigate(`/school/students/${student.id}`)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="View Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEditModal(student)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(student.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Action Button for Mobile matching Image 5 "+ Enrol" */}
      <div className="fixed bottom-20 right-5 z-40 lg:hidden">
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-soft-lg transition-all touch-press active:scale-95"
        >
          <UserPlus className="w-5 h-5" />
          <span>Enrol</span>
        </button>
      </div>

      {/* Add / Edit Student Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={editingStudent ? `Edit Student - ${editingStudent.name}` : "Enrol New Student"}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">First Name *</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="e.g. Gugan"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Last Name *</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="e.g. S"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Admission No *</label>
              <input
                type="text"
                required
                value={formData.admissionNumber}
                onChange={(e) => setFormData({ ...formData, admissionNumber: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Class *</label>
              <select
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white"
              >
                {classesList.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Section *</label>
              <input
                type="text"
                required
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                placeholder="e.g. Primrose-A"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* Gender & Blood Group Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <ChipSelector
              label="GENDER"
              options={['Male', 'Female', 'Other']}
              value={formData.gender}
              onChange={(val) => setFormData({ ...formData, gender: val })}
              activeColor="purple"
            />
            <ChipSelector
              label="BLOOD GROUP"
              options={bloodGroups}
              value={formData.bloodGroup}
              onChange={(val) => setFormData({ ...formData, bloodGroup: val })}
              activeColor="teal"
            />
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Parent / Guardian Information
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Father / Guardian Name</label>
                <input
                  type="text"
                  value={formData.fatherName}
                  onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                  placeholder="e.g. Sivakumar M"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Parent Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.parentPhone}
                  onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                  placeholder="+91 94430 12345"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-mono"
                />
              </div>
            </div>
          </div>

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
              {editingStudent ? "Save Changes" : "Enrol Student"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Student Record"
        message="Are you sure you want to remove this student? This action cannot be undone."
        confirmLabel="Delete"
        isDanger={true}
      />
    </div>
  );
}

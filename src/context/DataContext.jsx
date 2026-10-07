import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  INITIAL_STAFF_MEMBERS,
  INITIAL_APPROVALS,
  INITIAL_PAYMENT_PROOFS,
  INITIAL_INVOICES,
  INITIAL_FEE_STRUCTURE,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_CIRCULARS,
  INITIAL_EXAMS,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_TRANSPORT,
  INITIAL_INVENTORY,
  INITIAL_LEAVES,
  INITIAL_SUBSTITUTIONS,
} from '../data/mockData';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('scl_students_data');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [teachers, setTeachers] = useState(() => {
    const saved = localStorage.getItem('scl_teachers_data');
    return saved ? JSON.parse(saved) : INITIAL_TEACHERS;
  });

  const [staffMembers, setStaffMembers] = useState(() => {
    const saved = localStorage.getItem('scl_staff_data');
    return saved ? JSON.parse(saved) : INITIAL_STAFF_MEMBERS;
  });

  const [approvals, setApprovals] = useState(() => {
    const saved = localStorage.getItem('scl_approvals_data');
    return saved ? JSON.parse(saved) : INITIAL_APPROVALS;
  });

  const [paymentProofs, setPaymentProofs] = useState(() => {
    const saved = localStorage.getItem('scl_payment_proofs');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENT_PROOFS;
  });

  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('scl_invoices_data');
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [feeStructure, setFeeStructure] = useState(() => {
    const saved = localStorage.getItem('scl_fee_structure');
    return saved ? JSON.parse(saved) : INITIAL_FEE_STRUCTURE;
  });

  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem('scl_announcements_data');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [circulars, setCirculars] = useState(() => {
    const saved = localStorage.getItem('scl_circulars_data');
    return saved ? JSON.parse(saved) : INITIAL_CIRCULARS;
  });

  const [exams, setExams] = useState(() => {
    const saved = localStorage.getItem('scl_exams_data');
    return saved ? JSON.parse(saved) : INITIAL_EXAMS;
  });

  const [calendarEvents, setCalendarEvents] = useState(() => {
    const saved = localStorage.getItem('scl_calendar_data');
    return saved ? JSON.parse(saved) : INITIAL_CALENDAR_EVENTS;
  });

  const [transport, setTransport] = useState(() => {
    const saved = localStorage.getItem('scl_transport_data');
    return saved ? JSON.parse(saved) : INITIAL_TRANSPORT;
  });

  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('scl_inventory_data');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [leaves, setLeaves] = useState(() => {
    const saved = localStorage.getItem('scl_leaves_data');
    return saved ? JSON.parse(saved) : INITIAL_LEAVES;
  });

  const [substitutions, setSubstitutions] = useState(() => {
    const saved = localStorage.getItem('scl_substitutions_data');
    return saved ? JSON.parse(saved) : INITIAL_SUBSTITUTIONS;
  });

  // Persist states
  useEffect(() => { localStorage.setItem('scl_students_data', JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem('scl_teachers_data', JSON.stringify(teachers)); }, [teachers]);
  useEffect(() => { localStorage.setItem('scl_approvals_data', JSON.stringify(approvals)); }, [approvals]);
  useEffect(() => { localStorage.setItem('scl_payment_proofs', JSON.stringify(paymentProofs)); }, [paymentProofs]);
  useEffect(() => { localStorage.setItem('scl_invoices_data', JSON.stringify(invoices)); }, [invoices]);
  useEffect(() => { localStorage.setItem('scl_fee_structure', JSON.stringify(feeStructure)); }, [feeStructure]);
  useEffect(() => { localStorage.setItem('scl_announcements_data', JSON.stringify(announcements)); }, [announcements]);
  useEffect(() => { localStorage.setItem('scl_circulars_data', JSON.stringify(circulars)); }, [circulars]);
  useEffect(() => { localStorage.setItem('scl_leaves_data', JSON.stringify(leaves)); }, [leaves]);
  useEffect(() => { localStorage.setItem('scl_substitutions_data', JSON.stringify(substitutions)); }, [substitutions]);

  // Student CRUD
  const addStudent = (studentData) => {
    const newStudent = {
      ...studentData,
      id: `s-${Date.now()}`,
      attendance: 100,
      status: 'Active',
      feeStatus: studentData.feeStatus || 'Pending',
      paidFee: Number(studentData.paidFee) || 0,
      totalFee: Number(studentData.totalFee) || 45000,
      pendingFee: (Number(studentData.totalFee) || 45000) - (Number(studentData.paidFee) || 0),
      avatarBg: 'bg-teal-500',
    };
    setStudents(prev => [newStudent, ...prev]);
    return newStudent;
  };

  const updateStudent = (id, updated) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  };

  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  // Teacher CRUD
  const addTeacher = (teacherData) => {
    const newTeacher = {
      ...teacherData,
      id: `t-${Date.now()}`,
      employeeId: teacherData.employeeId || `EMP${String(teachers.length + 1).padStart(3, '0')}`,
      status: 'Present',
      avatarBg: 'bg-blue-600',
      joiningDate: teacherData.joiningDate || new Date().toISOString().split('T')[0],
      classesHandled: teacherData.classesHandled || ['Grade 10-A'],
      salary: Number(teacherData.salary) || 50000,
    };
    setTeachers(prev => [newTeacher, ...prev]);
    return newTeacher;
  };

  const updateTeacher = (id, updated) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
  };

  const deleteTeacher = (id) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
  };

  // Approval actions
  const processApproval = (id, status) => {
    setApprovals(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  // Payment Proof actions
  const processPaymentProof = (id, status) => {
    setPaymentProofs(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, status };
      }
      return p;
    }));
  };

  // Invoices
  const addInvoice = (invoiceData) => {
    const newInv = {
      ...invoiceData,
      id: `INV-2026-${String(invoices.length + 1).padStart(3, '0')}`,
      invoiceNumber: `INV-2026-${String(invoices.length + 1).padStart(3, '0')}`,
      issueDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };
    setInvoices(prev => [newInv, ...prev]);
    return newInv;
  };

  // Announcements & Circulars
  const addAnnouncement = (annData) => {
    const newAnn = {
      ...annData,
      id: `ann-${Date.now()}`,
      publishedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Published',
    };
    setAnnouncements(prev => [newAnn, ...prev]);
  };

  const addCircular = (circData) => {
    const newCirc = {
      ...circData,
      id: `circ-${Date.now()}`,
      circularNo: `CIR/MVPS/2026/${String(circulars.length + 10).padStart(3, '0')}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Active',
    };
    setCirculars(prev => [newCirc, ...prev]);
  };

  // Leaves
  const processLeave = (id, status) => {
    setLeaves(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const addLeave = (leaveData) => {
    const newLeave = {
      ...leaveData,
      id: `lev-${Date.now()}`,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };
    setLeaves(prev => [newLeave, ...prev]);
  };

  // Substitutions
  const addSubstitution = (subData) => {
    const newSub = {
      ...subData,
      id: `sub-${Date.now()}`,
      status: 'Assigned',
    };
    setSubstitutions(prev => [newSub, ...prev]);
  };

  return (
    <DataContext.Provider value={{
      students,
      teachers,
      staffMembers,
      approvals,
      paymentProofs,
      invoices,
      feeStructure,
      announcements,
      circulars,
      exams,
      calendarEvents,
      transport,
      inventory,
      leaves,
      substitutions,
      addStudent,
      updateStudent,
      deleteStudent,
      addTeacher,
      updateTeacher,
      deleteTeacher,
      processApproval,
      processPaymentProof,
      addInvoice,
      addAnnouncement,
      addCircular,
      processLeave,
      addLeave,
      addSubstitution,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);

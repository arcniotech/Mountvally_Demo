import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_SCHOOLS } from '../data/mockData';

const SchoolContext = createContext();

export function SchoolProvider({ children }) {
  const [schools, setSchools] = useState(() => {
    const saved = localStorage.getItem('scl_schools_data');
    return saved ? JSON.parse(saved) : INITIAL_SCHOOLS;
  });

  const [currentSchoolId, setCurrentSchoolId] = useState(() => {
    const saved = localStorage.getItem('scl_active_school_id');
    return saved || 'mvps';
  });

  useEffect(() => {
    localStorage.setItem('scl_schools_data', JSON.stringify(schools));
  }, [schools]);

  useEffect(() => {
    localStorage.setItem('scl_active_school_id', currentSchoolId);
  }, [currentSchoolId]);

  const currentSchool = schools.find(s => s.id === currentSchoolId) || schools[0];

  const switchSchool = (schoolIdOrCode) => {
    const found = schools.find(s => s.id === schoolIdOrCode || s.code === schoolIdOrCode);
    if (found) {
      setCurrentSchoolId(found.id);
      return found;
    }
    return null;
  };

  // Live School Code auto generator from school name
  const generateSchoolCode = (name) => {
    if (!name) return '';
    // E.g. "Mount Valley Public School" -> "mvps" or "ABC Matriculation School" -> "abc"
    const words = name.trim().split(/\s+/);
    if (words.length > 1) {
      return words.map(w => w[0]).join('').toLowerCase().replace(/[^a-z0-9]/g, '');
    }
    return name.substring(0, 4).toLowerCase().replace(/[^a-z0-9]/g, '');
  };

  const addSchool = (newSchoolData) => {
    const code = newSchoolData.code || generateSchoolCode(newSchoolData.name);
    const newSchool = {
      id: code,
      code: code,
      name: newSchoolData.name,
      subdomain: `${code}.sclerp.com`,
      portalUrl: `https://${code}.sclerp.com`,
      studentsCount: newSchoolData.studentsCount || 0,
      teachersCount: newSchoolData.teachersCount || 0,
      staffCount: newSchoolData.staffCount || 0,
      plan: newSchoolData.plan || 'Standard',
      status: 'Active',
      academicYear: newSchoolData.academicYear || '2026–27',
      established: newSchoolData.established || new Date().getFullYear().toString(),
      email: newSchoolData.email || `admin@${code}.edu.in`,
      phone: newSchoolData.phone || '+91 98000 00000',
      address: newSchoolData.address || 'Campus Road',
      city: newSchoolData.city || 'City',
      state: newSchoolData.state || 'State',
      country: newSchoolData.country || 'India',
      postalCode: newSchoolData.postalCode || '600001',
      principalName: newSchoolData.principalName || 'Principal',
      logoLetter: newSchoolData.name.charAt(0).toUpperCase(),
      logoColor: 'bg-brand-600',
      adminUsername: `${code}.admin`,
      adminName: newSchoolData.adminName || 'Administrator',
      createdDate: new Date().toISOString().split('T')[0],
    };

    setSchools(prev => [newSchool, ...prev]);
    return newSchool;
  };

  const updateSchool = (id, updatedData) => {
    setSchools(prev => prev.map(s => s.id === id ? { ...s, ...updatedData } : s));
  };

  const toggleSchoolStatus = (id) => {
    setSchools(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, status: s.status === 'Active' ? 'Suspended' : 'Active' };
      }
      return s;
    }));
  };

  return (
    <SchoolContext.Provider value={{
      schools,
      currentSchool,
      currentSchoolId,
      switchSchool,
      generateSchoolCode,
      addSchool,
      updateSchool,
      toggleSchoolStatus,
    }}>
      {children}
    </SchoolContext.Provider>
  );
}

export const useSchool = () => useContext(SchoolContext);

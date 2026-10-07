import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('scl_user_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    // Default active session as School Admin for instant access
    return {
      role: 'School Admin',
      name: 'Administrator',
      username: 'mvps.admin',
      email: 'admin@mvps.edu.in',
      schoolCode: 'mvps',
      schoolName: 'Mount Valley Public School',
      isPro: true,
      staffRole: null,
      admissionNo: null,
    };
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('scl_user_session', JSON.stringify(user));
    } else {
      localStorage.removeItem('scl_user_session');
    }
  }, [user]);

  const login = (role, credentials, schoolInfo) => {
    let userData = null;

    if (role === 'Super Admin') {
      userData = {
        role: 'Super Admin',
        name: 'Super Administrator',
        username: 'superadmin',
        email: credentials.email || 'superadmin@sclerp.com',
        schoolCode: null,
        schoolName: 'SCL ERP Master Platform',
        isPro: true,
      };
    } else if (role === 'School Admin') {
      const code = credentials.schoolCode || 'mvps';
      userData = {
        role: 'School Admin',
        name: 'Administrator',
        username: credentials.username || `${code}.admin`,
        email: `admin@${code}.edu.in`,
        schoolCode: code,
        schoolName: schoolInfo?.name || 'Mount Valley Public School',
        isPro: true,
      };
    } else if (role === 'Staff') {
      const code = credentials.schoolCode || 'mvps';
      const empId = credentials.employeeId || 'EMP001';
      userData = {
        role: 'Staff',
        name: empId === 'EMP001' ? 'Deepak Sharma' : empId === 'STF001' ? 'Anand Krishnan' : 'Priyanka Sen',
        username: empId,
        employeeId: empId,
        department: empId === 'STF001' ? 'Accounts & Finance' : 'Mathematics',
        staffRole: empId === 'STF001' ? 'Accounts' : 'Teacher',
        email: `${empId.toLowerCase()}@${code}.edu.in`,
        schoolCode: code,
        schoolName: schoolInfo?.name || 'Mount Valley Public School',
        isPro: false,
      };
    } else if (role === 'Student') {
      const code = credentials.schoolCode || 'mvps';
      const admNo = credentials.admissionNumber || 'DEMO-0001';
      userData = {
        role: 'Student',
        name: admNo === 'DEMO-0001' ? 'Demo Child' : 'Gugan S',
        username: admNo,
        admissionNumber: admNo,
        class: admNo === 'DEMO-0001' ? 'Grade 10' : 'Grade 4',
        section: admNo === 'DEMO-0001' ? 'A' : 'Larkspur',
        email: `student.${admNo.toLowerCase()}@${code}.edu.in`,
        schoolCode: code,
        schoolName: schoolInfo?.name || 'Mount Valley Public School',
        isPro: false,
      };
    }

    setUser(userData);
    return userData;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

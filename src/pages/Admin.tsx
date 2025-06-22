import React from 'react';
import { useAdmin } from '../contexts/AdminContext';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';

const Admin: React.FC = () => {
  const { isAuthenticated } = useAdmin();

  return isAuthenticated ? <AdminDashboard /> : <AdminLogin />;
};

export default Admin;
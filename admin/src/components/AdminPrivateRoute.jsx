import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminPrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      toast.error("Admin login required", { toastId: 'admin-auth-error' });
      navigate('/admin-login');
    }
  }, [token, navigate]);

  if (!token) return null;

  return children;
};

export default AdminPrivateRoute;

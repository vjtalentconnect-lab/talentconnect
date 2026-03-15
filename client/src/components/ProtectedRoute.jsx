import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
        return <Navigate to={requiredRole === 'admin' ? '/admin/login' : '/login'} replace />;
    }

    const user = JSON.parse(userStr);

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to={requiredRole === 'admin' ? '/admin/login' : '/login'} replace />;
    }

    return children;
};

export default ProtectedRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole, allowedRoles }) => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
        return <Navigate to={requiredRole === 'admin' ? '/admin/login' : '/login'} replace />;
    }

    let user = null;
    try {
        user = JSON.parse(userStr);
    } catch (e) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        return <Navigate to={requiredRole === 'admin' ? '/admin/login' : '/login'} replace />;
    }

    if (allowedRoles && Array.isArray(allowedRoles)) {
        if (!allowedRoles.includes(user.role)) {
            return <Navigate to={user.role === 'admin' ? '/admin/login' : '/login'} replace />;
        }
    } else if (requiredRole && user.role !== requiredRole) {
        return <Navigate to={requiredRole === 'admin' ? '/admin/login' : '/login'} replace />;
    }

    return children;
};

export default ProtectedRoute;

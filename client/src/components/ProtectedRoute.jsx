import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import SkeletonLoader from './SkeletonLoader';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole, allowedRoles }) => {
    const { user, loading, initialized, isAuthenticated, refreshUser } = useAuth();

    useEffect(() => {
        if (initialized && isAuthenticated && user?.role !== 'admin') {
            refreshUser();
        }
    }, [initialized, isAuthenticated, user?.role, refreshUser]);

    if (loading || !initialized) {
        return <SkeletonLoader />;
    }

    if (!isAuthenticated || !user) {
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

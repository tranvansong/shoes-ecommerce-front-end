import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children, roles }) => {
    const { user } = useAuth();
    const location = useLocation();
    
    console.log("User: ", user);
    if (!user) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    if (roles && !roles.some(role => user.roles.includes(role))) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return children;
};


export default ProtectedRoute;

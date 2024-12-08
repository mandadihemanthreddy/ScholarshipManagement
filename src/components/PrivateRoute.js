import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, role }) => {
    const userRole = localStorage.getItem('role'); // Assuming role is stored in localStorage
    if (userRole !== role) {
        return <Navigate to="/login" />;
    }
    return element;
};

export default PrivateRoute;

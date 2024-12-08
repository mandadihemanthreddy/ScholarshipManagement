import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('');

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        setRole(userRole);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('role');
        navigate('/', { state: { message: 'Thank you for using!' } });
    };

    return (
        <div className="dashboard-container">
            <h1>Welcome to Your Dashboard!</h1>

            {role === 'ADMIN' ? (
                <div>
                    <h2>Admin Section</h2>
                    <p>As an admin, you can manage users, view reports, etc.</p>
                    {/* Add admin-specific links */}
                </div>
            ) : (
                <div>
                    <h2>User Section</h2>
                    <p>As a user, you can apply for scholarships and view your status.</p>
                    {/* Add user-specific links */}
                </div>
            )}

            {/* Logout Button */}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default DashboardPage;

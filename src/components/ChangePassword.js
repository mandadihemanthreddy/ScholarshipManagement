import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
    const [username, setUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://scholarshipmanagementbackend-production.up.railway.app/api/users/change-password',
                { username, currentPassword, newPassword },
                { headers: { 'Content-Type': 'application/json' } }
            );
            setMessage(response.data);
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data || "An error occurred.");
            } else {
                setMessage("An error occurred.");
            }
        }
    };

    return (
        <div>
            <h2>Change Password</h2>
            <form onSubmit={handlePasswordChange}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Current Password:</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Change Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ChangePassword;
    

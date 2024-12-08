import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const username = localStorage.getItem('username'); // Assuming you store the username in localStorage

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/profile/${username}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [username]);

  if (loading) {
    return <div className="loading-text">Loading...</div>;
  }

  if (!user) {
    return <div className="error-message">User not found</div>;
  }

  return (
    <div className="profile-card-container">
      <div className="profile-card">
        <h2 className="profile-card-title">User ID Card</h2>
        <div className="profile-card-content">
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phoneNumber}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Aadhar:</strong> {user.aadharNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

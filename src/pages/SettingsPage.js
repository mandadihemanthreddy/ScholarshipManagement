import React from 'react';
import ChangePassword from '../components/ChangePassword'; // Import ChangePassword component
import '../styles/SettingsPage.css'; // Add your styling for the settings page

const SettingsPage = () => {
  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <p>Update your settings here</p>
      
      {/* Include the ChangePassword component */}
      <ChangePassword />
    </div>
  );
};

export default SettingsPage;

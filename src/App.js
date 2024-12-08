import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/IndexPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutusPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute'; // Component to handle protected routes
import UserDashboard from './components/UserDashboard';
import ScholarshipsPage from './pages/ScholarshipsPage';
import SearchSchemes from './pages/SearchSchemes';
import SettingsPage from './pages/SettingsPage'; // Import settings page
import ChangePassword from './components/ChangePassword'; // Import ChangePassword component
import ProfilePage from './components/ProfilePage'; // Import the profile page component
import AdminDashboard from './components/AdminDashboard';
import ManageScholarships from './components/ManageScholarships';
import ManageUsers from './components/ManageUsersPage'; 
import ScholarshipApplicationForm from './components/ScholarshipApplicationForm';
import AdminApplications from './components/AdminApplications';
import UserApplications from './components/UserApplications';
import HowtoApplyPage from './components/HowtoApplyPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-to-apply" element={<HowtoApplyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* User Routes */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/scholarships" element={<ScholarshipsPage />} />
        <Route path="/search-schemes" element={<SearchSchemes />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/application-history" element={<UserApplications />}/>

        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/admin/scholarships" element={<ManageScholarships />}/>
        <Route path="/admin/manage-users" element={<ManageUsers />} />
        <Route path ="/admin/applications" element={<AdminApplications />} />

        {/* Profile Route */}
        <Route path="/profile" element={<ProfilePage />} /> {/* Profile route added */}

        {/* Scholarship Application Form Route */}
        <Route path="/apply" element={<ScholarshipApplicationForm/>} />

        {/* Change Password Route */}
        <Route path="/change-password" element={<ChangePassword />} /> {/* Added this line for change password */}


        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={<PrivateRoute role="USER" element={<DashboardPage />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
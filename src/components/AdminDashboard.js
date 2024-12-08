import React from 'react';
import { Box, Button, Grid, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Correct usage of images: Importing the image file
import AdminApplicationsImage from "../images/example.jpg";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Navigate to applications page
  const handleNavigateToApplications = () => {
    navigate('/admin/applications'); // Navigate to Applications page
  };

  // Navigate to scholarships management page  
  const handleNavigateToScholarships = () => {
    navigate('/admin/scholarships');
  };

  // Navigate to users management page
  const handleNavigateToUsers = () => {
    navigate('/admin/manage-users'); // Navigate to Manage Users page
  };

  // Handle logout
  const handleLogout = () => {
    // Clear the authentication data (tokens, user info) from localStorage/sessionStorage
    localStorage.clear();  // or sessionStorage.clear() if you use session storage

    // Redirect to login page after logout
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Displaying the image */}
      <img src={AdminApplicationsImage} alt="Admin Applications" style={{ width: '300px', marginBottom: '20px' }} />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Manage Scholarships Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Manage Scholarships</Typography>
              <Button variant="contained" sx={{ mt: 2 }} onClick={handleNavigateToScholarships}>
                Manage Scholarships
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Manage Users Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Manage Users</Typography>
              <Button variant="contained" sx={{ mt: 2 }} onClick={handleNavigateToUsers}>
                Manage Users
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* View Applications Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Manage Applications</Typography>
              <Button variant="contained" sx={{ mt: 2 }} onClick={handleNavigateToApplications}>
                View Applications
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Logout Button */}
      <Button variant="outlined" color="secondary" onClick={handleLogout} sx={{ mt: 3 }}>
        Logout
      </Button>
    </Box>
  );
};

export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid, Card, CardContent, Button } from '@mui/material';
import axios from 'axios';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('https://scholarshipmanagementbackend-production.up.railway.app/api/scholarship/applications'); // Fetch applications from backend
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Applications
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {applications.map((application) => (
            <Grid item xs={12} md={6} key={application.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{application.fullName}</Typography>
                  <Typography variant="body2">Status: {application.status}</Typography>
                  <Typography variant="body2">Scholarship ID: {application.scholarshipEntity.id}</Typography>
                  <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Applications;

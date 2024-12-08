// src/pages/UserApplications.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from '@mui/material';

const UserApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const username = localStorage.getItem('username'); // Retrieve the username from local storage

    if (!username) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8080/api/scholarship/applications/username/${username}`)
      .then((response) => {
        setApplications(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching applications');
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Scholarship Applications
      </Typography>
      
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Scholarship Id</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell>Application Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>{application.scholarship_id}</TableCell>
                  <TableCell>{application.status}</TableCell>
                  <TableCell>{application.remarks || 'N/A'}</TableCell>
                  <TableCell>{new Date(application.applicationDate).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default UserApplications;
